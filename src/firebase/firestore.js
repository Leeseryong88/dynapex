import {
  collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc,
  query, where, orderBy, limit, startAfter, serverTimestamp, increment
} from 'firebase/firestore'
import { db } from './config'

// ═══ Posts (게시판) ═══

const postsRef = collection(db, 'posts')

export async function getPosts({ category, pageSize = 12, lastDoc = null, publishedOnly = true } = {}) {
  // Simple query — fetch all, filter/sort client-side to avoid composite index requirements
  const q = query(postsRef, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  // Client-side filters
  if (publishedOnly) docs = docs.filter(d => d.published === true)
  if (category) docs = docs.filter(d => d.category === category)

  // Pinned posts first
  docs.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  // Pagination
  if (pageSize) docs = docs.slice(0, pageSize)

  return { docs, lastDoc: null, hasMore: false }
}

export async function getPost(id) {
  const snap = await getDoc(doc(db, 'posts', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

export async function createPost(data) {
  return addDoc(postsRef, { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(), viewCount: 0 })
}

export async function updatePost(id, data) {
  return updateDoc(doc(db, 'posts', id), { ...data, updatedAt: serverTimestamp() })
}

export async function deletePost(id) {
  return deleteDoc(doc(db, 'posts', id))
}

export async function incrementPostView(id) {
  return updateDoc(doc(db, 'posts', id), { viewCount: increment(1) })
}

// ═══ Publications ═══

const pubsRef = collection(db, 'publications')

export async function getPublications({ category, productId, sortBy = 'order' } = {}) {
  // Simple query — fetch all, filter/sort client-side to avoid composite index requirements
  const snap = await getDocs(collection(db, 'publications'))
  let docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))

  // Client-side filters
  if (category) docs = docs.filter(d => d.category === category)
  if (productId) docs = docs.filter(d => d.productId === productId)

  // Client-side sort
  if (sortBy === 'year') {
    docs.sort((a, b) => (b.year || 0) - (a.year || 0))
  } else {
    docs.sort((a, b) => (a.order || 999) - (b.order || 999))
  }

  return docs
}

export async function createPublication(data) {
  return addDoc(pubsRef, { ...data, createdAt: serverTimestamp() })
}

export async function updatePublication(id, data) {
  return updateDoc(doc(db, 'publications', id), data)
}

export async function deletePublication(id) {
  return deleteDoc(doc(db, 'publications', id))
}

// ═══ PubStats ═══

export async function getPubStats() {
  const snap = await getDoc(doc(db, 'settings', 'pubStats'))
  return snap.exists() ? snap.data() : { totalPapers: 20, topTierCount: 5, patentCount: 1 }
}

export async function updatePubStats(data) {
  return updateDoc(doc(db, 'settings', 'pubStats'), data)
}

// ═══ Site Stats (Trusted By) ═══

const defaultSiteStats = {
  metrics: {
    countries: { value: '40+', labelKr: '국가', labelEn: 'Countries', enabled: true },
    institutions: { value: '1,500+', labelKr: '기관', labelEn: 'Institutions', enabled: true },
    scans: { value: '7M+', labelKr: '분석 건수', labelEn: 'Scans', enabled: true },
    reduction: { value: '45%', labelKr: '평균 검사시간 단축', labelEn: 'Avg scan time reduction', enabled: true },
  },
}

function normalizeSiteStats(raw) {
  if (!raw || typeof raw !== 'object') return defaultSiteStats

  // New schema
  if (raw.metrics && typeof raw.metrics === 'object') {
    return {
      metrics: {
        countries: { ...defaultSiteStats.metrics.countries, ...(raw.metrics.countries || {}) },
        institutions: { ...defaultSiteStats.metrics.institutions, ...(raw.metrics.institutions || {}) },
        scans: { ...defaultSiteStats.metrics.scans, ...(raw.metrics.scans || {}) },
        reduction: { ...defaultSiteStats.metrics.reduction, ...(raw.metrics.reduction || {}) },
      },
    }
  }

  // Backward compatibility for old flat schema
  return {
    metrics: {
      countries: {
        ...defaultSiteStats.metrics.countries,
        value: raw.countries ?? defaultSiteStats.metrics.countries.value,
      },
      institutions: {
        ...defaultSiteStats.metrics.institutions,
        value: raw.institutions ?? defaultSiteStats.metrics.institutions.value,
      },
      scans: {
        ...defaultSiteStats.metrics.scans,
        value: raw.scans ?? defaultSiteStats.metrics.scans.value,
      },
      reduction: {
        ...defaultSiteStats.metrics.reduction,
        value: raw.reduction ?? defaultSiteStats.metrics.reduction.value,
      },
    },
  }
}

export async function getSiteStats() {
  const snap = await getDoc(doc(db, 'settings', 'siteStats'))
  return normalizeSiteStats(snap.exists() ? snap.data() : null)
}

export async function updateSiteStats(data) {
  const ref = doc(db, 'settings', 'siteStats')
  return setDoc(ref, data, { merge: true })
}

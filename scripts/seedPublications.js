/**
 * Firestore Publication Seed Script
 *
 * Usage:
 *   1. Make sure you have a .env file with Firebase config (see .env.example)
 *   2. Run: node scripts/seedPublications.js
 *
 * This script seeds the 'publications' and 'pubStats' collections
 * with the existing hardcoded publication data from the website.
 *
 * NOTE: This uses the Firebase Web SDK (modular v9+).
 *       Run from the /web directory: cd web && node scripts/seedPublications.js
 */

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore'
import { config } from 'dotenv'

config() // load .env

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// --------------- Publication Data ---------------

const publications = [
  // ===== Primary Tumor (GBM) =====
  {
    title: 'Mapping Tumor Habitats in IDH-Wild Type Glioblastoma',
    journal: 'Neuro Oncol',
    authors: 'Park JE et al.',
    year: 2024,
    doi: '10.1093/neuonc/noae161',
    category: 'primaryTumor',
    type: 'paper',
    productId: 'gbm',
    order: 1,
  },
  {
    title: 'Prospective Longitudinal Analysis of Physiologic MRI-based Tumor Habitat Predicts Short-term Patient Outcomes',
    journal: 'Neuro Oncol',
    authors: 'Moon HH et al.',
    year: 2024,
    doi: '10.1093/neuonc/noae227',
    category: 'primaryTumor',
    type: 'paper',
    productId: 'gbm',
    order: 2,
  },
  {
    title: 'Prospective longitudinal analysis of imaging-based spatiotemporal tumor habitats',
    journal: 'BMC Cancer',
    authors: 'Moon HH et al.',
    year: 2024,
    doi: '10.1186/s12885-024-12939-7',
    category: 'primaryTumor',
    type: 'paper',
    productId: 'gbm',
    order: 3,
  },
  {
    title: 'Prediction of pseudoprogression in post-treatment glioblastoma using DSC-derived measures',
    journal: 'Eur Radiol',
    authors: 'Park JE et al.',
    year: 2024,
    doi: '10.1007/s00330-023-10324-9',
    category: 'primaryTumor',
    type: 'paper',
    productId: 'gbm',
    order: 4,
  },
  {
    title: 'Spatiotemporal Heterogeneity in Multiparametric Physiologic MRI',
    journal: 'Clin Cancer Res',
    authors: 'Park JE et al.',
    year: 2021,
    doi: '10.1158/1078-0432.CCR-20-3471',
    category: 'primaryTumor',
    type: 'paper',
    productId: 'gbm',
    order: 5,
  },
  {
    title: 'Vessel Size and Perfusion-derived Vascular Habitat Refines Prediction of Treatment Failure',
    journal: 'Eur Radiol',
    authors: 'Kim M et al.',
    year: 2023,
    doi: '10.1007/s00330-022-09319-1',
    category: 'primaryTumor',
    type: 'paper',
    productId: 'gbm',
    order: 6,
  },

  // ===== Brain Metastasis (METS) =====
  {
    title: 'Deep learning-based metastasis detection in patients with lung cancer',
    journal: 'Cancer Imaging',
    authors: 'Park YW et al.',
    year: 2024,
    doi: '10.1186/s40644-024-00669-9',
    category: 'brainMetastasis',
    type: 'paper',
    productId: 'mets',
    order: 1,
  },
  {
    title: 'Reducing false positives in DL-based brain metastasis detection',
    journal: 'Eur Radiol',
    authors: 'Yun S et al.',
    year: 2024,
    doi: '10.1007/s00330-023-10318-7',
    category: 'brainMetastasis',
    type: 'paper',
    productId: 'mets',
    order: 2,
  },
  {
    title: 'Deep Learning-based Detection and Quantification of Brain Metastases',
    journal: 'Eur Radiol',
    authors: 'Jeong H et al.',
    year: 2024,
    doi: '10.1007/s00330-023-10474-w',
    category: 'brainMetastasis',
    type: 'paper',
    productId: 'mets',
    order: 3,
  },
  {
    title: 'Tumor Habitat Analysis Using Longitudinal MRI to Predict Recurrence After SRS',
    journal: 'Korean J Radiol',
    authors: 'Lee DH et al.',
    year: 2023,
    doi: '10.3348/kjr.2022.0492',
    category: 'brainMetastasis',
    type: 'paper',
    productId: 'mets',
    order: 4,
  },
  {
    title: 'Tumor habitat analysis distinguishes progression from radiation necrosis',
    journal: 'Eur Radiol',
    authors: 'Lee DH et al.',
    year: 2022,
    doi: '10.1007/s00330-021-08204-1',
    category: 'brainMetastasis',
    type: 'paper',
    productId: 'mets',
    order: 5,
  },

  // ===== Patent =====
  {
    title: '해비탓 분석 기반의 뇌 병변 추적 장치 및 방법',
    patentNo: '10-2025-019224',
    category: 'patent',
    type: 'patent',
    productId: 'gbm',
    order: 1,
  },
]

// --------------- Seed Function ---------------

async function seed() {
  console.log('Seeding publications to Firestore...')

  const colRef = collection(db, 'publications')
  let count = 0

  for (const pub of publications) {
    await addDoc(colRef, {
      ...pub,
      createdAt: new Date(),
    })
    count++
    console.log(`  [${count}/${publications.length}] ${pub.title.substring(0, 60)}...`)
  }

  // Seed pubStats
  await setDoc(doc(db, 'pubStats', 'main'), {
    totalPapers: publications.filter(p => p.type === 'paper').length,
    topTierCount: 5,
    patentCount: publications.filter(p => p.type === 'patent').length,
  })
  console.log('  pubStats document created.')

  console.log(`\nDone! ${count} publications seeded.`)
  process.exit(0)
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})

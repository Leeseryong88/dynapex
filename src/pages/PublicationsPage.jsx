import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { getPublications, getPubStats } from '../firebase/firestore'
import styles from './PublicationsPage.module.css'

const productLabelsEn = {
  '': 'All Products',
  gbm: 'DYNAPEX-GBM',
  mets: 'DYNAPEX-METS',
  aira: 'DYNAPEX-ARIA',
  ms: 'DYNAPEX-MS',
  pd: 'DYNAPEX-PD',
  stroke: 'Cercare-STROKE',
  hn: 'DYNAPEX-H&N',
}

const productLabelsKr = {
  '': '전체 제품',
  gbm: 'DYNAPEX-GBM',
  mets: 'DYNAPEX-METS',
  aira: 'DYNAPEX-ARIA',
  ms: 'DYNAPEX-MS',
  pd: 'DYNAPEX-PD',
  stroke: 'Cercare-STROKE',
  hn: 'DYNAPEX-H&N',
}

const catLabelsEn = {
  '': 'All',
  primaryTumor: 'Primary Tumor',
  brainMetastasis: 'Brain Metastasis',
  patent: 'Patent',
}

const catLabelsKr = {
  '': '전체',
  primaryTumor: '원발성 뇌종양',
  brainMetastasis: '뇌전이',
  patent: '특허',
}

export default function PublicationsPage() {
  const { lang } = useLanguage()
  const productLabels = lang === 'kr' ? productLabelsKr : productLabelsEn
  const catLabels = lang === 'kr' ? catLabelsKr : catLabelsEn

  usePageMeta(
    '연구·논문 — DYNAPEX',
    'Publications — DYNAPEX',
    'DYNAPEX의 의료 AI 연구 논문 및 특허: Nature, AJNR, IEEE 등 상위 학술지에 발표된 20개 이상의 논문',
    'DYNAPEX medical AI research papers and patents: 20+ publications in top-tier journals including Nature, AJNR, IEEE.'
  )

  const [pubs, setPubs] = useState([])
  const [stats, setStats] = useState({ totalPapers: 20, topTierCount: 5, patentCount: 1 })
  const [productFilter, setProductFilter] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [sortBy, setSortBy] = useState('order')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const opts = { sortBy }
    if (catFilter) opts.category = catFilter
    if (productFilter) opts.productId = productFilter
    Promise.all([
      getPublications(opts),
      getPubStats(),
    ]).then(([data, s]) => {
      setPubs(data)
      setStats(s)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [catFilter, productFilter, sortBy])

  // Separate papers and patents
  const papers = pubs.filter(p => p.type !== 'patent')
  const patents = pubs.filter(p => p.type === 'patent')
  const primaryTumor = papers.filter(p => p.category === 'primaryTumor')
  const brainMets = papers.filter(p => p.category === 'brainMetastasis')

  const totalShown = pubs.length

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>{lang === 'kr' ? '연구·논문' : 'Publications'}</h1>
        <p>{lang === 'kr' ? 'DYNAPEX 연구진의 SCI(E) 학술 논문 및 특허 목록' : 'SCI(E) peer-reviewed papers and patents by the DYNAPEX team'}</p>
      </section>

      <div className={styles.contentWrap}>
      <div className={styles.content}>
        {/* Stats */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{stats.totalPapers}+</span>
            <span className={styles.statLabel}>{lang === 'kr' ? 'SCI(E) 학술 논문' : 'SCI(E) Publications'}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{stats.topTierCount}+</span>
            <span className={styles.statLabel}>{lang === 'kr' ? '상위 저널 게재' : 'Top-tier Journals'}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statNum}>{stats.patentCount}</span>
            <span className={styles.statLabel}>{lang === 'kr' ? '특허 출원' : 'Patents Filed'}</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <span className={styles.totalCount}>
              {lang === 'kr' ? <><strong>{totalShown}</strong>건 표시</> : <>Showing <strong>{totalShown}</strong> {totalShown === 1 ? 'result' : 'results'}</>}
            </span>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>{lang === 'kr' ? '카테고리' : 'Category'}</span>
              <div className={styles.filterBtns}>
                {Object.entries(catLabels).map(([val, label]) => (
                  <button key={val} onClick={() => setCatFilter(val)}
                    className={`${styles.filterBtn} ${catFilter === val ? styles.filterActive : ''}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.filterRight}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>{lang === 'kr' ? '제품' : 'Product'}</span>
              <select value={productFilter} onChange={e => setProductFilter(e.target.value)} className={styles.filterSelect}>
                {Object.entries(productLabels).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>{lang === 'kr' ? '정렬' : 'Sort'}</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={styles.filterSelect}>
                <option value="order">{lang === 'kr' ? '기본 순서' : 'Default Order'}</option>
                <option value="year">{lang === 'kr' ? '연도 (최신순)' : 'Year (Newest)'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 40 }}>{lang === 'kr' ? '불러오는 중...' : 'Loading...'}</p>
        ) : pubs.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: 40 }}>
            {lang === 'kr' ? '해당 조건에 맞는 논문이 없습니다.' : 'No publications found for this filter.'}
          </p>
        ) : (
          <div className={styles.cardGrid}>
            {/* Primary Tumor section */}
            {primaryTumor.length > 0 && (
              <>
                <div className={styles.sectionDivider}>
                  <h2 className={styles.sectionTitle}>{lang === 'kr' ? '원발성 뇌종양' : 'Primary Tumor'}</h2>
                </div>
                {primaryTumor.map(pub => (
                  <PubCard key={pub.id} pub={pub} />
                ))}
              </>
            )}

            {/* Brain Metastasis section */}
            {brainMets.length > 0 && (
              <>
                <div className={styles.sectionDivider}>
                  <h2 className={styles.sectionTitle}>{lang === 'kr' ? '뇌전이' : 'Brain Metastasis'}</h2>
                </div>
                {brainMets.map(pub => (
                  <PubCard key={pub.id} pub={pub} />
                ))}
              </>
            )}

            {/* Patents section */}
            {patents.length > 0 && (
              <>
                <div className={styles.sectionDivider}>
                  <h2 className={styles.sectionTitle}>{lang === 'kr' ? '특허' : 'Patents'}</h2>
                </div>
                {patents.map(pub => (
                  <PatentCard key={pub.id} pub={pub} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

/* ====== Paper Card ====== */
function getYearClass(year) {
  if (!year) return styles.cardDate
  const y = parseInt(year, 10)
  if (y >= 2024) return styles.cardDate        // brightest
  if (y >= 2023) return styles.cardDateMid      // medium
  return styles.cardDateOld                     // dimmed
}

function PubCard({ pub }) {
  const catDisplay = pub.category === 'primaryTumor' ? 'Primary Tumor'
    : pub.category === 'brainMetastasis' ? 'Brain Metastasis'
    : pub.category || ''

  return (
    <div className={styles.card}>
      <div className={styles.cardAccent} />
      <div className={styles.cardBody}>
        {/* Meta: date + journal */}
        <div className={styles.cardMeta}>
          {pub.year && <span className={getYearClass(pub.year)}>{pub.year}</span>}
          {pub.journal && <span className={styles.cardJournal}>{pub.journal}</span>}
        </div>

        {/* Title */}
        <h3 className={styles.cardTitle}>{pub.title}</h3>

        {/* Authors */}
        {pub.authors && <p className={styles.cardAuthors}>{pub.authors}</p>}

        {/* Footer: tags + DOI */}
        <div className={styles.cardFooter}>
          <div className={styles.cardTags}>
            {pub.productId && (
              <span className={`${styles.tag} ${styles.tagProduct}`}>
                {pub.productId.toUpperCase()}
              </span>
            )}
            {catDisplay && (
              <span className={`${styles.tag} ${styles.tagCategory}`}>
                {catDisplay}
              </span>
            )}
          </div>
          {pub.doi && (
            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className={styles.doiLink}>
              DOI &#8599;
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

/* ====== Patent Card ====== */
function PatentCard({ pub }) {
  return (
    <div className={`${styles.card} ${styles.patentFullWidth}`}>
      <div className={styles.cardAccentPatent} />
      <div className={styles.cardBody}>
        {/* Meta */}
        <div className={styles.cardMeta}>
          {pub.year && <span className={styles.cardDate} style={{ color: 'rgb(255,180,60)', background: 'rgba(255,180,60,0.1)' }}>{pub.year}</span>}
        </div>

        {/* Title */}
        <h3 className={styles.cardTitle}>{pub.title}</h3>

        {/* Patent number */}
        {pub.patentNo && <p className={styles.cardPatentNo}>{pub.patentNo}</p>}

        {/* Footer */}
        <div className={styles.cardFooter}>
          <div className={styles.cardTags}>
            <span className={`${styles.tag}`} style={{ color: 'rgb(255,180,60)', background: 'rgba(255,180,60,0.08)', border: '1px solid rgba(255,180,60,0.15)' }}>
              Patent
            </span>
            {pub.productId && (
              <span className={`${styles.tag} ${styles.tagProduct}`}>
                {pub.productId.toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

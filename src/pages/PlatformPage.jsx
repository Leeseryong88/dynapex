import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { translations } from '../i18n/translations'
import { platformData } from '../data/productContent'
import RegulatoryBanner from '../components/RegulatoryBanner'
import styles from './PlatformPage.module.css'

export default function PlatformPage() {
  const [reportSample, setReportSample] = useState(0)
  const { lang } = useLanguage()
  const t = translations[lang]?.platform ?? translations.en.platform
  const d = platformData
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // 모바일 스크롤 시 인덱스 트래킹
  const handleScroll = () => {
    if (!scrollRef.current || window.innerWidth > 768) return
    const el = scrollRef.current
    const cardWidth = el.offsetWidth * 0.8 + 16 // 80% + gap 16px
    const idx = Math.round(el.scrollLeft / cardWidth)
    if (idx !== activeIdx) setActiveIdx(idx)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (el) {
      el.addEventListener('scroll', handleScroll)
      return () => el.removeEventListener('scroll', handleScroll)
    }
  }, [activeIdx])

  usePageMeta(
    'DYNAPEX 플랫폼',
    'DYNAPEX Platform',
    'DYNAPEX 플랫폼: 뇌종양, 뇌졸중, 신경퇴행성질환 등의 정밀 진단을 위한 완전 자동화 Medical AI 솔루션',
    'DYNAPEX Platform: fully automated Medical AI solution for precise diagnosis of brain tumors, stroke, and neurodegeneration.'
  )

  return (
    <div className={styles.page}>
      <RegulatoryBanner />
      {/* Video Intro Hero */}
      <section className={styles.videoHero}>
        <video
          className={styles.heroVideo}
          src="/videos/dynapex-intro.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/bg/background.jpg"
        />
        <div className={styles.videoOverlay}>
          <h1>{lang === 'kr' ? 'DYNAPEX 플랫폼' : 'DYNAPEX Platform'}</h1>
          <p>
            {lang === 'kr'
              ? '뇌 질환 정밀 진단을 위한 모듈형 Medical AI 솔루션'
              : 'Modular Medical AI Solutions for Brain Disease Diagnosis'}
          </p>
        </div>
      </section>

      {/* AI Portfolio — 브로셔 P2 구조: 4×2 카드 그리드, 이미지 우선 */}
      <div className={styles.portfolioWrap}>
        <section className={styles.portfolioSection}>
          <h2 className={styles.portfolioTitle}>{t.portfolioTitle}</h2>
          <p className={styles.portfolioSubtitle}>{t.portfolioSubtitle}</p>
          <div className={styles.portfolioGrid} ref={scrollRef}>
            {d.productCards.map((card) => (
              <Link key={card.id} to={`/products?tab=${card.id}`} className={styles.portfolioCard}>
                <div className={styles.portfolioCardImage}>
                  <img src={card.img} alt={lang === 'kr' && card.titleKr ? card.titleKr : card.title} loading="lazy" />
                </div>
                <div className={styles.portfolioCardText}>
                  <h3>{card.brand}</h3>
                  <span className={styles.portfolioBrand}>{lang === 'kr' && card.titleKr ? card.titleKr : card.title}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* 모바일 페이지네이션 표시 */}
          <div className={styles.portfolioPagination}>
            <span style={{ opacity: 0.4, padding: '0 10px' }}>&lt;</span>
            <span className={styles.paginationNum}>
              {(activeIdx + 1).toString().padStart(2, '0')}
            </span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>{d.productCards.length.toString().padStart(2, '0')}</span>
            <span style={{ opacity: 0.4, padding: '0 10px' }}>&gt;</span>
          </div>
        </section>
      </div>

      {/* Granular Architecture */}
      <section className={styles.architectureSection}>
        <div className={styles.architectureInner}>
          <h3 className={styles.sectionTitle}>{lang === 'kr' && d.architecture.titleKr ? d.architecture.titleKr : d.architecture.title}</h3>
          <p className={styles.sectionDesc}>{d.architecture.desc}</p>
          {d.architecture.image && (
            <div className={styles.architectureImage} onClick={() => window.open(d.architecture.image, '_blank')} title="Click to enlarge">
              <img src={d.architecture.image} alt="Granular Pipeline Architecture — Modular AI Processing" loading="lazy" />
            </div>
          )}
          <div className={styles.pipeline}>
            {d.architecture.stages.map((stage, i) => (
              <span key={stage}>
                <span className={styles.stage}>{stage}</span>
                {i < d.architecture.stages.length - 1 && <span className={styles.arrow}>→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {d.stats.map((s) => (
            <div key={s.label} className={styles.statItem}>
              <div className={styles.statNumber}>{s.value}</div>
              <div className={styles.statDivider} />
              <div className={styles.statLabel}>{lang === 'kr' && s.labelKr ? s.labelKr : s.label}</div>
              <div className={styles.statNote}>{lang === 'kr' && s.subKr ? s.subKr : s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Advantages + Report Samples */}
      <section className={styles.advantageSection}>
        <div className={styles.advantageLayout}>
          <div className={styles.keypoints}>
            <h4>{lang === 'kr' ? '핵심 강점' : 'Key Advantages'}</h4>
            <ul>
              {d.advantages.map((a) => (
                <li key={a.title}>
                  <span className={styles.check}>✓</span>
                  <span><strong>{lang === 'kr' && a.titleKr ? a.titleKr : a.title}:</strong> {lang === 'kr' && a.textKr ? a.textKr : a.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.reportArea}>
            <div className={styles.reportStack}>
              <img src={d.reportSamples[reportSample].src} alt={d.reportSamples[reportSample].label} />
            </div>
            <div className={styles.reportTabs}>
              <button
                type="button"
                className={reportSample === 0 ? styles.active : ''}
                onClick={() => setReportSample(0)}
              >
                {lang === 'kr' ? '교모세포종 리포트' : 'Glioma'}
              </button>
              <button
                type="button"
                className={reportSample === 1 ? styles.active : ''}
                onClick={() => setReportSample(1)}
              >
                {lang === 'kr' ? '뇌전이 리포트' : 'Brain Metastasis'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

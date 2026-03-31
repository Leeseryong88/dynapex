import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { productContent, platformData } from '../data/productContent'
import { translations } from '../i18n/translations'
import RegulatoryBanner from '../components/RegulatoryBanner'
import styles from './AIProductsPage.module.css'

const tabOrder = [
  { id: 'gbm', label: 'DYNAPEX BT', labelKr: 'DYNAPEX BT' },
  { id: 'mets', label: 'DYNAPEX METS', labelKr: 'DYNAPEX METS' },
  { id: 'aira', label: 'DYNAPEX AD', labelKr: 'DYNAPEX AD' },
  { id: 'ms', label: 'DYNAPEX MS', labelKr: 'DYNAPEX MS' },
  { id: 'pd', label: 'DYNAPEX PD', labelKr: 'DYNAPEX PD' },
  { id: 'stroke', label: 'CERCARE STROKE', labelKr: 'CERCARE STROKE' },
  { id: 'hn', label: 'DYNAPEX HN', labelKr: 'DYNAPEX HN' },
]

// Alias map: allows ?tab=ad to resolve to internal 'aira' key
const tabAliases = { ad: 'aira', bt: 'gbm' }
const resolveTab = (param) => tabAliases[param] || param

export default function AIProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawTab = searchParams.get('tab') || 'gbm'
  const initialTab = resolveTab(rawTab)
  const [activeTab, setActiveTab] = useState(
    tabOrder.find((t) => t.id === initialTab) ? initialTab : 'gbm'
  )
  const [expandedSections, setExpandedSections] = useState({})
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const { lang } = useLanguage()
  const kr = lang === 'kr'
  const tGlobal = translations[lang]

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  usePageMeta(
    'AI 제품 포트폴리오 — DYNAPEX',
    'AI Product Portfolio — DYNAPEX',
    'DYNAPEX의 AI 제품 포트폴리오: 뇌종양, 뇌졸중, 신경퇴행성질환, 머리목 암 등 7가지 질환 영역에 대한 완전 자동화 솔루션',
    'DYNAPEX AI product portfolio: fully automated solutions for brain tumors, stroke, neurodegeneration, and more across 7 disease areas.'
  )

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    if (tabParam) {
      const resolved = resolveTab(tabParam)
      if (tabOrder.find((t) => t.id === resolved)) {
        setActiveTab(resolved)
      }
    }
  }, [searchParams])

  // Scroll to top whenever activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setExpandedSections({}) // Reset expanded state when switching products
  }, [activeTab])

  const content = productContent[activeTab]
  const card = platformData.productCards.find((c) => c.id === activeTab)
  if (!content) return null

  return (
    <div className={styles.page}>
      <RegulatoryBanner />
      {/* Page Header */}
      <section className={styles.hero}>
        <h1>{kr ? 'AI 제품 포트폴리오' : 'AI Product Portfolio'}</h1>
      </section>

      {/* Tab Navigation */}
      <div className={styles.tabBar}>
        <div className={styles.tabBarInner}>
          {tabOrder.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveTab(tab.id)
                setSearchParams({ tab: tab.id })
              }}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              {kr && tab.labelKr && tab.labelKr !== tab.label && (
                <span className={styles.tabLabelKr}>{tab.labelKr}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.content}>
        <div className={styles.contentInner}>

          {/* ── Product Header ── */}
          <div className={styles.productHeader}>
            <div className={styles.productInfo}>
              <div className={styles.productNameRow}>
                <h2 className={styles.productName}>{content.name}</h2>
                {content.subtitle && (
                  <span className={styles.productSubtitle}>{kr ? content.subtitleKr : content.subtitle}</span>
                )}
              </div>
              <p className={styles.productDesc}>{kr ? content.descKr : content.descEn}</p>
              {content.required && (
                <div className={styles.requiredRow}>
                  <span className={styles.requiredLabel}>{kr ? '필수 입력 시퀀스:' : 'Required Input:'}</span>
                  <div className={styles.tags}>
                    {content.required.map((r) => (
                      <span key={r} className={styles.tag}>{r}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Specs Bar ── */}
          {content.specs && (
            <div className={styles.specsBar}>
              {content.specs.map((s, i) => (
                <div key={i} className={styles.specItem}>
                  <span className={styles.specValue}>{s.value}</span>
                  <span className={styles.specLabel}>{kr && s.labelKr ? s.labelKr : s.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── Slide-based Sections ── */}
          {content.sections && content.sections.map((section, si) => (
            <div key={section.id || si} className={styles.slideSection}>

              {/* Section Header */}
              <div className={styles.slideSectionHeader}>
                <h3 className={styles.slideSectionTitle}>
                  {content.sections.length > 1 && <span className={styles.sectionAccent} />}
                  {kr ? section.titleKr : section.title}
                </h3>
                {section.badge && (
                  <span className={styles.badge}>{kr ? section.badge.kr : section.badge.en}</span>
                )}
              </div>

              {/* Section Description */}
              <p className={styles.slideSectionDesc}>{kr ? section.descKr : section.descEn}</p>

              {/* View Details Button (Mobile only) */}
              {isMobile && (
                <button 
                  type="button" 
                  className={styles.viewDetailsBtn}
                  onClick={() => toggleSection(section.id || si)}
                >
                  <span className={styles.viewDetailsText}>
                    {expandedSections[section.id || si] ? (kr ? '간략히 보기' : 'Show Less') : tGlobal.platform.viewDetails}
                  </span>
                  <div className={`${styles.viewDetailsIcon} ${expandedSections[section.id || si] ? styles.iconRotated : ''}`}>
                    <span />
                    <span />
                  </div>
                </button>
              )}

              {/* Collapsible Content */}
              <div className={`${styles.collapsibleContent} ${(!isMobile || expandedSections[section.id || si]) ? styles.expanded : ''}`}>
                {/* Section-level Required Input (e.g., Structure Habitat) */}
                {section.required && (
                  <div className={styles.requiredRow} style={{ marginTop: 8, marginBottom: 12 }}>
                    <span className={styles.requiredLabel}>{kr ? '필수 입력 시퀀스:' : 'Required Input:'}</span>
                    <div className={styles.tags}>
                      {section.required.map((r) => (
                        <span key={r} className={styles.tag}>{r}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Workflow Steps */}
                {section.workflow && (
                  <div className={styles.workflowBar}>
                    {section.workflow.map((w, wi) => (
                      <div key={wi} className={styles.workflowStep}>
                        <span className={styles.workflowStepNum}>STEP {w.step}</span>
                        <span className={styles.workflowStepText}>{kr ? w.kr : w.en}</span>
                        {wi < section.workflow.length - 1 && <span className={styles.workflowArrow}>→</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Images (small) + Output Images (large) — for habitat-style sections */}
                {section.inputImages && section.inputImages.length > 0 && (
                  <>
                    <div className={styles.imageGridInput}>
                      {section.inputImages.map((img, ii) => (
                        <div key={ii} className={styles.imageCard}>
                          <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" />
                          <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                        </div>
                      ))}
                    </div>
                    <p className={styles.imageGroupLabel}>{kr ? '분석 결과' : 'Output Results'}</p>
                    <div className={section.outputImages.some(img => img.equalHeight) ? styles.imageGridEqualHeight : styles.imageGridLarge}>
                      {section.outputImages.map((img, ii) => (
                        <div key={ii} className={img.equalHeight ? styles.imageCardEqualHeight : styles.imageCard}>
                          <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" />
                          <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Image Grid */}
                {!section.inputImages && section.images && section.images.length > 0 && (() => {
                  const equalRow = section.images.filter(img => img.equalRow)
                  const normal = section.images.filter(img => !img.pairLarge && !img.large && !img.equalRow && !img.matchHeight)
                  const matchHeight = section.images.filter(img => img.matchHeight)
                  const largeItems = section.images.filter(img => img.large)
                  const pairLarge = section.images.filter(img => img.pairLarge)
                  return (
                    <>
                      {/* Equal row: images side-by-side with matching heights */}
                      {equalRow.length > 0 && (
                        <div className={styles.equalHeightRow}>
                          {equalRow.map((img, ii) => (
                            <div key={ii} className={styles.equalHeightCard} style={img.flex ? { flex: img.flex } : undefined}>
                              <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" />
                              <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Normal + matchHeight images in one grid */}
                      {(normal.length > 0 || matchHeight.length > 0) && (
                        <div className={styles.imageGrid}>
                          {normal.map((img, ii) => {
                            // Stacked card (multiple images in one card)
                            if (img.stacked && img.items) {
                              return (
                                <div key={ii} className={styles.imageCardStacked}>
                                  {img.items.map((sub, si) => (
                                    <div key={si}>
                                      <img src={sub.src} alt={kr && sub.labelKr ? sub.labelKr : sub.label} loading="lazy" />
                                      <p className={styles.imageLabel}>{kr && sub.labelKr ? sub.labelKr : sub.label}</p>
                                    </div>
                                  ))}
                                </div>
                              )
                            }
                            // Normal card
                            return (
                              <div key={ii} className={styles.imageCard}>
                                <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" />
                                <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                              </div>
                            )
                          })}
                          {matchHeight.map((img, ii) => (
                            <div key={`mh-${ii}`} className={styles.matchHeightCard}>
                              <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" />
                              <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {largeItems.length > 0 && largeItems.map((img, ii) => (
                        <div key={`lg-${ii}`} className={styles.imageCardLarge} style={{ marginBottom: 20 }}>
                          <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" style={img.maxHeight ? { maxHeight: img.maxHeight } : undefined} />
                          <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                        </div>
                      ))}
                      {pairLarge.length > 0 && (
                        <div className={styles.pairLargeRow}>
                          {pairLarge.map((img, ii) => (
                            <div key={ii} className={styles.imageCardLarge}>
                              <img src={img.src} alt={kr && img.labelKr ? img.labelKr : img.label} loading="lazy" />
                              <p className={styles.imageLabel}>{kr && img.labelKr ? img.labelKr : img.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )
                })()}

                {/* Legend */}
                {section.legend && (
                  <div className={styles.legend}>
                    {section.legend.map((l, li) => (
                      <div key={li} className={styles.legendItem}>
                        <span className={styles.legendBar} style={{ background: l.color }} />
                        <div className={styles.legendText}>
                          <span className={styles.legendLabel}>{kr && l.labelKr ? l.labelKr : l.label}</span>
                          {l.detail && <span className={styles.legendDetail}>{kr && l.detailKr ? l.detailKr : l.detail}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Key Points */}
                {section.keyPoints && (
                  <div className={styles.keyPointsGrid}>
                    {section.keyPoints.map((kp, ki) => (
                      <div key={ki} className={styles.keyPoint}>
                        <span className={styles.keyPointIcon}>›</span>
                        <span>{kr ? kp.kr : kp.en}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Evidence Box */}
                {section.evidence && (
                  <div className={styles.evidenceBox}>
                    <div className={styles.evidenceIcon}>📊</div>
                    <div>
                      <strong>{kr ? '임상 근거' : 'Clinical Evidence'}</strong>
                      <p>{kr ? section.evidence.kr : section.evidence.en}</p>
                    </div>
                  </div>
                )}

                {/* Patent Info */}
                {section.patent && (
                  <div className={styles.patentBox}>
                    <span className={styles.patentIcon}>📋</span>
                    <span>{kr ? '특허 출원' : 'Patent Filed'}: {section.patent.title} ({section.patent.number})</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* ── Publications ── */}
          {content.publications && content.publications.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                {kr ? '주요 논문' : 'Key Publications'}
              </h3>
              <div className={styles.pubList}>
                {content.publications.map((pub, i) => (
                  <article key={i} className={styles.pubCard}>
                    <div className={styles.pubMeta}>
                      <span>{pub.date}</span>
                      <span className={styles.pubVenue}>{pub.venue}</span>
                    </div>
                    <h5 className={styles.pubTitle}>{pub.title}</h5>
                    <p className={styles.pubAuthors}>{pub.authors}</p>
                    <a href={pub.doi} target="_blank" rel="noopener noreferrer" className={styles.pubLink}>
                      DOI ↗
                    </a>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ── DRE: Preliminary Report (Under Development) ── */}
          {content.dre && (
            <div className={styles.dreSection}>
              {/* Section Header — same style as other sections */}
              <div className={styles.slideSectionHeader}>
                <h3 className={styles.slideSectionTitle}>
                  <span className={styles.sectionAccent} />
                  {kr ? content.dre.titleKr : content.dre.title}
                </h3>
                <span className={styles.dreBadge}>
                  {kr ? content.dre.statusKr : content.dre.status}
                </span>
              </div>
              <p className={styles.dreDesc}>{kr ? content.dre.descKr : content.dre.descEn}</p>

              {/* Two-column content */}
              <div className={styles.dreLayout}>
                {/* Left: Report Card */}
                <div className={styles.dreReportCard}>
                  <div className={styles.dreCardInner}>
                    <h4 className={styles.dreCardTitle}>Preliminary Report</h4>
                    <div className={styles.dreCardSection}>
                      <div className={styles.dreCardLabel}>FINDINGS</div>
                      {content.dre.sampleFindings.map((line, i) => (
                        <p key={i} className={styles.dreCardLine}>
                          {i + 1}. {line}
                        </p>
                      ))}
                    </div>
                    <div className={styles.dreCardSection}>
                      <div className={styles.dreCardLabel}>IMPRESSION</div>
                      {content.dre.sampleImpression.map((line, i) => (
                        <p key={i} className={styles.dreCardLine}>
                          {i + 1}. {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Advantages */}
                <div className={styles.dreInfo}>
                  <div className={styles.dreAdvantages}>
                    {content.dre.advantages.map((adv, i) => (
                      <div key={i} className={styles.dreAdvItem}>
                        <span className={styles.dreAdvIcon}>{adv.icon}</span>
                        <div>
                          <strong className={styles.dreAdvTitle}>{kr ? adv.titleKr : adv.title}</strong>
                          <p className={styles.dreAdvDesc}>{kr ? adv.descKr : adv.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

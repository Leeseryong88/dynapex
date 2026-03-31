import { useNavigate, Link } from 'react-router-dom'
import { platformData } from '../../data/productContent'
import { useLanguage } from '../../context/LanguageContext'
import { useState, useRef, useEffect } from 'react'
import ScrollReveal from '../ScrollReveal'

export default function Solutions({ t }) {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const scrollRef = useRef(null)
  const [activeIdx, setActiveIdx] = useState(0)

  // 모바일 스크롤 시 인덱스 트래킹 (02/04 형태 표시용)
  const handleScroll = () => {
    if (!scrollRef.current || window.innerWidth > 768) return
    const el = scrollRef.current
    const firstCard = el.children?.[0]
    const secondCard = el.children?.[1]
    const cardWidth = secondCard
      ? secondCard.offsetLeft - firstCard.offsetLeft
      : el.offsetWidth * 0.8 + 16
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

  return (
    <section className="section" style={{ background: '#060a0e' }}>
      <div className="section-inner">
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 'var(--fs-3xl)', fontWeight: 800,
              color: '#fff', margin: '0 0 16px',
              letterSpacing: '-0.03em'
            }}>
              {t.title}
            </h2>
            <p style={{
              fontSize: 'var(--fs-md)', color: 'var(--color-text-muted)',
              marginTop: 10, maxWidth: 640, marginLeft: 'auto', marginRight: 'auto',
              lineHeight: 1.6, wordBreak: 'keep-all'
            }}>
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Product Grid — Image-based like Platform Page */}
        <style>{`
          .solutions-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
            justify-content: center;
          }
          @media (max-width: 1024px) {
            .solutions-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }
          }
          @media (max-width: 768px) {
            .section-title {
              font-size: 1.5rem !important;
              margin-bottom: 24px !important;
            }
            .solutions-grid {
              display: flex !important;
              overflow-x: auto !important;
              scroll-snap-type: x mandatory !important;
              gap: 16px !important;
              padding: 10px 10% 30px !important; /* 좌우 10% 패딩으로 첫/끝 카드 중앙 배치 */
              margin: 0 -24px !important;
              justify-content: flex-start !important; /* 중앙 정렬 해제하여 스크롤 시작점 확보 */
              scrollbar-width: none; 
              -ms-overflow-style: none; 
              -webkit-overflow-scrolling: touch;
            }
            .solutions-grid::-webkit-scrollbar {
              display: none; 
            }
            .solutions-item {
              flex: 0 0 80% !important; 
              scroll-snap-align: center !important;
              display: block !important; 
            }
            .solutions-card {
              border-radius: 12px !important;
              height: 100%;
              background: rgba(15, 22, 30, 0.95) !important;
              border: 1px solid rgba(255, 255, 255, 0.15) !important;
              display: flex !important;
              flex-direction: column !important;
            }
            .solutions-card-image {
              height: 200px !important; /* 모바일에서 너무 크지 않게 조정 */
              padding: 20px !important;
              background: rgba(0, 0, 0, 0.5) !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .solutions-card-text {
              padding: 18px 16px !important;
              gap: 6px !important;
              text-align: left !important; 
              flex: 1 !important;
            }
            .solutions-card-text h3 {
              font-size: 1.1rem !important; 
              line-height: 1.2 !important;
              white-space: normal !important; 
              overflow: visible !important;
            }
            .solutions-card-text span {
              font-size: 0.85rem !important;
              line-height: 1.4 !important;
              white-space: normal !important;
              opacity: 0.7;
            }
          }
          /* 페이지네이션 (02 / 04) */
          .solutions-pagination {
            display: none;
            justify-content: center;
            align-items: center;
            gap: 12px;
            margin-top: 20px;
            color: var(--color-text-muted);
            font-size: 0.9rem;
            letter-spacing: 0.1em;
          }
          .solutions-pagination-num {
            color: #fff;
            font-weight: 700;
          }
          @media (max-width: 768px) {
            .solutions-pagination {
              display: flex;
            }
          }
        `}</style>
        <div className="solutions-grid" ref={scrollRef}>
          {/* View All Card - First position */}
          <div className="solutions-item">
            <Link 
              to="/platform" 
              className="solutions-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(135deg, rgba(0, 255, 204, 0.1), rgba(8, 14, 20, 0.98))',
                border: '1px solid var(--color-accent-border)',
                borderRadius: 16,
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                height: '100%',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,255,204,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent-border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="solutions-card-image" style={{
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 255, 204, 0.03)',
                padding: 24,
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '1.8rem', 
                  fontWeight: 900, 
                  color: 'var(--color-accent)',
                  letterSpacing: '0.05em',
                  marginBottom: 4,
                  textShadow: '0 0 20px rgba(0, 255, 204, 0.4)'
                }}>
                  DYNAPEX
                </div>
                <div style={{ 
                  fontSize: '0.85rem', 
                  color: '#fff', 
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  opacity: 0.8
                }}>
                  PLATFORM
                </div>
              </div>
              <div className="solutions-card-text" style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
                background: 'rgba(0, 255, 204, 0.05)'
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginBottom: 4 }}>
                  {t.viewAll}
                </h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', opacity: 0.9 }}>
                  Explore entire ecosystem →
                </span>
              </div>
            </Link>
          </div>

          {platformData.productCards.map((card, idx) => (
            <div key={card.id} className="solutions-item">
              <Link 
                to={`/products?tab=${card.id}`} 
                className="solutions-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(8, 14, 20, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                  height: '100%',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.4)'
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,204,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="solutions-card-image" style={{
                  height: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 0, 0, 0.35)',
                  padding: 16,
                  overflow: 'hidden',
                }}>
                  <img 
                    src={card.img} 
                    alt={lang === 'kr' ? card.titleKr : card.title} 
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'brightness(0.95)',
                    }} 
                  />
                </div>
                <div className="solutions-card-text" style={{
                  flex: 1,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    margin: 0,
                    letterSpacing: '0.02em',
                  }}>
                    {card.brand}
                  </h3>
                  <span style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.55)',
                  }}>
                    {lang === 'kr' ? card.titleKr : card.title}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* 모바일 페이지네이션 표시 */}
        <div className="solutions-pagination">
          <span style={{ opacity: 0.4, padding: '0 10px' }}>&lt;</span>
          <span className="solutions-pagination-num">
            {(activeIdx + 1).toString().padStart(2, '0')}
          </span>
          <span style={{ opacity: 0.4 }}>/</span>
          <span>{(platformData.productCards.length + 1).toString().padStart(2, '0')}</span>
          <span style={{ opacity: 0.4, padding: '0 10px' }}>&gt;</span>
        </div>
      </div>
    </section>
  )
}

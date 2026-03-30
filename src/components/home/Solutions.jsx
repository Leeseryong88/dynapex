import { useNavigate, Link } from 'react-router-dom'
import { platformData } from '../../data/productContent'
import { useLanguage } from '../../context/LanguageContext'
import ScrollReveal from '../ScrollReveal'

export default function Solutions({ t }) {
  const navigate = useNavigate()
  const { lang } = useLanguage()

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
              margin-bottom: 32px !important;
            }
            .solutions-grid {
              grid-template-columns: repeat(3, 1fr) !important; /* 4열에서 3열로 변경 */
              gap: 8px !important;
            }
            .solutions-item:nth-child(n+7) {
              display: none !important; /* 6개까지만 표시 */
            }
            .solutions-item {
              width: 100% !important; /* 그리드 셀에 맞게 꽉 채움 */
              min-width: 0 !important; /* 최소 너비 해제 */
            }
            .solutions-card {
              border-radius: 6px !important;
              height: 100%;
            }
            .solutions-card-image {
              height: clamp(50px, 15vw, 80px) !important; /* 화면 크기에 비례하여 조절 */
              padding: 4px !important;
            }
            .solutions-card-text {
              padding: 6px 2px !important;
              gap: 2px !important;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              min-height: 45px;
            }
            .solutions-card-text h3 {
              font-size: clamp(8px, 2.2vw, 11px) !important; /* 화면 비례 폰트 */
              line-height: 1.1 !important;
              white-space: nowrap; /* 한 줄 유지 시도 */
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .solutions-card-text span {
              font-size: clamp(7px, 1.8vw, 9px) !important;
              line-height: 1 !important;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              opacity: 0.8;
            }
          }
          /* 아주 작은 화면 (320px 이하) 대응 */
          @media (max-width: 360px) {
            .solutions-grid {
              gap: 4px !important;
            }
            .solutions-card-text {
              padding: 4px 1px !important;
            }
          }
        `}</style>
        <div className="solutions-grid">
          {platformData.productCards.map((card, idx) => (
            <ScrollReveal key={card.id} delay={idx * 100} className="solutions-item">
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
            </ScrollReveal>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: 60 }}>
          <button
            onClick={() => navigate('/platform')}
            className="btn btn-outline"
            style={{ borderRadius: 8, padding: '14px 40px' }}
          >
            {t.viewAll} →
          </button>
        </div>
      </div>
    </section>
  )
}

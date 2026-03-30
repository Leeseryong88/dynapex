import { useState } from 'react'
import ScrollReveal from '../ScrollReveal'

export default function UnmetNeed({ t }) {
  const [showNew, setShowNew] = useState(false)
  const oldItems = [t.old1, t.old2, t.old3, t.old4, t.old5].filter(Boolean)
  const newItems = [t.new1, t.new2, t.new3, t.new4, t.new5].filter(Boolean)

  const mobileStyles = `
    @media (max-width: 768px) {
      .unmet-grid {
        display: flex !important;
        width: 200% !important;
        transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) !important;
        will-change: transform;
        gap: 0 !important; /* 슬라이드 간격 제거로 중앙 정렬 보정 */
      }
      .unmet-grid-container {
        overflow: hidden !important;
        position: relative !important;
        width: 100% !important;
      }
      .unmet-grid-card {
        width: 50% !important;
        flex-shrink: 0 !important;
        display: block !important;
        padding: 0 10px !important; /* 카드 좌우 여백 확보 */
      }
      
      .unmet-img-grid {
        display: flex !important;
        width: 200% !important;
        transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1) !important;
        margin-bottom: 12px !important; 
        gap: 0 !important; /* 이미지 슬라이드 간격 제거 */
      }
      .unmet-img-container {
        overflow: hidden !important;
        width: 100% !important;
        margin-bottom: 0px !important; 
      }
      .unmet-img-item {
        width: 50% !important;
        flex-shrink: 0 !important;
        padding: 0 16px !important; /* 이미지 좌우 중앙 정렬을 위한 패딩 */
      }

      .vs-divider-mobile {
        position: absolute !important;
        right: 15px !important; 
        bottom: 5px !important; 
        top: auto !important;
        width: 45px !important; /* 64px의 약 70% 크기 */
        height: 45px !important;
        background: var(--color-accent) !important;
        color: #060a0e !important;
        border-radius: 50% !important;
        font-weight: 900 !important;
        font-size: 0.45rem !important; /* 버튼 크기에 맞춰 폰트도 약 70% 축소 */
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 4px 15px rgba(0, 255, 204, 0.6) !important;
        cursor: pointer !important;
        z-index: 2000 !important;
        animation: vsPulse 2s infinite !important;
        visibility: visible !important;
        opacity: 1 !important;
        text-align: center !important;
        line-height: 1 !important;
      }
      .vs-divider-desktop {
        display: none !important;
      }
      @keyframes vsPulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 255, 204, 0.7); }
        70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(0, 255, 204, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 255, 204, 0); }
      }
      .card-old, .card-new {
        padding: 8px 16px 24px !important;
        border-radius: 16px !important;
        min-height: 300px !important;
      }
      .card-old h3, .card-new h3 {
        font-size: 1.05rem !important;
        margin-top: 0 !important;
        margin-bottom: 12px !important;
        padding-right: 50px; 
      }
      .section-title {
        font-size: 1.5rem !important; /* 24px로 통일감 있게 조정 */
        word-break: keep-all;
        padding: 0 10px;
      }
    }
    @media (min-width: 769px) {
      .vs-divider-mobile {
        display: none !important;
      }
    }
  `

  const handleToggle = () => {
    setShowNew(!showNew)
  }

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <style>{mobileStyles}</style>
      {/* Brand glow — top-left, large */}
      <img src="/images/brand-glow.png" alt="" style={{
        position: 'absolute', top: '-65%', left: '-46%',
        width: 1400, height: 1400, opacity: 0.65, pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 className="section-title" style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800, marginBottom: 16 }}>
            {t.title}
          </h2>
          {t.subtitle && (
            <p style={{
              textAlign: 'center',
              maxWidth: 720,
              margin: '0 auto 32px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              fontSize: 'var(--fs-md)',
              padding: '0 16px'
            }}>
              {t.subtitle}
            </p>
          )}
        </ScrollReveal>

        {/* PPT Unmet Need Slide Images — Slider Wrapper for Mobile */}
        <div className="unmet-img-container" style={{ position: 'relative' }}>
          {/* DYNAPEX 버튼 - 사진 우측 하단 배치 */}
          <div className="vs-divider-mobile" onClick={handleToggle}>DYNAPEX</div>
          
          <div className="unmet-img-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 32,
            maxWidth: 1000,
            margin: '0 auto 32px',
            transform: showNew ? 'translateX(-50%)' : 'translateX(0)'
          }}>
            <div className="unmet-img-item">
              <ScrollReveal delay={200}>
                <div style={{ position: 'relative' }}>
                  <img
                    src="/images/ppt/image5.png"
                    alt="Unmet Need - Microvascular Lesion Detection"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 20,
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className="unmet-img-item">
              <ScrollReveal delay={400}>
                <div style={{ position: 'relative' }}>
                  <img
                    src="/images/ppt/image4.png"
                    alt="Unmet Need - Structural MRI Limitations"
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 20,
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                      transition: 'transform 0.5s ease'
                    }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <div className="unmet-grid-container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: 16,
              maxWidth: 960,
              margin: '0 auto',
              alignItems: 'stretch',
              transform: showNew ? 'translateX(-50%)' : 'translateX(0)'
            }}
            className="unmet-grid"
          >
            {/* Card Old */}
            <div className="unmet-grid-card">
              <div className="card card-old" style={{
                textAlign: 'left',
                padding: '24px 40px 40px',
                border: '1px solid rgba(255,100,100,0.15)',
                background: 'rgba(255,100,100,0.02)',
                height: '100%'
              }}>
                <h3 style={{
                  color: 'rgba(255,100,100,0.9)',
                  marginBottom: 20,
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}>{t.oldTitle}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {oldItems.map((item, i) => (
                    <li key={i}>
                      <span>✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* VS Divider Desktop */}
            <div 
              className="vs-divider-desktop" 
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.15)', fontWeight: 900, fontSize: '2rem',
                letterSpacing: '0.1em',
                padding: '0 24px',
                fontStyle: 'italic',
                zIndex: 10
              }}
            >
              VS
            </div>

            {/* Card New */}
            <div className="unmet-grid-card">
              <div className="card card-new" style={{
                textAlign: 'left',
                padding: '24px 40px 40px',
                border: '1px solid var(--color-accent-border)',
                background: 'var(--color-accent-bg)',
                height: '100%'
              }}>
                <h3 style={{
                  color: 'var(--color-accent)',
                  marginBottom: 20,
                  fontSize: '1.25rem',
                  fontWeight: 700
                }}>{t.newTitle}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {newItems.map((item, i) => (
                    <li key={i}>
                      <span>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: 960,
            margin: '40px auto 0',
            padding: '24px 32px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            fontSize: '0.9rem',
            textAlign: 'center',
            wordBreak: 'keep-all',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6
          }}
        >
          {t.note}
        </div>
      </div>
    </section>
  )
}

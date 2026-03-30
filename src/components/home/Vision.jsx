import { useEffect, useRef, useState } from 'react'

const members = [
  { name: 'JI-HWAN JANG, MBA', nameKr: '장지환', role: 'ceo', img: 'ji-hwan jang', sub: null, pos: 'center top',
    education: 'Yonsei University MBA', educationKr: '연세대학교 경영학 석사',
    linkedin: null },
  { name: 'NAK-YOUNG KIM, M.S.', nameKr: '김낙영', role: 'cto', img: 'nak-young kim', sub: null, pos: 'center top',
    education: 'KAIST M.S.', educationKr: 'KAIST 석사',
    linkedin: null },
  { name: 'JI-EUN PARK M.D., PH.D.', nameKr: '박지은', role: 'cmo', img: 'ji-eun park', sub: 'cmoSubJH', pos: 'center top',
    education: 'Ulsan University M.D., Ph.D.', educationKr: '울산대학교 의학 박사',
    linkedin: null },
  { name: 'HO-SUNG KIM M.D., PH.D.', nameKr: '김호성', role: 'adviser', img: 'ho-sung_kim', sub: 'adviserSub', pos: 'center 15%', scale: 1.10,
    education: 'Asan Medical Center, Professor', educationKr: '서울아산병원 영상의학과 교수',
    linkedin: null },
]

export default function Vision({ t, boardT, autoAnimate = false, lang = 'en' }) {
  const sectionRef = useRef(null)
  const [animate, setAnimate] = useState(autoAnimate)

  useEffect(() => {
    if (autoAnimate) {
      const timer = setTimeout(() => setAnimate(true), 300)
      return () => clearTimeout(timer)
    }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true) },
      { threshold: 0.3 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [autoAnimate])

  const baseMobileStyles = `
    @media (max-width: 768px) {
      .board-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 16px !important;
      }
      .board-card {
        padding: 16px 12px !important;
        border-radius: 16px !important;
      }
      .vision-mission-grid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      .dynamic-title-wrap {
        flex-direction: column !important;
        align-items: center !important;
        margin-bottom: 32px !important;
      }
      .dynamic-title-part {
        font-size: clamp(20px, 6vw, 32px) !important;
      }
    }
    @media (max-width: 480px) {
      .board-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `

  return (
    <section className="section" ref={sectionRef}>
      <style>{baseMobileStyles}</style>
      {/* Brand glow — top-left, large */}
      <img
        src="/images/brand-glow.png"
        alt=""
        style={{
          position: 'absolute',
          top: '-65%',
          left: '-46%',
          width: 1400,
          height: 1400,
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Brand glow — bottom-right, large */}
      <img
        src="/images/brand-glow.png"
        alt=""
        style={{
          position: 'absolute',
          bottom: '-40%',
          right: '-46%',
          width: 1400,
          height: 1400,
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>

          {/* ── DYNAPEX title ── */}
          <h1 style={{
            fontWeight: 800,
            letterSpacing: '0.2em',
            fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
            color: '#fff',
            margin: '0 0 20px',
            lineHeight: 1.2,
          }}>
            DYNAPEX
          </h1>

          {/* ── DYN AMIC JOURNEY TO THE APEX — split animation ── */}
          {(() => {
            const baseFont = {
              fontFamily: "var(--font-primary)",
              fontSize: 'clamp(28px, 4.5vw, 52px)',
              fontWeight: 200,
              lineHeight: 1,
              letterSpacing: '0.08em',
            }
            return (
              <div
                className="dynamic-title-wrap"
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  marginBottom: 48,
                  minHeight: 'clamp(48px, 6vw, 72px)',
                }}
              >
                <span className="dynamic-title-part" style={{ ...baseFont, color: '#fff', whiteSpace: 'nowrap' }}>
                  DYN
                </span>
                <span
                  className="dynamic-title-part"
                  style={{
                    ...baseFont,
                    color: 'var(--color-accent)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    display: 'inline-block',
                    maxWidth: animate ? '900px' : '0px',
                    opacity: animate ? 1 : 0,
                    transition: 'max-width 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 0.8s ease 0.5s',
                  }}
                >
                  AMIC JOURNEY TO THE{'\u00A0'}
                </span>
                <span className="dynamic-title-part" style={{ ...baseFont, color: '#fff', whiteSpace: 'nowrap' }}>
                  APEX
                </span>
              </div>
            )
          })()}

          {/* Vision / Mission cards */}
          <div
            className="vision-mission-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(20px, 4vw, 48px)',
              maxWidth: 1000,
              margin: '0 auto',
              opacity: animate ? 1 : 0,
              transform: animate ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s',
            }}
          >
            <div className="card">
              <p className="kicker">{t.vision}</p>
              <p className="card-text">{t.visionText}</p>
            </div>
            <div className="card">
              <p className="kicker">{t.mission}</p>
              <p className="card-text">{t.missionText}</p>
            </div>
          </div>
        </div>

        {/* ── Board Members ── */}
        {boardT && (
          <div style={{ marginTop: 'clamp(60px, 8vw, 100px)' }}>
            <h2 className="section-title" style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
              {boardT.title}
            </h2>
            <div
              className="board-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'clamp(18px, 3vw, 32px)',
                maxWidth: 1200,
                margin: '0 auto',
              }}
            >
              {members.map((m) => (
                <div
                  key={m.name}
                  className="board-card"
                  style={{
                    background: 'rgba(8,14,20,0.72)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 24,
                    padding: 'clamp(18px, 2.5vw, 26px)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 255, 204, 0.15)'
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 204, 0.25)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(8,14,22,0.3) 0%, rgba(8,14,22,0.6) 100%)',
                      borderRadius: 18,
                      overflow: 'hidden',
                      marginBottom: 18,
                      aspectRatio: '3 / 4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <img
                      src={`/images/board members/${m.img}.png`}
                      alt={`${m.name} — DYNAPEX board member`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: m.pos || 'center top',
                        transform: m.scale ? `scale(${m.scale})` : undefined,
                        filter: 'brightness(0.92) contrast(1.05)',
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '30%',
                      background: 'linear-gradient(transparent, rgba(8,14,20,0.4))',
                      pointerEvents: 'none',
                    }} />
                  </div>
                  <p style={{
                    fontWeight: 700,
                    color: '#fff',
                    margin: '0 0 6px',
                    fontSize: '0.88rem',
                    letterSpacing: '0.02em',
                    lineHeight: 1.3,
                    whiteSpace: 'nowrap',
                  }}>
                    {lang === 'kr' ? m.nameKr : m.name}
                  </p>
                  <p style={{
                    margin: '0 0 8px',
                    color: 'var(--color-text-muted, rgba(255,255,255,0.55))',
                    fontSize: '0.85rem',
                    lineHeight: 1.4,
                  }}>
                    {boardT[m.role]}
                    {m.sub && (
                      <>
                        <br />
                        {boardT[m.sub]}
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

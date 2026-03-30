import { useState, useEffect } from 'react'

const hospitals = [
  { logo: '/images/hospitals/asan.png', alt: '서울아산병원 Asan Medical Center' },
  { logo: '/images/hospitals/samsung.png', alt: '삼성서울병원 Samsung Medical Center' },
  { logo: '/images/hospitals/snuh.png', alt: '서울대학교병원 Seoul National University Hospital' },
  { logo: '/images/hospitals/severance.png', alt: '세브란스병원 Severance Hospital' },
  { logo: '/images/hospitals/stmary-logo.svg', alt: "서울성모병원 Seoul St. Mary's Hospital" },
]

export default function TrustedBy({ t }) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate logos for seamless loop
  const displayedHospitals = [...hospitals, ...hospitals]

  // CSS for infinite scroll animation
  const scrollStyles = `
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .carousel-track {
      animation: scroll 30s linear infinite;
      animation-play-state: ${isPaused ? 'paused' : 'running'};
    }

    @media (max-width: 768px) {
      .carousel-item {
        flex: 0 0 calc(50% - 8px) !important; /* 모바일에서 2개씩 보이게 수정 */
        min-width: 140px !important;
        padding: 16px 8px !important;
        min-height: 80px !important;
      }
      .carousel-track {
        gap: 8px !important;
        animation-duration: 15s !important; /* 모바일에서는 트랙이 짧으므로 속도 조절 */
      }
    }
  `

  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(180deg, rgba(6,10,14,0.95), rgba(8,14,20,0.98))',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{scrollStyles}</style>

      {/* Brand glow — bottom-left, spacious section */}
      <img
        src="/images/brand-glow.png"
        alt=""
        style={{
          position: 'absolute',
          bottom: '-40%',
          left: '-12%',
          width: 900,
          height: 900,
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700,
          color: '#fff', margin: '0 0 6px',
        }}>
          {t.title}
        </h2>

        {/* Carousel Wrapper */}
        <div
          style={{
            marginTop: 40,
            overflow: 'hidden',
            position: 'relative',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Track with Auto-Scrolling Logos */}
          <div
            className="carousel-track"
            style={{
              display: 'flex',
              gap: 16,
              width: 'fit-content',
            }}
          >
            {displayedHospitals.map((hospital, i) => (
              <div
                key={i}
                className="carousel-item"
                style={{
                  flex: '0 0 calc(25% - 12px)',
                  minWidth: 180,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '24px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 100,
                  transition: 'all 0.25s ease',
                  backdropFilter: 'blur(4px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,204,0.3)'
                  e.currentTarget.style.background = 'rgba(0,255,204,0.06)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,255,204,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <img
                  src={hospital.logo}
                  alt={hospital.alt}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: 56,
                    objectFit: 'contain',
                  }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Gradient fade-out on sides for visual polish */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: 0,
            width: '15%',
            height: 'calc(100% - 40px)',
            background: 'linear-gradient(90deg, rgba(6,10,14,0.95) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: 0,
            width: '15%',
            height: 'calc(100% - 40px)',
            background: 'linear-gradient(270deg, rgba(6,10,14,0.95) 0%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>
    </section>
  )
}

import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useState, useEffect } from 'react'

const rotatingTerms = {
  KR: ['교모세포종', '뇌전이', '다발성경화증', '파킨슨병', '뇌졸중'],
  EN: ['Glioblastoma', 'Brain Metastasis', 'Multiple Sclerosis', "Parkinson's", 'Stroke'],
}

export default function Hero({ t }) {
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const [currentTermIndex, setCurrentTermIndex] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  const langKey = lang === 'ko' ? 'KR' : 'EN'
  const currentTerm = rotatingTerms[langKey][currentTermIndex]

  // Rotate terms every 2.5 seconds
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800)
    const rotateTimer = setTimeout(() => {
      setCurrentTermIndex(prev => (prev + 1) % rotatingTerms[langKey].length)
      setFadeOut(false)
    }, 2300)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(rotateTimer)
    }
  }, [currentTermIndex, langKey])

  // CSS for fade animation and mobile optimization
  const fadeStyles = `
    @keyframes fadeInOut {
      0% { opacity: 1; }
      70% { opacity: 1; }
      100% { opacity: 0; }
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
      40% {transform: translateY(-10px);}
      60% {transform: translateY(-5px);}
    }

    .rotating-term {
      display: inline-block;
      animation: fadeInOut 2.3s ease-in-out;
    }

    .scroll-indicator {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      color: rgba(255,255,255,0.4);
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      animation: bounce 2s infinite;
      cursor: pointer;
      transition: color 0.3s;
    }

    .scroll-indicator:hover {
      color: var(--color-accent);
    }

    .scroll-indicator span {
      width: 1px;
      height: 40px;
      background: currentColor;
    }

    @keyframes fadeInHero {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .hero-content-inner {
      animation: fadeInHero 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .hero-video-bg {
      display: none;
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 100vh !important;
        min-height: 500px !important;
      }
      .hero-video-bg {
        display: block !important;
        opacity: 1 !important;
        object-fit: cover !important;
        filter: blur(20px) brightness(0.3) !important;
        transform: scale(1.1);
      }
      .hero-video-main {
        object-fit: cover !important; /* contain에서 cover로 변경하여 화면을 꽉 채움 */
        height: 100% !important;
        width: 100% !important;
        background: transparent !important;
        opacity: 0.8 !important; /* 배경 영상과 조화를 위해 약간 투명도 조절 */
      }
      .hero-content {
        padding: 0 20px !important;
        background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%) !important;
        justify-content: center !important;
      }
      .hero-subtitle {
        font-size: clamp(1.2rem, 5vw, 1.6rem) !important;
        line-height: 1.4 !important;
        font-weight: 800 !important;
        margin-bottom: 24px !important;
        text-shadow: 0 2px 15px rgba(0,0,0,0.8);
      }
      .scroll-indicator {
        bottom: 20px;
      }
      .scroll-indicator span {
        height: 30px;
      }
      .hero-cta {
        padding: 12px 32px !important;
        font-size: 15px !important;
        margin-top: 24px !important;
      }
    }
  `

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <style>{fadeStyles}</style>

      {/* Background layer for mobile (blurred fill) */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-bg"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', zIndex: 0,
        }}
      >
        <source src="/video/intro.mov" type="video/mp4" />
      </video>

      {/* Main video layer */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="hero-video-main"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', zIndex: 1,
        }}
      >
        <source src="/video/intro.mov" type="video/mp4" />
      </video>

      <div
        className="hero-content"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'transparent', // Gradient is moved to media query
          padding: '0 24px',
          zIndex: 2
        }}
      >
        <div className="hero-content-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Rotating Disease Terms */}
          <div
            style={{
              minHeight: '2.6em',
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              className="rotating-term"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                color: 'var(--color-accent)',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textShadow: '0 0 20px rgba(0,255,204,0.4)'
              }}
            >
              {currentTerm}
            </span>
          </div>

          {/* Subtitle */}
          <h2
            className="hero-subtitle"
            style={{
              fontSize: 'clamp(1.4rem, 4vw, 2.8rem)',
              color: '#fff',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              maxWidth: 800,
              lineHeight: 1.2,
              margin: '0 0 24px',
              wordBreak: 'keep-all',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)'
            }}
          >
            {t.subtitle}
          </h2>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/contact')}
            className="btn btn-primary hero-cta"
            style={{
              marginTop: 16,
              padding: '16px 48px',
              fontSize: 16,
              borderRadius: 8
            }}
          >
            {t.cta}
          </button>
        </div>
      </div>

      <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <span></span>
        SCROLL
      </div>
    </section>
  )
}

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

    .rotating-term {
      display: inline-block;
      animation: fadeInOut 2.3s ease-in-out;
    }

    @media (max-width: 768px) {
      .hero-section {
        height: 80vh !important; /* 모바일에서는 높이를 조금 줄여서 비디오가 덜 잘리게 함 */
        min-height: 400px !important;
      }
      .hero-content {
        padding: 0 20px !important;
      }
      .hero-subtitle {
        font-size: 1.1rem !important;
        line-height: 1.5 !important;
        word-break: keep-all;
      }
    }
  `

  return (
    <section
      className="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style>{fadeStyles}</style>

      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center', /* 비디오 중앙 정렬 */
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
          background: 'rgba(0,0,0,0.35)',
          padding: '0 24px',
        }}
      >
        {/* Rotating Disease Terms */}
        <div
          style={{
            minHeight: '2.6em',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="rotating-term"
            style={{
              fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)',
              color: 'rgb(0,255,204)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {currentTerm}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.04em',
            maxWidth: 600,
            lineHeight: 1.6,
            margin: 0,
            wordBreak: 'keep-all',
          }}
        >
          {t.subtitle}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/contact')}
          style={{
            marginTop: 32,
            padding: '18px 52px',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#060a0e',
            background: 'rgb(0,255,204)',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            boxShadow: '0 0 24px rgba(0,255,204,0.3)',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#fff'
            e.target.style.boxShadow = '0 0 32px rgba(255,255,255,0.3)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'rgb(0,255,204)'
            e.target.style.boxShadow = '0 0 24px rgba(0,255,204,0.3)'
          }}
        >
          {t.cta}
        </button>

      </div>
    </section>
  )
}

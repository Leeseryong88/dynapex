import { useRef, useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext'

const conferences = [
  { name: 'RSNA 2025', dates: '2025.11.30 – 12.04', location: 'Chicago, USA', desc: 'North American Radiology', img: '/images/conference/rsna.jpg' },
  { name: 'ASNR 2025', dates: '2025.05.17 – 05.22', location: 'San Diego, USA', desc: 'American Neuroradiology', img: '/images/conference/asnr.jpg' },
  { name: 'ISMRM 2025', dates: '2025.05.10 – 05.15', location: 'Honolulu, USA', desc: 'Magnetic Resonance in Medicine', img: '/images/conference/ismrm.jpg' },
  { name: 'WFNR 2024', dates: '2024.10.23 – 10.26', location: 'Seoul, Korea', desc: 'World Federation of Neurorehabilitation', img: '/images/conference/wfnr.jpg' },
  { name: 'ECR 2024', dates: '2024.02.28 – 03.03', location: 'Vienna, Austria', desc: 'European Congress of Radiology', img: '/images/conference/ecr.jpg' },
]

export default function Conference({ t }) {
  const { lang } = useLanguage()
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const getKicker = () => t?.kicker || (lang === 'kr' ? '학회 참여' : 'Conference')
  const getTitle = () => t?.title || (lang === 'kr' ? '주요 학회 참여 실적' : 'Conference & Exhibition')

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [conferences])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 320 + 20 // card width + gap
    el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' })
  }

  const showArrows = conferences.length > 3

  return (
    <section className="section">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="kicker">{getKicker()}</span>
          <span style={{ display: 'block', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#fff', marginTop: '8px' }}>
            {getTitle()}
          </span>
        </h2>

        {/* Carousel wrapper */}
        <div style={{ position: 'relative', maxWidth: 1100, margin: '0 auto' }}>

          {/* Left arrow */}
          {showArrows && canScrollLeft && (
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              style={{
                position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(0,255,204,0.15)', border: '1px solid rgba(0,255,204,0.3)',
                color: 'rgb(0,255,204)', fontSize: '1.3rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,204,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,204,0.15)'}
            >
              &#8249;
            </button>
          )}

          {/* Right arrow */}
          {showArrows && canScrollRight && (
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              style={{
                position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
                zIndex: 10, width: 44, height: 44, borderRadius: '50%',
                background: 'rgba(0,255,204,0.15)', border: '1px solid rgba(0,255,204,0.3)',
                color: 'rgb(0,255,204)', fontSize: '1.3rem', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,204,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,204,0.15)'}
            >
              &#8250;
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="conference-scroll-track"
            style={{
              display: 'flex',
              gap: 20,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              paddingBottom: 8,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <style>{`
              .conference-scroll-track::-webkit-scrollbar { display: none; }
            `}</style>

            {conferences.map((conf, idx) => (
              <article
                key={idx}
                className="conference-card"
                style={{
                  flex: '0 0 auto',
                  width: conferences.length <= 3 ? 'calc(33.333% - 14px)' : 320,
                  minWidth: conferences.length <= 3 ? 280 : 320,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  scrollSnapAlign: 'start',
                  transition: 'all 0.25s',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(0,255,204,0.4)'
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,255,204,0.1)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Image container */}
                <div style={{ height: 160, overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                  <img
                    src={conf.img}
                    alt={conf.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.parentElement.style.display = 'flex'
                      e.currentTarget.parentElement.style.alignItems = 'center'
                      e.currentTarget.parentElement.style.justifyContent = 'center'
                      e.currentTarget.parentElement.style.color = 'rgba(255,255,255,0.2)'
                      e.currentTarget.parentElement.style.fontSize = '0.9rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ display: 'none', width: '100%', height: '100%', fontSize: '0.85rem', textAlign: 'center' }}>
                    {conf.name}
                  </div>
                </div>

                {/* Content container */}
                <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Date badge */}
                  <div style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'rgb(0,255,204)',
                    background: 'rgba(0,255,204,0.1)',
                    padding: '4px 12px',
                    borderRadius: 6,
                    width: 'fit-content',
                    marginBottom: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    {conf.dates}
                  </div>

                  {/* Conference name */}
                  <h3 style={{
                    margin: '0 0 8px',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.3,
                  }}>
                    {conf.name}
                  </h3>

                  {/* Description */}
                  <p style={{
                    margin: '0 0 8px',
                    fontSize: '0.85rem',
                    color: 'rgba(255,255,255,0.65)',
                    lineHeight: 1.4,
                    flex: 1,
                  }}>
                    {conf.desc}
                  </p>

                  {/* Location */}
                  <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    📍 {conf.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

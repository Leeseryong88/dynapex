import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { getPosts } from '../../firebase/firestore'
import ScrollReveal from '../ScrollReveal'

const catColors = { notice: 'rgb(0,255,204)', news: 'rgb(100,180,255)', event: 'rgb(255,180,60)' }
const catLabelsKr = { notice: '공지', news: '뉴스', event: '행사' }

export default function LatestNews() {
  const { lang } = useLanguage()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    getPosts({ publishedOnly: true, pageSize: 10 })
      .then(r => setPosts(r.docs || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

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
  }, [posts])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = 300 + 20 // card min-width + gap
    el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' })
  }

  const formatDate = (ts) => {
    if (!ts) return ''
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString(lang === 'kr' ? 'ko-KR' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  if (loading) return null
  if (posts.length === 0) return null

  const showArrows = posts.length > 3

  return (
    <section className="section" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="section-inner">
        <style>{`
          @media (max-width: 768px) {
            .section-title {
              font-size: 1.5rem !important;
            }
          }
        `}</style>
        <ScrollReveal>
          <h2 className="section-title">
            {lang === 'kr' ? '뉴스 & 공지사항' : 'News & Announcements'}
          </h2>
        </ScrollReveal>

        {/* Carousel wrapper */}
        <ScrollReveal delay={200}>
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
              className="news-scroll-track"
              style={{
                display: 'flex',
                gap: 20,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingBottom: 8,
                /* Hide scrollbar but keep functionality */
                scrollbarWidth: 'none',       /* Firefox */
                msOverflowStyle: 'none',      /* IE/Edge */
              }}
            >
              <style>{`
                .news-scroll-track::-webkit-scrollbar { display: none; }
              `}</style>

              {posts.map(post => (
                <article
                  key={post.id}
                  className="news-card"
                  style={{
                    flex: '0 0 auto',
                    width: posts.length <= 3 ? 'calc(33.333% - 14px)' : 300,
                    minWidth: posts.length <= 3 ? 260 : 300,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                    overflow: 'hidden',
                    scrollSnapAlign: 'start',
                    transition: 'border-color 0.25s, transform 0.25s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,204,0.3)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ height: 180, overflow: 'hidden', background: 'rgba(255,255,255,0.02)' }}>
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.15)', fontSize: '2rem' }}>
                        DYNAPEX
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{
                        fontSize: '0.68rem', fontWeight: 700,
                        color: catColors[post.category] || '#fff',
                        background: `${catColors[post.category] || '#fff'}18`,
                        padding: '2px 10px', borderRadius: 6,
                        textTransform: 'uppercase',
                      }}>
                        {lang === 'kr' ? (catLabelsKr[post.category] || post.category) : post.category}
                      </span>
                      {post.pinned && (
                        <span style={{ fontSize: '0.68rem', color: 'rgb(0,255,204)' }}>&#9733; {lang === 'kr' ? '고정' : 'Pinned'}</span>
                      )}
                    </div>
                    <h3 style={{
                      margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 600,
                      color: '#fff', lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>
                      {lang === 'kr' ? post.title : (post.titleEn || post.title)}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                      {formatDate(post.createdAt)}{post.author ? ` · ${post.author}` : ''}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Scroll indicator dots */}
            {posts.length > 3 && (
              <div style={{
                display: 'flex', justifyContent: 'center', gap: 6,
                marginTop: 16,
              }}>
                <div style={{
                  width: 30, height: 3, borderRadius: 2,
                  background: canScrollLeft ? 'rgba(255,255,255,0.15)' : 'rgb(0,255,204)',
                  transition: 'background 0.3s',
                }} />
                <div style={{
                  width: 30, height: 3, borderRadius: 2,
                  background: canScrollLeft && canScrollRight ? 'rgb(0,255,204)' : 'rgba(255,255,255,0.15)',
                  transition: 'background 0.3s',
                }} />
                <div style={{
                  width: 30, height: 3, borderRadius: 2,
                  background: canScrollRight ? 'rgba(255,255,255,0.15)' : 'rgb(0,255,204)',
                  transition: 'background 0.3s',
                }} />
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

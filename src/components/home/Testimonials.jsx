import { useState, useEffect } from 'react'

export default function Testimonials({ t }) {
  const [active, setActive] = useState(0)

  // Auto-rotate every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % t.items.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [t.items.length])

  const item = t.items[active]

  return (
    <section style={{ padding: '100px 24px', background: '#060a0e' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700,
          color: '#fff', margin: '0 0 48px',
        }}>
          {t.title}
        </h2>

        {/* Quote */}
        <div style={{
          position: 'relative',
          padding: '40px 32px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 12,
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {/* Large quote mark */}
          <div style={{
            position: 'absolute', top: 20, left: 28,
            fontSize: 60, color: 'rgba(0,255,204,0.15)', fontFamily: 'Georgia, serif',
            lineHeight: 1,
          }}>
            "
          </div>

          <p style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.8,
            fontStyle: 'italic',
            margin: '0 0 28px',
            textAlign: 'justify',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            "{item.quote}"
          </p>

          {/* Attribution */}
          <div>
            <div style={{
              fontSize: 15, fontWeight: 700, color: 'rgb(0,255,204)',
            }}>
              {item.name}
            </div>
            <div style={{
              fontSize: 13, color: 'rgba(255,255,255,0.5)',
              marginTop: 4,
            }}>
              {item.role}, {item.institution}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 10, marginTop: 28,
        }}>
          {t.items.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                background: i === active ? 'rgb(0,255,204)' : 'rgba(255,255,255,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

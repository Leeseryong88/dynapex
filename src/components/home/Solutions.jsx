import { useNavigate } from 'react-router-dom'

export default function Solutions({ t }) {
  const navigate = useNavigate()

  return (
    <section style={{ padding: 'clamp(60px, 8vw, 80px) 24px', background: '#060a0e' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header — kicker removed, white title/subtitle kept */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700,
            color: '#fff', margin: '0 0 0',
          }}>
            {t.title}
          </h2>
          <p style={{
            fontSize: 15, color: 'rgba(255,255,255,0.55)',
            marginTop: 10, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {t.subtitle}
          </p>
        </div>

        {/* Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 20,
        }}>
          {t.products.map((p) => (
            <div
              key={p.id}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10,
                padding: '28px 24px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,255,204,0.3)'
                e.currentTarget.style.background = 'rgba(0,255,204,0.04)'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,255,204,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: 2, background: 'rgb(0,255,204)', opacity: 0.6,
              }} />

              <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>

              <h3 style={{
                fontSize: 17, fontWeight: 700, color: 'rgb(0,255,204)',
                margin: '0 0 8px', letterSpacing: '0.02em',
              }}>
                {p.name}
              </h3>

              <p style={{
                fontSize: 13.5, color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.6, margin: 0, textAlign: 'justify', wordBreak: 'keep-all', overflowWrap: 'break-word',
              }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button
            onClick={() => navigate('/platform')}
            style={{
              padding: '12px 36px',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'rgb(0,255,204)',
              background: 'transparent',
              border: '1px solid rgba(0,255,204,0.4)',
              borderRadius: 4,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'rgba(0,255,204,0.08)'
              e.target.style.borderColor = 'rgb(0,255,204)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.borderColor = 'rgba(0,255,204,0.4)'
            }}
          >
            {t.viewAll} →
          </button>
        </div>
      </div>
    </section>
  )
}

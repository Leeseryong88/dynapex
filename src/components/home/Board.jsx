const members = [
  { name: 'JI-HWAN JANG, MBA', role: 'ceo', img: 'ji-hwan jang', sub: null, pos: 'center top' },
  { name: 'NAK-YOUNG KIM, M.S.', role: 'cto', img: 'nak-young kim', sub: null, pos: 'center top' },
  { name: 'JI-EUN PARK M.D., PH.D.', role: 'cmo', img: 'ji-eun park', sub: 'cmoSubJH', pos: 'center top' },
  { name: 'HO-SUNG KIM M.D., PH.D.', role: 'adviser', img: 'ho-sung_kim', sub: 'adviserSub', pos: 'center 15%', scale: 1.10 },
]

export default function Board({ t }) {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Brand glow — bottom-right, large */}
      <img src="/images/brand-glow.png" alt="" style={{
        position: 'absolute', bottom: '-72%', right: '-46%',
        width: 1400, height: 1400, opacity: 0.65, pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title" style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          {t.title}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'clamp(18px, 3vw, 32px)',
            maxWidth: 1060,
            margin: '0 auto',
          }}
        >
          {members.map((m) => (
            <div
              key={m.name}
              style={{
                background: 'rgba(8,14,20,0.72)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 24,
                padding: 'clamp(18px, 2.5vw, 26px)',
                transition: 'transform 0.2s',
                textAlign: 'center',
              }}
            >
              {/* Photo area — matches distributor image container */}
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
                {/* Subtle bottom gradient for text readability & visual consistency */}
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
                fontSize: '0.95rem',
                letterSpacing: '0.02em',
                lineHeight: 1.3,
              }}>
                {m.name}
              </p>
              <p style={{
                margin: 0,
                color: 'var(--color-text-muted, rgba(255,255,255,0.55))',
                fontSize: '0.85rem',
                lineHeight: 1.4,
              }}>
                {t[m.role]}
                {m.sub && (
                  <>
                    <br />
                    {t[m.sub]}
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

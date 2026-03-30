const distributors = [
  {
    name: 'Korea Computor Motion ISG',
    region: 'South Korea',
    img: 'Korea Computor Motion ISG.png',
    details: [
      'Address: #807, 19, Seoun-ro, Seocho-gu, Seoul, 06732, Republic of Korea',
      'Company Tel: 82-2-6012-5185',
      'Customer Service Center: 82-2-6012-5185',
      'Company Email: daesung0307@naver.com',
    ],
  },
  {
    name: 'Physio Tech',
    region: 'Japan',
    img: 'physio-tech.png',
    logoScale: 2.2,
    details: [
      'Address: 1-12-9 Nihonbashi-Hamacho, Chuo-ku, Tokyo 103-0007 JAPAN',
      'Phone: +81-3-3864-2781',
      'E-mail: hirata@physio-tech.co.jp',
    ],
  },
  {
    name: 'medicalAI.top',
    region: 'China',
    img: 'medicalAI.top.png',
    details: [
      'Address: 1201, No.12 building, Wan Da Plaza, 93, Jianguo Road, Chaoyang, Beijing',
      'Phone: +86-13381109780',
      'Email: nan.yang@medicalai.top',
    ],
  },
]

export default function Distributors({ t }) {
  return (
    <section className="section">
      {/* Brand glow — bottom-left, large */}
      <img
        src="/images/brand-glow.png"
        alt=""
        style={{
          position: 'absolute',
          bottom: '-65%',
          left: '-46%',
          width: 1400,
          height: 1400,
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title" style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          {t.title}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(18px, 3vw, 32px)',
          }}
        >
          {distributors.map((d) => (
            <div
              key={d.name}
              className="distributor-card"
              style={{
                background: 'rgba(8,14,20,0.72)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 24,
                padding: 'clamp(22px, 3vw, 30px)',
                transition: 'transform 0.2s',
                minHeight: 360,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  background: 'rgba(5,9,14,0.65)',
                  borderRadius: 18,
                  padding: '24px',
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}
              >
                <img
                  src={`/images/distributor/${d.img}`}
                  alt={`${d.name} — ${d.region} distributor`}
                  loading="lazy"
                  style={{ maxWidth: '100%', maxHeight: d.logoScale ? 60 * d.logoScale : 60, objectFit: 'contain' }}
                />
              </div>
              <p style={{ fontWeight: 700, color: '#fff', margin: '0 0 14px', fontSize: '1.05rem', letterSpacing: '0.02em' }}>{d.region}</p>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.7, textAlign: 'left', wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
                {d.details.map((line, i) => {
                  const [label, ...rest] = line.split(': ')
                  const value = rest.join(': ')
                  return (
                    <p key={i} style={{ margin: '6px 0' }}>
                      <span style={{ color: 'var(--color-text-subtle)', fontWeight: 600, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}:</span>
                      <br />
                      <span style={{ wordBreak: 'break-all' }}>{value}</span>
                    </p>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

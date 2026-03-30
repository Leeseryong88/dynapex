const hospitals = [
  { logo: '/images/hospitals/asan-logo.svg', alt: '서울아산병원 Asan Medical Center' },
  { logo: '/images/hospitals/samsung-logo.svg', alt: '삼성서울병원 Samsung Medical Center' },
  { logo: '/images/hospitals/snuh-logo.svg', alt: '서울대학교병원 Seoul National University Hospital' },
  { logo: '/images/hospitals/severance-logo.svg', alt: '세브란스병원 Severance Hospital' },
  { logo: '/images/hospitals/stmary-logo.svg', alt: "서울성모병원 Seoul St. Mary's Hospital" },
]

export default function Milestones({ t, trustedBy }) {
  const items = [
    { num: '2019', label: t.founded },
    { num: '30+', label: t.hospitals },
    { num: '30+', label: t.aiModels },
    { num: '20+', label: t.papers },
    ...(t.zeroFI ? [{ num: 'Zero FI', label: t.zeroFI }] : []),
  ]

  const mobileStyles = `
    @media (max-width: 768px) {
      .milestone-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 20px !important;
      }
      .hospital-grid {
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 12px !important;
      }
      .hospital-card {
        padding: 16px 8px !important;
        min-height: 80px !important;
      }
    }
  `

  return (
    <section className="section">
      <style>{mobileStyles}</style>
      {/* Brand glow — bottom-right, large */}
      <img
        src="/images/brand-glow.png"
        alt=""
        style={{
          position: 'absolute',
          bottom: '-72%',
          right: '-46%',
          width: 1400,
          height: 1400,
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">
          {t.title}
        </h2>

        {/* Numbers Grid */}
        <div
          className="milestone-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 'clamp(16px, 3vw, 40px)',
            maxWidth: 1000,
            margin: '0 auto',
          }}
        >
          {items.map((item, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '20px 8px', minWidth: 0 }}>
              <div className="milestone-num">{item.num}</div>
              <div className="milestone-label" dangerouslySetInnerHTML={{ __html: item.label.replace(/\n/g, '<br/>') }} />
            </div>
          ))}
        </div>

        {/* Trusted By — Hospital Logos */}
        {trustedBy && (
          <div style={{ marginTop: 'clamp(48px, 6vw, 72px)', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 6px',
            }}>
              {trustedBy.title}
            </h2>
            <div className="hospital-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 16,
              marginTop: 40,
              alignItems: 'center',
            }}>
              {hospitals.map((hospital, i) => (
                <div
                  key={i}
                  className="hospital-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 8,
                    padding: '24px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: 100,
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,255,204,0.2)'
                    e.currentTarget.style.background = 'rgba(0,255,204,0.03)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  <img
                    src={hospital.logo}
                    alt={hospital.alt}
                    style={{ width: '100%', height: 'auto', maxHeight: 56, objectFit: 'contain' }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

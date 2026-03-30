export default function UnmetNeed({ t }) {
  const oldItems = [t.old1, t.old2, t.old3, t.old4, t.old5].filter(Boolean)
  const newItems = [t.new1, t.new2, t.new3, t.new4, t.new5].filter(Boolean)

  const mobileStyles = `
    @media (max-width: 768px) {
      .unmet-grid {
        grid-template-columns: 1fr !important;
        gap: 24px !important;
      }
      .vs-divider {
        writing-mode: horizontal-tb !important;
        text-orientation: unset !important;
        padding: 8px 0 !important;
        font-size: 1.2rem !important;
      }
      .section-title {
        word-break: keep-all;
        padding: 0 10px;
      }
      .unmet-img-grid {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
      }
    }
  `

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <style>{mobileStyles}</style>
      {/* Brand glow — top-left, large */}
      <img src="/images/brand-glow.png" alt="" style={{
        position: 'absolute', top: '-65%', left: '-46%',
        width: 1400, height: 1400, opacity: 0.65, pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title" style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}>
          {t.title}
        </h2>
        {t.subtitle && (
          <p style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 32px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, wordBreak: 'keep-all', overflowWrap: 'break-word', padding: '0 16px' }}>
            {t.subtitle}
          </p>
        )}

        {/* PPT Unmet Need Slide Images */}
        <div className="unmet-img-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 960, margin: '0 auto 40px' }}>
          <img
            src="/images/ppt/image5.png"
            alt="Unmet Need - Microvascular Lesion Detection"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}
          />
          <img
            src="/images/ppt/image4.png"
            alt="Unmet Need - Structural MRI Limitations"
            loading="lazy"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 16,
            maxWidth: 960,
            margin: '0 auto',
            alignItems: 'stretch',
          }}
          className="unmet-grid"
        >
          <div className="card card-old" style={{ textAlign: 'left' }}>
            <h3 style={{ color: 'rgba(255,100,100,0.9)', marginBottom: 16 }}>{t.oldTitle}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {oldItems.map((item, i) => (
                <li key={i} style={{ padding: '6px 0 6px 20px', position: 'relative', wordBreak: 'keep-all' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'rgba(255,100,100,0.7)' }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="vs-divider" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'rgba(255,255,255,0.35)', fontWeight: 800, fontSize: '1.5rem',
            letterSpacing: '0.1em', writingMode: 'vertical-lr', textOrientation: 'mixed',
            padding: '0 4px',
          }}>
            VS
          </div>
          <div className="card card-new" style={{ textAlign: 'left' }}>
            <h3 style={{ color: 'rgb(0,255,204)', marginBottom: 16 }}>{t.newTitle}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {newItems.map((item, i) => (
                <li key={i} style={{ padding: '6px 0 6px 20px', position: 'relative', wordBreak: 'keep-all' }}>
                  <span style={{ position: 'absolute', left: 0, color: 'rgb(0,255,204)' }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{
            maxWidth: 960,
            margin: '24px auto 0',
            padding: '16px 24px',
            background: 'rgba(0,255,204,0.06)',
            border: '1px solid rgba(0,255,204,0.15)',
            borderRadius: 12,
            fontSize: '0.95rem',
            textAlign: 'center',
            wordBreak: 'keep-all',
          }}
        >
          {t.note}
        </div>
      </div>
    </section>
  )
}

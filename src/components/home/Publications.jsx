const pubCategories = [
  {
    title: 'primaryTumor',
    items: [
      { title: 'Mapping Tumor Habitats in IDH-Wild Type Glioblastoma', journal: 'Neuro Oncol. Park JE et al. (2024)' },
      { title: 'Prospective Longitudinal Analysis of Physiologic MRI-based Tumor Habitat', journal: 'Neuro Oncol. Moon HH et al. (2024)' },
      { title: 'Prediction of Pseudoprogression in Post-treatment GBM Using DSC-derived Measures', journal: 'Eur Radiol. Park JE et al. (2024)' },
      { title: 'Spatiotemporal Heterogeneity in Multiparametric Physiologic MRI', journal: 'Clin Cancer Res. Park JE et al. (2021)' },
    ],
  },
  {
    title: 'brainMetastasis',
    items: [
      { title: 'Deep Learning-based Metastasis Detection in Patients with Lung Cancer', journal: 'Cancer Imaging. Park YW et al. (2024)' },
      { title: 'Reducing False Positives in DL-based Brain Metastasis Detection', journal: 'Eur Radiol. Yun S et al. (2024)' },
      { title: 'Tumor Habitat Analysis Using Longitudinal MRI to Predict Tumor Recurrence After SRS', journal: 'Korean J Radiol. Lee DH et al. (2023)' },
      { title: 'Tumor Habitat Analysis by MRI Distinguishes Tumor Progression from Radiation Necrosis', journal: 'Eur Radiol. Lee DH et al. (2022)' },
    ],
  },
]

export default function Publications({ t }) {
  return (
    <section className="section">
      <div className="section-inner">
        <h2 className="section-title">
          {t.title}
        </h2>
        {/* Slide 18 is text-only — no PPT image available */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px 48px',
            maxWidth: 1100,
            margin: '0 auto',
          }}
        >
          {pubCategories.map((cat) => (
            <div key={cat.title}>
              <h3 style={{ marginBottom: 16, fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 700, color: '#fff' }}>{t[cat.title]}</h3>
              {cat.items.map((pub, i) => (
                <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)' }}>{pub.title}</p>
                  <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', fontStyle: 'italic' }}>{pub.journal}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="milestone-num">20+</span>
            <span className="milestone-label" style={{ display: 'block' }}>{t.pubCount}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span className="milestone-num">5+</span>
            <span className="milestone-label" style={{ display: 'block' }}>{t.topTier}</span>
          </div>
        </div>
        <div
          style={{
            maxWidth: 1100,
            margin: '28px auto 0',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12,
            padding: '20px 28px',
          }}
        >
          <h4 style={{ margin: '0 0 8px', fontSize: '1rem' }}>{t.patentTitle}</h4>
          <p style={{ margin: '2px 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>{t.patentDesc}</p>
          <p style={{ margin: '2px 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>{t.patentNo}</p>
        </div>
      </div>
    </section>
  )
}

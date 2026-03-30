const advisors = [
  { name: 'Prof. Seung-Hong Choi', dept: 'Dept. of Radiology, Seoul National University Hospital' },
  { name: 'Prof. Won-Jin Moon', dept: 'Dept. of Radiology, Konkuk University Hospital' },
  { name: 'Prof. Na-Young Shin', dept: 'Dept. of Radiology, Severance Hospital' },
  { name: 'Prof. Min-Kyung Lee', dept: "Dept. of Radiology, Yeouido St. Mary's Hospital" },
  { name: 'Prof. Il-Ah Shin & Stefan Ahn', dept: "Radiology & Neurosurgery, Seoul St. Mary's Hospital" },
  { name: 'Prof. Jong-Wook Hong', dept: 'Dept. of Bionano Engineering, Hanyang University' },
  { name: 'Prof. Gun-Ho Jang', dept: 'Dept. of Radiology, Kangdong Kyung Hee University Hospital' },
  { name: 'Prof. Jong-Chul Ye', dept: 'Dept. of Bio & Brain Engineering, KAIST' },
]

export default function Advisory({ t }) {
  return (
    <section className="section">
      <div className="section-inner">
        <h2 className="section-title">
          {t.title}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px 32px',
            maxWidth: 960,
            margin: '0 auto',
          }}
        >
          {advisors.map((a) => (
            <div
              key={a.name}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                padding: '14px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'rgb(0,255,204)',
                  marginTop: 7,
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: '#fff' }}>{a.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)' }}>
                  {a.dept}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, updateSiteStats, getSiteStats } from '../../firebase/firestore'
import { getPubStats } from '../../firebase/firestore'

const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '24px 28px' }
const inputStyle = { width: '100%', padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', fontSize: '0.9rem', marginBottom: 12 }
const checkboxLabelStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'rgba(255,255,255,0.72)', marginBottom: 8 }

const defaultSiteStats = {
  metrics: {
    countries: { value: '40+', labelKr: '국가', labelEn: 'Countries', enabled: true, color: '#ffffff' },
    institutions: { value: '1,500+', labelKr: '기관', labelEn: 'Institutions', enabled: true, color: '#ffffff' },
    scans: { value: '7M+', labelKr: '분석 건수', labelEn: 'Scans', enabled: true, color: '#ffffff' },
    reduction: { value: '45%', labelKr: '평균 검사시간 단축', labelEn: 'Avg scan time reduction', enabled: true, color: '#ffffff' },
  },
}

const metricOrder = [
  { key: 'countries', title: 'Metric 1' },
  { key: 'institutions', title: 'Metric 2' },
  { key: 'scans', title: 'Metric 3' },
  { key: 'reduction', title: 'Metric 4' },
]

export default function AdminDashboard() {
  const [recentPosts, setRecentPosts] = useState([])
  const [stats, setStats] = useState(null)
  const [siteStats, setSiteStats] = useState(defaultSiteStats)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getPosts({ pageSize: 5, publishedOnly: false }).then(r => setRecentPosts(r.docs)).catch(() => {})
    getPubStats().then(setStats).catch(() => {})
    getSiteStats().then(setSiteStats).catch(() => {})
  }, [])

  const handleSaveStats = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSiteStats(siteStats)
      // Success: Reload to see changes
      alert('Stats updated successfully!')
      // Optional: Refresh local state from firestore again
      const updated = await getSiteStats()
      setSiteStats(updated)
    } catch (err) {
      console.error(err)
      alert('Failed to update stats: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const updateMetricField = (metricKey, field, value) => {
    setSiteStats((prev) => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [metricKey]: {
          ...(prev.metrics?.[metricKey] || {}),
          [field]: value,
        },
      },
    }))
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 32 }}>Dashboard</h1>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        <div style={card}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'rgb(0,255,204)' }}>{recentPosts.length || '—'}</div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Recent Posts</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'rgb(0,255,204)' }}>{stats?.totalPapers || '—'}</div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Publications</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'rgb(0,255,204)' }}>{stats?.patentCount || '—'}</div>
          <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>Patents</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, marginBottom: 24 }}>
        {/* Recent Posts */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Recent Posts</h2>
            <Link to="/admin/posts" style={{ color: 'rgb(0,255,204)', fontSize: '0.82rem', textDecoration: 'none' }}>View All &rarr;</Link>
          </div>
          {recentPosts.length === 0 ? (
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.88rem' }}>No posts yet. Create your first post.</p>
          ) : (
            recentPosts.map(post => (
              <div key={post.id} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.88rem' }}>{post.title}</span>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginLeft: 12 }}>{post.category}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: post.published ? 'rgb(0,255,204)' : 'rgba(255,100,100,0.8)' }}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Site Stats (Trusted By) Editor */}
        <div style={card}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16 }}>DYNAPEX by the Numbers</h2>
          <form onSubmit={handleSaveStats}>
            {metricOrder.map((metric) => {
              const data = siteStats?.metrics?.[metric.key] || {}
              return (
                <div key={metric.key} style={{ marginBottom: 14, padding: 12, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10 }}>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>{metric.title}</div>

                  <label style={checkboxLabelStyle}>
                    <input
                      type="checkbox"
                      checked={data.enabled !== false}
                      onChange={(e) => updateMetricField(metric.key, 'enabled', e.target.checked)}
                    />
                    랜딩페이지에 표시
                  </label>

                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>값 (예: 40+, 1,500+, 7M+, 45%)</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={data.value || ''}
                    onChange={(e) => updateMetricField(metric.key, 'value', e.target.value)}
                  />

                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>한글 명칭</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={data.labelKr || ''}
                    onChange={(e) => updateMetricField(metric.key, 'labelKr', e.target.value)}
                  />

                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>영문 명칭</label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={data.labelEn || ''}
                    onChange={(e) => updateMetricField(metric.key, 'labelEn', e.target.value)}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    <label style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>표시 색상:</label>
                    <input
                      type="color"
                      style={{ border: 'none', width: 30, height: 30, background: 'none', cursor: 'pointer' }}
                      value={data.color || '#ffffff'}
                      onChange={(e) => updateMetricField(metric.key, 'color', e.target.value)}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>{data.color || '#ffffff'}</span>
                  </div>
                </div>
              )
            })}
            <button 
              type="submit" 
              disabled={saving}
              style={{ 
                width: '100%', padding: '10px', background: 'rgb(0,255,204)', color: '#0a1628', 
                border: 'none', borderRadius: 8, fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
                opacity: saving ? 0.7 : 1
              }}
            >
              {saving ? 'Saving...' : 'Save Metrics'}
            </button>
          </form>
        </div>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'flex', gap: 12 }}>
        <Link to="/admin/posts/new" style={{ padding: '10px 20px', background: 'rgb(0,255,204)', color: '#0a1628', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
          + New Post
        </Link>
        <Link to="/admin/publications/new" style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.08)', color: 'rgb(0,255,204)', border: '1px solid rgba(0,255,204,0.3)', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
          + New Publication
        </Link>
      </div>
    </div>
  )
}

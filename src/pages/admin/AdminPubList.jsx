import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPublications, deletePublication, getPubStats, updatePubStats } from '../../firebase/firestore'

export default function AdminPubList() {
  const [pubs, setPubs] = useState([])
  const [stats, setStats] = useState({ totalPapers: 20, topTierCount: 5, patentCount: 1 })
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [editStats, setEditStats] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getPublications({ category: filter || undefined })
      setPubs(data)
      const s = await getPubStats()
      setStats(s)
    } catch { setPubs([]) }
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    await deletePublication(id)
    load()
  }

  const handleStatsSave = async () => {
    await updatePubStats(stats)
    setEditStats(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Publications</h1>
        <Link to="/admin/publications/new" style={{ padding: '10px 20px', background: 'rgb(0,255,204)', color: '#0a1628', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
          + New Publication
        </Link>
      </div>

      {/* Stats editor */}
      <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgb(0,255,204)' }}>Publication Stats</span>
          <button onClick={() => editStats ? handleStatsSave() : setEditStats(true)} style={{ background: 'none', border: 'none', color: 'rgb(0,255,204)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>
            {editStats ? 'Save' : 'Edit'}
          </button>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { key: 'totalPapers', label: 'Total Papers' },
            { key: 'topTierCount', label: 'Top-tier' },
            { key: 'patentCount', label: 'Patents' },
          ].map(({ key, label }) => (
            <div key={key}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{label}</div>
              {editStats ? (
                <input type="number" value={stats[key] || 0} onChange={e => setStats(s => ({ ...s, [key]: parseInt(e.target.value) || 0 }))}
                  style={{ width: 60, padding: '4px 8px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6, color: '#fff', fontSize: '1rem', fontFamily: 'inherit', textAlign: 'center' }}
                />
              ) : (
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'rgb(0,255,204)' }}>{stats[key] || 0}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['', 'primaryTumor', 'brainMetastasis', 'patent'].map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '6px 16px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            background: filter === c ? 'rgb(0,255,204)' : 'rgba(255,255,255,0.06)',
            color: filter === c ? '#0a1628' : 'rgba(255,255,255,0.6)',
            border: 'none', fontFamily: 'inherit',
          }}>
            {c === '' ? 'All' : c === 'primaryTumor' ? 'Primary Tumor' : c === 'brainMetastasis' ? 'Brain Metastasis' : 'Patent'}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
      ) : pubs.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No publications found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {['Title', 'Journal/Patent', 'Year', 'Category', 'Product', ''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pubs.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontSize: '0.85rem', maxWidth: 350 }}>
                  <Link to={`/admin/publications/${p.id}/edit`} style={{ color: '#fff', textDecoration: 'none' }}>{p.title}</Link>
                </td>
                <td style={{ padding: '12px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>{p.journal || p.patentNo || '—'}</td>
                <td style={{ padding: '12px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>{p.year || '—'}</td>
                <td style={{ padding: '12px', fontSize: '0.75rem', color: 'rgb(0,255,204)' }}>{p.category}</td>
                <td style={{ padding: '12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{p.productId || '—'}</td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                  <button onClick={() => handleDelete(p.id, p.title)} style={{ background: 'none', border: 'none', color: 'rgba(255,100,100,0.7)', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, deletePost } from '../../firebase/firestore'

const catColors = { notice: 'rgb(0,255,204)', news: 'rgb(100,180,255)', event: 'rgb(255,180,60)' }

export default function AdminPostList() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const r = await getPosts({ category: filter || undefined, publishedOnly: false, pageSize: 50 })
      setPosts(r.docs)
    } catch { setPosts([]) }
    setLoading(false)
  }

  useEffect(() => { load() }, [filter])

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    await deletePost(id)
    load()
  }

  const formatDate = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('ko-KR')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Posts</h1>
        <Link to="/admin/posts/new" style={{ padding: '10px 20px', background: 'rgb(0,255,204)', color: '#0a1628', borderRadius: 8, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
          + New Post
        </Link>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['', 'notice', 'news', 'event'].map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '6px 16px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
            background: filter === c ? 'rgb(0,255,204)' : 'rgba(255,255,255,0.06)',
            color: filter === c ? '#0a1628' : 'rgba(255,255,255,0.6)',
            border: 'none', fontFamily: 'inherit',
          }}>
            {c || 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No posts found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              {['Title', 'Category', 'Status', 'Date', 'Views', ''].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 12px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontSize: '0.88rem' }}>
                  {p.pinned && <span style={{ color: 'rgb(0,255,204)', marginRight: 6 }}>&#9733;</span>}
                  <Link to={`/admin/posts/${p.id}/edit`} style={{ color: '#fff', textDecoration: 'none' }}>{p.title}</Link>
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: catColors[p.category] || '#fff', background: `${catColors[p.category] || '#fff'}18`, padding: '2px 10px', borderRadius: 6 }}>{p.category}</span>
                </td>
                <td style={{ padding: '12px', fontSize: '0.82rem', color: p.published ? 'rgb(0,255,204)' : 'rgba(255,100,100,0.8)' }}>
                  {p.published ? 'Published' : 'Draft'}
                </td>
                <td style={{ padding: '12px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>{formatDate(p.createdAt)}</td>
                <td style={{ padding: '12px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)' }}>{p.viewCount || 0}</td>
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

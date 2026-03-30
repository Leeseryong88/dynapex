import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../../firebase/firestore'
import { getPubStats } from '../../firebase/firestore'

const card = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '24px 28px' }

export default function AdminDashboard() {
  const [recentPosts, setRecentPosts] = useState([])
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getPosts({ pageSize: 5, publishedOnly: false }).then(r => setRecentPosts(r.docs)).catch(() => {})
    getPubStats().then(setStats).catch(() => {})
  }, [])

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

      {/* Recent Posts */}
      <div style={{ ...card, marginBottom: 24 }}>
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

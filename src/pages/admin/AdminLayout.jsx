import { NavLink, Outlet } from 'react-router-dom'
import { logout } from '../../firebase/auth'
import { useAuth } from '../../context/AuthContext'

const linkStyle = (isActive) => ({
  display: 'block', padding: '10px 20px', borderRadius: 8, fontSize: '0.88rem', fontWeight: 600,
  textDecoration: 'none', color: isActive ? '#0a1628' : 'rgba(255,255,255,0.65)',
  background: isActive ? 'rgb(0,255,204)' : 'transparent', transition: 'all 0.15s',
  marginBottom: 4,
})

export default function AdminLayout() {
  const { user } = useAuth()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#060a0e', color: '#fff', fontFamily: "'Montserrat','Noto Sans KR',sans-serif" }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: 'rgba(8,14,20,0.95)', borderRight: '1px solid rgba(255,255,255,0.08)', padding: '24px 16px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: 2, color: 'rgb(0,255,204)', marginBottom: 8, padding: '0 4px' }}>DYNAPEX</div>
        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginBottom: 28, padding: '0 4px' }}>Admin Panel</div>

        <nav style={{ flex: 1 }}>
          <NavLink to="/admin" end style={({ isActive }) => linkStyle(isActive)}>Dashboard</NavLink>
          <NavLink to="/admin/posts" style={({ isActive }) => linkStyle(isActive)}>Posts</NavLink>
          <NavLink to="/admin/publications" style={({ isActive }) => linkStyle(isActive)}>Publications</NavLink>
        </nav>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8, padding: '0 4px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
          <button onClick={logout} style={{ width: '100%', padding: '8px 12px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', maxHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  )
}

import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, admin, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#060a0e', color: 'rgba(255,255,255,0.5)' }}>
        Loading...
      </div>
    )
  }

  if (!user || !admin) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

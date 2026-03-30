import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../firebase/auth'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, pw)
      navigate('/admin')
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? 'Invalid email or password' : err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#060a0e', padding: 24 }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 380, background: 'rgba(8,14,20,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '40px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: 2, color: 'rgb(0,255,204)', marginBottom: 8 }}>DYNAPEX</div>
          <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>Admin Login</div>
        </div>
        <input
          type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"
          required autoFocus
          style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: '0.95rem', fontFamily: 'inherit', marginBottom: 12, outline: 'none' }}
        />
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Password"
          required
          style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: '0.95rem', fontFamily: 'inherit', marginBottom: 16, outline: 'none' }}
        />
        {error && <div style={{ color: '#ff6b6b', fontSize: '0.82rem', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'rgb(0,255,204)', border: 'none', borderRadius: 10, color: '#0a1628', fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

import { createContext, useContext, useState, useEffect } from 'react'
import { onAuth, isAdmin } from '../firebase/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuth(async (u) => {
      setUser(u)
      if (u) {
        const adminStatus = await isAdmin(u)
        setAdmin(adminStatus)
      } else {
        setAdmin(false)
      }
      setLoading(false)
    })
    return unsub
  }, [])

  return (
    <AuthContext.Provider value={{ user, admin, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

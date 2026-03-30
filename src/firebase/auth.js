import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from './config'

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function logout() {
  return signOut(auth)
}

export function onAuth(callback) {
  return onAuthStateChanged(auth, callback)
}

export async function isAdmin(user) {
  if (!user) return false
  try {
    const snap = await getDoc(doc(db, 'admins', user.uid))
    return snap.exists()
  } catch {
    return false
  }
}

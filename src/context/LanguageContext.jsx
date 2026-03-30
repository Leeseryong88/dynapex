import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('dynapex-lang')
    return saved === 'kr' ? 'kr' : 'en'
  })

  // Sync <html lang> attribute for SEO & screen readers
  useEffect(() => {
    document.documentElement.lang = lang === 'kr' ? 'ko' : 'en'
  }, [lang])

  const toggleLang = () => {
    const next = lang === 'en' ? 'kr' : 'en'
    setLang(next)
    localStorage.setItem('dynapex-lang', next)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

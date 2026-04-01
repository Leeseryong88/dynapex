import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import styles from './RegulatoryBanner.module.css'

export default function RegulatoryBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { lang } = useLanguage()
  const location = useLocation()
  
  const t = translations[lang].footer

  // Hide on About page or Products?tab=stroke
  const isAboutPage = location.pathname.endsWith('/about')
  const isProductsPage = location.pathname.endsWith('/products')
  const isStrokeTab = new URLSearchParams(location.search).get('tab') === 'stroke'

  if (!isVisible || isAboutPage || (isProductsPage && isStrokeTab)) return null

  return (
    <div className={styles.banner}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <span className={styles.title}>{t.regulatoryTitle}</span>
          <p className={styles.text}>{t.regulatoryText}</p>
        </div>
        <button 
          className={styles.closeBtn} 
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

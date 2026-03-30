import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import styles from './RegulatoryBanner.module.css'

export default function RegulatoryBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { lang } = useLanguage()
  const t = translations[lang].footer

  if (!isVisible) return null

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

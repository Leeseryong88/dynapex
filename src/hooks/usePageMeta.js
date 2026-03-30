import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Hook to set page meta tags (title, description, lang attribute) based on current language
 * @param {string} titleKr - Korean page title
 * @param {string} titleEn - English page title
 * @param {string} descKr - Korean meta description
 * @param {string} descEn - English meta description
 */
export function usePageMeta(titleKr, titleEn, descKr, descEn) {
  const { lang } = useLanguage()

  useEffect(() => {
    // Set page title
    document.title = lang === 'kr' ? titleKr : titleEn

    // Set meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.content = lang === 'kr' ? descKr : descEn
    }

    // Set html lang attribute for SEO and screen readers
    document.documentElement.lang = lang === 'kr' ? 'ko' : 'en'
  }, [lang, titleKr, titleEn, descKr, descEn])
}

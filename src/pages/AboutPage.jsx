import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { translations } from '../i18n/translations'
import Vision from '../components/home/Vision'
import Distributors from '../components/home/Distributors'
import RegulatoryBanner from '../components/RegulatoryBanner'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  const { lang } = useLanguage()
  const t = translations[lang]

  usePageMeta(
    '회사 소개 — DYNAPEX',
    'About — DYNAPEX',
    'DYNAPEX는 2018년 설립된 의료 AI 회사로, 전 세계 의료 전문가들과 함께 정밀 의료를 위한 AI 솔루션을 개발하고 있습니다.',
    'DYNAPEX is a medical AI company founded in 2018, developing precision medicine solutions with healthcare professionals worldwide.'
  )

  return (
    <div className={styles.page}>
      <RegulatoryBanner />
      {/* Vision + Board Members — combined section */}
      <Vision t={t.vision} boardT={t.board} autoAnimate lang={lang} />

      {/* Global Distributors */}
      <Distributors t={t.distributors} />
    </div>
  )
}

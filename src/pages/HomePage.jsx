import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { translations } from '../i18n/translations'
import Hero from '../components/home/Hero'
import UnmetNeed from '../components/home/UnmetNeed'
import LatestNews from '../components/home/LatestNews'
import Solutions from '../components/home/Solutions'

export default function HomePage() {
  const { lang } = useLanguage()
  const t = translations[lang]

  usePageMeta(
    'DYNAPEX — 의료 AI 솔루션 플랫폼',
    'DYNAPEX — Medical AI Solution Platform',
    'DYNAPEX는 뇌종양, 뇌졸중, 신경퇴행성질환 분석을 위한 완전 자동화된 의료 AI 솔루션을 제공합니다. 7개 질환 영역에 걸쳐 30개 이상의 병원에 설치되어 있습니다.',
    'DYNAPEX delivers fully automated medical AI solutions for brain tumor analysis, stroke perfusion, neurodegeneration assessment, and more. 30+ hospital installations across 7 disease areas.'
  )

  return (
    <>
      <Hero t={t.hero} />
      <Solutions t={t.solutions} />
      <UnmetNeed t={t.unmet} />
      <LatestNews />
    </>
  )
}

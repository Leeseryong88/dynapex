import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const pathNames = {
  en: {
    '/': 'Home',
    '/platform': 'Platform',
    '/products': 'Products',
    '/publications': 'Publications',
    '/about': 'About',
    '/contact': 'Contact',
    '/privacy': 'Privacy Policy',
  },
  kr: {
    '/': '홈',
    '/platform': '플랫폼',
    '/products': '제품 소개',
    '/publications': '연구·논문',
    '/about': '회사 소개',
    '/contact': '문의하기',
    '/privacy': '개인정보처리방침',
  },
}

export default function Breadcrumb() {
  const { lang } = useLanguage()
  const location = useLocation()
  const pathname = location.pathname

  // Don't show breadcrumb on homepage
  if (pathname === '/') {
    return null
  }

  const names = pathNames[lang] || pathNames.en

  return (
    <nav
      style={{
        padding: '12px 24px',
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.5)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      aria-label="Breadcrumb"
    >
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          maxWidth: 1200,
          margin: '0 auto',
        }}
      >
        <li>
          <Link
            to="/"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'rgba(0, 255, 204, 0.8)')}
            onMouseLeave={(e) => (e.target.style.color = 'rgba(255, 255, 255, 0.6)')}
          >
            {names['/']}
          </Link>
        </li>
        <li style={{ color: 'rgba(255, 255, 255, 0.3)' }}>›</li>
        <li style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {names[pathname] || pathname}
        </li>
      </ol>
    </nav>
  )
}

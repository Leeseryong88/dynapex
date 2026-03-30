import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'

const accent = 'rgb(0,255,204)'

// Simple SVG social icons
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>
  )
}

export default function Footer() {
  const { lang } = useLanguage()
  const t = translations[lang].footer

  const linkStyle = {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontSize: 13.5,
    lineHeight: 2.2,
    display: 'block',
    transition: 'color 0.2s',
  }

  const socialBtn = {
    width: 36, height: 36, borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.6)',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', transition: 'all 0.25s',
    textDecoration: 'none',
  }

  return (
    <footer role="contentinfo" style={{
      padding: '56px 24px 32px',
      background: 'rgba(6, 10, 14, 0.98)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px 32px',
      }}>
        {/* Column 1: Brand */}
        <div>
          <div style={{
            fontSize: 20, fontWeight: 800, color: '#fff',
            letterSpacing: '0.08em', marginBottom: 12,
            fontFamily: "'Montserrat', sans-serif",
          }}>
            DYNAPEX
          </div>
          <p style={{
            fontSize: 13, color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.6, margin: '0 0 20px', maxWidth: 240,
          }}>
            {t.tagline}
          </p>

        </div>

        {/* Column 2: Solutions */}
        <div>
          <h4 style={{
            fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, marginTop: 0,
          }}>
            {t.solutions}
          </h4>
          <Link to="/products?tab=gbm" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >DYNAPEX BT</Link>
          <Link to="/products?tab=mets" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >DYNAPEX METS</Link>
          <Link to="/products?tab=hn" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >DYNAPEX HN</Link>
          <Link to="/products?tab=stroke" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >CERCARE STROKE</Link>
          <Link to="/products?tab=ms" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >DYNAPEX MS</Link>
        </div>

        {/* Column 3: Company */}
        <div>
          <h4 style={{
            fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, marginTop: 0,
          }}>
            {t.company2}
          </h4>
          <Link to="/about" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >{t.aboutUs}</Link>
          <Link to="/publications" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >{t.publications}</Link>
          <Link to="/contact" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >{t.contact}</Link>
          <Link to="/" style={linkStyle}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >{t.news}</Link>
        </div>

        {/* Column 4: Contact Info */}
        <div>
          <h4 style={{
            fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, marginTop: 0,
          }}>
            {t.contact}
          </h4>
          <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0 }}>
            {t.address}<br />
            {lang === 'kr' ? '전화' : 'Tel'}: {t.phone}<br />
            {lang === 'kr' ? '팩스' : 'Fax'}: {t.fax}<br />
            <a href={`mailto:${t.email}`} style={{ color: accent, textDecoration: 'none' }}>
              {t.email}
            </a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: 1200, margin: '40px auto 0',
        paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            {t.copyright}
          </p>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>|</span>
          <Link to="/privacy"
            style={{
              margin: 0,
              fontSize: 12,
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = accent}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
          >
            {lang === 'kr' ? '개인정보처리방침' : 'Privacy Policy'}
          </Link>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
          {t.company}
        </p>
      </div>
    </footer>
  )
}

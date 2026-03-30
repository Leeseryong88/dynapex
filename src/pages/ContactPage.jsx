import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { translations } from '../i18n/translations'
import Contact from '../components/home/Contact'
import styles from './ContactPage.module.css'

const accent = 'rgb(0,255,204)'

export default function ContactPage() {
  const { lang } = useLanguage()
  const t = translations[lang]

  usePageMeta(
    '문의하기 — DYNAPEX',
    'Contact — DYNAPEX',
    'DYNAPEX와 연락주세요. 제품 데모, 기술 파트너십, 기타 문의 사항을 접수합니다.',
    'Contact DYNAPEX for product demos, technical partnerships, and inquiries.'
  )

  return (
    <div className={styles.page}>
      <style>{`
        @media (max-width: 768px) {
          .contact-location-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-location-info {
            padding: 24px !important;
          }
          .contact-map-container {
            min-height: 280px !important;
          }
        }
      `}</style>
      <section className={styles.hero}>
        <h1>{lang === 'kr' ? '문의하기' : 'Contact Us'}</h1>
        <p>
          {lang === 'kr'
            ? '제품 데모 신청, 기술 파트너십, 기타 문의 사항을 남겨주세요.'
            : 'Request a product demo, discuss partnerships, or send us a general inquiry.'}
        </p>
      </section>
      <Contact t={t.contact} hideTitle={true} />

      {/* Company Info + Map */}
      <section style={{ padding: '0 24px 48px', position: 'relative', overflow: 'hidden' }}>
        {/* Brand glow — bottom-left, large */}
        <img src="/images/brand-glow.png" alt="" style={{
          position: 'absolute', bottom: '-94%', left: '-60%',
          width: 1400, height: 1400, opacity: 0.65, pointerEvents: 'none', zIndex: 0,
        }} />
        <div className="contact-location-grid" style={{
          maxWidth: 960,
          margin: '0 auto',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 16,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
        }}>
          {/* Left — Contact Info */}
          <div className="contact-location-info" style={{ padding: 'clamp(32px, 4vw, 48px)' }}>
            <h3 style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
              fontWeight: 700,
              color: accent,
              margin: '0 0 32px',
              fontStyle: 'italic',
              borderBottom: `2px solid ${accent}`,
              display: 'inline-block',
              paddingBottom: 4,
            }}>
              Location.
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Address */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                  {lang === 'kr'
                    ? '서울시 금천구 서부샛길 606, A동 2007호'
                    : 'A 2007, 606, Seobusaet-gil, Geumcheon-gu, Seoul, Korea'}
                </p>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                  82-02-861-9158
                </p>
              </div>

              {/* Fax */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                  {lang === 'kr' ? '팩스' : 'Fax'}: 82-02-861-9154
                </p>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
                <a
                  href="mailto:contact@dynapex.co"
                  style={{ fontSize: '0.95rem', color: accent, textDecoration: 'none' }}
                >
                  contact@dynapex.co
                </a>
              </div>
            </div>
          </div>

          {/* Right — Google Map */}
          <div className="contact-map-container" style={{ minHeight: 320 }}>
            <iframe
              title="DYNAPEX Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.8!2d126.8935!3d37.4685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b61d7a8c6a5a5%3A0x5e6c5e9f8f9a1a1a!2z7ISc67aA7IOs6ri4IDYwNg!5e0!3m2!1sko!2skr!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', minHeight: 320 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

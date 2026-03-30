import { useState, useRef } from 'react'

// EmailJS 연동 — 서비스 키는 환경변수 또는 직접 설정
const EMAILJS_SERVICE_ID = 'service_dynapex'
const EMAILJS_TEMPLATE_ID = 'template_contact'
const EMAILJS_PUBLIC_KEY = ''

export default function Contact({ t, hideTitle = false }) {
  const [status, setStatus] = useState(null)
  const formRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    if (!EMAILJS_PUBLIC_KEY) {
      const formData = new FormData(formRef.current)
      const body = [
        `Name: ${formData.get('userName')}`,
        `Institution: ${formData.get('institution')}`,
        `Email: ${formData.get('email')}`,
        `Title: ${formData.get('title')}`,
        `Message: ${formData.get('content')}`,
      ].join('\n')

      window.location.href = `mailto:contact@dynapex.co?subject=${encodeURIComponent(formData.get('title'))}&body=${encodeURIComponent(body)}`
      setStatus('success')
      return
    }

    try {
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
        window.emailjs.init(EMAILJS_PUBLIC_KEY)
      }

      await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      formRef.current.reset()
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <section style={{ padding: 'clamp(40px, 6vw, 60px) 24px 40px' }}>
      <style>{`
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .contact-form-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
      <div style={{ maxWidth: 'var(--max-width-narrow)', margin: '0 auto' }}>
        {!hideTitle && (
          <h2 style={{ textAlign: 'center', marginBottom: 32, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            {t.title}
          </h2>
        )}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{
            maxWidth: 800,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            background: 'rgba(255,255,255,0.02)',
            padding: 'clamp(24px, 5vw, 48px)',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          {/* 2-column row: Name + Institution */}
          <div className="contact-form-row">
            <div className="form-group">
              <input type="text" name="userName" required placeholder={t.name} className="form-input" />
            </div>
            <div className="form-group">
              <input type="text" name="institution" required placeholder={t.institution} className="form-input" />
            </div>
          </div>

          {/* 2-column row: Email + Title */}
          <div className="contact-form-row">
            <div className="form-group">
              <input type="email" name="email" required placeholder={t.email} className="form-input" />
            </div>
            <div className="form-group">
              <input type="text" name="title" required placeholder={t.titleField} className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <textarea name="content" required placeholder={t.message} rows={6} className="form-input" style={{ resize: 'vertical' }} />
          </div>

          {status === 'success' && (
            <p role="alert" style={{ color: 'var(--color-accent)', margin: 0, textAlign: 'center', fontWeight: 600 }}>
              {t.successMsg || 'Message sent successfully! We will get back to you shortly.'}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" style={{ color: 'var(--color-error)', margin: 0, textAlign: 'center', fontWeight: 600 }}>
              {t.errorMsg || 'Failed to send. Please email us directly at contact@dynapex.co'}
            </p>
          )}

          <button type="submit" className="btn-submit" disabled={status === 'sending'} style={{ marginTop: 8, height: 56, fontSize: '1.05rem' }}>
            {status === 'sending' ? (t.sending || 'Sending...') : t.submit}
          </button>
        </form>
      </div>
    </section>
  )
}

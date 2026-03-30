import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import { productMenu } from '../data/products'
import styles from './Header.module.css'

export default function Header() {
  const { lang, toggleLang } = useLanguage()
  const t = translations[lang].nav
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path))

  const allProducts = productMenu.flatMap((group) => group.items)

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
        <div className={styles.inner}>
          <h1>
            <Link to="/" aria-label="DYNAPEX Home">
              <img src="/images/logo/logo.png" alt="DYNAPEX — Medical AI Solution Platform" />
            </Link>
          </h1>

          {/* ── Desktop Navigation ── */}
          <nav className={styles.nav} aria-label="Main navigation">
            <Link
              to="/"
              className={`${styles.link} ${location.pathname === '/' ? styles.active : ''}`}
            >
              {lang === 'kr' ? '홈' : 'HOME'}
            </Link>
            <div
              className={styles.productsWrap}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <Link
                to="/products"
                className={`${styles.productsBtn} ${isActive('/products') || isActive('/platform') ? styles.active : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {t.aiProducts} <span className={styles.arrow}>&gt;</span>
              </Link>
              <div className={`${styles.dropdown} ${productsOpen ? styles.open : ''}`}>
                <div className={styles.dropdownInner}>
                  <div className={styles.platformRow}>
                    <Link
                      to="/platform"
                      className={styles.platformLink}
                      onClick={() => { setMobileOpen(false); setProductsOpen(false) }}
                    >
                      {t.ourPlatform}
                    </Link>
                  </div>
                  <div className={styles.productsGrid}>
                    {allProducts.map((item) => (
                      <Link
                        key={item.id}
                        to={`/products?tab=${item.id}`}
                        className={styles.dropdownItem}
                        onClick={() => { setMobileOpen(false); setProductsOpen(false) }}
                      >
                        {item.nameEn || t[item.nameKey]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link to="/publications" className={`${styles.link} ${isActive('/publications') ? styles.active : ''}`}>
              {lang === 'kr' ? '연구·논문' : 'PUBLICATIONS'}
            </Link>
            <Link to="/about" className={`${styles.link} ${isActive('/about') ? styles.active : ''}`}>
              {lang === 'kr' ? '회사 소개' : 'ABOUT US'}
            </Link>
            <Link to="/contact" className={`${styles.link} ${isActive('/contact') ? styles.active : ''}`}>
              {lang === 'kr' ? '문의하기' : 'CONTACT'}
            </Link>

            <div className={styles.langWrap}>
              <button type="button" className={styles.langBtn} onClick={toggleLang} aria-label="Language">
                {lang === 'en' ? 'EN' : 'KR'}
              </button>
            </div>
          </nav>

          <button
            type="button"
            className={`${styles.burger} ${mobileOpen ? styles.burgerOpen : ''}`}
            onClick={() => { setMobileOpen(!mobileOpen); if (mobileOpen) setMobileProductsOpen(false) }}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ── Mobile Navigation (VUNO-style accordion) ── */}
      <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <Link to="/" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
          {lang === 'kr' ? '홈' : 'HOME'}
        </Link>

        {/* Products — accordion toggle (VUNO style) */}
        <button
          type="button"
          className={`${styles.mobileLink} ${styles.mobileAccordion}`}
          onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
        >
          {t.aiProducts}
          <span className={`${styles.mobileArrow} ${mobileProductsOpen ? styles.mobileArrowOpen : ''}`} />
        </button>

        {/* Accordion panel */}
        <div className={`${styles.mobilePanel} ${mobileProductsOpen ? styles.mobilePanelOpen : ''}`}>
          {/* Back button + title (VUNO style) */}
          <Link
            to="/platform"
            className={`${styles.mobileSub} ${styles.mobilePlatform}`}
            onClick={() => setMobileOpen(false)}
          >
            {t.ourPlatform}
          </Link>
          {allProducts.map((item) => (
            <Link
              key={item.id}
              to={`/products?tab=${item.id}`}
              className={styles.mobileSub}
              onClick={() => setMobileOpen(false)}
            >
              {item.nameEn || t[item.nameKey]}
            </Link>
          ))}
        </div>

        <Link to="/publications" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
          {lang === 'kr' ? '연구·논문' : 'PUBLICATIONS'}
        </Link>
        <Link to="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
          {lang === 'kr' ? '회사 소개' : 'ABOUT US'}
        </Link>
        <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
          {lang === 'kr' ? '문의하기' : 'CONTACT'}
        </Link>
      </div>
    </>
  )
}

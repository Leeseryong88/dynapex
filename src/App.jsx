import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PlatformPage from './pages/PlatformPage'
import AIProductsPage from './pages/AIProductsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PublicationsPage from './pages/PublicationsPage'
import PrivacyPage from './pages/PrivacyPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminPostList from './pages/admin/AdminPostList'
import AdminPostEditor from './pages/admin/AdminPostEditor'
import AdminPubList from './pages/admin/AdminPubList'
import AdminPubEditor from './pages/admin/AdminPubEditor'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

// 기존 /:productId 경로 → /products?tab=productId 로 리다이렉트
function ProductRedirect() {
  const { productId } = useParams()
  return <Navigate to={`/products?tab=${productId}`} replace />
}

// Language router wrapper that syncs URL lang param with LanguageContext
function LangRoute() {
  const { lang: urlLang } = useParams()
  const { setLang } = useLanguage()

  useEffect(() => {
    if (urlLang === 'en' || urlLang === 'kr') {
      setLang(urlLang)
      localStorage.setItem('dynapex-lang', urlLang)
    }
  }, [urlLang, setLang])

  return <Layout />
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* URL-based language routing: /en/*, /kr/* */}
            <Route path="/:lang" element={<LangRoute />}>
              <Route index element={<HomePage />} />
              <Route path="platform" element={<PlatformPage />} />
              <Route path="products" element={<AIProductsPage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path=":productId" element={<ProductRedirect />} />
            </Route>

            {/* Backward compatibility: routes without language prefix (default to kr) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="platform" element={<PlatformPage />} />
              <Route path="products" element={<AIProductsPage />} />
              <Route path="publications" element={<PublicationsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path=":productId" element={<ProductRedirect />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="posts" element={<AdminPostList />} />
              <Route path="posts/new" element={<AdminPostEditor />} />
              <Route path="posts/:id/edit" element={<AdminPostEditor />} />
              <Route path="publications" element={<AdminPubList />} />
              <Route path="publications/new" element={<AdminPubEditor />} />
              <Route path="publications/:id/edit" element={<AdminPubEditor />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}

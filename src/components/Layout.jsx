import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header />
      <main id="main-content" role="main" style={{ minHeight: '100vh', paddingTop: 60 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LangProvider } from './i18n.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Process from './pages/Process.jsx'
import Infrastructure from './pages/Infrastructure.jsx'
import Quality from './pages/Quality.jsx'
import Industries from './pages/Industries.jsx'
import Sustainability from './pages/Sustainability.jsx'
import Services from './pages/Services.jsx'
import Careers from './pages/Careers.jsx'
import Investors from './pages/Investors.jsx'
import News from './pages/News.jsx'
import Contact from './pages/Contact.jsx'
import Payments from './pages/Payments.jsx'
import Support from './pages/Support.jsx'
import Account from './pages/Account.jsx'
import Admin from './pages/Admin.jsx'
import { useGlobalReveal } from './hooks.jsx'
import './styles.css'

const NotFound = () => (
  <section className="section"><div className="wrap" style={{ textAlign: 'center' }}>
    <h1 style={{ fontSize: 64 }}>404</h1>
    <p style={{ color: 'var(--muted)', marginBottom: 24 }}>That page rolled off the line.</p>
    <a className="btn btn-primary" href="/">Back to Home</a>
  </div></section>
)

function Root() {
  useGlobalReveal()
  const { pathname } = useLocation()
  React.useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pre = document.getElementById('preloader')
    if (pre) {
      const t = setTimeout(() => { pre.classList.add('done'); setTimeout(() => pre.remove(), 600) }, reduced ? 200 : 1500)
      return () => clearTimeout(t)
    }
  }, [])
  React.useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/process" element={<Process />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/services" element={<Services />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/investors" element={<Investors />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/support" element={<Support />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <Root />
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
)

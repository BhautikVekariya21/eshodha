import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { useGlobalReveal } from './hooks.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Products from './pages/Products.jsx'
import Process from './pages/Process.jsx'
import Infrastructure from './pages/Infrastructure.jsx'
import Quality from './pages/Quality.jsx'
import Industries from './pages/Industries.jsx'
import Sustainability from './pages/Sustainability.jsx'
import Careers from './pages/Careers.jsx'
import Investors from './pages/Investors.jsx'
import News from './pages/News.jsx'
import Contact from './pages/Contact.jsx'
import Services from './pages/Services.jsx'
import Payments from './pages/Payments.jsx'
import Support from './pages/Support.jsx'
import './styles.css'

function Root() {
  useGlobalReveal()
  // dismiss the static preloader from index.html
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wait = reduce ? 200 : 1500
    const t1 = setTimeout(() => {
      const p = document.getElementById('preloader')
      if (!p) return
      p.classList.add('done')
      setTimeout(() => p.remove(), 650)
    }, wait)
    return () => clearTimeout(t1)
  }, [])
  return <Layout />
}

const NotFound = () => (
  <section className="section"><div className="wrap" style={{ textAlign: 'center' }}>
    <h1 style={{ fontSize: 64 }}>404</h1>
    <p style={{ color: 'var(--muted)', marginBottom: 24 }}>That page rolled off the line.</p>
    <a className="btn btn-primary" href="/">Back to Home</a>
  </div></section>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'process', element: <Process /> },
      { path: 'infrastructure', element: <Infrastructure /> },
      { path: 'quality', element: <Quality /> },
      { path: 'industries', element: <Industries /> },
      { path: 'sustainability', element: <Sustainability /> },
      { path: 'careers', element: <Careers /> },
      { path: 'investors', element: <Investors /> },
      { path: 'news', element: <News /> },
      { path: 'contact', element: <Contact /> },
      { path: 'payments', element: <Payments /> },
      { path: 'support', element: <Support /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

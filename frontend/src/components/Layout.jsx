import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { BrandMark, Icon } from './UI.jsx'
import ChatWidget from './ChatWidget.jsx'
import { api } from '../api.js'

const CARET = <Icon name="caret" size={10} sw={3} className="caret" />

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  {
    to: '/products', label: 'Products', caret: CARET, children: [
      { to: '/products#hr', label: 'Hot Rolled (HR) Coils', small: 'IS 2062 · ASTM A36 · SAE grades' },
      { to: '/products#cr', label: 'Cold Rolled (CR) Coils', small: 'IS 513 O / D / DD / EDD grades' },
      { to: '/products#gi', label: 'Galvanized & Galvalume', small: 'GI · GL · Zn / Zn-Al coated' },
      { to: '/products#cc', label: 'Colour Coated Coils', small: 'PPGI · PPGL · RAL finishes' },
      { to: '/products#ss', label: 'Stainless Steel Coils', small: 'AISI 304 · 316L · 430 · 409' },
      { to: '/products#crgo', label: 'Electrical Steel Coils', small: 'CRGO · CRNGO laminations' },
    ],
  },
  {
    to: '/process', label: 'Operations', caret: CARET, children: [
      { to: '/process', label: 'End-to-End Process', small: 'Ore to finished coil — 16 stages' },
      { to: '/infrastructure', label: 'Plants & Infrastructure', small: '3.5 MTPA integrated facility' },
      { to: '/process#logistics', label: 'Logistics & Dispatch', small: 'Rail · road · port network' },
    ],
  },
  { to: '/quality', label: 'Quality' },
  { to: '/industries', label: 'Industries' },
  { to: '/sustainability', label: 'Sustainability' },
  {
    to: '/careers', label: 'More', caret: CARET, children: [
      { to: '/payments', label: 'Payments', small: 'Pay PIs online — UPI · cards · NEFT' },
      { to: '/support', label: 'Customer Support', small: 'Tickets, live chat & SLAs' },
      { to: '/careers', label: 'Careers', small: "Join India's new-age steelmaker" },
      { to: '/investors', label: 'Investor Relations', small: 'Reports, results & governance' },
      { to: '/news', label: 'News & Media', small: 'Press releases & events' },
    ],
  },
]

const PRODUCT_LINKS = (
  <div className="f-links">
    <Link to="/products#hr">Hot Rolled Coils</Link>
    <Link to="/products#cr">Cold Rolled Coils</Link>
    <Link to="/products#gi">Galvanized &amp; Galvalume</Link>
    <Link to="/products#cc">Colour Coated Coils</Link>
    <Link to="/products#ss">Stainless Steel Coils</Link>
    <Link to="/process">Manufacturing Process</Link>
    <Link to="/infrastructure">Infrastructure</Link>
  </div>
)

function NewsletterForm() {
  const [state, setState] = React.useState({ msg: null, err: false })
  const submit = async (e) => {
    e.preventDefault()
    const email = e.target.elements.email.value.trim()
    if (!/^\S+@\S+\.\S+$/.test(email)) { setState({ msg: 'Please enter a valid email.', err: true }); return }
    try {
      const res = await api.submitNewsletter(email)
      setState({ msg: res.message, err: false })
      e.target.reset()
    } catch (err) {
      setState({ msg: err.message, err: true })
    }
  }
  return (
    <>
      <form className="newsletter" onSubmit={submit} noValidate>
        <input type="email" name="email" placeholder="Your work email" aria-label="Email" required />
        <button type="submit">Subscribe</button>
      </form>
      {state.msg && (
        <p className="form-success show" style={{
          borderColor: state.err ? 'rgba(224,36,36,.4)' : 'rgba(16,185,129,.4)',
          background: state.err ? 'rgba(224,36,36,.12)' : 'rgba(16,185,129,.12)',
          color: state.err ? '#fca5a5' : '#6ee7b7', marginTop: 12,
        }}>{state.msg}</p>
      )}
    </>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap f-main">
        <div className="f-about">
          <Link className="brand" to="/">
            <BrandMark footer />
            <span>
              <span className="brand-name" style={{ color: '#fff' }}>eShodha<span> Industries</span></span>
              <span className="brand-tag" style={{ color: '#74859c' }}>Steel Coil Manufacturing</span>
            </span>
          </Link>
          <p>An integrated steel manufacturer producing every grade of steel coil end-to-end — from iron ore and coking coal to tested, certified and delivered coils across India and 40+ export markets.</p>
          <div className="socials">
            <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={17} /></a>
            <a href="#" aria-label="X"><Icon name="x" size={17} /></a>
            <a href="#" aria-label="YouTube"><Icon name="youtube" size={17} /></a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <div className="f-links">
            <Link to="/about">About Us</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/news">News &amp; Media</Link>
            <Link to="/investors">Investor Relations</Link>
            <Link to="/sustainability">Sustainability</Link>
            <Link to="/quality">Quality &amp; Certifications</Link>
            <Link to="/services">Processing &amp; Services</Link>
          </div>
        </div>
        <div>
          <h4>Products &amp; Operations</h4>
          {PRODUCT_LINKS}
        </div>
        <div>
          <h4>Stay Updated</h4>
          <p style={{ fontSize: 14 }}>Monthly market note: coil price trends, grade launches and plant updates. No spam.</p>
          <NewsletterForm />
          <div className="f-contact" style={{ marginTop: 22 }}>
            <div className="fc"><Icon name="pin" size={17} /><span>eShodha House, Whitefield, Bengaluru 560066, Karnataka, India</span></div>
            <div className="fc"><Icon name="phone" size={17} /><span>1800 419 4567</span></div>
          </div>
        </div>
      </div>
      <div className="wrap f-bottom">
        <span>© {new Date().getFullYear()} eShodha Industries Pvt. Ltd. All rights reserved.</span>
        <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Sale</a> · <a href="#">Code of Conduct</a></span>
      </div>
    </footer>
  )
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [showTop, setShowTop] = React.useState(false)
  const [openSub, setOpenSub] = React.useState(null)
  const location = useLocation()

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      setShowTop(window.scrollY > 600)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu + scroll to top on navigation; handle #hash targets
  React.useEffect(() => {
    setMenuOpen(false)
    setOpenSub(null)
    document.body.style.overflow = ''
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) { setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60); return }
    }
    window.scrollTo(0, 0)
  }, [location])

  const isMobile = () => window.matchMedia('(max-width: 1080px)').matches

  const parentClick = (e, item) => {
    if (item.children && isMobile()) {
      e.preventDefault()
      setOpenSub(openSub === item.label ? null : item.label)
    }
  }

  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="tb-group">
            <span className="tb-item"><Icon name="phone" size={14} /> {COMPANY_FALLBACK.phone} (Toll Free)</span>
            <span className="tb-item"><Icon name="mail" size={14} /> {COMPANY_FALLBACK.sales_email}</span>
          </div>
          <div className="tb-group">
            <span className="tb-item"><Icon name="check" size={14} sw={2.5} /> ISO 9001 : 2015 Certified</span>
            <Link to="/payments">Pay Online</Link>
            <Link to="/support">Support</Link>
            <Link to="/investors">Investors</Link>
            <Link to="/news">Media</Link>
          </div>
        </div>
      </div>

      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="wrap nav">
          <Link className="brand" to="/">
            <BrandMark />
            <span>
              <span className="brand-name">eShodha<span> Industries</span></span>
              <span className="brand-tag">Steel Coil Manufacturing</span>
            </span>
          </Link>
          <ul className={`menu${menuOpen ? ' open' : ''}`}>
            {NAV.map((item) => (
              <li key={item.label} className={openSub === item.label ? 'open' : ''}>
                <NavLink to={item.to} end={item.to === '/'}
                  onClick={(e) => parentClick(e, item)}>
                  {item.label} {item.caret}
                </NavLink>
                {item.children && (
                  <div className="dropdown">
                    {item.children.map((c) => (
                      <Link to={c.to} key={c.to}>
                        <span>{c.label}</span>
                        <small>{c.small}</small>
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="nav-cta">
            <Link to="/contact" className="btn btn-primary btn-sm">Get a Quote</Link>
            <button className={`hamburger${menuOpen ? ' open' : ''}`} aria-label="Menu"
              onClick={() => {
                setMenuOpen(!menuOpen)
                document.body.style.overflow = !menuOpen ? 'hidden' : ''
              }}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />

      <ChatWidget />

      <button className={`back-top${showTop ? ' show' : ''}`} aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <Icon name="up" size={18} sw={2.5} />
      </button>
    </>
  )
}

const COMPANY_FALLBACK = {
  phone: '1800 419 4567',
  sales_email: 'sales@eshodhaindustries.com',
}

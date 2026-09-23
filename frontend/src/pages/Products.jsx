import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../api.js'
import { Counter, usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, SpecTable, CtaBand } from '../components/UI.jsx'

const HASH_TO_TAB = { hr: 'hr', cr: 'cr', gi: 'gi', cc: 'cc', ss: 'ss', crgo: 'crgo', ahss: 'ahss' }

export default function Products() {
  useTitle('Products — All Grades of Steel Coils | eShodha Industries')
  const { data, loading, error } = usePageData(api.products)
  const location = useLocation()
  const [active, setActive] = React.useState('hr')

  // deep-link support: /products#gi opens the matching tab
  React.useEffect(() => {
    if (location.hash) {
      const id = HASH_TO_TAB[location.hash.slice(1)]
      if (id) setActive(id)
    } else {
      setActive('hr')
    }
  }, [location.hash])

  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { products: p } = data
  const family = p.families.find((f) => f.id === active) || p.families[0]

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('${p.families[0].image}')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Products</div>
          <h1>{p.title}</h1>
          <p>{p.sub}</p>
        </div>
      </section>

      <section className="stats-band section tight">
        <div className="wrap">
          <div className="grid g4" style={{ alignItems: 'center' }}>
            {p.stats.map((s, i) => (
              <div className={`stat reveal${i ? ` d${i}` : ''}`} key={s.label}>
                <div className="num">
                  {s.prefix}
                  <Counter value={s.a} decimals={s.aDec} />
                  {s.b !== undefined && <>–<Counter value={s.b} decimals={s.bDec} /></>}
                  {' '}<i>{s.suffix || 'mm'}</i>
                </div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="wrap">
          <SectionHead eyebrow="Product Families" title="Choose a Family to See Grades & Specs"
            text="All products available in mill-edge, trimmed, slit or cut-to-length forms. Custom chemistry and tolerances on request." />

          <div className="prod-tabs reveal">
            {p.families.map((f) => (
              <button key={f.id} className={`prod-tab${active === f.id ? ' active' : ''}`}
                onClick={() => setActive(f.id)}>{f.tab}</button>
            ))}
          </div>

          <div className="prod-panel active" key={family.id}>
            <div className="prod-panel-head">
              <div>
                <span className="eyebrow">{family.eyebrow}</span>
                <h2 style={{ fontSize: 'clamp(24px,3vw,34px)', margin: '12px 0' }}>{family.name}</h2>
                <p style={{ color: 'var(--muted)' }}>{family.text}</p>
                <div className="badge-row">
                  {family.badges.map((b) => (
                    <span className={`badge${b.hl ? ' orange' : ''}`} key={b.label}>{b.label}</span>
                  ))}
                </div>
              </div>
              <div className="media"><img src={family.image} alt={family.eyebrow} /></div>
            </div>
            <SpecTable headers={family.headers} rows={family.rows} />
            <div className="dl-list">
              {family.datasheets.map((d) => (
                <a className="dl-item" href="#rfq-demo" key={d.label}
                  onClick={(e) => e.preventDefault()}>
                  <Icon name="download" size={18} /> {d.label} <small>{d.size}</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <SectionHead eyebrow="Value-Added Services" title="Beyond the Coil"
            text="Take delivery exactly how your line needs it — processed, protected and documented." />
          <div className="grid g4">
            {p.services.map((s, i) => (
              <div className={`card reveal${i ? ` d${i}` : ''}`} key={s.title}>
                <div className="icon"><Icon name={s.icon} size={26} /></div>
                <h3>{s.title}</h3><p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Can't find your grade? We'll make it."
        text="Share your drawing or spec — our metallurgy team replies with feasibility within 24 hours."
        primary={<Link to="/contact#rfq" className="btn btn-primary btn-lg">Request for Quotation</Link>}
        secondary={<Link to="/quality" className="btn btn-ghost btn-lg">See Testing Capability</Link>} />
    </>
  )
}

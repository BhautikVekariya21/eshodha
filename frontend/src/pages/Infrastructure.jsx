import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { Counter, usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { SectionHead, SpecTable, CtaBand } from '../components/UI.jsx'

export default function Infrastructure() {
  useTitle('Infrastructure — 3.5 MTPA Integrated Steel Complex | eShodha Industries')
  const { data, loading, error } = usePageData(api.infrastructure)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { infrastructure: inf } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('/img/hot-mill.jpg')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Operations <span className="sep">/</span> Infrastructure</div>
          <h1>{inf.title}</h1>
          <p>{inf.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Plant Units" title="Hospet Works — Unit by Unit"
            text="Click through to the process page to see how each unit connects in the production chain." />
          <div className="grid g3">
            {inf.units.map((u, i) => (
              <div className={`card reveal${i ? ` d${(i % 3) || 3}` : ''}`} key={u.name}>
                <h3 style={{ fontSize: 17 }}>{u.name}</h3>
                <div style={{ color: 'var(--orange)', fontWeight: 800, fontSize: 13, letterSpacing: '.06em', margin: '4px 0 10px', textTransform: 'uppercase' }}>{u.cap}</div>
                <p>{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band section tight">
        <div className="wrap">
          <div className="grid g4" style={{ alignItems: 'center' }}>
            {inf.siteStats.map((s, i) => (
              <div className={`stat reveal${i ? ` d${i}` : ''}`} key={s.label}>
                <div className="num"><Counter value={s.num} decimals={s.decimals} /> <i>{s.suffix}</i></div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Locations</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 20px' }}>Three Plants, One System</h2>
            <SpecTable headers={inf.locations.headers} rows={inf.locations.rows} />
            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
              <Link to="/process" className="btn btn-primary">See How It All Connects</Link>
              <Link to="/contact#tour" className="btn btn-outline">Visit the Complex</Link>
            </div>
          </div>
          <div className="media reveal"><img src={inf.image} alt="Aerial view of the Hospet works" /></div>
        </div>
      </section>
    </>
  )
}

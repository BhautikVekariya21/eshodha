import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { Counter, usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, TickList, BarChart } from '../components/UI.jsx'

export default function Sustainability() {
  useTitle('Sustainability & ESG — Road to 2035 Net Zero | eShodha Industries')
  const { data, loading, error } = usePageData(api.sustainability)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { sustainability: s } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('${s.image}')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Sustainability</div>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </section>

      <section className="stats-band section tight">
        <div className="wrap">
          <div className="kpi-strip">
            {s.kpis.map((k, i) => (
              <KpiRing key={k.label} value={k.num} decimals={k.decimals}
                suffix={k.suffix} ring={k.ring ?? 100} label={k.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Decarbonisation Roadmap" title={s.roadmapTitle} text={s.roadmapSub} />
          <div className="reveal"><BarChart bars={s.bars} /></div>
          <div className="grid g3" style={{ marginTop: 56 }}>
            {s.cards.map((c, i) => (
              <div className={`card reveal${i ? ` d${i}` : ''}`} key={c.title}>
                <div className="icon"><Icon name={c.icon} size={26} /></div>
                <h3>{c.title}</h3><p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap split">
          <div className="media reveal"><img src={s.image} alt="Solar array at the plant" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Reporting &amp; Ratings</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{s.reportingTitle}</h2>
            <TickList items={s.reporting} />
            <a href="#" className="btn btn-dark" onClick={(e) => e.preventDefault()}>Sustainability Report FY26 (PDF)</a>
          </div>
        </div>
      </section>
    </>
  )
}

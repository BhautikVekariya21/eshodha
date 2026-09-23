import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { Counter, usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, TickList, SpecTable, CtaBand } from '../components/UI.jsx'

export default function Investors() {
  useTitle('Investor Relations — Reports, Results & Governance | eShodha Industries')
  const { data, loading, error } = usePageData(api.investors)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { investors: inv } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('/img/hero-coils.jpg')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Investors</div>
          <h1>{inv.title}</h1>
          <p>{inv.sub}</p>
        </div>
      </section>

      <section className="stats-band section tight">
        <div className="wrap">
          <div className="grid g4" style={{ alignItems: 'center' }}>
            {inv.stats.map((s, i) => (
              <div className={`stat reveal${i ? ` d${i}` : ''}`} key={s.label}>
                <div className="num">
                  <Counter value={s.num} decimals={s.decimals} prefix={s.prefix} />
                  {s.suffix && <i>{s.suffix}</i>}
                </div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Financial Highlights" title="Five-Year Track Record" />
          <div className="reveal"><SpecTable headers={inv.financial.headers} rows={inv.financial.rows} /></div>
          <div className="grid g3" style={{ marginTop: 52 }}>
            {inv.reports.map((r, i) => (
              <div className={`card reveal${i ? ` d${i}` : ''}`} key={r.title}>
                <div className="icon"><Icon name={r.icon} size={26} /></div>
                <h3>{r.title}</h3><p>{r.text}</p>
                <a className="more" href="#" onClick={(e) => e.preventDefault()}>{r.link} <Icon name="arrowR" size={14} sw={2.5} /></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Corporate Governance</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{inv.governance.title}</h2>
            <TickList items={inv.governance.ticks} />
          </div>
          <div className="media reveal"><img src={inv.governance.image} alt="Steelmaking" /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Announcements" title="Recent Intimations to the Exchange" />
          <div style={{ display: 'grid', gap: 12, maxWidth: 900 }}>
            {inv.announcements.map((a) => (
              <div className="dl-item reveal" key={a.label}>
                <Icon name={a.icon} size={18} /> {a.label} <small>{a.date}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Investor queries?"
        text="Reach the Investor Relations desk at investors@eshodhaindustries.com — responses within one working day."
        primary={<Link to="/contact" className="btn btn-primary btn-lg">Contact IR</Link>} />
    </>
  )
}

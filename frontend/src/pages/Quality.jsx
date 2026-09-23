import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, TickList, SpecTable, CtaBand } from '../components/UI.jsx'

export default function Quality() {
  useTitle('Quality Assurance & Testing — NABL Lab, IATF 16949 | eShodha Industries')
  const { data, loading, error } = usePageData(api.quality)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { quality: q } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('${q.image}')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Quality</div>
          <h1>{q.title}</h1>
          <p>{q.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="media reveal"><img src={q.image} alt="Central testing laboratory" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Quality Policy</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{q.policyTitle}</h2>
            <p className="lead" style={{ fontSize: 16.5 }}>{q.policyText}</p>
            <TickList items={q.ticks} />
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <SectionHead eyebrow="Test Matrix" title="What We Test, and How Often"
            text="A snapshot of the routine test plan — customer-specific additional checks are added to the routing automatically." />
          <div className="reveal"><SpecTable headers={q.tests.headers} rows={q.tests.rows} /></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead center eyebrow="Accreditations" title="Certified Across the Board" />
          <div className="cert-row" style={{ justifyContent: 'center' }}>
            {q.certs.map((c) => (
              <div className="cert reveal" key={c.name}>
                <span className="ci"><Icon name="check" size={19} sw={2.5} /></span>
                <div><b>{c.name}</b><span>{c.sub}</span></div>
              </div>
            ))}
          </div>
          <div className="grid g3" style={{ marginTop: 52 }}>
            {q.cards.map((c, i) => (
              <div className={`card reveal${i ? ` d${i}` : ''}`} key={c.title}>
                <div className="icon"><Icon name={c.icon} size={26} /></div>
                <h3>{c.title}</h3><p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need our quality dossier for vendor approval?"
        text="Get the complete QA manual, MTC samples and accreditation copies in one pack."
        primary={<Link to="/contact#rfq" className="btn btn-primary btn-lg">Request QA Dossier</Link>} />
    </>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { SectionHead, CtaBand } from '../components/UI.jsx'

export default function Industries() {
  useTitle('Industries Served — Automotive, Construction, Appliances & More | eShodha Industries')
  const { data, loading, error } = usePageData(api.industries)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { industries: ind } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('${ind.items[1].image}')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Industries</div>
          <h1>{ind.title}</h1>
          <p>{ind.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Sector Coverage" title="Where Our Coils Go"
            text="Each sector team carries application know-how — forming dies, welding schedules and finishing partners included." />
          <div className="grid g3">
            {ind.items.map((it, i) => (
              <div className={`card reveal${i ? ` d${(i % 3) || 3}` : ''}`} key={it.name}>
                <img src={it.image} alt={it.name} style={{ borderRadius: 12, marginBottom: 18, aspectRatio: '16/9', objectFit: 'cover' }} />
                <h3>{it.name}</h3><p>{it.text}</p>
                <div className="pill-list" style={{ marginTop: 16 }}>
                  {it.pills.map((p) => <span className="pill" key={p}>{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Your sector, your grade, your schedule."
        text="Talk to the key-account engineer for your industry today."
        primary={<Link to="/contact#rfq" className="btn btn-primary btn-lg">Start a Conversation</Link>} />
    </>
  )
}

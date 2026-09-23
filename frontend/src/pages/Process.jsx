import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, TickList, CtaBand } from '../components/UI.jsx'

function FlowStepper({ stages }) {
  const [cur, setCur] = React.useState(0)
  const location = useLocation()
  const timer = React.useRef(null)

  const restartAuto = React.useCallback(() => {
    clearInterval(timer.current)
    timer.current = setInterval(() => setCur((c) => (c + 1) % stages.length), 7000)
  }, [stages.length])

  React.useEffect(() => {
    restartAuto()
    return () => clearInterval(timer.current)
  }, [restartAuto])

  const go = (i, user = false) => {
    setCur(((i % stages.length) + stages.length) % stages.length)
    if (user) restartAuto()
  }

  // arriving via /process#logistics should jump to the dispatch stage
  React.useEffect(() => {
    if (location.hash === '#logistics') go(stages.length - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.hash])

  const stage = stages[cur]

  return (
    <div className="flow-wrap">
      <div className="flow-steps">
        {stages.map((s, i) => (
          <button key={s.n}
            className={`flow-step${i === cur ? ' active' : ''}${i < cur ? ' done' : ''}`}
            onClick={() => go(i, true)}>
            <span className="fnum">{String(s.n).padStart(2, '0')}</span>
            <span className="ftxt"><b>{s.title}</b><span>{s.tag}</span></span>
          </button>
        ))}
      </div>

      <div>
        <div className="flow-stage" key={stage.n} style={{ animation: 'fadeUp .45s ease' }}>
          <div className="flow-media" style={{ backgroundImage: `url('${stage.image}')` }}>
            <span className="fcount">STAGE {String(stage.n).padStart(2, '0')} / {stages.length}</span>
          </div>
          <div className="flow-body">
            <span className="step-tag">{stage.tag}</span>
            <h3>{stage.title}</h3>
            <p>{stage.text}</p>
            <div className="flow-metrics">
              {stage.metrics.map((m) => (
                <div className="fm-box" key={m.l}><b>{m.v}</b><span>{m.l}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flow-nav">
          <button className="btn btn-outline btn-sm" onClick={() => go(cur - 1, true)}>← Previous Stage</button>
          <button className="btn btn-primary btn-sm" onClick={() => go(cur + 1, true)}>Next Stage →</button>
        </div>
        <div className="flow-progress">
          <i style={{ width: `${((cur + 1) / stages.length) * 100}%` }} />
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  useTitle('End-to-End Manufacturing Process — From Ore to Coil | eShodha Industries')
  const { data, loading, error } = usePageData(api.process)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { process: p } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('${p.stages[4].image}')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Operations <span className="sep">/</span> Process</div>
          <h1>{p.title}</h1>
          <p>{p.sub}</p>
        </div>
      </section>

      <section className="section" id="flowRoot">
        <div className="wrap">
          <SectionHead eyebrow="The Full Journey" title="16 Stages of Integrated Coil Making"
            text="Steps advance automatically — or click any stage. Stage 1 begins in the raw-material yard and Stage 16 ends on a dispatch rake bound for your plant." />
          <FlowStepper stages={p.stages} />
        </div>
      </section>

      {/* BYPRODUCTS */}
      <section className="section dark">
        <div className="wrap">
          <SectionHead center eyebrow="Closed-Loop Operations" title="Every Byproduct Has a Second Job"
            text="Integration is not just forward to coils — it's sideways into energy, cement and chemicals." />
          <div className="grid g4">
            {p.byproducts.map((b, i) => (
              <div className={`card dark reveal${i ? ` d${i}` : ''}`} key={b.title}>
                <div className="icon" style={{ background: 'rgba(242,97,26,.14)' }}>
                  <Icon name={b.icon} size={26} style={{ color: 'var(--orange)' }} />
                </div>
                <h3>{b.title}</h3><p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGISTICS */}
      <section className="section" id="logistics">
        <div className="wrap split rev">
          <div className="media reveal"><img src={p.logistics.image} alt="Coil dispatch yard and rake loading" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Logistics &amp; Dispatch</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{p.logistics.title}</h2>
            <TickList items={p.logistics.ticks} />
            <Link to="/contact" className="btn btn-dark">Discuss Your Delivery Schedule</Link>
          </div>
        </div>
      </section>

      <CtaBand title="See it live — audits welcome, always."
        text="Book a plant tour or request our detailed process capability dossier for your vendor approval."
        primary={<Link to="/contact#tour" className="btn btn-primary btn-lg">Book a Plant Tour</Link>}
        secondary={<Link to="/quality" className="btn btn-ghost btn-lg">Quality Documentation</Link>} />
    </>
  )
}

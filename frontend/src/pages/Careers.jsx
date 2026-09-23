import React from 'react'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, FormSuccess, FormError } from '../components/UI.jsx'

function ApplyForm({ job, onDone }) {
  const [state, setState] = React.useState({ sending: false, msg: null, err: null })
  const submit = async (e) => {
    e.preventDefault()
    const f = e.target
    setState({ sending: true, msg: null, err: null })
    try {
      const res = await api.submitApplication({
        job: job.title, name: f.name.value.trim(), email: f.email.value.trim(), phone: f.phone.value.trim(),
      })
      setState({ sending: false, msg: res.message, err: null })
      f.reset()
    } catch (err) {
      setState({ sending: false, msg: null, err: err.message })
    }
  }
  return (
    <form onSubmit={submit} noValidate
      style={{ marginTop: 16, paddingTop: 18, borderTop: '1px dashed var(--line)', width: '100%' }}>
      <div className="form-grid">
        <div className="field"><label>Full Name <i>*</i></label><input name="name" required placeholder="Your name" /></div>
        <div className="field"><label>Email <i>*</i></label><input name="email" type="email" required placeholder="you@email.com" /></div>
        <div className="field"><label>Phone <i>*</i></label><input name="phone" required placeholder="+91" /></div>
        <div className="field" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" disabled={state.sending} type="submit">
            {state.sending ? 'Submitting…' : 'Submit Application'}
          </button>
        </div>
      </div>
      <FormSuccess msg={state.msg} />
      <FormError msg={state.err} />
      {state.msg && <button type="button" className="btn btn-outline btn-sm" style={{ marginTop: 10 }} onClick={onDone}>Close</button>}
    </form>
  )
}

export default function Careers() {
  useTitle('Careers — Jobs at India\'s Integrated Coil Maker | eShodha Industries')
  const { data, loading, error } = usePageData(api.careers)
  const [filter, setFilter] = React.useState('all')
  const [applying, setApplying] = React.useState(null)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { careers: c } = data
  const jobs = c.jobs.filter((j) => filter === 'all' || j.cat === filter)

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('/img/casting.jpg')` }} />
        <div className="wrap">
          <div className="crumbs"><a href="/">Home</a> <span className="sep">/</span> Careers</div>
          <h1>{c.title}</h1>
          <p>{c.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Why eShodha" title="Heavy Industry, Light-Speed Growth" />
          <div className="grid g3">
            {c.perks.map((p, i) => (
              <div className={`perk reveal${i ? ` d${i}` : ''}`} key={p.title}>
                <span className="icon"><Icon name={p.icon} size={22} /></span>
                <div><b>{p.title}</b><span>{p.text}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap">
          <SectionHead eyebrow="Open Positions" title="Current Openings"
            text="Filter by function — or send a general application; we keep CVs on file for 12 months." />
          <div className="filter-bar reveal">
            {c.filters.map((f) => (
              <button key={f.id} className={`filter-btn${filter === f.id ? ' active' : ''}`}
                onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {jobs.map((j) => (
              <div className="job-card" key={j.id} style={{ flexWrap: 'wrap' }}>
                <div>
                  <h3>{j.title}</h3>
                  <div className="job-tags">
                    <span className="badge orange">{j.dept}</span>
                    <span className="badge">{j.loc}</span>
                    <span className="badge">{j.type}</span>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setApplying(applying === j.id ? null : j.id)}>
                  {applying === j.id ? 'Close ✕' : 'Apply →'}
                </button>
                {applying === j.id && <ApplyForm job={j} onDone={() => setApplying(null)} />}
              </div>
            ))}
            {jobs.length === 0 && <p style={{ color: 'var(--muted)' }}>No open roles in this function right now — send a general application via the contact page.</p>}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="media reveal"><img src={c.academy.image} alt="Training at Shodha Academy" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Shodha Academy</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{c.academy.title}</h2>
            <p className="lead" style={{ fontSize: 16.5 }}>{c.academy.text}</p>
            <div className="grid g2" style={{ marginTop: 24 }}>
              {c.academy.stats.map((s) => (
                <div className="fm-box" key={s.l}><b>{s.v}</b><span>{s.l}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

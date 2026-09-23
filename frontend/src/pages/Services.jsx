import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, CtaBand, FormSuccess, FormError } from '../components/UI.jsx'

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 2 })

/* ---------------- Processing quote calculator (priced by the backend) ---------------- */
function QuoteCalculator({ calc }) {
  const [result, setResult] = React.useState(null)
  const [busy, setBusy] = React.useState(false)
  const [err, setErr] = React.useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    setErr(null); setBusy(true)
    try {
      setResult(await api.serviceQuote({
        service: f.get('service'), material: f.get('material'),
        thickness_mm: Number(f.get('thickness_mm')), width_mm: Number(f.get('width_mm')),
        tonnage: Number(f.get('tonnage')), turnaround: f.get('turnaround'),
      }))
    } catch (error) { setErr(error.message); setResult(null) }
    finally { setBusy(false) }
  }

  return (
    <div className="calc-wrap">
      <form className="form-card calc-form" onSubmit={submit} noValidate>
        <h3 style={{ fontSize: 20, marginBottom: 18 }}>Job details</h3>
        <div className="form-grid">
          <div className="field"><label>Processing service</label>
            <select name="service" defaultValue="slitting">
              {calc.services.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </div>
          <div className="field"><label>Material</label>
            <select name="material" defaultValue="cr">
              {calc.materials.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
          <div className="field"><label>Thickness (mm) <i>*</i></label>
            <input name="thickness_mm" type="number" step="0.01" min="0.05" max="25" required defaultValue="0.8" />
          </div>
          <div className="field"><label>Output width (mm) <i>*</i></label>
            <input name="width_mm" type="number" min="10" max="2000" required defaultValue="1250" />
          </div>
          <div className="field"><label>Tonnage (t) <i>*</i></label>
            <input name="tonnage" type="number" min="1" max="100000" required defaultValue="250" />
          </div>
          <div className="field"><label>Turnaround</label>
            <select name="turnaround" defaultValue="standard">
              {calc.turnarounds.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </div>
          <div className="field full">
            <button className="btn btn-primary" disabled={busy} type="submit">{busy ? 'Pricing…' : 'Calculate Price'}</button>
          </div>
        </div>
        <FormError msg={err} />
      </form>

      <div className="calc-result">
        {result ? (
          <div className="receipt" style={{ animation: 'fadeUp .4s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <span style={{ fontSize: 12, color: 'var(--faint)', fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' }}>Indicative rate</span>
                <div className="amount-big">{inr(result.rate_per_tonne)}<span style={{ fontSize: 16, fontWeight: 600, color: 'var(--muted)' }}> /tonne</span></div>
              </div>
              <span className="status-pill pending">Indicative — firm offer on PO</span>
            </div>
            <div className="calc-factors">
              {result.factors.map((f, i) => (
                <div className="cf-row" key={i}><span>{f.label}</span><b>{f.value}</b></div>
              ))}
            </div>
            <div className="calc-totals">
              <div><span>{result.tonnage} t × rate</span><b>{inr(result.subtotal)}</b></div>
              <div><span>IGST 18%</span><b>{inr(result.gst)}</b></div>
              <div className="grand"><span>Total payable</span><b>{inr(result.total)}</b></div>
              <div><span>Delivery</span><b>{result.timeline}</b></div>
            </div>
            <Link to="/contact#rfq" className="btn btn-dark" style={{ marginTop: 18 }}>Convert to Firm Offer</Link>
          </div>
        ) : (
          <div className="calc-empty">
            <Icon name="chart" size={34} />
            <p>Fill the job details and hit <b>Calculate</b> — our Python pricing engine returns an indicative rate with the full factor breakdown.</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------- Service booking with SRV tracking ---------------- */
function ServiceBooking({ types }) {
  const [state, setState] = React.useState({ busy: false, msg: null, ref: null, err: null })
  const [lookupRef, setLookupRef] = React.useState('')
  const [lookup, setLookup] = React.useState(null)
  const [lookupErr, setLookupErr] = React.useState(null)

  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    setState({ busy: true, msg: null, ref: null, err: null })
    try {
      const res = await api.serviceRequest({
        type: f.get('type'), name: f.get('name').trim(), email: f.get('email').trim(),
        phone: f.get('phone').trim(), org: (f.get('org') || '').trim(),
        details: (f.get('details') || '').trim(), preferred_date: f.get('preferred_date') || '',
      })
      setState({ busy: false, msg: res.message, ref: res.ref, err: null })
      e.target.reset()
    } catch (error) { setState({ busy: false, msg: null, ref: null, err: error.message }) }
  }

  const doLookup = async (e) => {
    e.preventDefault()
    setLookupErr(null); setLookup(null)
    try { setLookup(await api.serviceRequestStatus(lookupRef.trim())) }
    catch (error) { setLookupErr(error.message) }
  }

  return (
    <div className="split" style={{ alignItems: 'start' }}>
      <div className="form-card">
        <h3 style={{ fontSize: 22, marginBottom: 8 }}>Book a Service</h3>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
          Lab tests, VMI reservations, consultancy and training — one form, instant SRV reference.
        </p>
        <form onSubmit={submit} noValidate>
          <div className="form-grid">
            <div className="field full"><label>Service <i>*</i></label>
              <select name="type" defaultValue="lab">
                {types.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
            <div className="field"><label>Full Name <i>*</i></label><input name="name" required /></div>
            <div className="field"><label>Organisation</label><input name="org" /></div>
            <div className="field"><label>Email <i>*</i></label><input name="email" type="email" required /></div>
            <div className="field"><label>Phone <i>*</i></label><input name="phone" required placeholder="+91" /></div>
            <div className="field"><label>Preferred start</label><input name="preferred_date" type="date" /></div>
            <div className="field full"><label>Scope / requirements</label>
              <textarea name="details" placeholder="e.g. Tensile + coating weight on 3 CR samples, report to QA@acme.in" />
            </div>
            <div className="field full"><button className="btn btn-primary btn-lg" disabled={state.busy} type="submit">{state.busy ? 'Booking…' : 'Book Service'}</button></div>
          </div>
          <FormSuccess msg={state.msg} />
          <FormError msg={state.err} />
        </form>
      </div>

      <div>
        <div className="form-card" style={{ boxShadow: 'none' }}>
          <h3 style={{ fontSize: 18, marginBottom: 12 }}>Track a service request</h3>
          <form className="history-bar" onSubmit={doLookup}>
            <input value={lookupRef} onChange={(e) => setLookupRef(e.target.value)} placeholder="SRV-2026-0001" aria-label="Service reference" />
            <button className="btn btn-dark" type="submit">Track</button>
          </form>
          <FormError msg={lookupErr} />
          {lookup && (
            <div className="ticket-card" style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                <b>{lookup.ref}</b>
                <span className="status-pill open">{lookup.status.replace('_', ' ')}</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 6 }}>
                {types.find((t) => t.id === lookup.type)?.label || lookup.type} · {lookup.org || lookup.name} · raised {lookup.created_at}
              </div>
              {lookup.details && <p style={{ fontSize: 14, marginTop: 10 }}>{lookup.details}</p>}
            </div>
          )}
        </div>
        <div className="fm-box" style={{ marginTop: 16 }}>
          <b>SLAs by service</b>
          <span>{types.map((t) => `${t.label}: ${t.sla}`).join(' · ')}</span>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  useTitle('Services — Processing, VMI Warehousing, Lab Testing & Consultancy | eShodha Industries')
  const { data, loading, error } = usePageData(api.services)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { services: s } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: "url('/img/color-coil.jpg')" }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Services</div>
          <h1>{s.title}</h1>
          <p>{s.sub}</p>
        </div>
      </section>

      {/* SERVICE CATALOGUE */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Service Catalogue" title={`${s.cards.length} Ways We Work For You`}
            text="Everything below runs on spare capacity of our own plants and labs — which is why turnaround is measured in days, not weeks." />
          <div className="grid g3">
            {s.cards.map((c, i) => (
              <div className={`card reveal${i ? ` d${(i % 3) || 3}` : ''}`} key={c.title}>
                <div className="icon"><Icon name={c.icon} size={26} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <div style={{ marginTop: 14, fontWeight: 800, color: 'var(--orange-d)', fontSize: 13.5, letterSpacing: '.04em', textTransform: 'uppercase' }}>{c.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE CALCULATOR */}
      <section className="section light">
        <div className="wrap">
          <SectionHead eyebrow="Processing Calculator" title={s.calculator.title} text={s.calculator.text} />
          <QuoteCalculator calc={s.calculator} />
        </div>
      </section>

      {/* BOOKING + TRACKING */}
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Service Desk" title="Book, Then Track"
            text="Every booking is logged in our system with an SRV reference and a defined SLA." />
          <ServiceBooking types={s.bookingTypes} />
        </div>
      </section>

      {/* HOW ENGAGEMENT WORKS */}
      <section className="section dark">
        <div className="wrap">
          <SectionHead center eyebrow="How It Works" title="From Request to Review" />
          <div className="mini-flow" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {s.nextSteps.map((n, i) => (
              <div className="mf-node" key={n.title} style={{ background: 'transparent', borderColor: 'rgba(255,255,255,.14)' }}>
                <span className="mf-num" style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.2)', color: 'var(--amber)' }}>{String(i + 1).padStart(2, '0')}</span>
                <b style={{ color: '#fff' }}>{n.title}</b>
                <span style={{ color: '#93a5bd' }}>{n.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need a service that isn't listed?"
        text="From scrap reverse-logistics to embedded engineers at your plant — if it involves steel, we probably do it."
        primary={<Link to="/contact" className="btn btn-primary btn-lg">Describe Your Requirement</Link>}
        secondary={<Link to="/payments" className="btn btn-ghost btn-lg">Pay an Invoice</Link>} />
    </>
  )
}

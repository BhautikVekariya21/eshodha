import React from 'react'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, TickList, Accordion, FormSuccess, FormError } from '../components/UI.jsx'

/* Reusable async form: posts JSON to the Python backend, shows ref + message */
function AsyncForm({ submit, fields, submitLabel, successExtra }) {
  const [state, setState] = React.useState({ sending: false, msg: null, err: null })
  const submit2 = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const payload = {}
    fields.forEach((fl) => { payload[fl.name] = (f.get(fl.name) || '').toString().trim() })
    setState({ sending: true, msg: null, err: null })
    try {
      const res = await submit(payload)
      setState({ sending: false, msg: res.message, err: null })
      e.target.reset()
    } catch (err) {
      setState({ sending: false, msg: null, err: err.message })
    }
  }
  return (
    <form onSubmit={submit2} noValidate>
      <div className="form-grid">
        {fields.map((f) => (
          <div className={`field${f.full ? ' full' : ''}`} key={f.name}>
            <label>{f.label} {f.required && <i>*</i>}</label>
            {f.type === 'select' ? (
              <select name={f.name} required={f.required} defaultValue="">
                <option value="" disabled>Select…</option>
                {f.options.map((o) => <option key={o}>{o}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea name={f.name} placeholder={f.placeholder || ''} required={f.required} />
            ) : (
              <input name={f.name} type={f.type || 'text'} placeholder={f.placeholder || ''} required={f.required} />
            )}
          </div>
        ))}
        <div className="field full">
          <button className="btn btn-primary btn-lg" type="submit" disabled={state.sending}>
            {state.sending ? 'Sending…' : submitLabel}
          </button>
        </div>
      </div>
      <FormSuccess msg={state.msg} />
      <FormError msg={state.err} />
      {state.msg && successExtra}
    </form>
  )
}

export default function Contact() {
  useTitle('Contact & RFQ — Quotes, Dealers, Plant Tours | eShodha Industries')
  const { data, loading, error } = usePageData(api.contact)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { contact: c } = data

  const rfqFields = [
    { name: 'name', label: 'Full Name', required: true, placeholder: 'e.g. Priya Sharma' },
    { name: 'company', label: 'Company', required: true, placeholder: 'Company / Firm' },
    { name: 'email', label: 'Email', required: true, type: 'email', placeholder: 'you@company.com' },
    { name: 'phone', label: 'Phone', required: true, type: 'tel', placeholder: '+91' },
    { name: 'product', label: 'Product Family', required: true, type: 'select', options: c.rfq.productOptions },
    { name: 'quantity', label: 'Quantity (t)', required: true, type: 'number', placeholder: 'e.g. 500' },
    { name: 'spec', label: 'Specification (grade / thickness / width / coating)', type: 'textarea', full: true, placeholder: 'e.g. IS 2062 E250BR, 3 mm × 1250 mm, HRPO' },
    { name: 'delivery', label: 'Delivery Location', required: true, full: true, placeholder: 'City, State / Port' },
  ]
  const dealerFields = [
    { name: 'firm', label: 'Firm Name', required: true },
    { name: 'owner', label: 'Owner / Partner', required: true },
    { name: 'email', label: 'Email', required: true, type: 'email' },
    { name: 'phone', label: 'Phone', required: true, type: 'tel' },
    { name: 'territory', label: 'Territory Requested', required: true, full: true, placeholder: 'District / State' },
    { name: 'lines', label: 'Current Lines Carried', full: true, placeholder: 'e.g. Cement, TMT, Plywood…' },
  ]
  const tourFields = [
    { name: 'name', label: 'Contact Person', required: true },
    { name: 'org', label: 'Organisation' },
    { name: 'email', label: 'Email', required: true, type: 'email' },
    { name: 'phone', label: 'Phone', required: true, type: 'tel' },
    { name: 'preferred_date', label: 'Preferred Date (Tue / Fri)', required: true, type: 'date' },
    { name: 'group_size', label: 'Group Size', required: true, placeholder: 'e.g. 8' },
    { name: 'purpose', label: 'Purpose of Visit', type: 'textarea', full: true, placeholder: 'Customer audit / academic tour / investor visit' },
  ]

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('/img/molten-steel.jpg')` }} />
        <div className="wrap">
          <div className="crumbs"><a href="/">Home</a> <span className="sep">/</span> Contact</div>
          <h1>{c.title}</h1>
          <p>{c.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="grid g3" style={{ marginBottom: 56 }}>
            {c.tiles.map((t, i) => (
              <div className={`contact-tile reveal${i ? ` d${i}` : ''}`} key={t.title}>
                <span className="icon"><Icon name={t.icon} size={22} /></span>
                <div><b>{t.title}</b><p>{t.lines.map((l, j) => <React.Fragment key={j}>{l}<br /></React.Fragment>)}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ */}
      <section className="section light" id="rfq">
        <div className="wrap split rev" style={{ alignItems: 'start' }}>
          <div>
            <span className="eyebrow">Request for Quotation</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 12px' }}>{c.rfq.title}</h2>
            <p className="lead" style={{ fontSize: 16 }}>{c.rfq.text}</p>
            <div className="fm-box" style={{ marginTop: 22, maxWidth: 420 }}>
              <b>Plant tours &amp; audits</b>
              <span>Write to {data.company.tour_email} or use the booking form below.</span>
            </div>
            <div className="fm-box" style={{ marginTop: 14, maxWidth: 420 }}>
              <b>Existing customer?</b>
              <span>Track orders &amp; MTCs on the customer portal — link sent with every PI.</span>
            </div>
          </div>
          <div className="form-card reveal">
            <AsyncForm submit={api.submitRFQ} fields={rfqFields}
              submitLabel="Send RFQ"
              successExtra={<p className="form-note" style={{ marginTop: 10 }}>Save your reference number for correspondence.</p>} />
            <p className="form-note" style={{ marginTop: 14 }}>By submitting you agree to our privacy policy. We never share your data. Stored securely in our Python/SQLite backend.</p>
          </div>
        </div>
      </section>

      {/* DEALER + TOUR */}
      <section className="section" id="dealer">
        <div className="wrap split" style={{ alignItems: 'start' }}>
          <div className="form-card reveal">
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>{c.dealer.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>{c.dealer.text}</p>
            <AsyncForm submit={api.submitDealer} fields={dealerFields} submitLabel="Submit Partner Enquiry" />
          </div>
          <div id="tour">
            <span className="eyebrow">Plant Tours</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 12px' }}>{c.tour.title}</h2>
            <p className="lead" style={{ fontSize: 16, color: 'var(--muted)' }}>{c.tour.text}</p>
            <TickList items={c.tour.ticks} />
            <div className="form-card" style={{ boxShadow: 'none', padding: 28 }}>
              <h3 style={{ fontSize: 18, marginBottom: 14 }}>Book a visit</h3>
              <AsyncForm submit={api.submitTour} fields={tourFields} submitLabel="Request Tour Date" />
            </div>
          </div>
        </div>
      </section>

      {/* MAP + OFFICES */}
      <section className="section light">
        <div className="wrap">
          <SectionHead eyebrow="Find Us" title="Locations" />
          <div className="map-embed reveal">
            <iframe title="eShodha Industries HQ map" src={c.map.embed} style={{ width: '100%', height: 380, border: 0 }} loading="lazy" />
          </div>
          <div className="grid g3" style={{ marginTop: 30 }}>
            {c.offices.map((o, i) => (
              <div className={`contact-tile reveal${i ? ` d${i}` : ''}`} key={o.title}>
                <span className="icon"><Icon name="pin" size={22} /></span>
                <div><b>{o.title}</b><p>{o.lines.join(' ')}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <SectionHead eyebrow="FAQs" title="Quick Answers" />
          <div className="reveal"><Accordion items={c.faqs} /></div>
        </div>
      </section>
    </>
  )
}

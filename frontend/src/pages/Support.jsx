import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { useTitle } from '../hooks.jsx'
import { Icon, SpecTable, FormSuccess, FormError } from '../components/UI.jsx'

const CATEGORIES = [
  { id: 'quality', label: 'Quality Claim / Defect' },
  { id: 'delivery', label: 'Delivery & Logistics' },
  { id: 'order', label: 'Order Status' },
  { id: 'documents', label: 'Documents (MTC / Invoice)' },
  { id: 'billing', label: 'Billing & Payments' },
  { id: 'other', label: 'Other' },
]
const PRIORITIES = [
  { id: 'urgent', label: 'Urgent — plant downtime', sla: '2 hrs' },
  { id: 'high', label: 'High — quality claim', sla: '8 business hrs' },
  { id: 'medium', label: 'Medium — delivery reschedule', sla: '1 business day' },
  { id: 'low', label: 'Low — documents / info', sla: '2 business days' },
]

function StatusPill({ status }) {
  const labels = { open: 'Open', in_progress: 'In Progress', resolved: 'Resolved', success: '✓ Success', pending: 'Pending', pending_verification: 'Verifying', failed: '✕ Failed' }
  return <span className={`status-pill ${status}`}>{labels[status] || status}</span>
}

function RaiseTicket({ onCreated }) {
  const [state, setState] = React.useState({ busy: false, msg: null, ref: null, err: null })
  const submit = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    setState({ busy: true, msg: null, ref: null, err: null })
    try {
      const res = await api.createTicket({
        name: f.get('name').trim(), email: f.get('email').trim(), phone: f.get('phone').trim(),
        category: f.get('category'), priority: f.get('priority'),
        order_ref: (f.get('order_ref') || '').trim(), subject: f.get('subject').trim(), message: f.get('message').trim(),
      })
      setState({ busy: false, msg: res.message, ref: res.ref, err: null })
      e.target.reset()
      onCreated(res.ref)
    } catch (err) {
      setState({ busy: false, msg: null, ref: null, err: err.message })
    }
  }
  return (
    <div className="form-card">
      <h3 style={{ fontSize: 22, marginBottom: 8 }}>Raise a Support Ticket</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
        Tracked end-to-end with a TCK reference. Priority sets your response SLA automatically.
      </p>
      <form onSubmit={submit} noValidate>
        <div className="form-grid">
          <div className="field"><label>Full Name <i>*</i></label><input name="name" required /></div>
          <div className="field"><label>Email <i>*</i></label><input name="email" type="email" required /></div>
          <div className="field"><label>Phone <i>*</i></label><input name="phone" required placeholder="+91" /></div>
          <div className="field"><label>Order / PI Number</label><input name="order_ref" placeholder="PI-2026-0142 (optional)" /></div>
          <div className="field"><label>Category <i>*</i></label>
            <select name="category" required defaultValue="quality">
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className="field"><label>Priority <i>*</i></label>
            <select name="priority" required defaultValue="medium">
              {PRIORITIES.map((p) => <option key={p.id} value={p.id}>{p.label} · SLA {p.sla}</option>)}
            </select>
          </div>
          <div className="field full"><label>Subject <i>*</i></label><input name="subject" required placeholder="One-line summary" /></div>
          <div className="field full"><label>Describe the issue <i>*</i></label><textarea name="message" required minLength={10} placeholder="Include coil/heat numbers, photos reference, dates…" /></div>
          <div className="field full"><button className="btn btn-primary btn-lg" disabled={state.busy} type="submit">{state.busy ? 'Creating…' : 'Create Ticket'}</button></div>
        </div>
        <FormSuccess msg={state.msg} />
        <FormError msg={state.err} />
        {state.ref && (
          <button type="button" className="btn btn-dark btn-sm" style={{ marginTop: 12 }}
            onClick={() => onCreated(state.ref)}>Track {state.ref} now →</button>
        )}
      </form>
    </div>
  )
}

function TicketTracker({ inputRef }) {
  const [ref, setRef] = React.useState('')
  const [ticket, setTicket] = React.useState(null)
  const [busy, setBusy] = React.useState(false)
  const [err, setErr] = React.useState(null)
  const [replyMsg, setReplyMsg] = React.useState('')
  const [replyBusy, setReplyBusy] = React.useState(false)

  const load = async (value) => {
    const r = (value ?? ref).trim()
    if (!r) return
    setBusy(true); setErr(null)
    try { setTicket(await api.ticket(r)) }
    catch (e) { setTicket(null); setErr(e.message) }
    finally { setBusy(false) }
  }

  React.useEffect(() => {
    if (inputRef?.current) { setRef(inputRef.current); load(inputRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputRef])

  const sendReply = async (e) => {
    e.preventDefault()
    if (replyMsg.trim().length < 2) return
    setReplyBusy(true)
    try {
      const res = await api.replyTicket(ticket.ref, replyMsg.trim())
      setTicket(res.ticket); setReplyMsg('')
    } catch (e2) { setErr(e2.message) }
    finally { setReplyBusy(false) }
  }

  return (
    <div className="form-card">
      <h3 style={{ fontSize: 22, marginBottom: 8 }}>Track a Ticket</h3>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 16 }}>Enter your reference (e.g. TCK-2026-0001).</p>
      <form onSubmit={(e) => { e.preventDefault(); load() }} className="history-bar" style={{ marginBottom: 18 }}>
        <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder="TCK-2026-0001" aria-label="Ticket reference" />
        <button className="btn btn-dark" disabled={busy} type="submit">{busy ? 'Checking…' : 'Track'}</button>
      </form>
      <FormError msg={err} />

      {ticket && (
        <div className="ticket-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <b style={{ fontSize: 16.5 }}>{ticket.subject}</b>
              <div style={{ fontSize: 13, color: 'var(--faint)', marginTop: 4 }}>
                {ticket.ref} · {ticket.category} · Priority: <b style={{ textTransform: 'capitalize', color: 'var(--ink)' }}>{ticket.priority}</b>
              </div>
            </div>
            <StatusPill status={ticket.status} />
          </div>

          <div className="ticket-thread">
            <div className="t-reply customer">
              <div className="t-meta">You · {ticket.created_at}</div>
              {ticket.message}
            </div>
            {ticket.replies.map((r, i) => (
              <div className={`t-reply ${r.author}`} key={i}>
                <div className="t-meta">{r.author === 'support' ? '⚡ eShodha Support' : 'You'} · {r.created_at}</div>
                {r.message}
              </div>
            ))}
          </div>

          {ticket.status !== 'resolved' && (
            <form onSubmit={sendReply}>
              <div className="field">
                <label>Add a reply</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input value={replyMsg} onChange={(e) => setReplyMsg(e.target.value)} placeholder="Type your update…" />
                  <button className="btn btn-primary btn-sm" disabled={replyBusy} type="submit">{replyBusy ? '…' : 'Send'}</button>
                </div>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}

export default function Support() {
  useTitle('Customer Support — Tickets, Live Chat & SLAs | eShodha Industries')
  const trackRef = React.useRef(null)

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: "url('/img/lab.jpg')" }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Customer Support</div>
          <h1>Support That Answers in Hours, Not Days</h1>
          <p>Live chat with Shodha Assist, tracked tickets with SLA clocks, and named escalation contacts — from order to after-sales.</p>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="section">
        <div className="wrap">
          <div className="grid g3" style={{ marginBottom: 56 }}>
            <div className="contact-tile reveal">
              <span className="icon"><Icon name="chat" size={22} /></span>
              <div><b>Live Chat — Shodha Assist</b><p>Instant answers 24×7 via the orange headset button (bottom-right) on every page.</p></div>
            </div>
            <div className="contact-tile reveal d1">
              <span className="icon"><Icon name="phone" size={22} /></span>
              <div><b>Priority Phone Line</b><p>1800 419 4567 (toll-free) · Mon–Sat, 09:00–18:00 IST · key-account direct lines on request.</p></div>
            </div>
            <div className="contact-tile reveal d2">
              <span className="icon"><Icon name="ticket" size={22} /></span>
              <div><b>Tracked Tickets</b><p>Create below — every ticket gets a reference, an SLA clock and a full reply history.</p></div>
            </div>
          </div>

          <div className="split" style={{ alignItems: 'start', marginTop: 10 }}>
            <RaiseTicket onCreated={(r) => { trackRef.current = r }} />
            <TicketTracker inputRef={trackRef} />
          </div>
        </div>
      </section>

      {/* SLA */}
      <section className="section light">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Service Levels</span>
            <h2>Our Response Commitments</h2>
            <p>SLA clocks start the moment your ticket is created — status and history stay visible to you throughout.</p>
          </div>
          <div className="reveal">
            <SpecTable
              headers={['Priority', 'Typical Use', 'First Response', 'Resolution Target']}
              rows={[
                ['Urgent', 'Plant-down supply, safety issue', '2 hours (call-back)', '24 hours'],
                ['High', 'Quality claim, wrong material delivered', '8 business hours', '7 days (8D closure 30 days)'],
                ['Medium', 'Delivery reschedule, partial dispatch', '1 business day', '5 business days'],
                ['Low', 'Duplicate MTC, invoice copy, info requests', '2 business days', '10 business days'],
              ]} />
          </div>
          <div className="grid g3" style={{ marginTop: 44 }}>
            <div className="card reveal"><div className="icon"><Icon name="team" size={26} /></div><h3>Named Key-Account Engineer</h3><p>Every OEM account gets a named engineer with a direct line — no call-centre queues.</p></div>
            <div className="card reveal d1"><div className="icon"><Icon name="search" size={26} /></div><h3>Claim Investigation in 30 Days</h3><p>Quality claims run on an 8D/CAPA process with root-cause and corrective-action reporting you can audit.</p></div>
            <div className="card reveal d2"><div className="icon"><Icon name="shield" size={26} /></div><h3>Escalation Matrix</h3><p>Unresolved after SLA? Tickets auto-escalate: Desk → Plant Head → Director Operations → MD's office.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

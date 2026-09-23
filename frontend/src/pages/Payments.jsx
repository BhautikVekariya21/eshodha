import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { useTitle } from '../hooks.jsx'
import { Icon, FormError } from '../components/UI.jsx'

const inr = (n) => '₹' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

const METHODS = [
  { id: 'upi', icon: 'phone', name: 'UPI', sub: 'GPay · PhonePe · any VPA' },
  { id: 'card', icon: 'card', name: 'Card', sub: 'Visa · Mastercard · RuPay' },
  { id: 'netbanking', icon: 'bank', name: 'NetBanking', sub: '58 banks supported' },
  { id: 'bank_transfer', icon: 'doc', name: 'NEFT / RTGS', sub: 'Bank transfer + UTR' },
]
const BANKS = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda']
const fmtCard = (v) => v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')
const fmtExp = (v) => { const d = v.replace(/\D/g, '').slice(0, 4); return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d }

function StatusPill({ status }) {
  const labels = { success: '✓ Success', pending: 'Pending', pending_verification: 'Verifying', failed: '✕ Failed', open: 'Open', in_progress: 'In Progress', resolved: 'Resolved' }
  return <span className={`status-pill ${status}`}>{labels[status] || status}</span>
}

function Steps({ step }) {
  const names = ['Invoice Details', 'Method', 'Pay', 'Receipt']
  return (
    <div className="pay-steps">
      {names.map((n, i) => (
        <div key={n} className={`pay-step${step === i + 1 ? ' active' : ''}${step > i + 1 ? ' done' : ''}`}>
          {step > i + 1 ? '✓ ' : `${i + 1}. `}{n}
        </div>
      ))}
    </div>
  )
}

export default function Payments() {
  useTitle('Online Payments — Pay Your PI Securely | eShodha Industries')
  const [step, setStep] = React.useState(1)
  const [init, setInit] = React.useState(null)   // initiate response {ref, amount:{total,base,gst}, method}
  const [method, setMethod] = React.useState('upi')
  const [busy, setBusy] = React.useState(false)
  const [err, setErr] = React.useState(null)
  const [done, setDone] = React.useState(null)   // confirm response
  // history
  const [hEmail, setHEmail] = React.useState('')
  const [hist, setHist] = React.useState(null)
  const [hBusy, setHBusy] = React.useState(false)
  const [hErr, setHErr] = React.useState(null)

  const startPayment = async (e) => {
    e.preventDefault()
    const f = e.target
    setErr(null)
    if (Number(f.amount.value) < 1000) { setErr('Minimum online payment is ₹1,000 — use NEFT for smaller amounts.'); return }
    setBusy(true)
    try {
      const res = await api.initPayment({
        pi_number: f.pi_number.value.trim(),
        customer_name: f.customer_name.value.trim(),
        email: f.email.value.trim(),
        phone: f.phone.value.trim(),
        amount: Number(f.amount.value),
        method,
      })
      setInit(res)
      setStep(2)
    } catch (error) { setErr(error.message) } finally { setBusy(false) }
  }

  const payNow = async (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    setErr(null)
    setBusy(true)
    try {
      const res = await api.confirmPayment(init.ref, {
        card_number: f.get('card_number') || '', card_name: f.get('card_name') || '',
        card_expiry: f.get('card_expiry') || '', card_cvv: f.get('card_cvv') || '',
        upi_vpa: f.get('upi_vpa') || '', bank: f.get('bank') || '', utr: f.get('utr') || '',
      })
      setDone(res)
      setStep(4)
    } catch (error) { setErr(error.message) } finally { setBusy(false) }
  }

  const lookupHistory = async (e) => {
    e.preventDefault()
    setHErr(null); setHist(null); setHBusy(true)
    try { setHist(await api.paymentHistory(hEmail.trim())) }
    catch (error) { setHErr(error.message) } finally { setHBusy(false) }
  }

  const reset = () => { setStep(1); setInit(null); setDone(null); setErr(null) }

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: "url('/img/gi-coil.jpg')" }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> Payments</div>
          <h1>Pay Your Invoice Online</h1>
          <p>Settle proforma invoices in minutes — UPI, cards, net-banking or NEFT, with an instant digital receipt against your PI.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="pay-wizard">
            <Steps step={step} />

            {step === 1 && (
              <div className="form-card reveal in">
                <div className="demo-note">🔒 Demo gateway — no real money moves. Success card: <b>4111 1111 1111 1111</b> · Decline card: <b>4000 0000 0000 0002</b></div>
                <h3 style={{ fontSize: 22, marginBottom: 18 }}>Step 1 — Invoice details</h3>
                <form onSubmit={startPayment} noValidate>
                  <div className="form-grid">
                    <div className="field"><label>PI / Invoice Number <i>*</i></label><input name="pi_number" required placeholder="PI-2026-0142" /></div>
                    <div className="field"><label>Amount payable (₹, incl. GST) <i>*</i></label><input name="amount" type="number" min="1000" step="0.01" required placeholder="e.g. 850000" /></div>
                    <div className="field"><label>Company / Your Name <i>*</i></label><input name="customer_name" required placeholder="Acme Auto Components" /></div>
                    <div className="field"><label>Email <i>*</i></label><input name="email" type="email" required placeholder="accounts@acme.in" /></div>
                    <div className="field"><label>Phone <i>*</i></label><input name="phone" required placeholder="+91" /></div>
                    <div className="field"><label>Preferred method</label>
                      <select value={method} onChange={(e) => setMethod(e.target.value)}>
                        {METHODS.map((m) => <option key={m.id} value={m.id}>{m.name} — {m.sub}</option>)}
                      </select>
                    </div>
                    <div className="field full"><button className="btn btn-primary btn-lg" disabled={busy} type="submit">{busy ? 'Creating session…' : 'Continue to Payment →'}</button></div>
                  </div>
                  <FormError msg={err} />
                  <p className="form-note" style={{ marginTop: 12 }}>Minimum online payment ₹1,000. Amount is treated as inclusive of 18% GST — breakup shown before you pay.</p>
                </form>
              </div>
            )}

            {step === 2 && init && (
              <div className="form-card reveal in">
                <h3 style={{ fontSize: 22, marginBottom: 6 }}>Step 2 — Choose payment method</h3>
                <p style={{ color: 'var(--muted)', marginBottom: 20 }}>Session <b>{init.ref}</b> · PI <b>{init.ref && init.pi_number}</b> · Amount <b>{inr(init.amount.total)}</b></p>
                <div className="pay-methods">
                  {METHODS.map((m) => (
                    <button key={m.id} type="button" className={`pay-method${method === m.id ? ' active' : ''}`}
                      onClick={() => { setMethod(m.id); setStep(3) }}>
                      <span className="icon" style={{ width: 42, height: 42, borderRadius: 12, background: '#fff1e7', color: 'var(--orange-d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name={m.icon} size={21} />
                      </span>
                      <b>{m.name}</b><span>{m.sub}</span>
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                  <button className="btn btn-outline btn-sm" onClick={() => setStep(1)}>← Back</button>
                </div>
              </div>
            )}

            {step === 3 && init && (
              <div className="form-card reveal in">
                <h3 style={{ fontSize: 22, marginBottom: 6 }}>Step 3 — {METHODS.find((m) => m.id === method).name}</h3>
                <div className="amount-box">
                  <div><span>Payable for PI {init.pi_number}</span><div className="amount-big">{inr(init.amount.total)}</div></div>
                  <div className="gst-note">Base {inr(init.amount.base)} + IGST 18% {inr(init.amount.gst)}</div>
                </div>
                <form onSubmit={payNow} noValidate key={method}>
                  {method === 'upi' && (
                    <div className="field" style={{ marginTop: 14 }}>
                      <label>Your UPI ID <i>*</i></label>
                      <input name="upi_vpa" required placeholder="yourname@okhdfcbank" />
                    </div>
                  )}
                  {method === 'card' && (
                    <div className="form-grid" style={{ marginTop: 14 }}>
                      <div className="field full"><label>Card number <i>*</i></label><input className="input-mono" name="card_number" required placeholder="4111 1111 1111 1111" onChange={(e) => e.target.value = fmtCard(e.target.value)} /></div>
                      <div className="field full"><label>Name on card <i>*</i></label><input name="card_name" required placeholder="PRIYA SHARMA" /></div>
                      <div className="field"><label>Expiry (MM/YY) <i>*</i></label><input className="input-mono" name="card_expiry" required placeholder="09/28" onChange={(e) => e.target.value = fmtExp(e.target.value)} /></div>
                      <div className="field"><label>CVV <i>*</i></label><input className="input-mono" name="card_cvv" type="password" required placeholder="•••" /></div>
                    </div>
                  )}
                  {method === 'netbanking' && (
                    <div className="field" style={{ marginTop: 14 }}>
                      <label>Select your bank <i>*</i></label>
                      <select name="bank" required defaultValue="">
                        <option value="" disabled>Select bank…</option>
                        {BANKS.map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  )}
                  {method === 'bank_transfer' && (
                    <>
                      <div className="bank-details">
                        <div><b>Account name</b><span>eShodha Industries Pvt. Ltd.</span></div>
                        <div><b>Account no.</b><span className="input-mono">50200091234366</span></div>
                        <div><b>IFSC</b><span className="input-mono">HDFC0000123</span></div>
                        <div><b>Branch</b><span>Whitefield, Bengaluru</span></div>
                      </div>
                      <div className="field" style={{ marginTop: 14 }}>
                        <label>UTR / Transaction reference (after transfer) <i>*</i></label>
                        <input className="input-mono" name="utr" required placeholder="12-digit UTR number" />
                      </div>
                    </>
                  )}
                  <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" disabled={busy} type="submit">
                      {busy ? 'Processing…' : method === 'bank_transfer' ? 'Submit UTR for Verification' : `Pay ${inr(init.amount.total)}`}
                    </button>
                    <button className="btn btn-outline btn-lg" type="button" onClick={() => setStep(2)}>← Change method</button>
                  </div>
                  <FormError msg={err} />
                  {err && <button className="btn btn-dark btn-sm" style={{ marginTop: 10 }} onClick={(e) => { e.preventDefault(); setErr(null) }}>Try again</button>}
                </form>
              </div>
            )}

            {step === 4 && done && (
              <div className="form-card reveal in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <h3 style={{ fontSize: 22 }}>Payment Receipt</h3>
                  <StatusPill status={done.status} />
                </div>
                <div className="receipt" style={{ marginTop: 18 }}>
                  <div className="receipt-grid">
                    <div className="rg"><b>Payment Reference</b><span className="input-mono">{done.ref}</span></div>
                    <div className="rg"><b>Transaction ID</b><span className="input-mono">{done.txn_id || '— (on verification)'}</span></div>
                    <div className="rg"><b>PI Number</b><span>{done.pi_number}</span></div>
                    <div className="rg"><b>Method</b><span style={{ textTransform: 'capitalize' }}>{done.method.replace('_', ' ')}</span></div>
                    <div className="rg"><b>Amount</b><span>{inr(done.amount)}</span></div>
                    <div className="rg"><b>Date &amp; Time (IST)</b><span>{new Date().toLocaleString('en-IN')}</span></div>
                  </div>
                  <p style={{ fontSize: 14.5, color: 'var(--muted)', fontWeight: 600 }}>{done.message}</p>
                  {done.status === 'pending_verification' && (
                    <p style={{ fontSize: 13.5, color: 'var(--muted)' }}>This receipt is provisional. The stamped e-receipt follows by email once our treasury verifies the credit.</p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
                  <button className="btn btn-dark" onClick={() => window.print()}>Print / Save PDF</button>
                  <button className="btn btn-outline" onClick={reset}>Make Another Payment</button>
                  <Link className="btn btn-outline" to="/support">Need help? Raise a ticket</Link>
                </div>
              </div>
            )}
          </div>

          {/* PAYMENT HISTORY */}
          <div style={{ maxWidth: 860, margin: '70px auto 0' }}>
            <div className="section-head reveal in" style={{ marginBottom: 24 }}>
              <span className="eyebrow">Payment History</span>
              <h2 style={{ fontSize: 26 }}>Track Your Past Payments</h2>
              <p>Enter the email used while paying — all PAY references, statuses and transaction IDs are fetched from our records.</p>
            </div>
            <form className="history-bar" onSubmit={lookupHistory}>
              <input type="email" value={hEmail} onChange={(e) => setHEmail(e.target.value)} required placeholder="accounts@yourcompany.com" aria-label="Email" />
              <button className="btn btn-dark" disabled={hBusy} type="submit">{hBusy ? 'Fetching…' : 'Fetch History'}</button>
            </form>
            <FormError msg={hErr} />
            {hist && (
              hist.payments.length === 0
                ? <p style={{ color: 'var(--muted)', marginTop: 16 }}>No payments found for this email yet.</p>
                : <div className="table-scroll" style={{ marginTop: 18 }}>
                    <table className="spec-table">
                      <thead><tr><th>Ref</th><th>PI Number</th><th>Amount</th><th>Method</th><th>Status</th><th>Date</th></tr></thead>
                      <tbody>
                        {hist.payments.map((p) => (
                          <tr key={p.ref}>
                            <td className="input-mono">{p.ref}</td>
                            <td>{p.pi_number}</td>
                            <td>{inr(p.amount)}</td>
                            <td style={{ textTransform: 'capitalize' }}>{p.method.replace('_', ' ')}</td>
                            <td><StatusPill status={p.status} /></td>
                            <td>{p.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

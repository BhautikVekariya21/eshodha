import React from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { Loading } from '../hooks'

const api = (path, opts = {}) =>
  fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}) },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  }).then(r => r.json())

/* ------------------------------------------------ session helpers (module scope) */
const loadSession = () => {
  try {
    const raw = localStorage.getItem('eshodha-session')
    if (!raw) return null
    const s = JSON.parse(raw)
    return s.token && s.user ? s : null
  } catch { return null }
}
export const saveSession = s => {
  if (s) localStorage.setItem('eshodha-session', JSON.stringify(s))
  else localStorage.removeItem('eshodha-session')
}

/* ------------------------------------------------ sign-in / register */
function AuthCard({ onAuthed }) {
  const { t } = useLang()
  const [mode, setMode] = React.useState('signin') // signin | register
  const [form, setForm] = React.useState({ name: '', email: '', password: '', company: '' })
  const [err, setErr] = React.useState('')
  const [busy, setBusy] = React.useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setErr('')
    setBusy(true)
    try {
      const url = mode === 'signin' ? '/auth/login' : '/auth/register'
      const payload = mode === 'signin'
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password, company: form.company }
      const data = await api(url, { method: 'POST', body: payload })
      if (data.token) {
        saveSession(data)
        onAuthed(data)
      } else {
        setErr(data.detail || 'Something went wrong. Try again.')
      }
    } catch {
      setErr('Network error — please retry.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="auth-card reveal in">
      <div className="auth-tabs" role="tablist">
        <button role="tab" aria-selected={mode === 'signin'} className={mode === 'signin' ? 'active' : ''} onClick={() => { setMode('signin'); setErr('') }}>{t('auth.signin', 'Sign in')}</button>
        <button role="tab" aria-selected={mode === 'register'} className={mode === 'register' ? 'active' : ''} onClick={() => { setMode('register'); setErr('') }}>{t('auth.register', 'Register')}</button>
      </div>

      <form onSubmit={submit} className="auth-form">
        {mode === 'register' && (
          <>
            <label>Full name
              <input required minLength={2} value={form.name} onChange={set('name')} placeholder="Ravi Kumar" />
            </label>
            <label>Company <span className="opt">(optional)</span>
              <input value={form.company} onChange={set('company')} placeholder="Acme Fabrication Pvt Ltd" />
            </label>
          </>
        )}
        <label>Email
          <input required type="email" value={form.email} onChange={set('email')} placeholder="you@company.com" />
        </label>
        <label>Password
          <input required type="password" minLength={mode === 'register' ? 8 : 1} value={form.password} onChange={set('password')} placeholder={mode === 'register' ? 'Minimum 8 characters' : 'Your password'} />
        </label>

        {err && <div className="form-err" role="alert">{err}</div>}

        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'signin' ? t('auth.signin', 'Sign in') : t('auth.register', 'Create account')}
        </button>
        {mode === 'register' && <p className="fine">One account tracks your payments, service requests and support tickets in one place.</p>}
      </form>
    </div>
  )
}

/* ------------------------------------------------ account overview */
const money = n => `₹${Number(n).toLocaleString('en-IN')}`
const when = s => (s ? new Date(s.replace(' ', 'T') + 'Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—')

function Overview({ user, token, onLogout }) {
  const { t } = useLang()
  const [data, setData] = React.useState(null)
  const [err, setErr] = React.useState('')

  React.useEffect(() => {
    let on = true
    api(`/auth/overview`, { token }).then(d => { if (on) setData(d.token_invalid ? null : d) ; if (d.token_invalid) setErr('Session expired — sign in again.') }).catch(() => setErr('Could not load your account.'))
    return () => { on = false }
  }, [token])

  const doLogout = async () => {
    try { await api('/auth/logout', { method: 'POST', token }) } catch { /* ignore */ }
    saveSession(null)
    onLogout()
  }

  if (err && !data) return <div className="card pad"><p className="form-err">{err}</p><button className="btn btn-primary" onClick={doLogout}>{t('auth.signin', 'Sign in again')}</button></div>
  if (!data) return <Loading />

  const { payments = [], tickets = [], service_requests = [] } = data
  const openTickets = tickets.filter(x => x.status !== 'resolved').length
  const paid = payments.filter(p => p.status === 'paid').reduce((s, p) => s + Number(p.amount || 0), 0)

  return (
    <div>
      <div className="acct-head reveal in">
        <div>
          <span className="eyebrow">{t('nav.account', 'My account')}</span>
          <h1 className="display-xl">Namaste, {String(user.name).split(' ')[0]} 👋</h1>
          <p className="lead">{user.email}{user.company ? ` · ${user.company}` : ''}</p>
        </div>
        <button className="btn btn-ghost" onClick={doLogout}>⟵ {t('auth.logout', 'Sign out')}</button>
      </div>

      <div className="kpi-grid stagger in">
        <div className="kpi-tile"><span className="kpi-num">₹{(paid / 1e5).toFixed(1)}L</span><span className="kpi-label">Paid to date</span></div>
        <div className="kpi-tile"><span className="kpi-num">{payments.length}</span><span className="kpi-label">Invoices / challans</span></div>
        <div className="kpi-tile"><span className="kpi-num">{service_requests.length}</span><span className="kpi-label">Service orders</span></div>
        <div className="kpi-tile"><span className="kpi-num">{openTickets}</span><span className="kpi-label">Open tickets</span></div>
      </div>

      <h2 className="sec-title" style={{ marginTop: '2rem' }}>Invoices &amp; payments</h2>
      <div className="tbl-wrap reveal in"><table className="tbl">
        <thead><tr><th>Ref</th><th>Description</th><th>Amount</th><th>Status</th><th>Date</th><th></th></tr></thead>
        <tbody>
          {payments.length === 0 && <tr><td colSpan={6} className="empty">No payments yet — <Link to="/payments">pay a proforma invoice</Link>.</td></tr>}
          {payments.map(p => (
            <tr key={p.ref}>
              <td><code>{p.ref}</code></td>
              <td>{p.description || 'Steel coils'}</td>
              <td>{money(p.amount)}</td>
              <td><span className={`badge st-${p.status}`}>{p.status}</span></td>
              <td>{when(p.created_at)}</td>
              <td>{p.status === 'pending' && <Link className="btn btn-sm btn-outline" to={`/payments?ref=${p.ref}`}>Pay now</Link>}</td>
            </tr>
          ))}
        </tbody>
      </table></div>

      <h2 className="sec-title">Service orders</h2>
      <div className="tbl-wrap reveal in"><table className="tbl">
        <thead><tr><th>Ref</th><th>Service</th><th>Summary</th><th>Status</th><th>Quote</th><th>Date</th></tr></thead>
        <tbody>
          {service_requests.length === 0 && <tr><td colSpan={6} className="empty">No service orders — <Link to="/services">explore our services</Link>.</td></tr>}
          {service_requests.map(s => (
            <tr key={s.ref}>
              <td><code>{s.ref}</code></td>
              <td>{String(s.service_type || '').replaceAll('_', ' ')}</td>
              <td>{s.details || s.material || '—'}</td>
              <td><span className={`badge st-${s.status}`}>{s.status}</span></td>
              <td>{s.quote ? money(s.quote) : '—'}</td>
              <td>{when(s.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table></div>

      <h2 className="sec-title">Support tickets</h2>
      <div className="tbl-wrap reveal in"><table className="tbl">
        <thead><tr><th>Ref</th><th>Subject</th><th>Priority</th><th>Status</th><th>Updated</th><th></th></tr></thead>
        <tbody>
          {tickets.length === 0 && <tr><td colSpan={6} className="empty">No tickets — <Link to="/support">raise one</Link> and track it here.</td></tr>}
          {tickets.map(tk => (
            <tr key={tk.ref}>
              <td><code>{tk.ref}</code></td>
              <td>{tk.subject}</td>
              <td><span className={`badge pr-${tk.priority}`}>{tk.priority}</span></td>
              <td><span className={`badge st-${tk.status}`}>{tk.status}</span></td>
              <td>{when(tk.updated_at || tk.created_at)}</td>
              <td><Link className="btn btn-sm btn-outline" to={`/support?ref=${tk.ref}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div>
  )
}


/* ------------------------------------------------ route component */
export default function Account() {
  const { t } = useLang()
  const [session, setSession] = React.useState(loadSession)
  const refresh = () => setSession(loadSession())

  React.useEffect(() => {
    const h = () => refresh()
    window.addEventListener('eshodha:auth', h)
    window.addEventListener('focus', h)
    return () => { window.removeEventListener('eshodha:auth', h); window.removeEventListener('focus', h) }
  }, [])

  return (
    <div className="page-fade" style={{ paddingTop: '5.5rem' }}>
      <div className="wrap">
        {!session || !session.token
          ? (
            <div className="auth-layout">
              <div className="auth-pitch reveal in">
                <span className="eyebrow">{t('nav.signin', 'Customer portal')}</span>
                <h1 className="display-xl">One login.<br />Every gram of steel you order.</h1>
                <p className="lead">Track invoices, service orders and support tickets — all in one place.</p>
                <ul className="check-list">
                  <li>Live invoice &amp; payment status</li>
                  <li>Service request tracking with quotes</li>
                  <li>Support ticket history &amp; replies</li>
                  <li>Faster RFQs — details pre-filled</li>
                </ul>
              </div>
              <AuthCard onAuthed={refresh} />
            </div>
          )
          : <Overview user={session.user} token={session.token} onLogout={refresh} />}
      </div>
    </div>
  )
}

import React from 'react'
import { useLang } from '../i18n'
import { Loading } from '../hooks'

const api = (path, opts = {}) =>
  fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}) },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  }).then(r => r.json())

const TABLES = [
  ['rfqs', 'RFQs'],
  ['payments', 'Payments'],
  ['tickets', 'Support tickets'],
  ['service_requests', 'Service requests'],
  ['dealer_enquiries', 'Dealer enquiries'],
  ['tour_bookings', 'Plant tour bookings'],
  ['applications', 'Job applications'],
  ['newsletter', 'Newsletter'],
  ['customers', 'Customers'],
]

export default function Admin() {
  const { t } = useLang()
  const [token, setToken] = React.useState(() => { try { return sessionStorage.getItem('eshodha-admin') || '' } catch { return '' } })
  const [form, setForm] = React.useState({ username: '', password: '' })
  const [err, setErr] = React.useState('')
  const [busy, setBusy] = React.useState(false)
  const [summary, setSummary] = React.useState(null)
  const [table, setTable] = React.useState('rfqs')
  const [limit, setLimit] = React.useState(50)
  const [listing, setListing] = React.useState(null)
  const [q, setQ] = React.useState('')

  const authed = !!token

  const loadAll = React.useCallback(() => {
    if (!token) return
    api('/admin/summary', { token }).then(d => setSummary(d.unauthorized ? null : d)).catch(() => {})
  }, [token])

  React.useEffect(() => { loadAll() }, [loadAll])

  React.useEffect(() => {
    if (!token) return
    let on = true
    setListing(null)
    api(`/admin/list/${table}?limit=${limit}`, { token })
      .then(d => { if (on) setListing(d.unauthorized ? { columns: [], rows: [], error: 'unauthorized' } : d) })
      .catch(() => on && setListing({ columns: [], rows: [], error: 'network' }))
    return () => { on = false }
  }, [token, table, limit])

  const signIn = async e => {
    e.preventDefault()
    setErr(''); setBusy(true)
    try {
      const d = await api('/admin/login', { method: 'POST', body: form })
      if (d.token) { sessionStorage.setItem('eshodha-admin', d.token); setToken(d.token) }
      else setErr(d.detail || 'Sign-in failed.')
    } catch { setErr('Network error.') } finally { setBusy(false) }
  }

  const signOut = () => { sessionStorage.removeItem('eshodha-admin'); setToken(''); setSummary(null); setListing(null) }

  const updateTicket = async (ref, status) => {
    await api(`/admin/tickets/${ref}/status`, { method: 'POST', token, body: { status } })
    loadAll()
    setListing(l => l ? { ...l, rows: l.rows.map(r => r.ref === ref ? { ...r, status } : r) } : l)
  }

  /* ------------------------------------------------ sign-in screen */
  if (!authed) return (
    <div className="page-fade" style={{ paddingTop: '5.5rem' }}>
      <div className="wrap">
        <div className="auth-layout">
          <div className="auth-pitch reveal in">
            <span className="eyebrow">{t('nav.admin', 'Admin console')}</span>
            <h1 className="display-xl">Every submission.<br />One console.</h1>
            <p className="lead">RFQs, payments, tickets, service orders, dealer enquiries, tour bookings, job applications, newsletter sign-ups and customer accounts — with live counts and one-click status control.</p>
            <ul className="check-list">
              <li>Live totals incl. collected revenue &amp; urgent tickets</li>
              <li>Searchable table view per data source</li>
              <li>Resolve / escalate tickets inline</li>
            </ul>
          </div>
          <form className="auth-card reveal in" onSubmit={signIn}>
            <h2 className="sec-title" style={{ marginBottom: '.5rem' }}>Admin sign-in</h2>
            <label>Username
              <input required value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} placeholder="admin" autoComplete="username" />
            </label>
            <label>Password
              <input required type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" autoComplete="current-password" />
            </label>
            {err && <div className="form-err" role="alert">{err}</div>}
            <button className="btn btn-primary btn-block" disabled={busy}>{busy ? 'Verifying…' : 'Enter console'}</button>
            <p className="fine">Demo credentials: <code>admin</code> / <code>eshodha2026</code></p>
          </form>
        </div>
      </div>
    </div>
  )

  /* ------------------------------------------------ console */
  const counts = summary?.counts || {}
  const rows = (listing?.rows || []).filter(r => !q || JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="page-fade" style={{ paddingTop: '5.5rem' }}>
      <div className="wrap">
        <div className="acct-head reveal in">
          <div>
            <span className="eyebrow">{t('nav.admin', 'Admin console')}</span>
            <h1 className="display-xl">Operations dashboard</h1>
            <p className="lead">Live view of every customer-facing capture point.</p>
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button className="btn btn-ghost" onClick={loadAll}>↻ Refresh</button>
            <button className="btn btn-primary" onClick={signOut}>Sign out</button>
          </div>
        </div>

        <div className="kpi-grid stagger in">
          <div className="kpi-tile"><span className="kpi-num">{counts.rfqs ?? '–'}</span><span className="kpi-label">RFQs</span></div>
          <div className="kpi-tile"><span className="kpi-num">{counts.payments ?? '–'}</span><span className="kpi-label">Payments</span></div>
          <div className="kpi-tile"><span className="kpi-num">{counts.pending_payments ?? '–'}</span><span className="kpi-label">Pending payments</span></div>
          <div className="kpi-tile"><span className="kpi-num">{counts.open_tickets ?? '–'}</span><span className="kpi-label">Open tickets</span></div>
          <div className="kpi-tile warn"><span className="kpi-num">{counts.urgent_tickets ?? '–'}</span><span className="kpi-label">Urgent tickets</span></div>
          <div className="kpi-tile"><span className="kpi-num">₹{((summary?.collected ?? 0) / 1e7).toFixed(2)} Cr</span><span className="kpi-label">Collected</span></div>
          <div className="kpi-tile"><span className="kpi-num">{counts.service_requests ?? '–'}</span><span className="kpi-label">Service orders</span></div>
          <div className="kpi-tile"><span className="kpi-num">{counts.customers ?? '–'}</span><span className="kpi-label">Customers</span></div>
        </div>

        <div className="admin-tabs" role="tablist">
          {TABLES.map(([id, label]) => (
            <button key={id} role="tab" aria-selected={table === id} className={table === id ? 'active' : ''} onClick={() => setTable(id)}>
              {label} <span className="chip">{counts[id] ?? '–'}</span>
            </button>
          ))}
        </div>

        <div className="admin-bar">
          <input className="admin-search" placeholder="Filter rows…" value={q} onChange={e => setQ(e.target.value)} />
          <label className="fine">Rows
            <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
              {[25, 50, 100, 200].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
        </div>

        <div className="tbl-wrap reveal in">
          {!listing ? <Loading /> : listing.error ? <p className="form-err pad">Could not load rows ({listing.error}).</p> : (
            <table className="tbl admin-tbl">
              <thead><tr>{listing.columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
              <tbody>
                {rows.length === 0 && <tr><td colSpan={Math.max(listing.columns.length, 1)} className="empty">No rows.</td></tr>}
                {rows.map((r, i) => (
                  <tr key={r.ref || r.id || i}>
                    {listing.columns.map(c => {
                      const v = r[c]
                      if (table === 'tickets' && c === 'status') {
                        return (
                          <td key={c}>
                            <select className={`badge st-${v} st-sel`} value={v} onChange={e => updateTicket(r.ref, e.target.value)}>
                              {['open', 'in_progress', 'resolved'].map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </td>
                        )
                      }
                      if (c === 'priority') return <td key={c}><span className={`badge pr-${v}`}>{v}</span></td>
                      if (c === 'status') return <td key={c}><span className={`badge st-${v}`}>{v}</span></td>
                      if (c === 'amount' && v != null) return <td key={c}>₹{Number(v).toLocaleString('en-IN')}</td>
                      if (c === 'created_at' && v) return <td key={c}>{new Date(String(v).replace(' ', 'T') + 'Z').toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</td>
                      return <td key={c} title={v == null ? '' : String(v)}>{v == null ? '—' : String(v).length > 60 ? String(v).slice(0, 60) + '…' : String(v)}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}


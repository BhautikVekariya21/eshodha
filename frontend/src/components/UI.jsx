import React from 'react'
import { Link } from 'react-router-dom'

/* ---------------- inline SVG icons (name → path) ---------------- */
const PATHS = {
  mill: <><path d="M3 17h18M5 17V7h14v10M7 17v2m10-2v2" /><path d="M8 7V5h8v2" /></>,
  coil: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /></>,
  spark: <><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" /><circle cx="12" cy="12" r="3.5" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></>,
  doc: <><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" /></>,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  car: <><path d="M5 17h14l-1.5-5.5a2 2 0 0 0-1.9-1.5H8.4a2 2 0 0 0-1.9 1.5L5 17z" /><circle cx="7.5" cy="19.5" r="1.5" /><circle cx="16.5" cy="19.5" r="1.5" /><path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" /></>,
  building: <><path d="M3 21h18M5 21V8l7-5 7 5v13" /><path d="M9 21v-6h6v6" /></>,
  appliance: <><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M9 6h6M10 20h4" /></>,
  pipe: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /></>,
  box: <><path d="M21 8 12 3 3 8l9 5 9-5z" /><path d="M3 8v8l9 5 9-5V8" /><path d="M12 13v8" /></>,
  drop: <path d="M12 2s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z" />,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
  arrow: <path d="M5 12h14m-7-7 7 7-7 7" />,
  heart: <path d="M12 21s-7.5-4.6-9.5-9A5.5 5.5 0 0 1 12 6.2 5.5 5.5 0 0 1 21.5 12c-2 4.4-9.5 9-9.5 9z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  shield: <path d="M12 2 4 6v6c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V6l-8-4z" />,
  team: <><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></>,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z" />,
  mail: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  pin: <><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  download: <><path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16" /></>,
  play: <><circle cx="12" cy="12" r="9" /><path d="m10 8 6 4-6 4z" fill="currentColor" stroke="none" /></>,
  grad: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></>,
  case: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></>,
  flask: <path d="M9 3h6M10 3v5L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-11V3" />,
  slit: <><circle cx="12" cy="12" r="3" /><path d="M19 12h2M3 12h2m7-7V3m0 18v-2" /></>,
  pack: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a4 4 0 0 1 8 0v2" /></>,
  cal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /></>,
  chart: <><path d="M3 17l6-6 4 4 8-8" /><path d="M21 7v6h-6" /></>,
  info: <><path d="M12 8v5m0 3h.01" /><circle cx="12" cy="12" r="9" /></>,
  caret: <path d="m6 9 6 6 6-6" />,
  arrowR: <path d="M5 12h14m-6-6 6 6-6 6" />,
  up: <path d="M12 19V5m-7 7 7-7 7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  card: <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>,
  bank: <><path d="M3 21h18M4 18h16" /><path d="M6 18v-7M10 18v-7M14 18v-7M18 18v-7" /><path d="M12 3l9 5H3l9-5z" /></>,
  chat: <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.6 0-3.1-.4-4.4-1.2L3 20l1.2-5.1A8.5 8.5 0 1 1 21 11.5z" />,
  headset: <><path d="M4 13a8 8 0 0 1 16 0" /><rect x="3" y="13" width="4" height="6" rx="2" /><rect x="17" y="13" width="4" height="6" rx="2" /><path d="M20 17v1a3 3 0 0 1-3 3h-3" /></>,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  ticket: <><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-6z" /><path d="M13 5v2m0 4v2m0 4v2" /></>,
  truck: <><path d="M14 17V5a1 1 0 0 0-1-1H2v13h3" /><path d="M14 8h4l3 4v5h-3" /><circle cx="7.5" cy="17.5" r="2" /><circle cx="16.5" cy="17.5" r="2" /></>,
  wrench: <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18a2.1 2.1 0 0 0 3 3l5.7-5.7a4.5 4.5 0 0 0 6-6L14.5 12l-2.5-2.5 2.7-3.2z" />,
  linkedin: <path fill="currentColor" stroke="none" d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24V8.31zM8.34 8.31h4.33v2h.06c.6-1.14 2.08-2.34 4.28-2.34 4.57 0 5.42 3.01 5.42 6.92V23h-4.52v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.34V8.31z" />,
  x: <path fill="currentColor" stroke="none" d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4z" />,
  youtube: <path fill="currentColor" stroke="none" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />,
}

export function Icon({ name, size = 24, sw = 2, className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw}
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}
      width={size} height={size} aria-hidden="true">
      {PATHS[name] || PATHS.coil}
    </svg>
  )
}

/* ---------------- brand ---------------- */
export function BrandMark({ footer }) {
  return (
    <svg className="brand-mark" viewBox="0 0 48 48" fill="none">
      <rect width="48" height="48" rx="10" fill={footer ? '#f2611a' : '#0b1220'} />
      <circle cx="24" cy="24" r="13" stroke={footer ? '#0b1220' : '#f2611a'} strokeWidth="4" />
      <circle cx="24" cy="24" r="5" stroke={footer ? '#fff' : '#ffb547'} strokeWidth="3" />
      {!footer && <path d="M37 24h8" stroke="#f2611a" strokeWidth="4" strokeLinecap="round" />}
    </svg>
  )
}

/* ---------------- layout pieces ---------------- */
export function PageHero({ img, crumbs, title, sub }) {
  return (
    <section className="page-hero">
      <div className="ph-bg" style={{ backgroundImage: `url('${img}')` }} />
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link> <span className="sep">/</span>
          {crumbs.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="sep">/</span>}
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </React.Fragment>
          ))}
        </div>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, text, center }) {
  return (
    <div className={`section-head reveal${center ? ' center' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function TickList({ items }) {
  return (
    <ul className="tick-list">
      {items.map((t, i) => (
        <li key={i}>
          <span className="tk"><Icon name="check" size={12} sw={3} /></span>
          <div><b>{t.title}</b><span>{t.text}</span></div>
        </li>
      ))}
    </ul>
  )
}

export function SpecTable({ headers, rows }) {
  return (
    <div className="table-scroll">
      <table className="spec-table">
        <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function StatBand({ stats }) {
  return (
    <section className="stats-band section tight">
      <div className="wrap">
        <div className="grid g4" style={{ alignItems: 'center' }}>
          {stats.map((s, i) => (
            <div className={`stat reveal${i ? ` d${i}` : ''}`} key={i}>
              <div className="num">
                <Counter value={s.num} decimals={s.decimals ?? 0} prefix={s.prefix || ''} />
                {s.suffix && <i>{s.suffix}</i>}
              </div>
              <div className="lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaBand({ title, text, primary, secondary }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="actions">
          {primary}
          {secondary}
        </div>
      </div>
    </section>
  )
}

/* ---------------- testimonials slider ---------------- */
export function Testimonials({ items }) {
  const [idx, setIdx] = React.useState(0)
  React.useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [items.length])
  return (
    <div className="tst-slider reveal" data-slider>
      <div className="tst-track">
        <div className="tst-row" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {items.map((t, i) => (
            <div className="tst-slide" key={i}>
              <span className="quote-mark">"</span>
              <p>{t.quote}</p>
              <div className="tst-who">
                <span className="avatar">{t.initials}</span>
                <div><b>{t.name}</b><span>{t.role}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tst-ctrl">
        {items.map((_, i) => (
          <button key={i} aria-label={`Slide ${i + 1}`}
            className={`tst-dot${i === idx ? ' active' : ''}`}
            onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  )
}

/* ---------------- accordion ---------------- */
export function Accordion({ items }) {
  const [open, setOpen] = React.useState(-1)
  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div className={`acc-item${open === i ? ' open' : ''}`} key={i}>
          <button className="acc-head" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.q}
            <span className="plus"><Icon name="plus" size={13} sw={3} /></span>
          </button>
          <div className="acc-body" style={{ maxHeight: open === i ? '400px' : 0 }}>
            <p>{it.a}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- animated bar chart ---------------- */
export function BarChart({ bars }) {
  const ref = React.useRef(null)
  const [on, setOn] = React.useState(false)
  React.useEffect(() => {
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) { setOn(true); io.disconnect() }
    }, { threshold: 0.4 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div className="bar-chart" ref={ref} style={{ maxWidth: 860 }}>
      {bars.map((b, i) => (
        <div className={`bar-row${b.alt ? ' alt' : ''}`} key={i}>
          <div className="bar-top"><span>{b.label}</span><span>{b.display}</span></div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: on ? `${b.val}%` : 0 }} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------------- forms ---------------- */
export function FormSuccess({ msg }) {
  if (!msg) return null
  return <div className="form-success show">✓ {msg}</div>
}

export function FormError({ msg }) {
  if (!msg) return null
  return <div className="form-error">⚠ {msg}</div>
}

import React from 'react'

/* Animated count-up number when scrolled into view */
export function Counter({ value, decimals = 0, prefix = '', suffix = '', className }) {
  const ref = React.useRef(null)
  const [display, setDisplay] = React.useState('0')
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const dur = 1600
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setDisplay((value * eased).toFixed(decimals))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value, decimals])
  return <span ref={ref} className={className}>{prefix}{display}{suffix}</span>
}

/* Sets document title per page */
export function useTitle(title) {
  React.useEffect(() => {
    document.title = title
  }, [title])
}

/* Global scroll-reveal: attaches an IntersectionObserver to every .reveal
   element, including nodes added later (async page data). */
export function useGlobalReveal() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12 })
    const register = (root) => {
      if (root.querySelectorAll) {
        root.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
      } else if (root.classList?.contains('reveal') && !root.classList.contains('in')) {
        io.observe(root)
      }
    }
    register(document.body)
    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) register(n) }))
    })
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}

/* Shared page fetch wrapper */
export function usePageData(loader) {
  const [state, setState] = React.useState({ data: null, loading: true, error: null })
  React.useEffect(() => {
    let live = true
    setState({ data: null, loading: true, error: null })
    loader()
      .then((data) => live && setState({ data, loading: false, error: null }))
      .catch((err) => live && setState({ data: null, loading: false, error: err.message }))
    window.scrollTo(0, 0)
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return state
}

export function Loading() {
  return (
    <section className="section"><div className="wrap">
      <div className="skeleton-head">
        <div className="skel" style={{ width: 150, height: 13 }} />
        <div className="skel" style={{ width: '56%', height: 38 }} />
        <div className="skel" style={{ width: '72%', height: 15 }} />
      </div>
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, i) => <div className="skel" key={i} style={{ height: 190 }} />)}
      </div>
    </div></section>
  )
}

export function ErrorBox({ message }) {
  return (
    <section className="section"><div className="wrap">
      <div className="api-error">⚠ Could not reach the eShodha API — {message}. Is the Python backend running?</div>
    </div></section>
  )
}

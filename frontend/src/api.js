// Tiny API client — every page pulls its content from the Python backend.
async function get(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json()
}

async function post(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const detail = data?.detail
    const msg = Array.isArray(detail) ? detail[0]?.msg : detail
    throw new Error(msg || `Request failed (${res.status})`)
  }
  return data
}

export const api = {
  home: () => get('/api/home'),
  about: () => get('/api/about'),
  products: () => get('/api/products'),
  process: () => get('/api/process'),
  infrastructure: () => get('/api/infrastructure'),
  quality: () => get('/api/quality'),
  industries: () => get('/api/industries'),
  sustainability: () => get('/api/sustainability'),
  careers: () => get('/api/careers'),
  investors: () => get('/api/investors'),
  news: () => get('/api/news'),
  contact: () => get('/api/contact'),
  submitRFQ: (d) => post('/api/rfq', d),
  submitDealer: (d) => post('/api/dealer-enquiry', d),
  submitTour: (d) => post('/api/tour-booking', d),
  submitNewsletter: (email) => post('/api/newsletter', { email }),
  submitApplication: (d) => post('/api/applications', d),
}

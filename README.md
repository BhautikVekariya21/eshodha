# eShodha Industries — Corporate Website

Full-stack website for **eShodha Industries**, a fictional integrated steel manufacturer producing every grade of steel coil end-to-end (iron ore → sinter → blast furnace → BOF → casting → hot/cold rolling → coating → testing → dispatch).

**Stack:** React 18 + JavaScript (Vite) frontend · **Python FastAPI** backend · SQLite for form submissions. 100% sans-serif typography (Inter + Barlow Condensed).

## Architecture

```
frontend/               React SPA (Vite)
├── src/pages/          12 route components (one per page)
├── src/components/     Layout (nav/footer) + shared UI kit
├── src/api.js          API client — all content comes from the backend
├── public/img/         Photography
└── vite.config.js      builds into backend/static, dev-proxies /api → :8000

backend/
├── main.py             FastAPI app — JSON API + SPA/static serving
├── data.py             All site content (products, 16 process stages, jobs…)
├── db.py               SQLite persistence for submissions
└── static/             BUILT React app (committed so Python alone can run the site)
```

## Run

```bash
# 1) Backend (serves API + built frontend on one origin)
pip install -r backend/requirements.txt
cd backend && python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
# open http://localhost:8000

# 2) Frontend development mode (hot reload)
cd frontend && npm install && npm run dev     # http://localhost:5173, /api proxied to :8000

# Rebuild the production frontend into backend/static
cd frontend && npm run build
```

## API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/home` `/api/about` `/api/products` `/api/process` `/api/infrastructure` `/api/quality` `/api/industries` `/api/sustainability` `/api/careers` `/api/investors` `/api/news` `/api/contact` `/api/services` | Page content |
| POST | `/api/rfq` | Request for quotation → stored, returns ref `RFQ-…` |
| POST | `/api/dealer-enquiry` | Channel partner enquiry → `DEAL-…` |
| POST | `/api/tour-booking` | Plant tour booking → `TOUR-…` |
| POST | `/api/newsletter` | Subscribe (deduplicated) |
| POST | `/api/applications` | Job application → `APP-…` |
| POST | `/api/payments/initiate` → `/api/payments/{ref}/confirm` | Demo payment gateway (UPI/card/net-banking/NEFT) → `PAY-…` |
| GET | `/api/payments/{ref}` · `/api/payments/history?email=` | Payment status & history |
| POST | `/api/tickets` → `TCK-…` · GET `/api/tickets/{ref}` · POST `/api/tickets/{ref}/reply` | Support ticket system |
| POST | `/api/chat` · GET `/api/chat/{session_id}` | Shodha Assist rule-based chat |
| POST | `/api/services/quote` | Processing price engine (slitting/CTL/blanking/levelling) |
| POST | `/api/services/request` → `SRV-…` · GET `/api/services/request/{ref}` | Service bookings (lab / VMI / consulting / training) with tracking |
| POST | `/api/auth/register` `/api/auth/login` `/api/auth/logout` | Customer portal accounts (PBKDF2-hashed passwords, bearer sessions) |
| GET | `/api/auth/me` · `/api/auth/overview` | Signed-in customer's profile + own payments / tickets / service orders |
| POST | `/api/admin/login` | Staff sign-in (default `admin` / `eshodha2026`, override with `ESHODHA_ADMIN_USER` / `ESHODHA_ADMIN_PASSWORD`) |
| GET | `/api/admin/summary` · `/api/admin/list/{table}?limit=` | Admin console: live totals + row-level view of rfqs, payments, tickets, service_requests, dealer_enquiries, tour_bookings, applications, newsletter, customers |
| POST | `/api/admin/tickets/{ref}/status` | Set ticket `open` / `in_progress` / `resolved` |

All POST bodies are validated with Pydantic (invalid input → HTTP 422). Submissions are stored in `backend/eshodha.db` (gitignored).

**Multi-language:** the UI ships in English + हिंदी — toggle with the `EN/हिं` button in the navbar (choice persists in `localStorage`). Hindi covers navigation, topbar, hero, section headers and footer; API-driven content stays in English. Passwords are stored as salted PBKDF2-SHA256 (200k iterations); sessions are random bearer tokens with 7-day expiry.

## Pages & scenarios

| Route | Scenario |
|---|---|
| `/` | Hero, portfolio, mini process flow, quality, testimonials, news |
| `/about` | Story, vision/mission/values, milestones, leadership |
| `/products` | HR, CR, GI/GL, PPGI/PPGL, stainless, CRGO/CRNGO, AHSS — tabbed catalogue, deep links (`#hr`…), spec tables |
| `/process` | **Interactive 16-stage end-to-end manufacturing walkthrough** (auto-advancing stepper), byproducts, logistics |
| `/infrastructure` | Plant units, capacities, locations |
| `/quality` | Test matrix, accreditations, traceability |
| `/industries` | 8 sectors with grade recommendations |
| `/sustainability` | ESG KPIs, animated net-zero roadmap |
| `/careers` | Perks, filterable job board with live application form |
| `/investors` | Financials, reports, governance, announcements |
| `/news` | Press releases, media contact |
| `/contact` | RFQ, dealer enquiry, tour booking (all persisted server-side), map, FAQs |
| `/account` | **Customer portal** — register / sign in; account overview of own invoices, service orders & tickets |
| `/admin` | **Admin console** (staff sign-in) — live KPIs, per-source tables with search, inline ticket status control |

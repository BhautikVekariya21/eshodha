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
| GET | `/api/home` `/api/about` `/api/products` `/api/process` `/api/infrastructure` `/api/quality` `/api/industries` `/api/sustainability` `/api/careers` `/api/investors` `/api/news` `/api/contact` | Page content |
| POST | `/api/rfq` | Request for quotation → stored, returns ref `RFQ-…` |
| POST | `/api/dealer-enquiry` | Channel partner enquiry → `DEAL-…` |
| POST | `/api/tour-booking` | Plant tour booking → `TOUR-…` |
| POST | `/api/newsletter` | Subscribe (deduplicated) |
| POST | `/api/applications` | Job application → `APP-…` |

All POST bodies are validated with Pydantic (invalid input → HTTP 422). Submissions are stored in `backend/eshodha.db` (gitignored).

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

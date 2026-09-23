"""eShodha Industries — FastAPI backend.

Serves the JSON API that drives the React frontend and, in production,
serves the built React app (backend/static) as a single-origin site.
Run:  python3 -m uvicorn main:app --host 0.0.0.0 --port 8000  (from ./backend)
"""
from pathlib import Path

import db
from data import COMPANY, build_payload
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="eShodha Industries API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL_RE = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"


# ---------------------------------------------------------------- health
@app.get("/api/health")
def health():
    return {"status": "ok", "service": "eshodha-api", "company": COMPANY["name"]}


# ---------------------------------------------------------------- content
@app.get("/api/home")
def api_home():
    return build_payload("home")


@app.get("/api/about")
def api_about():
    return build_payload("about")


@app.get("/api/products")
def api_products():
    return build_payload("products")


@app.get("/api/process")
def api_process():
    return build_payload("process")


@app.get("/api/infrastructure")
def api_infrastructure():
    return build_payload("infrastructure")


@app.get("/api/quality")
def api_quality():
    return build_payload("quality")


@app.get("/api/industries")
def api_industries():
    return build_payload("industries")


@app.get("/api/sustainability")
def api_sustainability():
    return build_payload("sustainability")


@app.get("/api/careers")
def api_careers():
    return build_payload("careers")


@app.get("/api/investors")
def api_investors():
    return build_payload("investors")


@app.get("/api/news")
def api_news():
    return build_payload("news")


@app.get("/api/contact")
def api_contact():
    return build_payload("contact")


# ---------------------------------------------------------------- submissions
class RFQ(BaseModel):
    name: str = Field(min_length=2)
    company: str = Field(min_length=2)
    email: str = Field(pattern=EMAIL_RE)
    phone: str = Field(min_length=7)
    product: str = Field(min_length=2)
    quantity: str = Field(min_length=1)
    spec: str = ""
    delivery: str = Field(min_length=2)


class DealerEnquiry(BaseModel):
    firm: str = Field(min_length=2)
    owner: str = Field(min_length=2)
    email: str = Field(pattern=EMAIL_RE)
    phone: str = Field(min_length=7)
    territory: str = Field(min_length=2)
    lines: str = ""


class TourBooking(BaseModel):
    name: str = Field(min_length=2)
    email: str = Field(pattern=EMAIL_RE)
    phone: str = Field(min_length=7)
    org: str = ""
    preferred_date: str = Field(min_length=4)
    group_size: str = Field(min_length=1)
    purpose: str = ""


class Newsletter(BaseModel):
    email: str = Field(pattern=EMAIL_RE)


class Application(BaseModel):
    job: str = Field(min_length=2)
    name: str = Field(min_length=2)
    email: str = Field(pattern=EMAIL_RE)
    phone: str = Field(min_length=7)


@app.post("/api/rfq")
def post_rfq(r: RFQ):
    ref = db.insert_rfq(r.model_dump())
    return {"ok": True, "ref": ref,
            "message": f"RFQ received! Reference {ref} — our engineer will send your technical offer within 24 hours."}


@app.post("/api/dealer-enquiry")
def post_dealer(d: DealerEnquiry):
    ref = db.insert_dealer(d.model_dump())
    return {"ok": True, "ref": ref,
            "message": f"Enquiry received — reference {ref}. Our channel team will call within 2 working days."}


@app.post("/api/tour-booking")
def post_tour(t: TourBooking):
    ref = db.insert_tour(t.model_dump())
    return {"ok": True, "ref": ref,
            "message": f"Tour booked — reference {ref}. Confirmation email on its way within 48 hours."}


@app.post("/api/newsletter")
def post_newsletter(n: Newsletter):
    fresh = db.insert_newsletter(n.email)
    if fresh:
        return {"ok": True, "message": "Subscribed — welcome aboard!"}
    return {"ok": True, "message": "You're already subscribed — see you in the next issue."}


@app.post("/api/applications")
def post_application(a: Application):
    ref = db.insert_application(a.model_dump())
    return {"ok": True, "ref": ref,
            "message": f"Application {ref} submitted for “{a.job}”. Our HR team will reach out if shortlisted."}


# ---------------------------------------------------------------- SPA serving
@app.get("/{full_path:path}", include_in_schema=False)
def spa(full_path: str):
    """Serve built React assets; fall back to index.html for client-side routes."""
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not found")
    candidate = (STATIC_DIR / full_path).resolve() if full_path else STATIC_DIR / "index.html"
    if str(candidate).startswith(str(STATIC_DIR.resolve())) and candidate.is_file():
        return FileResponse(candidate)
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/", include_in_schema=False)
def root():
    return FileResponse(STATIC_DIR / "index.html")

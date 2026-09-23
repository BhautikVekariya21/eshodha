"""eShodha Industries — FastAPI backend.

Serves the JSON API that drives the React frontend and, in production,
serves the built React app (backend/static) as a single-origin site.
Run:  python3 -m uvicorn main:app --host 0.0.0.0 --port 8000  (from ./backend)
"""
import re
import random
import time
from pathlib import Path

import chatbot
import db
from data import COMPANY, build_payload
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="eShodha Industries API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite dev server
    allow_methods=["*"],
    allow_headers=["*"],
)

EMAIL_RE = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
UPI_RE = r"^[\w.\-]{2,}@[a-zA-Z]{2,}$"
MIN_ONLINE_PAYMENT = 1000  # ₹


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


# ================================================================ PAYMENTS
class PaymentInitiate(BaseModel):
    pi_number: str = Field(min_length=4, max_length=40)
    customer_name: str = Field(min_length=2)
    email: str = Field(pattern=EMAIL_RE)
    phone: str = Field(min_length=7)
    amount: float = Field(gt=0)
    method: str = Field(pattern="^(upi|card|netbanking|bank_transfer)$")


class PaymentConfirm(BaseModel):
    card_number: str = ""
    card_name: str = ""
    card_expiry: str = ""
    card_cvv: str = ""
    upi_vpa: str = ""
    bank: str = ""
    utr: str = ""


def _gst_breakup(amount: float) -> dict:
    base = round(amount / 1.18, 2)
    return {"total": round(amount, 2), "base": base, "gst": round(amount - base, 2), "rate": 18}


def _txn_id() -> str:
    return f"TXN{int(time.time())}{random.randint(1000, 9999)}"


@app.post("/api/payments/initiate")
def payment_initiate(p: PaymentInitiate):
    if p.amount < MIN_ONLINE_PAYMENT:
        raise HTTPException(status_code=400, detail=f"Minimum online payment is ₹{MIN_ONLINE_PAYMENT:,}. For smaller amounts, use NEFT to our account.")
    ref = db.create_payment(p.model_dump())
    return {"ok": True, "ref": ref, "method": p.method,
            "amount": _gst_breakup(p.amount),
            "message": f"Payment session {ref} created for PI {p.pi_number}."}


@app.post("/api/payments/{ref}/confirm")
def payment_confirm(ref: str, c: PaymentConfirm):
    pay = db.get_payment(ref)
    if not pay:
        raise HTTPException(status_code=404, detail="Payment reference not found.")
    if pay["status"] == "success":
        return {"ok": True, "ref": ref, "status": "success", "txn_id": pay["txn_id"],
                "amount": pay["amount"], "method": pay["method"], "pi_number": pay["pi_number"],
                "message": "This payment was already completed."}
    if pay["status"] == "failed":
        db.complete_payment(ref, "pending", None, None)  # allow retry

    method = pay["method"]
    if method == "card":
        digits = re.sub(r"\D", "", c.card_number)
        if not (15 <= len(digits) <= 16):
            raise HTTPException(status_code=400, detail="Invalid card number — enter a 15/16-digit card.")
        if not re.match(r"^(0[1-9]|1[0-2])/\d{2}$", c.card_expiry or ""):
            raise HTTPException(status_code=400, detail="Invalid expiry — use MM/YY format.")
        if not re.match(r"^\d{3,4}$", c.card_cvv or ""):
            raise HTTPException(status_code=400, detail="Invalid CVV.")
        detail = f"{'*' * 12}{digits[-4:]} · {c.card_name.strip()}"
        if digits in ("4000000000000002", "4000000000000995") or digits.endswith("0002"):
            db.complete_payment(ref, "failed", detail, None)
            raise HTTPException(status_code=402, detail="Card declined by the issuing bank (demo decline card). Try 4111 1111 1111 1111.")
        txn = _txn_id()
        db.complete_payment(ref, "success", detail, txn)
        return {"ok": True, "ref": ref, "status": "success", "txn_id": txn,
                "amount": pay["amount"], "method": "card", "pi_number": pay["pi_number"],
                "message": f"Payment of ₹{pay['amount']:,.2f} successful."}

    if method == "upi":
        vpa = (c.upi_vpa or "").strip()
        if not re.match(UPI_RE, vpa):
            raise HTTPException(status_code=400, detail="Invalid UPI ID — use the format name@bank.")
        txn = _txn_id()
        db.complete_payment(ref, "success", f"UPI · {vpa}", txn)
        return {"ok": True, "ref": ref, "status": "success", "txn_id": txn,
                "amount": pay["amount"], "method": "upi", "pi_number": pay["pi_number"],
                "message": f"UPI payment of ₹{pay['amount']:,.2f} successful."}

    if method == "netbanking":
        bank = (c.bank or "").strip()
        if len(bank) < 3:
            raise HTTPException(status_code=400, detail="Select your bank to continue.")
        txn = _txn_id()
        db.complete_payment(ref, "success", f"NetBanking · {bank}", txn)
        return {"ok": True, "ref": ref, "status": "success", "txn_id": txn,
                "amount": pay["amount"], "method": "netbanking", "pi_number": pay["pi_number"],
                "message": f"Net-banking payment of ₹{pay['amount']:,.2f} successful."}

    # bank_transfer
    utr = re.sub(r"\s", "", c.utr or "")
    if not re.match(r"^\d{12}$", utr):
        raise HTTPException(status_code=400, detail="Enter the 12-digit UTR / reference number from your bank transfer.")
    db.complete_payment(ref, "pending_verification", f"NEFT/RTGS · UTR {utr}", None)
    return {"ok": True, "ref": ref, "status": "pending_verification", "txn_id": None,
            "amount": pay["amount"], "method": "bank_transfer", "pi_number": pay["pi_number"],
            "message": "Transfer noted — our treasury verifies NEFT/RTGS credits within 2 working hours and emails the stamped receipt."}


@app.get("/api/payments/history")
def payment_history(email: str = Query(pattern=EMAIL_RE)):
    return {"payments": db.payments_by_email(email)}


@app.get("/api/payments/{ref}")
def payment_status(ref: str):
    pay = db.get_payment(ref)
    if not pay:
        raise HTTPException(status_code=404, detail="Payment reference not found.")
    return pay


# ================================================================ SUPPORT TICKETS
class TicketCreate(BaseModel):
    name: str = Field(min_length=2)
    email: str = Field(pattern=EMAIL_RE)
    phone: str = Field(min_length=7)
    category: str = Field(pattern="^(quality|delivery|order|documents|billing|other)$")
    priority: str = Field(pattern="^(low|medium|high|urgent)$")
    order_ref: str = ""
    subject: str = Field(min_length=4, max_length=140)
    message: str = Field(min_length=10)


class TicketReply(BaseModel):
    message: str = Field(min_length=2)


@app.post("/api/tickets")
def create_ticket(t: TicketCreate):
    ref = db.create_ticket(t.model_dump())
    return {"ok": True, "ref": ref,
            "message": f"Ticket {ref} created. Track it any time at /support with this reference."}


@app.get("/api/tickets/{ref}")
def get_ticket(ref: str):
    ticket = db.get_ticket(ref.upper())
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found — check the reference (format TCK-2026-0001).")
    return ticket


@app.post("/api/tickets/{ref}/reply")
def reply_ticket(ref: str, r: TicketReply):
    if not db.add_ticket_reply(ref.upper(), "customer", r.message):
        raise HTTPException(status_code=404, detail="Ticket not found — check the reference.")
    ticket = db.get_ticket(ref.upper())
    return {"ok": True, "message": "Reply added to your ticket.", "ticket": ticket}


# ================================================================ LIVE CHAT
class ChatIn(BaseModel):
    session_id: str = Field(min_length=4)
    message: str = Field(min_length=1, max_length=600)


@app.post("/api/chat")
def chat(c: ChatIn):
    reply, suggestions = chatbot.get_reply(c.message)
    db.chat_add(c.session_id, "user", c.message)
    db.chat_add(c.session_id, "bot", reply)
    return {"reply": reply, "suggestions": suggestions}


@app.get("/api/chat/{session_id}")
def chat_history(session_id: str):
    return db.chat_history(session_id)


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

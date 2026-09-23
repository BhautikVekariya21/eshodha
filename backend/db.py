"""SQLite persistence: content submissions, payments, support tickets, chat."""
import sqlite3
import threading
from datetime import datetime, timezone
from pathlib import Path

DB_PATH = Path(__file__).resolve().parent / "eshodha.db"
_lock = threading.Lock()

SCHEMA = """
CREATE TABLE IF NOT EXISTS rfqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, name TEXT, company TEXT, email TEXT, phone TEXT,
    product TEXT, quantity TEXT, spec TEXT, delivery TEXT,
    created_at TEXT
);
CREATE TABLE IF NOT EXISTS dealer_enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, firm TEXT, owner TEXT, email TEXT, phone TEXT,
    territory TEXT, lines TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS tour_bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, name TEXT, email TEXT, phone TEXT, org TEXT,
    preferred_date TEXT, group_size TEXT, purpose TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE, created_at TEXT
);
CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, job TEXT, name TEXT, email TEXT, phone TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, pi_number TEXT, customer_name TEXT, email TEXT, phone TEXT,
    amount REAL, currency TEXT DEFAULT 'INR', method TEXT,
    status TEXT DEFAULT 'pending', detail TEXT, txn_id TEXT,
    created_at TEXT, completed_at TEXT
);
CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, name TEXT, email TEXT, phone TEXT, category TEXT,
    priority TEXT, order_ref TEXT, subject TEXT, message TEXT,
    status TEXT DEFAULT 'open', created_at TEXT, updated_at TEXT
);
CREATE TABLE IF NOT EXISTS ticket_replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_ref TEXT, author TEXT, message TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT, sender TEXT, message TEXT, created_at TEXT
);
CREATE TABLE IF NOT EXISTS service_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ref TEXT UNIQUE, type TEXT, name TEXT, email TEXT, phone TEXT, org TEXT,
    details TEXT, preferred_date TEXT, status TEXT DEFAULT 'requested',
    created_at TEXT, updated_at TEXT
);
"""


def _connect():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init():
    with _lock, _connect() as conn:
        conn.executescript(SCHEMA)


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def _next_ref(prefix: str, table: str) -> str:
    with _lock, _connect() as conn:
        row = conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()
        n = (row[0] if row else 0) + 1
        return f"{prefix}-{datetime.now().year}-{n:04d}"


# ---------------------------------------------------------------- submissions
def insert_rfq(d: dict) -> str:
    ref = _next_ref("RFQ", "rfqs")
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO rfqs (ref, name, company, email, phone, product, quantity, spec, delivery, created_at) "
            "VALUES (?,?,?,?,?,?,?,?,?,?)",
            (ref, d["name"], d["company"], d["email"], d["phone"], d["product"],
             d["quantity"], d.get("spec", ""), d["delivery"], _now()))
    return ref


def insert_dealer(d: dict) -> str:
    ref = _next_ref("DEAL", "dealer_enquiries")
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO dealer_enquiries (ref, firm, owner, email, phone, territory, lines, created_at) "
            "VALUES (?,?,?,?,?,?,?,?)",
            (ref, d["firm"], d["owner"], d["email"], d["phone"], d["territory"],
             d.get("lines", ""), _now()))
    return ref


def insert_tour(d: dict) -> str:
    ref = _next_ref("TOUR", "tour_bookings")
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO tour_bookings (ref, name, email, phone, org, preferred_date, group_size, purpose, created_at) "
            "VALUES (?,?,?,?,?,?,?,?,?)",
            (ref, d["name"], d["email"], d["phone"], d.get("org", ""),
             d["preferred_date"], d["group_size"], d.get("purpose", ""), _now()))
    return ref


def insert_newsletter(email: str) -> bool:
    with _lock, _connect() as conn:
        try:
            conn.execute("INSERT INTO newsletter (email, created_at) VALUES (?,?)", (email, _now()))
            return True
        except sqlite3.IntegrityError:
            return False


def insert_application(d: dict) -> str:
    ref = _next_ref("APP", "applications")
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO applications (ref, job, name, email, phone, created_at) VALUES (?,?,?,?,?,?)",
            (ref, d["job"], d["name"], d["email"], d["phone"], _now()))
    return ref


# ---------------------------------------------------------------- payments
def create_payment(d: dict) -> str:
    ref = _next_ref("PAY", "payments")
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO payments (ref, pi_number, customer_name, email, phone, amount, method, status, created_at) "
            "VALUES (?,?,?,?,?,?,?, 'pending', ?)",
            (ref, d["pi_number"], d["customer_name"], d["email"], d["phone"],
             d["amount"], d["method"], _now()))
    return ref


def complete_payment(ref: str, status: str, detail: str, txn_id: str | None):
    with _lock, _connect() as conn:
        conn.execute(
            "UPDATE payments SET status=?, detail=?, txn_id=?, completed_at=? WHERE ref=?",
            (status, detail, txn_id, _now(), ref))


def get_payment(ref: str) -> dict | None:
    with _lock, _connect() as conn:
        conn.row_factory = sqlite3.Row
        row = conn.execute("SELECT * FROM payments WHERE ref=?", (ref,)).fetchone()
        return dict(row) if row else None


def payments_by_email(email: str) -> list[dict]:
    with _lock, _connect() as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute(
            "SELECT ref, pi_number, amount, currency, method, status, txn_id, created_at "
            "FROM payments WHERE email=? ORDER BY id DESC LIMIT 25", (email,)).fetchall()
        return [dict(r) for r in rows]


# ---------------------------------------------------------------- support tickets
AUTO_REPLIES = {
    "urgent": ("Ticket escalated to the plant control room. An on-call engineer will call you within 2 hours.", "in_progress"),
    "high":   ("Routed to the Quality & Delivery desk — first response within 8 business hours.", "open"),
    "medium": ("Logged with the service desk — first response within 1 business day.", "open"),
    "low":    ("Logged with the documents desk — response within 2 business days.", "open"),
}


def create_ticket(d: dict) -> str:
    ref = _next_ref("TCK", "tickets")
    priority = d["priority"]
    auto_msg, status = AUTO_REPLIES.get(priority, AUTO_REPLIES["medium"])
    now = _now()
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO tickets (ref, name, email, phone, category, priority, order_ref, subject, message, status, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            (ref, d["name"], d["email"], d["phone"], d["category"], priority,
             d.get("order_ref", ""), d["subject"], d["message"], status, now, now))
        conn.execute(
            "INSERT INTO ticket_replies (ticket_ref, author, message, created_at) VALUES (?,?,?,?)",
            (ref, "support", auto_msg, now))
    return ref


def get_ticket(ref: str) -> dict | None:
    with _lock, _connect() as conn:
        conn.row_factory = sqlite3.Row
        row = conn.execute("SELECT * FROM tickets WHERE ref=?", (ref,)).fetchone()
        if not row:
            return None
        ticket = dict(row)
        replies = conn.execute(
            "SELECT author, message, created_at FROM ticket_replies WHERE ticket_ref=? ORDER BY id",
            (ref,)).fetchall()
        ticket["replies"] = [dict(r) for r in replies]
        return ticket


def add_ticket_reply(ref: str, author: str, message: str) -> bool:
    with _lock, _connect() as conn:
        row = conn.execute("SELECT id FROM tickets WHERE ref=?", (ref,)).fetchone()
        if not row:
            return False
        conn.execute(
            "INSERT INTO ticket_replies (ticket_ref, author, message, created_at) VALUES (?,?,?,?)",
            (ref, author, message, _now()))
        conn.execute("UPDATE tickets SET updated_at=? WHERE ref=?", (_now(), ref))
    return True


# ---------------------------------------------------------------- chat
def chat_add(session_id: str, sender: str, message: str):
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO chat_messages (session_id, sender, message, created_at) VALUES (?,?,?,?)",
            (session_id, sender, message, _now()))


def chat_history(session_id: str, limit: int = 40) -> list[dict]:
    with _lock, _connect() as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute(
            "SELECT sender, message, created_at FROM ("
            "  SELECT id, sender, message, created_at FROM chat_messages WHERE session_id=? ORDER BY id DESC LIMIT ?"
            ") ORDER BY id ASC", (session_id, limit)).fetchall()
        return [dict(r) for r in rows]


# ---------------------------------------------------------------- services
def insert_service_request(d: dict) -> str:
    ref = _next_ref("SRV", "service_requests")
    now = _now()
    with _lock, _connect() as conn:
        conn.execute(
            "INSERT INTO service_requests (ref, type, name, email, phone, org, details, preferred_date, status, created_at, updated_at) "
            "VALUES (?,?,?,?,?,?,?,?, 'requested', ?, ?)",
            (ref, d["type"], d["name"], d["email"], d["phone"], d.get("org", ""),
             d.get("details", ""), d.get("preferred_date", ""), now, now))
    return ref


def get_service_request(ref: str) -> dict | None:
    with _lock, _connect() as conn:
        conn.row_factory = sqlite3.Row
        row = conn.execute("SELECT * FROM service_requests WHERE ref=?", (ref,)).fetchone()
        return dict(row) if row else None


init()

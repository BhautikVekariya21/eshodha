"""SQLite persistence for form submissions (RFQs, dealer enquiries, tours, newsletter, applications)."""
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
    """Returns True if newly subscribed, False if already present."""
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


init()

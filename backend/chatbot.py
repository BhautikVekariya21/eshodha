"""Rule-based support assistant ("Shodha Assist") for the live chat widget."""
import re

DEFAULT_SUGGESTIONS = ["Payment terms", "MOQ", "Delivery time", "Track my order", "Raise a ticket", "Talk to human"]

# (keywords, reply, follow-up suggestion chips)
RULES = [
    (["hello", "hi", "hey", "namaste", "good morning", "good afternoon"],
     "Namaste! Welcome to eShodha Industries. I can help with products, prices, payments, delivery and support tickets. What do you need?",
     DEFAULT_SUGGESTIONS),

    (["price", "rate", "cost", "quotation", "quote", "₹"],
     "Indicative ex-works ranges this week: HR ₹54,200–57,800/t · CR ₹61,500–65,000/t · GI ₹66,000–71,500/t · PPGI ₹72,500–79,000/t. "
     "Final prices move daily — for a firm offer, raise an RFQ at /contact#rfq and our engineer replies within 24 hours.",
     ["Raise an RFQ", "Payment terms", "MOQ"]),

    (["moq", "minimum order", "minimum"],
     "Minimum order quantities: 25 t for HR and CR coils, 40 t for coated products (GI / GL / PPGI / PPGL). "
     "Smaller trial lots are possible for new-grade development and samples.",
     ["Delivery time", "Get a quote", "Talk to human"]),

    (["deliver", "delivery", "lead time", "dispatch", "shipping", "when will"],
     "Stocked sizes dispatch within 48 hours from our 18 warehouses. Made-to-order coils run 3–5 weeks ex-works, "
     "5–7 weeks delivered for most Indian sites. Exports sail 1–2 weeks after PO from Chennai or Visakhapatnam.",
     ["Track my order", "Payment terms", "Export terms"]),

    (["track", "order status", "where is my", "pi number"],
     "Share your PI / order number (format PI-2026-XXXX) and I'll route you to live tracking. You can also raise a ticket at /support "
     "(category: Order Status) — the desk responds within 1 business day, or call your key-account manager.",
     ["Raise a ticket", "Talk to human", "Delivery time"]),

    (["payment", "pay", "advance", "terms of payment", "gst", "invoice"],
     "Standard terms: 30% advance with PO, balance against proforma invoice copy before dispatch. New customers 100% advance; "
     "rated OEMs get 30-day credit. You can pay PIs online at /payments — UPI, cards, net-banking and NEFT, with instant receipt. "
     "All prices are exclusive of 18% GST.",
     ["Pay an invoice", "MOQ", "Talk to human"]),

    (["upi", "card", "netbanking", "net banking", "neft", "rtgs", "transfer"],
     "Online payments accept UPI (any VPA), Visa/Mastercard/RuPay, net-banking (all major banks) and NEFT/RTGS bank transfer. "
     "Start at /payments with your PI number — receipts carry a PAY reference and transaction ID instantly.",
     ["Pay an invoice", "Payment terms"]),

    (["refund", "cancel"],
     "Cancellations are free before heat allocation (usually 48 h from PI). After allocation, cancellation charges apply per our "
     "terms of sale. Approved refunds return to the source account in 5–7 working days — raise a ticket (category: Billing) at /support.",
     ["Raise a ticket", "Talk to human"]),

    (["certificate", "mtc", "test certificate", "en 10204", "third party"],
     "Every consignment ships with an EN 10204 3.1 Mill Test Certificate tied to the heat number. TÜV / SGS / BIS witness testing "
     "is arranged on request for OEM programmes. Duplicate MTCs: raise a ticket (category: Documents) at /support.",
     ["Raise a ticket", "Quality system"]),

    (["quality", "defect", "claim", "rejection", "rust", "damage"],
     "Sorry to hear that. For quality claims, raise a ticket at /support with category 'Quality Claim' and priority 'High' — "
     "our 8D/CAPA process responds within 8 business hours and closes root-cause within 30 days. Current claim rate: under 0.4%.",
     ["Raise a ticket", "Talk to human"]),

    (["slit", "cut to length", "cut-to-length", "blanking", "levelling", "toll", "process my coil", "processing"],
     "Yes, we toll-process: multi-strand slitting from 10 mm, CTL up to 6,000 mm, blanking and levelling — "
     "6,000 t/month spare capacity with ±0.05 mm tolerance. Get an instant price at /services with our processing calculator.",
     ["Get processing quote", "Warehousing & VMI", "Talk to human"]),

    (["lab test", "lab", "nabl", "test a sample", "third party test", "utr testing"],
     "Our NABL-accredited lab tests third-party samples — tensile, chemistry, hardness, coating weight, metallography — "
     "with reports in 48 hours from ₹1,200/sample. Book at /services (Lab Test Booking) and courier your specimen.",
     ["Book lab test", "Talk to human"]),

    (["vmi", "warehouse", "warehousing", "just in time", "jit", "stock for me", "dedicated stock"],
     "Vendor-Managed Inventory: reserve dedicated stock at our 18 service centres with 24–48 h line-side replenishment, "
     "online stock visibility and ₹95/t/month storage. Request a proposal at /services (VMI reservation).",
     ["Warehousing & VMI", "Delivery time", "Talk to human"]),

    (["training", "academy", "course", "workshop", "certification course"],
     "Shodha Academy runs certified programmes for customer teams — steel metallurgy, coil handling, press-shop forming "
     "and safety — on-site or at our plant, from ₹7,500/seat. Request a calendar at /services (Training Programme).",
     ["Book training", "Plant visit", "Talk to human"]),

    (["scrap", "buy back", "buyback", "skeleton", "offcut", "reverse logistics"],
     "We buy back your skeleton scrap and process offcuts — briquetting, EPR documentation and circularity credits for your "
     "ESG reporting. Market-linked pricing; request a quote at /services (Scrap Buy-Back Programme).",
     ["Book scrap pickup", "Sustainability", "Talk to human"]),

    (["resident engineer", "embedded engineer", "application engineer", "engineer deputation"],
     "Our Embedded Engineer Programme stations an eShodha application engineer inside your plant — forming trials, die support "
     "and consumption planning at ₹1.4L/month. Request deployment at /services (Embedded Engineer).",
     ["Talk to human", "Get a quote"]),

    (["edi", "api", "portal", "digital", "co2 footprint", "carbon report", "scope 3"],
     "Digital Supply Services: EDI/API integration, a live stock portal, consumption analytics and per-coil CO₂ footprint "
     "reports for your scope-3 accounting — free for account customers. Activate at /services (Digital Supply Services).",
     ["Payment terms", "Talk to human"]),

    (["prototype", "sample lot", "first article", "trial lot"],
     "Prototype and sample lots: small first-article runs with full traceability in 4–6 weeks, including FEA material cards "
     "and PPAP-style documentation. Book at /services (Prototype / Sample Lot).",
     ["Custom grade development", "Get a quote"]),

    (["grade", "hr", "cr", "gi", "gl", "ppgi", "ppgl", "stainless", "crgo", "ahrss", "galvalume", "coating", "coil"],
     "We make every coil grade in-house: HR (IS 2062, ASTM A36, SAE), CR (IS 513 O–EDD), GI/GL, PPGI/PPGL, stainless 304/316L/430, "
     "CRGO/CRNGO and auto AHSS (DP590–DP1180). Full specs and datasheets live at /products.",
     ["Get a quote", "MOQ", "Delivery time"]),

    (["export", "international", "fob", "cif"],
     "We export to 40+ countries on FOB Chennai / Visakhapatnam, CFR or CIF terms — seaworthy crating, COO, PCN and pre-shipment "
     "inspection included on request.",
     ["Get a quote", "Talk to human"]),

    (["visit", "tour", "audit", "plant"],
     "Plant tours run every Tuesday and Friday, 09:30–14:00 at Hospet — customer audits, students and investors welcome. "
     "Book at /contact#tour or email tours@eshodhaindustries.com (confirmation within 48 h).",
     ["Delivery time", "Get a quote"]),

    (["career", "job", "vacancy", "hiring", "intern"],
     "We're hiring across operations, engineering, R&D, quality, sales and EHS — plus 40 graduate trainee seats a year. "
     "Browse and apply at /careers; every application gets an APP reference instantly.",
     ["Delivery time", "Talk to human"]),

    (["human", "agent", "call", "phone", "contact", "executive"],
     "Our support desk is staffed Mon–Sat, 09:00–18:00 IST: 1800 419 4567 (toll-free) or sales@eshodhaindustries.com. "
     "For a tracked response, raise a ticket at /support — you'll get a TCK reference and SLA immediately.",
     ["Raise a ticket", "Payment terms"]),

    (["ticket", "complaint", "issue", "problem", "support"],
     "You can raise a tracked ticket at /support — pick a category and priority, and you'll instantly get a TCK reference with the "
     "first-response SLA. Urgent issues (plant downtime) get a call-back within 2 hours.",
     ["Raise a ticket", "Talk to human"]),

    (["thank", "thanks", "great", "awesome"],
     "Happy to help! Anything else — products, payments, delivery or support?",
     DEFAULT_SUGGESTIONS),
]

FALLBACK = ("I can help with: product grades & specs, prices & RFQs, MOQ, delivery times, online payments, order tracking, "
            "quality claims and plant tours. Try one of the quick topics below, or type your question.")


def get_reply(message: str) -> tuple[str, list[str]]:
    """Return (reply_text, suggestion_chips) for a user message."""
    m = (message or "").lower()
    for keys, reply, suggestions in RULES:
        for k in keys:
            if len(k) <= 3:
                if re.search(rf"\b{re.escape(k)}\b", m):
                    return reply, suggestions
            elif k in m:
                return reply, suggestions
    return FALLBACK, DEFAULT_SUGGESTIONS

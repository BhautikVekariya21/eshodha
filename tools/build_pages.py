#!/usr/bin/env python3
"""Build the remaining eShodha Industries pages (shared header/footer)."""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

FAVICON = ("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E"
           "%3Crect width='48' height='48' rx='10' fill='%230b1220'/%3E"
           "%3Ccircle cx='24' cy='24' r='13' stroke='%23f2611a' stroke-width='4' fill='none'/%3E"
           "%3Ccircle cx='24' cy='24' r='5' stroke='%23ffb547' stroke-width='3' fill='none'/%3E%3C/svg%3E")
FONTS = ("<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n"
         "<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n"
         "<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900"
         "&family=Barlow+Condensed:wght@600;700&display=swap\" rel=\"stylesheet\">\n"
         "<link rel=\"stylesheet\" href=\"assets/css/styles.css\">")

CARET = "<svg class=\"caret\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><path d=\"m6 9 6 6 6-6\"/></svg>"

def head(title, desc):
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="icon" href="{FAVICON}">
{FONTS}
</head>
<body>
"""

TOPBAR = """<div class="topbar">
  <div class="wrap">
    <div class="tb-group">
      <span class="tb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z"/></svg> 1800 419 4567 (Toll Free)</span>
      <span class="tb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg> sales@eshodhaindustries.com</span>
    </div>
    <div class="tb-group">
      <span class="tb-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg> ISO 9001 : 2015 Certified</span>
      <a href="investors.html">Investors</a>
      <a href="news.html">Media</a>
    </div>
  </div>
</div>
"""

def nav(active=""):
    def cls(key): return " class=\"active\"" if key == active else ""
    return f"""<header class="header">
  <div class="wrap nav">
    <a class="brand" href="index.html">
      <svg class="brand-mark" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0b1220"/><circle cx="24" cy="24" r="13" stroke="#f2611a" stroke-width="4"/><circle cx="24" cy="24" r="5" stroke="#ffb547" stroke-width="3"/><path d="M37 24h8" stroke="#f2611a" stroke-width="4" stroke-linecap="round"/></svg>
      <span><span class="brand-name">eShodha<span> Industries</span></span><span class="brand-tag">Steel Coil Manufacturing</span></span>
    </a>
    <ul class="menu">
      <li><a href="index.html"{cls('home')}>Home</a></li>
      <li><a href="about.html"{cls('about')}>About</a></li>
      <li><a href="products.html"{cls('products')}>Products {CARET}</a>
        <div class="dropdown">
          <a href="products.html#hr"><span>Hot Rolled (HR) Coils</span><small>IS 2062 · ASTM A36 · SAE grades</small></a>
          <a href="products.html#cr"><span>Cold Rolled (CR) Coils</span><small>IS 513 O / D / DD / EDD grades</small></a>
          <a href="products.html#gi"><span>Galvanized &amp; Galvalume</span><small>GI · GL · Zn / Zn-Al coated</small></a>
          <a href="products.html#cc"><span>Colour Coated Coils</span><small>PPGI · PPGL · RAL finishes</small></a>
          <a href="products.html#ss"><span>Stainless Steel Coils</span><small>AISI 304 · 316L · 430 · 409</small></a>
          <a href="products.html#crgo"><span>Electrical Steel Coils</span><small>CRGO · CRNGO laminations</small></a>
        </div>
      </li>
      <li><a href="process.html"{cls('operations')}>Operations {CARET}</a>
        <div class="dropdown">
          <a href="process.html"><span>End-to-End Process</span><small>Ore to finished coil — 16 stages</small></a>
          <a href="infrastructure.html"><span>Plants &amp; Infrastructure</span><small>3.5 MTPA integrated facility</small></a>
          <a href="process.html#logistics"><span>Logistics &amp; Dispatch</span><small>Rail · road · port network</small></a>
        </div>
      </li>
      <li><a href="quality.html"{cls('quality')}>Quality</a></li>
      <li><a href="industries.html"{cls('industries')}>Industries</a></li>
      <li><a href="sustainability.html"{cls('sustainability')}>Sustainability</a></li>
      <li><a href="careers.html"{cls('more')}>More {CARET}</a>
        <div class="dropdown">
          <a href="careers.html"><span>Careers</span><small>Join India's new-age steelmaker</small></a>
          <a href="investors.html"><span>Investor Relations</span><small>Reports, results &amp; governance</small></a>
          <a href="news.html"><span>News &amp; Media</span><small>Press releases &amp; events</small></a>
        </div>
      </li>
    </ul>
    <div class="nav-cta">
      <a href="contact.html" class="btn btn-primary btn-sm">Get a Quote</a>
      <button class="hamburger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
"""

FOOTER = """<footer class="footer">
  <div class="wrap f-main">
    <div class="f-about">
      <a class="brand" href="index.html">
        <svg class="brand-mark" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#f2611a"/><circle cx="24" cy="24" r="13" stroke="#0b1220" stroke-width="4"/><circle cx="24" cy="24" r="5" stroke="#fff" stroke-width="3"/></svg>
        <span><span class="brand-name" style="color:#fff">eShodha<span> Industries</span></span><span class="brand-tag" style="color:#74859c">Steel Coil Manufacturing</span></span>
      </a>
      <p>An integrated steel manufacturer producing every grade of steel coil end-to-end — from iron ore and coking coal to tested, certified and delivered coils across India and 40+ export markets.</p>
      <div class="socials">
        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.31h4.52V23H.24V8.31zM8.34 8.31h4.33v2h.06c.6-1.14 2.08-2.34 4.28-2.34 4.57 0 5.42 3.01 5.42 6.92V23h-4.52v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.34V8.31z"/></svg></a>
        <a href="#" aria-label="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.4z"/></svg></a>
        <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg></a>
      </div>
    </div>
    <div>
      <h4>Company</h4>
      <div class="f-links">
        <a href="about.html">About Us</a><a href="careers.html">Careers</a><a href="news.html">News &amp; Media</a><a href="investors.html">Investor Relations</a><a href="sustainability.html">Sustainability</a><a href="quality.html">Quality &amp; Certifications</a>
      </div>
    </div>
    <div>
      <h4>Products &amp; Operations</h4>
      <div class="f-links">
        <a href="products.html#hr">Hot Rolled Coils</a><a href="products.html#cr">Cold Rolled Coils</a><a href="products.html#gi">Galvanized &amp; Galvalume</a><a href="products.html#cc">Colour Coated Coils</a><a href="products.html#ss">Stainless Steel Coils</a><a href="process.html">Manufacturing Process</a><a href="infrastructure.html">Infrastructure</a>
      </div>
    </div>
    <div>
      <h4>Stay Updated</h4>
      <p style="font-size:14px">Monthly market note: coil price trends, grade launches and plant updates. No spam.</p>
      <form class="newsletter" data-demo novalidate>
        <input type="email" placeholder="Your work email" aria-label="Email" required>
        <button type="submit">Subscribe</button>
      </form>
      <p class="form-success" style="border-color:rgba(16,185,129,.4);background:rgba(16,185,129,.12);color:#6ee7b7;margin-top:12px">Subscribed — welcome aboard!</p>
      <div class="f-contact" style="margin-top:22px">
        <div class="fc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg><span>eShodha House, Whitefield, Bengaluru 560066, Karnataka, India</span></div>
        <div class="fc"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z"/></svg><span>1800 419 4567</span></div>
      </div>
    </div>
  </div>
  <div class="wrap f-bottom">
    <span>© <span data-year>2026</span> eShodha Industries Pvt. Ltd. All rights reserved.</span>
    <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Sale</a> · <a href="#">Code of Conduct</a></span>
  </div>
</footer>

<button class="back-top" aria-label="Back to top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5m-7 7 7-7 7 7"/></svg></button>
<script src="assets/js/main.js"></script>
"""

def page(fname, title, desc, active, body):
    html = head(title, desc) + TOPBAR + nav(active) + body + FOOTER + "</body>\n</html>\n"
    (ROOT / fname).write_text(html, encoding="utf-8")
    print("built", fname)

def crumbs(label):
    return ("<div class=\"crumbs\"><a href=\"index.html\">Home</a> <span class=\"sep\">/</span> "
            + label + "</div>")

def phero(img, label, h1, p):
    return f"""<section class="page-hero">
  <div class="ph-bg" style="background-image:url('assets/img/{img}')"></div>
  <div class="wrap">
    {crumbs(label)}
    <h1>{h1}</h1>
    <p>{p}</p>
  </div>
</section>
"""

# ============================================================ QUALITY
quality_body = phero("lab.jpg", "Quality", "Zero Defect. Full Traceability.",
  "A NABL-accredited central laboratory, line labs on every process, and instruments on every mill — quality at eShodha is engineered into the product, not inspected in at the end.") + """
<section class="section">
  <div class="wrap split">
    <div class="media reveal"><img src="assets/img/lab.jpg" alt="Central testing laboratory"></div>
    <div class="reveal d1">
      <span class="eyebrow">Quality Policy</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 16px">We Do Not Ship Doubt</h2>
      <p class="lead" style="font-size:16.5px">Every heat, coil and consignment passes a documented quality gate. Our policy is simple: verify at source, control in process, certify before dispatch — and chase every claim to root cause within 30 days.</p>
      <ul class="tick-list">
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>1,400+ tests daily</b><span>Chemistry, mechanical, coating, metallography and NDT</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>Heat-level traceability</b><span>Scan a QR on any coil to trace it back to the caster cast</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>EN 10204 3.1 / 3.2 certification</b><span>Third-party witness testing with TÜV, SGS and BIS on demand</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Test Matrix</span>
      <h2>What We Test, and How Often</h2>
      <p>A snapshot of the routine test plan — customer-specific additional checks are added to the routing automatically.</p>
    </div>
    <div class="table-scroll reveal">
      <table class="spec-table">
        <tr><th>Test</th><th>Equipment / Method</th><th>Standard</th><th>Frequency</th></tr>
        <tr><td>Chemistry (OES + C/S analyser)</td><td>Spark OES, combustion C/S — lab &amp; mobile units</td><td>IS 228 / ASTM E415</td><td>Every heat + every ladle trim</td></tr>
        <tr><td>Tensile &amp; elongation</td><td>600 kN UTM with auto extensiometry</td><td>IS 1608 / ASTM E8</td><td>Every coil</td></tr>
        <tr><td>Hardness (HRB/HV)</td><td>Rockwell &amp; Vickers benches</td><td>IS 1500 / 1501</td><td>Every 5th coil</td></tr>
        <tr><td>Coating weight (Zn / Al-Zn)</td><td>Coulometric + XRF online gauge</td><td>IS 4827 / ASTM A90</td><td>Online 100% + lab check per coil</td></tr>
        <tr><td>Formability (Erichsen / Olsen)</td><td>Cupping testers</td><td>IS 10175</td><td>Drawing grades — every coil</td></tr>
        <tr><td>Microstructure &amp; inclusions</td><td>Motorised metallographs, image analysis</td><td>ASTM E112 / E45</td><td>Per grade family, daily</td></tr>
        <tr><td>Surface inspection</td><td>4-camera surface scanner + AI defect classifier</td><td>Internal QSP-07</td><td>100% online on TCM &amp; CGL</td></tr>
        <tr><td>Dimensional &amp; flatness</td><td>Laser gauges, flatbed + straightness scanners</td><td>IS 1852 / EN 10029</td><td>Online 100%</td></tr>
        <tr><td>Salt spray (coated)</td><td>Cyclic corrosion chambers</td><td>ASTM B117</td><td>Per coating batch</td></tr>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow" style="justify-content:center">Accreditations</span>
      <h2>Certified Across the Board</h2>
    </div>
    <div class="cert-row" style="justify-content:center">
      <div class="cert"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>ISO 9001:2015</b><span>Quality Management — Bureau Veritas</span></div></div>
      <div class="cert"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>IATF 16949:2016</b><span>Automotive QMS</span></div></div>
      <div class="cert"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>ISO 14001:2015</b><span>Environmental Management</span></div></div>
      <div class="cert"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>ISO 45001:2018</b><span>Occupational H&amp;S</span></div></div>
      <div class="cert"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>NABL (ISO 17025)</b><span>Central Lab Accreditation</span></div></div>
      <div class="cert"><span class="ci"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>BIS Licences</b><span>IS 2062 · IS 513 · IS 277 · IS 15965</span></div></div>
    </div>
    <div class="grid g3" style="margin-top:52px">
      <div class="card reveal"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></div><h3>Traceability Portal</h3><p>Scan the coil tag QR to view heat chemistry, rolling parameters, test results and CO₂ footprint — audit access for OEMs 24×7.</p></div>
      <div class="card reveal d1"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10V6l-8-4z"/></svg></div><h3>Claim Resolution</h3><p>8D/CAPA process with a 30-day closure promise and 0.4% claim rate across 1.9 million tonnes shipped.</p></div>
      <div class="card reveal d2"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/></svg></div><h3>Customer Audits</h3><p>Hosted 90+ OEM and third-party audits in FY26 alone — 100% approved, 11 vendors rated "preferred supplier".</p></div>
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <div>
      <h2>Need our quality dossier for vendor approval?</h2>
      <p>Get the complete QA manual, MTC samples and accreditation copies in one pack.</p>
    </div>
    <div class="actions"><a href="contact.html#rfq" class="btn btn-primary btn-lg">Request QA Dossier</a></div>
  </div>
</section>
"""
page("quality.html", "Quality Assurance & Testing — NABL Lab, IATF 16949 | eShodha Industries",
     "Test matrix, accreditations, traceability and claim resolution — how eShodha Industries certifies every steel coil lot.",
     "quality", quality_body)

# ============================================================ INFRASTRUCTURE
infra_units = [
    ("Sinter Plant", "312 m² machine · 1.2 MTPA", "Self-fluxing sinter with deep-bed operation and emission-optimised burn-through."),
    ("Blast Furnaces", "2 × 1,750 m³ · 2.2 MTPA", "Bell-less top, copper staves, 180 kg/t coal injection and cast-house slag granulation."),
    ("BOF Shop", "2 × 120 t converters · 1.9 MTPA", "Sub-lance dynamic control, OG gas recovery and 12% hot-metal charge flexibility."),
    ("Ladle & RH Degasser", "LF + 120 t RH", "Vacuum to 0.5 mbar for IF, electrical and AHSS cleanliness windows."),
    ("Continuous Caster", "1-strand slab caster · 1.6 MTPA", "9.5 m/min, EMS, dynamic soft reduction; slabs 200 × 900–1,900 mm."),
    ("Hot Strip Mill", "1,700 mm, 7-stand · 2.8 MTPA", "Hydraulic AGC, laminar cooling, downcoilers to 34 t coils; 1.2–25.4 mm."),
    ("Pickling Line + Tandem Mill", "CPL-TCM · 1.35 MTPA", "Turbulence HCl pickling coupled to a 5-stand mill at 1,350 m/min."),
    ("Annealing", "HBA + CAL", "100% H₂ batch annealing and a continuous line for EDD/AHSS cycles."),
    ("Galvanizing / GL", "2 CGLs · 0.9 MTPA", "GI to Z275 and 55% Al-Zn to AZ150 with galvannealing capability."),
    ("Colour Coating Line", "300,000 TPA", "PE / SMP / PVDF, 40 m cure oven, inline spectrophotometry."),
    ("CRGO / CRNGO Mill", "200,000 TPA", "Twice-reduced GO with laser scribing; complete insulation coating."),
    ("Captive Power", "130 MW", "BF/CO gas + WHR boilers + 100 MW renewable PPAs."),
]
unit_cards = "\n".join(
    f"      <div class=\"card reveal{' d' + str((i % 3) + 1) if i % 3 else ''}\"><h3 style=\"font-size:17px\">{name}</h3>"
    f"<div style=\"color:var(--orange);font-weight:800;font-size:13px;letter-spacing:.06em;margin:4px 0 10px;text-transform:uppercase\">{cap}</div>"
    f"<p>{desc}</p></div>"
    for i, (name, cap, desc) in enumerate(infra_units))

infra_body = phero("hot-mill.jpg", "Operations / Infrastructure", "A 3.5 MTPA Integrated Complex",
  "Every unit — from sinter machine to colour coater — sits inside one fence at Hospet, Karnataka, with finishing plants at Visakhapatnam and Hazira.") + """
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Plant Units</span>
      <h2>Hospet Works — Unit by Unit</h2>
      <p>Click through to the process page to see how each unit connects in the production chain.</p>
    </div>
    <div class="grid g3">
""" + unit_cards + """
    </div>
  </div>
</section>

<section class="stats-band section tight">
  <div class="wrap">
    <div class="grid g4" style="align-items:center">
      <div class="stat reveal"><div class="num"><span data-count="820">0</span> <i>acres</i></div><div class="lbl">Integrated Campus</div></div>
      <div class="stat reveal d1"><div class="num"><span data-count="14">0</span></div><div class="lbl">Major Process Units</div></div>
      <div class="stat reveal d2"><div class="num"><span data-count="220">0</span></div><div class="lbl">Wagon Rail Siding</div></div>
      <div class="stat reveal d3"><div class="num"><span data-count="94.8" data-decimals="1">0</span><i>%</i></div><div class="lbl">Water Recycled</div></div>
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap split">
    <div>
      <span class="eyebrow">Locations</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 20px">Three Plants, One System</h2>
      <div class="table-scroll reveal">
        <table class="spec-table">
          <tr><th>Site</th><th>Role</th><th>Capacity</th></tr>
          <tr><td>Hospet, Karnataka</td><td>Integrated works — ironmaking to HR &amp; CR</td><td>2.8 MTPA</td></tr>
          <tr><td>Visakhapatnam, Andhra Pradesh</td><td>Coating complex — CGL, CCL, CRGO mill</td><td>0.5 MTPA</td></tr>
          <tr><td>Hazira, Gujarat</td><td>Stainless melting &amp; finishing; service centre</td><td>0.2 MTPA</td></tr>
        </table>
      </div>
      <div style="display:flex;gap:14px;margin-top:28px;flex-wrap:wrap">
        <a href="process.html" class="btn btn-primary">See How It All Connects</a>
        <a href="contact.html#tour" class="btn btn-outline">Visit the Complex</a>
      </div>
    </div>
    <div class="media reveal"><img src="assets/img/green-plant.jpg" alt="Aerial view of the Hospet works"></div>
  </div>
</section>
"""
page("infrastructure.html", "Infrastructure — 3.5 MTPA Integrated Steel Complex | eShodha Industries",
     "Plant units, capacities and locations of eShodha Industries' integrated steel works at Hospet, Visakhapatnam and Hazira.",
     "operations", infra_body)

# ============================================================ INDUSTRIES
industries = [
    ("Automotive &amp; EV", "hot-mill.jpg", "CHQL, DP590–DP1180, IF and CRGO for BIW, panels, exhausts and EV motors. Full APQP/PPAP support and IATF-compliant supply chain.",
     ["DP590–DP1180", "IF Steels", "CRGO M4/M5", "409M Exhaust"]),
    ("Construction &amp; Infrastructure", "hero-coils.jpg", "Structural HR, GC/GI sheets and PPGL cladding for airports, metros, warehouses and housing; custom lengths and colors.",
     ["IS 2062 E350", "GI Z275", "PPGL AZ150", "S355JR"]),
    ("White Goods &amp; Appliances", "color-coil.jpg", "Extra-deep-draw CR, EG-equivalent and premium PPGI for refrigerator doors, washer cabinets and AC outdoor units.",
     ["IS 513 EDD", "PPGI RAL 9003", "0.4–1.2 mm CR"]),
    ("Energy &amp; Solar", "green-plant.jpg", "Galvalume for module mounting structures, HR for wind towers and CRGO for grid transformers powering the transition.",
     ["GL AZ150", "SA 516 Gr.70", "CRGO 30M130"]),
    ("Pipes &amp; Tubes", "molten-steel.jpg", "HRPO and full-hard GI tuned for high-speed ERW mills — plumbing, structural, scaffolding and boiler tubes.",
     ["SAE 1008 HRPO", "C45", "GI Full Hard"]),
    ("Packaging &amp; Drums", "gi-coil.jpg", "Tin-mill-equivalent CR, black plate and stainless coils for closures, drums and food-contact lines (FDA-compliant finishes).",
     ["CR 0.18 mm", "SS 304 2B"]),
    ("Shipbuilding &amp; Marine", "casting.jpg", "High-tensile hull plate coils and sections-grade HR with impact testing at –40 °C for deck and hull applications.",
     ["S355J2 N", "AH36"]),
    ("General Engineering", "lab.jpg", "One-stop merchant mill supply for fabricators, machine builders and cold rollers — 48-hour dispatch from 18 warehouses.",
     ["IS 2062 E250", "EN8/EN9", "CR Full Hard"]),
]
ind_cards = "\n".join(
    f"""      <div class="card reveal">
        <img src="assets/img/{img}" alt="{name}" style="border-radius:12px;margin-bottom:18px;aspect-ratio:16/9;object-fit:cover">
        <h3>{name}</h3><p>{desc}</p>
        <div class="pill-list" style="margin-top:16px">{''.join(f'<span class="pill">{p}</span>' for p in pills)}</div>
      </div>"""
    for (name, img, desc, pills) in industries)

industries_body = phero("gi-coil.jpg", "Industries", "Steel Matched to the Application",
  "Eight sectors, dedicated key-account engineers, and grades selected for performance — not just availability.") + f"""
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Sector Coverage</span>
      <h2>Where Our Coils Go</h2>
      <p>Each sector team carries application know-how — forming dies, welding schedules and finishing partners included.</p>
    </div>
    <div class="grid g3">
{ind_cards}
    </div>
  </div>
</section>

<section class="cta-band">
  <div class="wrap">
    <div>
      <h2>Your sector, your grade, your schedule.</h2>
      <p>Talk to the key-account engineer for your industry today.</p>
    </div>
    <div class="actions"><a href="contact.html#rfq" class="btn btn-primary btn-lg">Start a Conversation</a></div>
  </div>
</section>
"""
page("industries.html", "Industries Served — Automotive, Construction, Appliances & More | eShodha Industries",
     "How eShodha Industries' steel coils serve automotive, construction, appliances, energy, pipes, packaging, marine and engineering sectors.",
     "industries", industries_body)

# ============================================================ SUSTAINABILITY
sus_body = phero("green-plant.jpg", "Sustainability", "Green Steel, Brownfield Delivered",
  "Our ESG programme is built into the plant — waste-heat power, closed water loops, and a 2035 net-zero roadmap audited to global standards.") + """
<section class="stats-band section tight">
  <div class="wrap">
    <div class="kpi-strip">
      <div class="kpi reveal"><b><span data-count="1.72" data-decimals="2">0</span> <i>t</i></b><span>CO₂ / t Crude Steel</span></div>
      <div class="kpi reveal d1"><b><span data-count="31">0</span><i>%</i></b><span>Renewable Electricity</span></div>
      <div class="kpi reveal d2"><b><span data-count="97.4" data-decimals="1">0</span><i>%</i></b><span>Solid Waste Utilised</span></div>
      <div class="kpi reveal d3"><b><span data-count="2.1" data-decimals="1">0</span><i>×</i></b><span>Water Recharged vs Drawn</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Decarbonisation Roadmap</span>
      <h2>The Path to 2035 Net Zero</h2>
      <p>Milestones are board-approved, budgeted and independently reviewed each year.</p>
    </div>
    <div class="bar-chart reveal" style="max-width:860px">
      <div class="bar-row"><div class="bar-top"><span>Renewable share of electricity — now</span><span>31%</span></div><div class="bar-track"><div class="bar-fill" data-val="31"></div></div></div>
      <div class="bar-row"><div class="bar-top"><span>Target 2028 — new 150 MW solar-wind hybrid</span><span>55%</span></div><div class="bar-track"><div class="bar-fill" data-val="55"></div></div></div>
      <div class="bar-row"><div class="bar-top"><span>Scrap share in metallics — now</span><span>34%</span></div><div class="bar-track"><div class="bar-fill alt" data-val="34"></div></div></div>
      <div class="bar-row alt"><div class="bar-top"><span>Target 2030 — scrap &amp; HBI share</span><span>45%</span></div><div class="bar-track"><div class="bar-fill alt" data-val="45"></div></div></div>
      <div class="bar-row"><div class="bar-top"><span>CO₂ intensity reduction vs 2022 baseline by 2030</span><span>–25%</span></div><div class="bar-track"><div class="bar-fill" data-val="25"></div></div></div>
    </div>
    <div class="grid g3" style="margin-top:56px">
      <div class="card reveal"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M2 12h4m12 0h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19"/><circle cx="12" cy="12" r="3.5"/></svg></div><h3>Green Hydrogen Trials</h3><p>15% H₂ enrichment trial on Blast Furnace 2 targets a further 9% carbon-intensity cut — a first among Indian mid-caps.</p></div>
      <div class="card reveal d1"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><h3>Circular Materials</h3><p>GGBS to cement makers, LD slag to aggregates, dust bricks and acid regeneration keep 97.4% of solids out of landfills.</p></div>
      <div class="card reveal d2"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.5-9A5.5 5.5 0 0 1 12 6.2 5.5 5.5 0 0 1 21.5 12c-2 4.4-9.5 9-9.5 9z"/></svg></div><h3>Community &amp; Safety</h3><p>4.2 mn safe man-hours, 26 schools and 9 skilling centres supported, with 1,100+ hospital beds part-funded by the trust.</p></div>
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap split">
    <div class="media reveal"><img src="assets/img/green-plant.jpg" alt="Solar array at the plant"></div>
    <div class="reveal d1">
      <span class="eyebrow">Reporting &amp; Ratings</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 16px">Audited, Rated, Published</h2>
      <ul class="tick-list">
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>BRSR + GRI aligned reporting</b><span>FY26 sustainability report with limited assurance</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>CDP B rating</b><span>Climate and water disclosures three years running</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>Product carbon footprints</b><span>ISO 14067 PCF per coil available to customers via portal</span></div></li>
      </ul>
      <a href="#" class="btn btn-dark" download>Sustainability Report FY26 (PDF)</a>
    </div>
  </div>
</section>
"""
page("sustainability.html", "Sustainability & ESG — Road to 2035 Net Zero | eShodha Industries",
     "eShodha Industries' emissions, energy, water, circularity and community programme on the road to 2035 net zero.",
     "sustainability", sus_body)

# ============================================================ CAREERS
jobs = [
    ("Shift In-charge — Hot Strip Mill", "Operations", "Hospet, Karnataka", "Full-time · 8-12 yrs", "op"),
    ("Manager — BOF Steelmaking", "Operations", "Hospet, Karnataka", "Full-time · 10-15 yrs", "op"),
    ("Automation Engineer (L1/L2)", "Engineering", "Hospet, Karnataka", "Full-time · 4-8 yrs", "eng"),
    ("Metallurgist — CRGO Development", "R&D", "Visakhapatnam", "Full-time · 5-10 yrs", "rnd"),
    ("Quality Engineer — Coated Products", "Quality", "Visakhapatnam", "Full-time · 3-7 yrs", "qa"),
    ("Key Account Manager — Automotive", "Sales", "Pune, Maharashtra", "Full-time · 8-12 yrs", "sales"),
    ("Export Documentation Specialist", "Sales", "Bengaluru", "Full-time · 2-5 yrs", "sales"),
    ("Safety Officer (ISO 45001 Lead)", "EHS", "Hospet, Karnataka", "Full-time · 5-9 yrs", "ehs"),
    ("GET — Mechanical (2026 batch)", "Graduate Trainee", "Multiple Locations", "Trainee · Fresher", "eng"),
    ("Data Scientist — Process AI", "R&D", "Bengaluru", "Full-time · 3-6 yrs", "rnd"),
]
job_cards = "\n".join(
    f"""      <div class="job-card reveal" data-job-cat="{cat}">
        <div><h3>{title}</h3><div class="job-tags"><span class="badge orange">{dept}</span><span class="badge">{loc}</span><span class="badge">{typ}</span></div></div>
        <a class="btn btn-outline btn-sm" href="contact.html">Apply →</a>
      </div>"""
    for (title, dept, loc, typ, cat) in jobs)

careers_body = phero("casting.jpg", "Careers", "Build Your Career Where Steel Is Born",
  "4,600 engineers, operators and technologists run India's most integrated coil plant — and we're hiring across the chain.") + """
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Why eShodha</span>
      <h2>Heavy Industry, Light-Speed Growth</h2>
    </div>
    <div class="grid g3">
      <div class="perk reveal"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12h20M12 2v20"/></svg></span><div><b>Safety-first culture</b><span>4.2 mn safe man-hours; every voice has stop-work authority.</span></div></div>
      <div class="perk reveal d1"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span><div><b>Shodha Academy</b><span>200+ hours/year of paid learning — metallurgy to leadership.</span></div></div>
      <div class="perk reveal d2"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></span><div><b>Real ownership</b><span>Township, ESOPs for band-4+, and relocation support.</span></div></div>
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Open Positions</span>
      <h2>Current Openings</h2>
      <p>Filter by function — or send a general application; we keep CVs on file for 12 months.</p>
    </div>
    <div class="filter-bar reveal">
      <button class="filter-btn active" data-filter="all">All Roles</button>
      <button class="filter-btn" data-filter="op">Operations</button>
      <button class="filter-btn" data-filter="eng">Engineering</button>
      <button class="filter-btn" data-filter="rnd">R&amp;D</button>
      <button class="filter-btn" data-filter="qa">Quality</button>
      <button class="filter-btn" data-filter="sales">Sales</button>
      <button class="filter-btn" data-filter="ehs">EHS</button>
    </div>
    <div style="display:grid;gap:14px">
""" + job_cards + """
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split">
    <div class="media reveal"><img src="assets/img/lab.jpg" alt="Training at Shodha Academy"></div>
    <div class="reveal d1">
      <span class="eyebrow">Shodha Academy</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 16px">From Trainee to Plant Head, In-House</h2>
      <p class="lead" style="font-size:16.5px">A 26-week residential induction for GETs, simulator-based operator training, and sponsorship for M.Tech and PhD programmes in metallurgy and automation.</p>
      <div class="grid g2" style="margin-top:24px">
        <div class="fm-box"><b>200+</b><span>Learning Hours / Year</span></div>
        <div class="fm-box"><b>92%</b><span>Internal Fill Rate for Supervisor Roles</span></div>
        <div class="fm-box"><b>40</b><span>GETs Onboarded / Year</span></div>
        <div class="fm-box"><b>17</b><span>Higher-Study Sponsorships Active</span></div>
      </div>
    </div>
  </div>
</section>
"""
page("careers.html", "Careers — Jobs at India's Integrated Coil Maker | eShodha Industries",
     "Open roles across operations, engineering, R&D, quality, sales and EHS at eShodha Industries. Safety-first culture, Shodha Academy training.",
     "more", careers_body)

# ============================================================ INVESTORS
inv_body = phero("hero-coils.jpg", "Investors", "Consistent Growth, Steel-Solid Governance",
  "Listed since 2015, rated [A+] by two agencies, and paying dividends for 18 consecutive years.") + """
<section class="stats-band section tight">
  <div class="wrap">
    <div class="grid g4" style="align-items:center">
      <div class="stat reveal"><div class="num">₹<span data-count="18200">0</span> <i>Cr</i></div><div class="lbl">FY26 Revenue</div></div>
      <div class="stat reveal d1"><div class="num">₹<span data-count="2410">0</span> <i>Cr</i></div><div class="lbl">FY26 EBITDA</div></div>
      <div class="stat reveal d2"><div class="num"><span data-count="13.2" data-decimals="1">0</span><i>%</i></div><div class="lbl">EBITDA Margin</div></div>
      <div class="stat reveal d3"><div class="num">₹<span data-count="9.50" data-decimals="2">0</span></div><div class="lbl">Dividend / Share (FY26)</div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Financial Highlights</span>
      <h2>Five-Year Track Record</h2>
    </div>
    <div class="table-scroll reveal">
      <table class="spec-table">
        <tr><th>Metric (₹ Cr)</th><th>FY22</th><th>FY23</th><th>FY24</th><th>FY25</th><th>FY26</th></tr>
        <tr><td>Revenue from operations</td><td>10,240</td><td>12,860</td><td>15,110</td><td>16,905</td><td>18,200</td></tr>
        <tr><td>EBITDA</td><td>980</td><td>1,650</td><td>1,975</td><td>2,180</td><td>2,410</td></tr>
        <tr><td>Profit after tax</td><td>410</td><td>820</td><td>1,040</td><td>1,180</td><td>1,340</td></tr>
        <tr><td>Sales volume (kt)</td><td>1,420</td><td>1,580</td><td>1,710</td><td>1,820</td><td>1,930</td></tr>
        <tr><td>Net debt / EBITDA</td><td>2.1×</td><td>1.4×</td><td>0.9×</td><td>0.6×</td><td>0.4×</td></tr>
        <tr><td>EPS (₹)</td><td>8.2</td><td>16.4</td><td>20.8</td><td>23.6</td><td>26.8</td></tr>
      </table>
    </div>
    <div class="grid g3" style="margin-top:52px">
      <div class="card reveal"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5z"/><path d="M14 3v5h5"/></svg></div><h3>Annual Report FY26</h3><p>Full integrated report with BRSR and audited financials.</p><a class="more" href="#">Download PDF</a></div>
      <div class="card reveal d1"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg></div><h3>Q1 FY27 Results</h3><p>Board-approved results, investor deck and transcript.</p><a class="more" href="#">View Filings</a></div>
      <div class="card reveal d2"><div class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><path d="M21 7v6h-6"/></svg></div><h3>Shareholding Pattern</h3><p>Promoters 51.2%, institutions 33.8%, retail 15.0% — updated quarterly.</p><a class="more" href="#">See Breakup</a></div>
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap split">
    <div>
      <span class="eyebrow">Corporate Governance</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 16px">Independent, Disclosed, On Time</h2>
      <ul class="tick-list">
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>SEBI LODR compliant</b><span>100% on-time filings for 42 consecutive quarters</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>60% independent board</b><span>Two women directors; separate audit &amp; risk committees</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>Credit ratings</b><span>[A+] Stable (CARE) · [A+] Stable (CRISIL) for long-term debt</span></div></li>
      </ul>
    </div>
    <div class="media reveal"><img src="assets/img/casting.jpg" alt="Steelmaking"></div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Announcements</span>
      <h2>Recent Intimations to the Exchange</h2>
    </div>
    <div style="display:grid;gap:12px;max-width:900px">
      <div class="dl-item reveal" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/></svg> Board meeting intimation — Q1 FY27 results <small>Sep 02, 2026</small></div>
      <div class="dl-item reveal" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v5m0 3h.01"/><circle cx="12" cy="12" r="9"/></svg> Credit rating re-affirmation — [A+] Stable <small>Aug 19, 2026</small></div>
      <div class="dl-item reveal" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/></svg> Capex approval — new pickling line, ₹780 Cr <small>Jul 28, 2026</small></div>
      <div class="dl-item reveal" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 21h16"/></svg> 48th AGM proceedings &amp; voting results <small>Jul 10, 2026</small></div>
    </div>
  </div>
</section>
"""
page("investors.html", "Investor Relations — Reports, Results & Governance | eShodha Industries",
     "Financial highlights, annual reports, shareholding, credit ratings and exchange announcements of eShodha Industries.",
     "more", inv_body)

# ============================================================ NEWS
news_items = [
    ("Sustainability", "Sep 12, 2026", "eShodha begins 15% green-hydrogen injection trial at Blast Furnace 2", "A first-of-its-kind trial targets a 9% cut in blast-furnace carbon intensity by December.", "green-plant.jpg"),
    ("Expansion", "Aug 30, 2026", "New 300,000 TPA colour-coating line commissioned at Visakhapatnam", "The line adds PVDF capability and doubles our premium PPGL output.", "color-coil.jpg"),
    ("Recognition", "Aug 08, 2026", "Hot Strip Mill wins National Safety Excellence Award 2026", "Recognised for 4.2 million consecutive safe man-hours across the division.", "hot-mill.jpg"),
    ("Products", "Jul 21, 2026", "CRGO M4 grade passes type test at three transformer OEMs", "Domestic CRGO for power transformers takes a step toward import substitution.", "casting.jpg"),
    ("Corporate", "Jul 02, 2026", "FY26 results: revenue up 7.7%, highest-ever coil volumes", "EBITDA at ₹2,410 Cr with net debt down to 0.4×.", "hero-coils.jpg"),
    ("Export", "Jun 14, 2026", "First GI consignment shipped to the Australian roofing market", "AZ150 Galvalume clears AS 1397 certification for the Sydney metro project.", "gi-coil.jpg"),
]
news_cards = "\n".join(
    f"""      <a href="#" class="news-card reveal{' d' + str((i % 3) + 1) if i % 3 else ''}">
        <img class="nc-media" src="assets/img/{img}" alt="{title}">
        <div class="nc-body"><div class="news-meta"><span class="cat">{cat}</span><span>{date}</span></div><h3>{title}</h3><p>{p}</p></div>
      </a>"""
    for i, (cat, date, title, p, img) in enumerate(news_items))

news_body = phero("color-coil.jpg", "News & Media", "The eShodha Newsroom",
  "Plant milestones, product launches, results and recognitions — straight from the source.") + f"""
<section class="section">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Latest Stories</span>
      <h2>Press Releases</h2>
    </div>
    <div class="grid g3">
{news_cards}
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap split">
    <div>
      <span class="eyebrow">Media Contact</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 16px">Press Kit &amp; Enquiries</h2>
      <p class="lead" style="font-size:16.5px">High-res images, plant b-roll, leadership bios and fact sheets are available on request. We respond to media queries within one business day.</p>
      <div class="fm-box" style="margin-top:24px;max-width:420px"><b>press@eshodhaindustries.com</b><span>Corporate Communications · +91 80 4700 1200</span></div>
    </div>
    <div class="media reveal"><img src="assets/img/molten-steel.jpg" alt="Molten steel pour"></div>
  </div>
</section>
"""
page("news.html", "News & Media — Press Releases | eShodha Industries",
     "Latest news, press releases and media resources from eShodha Industries.",
     "more", news_body)

# ============================================================ CONTACT
contact_body = phero("molten-steel.jpg", "Contact", "Let's Talk Steel",
  "Quotes, samples, plant tours, dealer enquiries or careers — one form away. Technical offers within 24 hours.") + """
<section class="section">
  <div class="wrap">
    <div class="grid g3" style="margin-bottom:56px">
      <div class="contact-tile reveal"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.6a2 2 0 0 1 1.7 2.1z"/></svg></span><div><b>Sales &amp; Quotes</b><p>1800 419 4567 (toll-free)<br>sales@eshodhaindustries.com</p></div></div>
      <div class="contact-tile reveal d1"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><b>Head Office</b><p>eShodha House, ITPL Main Road,<br>Whitefield, Bengaluru 560066</p></div></div>
      <div class="contact-tile reveal d2"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></span><div><b>Response Time</b><p>Technical offers &lt; 24 h<br>General queries &lt; 8 h</p></div></div>
    </div>
  </div>
</section>

<section class="section light" id="rfq">
  <div class="wrap split rev" style="align-items:start">
    <div>
      <span class="eyebrow">Request for Quotation</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 12px">Tell Us Exactly What You Need</h2>
      <p class="lead" style="font-size:16px">The more precise your spec, the sharper our offer. Fields marked <i style="color:var(--orange);font-style:normal">*</i> are required.</p>
      <div class="fm-box" style="margin-top:22px;max-width:420px"><b>Plant tours &amp; audits</b><span>Write to tours@eshodhaindustries.com or use the tour section below.</span></div>
      <div class="fm-box" style="margin-top:14px;max-width:420px"><b>Existing customer?</b><span>Track orders &amp; MTCs on the customer portal — link sent with every PI.</span></div>
    </div>
    <div class="form-card reveal">
      <form data-demo novalidate>
        <div class="form-grid">
          <div class="field"><label>Full Name <i>*</i></label><input type="text" required placeholder="e.g. Priya Sharma"></div>
          <div class="field"><label>Company <i>*</i></label><input type="text" required placeholder="Company / Firm"></div>
          <div class="field"><label>Email <i>*</i></label><input type="email" required placeholder="you@company.com"></div>
          <div class="field"><label>Phone <i>*</i></label><input type="tel" required placeholder="+91"></div>
          <div class="field"><label>Product Family <i>*</i></label>
            <select required>
              <option value="">Select…</option>
              <option>Hot Rolled (HR / HRPO)</option>
              <option>Cold Rolled (CR)</option>
              <option>Galvanized (GI)</option>
              <option>Galvalume (GL)</option>
              <option>Colour Coated (PPGI/PPGL)</option>
              <option>Stainless Steel</option>
              <option>Electrical Steel (CRGO/CRNGO)</option>
              <option>Auto AHSS</option>
            </select>
          </div>
          <div class="field"><label>Quantity (t) <i>*</i></label><input type="number" min="1" required placeholder="e.g. 500"></div>
          <div class="field full"><label>Specification (grade / thickness / width / coating)</label><textarea placeholder="e.g. IS 2062 E250BR, 3 mm × 1250 mm, HRPO, IS 8910 edging"></textarea></div>
          <div class="field full"><label>Delivery Location <i>*</i></label><input type="text" required placeholder="City, State / Port"></div>
          <div class="field full"><button class="btn btn-primary btn-lg" type="submit">Send RFQ <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></button></div>
        </div>
        <p class="form-note" style="margin-top:14px">By submitting you agree to our privacy policy. We never share your data.</p>
        <div class="form-success">✓ RFQ received! Our engineer will send your technical offer within 24 hours.</div>
      </form>
    </div>
  </div>
</section>

<section class="section" id="dealer">
  <div class="wrap split" style="align-items:start">
    <div class="form-card reveal">
      <h3 style="font-size:22px;margin-bottom:8px">Become a Channel Partner</h3>
      <p style="color:var(--muted);font-size:14px;margin-bottom:20px">We appoint dealers for GI/GL and colour-coated products in open territories. Eligibility: existing steel trade experience and warehousing.</p>
      <form data-demo novalidate>
        <div class="form-grid">
          <div class="field"><label>Firm Name <i>*</i></label><input type="text" required></div>
          <div class="field"><label>Owner / Partner <i>*</i></label><input type="text" required></div>
          <div class="field"><label>Email <i>*</i></label><input type="email" required></div>
          <div class="field"><label>Phone <i>*</i></label><input type="tel" required></div>
          <div class="field full"><label>Territory Requested <i>*</i></label><input type="text" required placeholder="District / State"></div>
          <div class="field full"><label>Current Lines Carried</label><input type="text" placeholder="e.g. Cement, TMT, Plywood…"></div>
          <div class="field full"><button class="btn btn-dark" type="submit">Submit Partner Enquiry</button></div>
        </div>
        <div class="form-success">✓ Enquiry received — our channel team will call within 2 working days.</div>
      </form>
    </div>
    <div>
      <span class="eyebrow" id="tour">Plant Tours</span>
      <h2 style="font-size:clamp(26px,3.6vw,38px);margin:14px 0 12px">Visit the Complex</h2>
      <p class="lead" style="font-size:16px;color:var(--muted)">Customer audits, student groups and investor visits are hosted every Tuesday and Friday, 09:30–14:00. PPE is provided; closed shoes required.</p>
      <ul class="tick-list" style="margin-top:22px">
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>What you'll see</b><span>Blast furnace cast house, hot strip mill, coating lines and the central lab</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>How to book</b><span>Email tours@eshodhaindustries.com with date, group size and purpose — confirmation within 48 h</span></div></li>
        <li><span class="tk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg></span><div><b>Getting here</b><span>Vidyanagar station (12 km) · VIDJ passenger siding · 45 min from Hubballi airport</span></div></li>
      </ul>
    </div>
  </div>
</section>

<section class="section light">
  <div class="wrap">
    <div class="section-head reveal">
      <span class="eyebrow">Find Us</span>
      <h2>Locations</h2>
    </div>
    <div class="map-embed reveal">
      <iframe title="eShodha Industries HQ map" src="https://www.openstreetmap.org/export/embed.html?bbox=77.6800%2C12.9300%2C77.7800%2C13.0300&amp;layer=mapnik&amp;marker=12.9784%2C77.7280" style="width:100%;height:380px;border:0" loading="lazy"></iframe>
    </div>
    <div class="grid g3" style="margin-top:30px">
      <div class="contact-tile reveal"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><b>Hospet Works</b><p>Toru Nagara Industrial Area, Hospet, Karnataka 583203</p></div></div>
      <div class="contact-tile reveal d1"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><b>Visakhapatnam Coating Complex</b><p>Autonagar Gate, Parawada, AP 531021</p></div></div>
      <div class="contact-tile reveal d2"><span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span><div><b>Hazira Stainless Unit</b><p>SURAT Hazira Road, Gujarat 394270</p></div></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap" style="max-width:860px">
    <div class="section-head reveal">
      <span class="eyebrow">FAQs</span>
      <h2>Quick Answers</h2>
    </div>
    <div class="accordion reveal">
      <div class="acc-item"><button class="acc-head">What is your minimum order quantity?<span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="acc-body"><p>For HR and CR, 25 t per size/grade; coated products 40 t. Lower trial quantities are possible for new-grade development and samples.</p></div></div>
      <div class="acc-item"><button class="acc-head">How fast can you deliver?<span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="acc-body"><p>Stocked sizes dispatch in 48 hours from our 18 warehouses. Made-to-order coils run 3–5 weeks ex-works, 5–7 weeks delivered to most Indian sites.</p></div></div>
      <div class="acc-item"><button class="acc-head">Do you provide Mill Test Certificates and third-party inspection?<span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="acc-body"><p>Every consignment ships with an EN 10204 3.1 MTC. TÜV, SGS, BIS or customer-representative witness testing can be arranged at our cost for OEM programmes.</p></div></div>
      <div class="acc-item"><button class="acc-head">Can you develop a custom grade for us?<span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="acc-body"><p>Yes — our R&amp;D centre runs a formal 6–12 week trial-lot process covering lab melting, pilot rolling, first-article supply and PPAP-style sign-off.</p></div></div>
      <div class="acc-item"><button class="acc-head">Do you export? What are the terms?<span class="plus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="acc-body"><p>We export to 40+ countries on FOB Chennai/Visakhapatnam, CFR or CIF terms with seaworthy crating, COO, PCN and third-party pre-shipment inspection on request.</p></div></div>
    </div>
  </div>
</section>
"""
page("contact.html", "Contact & RFQ — Quotes, Dealers, Plant Tours | eShodha Industries",
     "Request a quotation, become a dealer, book a plant tour or find eShodha Industries' offices in Bengaluru, Hospet, Visakhapatnam and Hazira.",
     "contact", contact_body)

print("done")

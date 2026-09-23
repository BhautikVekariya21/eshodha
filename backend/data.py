"""eShodha Industries — all site content served by the API."""
from datetime import date

COMPANY = {
    "name": "eShodha Industries",
    "tagline": "Steel Coil Manufacturing",
    "phone": "1800 419 4567",
    "sales_email": "sales@eshodhaindustries.com",
    "press_email": "press@eshodhaindustries.com",
    "tour_email": "tours@eshodhaindustries.com",
    "address": "eShodha House, Whitefield, Bengaluru 560066, Karnataka, India",
    "iso": "ISO 9001 : 2015 Certified",
}

IMG = "/img"

HOME = {
    "kicker": "Integrated Steel Plant · Est. 1996 · Bengaluru, India",
    "heroTitleA": "Every Grade of Steel Coil.",
    "heroTitleB": "From Ore to Excellence.",
    "heroText": ("eShodha Industries runs a fully integrated end-to-end operation — raw material handling, "
                 "ironmaking, steelmaking, casting, rolling, coating, testing and dispatch — delivering "
                 "world-class steel coils to 40+ countries."),
    "heroImage": f"{IMG}/hero-coils.jpg",
    "heroStats": [
        {"num": "3.5", "suffix": " MTPA", "label": "Installed Capacity"},
        {"num": "400+", "suffix": "", "label": "Steel Grades"},
        {"num": "28+", "suffix": "", "label": "Years of Operations"},
        {"num": "98.6%", "suffix": "", "label": "On-Time Dispatch"},
    ],
    "sectorChips": ["Automotive & EV", "Construction & Infrastructure", "White Goods & Appliances",
                    "Energy & Solar", "Pipes & Tubes", "Packaging", "Shipbuilding", "Railways",
                    "General Engineering", "Cold Rollers & Processors"],
    "about": {
        "title": "A Fully Integrated Steelmaker — Nothing Outsourced",
        "text": ("From captive iron-ore mines and a 1.2 MTPA sinter plant to downstream galvanizing and "
                 "colour-coating lines, we control every step of the coil value chain under one quality system."),
        "image": f"{IMG}/molten-steel.jpg",
        "ticks": [
            {"title": "Captive raw-material security", "text": "Iron ore, dolomite and fluxes from our own mines in Karnataka & Odisha"},
            {"title": "End-to-end traceability", "text": "Every coil carries a digital heat number back to the blast furnace cast"},
            {"title": "All coil grades under one roof", "text": "HR, CR, GI, GL, PPGI/PPGL, stainless and electrical steel"},
        ],
    },
    "productCards": [
        {"icon": "mill", "title": "Hot Rolled Coils (HR)", "anchor": "hr",
         "text": "1.2–25.4 mm, up to 2000 mm wide. IS 2062 E250–E410, ASTM A36, SAE 1008–1541 for structures, tubes, auto chassis and LPG cylinders."},
        {"icon": "coil", "title": "Cold Rolled Coils (CR)", "anchor": "cr",
         "text": "0.3–3.0 mm close-tolerance sheet. IS 513 O/D/DD/EDD, IF grades for deep drawing, panels, appliances and precision tubes."},
        {"icon": "spark", "title": "Galvanized & Galvalume", "anchor": "gi",
         "text": "Zinc (Z60–Z275) and zinc-aluminium (AZ70–AZ150) coatings for corrosion-proof roofing, cladding and construction."},
        {"icon": "layers", "title": "Colour Coated (PPGI / PPGL)", "anchor": "cc",
         "text": "Polyester, SMP and PVDF systems in 200+ RAL shades with textured, matte and gloss finishes — 20-year coating warranties."},
        {"icon": "doc", "title": "Stainless Steel Coils", "anchor": "ss",
         "text": "Austenitic, ferritic and martensitic coils in 2B, BA, No. 4 and matte finishes for kitchens, pharma, food and chemicals."},
        {"icon": "bolt", "title": "Electrical Steel (CRGO/CRNGO)", "anchor": "crgo",
         "text": "Low-loss grain-oriented and non-oriented coils for transformers, motors and the fast-growing EV powertrain market."},
    ],
    "miniFlow": [
        {"n": "01", "title": "Raw Materials", "sub": "Sourcing & Prep"},
        {"n": "02", "title": "Ironmaking", "sub": "Sinter + Blast Furnace"},
        {"n": "03", "title": "Steelmaking", "sub": "BOF + Ladle Refining"},
        {"n": "04", "title": "Casting", "sub": "Continuous Slab Caster"},
        {"n": "05", "title": "Rolling", "sub": "Hot & Cold Mills"},
        {"n": "06", "title": "Finishing", "sub": "Coating, QC & Dispatch"},
    ],
    "quality": {
        "title": "Every Coil Certified Before It Leaves the Yard",
        "text": ("1,400+ lab tests every day across our NABL-accredited central lab and line labs — chemistry, "
                 "tensile, hardness, coating weight, formability and surface inspection."),
        "image": f"{IMG}/lab.jpg",
        "certs": [
            {"name": "ISO 9001:2015", "sub": "Quality Management"},
            {"name": "IATF 16949", "sub": "Automotive Quality"},
            {"name": "ISO 14001", "sub": "Environment"},
            {"name": "ISO 45001", "sub": "Occupational Safety"},
        ],
    },
    "bigStats": [
        {"num": 3.5, "decimals": 1, "suffix": " MTPA", "label": "Crude Steel Capacity"},
        {"num": 40, "decimals": 0, "suffix": "+", "label": "Export Markets"},
        {"num": 4600, "decimals": 0, "suffix": "+", "label": "People Employed"},
        {"num": 31, "decimals": 0, "suffix": "%", "label": "Energy from Renewables"},
    ],
    "industries": [
        {"icon": "car", "title": "Automotive & EV", "anchor": True,
         "text": "CHQL, AHSS and DP steels for BIW, panels and EV motor cores — IATF 16949 certified supply chain."},
        {"icon": "building", "title": "Construction & Infra", "anchor": True,
         "text": "Structural HR, GI/GL roofing and colour-coated cladding for airports, metros, warehouses and housing."},
        {"icon": "appliance", "title": "White Goods", "anchor": True,
         "text": "CR, EG and PPGI coils for refrigerators, washing machines, ACs and microwave ovens with premium surfaces."},
        {"icon": "bolt", "title": "Energy & Solar", "anchor": True,
         "text": "GL/PPGL for solar mounting structures, wind tower steel and CRGO for grid transformers."},
        {"icon": "pipe", "title": "Pipes & Tubes", "anchor": True,
         "text": "HRPO and HRC for ERW, SSAW and precision tubes — plumbing, scaffolding, bores and structural."},
        {"icon": "box", "title": "Packaging", "anchor": True,
         "text": "Tin-mill equivalent CR and stainless coils for drums, closures and food-grade containers."},
    ],
    "sustainability": {
        "title": "Steel You Can Put Your Carbon Targets Behind",
        "text": ("1.72 t CO₂ per tonne of crude steel and falling — backed by a 2035 net-zero roadmap, "
                 "100 MW renewable PPAs and 34% scrap-based EAF melting."),
        "image": f"{IMG}/green-plant.jpg",
        "ticks": [
            {"title": "Green power today", "text": "100 MW solar + wind PPAs; 31% of our electricity is renewable"},
            {"title": "Circular by design", "text": "97.4% solid waste utilisation — slag to cement, bricks and road metal"},
            {"title": "Water positive", "text": "2.1× rainwater harvested vs. freshwater drawn"},
        ],
    },
}

TESTIMONIALS = [
    {"quote": "eShodha's auto-grade CR coils have met PPAP requirements on every single lot for six years. Their heat-level traceability is the best we audit anywhere in Asia.",
     "name": "Rajesh Menon", "role": "VP Sourcing, Meridian Auto Components", "initials": "RM"},
    {"quote": "From PPGI colour matching to delivery precision, they behave like a partner, not a vendor. Our roofing projects never wait on steel.",
     "name": "Sunita Kulkarni", "role": "Director, Skyline Buildtech", "initials": "SK"},
    {"quote": "The technical team co-developed a 0.35 mm CRGO grade with us in under nine months. That speed is unheard of in this industry.",
     "name": "Arvind Verma", "role": "CEO, Voltarc Transformers", "initials": "AV"},
]

ABOUT = {
    "title": "Forged in 1996. Still Getting Stronger.",
    "sub": ("eShodha Industries grew from a single rolling mill in Bengaluru into one of India's most "
            "integrated flat-steel producers — making every coil grade end-to-end, under one quality system."),
    "image": f"{IMG}/casting.jpg",
    "storyTitle": "Three Decades of Controlled, Certified Steelmaking",
    "story": [
        ("In 1996, founder R. D. Shodha commissioned a 60,000 TPA hot rolling mill on the outskirts of "
         "Bengaluru with one conviction: India should not have to import quality coil. What began as a "
         "re-roller buying semis became an explorer of every upstream stage — sintering in 2003, the first "
         "blast furnace in 2006, basic oxygen steelmaking in 2009."),
        ("Downstream, the ambition was symmetrical: cold rolling in 2012, continuous galvanizing in 2015, "
         "colour coating in 2018, and a dedicated electrical-steel mill in 2022. Today eShodha Industries "
         "operates a 3.5 MTPA integrated complex at Hospet with finishing facilities in Visakhapatnam and "
         "Hazira, shipping over 400 grades to automakers, appliance brands, builders and transformer OEMs "
         "in 40+ countries."),
        ("Every strategic bet has followed the same rule: own the whole chain or don't promise the result. "
         "That is why our customers receive one certificate, one heat number and one accountable partner "
         "from ore to coil."),
    ],
    "vmv": [
        {"title": "Our Vision", "icon": "target",
         "text": "To be India's most trusted coil manufacturer — the first name engineers think of for any grade of steel, delivered with zero-defect confidence."},
        {"title": "Our Mission", "icon": "arrow",
         "text": "To run a fully integrated, digitally traceable, low-carbon operation that converts raw ore into finished coils at benchmark cost, quality and safety."},
        {"title": "Our Values", "icon": "heart",
         "text": "Safety before schedule. Quality before tonnage. Customers before contracts. And the planet in every decision we furnace."},
    ],
    "timeline": [
        {"year": "1996", "title": "First mill commissioned", "text": "60,000 TPA hot rolling mill begins commercial production in Bengaluru."},
        {"year": "2003", "title": "Sinter plant & captive mines", "text": "Backward integration begins — sinter machine and iron-ore mining leases secured in Karnataka."},
        {"year": "2006", "title": "Blast Furnace 1 lights up", "text": "0.6 MTPA blast furnace ends dependence on bought-out hot metal."},
        {"year": "2009", "title": "BOF steelmaking & continuous casting", "text": "120 t converter, ladle furnace and slab caster commissioned — eShodha becomes a true integrated steelmaker."},
        {"year": "2012", "title": "Cold Rolling Complex", "text": "Tandem cold mill and batch annealing add precision CR coils to the portfolio."},
        {"year": "2015", "title": "Continuous Galvanizing Line", "text": "GI and GL coating capability unlocks construction and appliance markets."},
        {"year": "2018", "title": "Colour Coating & IATF 16949", "text": "PPGI/PPGL line commissioned; automotive quality certification achieved."},
        {"year": "2022", "title": "Electrical Steel Mill", "text": "CRGO/CRNGO plant inaugurated — a first among private Indian mid-cap steelmakers."},
        {"year": "2026", "title": "Green steel scale-up", "text": "100 MW renewables online, hydrogen injection trials underway, 3.5 MTPA group capacity."},
    ],
    "leaders": [
        {"name": "R. D. Shodha", "role": "Founder & Chairman", "image": f"{IMG}/molten-steel.jpg",
         "text": "Started the company in 1996; still chairs the daily production call at 8:15 AM."},
        {"name": "Meera Shodha", "role": "Managing Director", "image": f"{IMG}/hot-mill.jpg",
         "text": "Led the 2012–2022 downstream build-out; IIT-B metallurgist, 24 years in steel."},
        {"name": "Vikram Iyer", "role": "Director — Operations", "image": f"{IMG}/casting.jpg",
         "text": "Runs the Hospet complex; ex-plant-head of two large integrated works."},
        {"name": "Dr. Ananya Rao", "role": "Chief Quality & R&D Officer", "image": f"{IMG}/lab.jpg",
         "text": "PhD in physical metallurgy; owns the zero-defect programme and 14 patents."},
    ],
    "stats": [
        {"num": 3.5, "decimals": 1, "prefix": "", "suffix": " MTPA", "label": "Group Steel Capacity"},
        {"num": 18200, "decimals": 0, "prefix": "₹", "suffix": " Cr", "label": "FY26 Revenue"},
        {"num": 4600, "decimals": 0, "prefix": "", "suffix": "+", "label": "Employees"},
        {"num": 1200, "decimals": 0, "prefix": "", "suffix": "+", "label": "Customers"},
    ],
}

PRODUCTS = {
    "title": "Every Grade of Steel Coil",
    "sub": ("Seven product families, 400+ grades, full compliance with IS, ASTM, EN and JIS standards — "
            "each coil delivered with a mill test certificate and digital traceability."),
    "stats": [
        {"a": 0.3, "aDec": 1, "b": 25.4, "bDec": 1, "label": "Thickness Range (mm)"},
        {"a": 2000, "aDec": 0, "prefix": "up to ", "label": "Coil Width (mm)"},
        {"a": 400, "aDec": 0, "suffix": "+", "label": "Active Grades"},
        {"a": 24, "aDec": 0, "suffix": " hrs", "label": "Technical Offer Turnaround"},
    ],
    "families": [
        {
            "id": "hr", "tab": "Hot Rolled",
            "eyebrow": "Hot Rolled Coils (HRC)",
            "name": "The Workhorse of Indian Industry",
            "text": ("Rolled from continuously cast slabs at 1,100–1,250 °C on our 1.7 m hot strip mill, "
                     "pickled or unpickled, with excellent dimension control and surface quality."),
            "image": f"{IMG}/hot-mill.jpg",
            "badges": [
                {"label": "Pickled & Oiled (HRPO)", "hl": True}, {"label": "Mill Edge / Trimmed"},
                {"label": "Laminate & Skin-Pass Ready"}, {"label": "Sour Service Options", "hl": True},
            ],
            "headers": ["Parameter", "Specification"],
            "rows": [
                ["Thickness", "1.2 mm – 25.4 mm (up to 0.1 mm tolerance in gauge classes PT.A/PT.B)"],
                ["Width", "900 mm – 2000 mm (slit widths from 25 mm)"],
                ["Grades — Structural", "IS 2062 E250 / E300 / E350 / E410 (BR, BO, A, B, C) · ASTM A36 · S275JR / S355JR (EN 10025)"],
                ["Grades — Deep Drawing", "IS 1079 / IS 513 O onward (hot rolled D grades) · IF hot rolled for tube making"],
                ["Grades — Automotive & Tubes", "SAE J403 1008 – 1541 · C45 / EN8 / EN9 · AISI 4130 on request"],
                ["Boiler & Pressure Vessel", "SA 516 Gr.60/65/70 · IS 2002 · P265GH"],
                ["Coil ID / OD", "ID 762 mm · OD 1,000 – 2,150 mm · unit weight up to 34 t"],
                ["Standards", "IS · ASTM · EN · JIS · BIS IS 1786-compatible chemistry"],
            ],
            "datasheets": [{"label": "HR Coils Datasheet (PDF)", "size": "1.8 MB"}, {"label": "HRPO Brochure", "size": "1.1 MB"}],
        },
        {
            "id": "cr", "tab": "Cold Rolled",
            "eyebrow": "Cold Rolled Coils (CRC)",
            "name": "Precision, Surface & Formability",
            "text": ("Tandem-mill rolled, batch or continuously annealed and temper-rolled for tight gauge "
                     "tolerance, superior surface and drawing performance down to EDD."),
            "image": f"{IMG}/color-coil.jpg",
            "badges": [
                {"label": "O / D / DD / EDD / IF", "hl": True}, {"label": "Full Hard to Skin-Passed"},
                {"label": "Bright · Matte · Dull Finish"},
            ],
            "headers": ["Parameter", "Specification"],
            "rows": [
                ["Thickness", "0.30 mm – 3.00 mm (± 0.02 mm tolerance available)"],
                ["Width", "800 mm – 1,650 mm (slitting to 10 mm)"],
                ["Commercial", "IS 513 Gr. O · ASTM A1008 CS-A/B/C · DC01–DC04 (EN 10130)"],
                ["Drawing & Deep Drawing", "IS 513 Gr. D / DD / EDD · DDS / EDDS (ASTM) · IF Steels"],
                ["High Strength", "HSS grades up to 590 MPa YS for chassis and brackets"],
                ["Mechanical Range", "YS 140–420 MPa · UTS 270–550 MPa · Elongation up to 44%"],
                ["Surface", "Roughness Ra 0.25 – 1.6 µm controlled; anti-fingerprint options"],
            ],
            "datasheets": [{"label": "CR Coils Datasheet (PDF)", "size": "1.5 MB"}],
        },
        {
            "id": "gi", "tab": "Galvanized / Galvalume",
            "eyebrow": "Galvanized (GI) & Galvalume (GL)",
            "name": "Corrosion Protection Engineered for Decades",
            "text": ("Continuous hot-dip lines with air-knife coating control, zinc or 55% Al-Zn alloy baths, "
                     "and skin passing for a spangle-free roofing surface."),
            "image": f"{IMG}/gi-coil.jpg",
            "badges": [
                {"label": "Z60 – Z275", "hl": True}, {"label": "AZ70 – AZ150"},
                {"label": "Regular / Zero / Minimized Spangle"}, {"label": "Chromated · Oiled · Passivated"},
            ],
            "headers": ["Parameter", "GI (Zinc)", "GL (55% Al-Zn)"],
            "rows": [
                ["Thickness", "0.20 – 3.00 mm", "0.25 – 1.60 mm"],
                ["Width", "800 – 1,650 mm", "900 – 1,325 mm"],
                ["Coating", "60 – 275 g/m² (double side)", "70 – 150 g/m² (AZ)"],
                ["Standards", "IS 277 · ASTM A653 · EN 10346", "IS 15965 · ASTM A792 · AS 1397"],
                ["Grades", "CQ / DQ / DD / Full Hard (550 MPa)", "Grade 33 / 37 / 50 · Structural 550 MPa"],
                ["Typical Life (coastal)", "15–25 years", "25–40 years (2–4× zinc)"],
            ],
            "datasheets": [{"label": "GI Coils Datasheet", "size": "1.2 MB"}, {"label": "GL / Galvalume Datasheet", "size": "1.3 MB"}],
        },
        {
            "id": "cc", "tab": "Colour Coated",
            "eyebrow": "Colour Coated Coils (PPGI / PPGL)",
            "name": "Architecture-Grade Aesthetics, Coil Form",
            "text": ("5-coat systems — pretreatment, primer, top coat and backing — cured in our 300,000 TPA "
                     "line, with online colour matching and film thickness control."),
            "image": f"{IMG}/color-coil.jpg",
            "badges": [
                {"label": "200+ RAL Shades", "hl": True}, {"label": "Polyester · SMP · PVDF"},
                {"label": "Gloss / Matte / Textured"}, {"label": "Up to 25-Year Warranty"},
            ],
            "headers": ["Parameter", "Specification"],
            "rows": [
                ["Base", "GI (PPGI) or GL (PPGL), full-hard substrate"],
                ["Thickness", "0.25 – 1.30 mm (total coated)"],
                ["Paint Systems", "PE 15–20 µm · SMP 18–25 µm · PVDF 22–27 µm topside; 5–7 µm backer"],
                ["Standards", "IS 17252 / IS 17253 · ASTM A755 · EN 10169"],
                ["Specialty", "Anti-microbial, solar-reflective (cool roof), wood/marble printed finishes"],
                ["Testing", "T-bend, impact, MEK rub, QUV & salt-spray (1,000 h+) certified lots"],
            ],
            "datasheets": [{"label": "PPGI / PPGL Datasheet", "size": "2.1 MB"}, {"label": "Shade Card & Warranty Terms", "size": "3.4 MB"}],
        },
        {
            "id": "ss", "tab": "Stainless Steel",
            "eyebrow": "Stainless Steel Coils",
            "name": "Hygienic, Corrosion-Proof, Beautiful",
            "text": ("AOD-refined 200/300/400-series stainless coils from our Hazira facility, annealed, "
                     "pickled and bright-annealed to food-grade and architectural finishes."),
            "image": f"{IMG}/lab.jpg",
            "badges": [
                {"label": "AISI 201 · 304 · 316L", "hl": True}, {"label": "430 · 409 · 410"},
                {"label": "2B · BA · No.4 · HL · Matte"},
            ],
            "headers": ["Parameter", "Specification"],
            "rows": [
                ["Thickness", "0.30 – 6.00 mm (foil gauge on request)"],
                ["Width", "700 – 1,550 mm"],
                ["Austenitic", "201 · 202 · 304 / 304L · 316 / 316L · 321 — ASTM A240 / EN 10088-2"],
                ["Ferritic / Martensitic", "409M (auto exhaust) · 430 (appliance) · 410S — weldable, cost-optimized"],
                ["Finishes", "2B · BA · No.4 · Hairline · Embossed · Decoiled & PVC-film protected"],
                ["Certification", "PED 2014/68/EU · EN 10204 3.1 MTC on every lot"],
            ],
            "datasheets": [{"label": "Stainless Steel Datasheet", "size": "1.9 MB"}],
        },
        {
            "id": "crgo", "tab": "Electrical Steel",
            "eyebrow": "Electrical Steel Coils (CRGO / CRNGO)",
            "name": "The Core of Every Transformer & Motor",
            "text": ("Grain-oriented and non-oriented electrical steel with tightly controlled losses and "
                     "permeability — laser-scribed, insulating-coated and slit to lamination width."),
            "image": f"{IMG}/casting.jpg",
            "badges": [
                {"label": "CGO: 30M130 – 35M170", "hl": True}, {"label": "CRNGO: 470–800 grades"},
                {"label": "C5 · Carlite Insulation"},
            ],
            "headers": ["Parameter", "Specification"],
            "rows": [
                ["CRGO Thickness", "0.23 / 0.27 / 0.30 / 0.35 mm — core loss ≤ 1.30 W/kg at 1.7 T, 50 Hz (P17)"],
                ["CRNGO Thickness", "0.35 / 0.50 / 0.65 mm — 470 · 530 · 600 · 800 grades"],
                ["Width", "Mother coil 1,000 mm; slit to 5 – 1,030 mm"],
                ["Standards", "IEC 60404-8 · JIS C 2552 · ASTM A677 / A683"],
                ["Applications", "Power & distribution transformers, EV traction motors, alternators, ballasts"],
                ["Services", "Laser scribing, stress-relief anneal guidance, lamination design support"],
            ],
            "datasheets": [{"label": "CRGO Grade Chart", "size": "1.0 MB"}],
        },
        {
            "id": "ahss", "tab": "Auto AHSS",
            "eyebrow": "Advanced High-Strength Steel (Auto)",
            "name": "Lighter Cars, Stronger Safety Cells",
            "text": ("Dual-phase and complex-phase grades from our continuous annealing line, engineered for "
                     "crash performance at lower vehicle weight — with IATF 16949 lot discipline."),
            "image": f"{IMG}/hot-mill.jpg",
            "badges": [
                {"label": "DP590 – DP1180", "hl": True}, {"label": "CP & TRIP grades"}, {"label": "CHQL Supply"},
            ],
            "headers": ["Parameter", "Specification"],
            "rows": [
                ["Grades", "DP590 · DP780 · DP980 · DP1180 · CP800 · TRIP780 — VDA 239-100 aligned"],
                ["Thickness", "0.60 – 2.50 mm CR; up to 6 mm hot rolled AHSS"],
                ["Formability", "n-value up to 0.21, hole-expansion ratios engineered per grade"],
                ["Surface", "Galvannealed (GA), GI, or bare CR with EDD surface class"],
                ["Program Support", "APQP / PPAP documents, FEA material cards, welding windows"],
            ],
            "datasheets": [{"label": "AHSS Technical Brochure", "size": "2.6 MB"}],
        },
    ],
    "services": [
        {"icon": "slit", "title": "Slitting & Cut-to-Length", "text": "Tolerance ±0.05 mm; sheets 300–6,000 mm long, stagger or straight piling."},
        {"icon": "flask", "title": "Custom Chemistry", "text": "Trial-lot development of new grades in 6–12 weeks through our R&D centre."},
        {"icon": "pack", "title": "Protective Packaging", "text": "VCI paper, PVC film, seaworthy export crates with eye-to-sky or eye-to-wall coils."},
        {"icon": "doc", "title": "Digital Documentation", "text": "MTC via QR-traced portal, EDI invoicing and consignment-level CO₂ footprint data."},
    ],
}

PROCESS = {
    "title": "Ore In. Certified Coil Out.",
    "sub": ("Sixteen connected stages run 24×7 under one production plan — click through each stage below "
            "to see exactly how we make every grade of coil."),
    "stages": [
        {"n": 1, "tag": "Upstream · Captive Supply", "title": "Raw Material Sourcing & Handling",
         "text": ("Iron ore from our captive mines in Karnataka and Odisha arrives by rail along with imported "
                  "coking coal, dolomite, limestone and manganese ore. Automated sampling towers verify chemistry "
                  "at the gate; stacker-reclaimers blend ore into homogeneous beds so the furnace never sees a surprise."),
         "image": f"{IMG}/hero-coils.jpg",
         "metrics": [{"v": "2.8 MTPA", "l": "Ore Handling"}, {"v": "45 days", "l": "Blend Stock Cover"}, {"v": "100%", "l": "Lots Lab Sampled"}]},
        {"n": 2, "tag": "Ironmaking Feed", "title": "Sinter Plant",
         "text": ("Fine ore, fluxes and return fines are fused into porous sinter on our 312 m² sinter machine. "
                  "Sinter gives the blast furnace a high-reducibility feed and lets us recycle plant waste dust "
                  "back into metal — the first circular loop in the chain."),
         "image": f"{IMG}/molten-steel.jpg",
         "metrics": [{"v": "1.2 MTPA", "l": "Sinter Capacity"}, {"v": "312 m²", "l": "Sinter Machine Area"}, {"v": "< 40 mg/Nm³", "l": "Stack Emissions"}]},
        {"n": 3, "tag": "Ironmaking Feed · Byproducts", "title": "Coke Ovens & Byproduct Recovery",
         "text": ("Imported low-ash coking coal is carbonised at 1,100 °C in 52 recovery-type ovens. The coke "
                  "charges the blast furnace; tar, benzol and coke-oven gas are captured for the chemical market "
                  "and for reheating furnaces — nothing is flared."),
         "image": f"{IMG}/molten-steel.jpg",
         "metrics": [{"v": "0.55 MTPA", "l": "Coke Output"}, {"v": "52 ovens", "l": "Battery Capacity"}, {"v": "~180 Nm³/t", "l": "CO Gas Recovery"}]},
        {"n": 4, "tag": "Ironmaking", "title": "Blast Furnace — 1,500 t/day of Hot Metal",
         "text": ("Sinter, coke and flux descend against a 1,150 °C wind-blast; oxygen-enriched combustion and "
                  "coal injection (up to 180 kg/tHM) reduce ore to 4.3% carbon hot metal at 1,480 °C. Two 1,750 m³ "
                  "furnaces feed the steel shop around the clock, with slag granulated for cement."),
         "image": f"{IMG}/molten-steel.jpg",
         "metrics": [{"v": "2 × 1,750 m³", "l": "Furnace Volume"}, {"v": "2.2 MTPA", "l": "Hot Metal"}, {"v": "180 kg/t", "l": "Coal Injection Rate"}]},
        {"n": 5, "tag": "Steelmaking", "title": "Basic Oxygen Furnace (BOF)",
         "text": ("A water-cooled oxygen lance blows 99.6% pure O₂ through molten iron and scrap, burning carbon, "
                  "silicon and phosphorus out in 16 minutes. Sub-lance sensors read carbon and temperature "
                  "in-flight, so every heat lands in its specification window the first time."),
         "image": f"{IMG}/molten-steel.jpg",
         "metrics": [{"v": "2 × 120 t", "l": "Converter Heats"}, {"v": "1.9 MTPA", "l": "Crude Steel"}, {"v": "±0.005%", "l": "End-point Carbon Hit Rate"}]},
        {"n": 6, "tag": "Chemistry Control", "title": "Secondary Refining — LF, RH Degasser & CAS-OB",
         "text": ("Grades are finalised here: the ladle furnace trims chemistry and temperature; the RH degasser "
                  "pulls hydrogen below 1.5 ppm for auto and electrical steels; wire feeding shapes inclusions into "
                  "harmless forms. Electrical and AHSS grades get double refining."),
         "image": f"{IMG}/molten-steel.jpg",
         "metrics": [{"v": "140 grades", "l": "Routinely Refined"}, {"v": "< 1.5 ppm", "l": "Dissolved Hydrogen"}, {"v": "±2 °C", "l": "Tundish Target Control"}]},
        {"n": 7, "tag": "Solidification", "title": "Continuous Slab Casting",
         "text": ("Liquid steel flows through a submerged entry nozzle into water-cooled copper moulds, emerging "
                  "as 200 mm × 900–1,900 mm slabs cut on the fly. Dynamic soft reduction and electromagnetic "
                  "stirring lock in internal soundness; every slab gets a heat number laser-etched on its face."),
         "image": f"{IMG}/casting.jpg",
         "metrics": [{"v": "1.6 MTPA", "l": "Caster Throughput"}, {"v": "9.5 m/min", "l": "Casting Speed"}, {"v": "99.2%", "l": "Slab Yield"}]},
        {"n": 8, "tag": "Rolling Prep", "title": "Slab Reheating Furnaces",
         "text": ("Walking-beam furnaces soak slabs to 1,200–1,250 °C with oxygen-free firing to keep scale loss "
                  "under 0.8%. Combustion air preheaters recover heat from flue gas, cutting furnace fuel by 22% "
                  "versus cold-air baseline."),
         "image": f"{IMG}/hot-mill.jpg",
         "metrics": [{"v": "300 t/hr", "l": "Reheating Rate"}, {"v": "±5 °C", "l": "Discharge Uniformity"}, {"v": "0.8%", "l": "Scale Loss"}]},
        {"n": 9, "tag": "Hot Coils", "title": "1.7 m Hot Strip Mill",
         "text": ("A descaler blast, four roughing passes and seven finishing stands roll the slab to 1.2–25.4 mm; "
                  "laminar cooling sets the microstructure, and twin downcoilers wind coils up to 34 t. Hydraulic "
                  "AGC holds gauge to ±0.05 mm, and laminar curtains customise cooling for dual-phase and pipeline grades."),
         "image": f"{IMG}/hot-mill.jpg",
         "metrics": [{"v": "2.8 MTPA", "l": "HSM Capacity"}, {"v": "18 m/s", "l": "Finishing Speed"}, {"v": "±25 °C", "l": "Coiling Temp Control"}]},
        {"n": 10, "tag": "Surface Prep", "title": "Pickling & Descaling Line (CPL)",
         "text": ("Hot rolled coils run through turbulence HCl pickling that strips mill scale without edge damage, "
                  "then through dual-side oiling. Pickled coils (HRPO) ship directly to tube makers, or continue to "
                  "the tandem mill. Acid is regenerated on-site — 98% closed loop."),
         "image": f"{IMG}/hero-coils.jpg",
         "metrics": [{"v": "1.6 MTPA", "l": "Pickling Capacity"}, {"v": "98%", "l": "Acid Regeneration"}, {"v": "0 defects", "l": "Over-pickled Edges Target"}]},
        {"n": 11, "tag": "Thin & Tight", "title": "Tandem Cold Rolling Mill",
         "text": ("Five stands reduce the strip up to 85% in one pass at 1,350 m/min, with automatic flatness "
                  "actuators and laser speed gauges. The result: 0.3 mm foil-gauge strip with gauge tolerance "
                  "within ±0.02 mm and surface roughness engineered per customer dies."),
         "image": f"{IMG}/color-coil.jpg",
         "metrics": [{"v": "1.35 MTPA", "l": "TCM Capacity"}, {"v": "85%", "l": "Max Reduction"}, {"v": "±0.02 mm", "l": "Gauge Tolerance"}]},
        {"n": 12, "tag": "Softening & Structure", "title": "Annealing & Temper Rolling",
         "text": ("Hydrogen batch annealing and a continuous annealing line recrystallise the cold-worked grains "
                  "to hit O/DD/EDD formability; skin-pass rolling then sets final flatness, roughness and "
                  "yield-point behaviour so panels draw without stretcher strains."),
         "image": f"{IMG}/color-coil.jpg",
         "metrics": [{"v": "H₂ 100%", "l": "Batch Anneal Atmosphere"}, {"v": "44%", "l": "Max Elongation (EDD)"}, {"v": "0.25 µm", "l": "Roughness Control"}]},
        {"n": 13, "tag": "Coating", "title": "Continuous Galvanizing & Galvalume Line",
         "text": ("Strip passes degreasing, annealing and a zinc (or 55% Al-Zn) bath at 460 °C; nitrogen knives "
                  "meter the coating from Z60 to Z275. Galvannealing furnaces produce GA for automotive; a temper "
                  "mill and tension levelling guarantee roofing-grade flatness."),
         "image": f"{IMG}/gi-coil.jpg",
         "metrics": [{"v": "0.9 MTPA", "l": "CGL Capacity"}, {"v": "±3 g/m²", "l": "Coating Weight Control"}, {"v": "1,000 h+", "l": "Salt Spray Certified"}]},
        {"n": 14, "tag": "Finishing", "title": "Colour Coating & Painting Line",
         "text": ("On the 300,000 TPA CCL, coil is pretreated, primed, painted (PE / SMP / PVDF) and cured in a "
                  "40 m oven — all under closed-loop VOC capture. Inline spectrophotometers match customer shade "
                  "cards ΔE < 0.8, batch after batch."),
         "image": f"{IMG}/color-coil.jpg",
         "metrics": [{"v": "200+", "l": "RAL & Custom Shades"}, {"v": "ΔE < 0.8", "l": "Colour Match Tolerance"}, {"v": "95%", "l": "VOC Capture & Abatement"}]},
        {"n": 15, "tag": "Quality Gate", "title": "Testing, Inspection & Certification",
         "text": ("Nothing ships on trust. Surface scanners, ultrasonic gauges and the NABL-accredited lab verify "
                  "chemistry, tensile, coating weight and formability per lot; coils pass a final visual-and-"
                  "instrument gate before the digital Mill Test Certificate is minted against the heat number."),
         "image": f"{IMG}/lab.jpg",
         "metrics": [{"v": "1,400+", "l": "Tests Per Day"}, {"v": "100%", "l": "Lots With MTC"}, {"v": "< 0.4%", "l": "Customer Claim Rate"}]},
        {"n": 16, "tag": "Logistics", "title": "Packaging, Warehousing & Dispatch",
         "text": ("Coils are eye-to-sky or eye-to-wall packed with VCI paper, steel banding and wooden skids "
                  "(seaworthy crating for exports), scanned into the yard, and dispatched by our own rakes, trucks "
                  "and the ports of Chennai and Visakhapatnam — with live tracking links for the customer."),
         "image": f"{IMG}/hero-coils.jpg",
         "metrics": [{"v": "98.6%", "l": "On-Time Dispatch"}, {"v": "220 wagons", "l": "Siding Capacity"}, {"v": "40+ countries", "l": "Export Reach"}]},
    ],
    "byproducts": [
        {"icon": "bolt", "title": "Waste Heat Power", "text": "130 MW captive power from blast-furnace and coke-oven gas plus WHR boilers — 62% self-sufficiency."},
        {"icon": "building", "title": "Slag to Cement", "text": "Granulated BF slag sold as GGBS; LD slag becomes aggregates — 97.4% solid waste utilised."},
        {"icon": "spark", "title": "Gas Recovery", "text": "BF, CO and converter gas stored and reused in reheating furnaces and the power plant."},
        {"icon": "drop", "title": "Water Recycling", "text": "5-stage effluent treatment; 94.8% process water recycled, zero liquid discharge certified."},
    ],
    "logistics": {
        "title": "From Yard to Your Gate, Tracked Live",
        "image": f"{IMG}/hero-coils.jpg",
        "ticks": [
            {"title": "Private rail siding", "text": "220-wagon capacity; BOXN rakes to 14 states every week"},
            {"title": "Fleet & ports", "text": "600+ contract trailers; EXW-to-FOB handling via Chennai & Visakhapatnam"},
            {"title": "Warehouse network", "text": "18 service centres holding 2.1 lakh t of ready stock for 48-hour supply"},
            {"title": "Digital tracking", "text": "Consignment portal with GPS, POD and damage-free delivery at 99.7%"},
        ],
    },
}

INFRASTRUCTURE = {
    "title": "A 3.5 MTPA Integrated Complex",
    "sub": ("Every unit — from sinter machine to colour coater — sits inside one fence at Hospet, Karnataka, "
            "with finishing plants at Visakhapatnam and Hazira."),
    "units": [
        {"name": "Sinter Plant", "cap": "312 m² machine · 1.2 MTPA", "text": "Self-fluxing sinter with deep-bed operation and emission-optimised burn-through."},
        {"name": "Blast Furnaces", "cap": "2 × 1,750 m³ · 2.2 MTPA", "text": "Bell-less top, copper staves, 180 kg/t coal injection and cast-house slag granulation."},
        {"name": "BOF Shop", "cap": "2 × 120 t converters · 1.9 MTPA", "text": "Sub-lance dynamic control, OG gas recovery and 12% hot-metal charge flexibility."},
        {"name": "Ladle & RH Degasser", "cap": "LF + 120 t RH", "text": "Vacuum to 0.5 mbar for IF, electrical and AHSS cleanliness windows."},
        {"name": "Continuous Caster", "cap": "1-strand slab caster · 1.6 MTPA", "text": "9.5 m/min, EMS, dynamic soft reduction; slabs 200 × 900–1,900 mm."},
        {"name": "Hot Strip Mill", "cap": "1,700 mm, 7-stand · 2.8 MTPA", "text": "Hydraulic AGC, laminar cooling, downcoilers to 34 t coils; 1.2–25.4 mm."},
        {"name": "Pickling Line + Tandem Mill", "cap": "CPL-TCM · 1.35 MTPA", "text": "Turbulence HCl pickling coupled to a 5-stand mill at 1,350 m/min."},
        {"name": "Annealing", "cap": "HBA + CAL", "text": "100% H₂ batch annealing and a continuous line for EDD/AHSS cycles."},
        {"name": "Galvanizing / GL", "cap": "2 CGLs · 0.9 MTPA", "text": "GI to Z275 and 55% Al-Zn to AZ150 with galvannealing capability."},
        {"name": "Colour Coating Line", "cap": "300,000 TPA", "text": "PE / SMP / PVDF, 40 m cure oven, inline spectrophotometry."},
        {"name": "CRGO / CRNGO Mill", "cap": "200,000 TPA", "text": "Twice-reduced GO with laser scribing; complete insulation coating."},
        {"name": "Captive Power", "cap": "130 MW", "text": "BF/CO gas + WHR boilers + 100 MW renewable PPAs."},
    ],
    "siteStats": [
        {"num": 820, "decimals": 0, "suffix": " acres", "label": "Integrated Campus"},
        {"num": 14, "decimals": 0, "suffix": "", "label": "Major Process Units"},
        {"num": 220, "decimals": 0, "suffix": "", "label": "Wagon Rail Siding"},
        {"num": 94.8, "decimals": 1, "suffix": "%", "label": "Water Recycled"},
    ],
    "locations": {
        "headers": ["Site", "Role", "Capacity"],
        "rows": [
            ["Hospet, Karnataka", "Integrated works — ironmaking to HR & CR", "2.8 MTPA"],
            ["Visakhapatnam, Andhra Pradesh", "Coating complex — CGL, CCL, CRGO mill", "0.5 MTPA"],
            ["Hazira, Gujarat", "Stainless melting & finishing; service centre", "0.2 MTPA"],
        ],
    },
    "image": f"{IMG}/green-plant.jpg",
}

QUALITY = {
    "title": "Zero Defect. Full Traceability.",
    "sub": ("A NABL-accredited central laboratory, line labs on every process, and instruments on every mill — "
            "quality at eShodha is engineered into the product, not inspected in at the end."),
    "policyTitle": "We Do Not Ship Doubt",
    "policyText": ("Every heat, coil and consignment passes a documented quality gate. Our policy is simple: "
                   "verify at source, control in process, certify before dispatch — and chase every claim to "
                   "root cause within 30 days."),
    "image": f"{IMG}/lab.jpg",
    "ticks": [
        {"title": "1,400+ tests daily", "text": "Chemistry, mechanical, coating, metallography and NDT"},
        {"title": "Heat-level traceability", "text": "Scan a QR on any coil to trace it back to the caster cast"},
        {"title": "EN 10204 3.1 / 3.2 certification", "text": "Third-party witness testing with TÜV, SGS and BIS on demand"},
    ],
    "tests": {
        "headers": ["Test", "Equipment / Method", "Standard", "Frequency"],
        "rows": [
            ["Chemistry (OES + C/S analyser)", "Spark OES, combustion C/S — lab & mobile units", "IS 228 / ASTM E415", "Every heat + every ladle trim"],
            ["Tensile & elongation", "600 kN UTM with auto extensiometry", "IS 1608 / ASTM E8", "Every coil"],
            ["Hardness (HRB/HV)", "Rockwell & Vickers benches", "IS 1500 / 1501", "Every 5th coil"],
            ["Coating weight (Zn / Al-Zn)", "Coulometric + XRF online gauge", "IS 4827 / ASTM A90", "Online 100% + lab check per coil"],
            ["Formability (Erichsen / Olsen)", "Cupping testers", "IS 10175", "Drawing grades — every coil"],
            ["Microstructure & inclusions", "Motorised metallographs, image analysis", "ASTM E112 / E45", "Per grade family, daily"],
            ["Surface inspection", "4-camera surface scanner + AI defect classifier", "Internal QSP-07", "100% online on TCM & CGL"],
            ["Dimensional & flatness", "Laser gauges, flatbed + straightness scanners", "IS 1852 / EN 10029", "Online 100%"],
            ["Salt spray (coated)", "Cyclic corrosion chambers", "ASTM B117", "Per coating batch"],
        ],
    },
    "certs": [
        {"name": "ISO 9001:2015", "sub": "Quality Management — Bureau Veritas"},
        {"name": "IATF 16949:2016", "sub": "Automotive QMS"},
        {"name": "ISO 14001:2015", "sub": "Environmental Management"},
        {"name": "ISO 45001:2018", "sub": "Occupational H&S"},
        {"name": "NABL (ISO 17025)", "sub": "Central Lab Accreditation"},
        {"name": "BIS Licences", "sub": "IS 2062 · IS 513 · IS 277 · IS 15965"},
    ],
    "cards": [
        {"icon": "search", "title": "Traceability Portal", "text": "Scan the coil tag QR to view heat chemistry, rolling parameters, test results and CO₂ footprint — audit access for OEMs 24×7."},
        {"icon": "shield", "title": "Claim Resolution", "text": "8D/CAPA process with a 30-day closure promise and 0.4% claim rate across 1.9 million tonnes shipped."},
        {"icon": "team", "title": "Customer Audits", "text": "Hosted 90+ OEM and third-party audits in FY26 alone — 100% approved, 11 vendors rated \"preferred supplier\"."},
    ],
}

INDUSTRIES = {
    "title": "Steel Matched to the Application",
    "sub": "Eight sectors, dedicated key-account engineers, and grades selected for performance — not just availability.",
    "items": [
        {"name": "Automotive & EV", "image": f"{IMG}/hot-mill.jpg",
         "text": "CHQL, DP590–DP1180, IF and CRGO for BIW, panels, exhausts and EV motors. Full APQP/PPAP support and IATF-compliant supply chain.",
         "pills": ["DP590–DP1180", "IF Steels", "CRGO M4/M5", "409M Exhaust"]},
        {"name": "Construction & Infrastructure", "image": f"{IMG}/hero-coils.jpg",
         "text": "Structural HR, GC/GI sheets and PPGL cladding for airports, metros, warehouses and housing; custom lengths and colors.",
         "pills": ["IS 2062 E350", "GI Z275", "PPGL AZ150", "S355JR"]},
        {"name": "White Goods & Appliances", "image": f"{IMG}/color-coil.jpg",
         "text": "Extra-deep-draw CR, EG-equivalent and premium PPGI for refrigerator doors, washer cabinets and AC outdoor units.",
         "pills": ["IS 513 EDD", "PPGI RAL 9003", "0.4–1.2 mm CR"]},
        {"name": "Energy & Solar", "image": f"{IMG}/green-plant.jpg",
         "text": "Galvalume for module mounting structures, HR for wind towers and CRGO for grid transformers powering the transition.",
         "pills": ["GL AZ150", "SA 516 Gr.70", "CRGO 30M130"]},
        {"name": "Pipes & Tubes", "image": f"{IMG}/molten-steel.jpg",
         "text": "HRPO and full-hard GI tuned for high-speed ERW mills — plumbing, structural, scaffolding and boiler tubes.",
         "pills": ["SAE 1008 HRPO", "C45", "GI Full Hard"]},
        {"name": "Packaging & Drums", "image": f"{IMG}/gi-coil.jpg",
         "text": "Tin-mill-equivalent CR, black plate and stainless coils for closures, drums and food-contact lines (FDA-compliant finishes).",
         "pills": ["CR 0.18 mm", "SS 304 2B"]},
        {"name": "Shipbuilding & Marine", "image": f"{IMG}/casting.jpg",
         "text": "High-tensile hull plate coils and sections-grade HR with impact testing at –40 °C for deck and hull applications.",
         "pills": ["S355J2 N", "AH36"]},
        {"name": "General Engineering", "image": f"{IMG}/lab.jpg",
         "text": "One-stop merchant mill supply for fabricators, machine builders and cold rollers — 48-hour dispatch from 18 warehouses.",
         "pills": ["IS 2062 E250", "EN8/EN9", "CR Full Hard"]},
    ],
}

SUSTAINABILITY = {
    "title": "Green Steel, Brownfield Delivered",
    "sub": ("Our ESG programme is built into the plant — waste-heat power, closed water loops, and a 2035 "
            "net-zero roadmap audited to global standards."),
    "kpis": [
        {"num": 1.72, "decimals": 2, "suffix": " t", "label": "CO₂ / t Crude Steel"},
        {"num": 31, "decimals": 0, "suffix": "%", "label": "Renewable Electricity"},
        {"num": 97.4, "decimals": 1, "suffix": "%", "label": "Solid Waste Utilised"},
        {"num": 2.1, "decimals": 1, "suffix": "×", "label": "Water Recharged vs Drawn"},
    ],
    "roadmapTitle": "The Path to 2035 Net Zero",
    "roadmapSub": "Milestones are board-approved, budgeted and independently reviewed each year.",
    "bars": [
        {"label": "Renewable share of electricity — now", "val": 31, "display": "31%", "alt": False},
        {"label": "Target 2028 — new 150 MW solar-wind hybrid", "val": 55, "display": "55%", "alt": False},
        {"label": "Scrap share in metallics — now", "val": 34, "display": "34%", "alt": True},
        {"label": "Target 2030 — scrap & HBI share", "val": 45, "display": "45%", "alt": True},
        {"label": "CO₂ intensity reduction vs 2022 baseline by 2030", "val": 25, "display": "–25%", "alt": False},
    ],
    "cards": [
        {"icon": "spark", "title": "Green Hydrogen Trials", "text": "15% H₂ enrichment trial on Blast Furnace 2 targets a further 9% carbon-intensity cut — a first among Indian mid-caps."},
        {"icon": "box", "title": "Circular Materials", "text": "GGBS to cement makers, LD slag to aggregates, dust bricks and acid regeneration keep 97.4% of solids out of landfills."},
        {"icon": "heart", "title": "Community & Safety", "text": "4.2 mn safe man-hours, 26 schools and 9 skilling centres supported, with 1,100+ hospital beds part-funded by the trust."},
    ],
    "reportingTitle": "Audited, Rated, Published",
    "reporting": [
        {"title": "BRSR + GRI aligned reporting", "text": "FY26 sustainability report with limited assurance"},
        {"title": "CDP B rating", "text": "Climate and water disclosures three years running"},
        {"title": "Product carbon footprints", "text": "ISO 14067 PCF per coil available to customers via portal"},
    ],
    "image": f"{IMG}/green-plant.jpg",
}

CAREERS = {
    "title": "Build Your Career Where Steel Is Born",
    "sub": "4,600 engineers, operators and technologists run India's most integrated coil plant — and we're hiring across the chain.",
    "perks": [
        {"icon": "shield", "title": "Safety-first culture", "text": "4.2 mn safe man-hours; every voice has stop-work authority."},
        {"icon": "grad", "title": "Shodha Academy", "text": "200+ hours/year of paid learning — metallurgy to leadership."},
        {"icon": "case", "title": "Real ownership", "text": "Township, ESOPs for band-4+, and relocation support."},
    ],
    "jobs": [
        {"id": 1, "title": "Shift In-charge — Hot Strip Mill", "dept": "Operations", "loc": "Hospet, Karnataka", "type": "Full-time · 8-12 yrs", "cat": "op"},
        {"id": 2, "title": "Manager — BOF Steelmaking", "dept": "Operations", "loc": "Hospet, Karnataka", "type": "Full-time · 10-15 yrs", "cat": "op"},
        {"id": 3, "title": "Automation Engineer (L1/L2)", "dept": "Engineering", "loc": "Hospet, Karnataka", "type": "Full-time · 4-8 yrs", "cat": "eng"},
        {"id": 4, "title": "Metallurgist — CRGO Development", "dept": "R&D", "loc": "Visakhapatnam", "type": "Full-time · 5-10 yrs", "cat": "rnd"},
        {"id": 5, "title": "Quality Engineer — Coated Products", "dept": "Quality", "loc": "Visakhapatnam", "type": "Full-time · 3-7 yrs", "cat": "qa"},
        {"id": 6, "title": "Key Account Manager — Automotive", "dept": "Sales", "loc": "Pune, Maharashtra", "type": "Full-time · 8-12 yrs", "cat": "sales"},
        {"id": 7, "title": "Export Documentation Specialist", "dept": "Sales", "loc": "Bengaluru", "type": "Full-time · 2-5 yrs", "cat": "sales"},
        {"id": 8, "title": "Safety Officer (ISO 45001 Lead)", "dept": "EHS", "loc": "Hospet, Karnataka", "type": "Full-time · 5-9 yrs", "cat": "ehs"},
        {"id": 9, "title": "GET — Mechanical (2026 batch)", "dept": "Graduate Trainee", "loc": "Multiple Locations", "type": "Trainee · Fresher", "cat": "eng"},
        {"id": 10, "title": "Data Scientist — Process AI", "dept": "R&D", "loc": "Bengaluru", "type": "Full-time · 3-6 yrs", "cat": "rnd"},
    ],
    "filters": [
        {"id": "all", "label": "All Roles"}, {"id": "op", "label": "Operations"}, {"id": "eng", "label": "Engineering"},
        {"id": "rnd", "label": "R&D"}, {"id": "qa", "label": "Quality"}, {"id": "sales", "label": "Sales"}, {"id": "ehs", "label": "EHS"},
    ],
    "academy": {
        "title": "From Trainee to Plant Head, In-House",
        "text": ("A 26-week residential induction for GETs, simulator-based operator training, and sponsorship "
                 "for M.Tech and PhD programmes in metallurgy and automation."),
        "image": f"{IMG}/lab.jpg",
        "stats": [
            {"v": "200+", "l": "Learning Hours / Year"}, {"v": "92%", "l": "Internal Fill Rate for Supervisor Roles"},
            {"v": "40", "l": "GETs Onboarded / Year"}, {"v": "17", "l": "Higher-Study Sponsorships Active"},
        ],
    },
}

INVESTORS = {
    "title": "Consistent Growth, Steel-Solid Governance",
    "sub": "Listed since 2015, rated [A+] by two agencies, and paying dividends for 18 consecutive years.",
    "stats": [
        {"num": 18200, "decimals": 0, "prefix": "₹", "suffix": " Cr", "label": "FY26 Revenue"},
        {"num": 2410, "decimals": 0, "prefix": "₹", "suffix": " Cr", "label": "FY26 EBITDA"},
        {"num": 13.2, "decimals": 1, "prefix": "", "suffix": "%", "label": "EBITDA Margin"},
        {"num": 9.50, "decimals": 2, "prefix": "₹", "suffix": "", "label": "Dividend / Share (FY26)"},
    ],
    "financial": {
        "headers": ["Metric (₹ Cr)", "FY22", "FY23", "FY24", "FY25", "FY26"],
        "rows": [
            ["Revenue from operations", "10,240", "12,860", "15,110", "16,905", "18,200"],
            ["EBITDA", "980", "1,650", "1,975", "2,180", "2,410"],
            ["Profit after tax", "410", "820", "1,040", "1,180", "1,340"],
            ["Sales volume (kt)", "1,420", "1,580", "1,710", "1,820", "1,930"],
            ["Net debt / EBITDA", "2.1×", "1.4×", "0.9×", "0.6×", "0.4×"],
            ["EPS (₹)", "8.2", "16.4", "20.8", "23.6", "26.8"],
        ],
    },
    "reports": [
        {"icon": "doc", "title": "Annual Report FY26", "text": "Full integrated report with BRSR and audited financials.", "link": "Download PDF"},
        {"icon": "cal", "title": "Q1 FY27 Results", "text": "Board-approved results, investor deck and transcript.", "link": "View Filings"},
        {"icon": "chart", "title": "Shareholding Pattern", "text": "Promoters 51.2%, institutions 33.8%, retail 15.0% — updated quarterly.", "link": "See Breakup"},
    ],
    "governance": {
        "title": "Independent, Disclosed, On Time",
        "ticks": [
            {"title": "SEBI LODR compliant", "text": "100% on-time filings for 42 consecutive quarters"},
            {"title": "60% independent board", "text": "Two women directors; separate audit & risk committees"},
            {"title": "Credit ratings", "text": "[A+] Stable (CARE) · [A+] Stable (CRISIL) for long-term debt"},
        ],
        "image": f"{IMG}/casting.jpg",
    },
    "announcements": [
        {"icon": "cal", "label": "Board meeting intimation — Q1 FY27 results", "date": "Sep 02, 2026"},
        {"icon": "info", "label": "Credit rating re-affirmation — [A+] Stable", "date": "Aug 19, 2026"},
        {"icon": "chart", "label": "Capex approval — new pickling line, ₹780 Cr", "date": "Jul 28, 2026"},
        {"icon": "download", "label": "48th AGM proceedings & voting results", "date": "Jul 10, 2026"},
    ],
}

NEWS = {
    "title": "The eShodha Newsroom",
    "sub": "Plant milestones, product launches, results and recognitions — straight from the source.",
    "items": [
        {"cat": "Sustainability", "date": "Sep 12, 2026", "title": "eShodha begins 15% green-hydrogen injection trial at Blast Furnace 2",
         "text": "A first-of-its-kind trial targets a 9% cut in blast-furnace carbon intensity by December.", "image": f"{IMG}/green-plant.jpg"},
        {"cat": "Expansion", "date": "Aug 30, 2026", "title": "New 300,000 TPA colour-coating line commissioned at Visakhapatnam",
         "text": "The line adds PVDF capability and doubles our premium PPGL output.", "image": f"{IMG}/color-coil.jpg"},
        {"cat": "Recognition", "date": "Aug 08, 2026", "title": "Hot Strip Mill wins National Safety Excellence Award 2026",
         "text": "Recognised for 4.2 million consecutive safe man-hours across the division.", "image": f"{IMG}/hot-mill.jpg"},
        {"cat": "Products", "date": "Jul 21, 2026", "title": "CRGO M4 grade passes type test at three transformer OEMs",
         "text": "Domestic CRGO for power transformers takes a step toward import substitution.", "image": f"{IMG}/casting.jpg"},
        {"cat": "Corporate", "date": "Jul 02, 2026", "title": "FY26 results: revenue up 7.7%, highest-ever coil volumes",
         "text": "EBITDA at ₹2,410 Cr with net debt down to 0.4×.", "image": f"{IMG}/hero-coils.jpg"},
        {"cat": "Export", "date": "Jun 14, 2026", "title": "First GI consignment shipped to the Australian roofing market",
         "text": "AZ150 Galvalume clears AS 1397 certification for the Sydney metro project.", "image": f"{IMG}/gi-coil.jpg"},
    ],
    "media": {
        "title": "Press Kit & Enquiries",
        "text": ("High-res images, plant b-roll, leadership bios and fact sheets are available on request. "
                 "We respond to media queries within one business day."),
        "box": {"b": "press@eshodhaindustries.com", "l": "Corporate Communications · +91 80 4700 1200"},
        "image": f"{IMG}/molten-steel.jpg",
    },
}

CONTACT = {
    "title": "Let's Talk Steel",
    "sub": "Quotes, samples, plant tours, dealer enquiries or careers — one form away. Technical offers within 24 hours.",
    "tiles": [
        {"icon": "phone", "title": "Sales & Quotes", "lines": ["1800 419 4567 (toll-free)", "sales@eshodhaindustries.com"]},
        {"icon": "pin", "title": "Head Office", "lines": ["eShodha House, ITPL Main Road,", "Whitefield, Bengaluru 560066"]},
        {"icon": "clock", "title": "Response Time", "lines": ["Technical offers < 24 h", "General queries < 8 h"]},
    ],
    "rfq": {
        "title": "Tell Us Exactly What You Need",
        "text": "The more precise your spec, the sharper our offer. Fields marked * are required.",
        "productOptions": ["Hot Rolled (HR / HRPO)", "Cold Rolled (CR)", "Galvanized (GI)", "Galvalume (GL)",
                           "Colour Coated (PPGI/PPGL)", "Stainless Steel", "Electrical Steel (CRGO/CRNGO)", "Auto AHSS"],
    },
    "dealer": {
        "title": "Become a Channel Partner",
        "text": ("We appoint dealers for GI/GL and colour-coated products in open territories. "
                 "Eligibility: existing steel trade experience and warehousing."),
    },
    "tour": {
        "title": "Visit the Complex",
        "text": ("Customer audits, student groups and investor visits are hosted every Tuesday and Friday, "
                 "09:30–14:00. PPE is provided; closed shoes required."),
        "ticks": [
            {"title": "What you'll see", "text": "Blast furnace cast house, hot strip mill, coating lines and the central lab"},
            {"title": "How to book", "text": "Email tours@eshodhaindustries.com or use the booking form — confirmation within 48 h"},
            {"title": "Getting here", "text": "Vidyanagar station (12 km) · VIDJ passenger siding · 45 min from Hubballi airport"},
        ],
    },
    "map": {"lat": 12.9784, "lon": 77.7280,
            "embed": "https://www.openstreetmap.org/export/embed.html?bbox=77.6800%2C12.9300%2C77.7800%2C13.0300&layer=mapnik&marker=12.9784%2C77.7280"},
    "offices": [
        {"title": "Hospet Works", "lines": ["Toru Nagara Industrial Area, Hospet, Karnataka 583203"]},
        {"title": "Visakhapatnam Coating Complex", "lines": ["Autonagar Gate, Parawada, AP 531021"]},
        {"title": "Hazira Stainless Unit", "lines": ["SURAT Hazira Road, Gujarat 394270"]},
    ],
    "faqs": [
        {"q": "What is your minimum order quantity?",
         "a": "For HR and CR, 25 t per size/grade; coated products 40 t. Lower trial quantities are possible for new-grade development and samples."},
        {"q": "How fast can you deliver?",
         "a": "Stocked sizes dispatch in 48 hours from our 18 warehouses. Made-to-order coils run 3–5 weeks ex-works, 5–7 weeks delivered to most Indian sites."},
        {"q": "Do you provide Mill Test Certificates and third-party inspection?",
         "a": "Every consignment ships with an EN 10204 3.1 MTC. TÜV, SGS, BIS or customer-representative witness testing can be arranged at our cost for OEM programmes."},
        {"q": "Can you develop a custom grade for us?",
         "a": "Yes — our R&D centre runs a formal 6–12 week trial-lot process covering lab melting, pilot rolling, first-article supply and PPAP-style sign-off."},
        {"q": "Do you export? What are the terms?",
         "a": "We export to 40+ countries on FOB Chennai/Visakhapatnam, CFR or CIF terms with seaworthy crating, COO, PCN and third-party pre-shipment inspection on request."},
    ],
}

def build_payload(path: str):
    """Return the JSON payload for a given page key."""
    payloads = {
        "home": {"company": COMPANY, "home": HOME, "testimonials": TESTIMONIALS,
                 "news": NEWS["items"][:3]},
        "about": {"company": COMPANY, "about": ABOUT},
        "products": {"company": COMPANY, "products": PRODUCTS},
        "process": {"company": COMPANY, "process": PROCESS},
        "infrastructure": {"company": COMPANY, "infrastructure": INFRASTRUCTURE},
        "quality": {"company": COMPANY, "quality": QUALITY},
        "industries": {"company": COMPANY, "industries": INDUSTRIES},
        "sustainability": {"company": COMPANY, "sustainability": SUSTAINABILITY},
        "careers": {"company": COMPANY, "careers": CAREERS},
        "investors": {"company": COMPANY, "investors": INVESTORS},
        "news": {"company": COMPANY, "news": NEWS},
        "contact": {"company": COMPANY, "contact": CONTACT},
    }
    return payloads[path]

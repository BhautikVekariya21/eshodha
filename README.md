# eShodha Industries — Corporate Website

Complete multi-page website for **eShodha Industries**, a fictional integrated steel manufacturer producing every grade of steel coil end-to-end (iron ore → sinter → blast furnace → BOF → casting → hot/cold rolling → coating → testing → dispatch).

**Typography:** 100ans-serif (Inter + Barlow Condensed).

## Pages

| Page | File | Scenario covered |
|---|---|---|
| Home | `index.html` | Hero, portfolio, mini process flow, testimonials, news |
| About | `about.html` | Story, vision/mission, milestones, leadership |
| Products | `products.html` | All coil grades: HR, CR, GI/GL, PPGI/PPGL, SS, CRGO, AHSS + spec tables & datasheets |
| Operations | `process.html` | Interactive 16-stage end-to-end manufacturing process, byproducts, logistics |
| Infrastructure | `infrastructure.html` | Plant units, capacities, locations |
| Quality | `quality.html` | Test matrix, accreditations, traceability |
| Industries | `industries.html` | 8 sectors served with grade recommendations |
| Sustainability | `sustainability.html` | ESG KPIs, net-zero roadmap, circularity |
| Careers | `careers.html` | Perks, filterable job board, Shodha Academy |
| Investors | `investors.html` | Financials, reports, governance, announcements |
| News | `news.html` | Press releases, media contact |
| Contact | `contact.html` | RFQ form, dealer enquiry, plant tour booking, FAQs, map |

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

`tools/build_pages.py` regenerates the 8 inner pages (shared header/footer) after edits.

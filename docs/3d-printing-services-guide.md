![Banner](../assets/banner-3d-print.png)

# Online 3D Printing Services — Capacities, Materials & Pricing Guide

A comprehensive reference for choosing the right online 3D printing service, technology, material, and finish for your project. Covers the 6 services integrated with `generate-3d-print.js`.

---

## Services at a Glance

| Service | Founded | HQ | Integration | API | Materials | Min. Order | Certifications |
|---|---|---|---|---|---|---|---|
| **[Shapeways](https://www.shapeways.com)** | 2007 | New York, USA | Full API | OAuth2 REST | 40+ | 1 part | ISO 9001:2015 |
| **[Sculpteo](https://www.sculpteo.com)** (BASF) | 2009 | Villejuif, France | Full API | REST (no auth) | 100+ | 1 part | ISO 9001, ISO 13485 |
| **[Materialise](https://www.materialise.com)** | 1990 | Leuven, Belgium | Browser | — | 20+ | 1 part | ISO 9001, ISO 13485, IATF 16949 |
| **[Xometry](https://www.xometry.com)** | 2013 | Bethesda, USA | Browser | — | 60+ | 1 part | ISO 9001, ISO 13485, AS9100D, IATF 16949 |
| **[PCBWay](https://www.pcbway.com)** | 2003 | Shenzhen, China | Browser | — | 30+ | 1 part | ISO 9001, UL, IPC |
| **[Craftcloud](https://craftcloud3d.com)** | 2018 | Hamburg, Germany | Browser | — | 246+ | 1 part | Aggregator (vendor certs vary) |

### Service Strengths

| Service | Best For | Unique Value |
|---|---|---|
| **Shapeways** | Consumer products, jewelry, small to medium batches | Wax casting metals (gold, silver, platinum), full-color nylon |
| **Sculpteo** | Professional prototyping, production runs | BASF-backed, 3 production speed tiers, free upload API |
| **Materialise** | Medical, aerospace, certified production | 30+ years of AM expertise, biocompatible certified |
| **Xometry** | Engineering prototypes, multi-process | AI-powered instant quoting, CNC + injection molding too |
| **PCBWay** | Budget-friendly, PCB + 3D combo orders | Very competitive prices, integrated with PCB manufacturing |
| **Craftcloud** | Price comparison shopping | Aggregates 150+ manufacturers, always shows cheapest option |

---

## 3D Printing Technologies

### Technology Comparison

| Technology | Acronym | Material Type | Accuracy | Min. Wall | Layer Height | Support Needed | Best For |
|---|---|---|---|---|---|---|---|
| Fused Deposition Modeling | FDM | Thermoplastic filament | ±0.3% (±0.2 mm) | 1.0 mm | 100–300 µm | Yes (breakaway) | Prototyping, large parts, low cost |
| Selective Laser Sintering | SLS | Nylon powder | ±0.3% (±0.3 mm) | 0.8 mm | 60–120 µm | No (powder bed) | Functional parts, complex geometry |
| HP Multi Jet Fusion | MJF | Nylon/TPU powder | ±0.3% (±0.3 mm) | 0.8 mm | 80 µm | No (powder bed) | Production runs, speed |
| Stereolithography | SLA | Photopolymer resin | ±0.2% (±0.2 mm) | 0.6 mm | 25–100 µm | Yes (resin supports) | High detail, smooth surfaces |
| Digital Light Processing | DLP | Photopolymer resin | ±0.2% (±0.2 mm) | 0.6 mm | 25–100 µm | Yes | High detail, small parts |
| Direct Metal Laser Sintering | DMLS/SLM | Metal powder | ±0.2% (±0.2 mm) | 1.0 mm | 20–60 µm | Yes (metal supports) | Functional metal parts |
| Binder Jetting | BJ | Metal/ceramic powder | ±5–7% (±0.5 mm) | 0.8 mm | 50–200 µm | No | High-volume metal, full color |
| Material Jetting | MJ/PolyJet | Photopolymer drops | ±0.2% (±0.1 mm) | 1.0 mm | 16–30 µm | Yes (gel supports) | Multi-material, full color |
| Carbon DLS | DLS | Resin (RPU/EPU) | ±0.2% (±0.2 mm) | 2.5 mm | N/A (continuous) | Yes | Production elastomers |
| Lost Wax Casting | LWC | Precious metals | ±5% (±0.35 mm) | 1.0 mm | N/A (cast) | N/A | Jewelry, precious metals |

### Maximum Build Volumes by Service

| Service | FDM | SLS | MJF | SLA | DMLS |
|---|---|---|---|---|---|
| **Shapeways** | 914 × 610 × 914 mm | 650 × 350 × 550 mm | 380 × 285 × 380 mm | 736 × 635 × 533 mm | 250 × 250 × 325 mm |
| **Sculpteo** | ~300 × 300 × 300 mm | 340 × 340 × 600 mm | 380 × 285 × 380 mm | 800 × 800 × 550 mm | 250 × 250 × 325 mm |
| **Xometry** | 914 × 610 × 914 mm | 550 × 550 × 750 mm | 380 × 285 × 380 mm | 736 × 635 × 533 mm | 250 × 250 × 325 mm |
| **PCBWay** | 500 × 500 × 500 mm | 420 × 420 × 500 mm | 380 × 284 × 380 mm | 600 × 600 × 400 mm | 250 × 250 × 300 mm |

---

## Materials & Estimated Pricing

> **Note**: Prices are approximate ranges based on publicly available data (March 2026). Actual pricing depends on part geometry, volume, bounding box, quantity, finish, and delivery speed. Always upload your model for an exact quote.

### Plastics — FDM

| Material | Properties | Min. Wall | Accuracy | Price Range | Available At |
|---|---|---|---|---|---|
| **PLA** | Low cost, biodegradable, visual | 1.0 mm | ±0.3% (±0.2 mm) | $0.05–0.15/cm³ | Craftcloud, PCBWay |
| **ABS** | Durable, impact resistant | 1.0 mm | ±0.3% (±0.2 mm) | $0.08–0.20/cm³ | Shapeways, Craftcloud, PCBWay, Xometry |
| **PETG** | Chemical resistant, strong | 1.0 mm | ±0.3% (±0.2 mm) | $0.08–0.20/cm³ | Craftcloud, PCBWay |
| **ASA** | UV resistant, outdoor use | 1.0 mm | ±0.3% (±0.2 mm) | $0.10–0.25/cm³ | Craftcloud, PCBWay |
| **Nylon (FDM)** | Strong, heat resistant | 1.0 mm | ±0.3% (±0.2 mm) | $0.15–0.35/cm³ | Craftcloud, Xometry |
| **Polycarbonate** | Impact & heat resistant | 1.0 mm | ±0.3% (±0.3 mm) | $0.20–0.40/cm³ | Craftcloud, Xometry |
| **TPU (Flexible)** | Rubber-like, Shore A60–D70 | 1.0 mm | ±0.4% (±0.2 mm) | $0.15–0.35/cm³ | Craftcloud, PCBWay |
| **ULTEM 9085** | Flame retardant, aerospace | 1.0 mm | ±0.3% (±0.3 mm) | $0.80–2.00/cm³ | Shapeways, Xometry, Craftcloud |
| **ULTEM 1010** | Highest heat/chem resistance | 1.0 mm | ±0.3% (±0.2 mm) | $1.00–2.50/cm³ | Xometry, Craftcloud |
| **PEEK** | Ultra high performance | 1.0 mm | ±0.3% (±0.2 mm) | $2.00–5.00/cm³ | Craftcloud, Xometry |

### Plastics — SLS (Powder Bed)

| Material | Properties | Min. Wall | Accuracy | Price Range | Available At |
|---|---|---|---|---|---|
| **Nylon PA12** | Versatile workhorse | 0.8 mm | ±0.3% (±0.3 mm) | $0.15–0.50/cm³ | All services |
| **Nylon PA11** | Bio-based, higher toughness | 0.8 mm | ±0.3% (±0.3 mm) | $0.20–0.60/cm³ | Shapeways, Sculpteo, Craftcloud |
| **Glass-Filled Nylon** | High stiffness, heat resist | 0.8 mm | ±0.3% (±0.3 mm) | $0.25–0.70/cm³ | Sculpteo, Craftcloud |
| **Carbon-Filled Nylon** | Lightweight, very stiff | 0.8 mm | ±0.3% (±0.3 mm) | $0.30–0.80/cm³ | Shapeways, Craftcloud |
| **Flexible TPU (SLS)** | Rubber-like, durable | 0.8 mm | ±1.8% (±1.5 mm) | $0.30–0.80/cm³ | Sculpteo, Craftcloud |
| **Polypropylene** | Chemical resistant, durable | 0.8 mm | ±0.3% (±0.3 mm) | $0.25–0.65/cm³ | Sculpteo, Craftcloud |
| **Alumide** | Nylon + aluminum, metallic | 0.8 mm | ±0.3% (±0.3 mm) | $0.30–0.70/cm³ | Sculpteo, Craftcloud |

### Plastics — MJF (HP Multi Jet Fusion)

| Material | Properties | Min. Wall | Accuracy | Price Range | Available At |
|---|---|---|---|---|---|
| **MJF Nylon PA12** | Strong, detailed, fast | 0.8 mm | ±0.3% (±0.3 mm) | $0.15–0.45/cm³ | Shapeways, Sculpteo, Xometry, Craftcloud |
| **MJF Nylon PA11** | Bio-derived, ductile | 0.8 mm | ±0.3% (±0.3 mm) | $0.20–0.55/cm³ | Shapeways, Sculpteo, Craftcloud |
| **MJF PA12 Glass Beads** | Extra stiffness | 0.8 mm | ±0.3% (±0.3 mm) | $0.20–0.55/cm³ | Shapeways, Craftcloud |
| **MJF TPU** | Flexible, rubber-like | 0.8 mm | ±0.3% (±0.3 mm) | $0.30–0.80/cm³ | Shapeways, Craftcloud |
| **MJF Full Color PA12** | Vibrant full-color prints | 0.8 mm | ±0.2% (±0.1 mm) | $0.30–0.80/cm³ | Shapeways, Craftcloud |
| **MJF Polypropylene** | Durable, chemical resistant | 0.8 mm | ±0.3% (±0.3 mm) | $0.25–0.60/cm³ | Shapeways, Craftcloud |

### Resins — SLA / DLP

| Material | Properties | Min. Wall | Accuracy | Price Range | Available At |
|---|---|---|---|---|---|
| **Standard Resin** | High detail, smooth | 0.6 mm | ±0.2% (±0.2 mm) | $0.10–0.30/cm³ | All services |
| **Tough Resin** | Strong, functional | 0.6 mm | ±0.2% (±0.2 mm) | $0.15–0.40/cm³ | Craftcloud, Xometry |
| **High-Detail Resin** | Finest details | 0.6 mm | ±0.1% (±0.15 mm) | $0.20–0.50/cm³ | Craftcloud, Xometry |
| **Flexible Resin** | Rubber-like, Shore A80 | 0.6 mm | ±0.3% (±0.3 mm) | $0.20–0.50/cm³ | Craftcloud |
| **Transparent Resin** | Optically clear | 0.6 mm | ±0.2% (±0.2 mm) | $0.15–0.40/cm³ | Craftcloud, Xometry |
| **Castable Resin** | Jewelry, wax-out casting | 0.6 mm | ±0.4% (±0.4 mm) | $0.25–0.60/cm³ | Craftcloud |
| **High-Temp Resin** | Heat deflection >200°C | 0.6 mm | ±0.2% (±0.2 mm) | $0.30–0.70/cm³ | Craftcloud, Xometry |
| **BioMed Resin** | Biocompatible, certified | 0.6 mm | ±0.4% (±0.4 mm) | $0.40–1.00/cm³ | Craftcloud |
| **Somos GP Plus** | Industrial SLA | 0.6 mm | ±0.2% (±0.2 mm) | $0.25–0.60/cm³ | Shapeways |

### Metals — DMLS / SLM

| Material | Properties | Min. Wall | Accuracy | Price Range | Available At |
|---|---|---|---|---|---|
| **316L Stainless Steel** | Corrosion resistant | 1.0 mm | ±0.3% (±0.3 mm) | $1.50–5.00/cm³ | Craftcloud, Xometry, PCBWay |
| **17-4 PH Stainless** | High strength, hardened | 1.0 mm | ±0.2% (±0.3 mm) | $2.00–6.00/cm³ | Shapeways, Craftcloud, Xometry |
| **Aluminum (AlSi10Mg)** | Lightweight, strong | 1.0 mm | ±0.2% (±0.2 mm) | $2.00–7.00/cm³ | Shapeways, Craftcloud, Xometry, PCBWay |
| **Titanium (Ti6Al4V)** | Aerospace-grade, strong | 1.0 mm | ±0.2% (±0.2 mm) | $5.00–15.00/cm³ | Craftcloud, Xometry, PCBWay |
| **Inconel 718** | High-temp superalloy | 1.0 mm | ±0.3% (±0.2 mm) | $6.00–18.00/cm³ | Craftcloud, Xometry |
| **Maraging Steel** | Tool-grade hardness | 1.0 mm | ±0.2% (±0.1 mm) | $3.00–8.00/cm³ | Craftcloud |
| **Copper** | High conductivity | 1.0 mm | ±5% (±0.2 mm) | $4.00–12.00/cm³ | Shapeways, Craftcloud |

### Metals — Binder Jetting

| Material | Properties | Min. Wall | Accuracy | Price Range | Available At |
|---|---|---|---|---|---|
| **316L Steel (BJ)** | Cost-effective metal | 0.8 mm | ±7% (±0.75 mm) | $0.80–3.00/cm³ | Shapeways, Craftcloud, Xometry |
| **17-4 PH Steel (BJ)** | Stronger, post-sintered | 0.8 mm | ±5% (±0.5 mm) | $1.00–3.50/cm³ | Shapeways, Craftcloud, Xometry |
| **420/BR Steel** | Low cost, bronze infused | 0.8 mm | ±5% (±0.5 mm) | $0.80–2.50/cm³ | Craftcloud |

### Precious Metals — Wax Casting

| Material | Properties | Price Range | Available At |
|---|---|---|---|
| **Sterling Silver** | Jewelry standard | $15–40/cm³ | Shapeways, Craftcloud |
| **Brass** | Affordable, golden tone | $5–15/cm³ | Shapeways, Craftcloud |
| **Bronze** | Classic, cost-effective | $5–15/cm³ | Shapeways, Craftcloud |
| **14k Gold** | Fine jewelry | $200–600/cm³ | Shapeways, Craftcloud |
| **18k Gold** | Premium jewelry | $300–800/cm³ | Shapeways, Craftcloud |
| **Platinum** | Highest-end jewelry | $500–1500/cm³ | Shapeways, Craftcloud |
| **Gold Plated Brass** | Budget gold look | $8–25/cm³ | Shapeways |

### Specialty & Advanced Materials

| Material | Technology | Properties | Min. Wall | Price Range | Available At |
|---|---|---|---|---|---|
| **Carbon DLS RPU 70** | DLS | Production-grade rigid | 2.5 mm | $0.40–1.00/cm³ | Xometry |
| **Carbon DLS EPU** | DLS | Elastomeric polyurethane | 2.5 mm | $0.50–1.20/cm³ | Xometry |
| **High-Definition Full Color** | PolyJet | Multi-material, full color | 1.0 mm | $0.50–1.50/cm³ | Shapeways, Xometry, Craftcloud |
| **Silicone Rubber** | Inkjet | Flexible, Shore A35–A65 | 0.6 mm | $1.00–3.00/cm³ | Craftcloud |
| **Ceramic (Zirconia)** | LCM | Biocompatible, strong | — | $5.00–20.00/cm³ | Craftcloud |
| **Food Safe PA12** | SLS/MJF | Certified food contact | 0.8 mm | $0.25–0.70/cm³ | Craftcloud |
| **Conductive PLA** | FDM | Electrically conductive | 1.0 mm | $0.20–0.50/cm³ | Craftcloud |
| **Wood-Filled PLA** | FDM | Wood texture/appearance | 1.0 mm | $0.10–0.30/cm³ | Craftcloud |

---

## Production Speed & Delivery

### Lead Times by Service

| Service | Economy | Standard | Express | Shipping |
|---|---|---|---|---|
| **Shapeways** | — | 5–10 business days | 3–5 business days | Global (DHL, UPS) |
| **Sculpteo** | ~15 days (SLS/MJF) | 2–15 days | 2 days (SLS, SLA only) | Global (DHL, UPS, FedEx) |
| **Materialise** | — | 5–15 business days | 3–5 business days | Global |
| **Xometry** | — | 3–10 business days | 1–3 business days | Free US shipping |
| **PCBWay** | — | 3–7 business days | 1–3 business days | Global (DHL, FedEx, EMS) |
| **Craftcloud** | — | 5–15 business days | 3–5 business days | Global (vendor-dependent) |

### Production Speed Impact on Price

| Tier | Typical Premium | Best For |
|---|---|---|
| **Economy** | Up to 30% cheaper than standard | Non-urgent batches, SLS PA12 and MJF parts |
| **Standard** | Base price | Most projects |
| **Express** | 30–50% more than standard | Urgent prototypes, deadline-critical parts |

---

## Design Guidelines Summary

### Universal Rules

| Parameter | FDM | SLS/MJF | SLA/DLP | DMLS |
|---|---|---|---|---|
| **Min. wall thickness** | 1.0 mm | 0.8 mm | 0.6 mm | 1.0 mm |
| **Min. feature size** | 0.5 mm | 0.3 mm | 0.1–0.2 mm | 0.2 mm |
| **Min. clearance** | 0.5 mm | 0.5 mm | 0.3 mm | 0.5 mm |
| **Supports required** | Yes | No | Yes | Yes |
| **Interlocking parts** | No | Yes | No | No |
| **Max. overhang angle** | 45° | Any | Any (with supports) | 45° |
| **Escape holes (hollow)** | 4 mm | 4 mm | 3 mm | 3 mm |
| **Text (embossed)** | 0.5 mm H × W | 0.5 mm H × W | 0.3 mm H × W | 0.5 mm H × W |

### File Format Compatibility

| Format | Description | Supported By |
|---|---|---|
| **STL** | Standard tessellation language | All services (universal) |
| **OBJ** | Wavefront, supports color | Shapeways, Sculpteo, Craftcloud |
| **3MF** | 3D Manufacturing Format | Most services |
| **STEP / STP** | CAD interchange | Xometry, PCBWay |
| **IGES / IGS** | CAD interchange | Xometry, PCBWay |
| **GLB / GLTF** | 3D web format† | Shapeways (limited) |

> † Convert GLB to STL for maximum compatibility using `generate-3d.js --stl`

---

## Finishing Options & Pricing Impact

| Finish | Description | Price Impact | Available For |
|---|---|---|---|
| **Raw / As-printed** | Standard output, no post-processing | Base price | All technologies |
| **Sandblasted** | Matte surface, uniform texture | +$0–2/part | SLS, MJF, DMLS |
| **Shot Peened** | Slight gloss, smoother | +$0–3/part | SLS, MJF |
| **Polished (mechanical)** | Smoother, slight shine | +$2–10/part | SLS, MJF, metals |
| **Vapor Smoothed** | Chemical smoothing, glossy | +$3–15/part | SLS PA12/PA11, MJF |
| **Dyed (single color)** | Black, blue, red, green, etc. | +$2–8/part | SLS, MJF |
| **Painted** | Custom color, spray applied | +$10–50/part | All plastics |
| **Electroplated** | Metal coating (nickel, chrome) | +$15–50/part | SLS, MJF |
| **Anodized** | Protective oxide layer | +$5–20/part | Aluminum (CNC, DMLS) |
| **Mirror Polished** | High-gloss metal finish | +$10–40/part | Metals |

---

## Cost Optimization Strategies

### 1. Reduce Material Volume
- **Hollow your model** with escape holes (min. 4 mm diameter, 2+ holes)
- **Reduce wall thickness** to minimum guidelines
- **Remove unnecessary internal geometry**

### 2. Minimize Bounding Box
- **Compact designs** cost less — price factors in the space occupied in the printer
- **Nest multiple small parts** into a single print to share bounding box

### 3. Choose the Right Technology
| Need | Best Technology | Why |
|---|---|---|
| Cheapest plastic part | FDM (PLA) | ~$0.05/cm³, lowest material cost |
| Strong functional part | SLS Nylon PA12 | ~$0.15/cm³, no supports, great strength |
| High-detail visual model | SLA Standard Resin | ~$0.10/cm³, excellent surface finish |
| Production quantities | MJF PA12 | Fast, consistent, good price at volume |
| Metal prototype | Binder Jetting 316L | ~$1/cm³, cheaper than DMLS |
| Jewelry | Lost Wax Casting | Only option for gold/silver/platinum |

### 4. Volume Discounts
Most services offer automatic volume pricing:
- **2–10 units**: 5–15% discount typical
- **10–50 units**: 15–25% discount typical
- **50+ units**: 25–40% discount typical + dedicated account manager

### 5. Use Economy Production
Sculpteo's Economy tier can save **up to 30%** on SLS and MJF orders when you don't need rush delivery.

---

## Service-Specific Details

### Shapeways

- **Technologies**: SLS, MJF, FDM, SLA, DMLS, Binder Jetting, Material Jetting, Wax Casting, CNC
- **Unique**: Only service with full wax casting catalog (gold, silver, platinum, brass, bronze, copper)
- **Build Volume (SLS PA12)**: 650 × 350 × 550 mm (standard white)
- **PA12 Accuracy**: ±0.15 mm + ±0.15% of longest axis
- **PA12 Finishes**: Standard (shotpeened), Smooth (vapor), Dyed (9 colors)
- **API**: Full REST API with OAuth2 authentication
- **Website**: [shapeways.com](https://www.shapeways.com)

### Sculpteo (BASF)

- **Technologies**: SLS, MJF, SLA, DLP, DMLS, Binder Jetting
- **Unique**: BASF-backed industrial quality, 3 production tiers (Economy/Standard/Express), free upload API without authentication
- **Build Volume (SLS PA12)**: 340 × 340 × 600 mm
- **Production**:
  - Economy: ~15 days, up to 30% cheaper (SLS/MJF PA12 only, min €10 unit price)
  - Standard: 2–15 days
  - Express: 2 days (SLS, SLA; max 290 × 290 × 290 mm)
- **API**: Public REST API — no authentication needed for upload, pricing, and materials
- **Pricing Formula**: Volume + bounding box + quantity + production speed + finish
- **Locations**: Villejuif (France), Cambridge (MA, USA)
- **Website**: [sculpteo.com](https://www.sculpteo.com)

### Materialise OnSite

- **Technologies**: SLS, SLA, FDM, PolyJet, Metal (DMLS), Vacuum Casting
- **Unique**: 30+ years of AM, leaders in medical/aerospace certification, Design for AM consulting
- **Certifications**: ISO 9001, ISO 13485, IATF 16949, EN/AS 9100
- **Integration**: Browser-based (login required for quoting)
- **Website**: [materialise.com](https://www.materialise.com)

### Xometry

- **Technologies**: SLS, MJF, FDM, SLA, PolyJet, Carbon DLS, DMLS, Binder Jetting + CNC, injection molding, sheet metal
- **Unique**: AI-powered instant quoting engine, broadest manufacturing capability (not just 3D printing), free US shipping
- **Build Tolerances**: Parts up to 24 × 36 × 36 inches without splitting
- **Certifications**: ISO 9001, ISO 13485, AS9100D, IATF 16949, ITAR registered, CMMC Level 2
- **Integration**: Browser-based (instant quote from file upload)
- **Website**: [xometry.com](https://www.xometry.com)

### PCBWay

- **Technologies**: SLA, SLS, MJF, FDM, DMLS, DLP
- **Unique**: Extremely competitive pricing, bundled with PCB/PCBA ordering, fast turnaround from China
- **Material Highlights**: SLA from ~$1/part for small items, metal printing available
- **Integration**: Browser-based upload
- **Website**: [pcbway.com/rapid-prototyping/3d-printing](https://www.pcbway.com/rapid-prototyping/3d-printing/)

### Craftcloud (by All3DP)

- **Technologies**: FDM, SLS, MJF, SLA, DLP, DMLS/SLM, Binder Jetting, Lost Wax Casting, PolyJet, CNC, CFC, Inkjet, LCM + more
- **Unique**: Aggregates 150+ manufacturers worldwide — always shows you the cheapest option for your exact part
- **Materials**: 246+ materials across all technologies (largest catalog of any service)
- **Material Categories**: Plastics (FDM, SLS, MJF), Resins (SLA, DLP), Metals (DMLS, BJ, Casting), Advanced (ceramic, silicone, carbon fiber composites), CNC metals/plastics
- **Additional Services**: CNC machining, laser cutting, sheet metal, vacuum casting, injection molding
- **Integration**: Browser-based upload with instant multi-vendor comparison
- **Website**: [craftcloud3d.com](https://craftcloud3d.com)

---

## CLI Integration

All 6 services are integrated via `generate-3d-print.js`. For a complete end-to-end pipeline from AI-generated 3D model to print service:

```bash
# Step 1: Generate a 3D model from text
node generate-3d.js "a medieval chess knight piece" --model rodin --stl

# Step 2: Get printing quotes from all services
node generate-3d-print.js --file ./media/chess-knight.stl --service all

# Step 3: Get Sculpteo pricing for a specific material
node generate-3d-print.js --file ./media/chess-knight.stl --service sculpteo --material white_plastic

# Step 4: List all available materials at Sculpteo
node generate-3d-print.js --list --service sculpteo

# Step 5: Open browser-based services for comparison
node generate-3d-print.js --file ./media/chess-knight.stl --service craftcloud
```

For API service details and setup instructions, see [generate-3d-print.md](generate-3d-print.md).

---

## Quick Decision Matrix

**"Which service should I use?"**

| If you need... | Use | Why |
|---|---|---|
| Cheapest plastic prototype | **Craftcloud** or **PCBWay** | Price comparison / lowest base prices |
| API-automated quoting | **Sculpteo** | Free REST API, no auth needed |
| Gold/silver jewelry | **Shapeways** | Full wax casting catalog with API |
| Medical-certified parts | **Materialise** | ISO 13485, biocompatible materials |
| Multi-process (3D + CNC + mold) | **Xometry** | Widest manufacturing capabilities |
| Maximum material range | **Craftcloud** | 246+ materials from 150+ vendors |
| Rush delivery (US) | **Xometry** | 1-day expedites, free US shipping |
| Rush delivery (EU) | **Sculpteo** | 2-day express, multiple EU facilities |

---

## Related Documentation

- [generate-3d-print.md](generate-3d-print.md) — CLI tool reference for the print service integration script
- [generate-3d.md](generate-3d.md) — AI 3D model generation with STL output support

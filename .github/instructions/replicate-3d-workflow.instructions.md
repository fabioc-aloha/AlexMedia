---
description: "Replicate 3D generation operational patterns — version hashes, FileOutput SDK, STL scaling, and print service gotchas"
applyTo: "**/generate-3d*,**/generate-3d-print*,**/*3d*"
---

# Replicate 3D Generation — Operational Patterns

**Classification**: Procedural Memory | Debugging Reference  
**Activation**: generate-3d, 3D model, STL, print, Trellis, Rodin, Hunyuan, Sculpteo  
**Source**: Empirically derived from full pipeline run, March 2026

---

## Synapses

- [.github/instructions/image-handling.instructions.md] (High, Extends, Forward) — "image-handling covers 2D Replicate; this covers 3D"
- [docs/3d-design-to-print-workflow.md] (High, Documents, Forward) — "workflow doc this instruction operationalizes"
- [generate-3d.js] (Critical, Governs, Forward) — "script implementation this instruction guards"
- [generate-3d-print.js] (High, Governs, Forward) — "print service script this instruction guards"

---

## Rule 1 — Community Models Need Version Hashes

Replicate `replicate.run("owner/model", ...)` WITHOUT a version hash fails (404) for **community models**.

**Official models** (Rodin = `hyper3d/rodin`) run without a hash — they use a deployment endpoint.  
**Community models** MUST pin a version hash: `owner/model:sha256hash`

**Models in generate-3d.js requiring hashes:**
| Model | Required format |
|-------|----------------|
| trellis | `firtoz/trellis:<hash>` |
| hunyuan | `prunaai/hunyuan3d-2:<hash>` |
| hunyuan2mv | `tencent/hunyuan3d-2mv:<hash>` |
| mvdream | `adirik/mvdream:<hash>` |
| shape | `cjwbw/shap-e:<hash>` |

**To get current hash:**
```powershell
$token = (Get-Content .env | Where-Object {$_ -match 'REPLICATE_API_TOKEN'}) -replace 'REPLICATE_API_TOKEN=',''
Invoke-WebRequest "https://api.replicate.com/v1/models/owner/model/versions" -Headers @{Authorization="Token $token"} -UseBasicParsing | ConvertFrom-Json | Select-Object -ExpandProperty results | Select-Object -First 1 -ExpandProperty id
```

**Audit trigger**: Run this check whenever a model returns 404 on predictions but 200 on the model endpoint.

---

## Rule 2 — Replicate SDK Returns FileOutput Objects, Not Strings

Newer Replicate Node.js SDK (≥1.x) returns `FileOutput` objects, not plain URL strings.  
`url.startsWith("http")` throws `TypeError: url.startsWith is not a function`.

**Fix**: Always normalize output URLs through a helper:
```javascript
function toUrlString(item) {
  if (!item) return "";
  if (typeof item === "string") return item;
  const str = String(item); // FileOutput implements toString() → URL string
  if (str && str !== "[object Object]") return str;
  if (typeof item.url === "function") return String(item.url());
  if (item.url) return String(item.url);
  return "";
}
```

This is already implemented in `generate-3d.js`. Apply the same pattern to any new script that consumes Replicate output.

---

## Rule 3 — AI 3D Models Have No Scale (Always ~1mm Bounding Box)

Every AI 3D model (Trellis, Rodin, Hunyuan, etc.) outputs a mesh with a bounding box of approximately **0.5–1.5 mm** regardless of the real-world object size. This is not an error — the AI has no concept of physical scale.

**Consequence**: Uploading the raw STL to a print service gives nonsensical dimensions and pricing.

**Required step before any print order:**
1. Determine target dimensions (e.g. 90mm × 120mm for a pen cup)
2. Scale the STL: `scale = targetHeight / maxDimension`
3. Save as a new file (e.g. `pen-cup-print-ready.stl`)

**Quick inline Node.js scaler** (no dependencies):
```javascript
// Scale STL binary to target max dimension (mm)
const buf = fs.readFileSync(src);
const numTri = buf.readUInt32LE(80);
// Find current bounding box
let maxDim = 0;
for (let i = 0; i < numTri; i++) {
  const base = 84 + i * 50 + 12;
  for (let v = 0; v < 3; v++) {
    const x = Math.abs(buf.readFloatLE(base + v * 12));
    const y = Math.abs(buf.readFloatLE(base + v * 12 + 4));
    const z = Math.abs(buf.readFloatLE(base + v * 12 + 8));
    maxDim = Math.max(maxDim, x, y, z);
  }
}
const scale = targetMm / maxDim;
// Write scaled output (same buffer size, only vertex coords change)
```

The complete implementation is in the workflow documentation: `docs/3d-design-to-print-workflow.md`.

---

## Rule 4 — Rodin `mesh_mode` Values

`hyper3d/rodin` only accepts `"Quad"` or `"Raw"` for `mesh_mode`.  
`"Triangle"` is **not valid** and returns a 422.

| Value | Use case |
|-------|----------|
| `Quad` | Cleaner topology, better for sculpting/animation |
| `Raw` | Raw marching-cubes output, maximum detail fidelity |

The `--meshmode` CLI flag in `generate-3d.js` passes directly to `mesh_mode`.

---

## Rule 5 — Sculpteo Upload Name Limit (64 chars)

Sculpteo's API rejects model names longer than 64 characters.  
The `name` field sent during upload must be `.substring(0, 64)`.

Already fixed in `generate-3d-print.js`:
```javascript
form.append("name", path.basename(fileInfo.name, path.extname(fileInfo.name)).substring(0, 64));
```

---

## Rule 6 — Sculpteo Cloudflare Bot Protection

Sculpteo's `/api/3d/design/<uuid>/` endpoint is now behind Cloudflare bot protection for unauthenticated programmatic requests. The upload endpoint (`/en/upload_design/`) still works.

**Workaround**: After upload, direct user to browser:
```
https://www.sculpteo.com/gallery/design/ext/<uuid>
```
Full material pricing (100+ materials) is available there.

---

## Rule 7 — Sculpteo Pricing: CLIP Elastomeric Is Not a Pen Cup Material

When Sculpteo returns a single material quote for "CLIP Elastomeric", it means the standard plastic materials haven't processed yet, OR the geometry triggered only flexible material matching.

**Expected affordable materials** for a ~90×120mm rigid object:
| Material | Est. Price | Notes |
|----------|-----------|-------|
| PA12 Nylon (SLS) | $25–50 | Best detail, rigid, durable |
| PA11 (Bio-based SLS) | $30–55 | Slightly flexible, food-safe |
| Resins (various) | $40–80 | Maximum surface quality |
| FDM (any color) | $15–30 | Fastest/cheapest, visible layers |

**Best alternative**: Craftcloud3D (`craftcloud3d.com/upload`) — drag-and-drop, compares 150+ manufacturers, shows prices in seconds.

---

## Rule 8 — Hollow Before Resin: 5–10x Cost Difference

Resin SLA pricing is **volume-based**. A solid 115×150mm mesh costs $80–200. The same mesh hollowed to a 3–4mm shell costs $30–60.

**When to hollow:**
- Any object larger than ~60mm in any dimension intended for resin printing
- Objects where interior is not visible (skull, figurine, vase, container)

**Hollowing requires Blender** (Boolean subtract inner scaled copy). The AI-generated mesh is always solid.

**Threshold rule**: If `max_dimension > 60mm` AND material is resin → hollow before ordering.

---

## Rule 9 — Trellis Handles Organic Geometry Well

Trellis (image-to-3D) reliably captures complex organic shapes from a single reference photo:
- Skull: orbital ridges, suture lines, zygomatic arch, nasal bones — all present in output
- Expected triangle count for head-sized organic object: 20,000–35,000 triangles
- Generation time: 50–120s depending on complexity

**Best reference image for organic shapes**: front-facing with dramatic side lighting, white background, no occlusion of key features.

**Limitation**: The mesh is a closed solid surface — it cannot represent internal cavities (skull interior, split mechanism, sphere cradle). All mechanical features require post-processing in Blender.

---

## Complete Optimized Workflow

```bash
# 1. Generate reference image
node generate-image.js "<description>" --model imagen4

# 2. Generate 3D model (Trellis for architecture/objects)
node generate-3d.js --model trellis --image ./media/<ref>.jpg --stl

# 3. Scale to print dimensions (inline or via slicer)
# Target: maxDim = 120mm for a pen cup-sized object

# 4. Upload for quote
node generate-3d-print.js --file ./media/<name>-print-ready.stl --service sculpteo

# 5. Order
# Sculpteo: https://www.sculpteo.com/gallery/design/ext/<uuid>
# Craftcloud: drag STL to https://craftcloud3d.com/upload
```

**Time budget** (empirical):
- Image generation (Imagen 4): ~8s
- 3D generation (Trellis): ~90–120s  
- STL scaling: <1s
- Sculpteo upload + quote: ~20–70s

![Banner](../assets/banner-3d-print.png)

# generate-3d-print.js — Online 3D Printing Service Integration

Upload 3D models to online printing services and get instant price quotes from the CLI.

Supports **6 services**: 2 with full API integration (upload + pricing) and 4 with browser handoff for manual quoting.

## Quick Start

```bash
# Get quotes from all services
node generate-3d-print.js --file ./model.stl --service all

# Upload to Shapeways and get per-material pricing
node generate-3d-print.js --file ./model.stl --service shapeways

# Upload to Sculpteo and get pricing for plastic materials
node generate-3d-print.js --file ./model.stl --service sculpteo --material plastic

# List available materials
node generate-3d-print.js --list --service sculpteo

# Open browser-based services for manual quoting
node generate-3d-print.js --file ./model.stl --service craftcloud
```

## Services

| Service | Type | Auth Required | Description |
|---|---|---|---|
| **shapeways** | API | OAuth2 (Client ID + Secret) | Professional 3D printing, 40+ materials |
| **sculpteo** | API | None (optional account) | Industrial 3D printing by BASF, 100+ materials |
| **materialise** | Browser | — | Materialise OnSite, 20+ materials, 100+ combos |
| **pcbway** | Browser | — | 3D printing + CNC + sheet metal (SLA, SLS, MJF, FDM, DMLS) |
| **xometry** | Browser | — | AI-powered quoting for 3D printing, CNC, injection molding |
| **craftcloud** | Browser | — | Price comparison across 150+ manufacturers worldwide |

## CLI Options

| Option | Description | Default |
|---|---|---|
| `--file <path>` | 3D model file to upload (STL, OBJ, GLB, 3MF, STEP) | *required* |
| `--service <name>` | Target service or `all` | `all` |
| `--material <name>` | Filter results by material name | — |
| `--quantity <n>` | Number of copies | `1` |
| `--unit <str>` | Measurement unit: `mm`, `cm`, `in` | `mm` |
| `--currency <str>` | Currency: `USD`, `EUR`, `GBP` | `USD` |
| `--scale <n>` | Scale factor | `1.0` |
| `--list` | List available materials for a service | — |
| `--open` | Open browser for all services | — |
| `--json` | Output all results as JSON | — |

## API Services

### Shapeways

Full API integration with OAuth2 authentication. Upload your model and get instant per-material pricing.

**Setup:**
1. Register at [developers.shapeways.com](https://developers.shapeways.com/)
2. Create an app at [Manage Apps](https://developers.shapeways.com/manage-apps)
3. Add to your `.env` file:
   ```
   SHAPEWAYS_CLIENT_ID=your_client_id
   SHAPEWAYS_CLIENT_SECRET=your_client_secret
   ```

**Features:**
- Upload STL, OBJ, X3D, DAE, WRL, 3DS, STEP, IGES, 3MF files
- Get instant pricing across 40+ materials
- Material printability checks
- Model view link after upload

```bash
# Upload and get all material quotes
node generate-3d-print.js --file ./model.stl --service shapeways

# Filter quotes by material
node generate-3d-print.js --file ./model.stl --service shapeways --material nylon

# List all available materials
node generate-3d-print.js --list --service shapeways
```

### Sculpteo (BASF)

Full API integration — **no authentication required** for uploading and getting quotes.

**Setup:**
No setup needed! Optionally add Sculpteo credentials to associate uploads with your account:
```
SCULPTEO_USER=your_username
SCULPTEO_PASSWORD=your_password
```

**Features:**
- Upload STL, OBJ, 3DS, DAE, ZIP, 3MF, STEP, IGES, WRL files
- Get instant pricing across 100+ materials
- Automatic model analysis (dimensions, printability)
- Multiple currencies (USD, EUR, GBP)
- Delivery time estimates

```bash
# Upload and get quotes (no auth needed!)
node generate-3d-print.js --file ./model.stl --service sculpteo

# Get quotes in EUR for 3 copies
node generate-3d-print.js --file ./model.stl --service sculpteo --quantity 3 --currency EUR

# Filter by material type
node generate-3d-print.js --file ./model.stl --service sculpteo --material titanium

# List all 100+ materials
node generate-3d-print.js --list --service sculpteo
```

## Browser-Based Services

These services don't offer public APIs. The script opens your browser to their upload page.

### Materialise OnSite
Industrial-grade 3D printing from Materialise. 20+ materials with 100+ color/finish combinations.
```bash
node generate-3d-print.js --file ./model.stl --service materialise
```

### PCBWay 3D Printing
Affordable 3D printing alongside PCB manufacturing. Supports SLA, SLS, MJF, FDM, DMLS.
```bash
node generate-3d-print.js --file ./model.stl --service pcbway
```

### Xometry
AI-powered instant quoting for 3D printing, CNC machining, sheet metal, and injection molding.
```bash
node generate-3d-print.js --file ./model.stl --service xometry
```

### Craftcloud (All3DP)
Price comparison across 150+ manufacturers worldwide. Compares real-time quotes from services like Shapeways, Sculpteo, and many more.
```bash
node generate-3d-print.js --file ./model.stl --service craftcloud
```

## Pipeline Integration

Combine with `generate-3d.js` to generate a 3D model and immediately get print quotes:

```bash
# Generate 3D model with STL output, then get quotes
node generate-3d.js --model rodin --image ./object.png --stl
node generate-3d-print.js --file ./media/*rodin*.stl --service all

# Generate and quote in one pipeline
node generate-3d.js --model trellis --image ./chair.png --stl && \
  node generate-3d-print.js --file ./media/*trellis*.stl --service sculpteo
```

## Supported File Formats

| Format | Shapeways | Sculpteo | Materialise | PCBWay | Xometry | Craftcloud |
|---|---|---|---|---|---|---|
| STL | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| OBJ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| STEP | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| 3MF | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| GLB | — | — | — | — | — | — |
| IGES | ✅ | ✅ | ✅ | — | ✅ | — |

> **Note:** GLB files are not directly supported by most printing services. Use `generate-3d.js --stl` to convert GLB to STL before uploading.

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `SHAPEWAYS_CLIENT_ID` | For Shapeways API | OAuth2 client ID from developer portal |
| `SHAPEWAYS_CLIENT_SECRET` | For Shapeways API | OAuth2 client secret |
| `SCULPTEO_USER` | Optional | Sculpteo username (to associate uploads) |
| `SCULPTEO_PASSWORD` | Optional | Sculpteo account password |

## Notes

- **STL is king**: STL is universally supported across all 3D printing services. When in doubt, use STL.
- **Pricing varies**: Quotes are estimates. Final pricing may differ based on model analysis, shipping, and post-processing.
- **File size limits**: Most services accept files up to 100-500 MB. Keep models under 100 MB for best compatibility.
- **Units matter**: Ensure your model's unit matches the `--unit` flag. A 10mm cube in inches becomes ~254mm!
- **Craftcloud is a meta-service**: It compares prices across many manufacturers including Shapeways and Sculpteo.

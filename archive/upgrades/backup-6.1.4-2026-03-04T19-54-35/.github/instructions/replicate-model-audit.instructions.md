---
description: "Periodic verification of Replicate model IDs against live API to detect deprecated or removed models"
applyTo: "**/generate-*.js,**/docs/generate-*.md,**/README.md"
---

# Replicate Model Audit Protocol

**Classification**: Procedural Memory | Model Lifecycle Management  
**Activation**: audit, model check, replicate verify, model 404, deprecated model  
**Last Audit**: 2026-03-04 — 83 models verified, 1 removed (bytedance/seededit-3.0)

---

## Synapses

- [.github/instructions/dependency-management.instructions.md] (Medium, Coordinates, Forward) - "Model IDs are external dependencies subject to removal"
- [.github/instructions/code-review-guidelines.instructions.md] (Medium, Informs, Forward) - "Model audit findings may require code review"

---

## Why Audit?

Replicate models can be removed or deprecated without notice. `bytedance/seededit-3.0` returned HTTP 404 during routine audit (2026-03-04) with no prior deprecation warning. This broke the generate-edit-image.js script for that model key.

## Audit Procedure

### 1. Enumerate All Model IDs

```bash
# Extract model IDs from all generate-*.js scripts
grep -r "id:" generate-*.js | grep "replicate" | sort
```

Or use the comment block at the top of each script (e.g., `// Models: model/name, ...`).

### 2. Verify Each Model

```bash
# Check a single model via Replicate API
curl -s -o /dev/null -w "%{http_code}" https://api.replicate.com/v1/models/<owner>/<name>
```

- **200**: Model active
- **404**: Model removed — must remove from script and docs
- **Other**: Investigate (rate limiting, auth, etc.)

### 3. Update Affected Files on Removal

When a model is removed, update **all three locations**:

1. **Script file** (`generate-*.js`): Remove model definition object, update header comment model list and count
2. **Doc file** (`docs/generate-*.md`): Remove from Models table, Parameter Matrix, Model Categories, example commands, update header model count
3. **README.md**: Remove from the script's model list in the overview table

### 4. Record Results

Update `Last Audit` date in this file. Note removed models and new models discovered.

## Current Inventory (2026-03-04)

| Script | Models | Notes |
|--------|--------|-------|
| generate-video.js | 17 | All verified |
| generate-image.js | 14 | All verified |
| generate-voice.js | 15 | All verified |
| generate-music.js | 5 | All verified |
| generate-3d.js | 6 | All verified |
| generate-emoji.js | 4 | All verified |
| generate-edit-image.js | 12 | seededit-3.0 removed (was 13) |
| generate-edit-video.js | 10 | All verified |
| **Total** | **83** | |

## Audit Frequency

- **Before releases**: Always verify all model IDs
- **Quarterly**: Spot-check 10-20% of models
- **On failure**: If any `generate-*.js` throws a 404/model-not-found error, run full audit

# generate-edit-image.js

![Image Editing](../assets/banner-edit-image.png)

Image editing, enhancement, and manipulation via Replicate. 12 models covering inpainting, outpainting, background removal/replacement, upscaling, face restoration, and generative fill.

## Quick Start

```bash
# Default (Nano Inpaint — requires prompt + image)
node generate-edit-image.js "replace the sky with sunset" --image ./photo.jpg

# Background removal
node generate-edit-image.js --model rembg --image ./photo.jpg

# Upscale
node generate-edit-image.js --model upscale --image ./photo.jpg --scale 4

# Background generation
node generate-edit-image.js "tropical beach background" --model bggen --image ./portrait.jpg

# Generative fill with mask
node generate-edit-image.js "a red sports car" --model genfill --image ./scene.jpg --mask ./mask.png

# Expand/outpaint
node generate-edit-image.js "continue the landscape" --model expand --image ./photo.jpg --outpaint "left=200,right=200"

# Face restoration
node generate-edit-image.js --model restore --image ./old-photo.jpg --face-enhance

# Kontext editing
node generate-edit-image.js "make the dress blue" --model kontext --image ./photo.jpg

```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Editing model to use | `nana` |
| `--image <path>` | Input image (**required** for all models) | — |
| `--mask <path>` | Mask image for inpainting | — |
| `--aspect <ratio>` | Output aspect ratio | — |
| `--format <str>` | Output format (png, jpg, webp) | — |
| `--seed <n>` | Random seed | — |
| `--scale <n>` | Upscale factor (2, 4, 8) | — |
| `--outpaint <str>` | Outpaint direction/pixels | — |
| `--face-enhance` | Enable face enhancement | — |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `nana` | `google/nano-banana` | Nano Banana | $0.039 |
| `pedit` | `prunaai/p-image-edit` | P-Image-Edit | $0.01 |
| `kontext` | `black-forest-labs/flux-kontext-pro` | FLUX Kontext Pro | $0.04 |
| `kontextmax` | `black-forest-labs/flux-kontext-max` | FLUX Kontext Max | variable |
| `fillpro` | `black-forest-labs/flux-fill-pro` | FLUX Fill Pro | $0.05 |
| `eraser` | `bria/eraser` | Bria Eraser | $0.04 |
| `genfill` | `bria/genfill` | Bria GenFill | variable |
| `expand` | `bria/expand-image` | Bria Expand | $0.04 |
| `bggen` | `bria/generate-background` | Bria Background Gen | $0.04 |
| `restore` | `flux-kontext-apps/restore-image` | FLUX Restore | $0.04 |
| `rembg` | `bria/remove-background` | Bria Remove BG | variable |
| `upscale` | `nightmareai/real-esrgan` | Real-ESRGAN | variable |

## Parameter Support Matrix

| Model | prompt | image | mask | aspect | format | seed | scale | outpaint | face |
|-------|:------:|:-----:|:----:|:------:|:------:|:----:|:-----:|:--------:|:----:|
| `nana` | ✅ | ✅ req | ✅ | — | — | ✅ | — | — | — |
| `pedit` | ✅ | ✅ req | — | — | — | ✅ | — | — | — |
| `kontext` | ✅ | ✅ req | — | ✅ | ✅ | ✅ | — | — | — |
| `kontextmax` | ✅ | ✅ req | — | ✅ | ✅ | ✅ | — | — | — |
| `fillpro` | ✅ | ✅ req | ✅ req | — | — | ✅ | — | — | — |
| `eraser` | — | ✅ req | ✅ req | — | — | — | — | — | — |
| `genfill` | ✅ | ✅ req | ✅ | — | — | ✅ | — | — | — |
| `expand` | ✅ | ✅ req | — | — | — | — | — | ✅ | — |
| `bggen` | ✅ | ✅ req | — | ✅ | — | ✅ | — | — | — |
| `restore` | — | ✅ req | — | — | — | — | — | — | ✅ |
| `rembg` | — | ✅ req | — | — | — | — | — | — | — |
| `upscale` | — | ✅ req | — | — | ✅ | — | ✅ | — | ✅ |

## Model Categories

### Inpainting / Editing
- **nana** — Nano Banana: Google's prompt-guided editing with optional mask
- **pedit** — P-Image-Edit: instruction-based editing (describe the change)
- **kontext** / **kontextmax** — FLUX Kontext: prompt-guided editing, preserves composition

### Fill / Expand
- **fillpro** — FLUX Fill Pro: requires mask, fills masked areas with prompt guidance
- **genfill** — Bria GenFill: inpaints masked region with prompt-guided content
- **expand** — Bria Expand: extends image boundaries to target aspect ratio
- **eraser** — Bria Eraser: removes masked objects, no prompt needed

### Background
- **bggen** — Bria Background Gen: replaces background based on prompt, preserves subject
- **rembg** — Bria Remove BG: outputs transparent PNG, no prompt needed

### Enhancement
- **restore** — FLUX Restore: image restoration and enhancement
- **upscale** — Real-ESRGAN: resolution upscaling (2x, 4x, 8x) with optional face enhance

## Notes

- **All models require `--image`** — this is an editing script, not generation
- **Mask required**: `fillpro` and `eraser` require `--mask`; `nana` and `genfill` optionally accept masks
- **No prompt needed**: `rembg`, `eraser`, `restore`, and `upscale` work without prompts
- **Kontext models**: Best for "change X to Y" style instructions while preserving the rest
- Output saved to `./output/` as image file + JSON report

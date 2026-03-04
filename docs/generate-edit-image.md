# generate-edit-image.js

Image editing, enhancement, and manipulation via Replicate. 13 models covering inpainting, outpainting, background removal/replacement, upscaling, face restoration, and generative fill.

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

# Seed editing
node generate-edit-image.js "add sunglasses" --model seededit --image ./portrait.jpg
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
| `nana` | `nano-banana/nano-inpaint` | Nano Inpaint | per-second GPU |
| `pedit` | `timothybrooks/instruct-pix2pix` | InstructPix2Pix | per-second GPU |
| `kontext` | `black-forest-labs/flux-kontext-pro` | Flux Kontext Pro | $0.03/image |
| `kontextmax` | `black-forest-labs/flux-kontext-max` | Flux Kontext Max | $0.05/image |
| `seededit` | `bytedance/seed-edit` | Seed Edit (ByteDance) | per-second GPU |
| `fillpro` | `black-forest-labs/flux-fill-pro` | Flux Fill Pro | $0.05/image |
| `eraser` | `zylim0702/remove-object` | Object Eraser | per-second GPU |
| `genfill` | `adirik/generative-fill` | Generative Fill | per-second GPU |
| `expand` | `fofr/image-outpainter` | Image Outpainter | per-second GPU |
| `bggen` | `bfl-ai/flux-bg` | Flux Background Gen | $0.04/image |
| `restore` | `sczhou/codeformer` | CodeFormer (face restore) | per-second GPU |
| `rembg` | `cjwbw/rembg` | Background Remover | per-second GPU |
| `upscale` | `nightmareai/real-esrgan` | Real-ESRGAN Upscaler | per-second GPU |

## Parameter Support Matrix

| Model | prompt | image | mask | aspect | format | seed | scale | outpaint | face |
|-------|:------:|:-----:|:----:|:------:|:------:|:----:|:-----:|:--------:|:----:|
| `nana` | ✅ | ✅ req | ✅ | — | — | ✅ | — | — | — |
| `pedit` | ✅ | ✅ req | — | — | — | ✅ | — | — | — |
| `kontext` | ✅ | ✅ req | — | ✅ | ✅ | ✅ | — | — | — |
| `kontextmax` | ✅ | ✅ req | — | ✅ | ✅ | ✅ | — | — | — |
| `seededit` | ✅ | ✅ req | — | — | — | ✅ | — | — | — |
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
- **nana** — Nano Inpaint: prompt-guided inpainting with optional mask
- **pedit** — InstructPix2Pix: instruction-based editing (describe the change)
- **kontext** / **kontextmax** — Flux Kontext: prompt-guided editing, preserves composition
- **seededit** — Seed Edit: ByteDance's instruction-based editing

### Fill / Expand
- **fillpro** — Flux Fill Pro: requires mask, fills masked areas with prompt guidance
- **genfill** — Generative Fill: inpaints masked region with prompt-guided content
- **expand** — Image Outpainter: extends image boundaries in specified directions
- **eraser** — Object Eraser: removes masked objects, no prompt needed

### Background
- **bggen** — Flux BG: replaces background based on prompt, preserves subject
- **rembg** — Background Remover: outputs transparent PNG, no prompt needed

### Enhancement
- **restore** — CodeFormer: face restoration and enhancement for degraded photos
- **upscale** — Real-ESRGAN: resolution upscaling (2×, 4×, 8×) with optional face enhance

## Notes

- **All models require `--image`** — this is an editing script, not generation
- **Mask required**: `fillpro` and `eraser` require `--mask`; `nana` and `genfill` optionally accept masks
- **No prompt needed**: `rembg`, `eraser`, `restore`, and `upscale` work without prompts
- **Kontext models**: Best for "change X to Y" style instructions while preserving the rest
- Output saved to `./output/` as image file + JSON report

# generate-emoji.js

AI emoji and sticker generation via Replicate. 4 models for creating custom emoji-style images.

## Quick Start

```bash
# Default (SDXL Emoji)
node generate-emoji.js "a happy cat"

# Platform emoji (Apple/Google style)
node generate-emoji.js "thumbs up" --model platmoji

# Flux ICO style
node generate-emoji.js "rocket ship" --model fluxico --aspect 1:1

# Kontext edit (remix existing emoji)
node generate-emoji.js "make it blue" --model kontextemoji --image ./emoji.png
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Emoji model to use | `sdxlemoji` |
| `--image <path>` | Input image (for editing/remix) | — |
| `--seed <n>` | Random seed | — |
| `--count <n>` | Number of outputs | — |
| `--width <n>` | Output width pixels | — |
| `--height <n>` | Output height pixels | — |
| `--aspect <ratio>` | Aspect ratio (e.g. 1:1) | — |
| `--steps <n>` | Diffusion steps | — |
| `--guidance <n>` | Guidance scale | — |
| `--format <str>` | Output format (png, webp) | — |
| `--quality <n>` | Output quality | — |
| `--negative <str>` | Negative prompt | — |
| `--strength <n>` | Image edit strength | — |
| `--lora <str>` | LoRA model path | — |
| `--lorastrength <n>` | LoRA strength | — |
| `--scheduler <str>` | Diffusion scheduler | — |
| `--refine <str>` | Refiner type | — |
| `--refinesteps <n>` | Refiner steps | — |
| `--watermark` | Add watermark | — |
| `--nowatermark` | Disable watermark | — |
| `--nosafety` | Disable safety checker | — |
| `--fast` | Fast/turbo mode | — |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `sdxlemoji` | `fofr/sdxl-emoji` | SDXL Emoji | per-second GPU |
| `platmoji` | `replicate-labs/platmoji` | Platmoji | per-second GPU |
| `fluxico` | `kontext-community/flux-emoji` | Flux Emoji (ICO style) | per-second GPU |
| `kontextemoji` | `black-forest-labs/flux-kontext-max` | Flux Kontext Max (emoji edit) | $0.05/image |

## Parameter Support Matrix

| Model | prompt | image | seed | count | dimensions | steps | guidance | negative | strength | lora | scheduler |
|-------|:------:|:-----:|:----:|:-----:|:----------:|:-----:|:--------:|:--------:|:--------:|:----:|:---------:|
| `sdxlemoji` | ✅ | — | ✅ | ✅ | ✅ (w×h) | ✅ | ✅ | ✅ | — | ✅ | ✅ |
| `platmoji` | ✅ | — | ✅ | ✅ | ✅ (w×h) | ✅ | ✅ | ✅ | — | — | — |
| `fluxico` | ✅ | — | ✅ | ✅ | ✅ (aspect) | ✅ | ✅ | — | — | — | — |
| `kontextemoji` | ✅ | ✅ req | ✅ | — | ✅ (aspect) | — | — | — | ✅ | — | — |

## Notes

- **Default model**: `sdxlemoji` (SDXL Emoji)
- **Platmoji**: Generates Apple/Google-style platform emoji
- **Flux Emoji**: ICO-style emoji using Flux community LoRA
- **Kontext Max**: Image editing model — pass existing emoji via `--image` and describe changes in prompt
- **SDXL Emoji**: Most configurable with LoRA, scheduler, refiner, and full diffusion controls
- All models output PNG by default at emoji-friendly sizes
- Output saved to `./output/` as image file + JSON report

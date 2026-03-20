# generate-image.js

![Image Generation](../assets/banner-image.png)

Text-to-image generation via Replicate. Supports 14 models with optional image reference, batch generation, and style controls.

## Quick Start

```bash
node scripts/generate-image.js "A cat wearing a top hat"
node scripts/generate-image.js "A cat wearing a top hat" --model gptimage
node scripts/generate-image.js "Add sunglasses" --model nanapro --image ./photo.jpg
node scripts/generate-image.js "Sunset landscape" --aspect 16:9 --resolution 2K
node scripts/generate-image.js "Logo design" --model recraft --style "flat_design"
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Image model to use | `nanapro` |
| `--image <path>` | Reference/input image (local file or URL) | — |
| `--aspect <ratio>` | Aspect ratio (1:1, 16:9, 9:16, 4:3, 3:2) | `1:1` |
| `--resolution <res>` | Resolution (1K, 2K, 4K, 1MP, 2MP) | model-specific |
| `--style <type>` | Style type (model-specific) | — |
| `--format <fmt>` | Output format (jpg, png, webp) | model-specific |
| `--seed <number>` | Random seed for reproducibility | — |
| `--count <n>` | Number of images to generate (batch models) | `1` |
| `--width <n>` | Custom width (flux2 models) | — |
| `--height <n>` | Custom height (flux2 models) | — |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `nanapro` | `google/nano-banana-pro` | Nano Banana Pro | variable |
| `gptimage` | `openai/gpt-image-1.5` | GPT Image 1.5 | variable |
| `imagen4` | `google/imagen-4` | Imagen 4 | $0.04 |
| `imagen4u` | `google/imagen-4-ultra` | Imagen 4 Ultra | $0.06 |
| `imagen4f` | `google/imagen-4-fast` | Imagen 4 Fast | $0.02 |
| `flux2max` | `black-forest-labs/flux-2-max` | FLUX 2 Max | variable |
| `flux2pro` | `black-forest-labs/flux-2-pro` | FLUX 2 Pro | variable |
| `seedream` | `bytedance/seedream-4.5` | Seedream 4.5 | $0.04 |
| `grok` | `xai/grok-imagine-image` | Grok Image | $0.02 |
| `ideoturbo` | `ideogram-ai/ideogram-v3-turbo` | Ideogram v3 Turbo | $0.03 |
| `ideoqual` | `ideogram-ai/ideogram-v3-quality` | Ideogram v3 Quality | $0.09 |
| `recraft` | `recraft-ai/recraft-v4` | Recraft v4 | $0.04 |
| `minimax` | `minimax/image-01` | MiniMax Image-01 | $0.01 |
| `photon` | `luma/photon-flash` | Photon Flash | $0.01 |

## Parameter Support Matrix

| Model | prompt | image | aspect | resolution | style | format | seed | count |
|-------|:------:|:-----:|:------:|:----------:|:-----:|:------:|:----:|:-----:|
| `nanapro` | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | — |
| `gptimage` | ✅ | ✅ | ✅ | — | — | ✅ | — | ✅ (10) |
| `imagen4` | ✅ | — | ✅ | ✅ | — | ✅ | — | — |
| `imagen4u` | ✅ | — | ✅ | ✅ | — | ✅ | — | — |
| `imagen4f` | ✅ | — | ✅ | — | — | ✅ | — | — |
| `flux2max` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | — |
| `flux2pro` | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ | — |
| `seedream` | ✅ | ✅ | ✅ | ✅ | — | — | — | ✅ (15) |
| `grok` | ✅ | ✅ | ✅ | — | — | — | — | — |
| `ideoturbo` | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — |
| `ideoqual` | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — |
| `recraft` | ✅ | — | ✅ | — | — | — | — | — |
| `minimax` | ✅ | ✅ | ✅ | — | — | — | — | ✅ (9) |
| `photon` | ✅ | ✅ | ✅ | — | — | — | ✅ | — |

## Notes

- **Default model**: `nanapro` (Nano Banana Pro) — Google's SOTA model with gen + edit + 14 reference images
- **Batch generation**: `gptimage` (up to 10), `seedream` (up to 15), `minimax` (up to 9)
- **Style support**: `ideoturbo` and `ideoqual` accept `--style` for Ideogram-specific styles
- **Custom dimensions**: `flux2max` and `flux2pro` accept `--width`/`--height` with `--aspect custom`
- **Image reference**: Used differently per model (input image, style reference, subject reference, etc.)
- Output saved to `./media/images/` with JSON report

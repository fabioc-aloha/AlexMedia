![Banner](../assets/banner-sticker-print.png)

# generate-sticker-print.js — Sticker & Print Production Service Integration

Order physical stickers and print-on-demand products from the CLI.

Supports **6 services**: 2 with full API integration (upload + catalog + pricing) and 4 with browser handoff for manual ordering.

## Quick Start

```bash
# Get links to all sticker services
node generate-sticker-print.js --file ./sticker.png --service all

# Upload artwork to Printify and browse sticker catalog
node generate-sticker-print.js --file ./design.png --service printify

# List available sticker products
node generate-sticker-print.js --list --service printify

# Order die-cut stickers from StickerMule
node generate-sticker-print.js --file ./logo.png --service stickermule --type die-cut

# Open all browser services at once
node generate-sticker-print.js --file ./emoji.png --service all --open
```

## Services

| Service | Type | Auth Required | Description |
|---|---|---|---|
| **printify** | API | Personal Access Token | Print-on-demand with 100+ print providers, stickers, labels, merch |
| **printful** | API | API Token | Premium print-on-demand with high-quality stickers & merch |
| **stickermule** | Browser | — | Premium custom stickers: die-cut, kiss-cut, holographic, clear, bumper |
| **stickerapp** | Browser | — | Custom stickers with free online design tool, sheets, labels |
| **stickergiant** | Browser | — | Professional sticker & label printing, bulk orders, packaging |
| **redbubble** | Browser | — | Print-on-demand marketplace for stickers, merch, and art |

## CLI Options

| Option | Description | Default |
|---|---|---|
| `--file <path>` | Image file to use as artwork (PNG, JPG, WebP) | *required* |
| `--service <name>` | Target service or `all` | `all` |
| `--type <style>` | Sticker type (see below) | — |
| `--size <str>` | Size in inches: `2x2`, `3x3`, `4x4` or `WxH` | `3x3` |
| `--quantity <n>` | Number of stickers | `50` |
| `--finish <str>` | Finish: `matte`, `glossy`, `holographic` | `glossy` |
| `--list` | List available sticker products from API services | — |
| `--open` | Open browser for all services | — |
| `--json` | Output all results as JSON | — |

## Sticker Types

| Type | Description | Best For |
|---|---|---|
| `die-cut` | Cut to the exact shape of your design | Logos, characters, custom shapes |
| `kiss-cut` | Cut around design on a square backing sheet | Easy peel-off, sticker packs, giveaways |
| `vinyl` | Durable waterproof vinyl material | Outdoor use, laptops, water bottles |
| `holographic` | Rainbow holographic finish that shifts in light | Eye-catching designs, collectibles |
| `clear` | Transparent background around design | Glass, windows, transparent surfaces |
| `sheet` | Multiple stickers printed on a single sheet | Sticker packs, samplers, economy printing |
| `bumper` | Large format rectangular sticker for vehicles | Cars, bumpers, large surfaces |

## API Services

### Printify

Full API integration with Personal Access Token. Upload artwork, browse the sticker catalog, and get pricing from 100+ print providers.

**Setup:**
1. Create an account at [printify.com](https://printify.com)
2. Generate a token at [API settings](https://printify.com/app/account/api)
3. Add to your `.env` file:
   ```
   PRINTIFY_API_TOKEN=your_token_here
   PRINTIFY_SHOP_ID=your_shop_id  # optional
   ```

**Features:**
- Upload PNG/JPG artwork via API
- Browse sticker blueprints across the full catalog
- See print providers, variants, and pricing
- Rate limit: 600 req/min global, 100 req/min catalog

```bash
# Upload artwork and browse sticker catalog
node generate-sticker-print.js --file ./design.png --service printify

# List all sticker products
node generate-sticker-print.js --list --service printify

# Falls back to browser if token is not set
node generate-sticker-print.js --file ./design.png --service printify
```

### Printful

Full API integration with API token. Upload artwork and browse sticker products with premium print quality.

**Setup:**
1. Create an account at [printful.com](https://www.printful.com)
2. Get your API token at [Developer Dashboard](https://www.printful.com/dashboard/developer)
3. Add to your `.env` file:
   ```
   PRINTFUL_API_TOKEN=your_token_here
   ```

**Features:**
- Upload artwork via base64 API
- Browse sticker catalog and product categories
- High-quality print-on-demand fulfillment
- Falls back to browser if token is not set

```bash
# Upload artwork and browse products
node generate-sticker-print.js --file ./sticker.png --service printful

# List sticker products in catalog
node generate-sticker-print.js --list --service printful
```

## Browser-Based Services

These services use browser handoff — the script opens the correct page for your sticker type.

### StickerMule

Premium custom stickers with free shipping and 4-day turnaround. Industry-leading quality.

```bash
# Default sticker page
node generate-sticker-print.js --file ./logo.png --service stickermule

# Specific sticker type page
node generate-sticker-print.js --file ./logo.png --service stickermule --type die-cut
node generate-sticker-print.js --file ./logo.png --service stickermule --type holographic
node generate-sticker-print.js --file ./logo.png --service stickermule --type clear
```

Available types: die-cut, kiss-cut, bumper, clear, holographic, circle, rectangle, sheet

### StickerApp

Custom stickers with a free online design tool, instant previews, and fast production.

```bash
node generate-sticker-print.js --file ./design.png --service stickerapp
node generate-sticker-print.js --file ./design.png --service stickerapp --type vinyl
```

Available types: die-cut, kiss-cut, vinyl, holographic, clear, sheet

### StickerGiant

Professional sticker and label printing for products, packaging, and events. Great for bulk orders.

```bash
node generate-sticker-print.js --file ./label.png --service stickergiant
node generate-sticker-print.js --file ./label.png --service stickergiant --type vinyl
```

Available types: die-cut, kiss-cut, vinyl, bumper, clear

### Redbubble

Print-on-demand marketplace — upload your art to sell as stickers, or order for personal use.

```bash
node generate-sticker-print.js --file ./art.png --service redbubble
```

## Pipeline Integration

Combine with `generate-emoji.js` and `generate-edit-image.js` for a full emoji-to-physical-sticker pipeline:

```bash
# 1. Generate emoji with AI
node generate-emoji.js "happy robot with wrench" --model sdxlemoji

# 2. Remove background for die-cut stickers
node generate-edit-image.js --model rembg --image ./media/images/*sdxlemoji*.png

# 3. Order physical stickers from all services
node generate-sticker-print.js --file ./media/images/*rembg*.png --service all --type die-cut

# Full pipeline in one command
node generate-emoji.js "cute cat" --model sdxlemoji && \
  node generate-edit-image.js --model rembg --image ./media/images/*sdxlemoji*.png && \
  node generate-sticker-print.js --file ./media/images/*rembg*.png --service stickermule --type die-cut
```

## Artwork Preparation Tips

| Guideline | Recommendation |
|---|---|
| **Resolution** | 300 DPI minimum for sharp prints |
| **Bleed** | Add 1/8" (3mm) around the design |
| **Format** | PNG with transparency for die-cut & clear stickers |
| **Color Mode** | CMYK for accurate color reproduction |
| **Safe Zone** | Keep important elements 1/16" from the cut line |
| **File Size** | Under 25 MB for API uploads, under 100 MB for browser |
| **Dimensions** | At least 2x the print size at 300 DPI (e.g., 900×900 px for 3×3") |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PRINTIFY_API_TOKEN` | For Printify API | Personal access token from API settings |
| `PRINTIFY_SHOP_ID` | Optional | Printify shop ID (auto-detected if omitted) |
| `PRINTFUL_API_TOKEN` | For Printful API | API token from developer dashboard |

## Supported Artwork Formats

| Format | Printify | Printful | StickerMule | StickerApp | StickerGiant | Redbubble |
|---|---|---|---|---|---|---|
| PNG | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| JPG | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| WebP | — | ✅ | — | — | — | — |
| SVG | — | — | ✅ | ✅ | ✅ | — |
| AI | — | — | ✅ | ✅ | ✅ | — |
| PDF | — | — | ✅ | ✅ | ✅ | — |
| EPS | — | — | ✅ | ✅ | ✅ | — |

> **Tip:** PNG is universally supported and best for stickers with transparency. Use PNG whenever possible.

## Notes

- **PNG is preferred**: PNG with transparency works everywhere and produces the best die-cut and clear stickers.
- **Minimum 300 DPI**: All sticker types need 300 DPI or higher for professional quality. Bumper stickers can use 150 DPI.
- **Die-cut vs. kiss-cut**: Die-cut stickers are individually cut to shape; kiss-cut stickers are on a square backing. Die-cut looks more professional; kiss-cut is easier to peel.
- **API fallback**: If API tokens aren't set, the script gracefully opens the browser instead of failing.
- **StickerMule quality**: Widely considered the highest quality; slightly more expensive but with free shipping.
- **Redbubble is a marketplace**: Unlike other services, Redbubble lets you sell stickers, not just order them.
- **Ordering quantities**: StickerMule minimum is typically 10; StickerGiant starts at 250 for custom orders.

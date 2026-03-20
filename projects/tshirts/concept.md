# AI-Generated Merch

## Vision

AI-generated artwork → print-ready merch designs → ordered via API from print-on-demand services. End-to-end pipeline from creative concept to physical product. The brand is **AI-generated merch** — every design is created by AI, and the wording (if any) varies per piece. Some shirts are pure visual art, others are self-referential text designs, others mix both.

## Pipeline

1. **Design** — Generate artwork using `generate-image.js` (Flux, Ideogram, Recraft, etc.)
2. **Prepare** — Ensure print-ready specs: 4500x5400px (15"x18" @ 300 DPI), PNG, transparent or white background
3. **Submit** — Upload design + create product via Printify/Printful API using `generate-tshirt.js`
4. **Publish** — Product goes live on connected storefront (Etsy, Shopify, standalone)

## Print Services (API)

**Note (Jan 2025)**: Printful and Printify merged into **Fyul**. Both APIs remain operational. Diversify across providers.

| Service | API | Strengths | Env Vars |
|---------|-----|-----------|----------|
| Printify (Fyul) | `api.printify.com/v1` | 100+ providers, competitive pricing, huge catalog | `PRINTIFY_API_TOKEN`, `PRINTIFY_SHOP_ID` |
| Printful (Fyul) | `api.printful.com` | Premium quality, DTG + embroidery, mockup generator | `PRINTFUL_API_TOKEN` |
| Gelato | `gelato.com` | 140+ hubs, 32 countries, 72-hour delivery, no commission, sustainability leader | `GELATO_API_KEY` |
| Gooten | `gooten.com` | 200+ products, flat-rate shipping, strong home décor catalog | `GOOTEN_API_KEY` |

## Print Specs

- **Minimum resolution**: 300 DPI
- **Recommended canvas**: 4500 x 5400 px (standard front print area)
- **Format**: PNG with transparency (preferred) or white background
- **Color space**: sRGB
- **Max file size**: 200 MB (Printify), 200 MB (Printful)

## Brand Identity

The umbrella brand is **AI-generated merch**. Text on shirts varies — it's a design variable, not the brand.

Proven text variants (from real products):
- "AI DESIGNED THIS T-SHIRT."
- "AI CREATED ME THIS T-SHIRT"
- "Made by AI. Worn by human."
- "100% AI Generated. 0% Human Effort."
- "Prompt: 'Design me a cool t-shirt' → This"
- No text (pure AI art)

## Collections

### AI-Generated Meta (active)

Self-referential designs that acknowledge their AI origin. 6 design variants generated. See [collections/ai-created-me/](collections/ai-created-me/README.md) for full concept and designs.

### AI Parodies (planned — 13 collections)

Parodies of the top-selling POD themes, filtered through AI self-awareness. Research-backed from Redbubble best sellers and Amazon trending data. 13 themed collections, 75+ designs total. See [collections/ai-parodies/](collections/ai-parodies/README.md) for full research and design briefs.

Priority order: Fake Band Tees → AI Travel Bureau → Corporat.AI → Classic Art Mashups → AI Concert Series

### Future Collections

- **Pure AI Art** — Abstract, surreal, or photorealistic AI-generated visuals (no text)
- **Azorean Rap** — Album art and cultural visuals from the Sandro G project
- **Alex Finch** — Animated character art series
- **Cultural Mashup** — Flags, languages, and cross-cultural AI art
- **Posters** — Same AI pipeline, larger format (18x24, 24x36)

## Media Structure

```
media/
  designs/     — print-ready artwork files (4500x5400 PNG)
  mockups/     — product mockup images from API
```

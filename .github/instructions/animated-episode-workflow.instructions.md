---
description: "Animated episode production — 3-model shot strategy, character consistency, timing constraints, 8-phase pipeline"
applyTo: "**/storyboard*,**/concept*,**/*episode*,**/*shot*"
---

# Animated Episode Production — Operational Patterns

**Classification**: Procedural Memory | Production Reference  
**Activation**: storyboard, animated episode, cartoon, shot, scene, character consistency  
**Source**: Empirically derived from Alex Finch: Detective Episode 00, March 2026

---

## Synapses

- [.github/instructions/image-handling.instructions.md] (High, Complements, Forward) — "image-handling covers model selection; this covers episode-level production orchestration"
- [.github/instructions/replicate-3d-workflow.instructions.md] (Medium, Parallel, Bidirectional) — "same empirical-from-production pattern, different domain"
- [projects/alex-breakfast/storyboard-ep00.md] (Critical, Exemplifies, Forward) — "reference implementation of this workflow"
- [generate-video.js] (Critical, Governs, Forward) — "primary script for video clip generation"
- [generate-edit-video.js] (High, Governs, Forward) — "post-production: avmerge, audiomix, caption"

---

## Rule 1 — Three Models, Three Shot Types

| Shot type | Model | Why |
|-----------|-------|-----|
| Environment, wide, POV, glyph scenes | `grok` | Flexible 1–15s, handles complex backgrounds |
| Dialog, acting, close-ups, emotional beats | `hailuo23` | Best micro-expression rendering |
| Cinematic camera moves, closing shots | `veo3fast` | Clean camera motion, high visual quality |

**Default assignment**: start with grok for every shot, then upgrade to hailuo23 only where acting/dialog is the primary content.

---

## Rule 2 — hailuo23 Timing: 6s or 10s ONLY

`hailuo23` **does not accept arbitrary durations**. Its `buildInput` function snaps to either 6 or 10 seconds.

- Dialog shots → **6s** (minimum, default for dialog)
- Long emotional beat or extended scene → **10s**
- Everything else (4s, 5s, 7s, 8s, 9s) → **silently snaps to nearest valid** or errors

**ALWAYS check**: If a storyboard specifies 4s or 5s for a `hailuo23` shot, fix it to **6s** before running.

---

## Rule 3 — veo3fast Timing: 4s, 6s, or 8s ONLY

`veo3fast` only accepts durations of **4, 6, or 8 seconds**.

- POV push / dramatic close-up → **6s**
- Lingering wide / final reveal → **8s**
- Quick cutaway → **4s**

**7s on veo3fast = invalid.** Fix to 6s or 8s.

---

## Rule 4 — Character Consistency via --image

Without a reference image, characters visually diverge across shots. Every `generate-video.js` call must include:

```
--image ./projects/<project-name>/reference.png
```

The reference image should show:
- All main characters in the target visual style
- Key environment/props (kitchen, furniture, etc.)
- Established color palette

**Do not skip this flag** even for environment-only shots — it anchors the visual language.

---

## Rule 5 — Per-Shot Tool Annotation

Every storyboard shot should include a **`**Tool**:`** line with the exact runnable command:

```markdown
**Model**: `hailuo23`
**Tool**: `generate-video.js --model hailuo23 --duration 6 --image prologue.png`
```

This converts the storyboard from a creative document into an executable production script.

---

## Rule 6 — audiomix for Multi-Track Audio

`avmerge` only handles **one audio track** (video + single audio). For narration + background music together, use `audiomix`:

```powershell
node generate-edit-video.js `
  --video ep00-with-narration.mp4 `
  --audio narration.mp3 `
  --music background-music.mp3 `
  --music-volume 0.25 `
  --model audiomix
```

FFmpeg filter: `amix=inputs=2:duration=first:dropout_transition=3`  
Narration vol = 1.0 (fixed), music vol = `--music-volume` (default 0.3, recommend 0.2–0.3).

**Pipeline order**: generate video clips → concat → **avmerge** (VO on silent) → **audiomix** (blend + music)

---

## 8-Phase Production Pipeline

| Phase | Script | Key Command |
|-------|--------|-------------|
| 1. Video clips | `generate-video.js` | `--model grok/hailuo23/veo3fast --duration N --image ref.png` |
| 2. Title card | `generate-image.js` | `--model ideoturbo --aspect 16:9` |
| 3. Narration | `generate-voice.js` | `--model elevenv3` |
| 4. Music | `generate-music.js` | `--model music15` |
| 5. Concat | `ffmpeg-static` | `-f concat -safe 0 -i concat-list.txt` |
| 6. Lay VO | `generate-edit-video.js` | `--model avmerge` |
| 7. Blend music | `generate-edit-video.js` | `--model audiomix --music-volume 0.25` |
| 8. Captions | `generate-edit-video.js` | `--model caption` (optional) |

---

## Storyboard Structure (reference format)

```markdown
## Production Notes
### Tools Used in This Episode
| Phase | Script | Key Flags | Purpose |
...

### Model Timing Rules
### Character Consistency
### Style Anchor

## ACT 1 — [TITLE]
### SHOT 01 — [Name]
**Type**: Wide
**Duration**: 7 sec
**Model**: `grok`
**Tool**: `generate-video.js --model grok --duration 7 --image ref.png`

**Visual**: [camera + content description]
**Dialog**: [spoken lines]
**Sound**: [ambient/music cues]
**Prompt**:
```[full generation prompt]```

## Production Pipeline
### Phase 1 — Generate Video Clips
[full PowerShell loop with $shots array]
```

*Animated episode production procedural memory — operationalizes the 3-model strategy and 8-phase pipeline for animated short-form episodes*

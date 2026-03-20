# generate-video.js

![Video Generation](../assets/banner-video.png)

Text-to-video generation via Replicate. Supports 17 models with optional image-to-video, audio generation, and configurable duration/aspect/resolution.

## Quick Start

```bash
node scripts/generate-video.js "A cat playing piano in a jazz club"
node scripts/generate-video.js "A cat playing piano" --model veo3
node scripts/generate-video.js "Person running" --model grok --duration 10 --image ./photo.jpg
node scripts/generate-video.js "Sunset scene" --aspect 9:16 --resolution 1080p
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Video model to use | `veo3fast` |
| `--duration <secs>` | Video length in seconds | model-specific |
| `--image <path>` | Reference image for image-to-video (local file or URL) | — |
| `--aspect <ratio>` | Aspect ratio (16:9, 9:16, 1:1) | `16:9` |
| `--resolution <res>` | Resolution (720p, 1080p) | model-specific |
| `--negative <text>` | Negative prompt (things to avoid) | — |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `veo3fast` | `google/veo-3.1-fast` | Veo 3.1 Fast | $0.15/sec (audio), $0.10/sec (silent) |
| `veo3` | `google/veo-3.1` | Veo 3.1 | $0.40/sec (audio), $0.20/sec (silent) |
| `grok` | `xai/grok-imagine-video` | Grok Video | $0.05/sec |
| `gen45` | `runwayml/gen-4.5` | Gen-4.5 (Runway) | $0.12/sec |
| `kling` | `kwaivgi/kling-v3-video` | Kling v3 | $0.22/sec (pro), $0.17/sec (standard) |
| `kling26` | `kwaivgi/kling-v2.6` | Kling v2.6 | variable |
| `kling3omni` | `kwaivgi/kling-v3-omni-video` | Kling v3 Omni | variable |
| `sora` | `openai/sora-2` | Sora-2 | $0.10/sec |
| `sora2pro` | `openai/sora-2-pro` | Sora-2 Pro | $0.30/sec (standard), $0.50/sec (high) |
| `seedance` | `bytedance/seedance-1-lite` | Seedance Lite | $0.036/sec (720p) |
| `seedpro` | `bytedance/seedance-1-pro` | Seedance Pro | $0.15/sec (1080p) |
| `pixverse` | `pixverse/pixverse-v5.6` | PixVerse v5.6 | variable |
| `hailuo` | `minimax/hailuo-02` | Hailuo-02 | variable |
| `hailuo23` | `minimax/hailuo-2.3` | Hailuo-2.3 | variable |
| `ray2` | `luma/ray-2-720p` | Ray 2 (Luma) | $0.18/sec |
| `rayflash` | `luma/ray-flash-2-720p` | Ray Flash 2 (Luma) | $0.06/sec |
| `wan` | `wan-video/wan-2.5-t2v-fast` | WAN 2.5 Fast | $0.068/sec (720p) |

## Parameter Support Matrix

| Model | prompt | duration | image | aspect | resolution | negative | audio |
|-------|:------:|:--------:|:-----:|:------:|:----------:|:--------:|:-----:|
| `veo3fast` | ✅ | 4/6/8 | ✅ | ✅ | ✅ | ✅ | ✅ auto |
| `veo3` | ✅ | 4/6/8 | ✅ | ✅ | ✅ | ✅ | ✅ auto |
| `grok` | ✅ | 1–15 | ✅ | ✅ | ✅ | — | ✅ auto |
| `gen45` | ✅ | 5–10 | ✅ | ✅ | — | — | — |
| `kling` | ✅ | 3–15 | ✅ | ✅ | ✅ (mode) | ✅ | optional |
| `kling26` | ✅ | 5–10 | ✅ | ✅ | — | ✅ | ✅ auto |
| `kling3omni` | ✅ | 3–15 | ✅ | ✅ | ✅ (mode) | — | — |
| `sora` | ✅ | 4–12 | ✅ | ✅ | — | — | ✅ auto |
| `sora2pro` | ✅ | 4/8/12 | ✅ | ✅ | ✅ | — | ✅ auto |
| `seedance` | ✅ | 2–12 | ✅ | ✅ | ✅ | — | — |
| `seedpro` | ✅ | 2–12 | ✅ | ✅ | ✅ | — | — |
| `pixverse` | ✅ | 5/10 | ✅ | ✅ | ✅ (quality) | ✅ | ✅ auto |
| `hailuo` | ✅ | 6/10 | ✅ | — | ✅ | — | — |
| `hailuo23` | ✅ | 6/10 | ✅ | — | ✅ | — | — |
| `ray2` | ✅ | 5/9 | ✅ | ✅ | — | — | — |
| `rayflash` | ✅ | 5/9 | ✅ | ✅ | — | — | — |
| `wan` | ✅ | 5–10 | — | ✅ | — | ✅ | ✅ auto |

## Notes

- **Default model**: `veo3fast` (Veo 3.1 Fast) — best balance of speed, quality, and cost
- **Image-to-video**: Most models accept `--image` to use as the first frame or reference
- **Audio**: Models marked "auto" generate synchronized audio automatically; Kling v3 supports optional `generate_audio`
- **Duration**: Fixed values (e.g., 5/9) mean only those exact values are accepted; ranges (e.g., 3–15) accept any integer in range
- **Aspect ratios**: Sora models use "portrait"/"landscape" internally (mapped from 9:16/16:9)
- **`grok` audio**: Grok i2v writes an empty audio container but generates zero audio samples — `hasAudio` is `false`; use `avmerge` to add speech post-generation
- **`veo3fast` real-person photos**: May flag reference images of real people; use aged/stylized images instead
- Output saved to `./media/video/` with JSON report

## Talking-Head Video Workflow

Proven pipeline for generating a person speaking to camera with synchronized speech:

```bash
# Step 1 — Age-progress reference photo to target age (if needed)
node scripts/generate-image.js "A sharp 26-year-old man in a dark navy suit, sharp intelligent features, professional studio lighting" --model nanapro --image assets/alex-reference.png

# Step 2 — Generate video with Kling v2.6 (best motion quality for talking-head i2v)
node scripts/generate-video.js "A sharp 26-year-old man in a dark navy suit looking directly into camera, speaking to the audience about [topic]. Calm, confident, broadcast-quality delivery. Professional studio lighting." --model kling26 --image <aged-image.jpg> --duration 10

# Step 3 — Generate speech with ElevenLabs
node scripts/generate-voice.js "[script text]" --model elevenv3

# Step 4 — Merge video + speech (outputs stereo AAC)
node scripts/generate-edit-video.js --model avmerge --video <video.mp4> --audio <speech.mp3>
```

**Model selection notes:**
- `kling26` — best overall motion quality for talking-head i2v
- `grok` — best lip sync, but no native audio (requires post-merge with `avmerge`)
- `veo3fast` / `sora` — may flag real-person reference photos

**Prompt pattern for best results:**
> *"A sharp [age]-year-old [description] looking directly into camera, speaking to the audience about [topic]. Calm, confident, broadcast-quality delivery. Professional studio lighting."*

**Playback note:** VS Code's built-in media player does not reliably play audio in MP4 files. Always verify in VLC or a browser.

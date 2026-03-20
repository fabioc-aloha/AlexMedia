# generate-music.js

![Music Generation](../assets/banner-music.png)

AI music generation via Replicate. 5 models covering instrumental, vocal tracks, and full songs with lyrics.

## Quick Start

```bash
# Default (MiniMax Music 1.5)
node scripts/generate-music.js "epic orchestral battle theme"

# With lyrics
node scripts/generate-music.js "upbeat pop song" --lyrics "[verse]\nSunshine on my face\n[chorus]\nLa la la"

# Stable Audio with duration
node scripts/generate-music.js "ambient electronic" --model stableaudio --duration 120

# ElevenLabs Music
node scripts/generate-music.js "jazz piano lounge" --model elevenmusic --lengthms 60000

# Google Lyria 2
node scripts/generate-music.js "cinematic trailer music" --model lyria2 --seed 42
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Music model to use | `music15` |
| `--seed <n>` | Random seed | — |
| `--format <str>` | Output format (mp3, wav, flac) | — |
| `--bitrate <n>` | Audio bitrate bps | — |
| `--samplerate <n>` | Sample rate Hz | — |
| `--lyrics <str>` | Song lyrics with `[verse]`, `[chorus]` tags | — |
| `--duration <n>` | Duration in seconds (1–190) | — |
| `--steps <n>` | Diffusion steps 4–8 | — |
| `--cfgscale <n>` | CFG scale 1–25 | — |
| `--negprompt <str>` | Negative prompt | — |
| `--lengthms <n>` | Length in ms (5000–300000) | — |
| `--vocals` | Include vocals | — |
| `--voice <str>` | Voice style for vocals | — |
| `--songfile <path>` | Reference song file | — |
| `--voicefile <path>` | Voice reference file | — |
| `--instrfile <path>` | Instrumental reference file | — |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `music15` | `minimax/music-1.5` | MiniMax Music 1.5 | $0.03/file |
| `music01` | `minimax/music-01` | MiniMax Music 01 | $0.035/file |
| `stableaudio` | `stability-ai/stable-audio-2.5` | Stable Audio 2.5 | $0.20/file |
| `elevenmusic` | `elevenlabs/music` | ElevenLabs Music | $8.30/1K sec |
| `lyria2` | `google/lyria-2` | Google Lyria 2 | $2/1K sec |

## Parameter Support Matrix

| Model | prompt | lyrics | duration | seed | format | steps | cfgscale | negprompt | lengthms | vocals | reference files |
|-------|:------:|:------:|:--------:|:----:|:------:|:-----:|:--------:|:---------:|:--------:|:------:|:---------------:|
| `music15` | ✅ | ✅ | — | — | ✅ | — | — | — | — | — | — |
| `music01` | ✅ | ✅ | — | — | — | — | — | — | — | — | ✅ (song/voice/instr) |
| `stableaudio` | ✅ | — | ✅ (1–190s) | ✅ | — | ✅ (4–8) | ✅ (1–25) | — | — | — | — |
| `elevenmusic` | ✅ | — | — | — | ✅ | — | — | — | ✅ (5K–300K ms) | ✅ | — |
| `lyria2` | ✅ | — | — | ✅ | — | — | — | ✅ | — | — | — |

## Notes

- **Default model**: `music15` (MiniMax Music 1.5)
- **MiniMax Music 1.5**: Full songs up to ~4 minutes with `[verse]`, `[chorus]`, `[bridge]` lyrics tags
- **MiniMax Music 01**: Supports reference audio files (song, voice, instrumental) for style transfer
- **Stable Audio 2.5**: Diffusion-based with controllable steps and CFG scale
- **ElevenLabs Music**: Duration via `--lengthms` in milliseconds; supports vocals toggle
- **Lyria 2**: Google's model with negative prompt support
- Output saved to `./media/audio/` as audio file + JSON report

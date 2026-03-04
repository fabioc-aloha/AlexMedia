# generate-edit-video.js

Video editing, processing, and manipulation via Replicate and FFmpeg. 10 models covering video modification, reframing, trimming, merging, extraction, upscaling, and captioning.

## Quick Start

```bash
# AI video modification (default)
node generate-edit-video.js "make it look cinematic" --video ./clip.mp4

# Reframe aspect ratio
node generate-edit-video.js --model reframe --video ./clip.mp4 --aspect 9:16

# Trim video
node generate-edit-video.js --model trim --video ./clip.mp4 --start 5 --end 15

# Merge videos
node generate-edit-video.js --model merge --video ./clip1.mp4 --extra ./clip2.mp4

# Add audio to video
node generate-edit-video.js --model avmerge --video ./clip.mp4 --audio ./track.mp3

# Extract frames
node generate-edit-video.js --model frames --video ./clip.mp4 --format png

# Upscale video
node generate-edit-video.js --model upscale --video ./clip.mp4 --resolution 4k

# Add captions
node generate-edit-video.js --model caption --video ./clip.mp4
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Edit model to use | `modify` |
| `--video <path>` | Input video (**required** for all models) | — |
| `--audio <path>` | Audio file (for avmerge) | — |
| `--extra <path>` | Second video file (for merge) | — |
| `--aspect <ratio>` | Target aspect ratio (for reframe) | — |
| `--mode <str>` | Processing mode | — |
| `--start <n>` | Start time in seconds (for trim) | — |
| `--end <n>` | End time in seconds (for trim) | — |
| `--duration <n>` | Duration in seconds | — |
| `--resolution <str>` | Target resolution (720p, 1080p, 4k) | — |
| `--task <str>` | Processing task type | — |
| `--format <str>` | Output format (mp4, gif, png) | — |
| `--first-frame` | Extract first frame only | — |

## Models

| Key | Replicate ID / Engine | Name | Cost |
|-----|----------------------|------|------|
| `modify` | `minimax/video-01-live` | MiniMax Video-01 Live | $0.035/sec |
| `reframe` | FFmpeg (local) | Smart Reframe | free (local) |
| `trim` | FFmpeg (local) | Video Trim | free (local) |
| `merge` | FFmpeg (local) | Video Merge | free (local) |
| `avmerge` | FFmpeg (local) | Audio-Video Merge | free (local) |
| `extract` | FFmpeg (local) | Audio Extract | free (local) |
| `frames` | FFmpeg (local) | Frame Extract | free (local) |
| `upscale` | `philz1337x/clarity-upscaler` | Clarity Upscaler | per-second GPU |
| `caption` | `fictions-ai/autocaption` | AutoCaption | per-second GPU |
| `utils` | FFmpeg (local) | Video Utilities | free (local) |

## Parameter Support Matrix

| Model | prompt | video | audio | extra | aspect | start/end | resolution | format | first-frame |
|-------|:------:|:-----:|:-----:|:-----:|:------:|:---------:|:----------:|:------:|:-----------:|
| `modify` | ✅ | ✅ req | — | — | — | — | — | — | ✅ |
| `reframe` | — | ✅ req | — | — | ✅ req | — | — | — | — |
| `trim` | — | ✅ req | — | — | — | ✅ req | ✅ | — | — |
| `merge` | — | ✅ req | — | ✅ req | — | — | — | — | — |
| `avmerge` | — | ✅ req | ✅ req | — | — | — | — | — | — |
| `extract` | — | ✅ req | — | — | — | — | — | ✅ | — |
| `frames` | — | ✅ req | — | — | — | ✅ | — | ✅ | — |
| `upscale` | — | ✅ req | — | — | — | — | ✅ | — | — |
| `caption` | — | ✅ req | — | — | — | — | — | — | — |
| `utils` | — | ✅ req | — | — | — | — | — | — | — |

## Model Categories

### AI-Powered
- **modify** — MiniMax Video-01 Live: prompt-guided video editing/style transfer
- **upscale** — Clarity Upscaler: AI-enhanced resolution upscaling
- **caption** — AutoCaption: automatic subtitle/caption generation

### FFmpeg-Based (Local, Free)
- **reframe** — Smart Reframe: crop/reframe to target aspect ratio
- **trim** — Video Trim: extract segment by start/end times
- **merge** — Video Merge: concatenate two video files
- **avmerge** — Audio-Video Merge: combine audio track with video
- **extract** — Audio Extract: strip audio from video file
- **frames** — Frame Extract: export frames as images
- **utils** — Video Utilities: miscellaneous FFmpeg operations

## Notes

- **All models require `--video`** — this is an editing script
- **FFmpeg models** run locally at no cost; only `modify`, `upscale`, and `caption` use Replicate API
- **modify** uses MiniMax Video-01 Live for AI-driven video transformation; pass `--first-frame` to process only the first frame
- **reframe** requires `--aspect` (e.g. `9:16`, `16:9`, `1:1`)
- **trim** requires both `--start` and `--end` in seconds
- **merge** requires `--extra` with the path to the second video
- **avmerge** requires `--audio` with the audio track to overlay
- Output saved to `./output/` with appropriate extension + JSON report

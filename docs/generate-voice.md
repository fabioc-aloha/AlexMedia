# generate-voice.js

Dedicated text-to-speech and voice cloning via Replicate. 15 models spanning MiniMax, Resemble AI, ElevenLabs, Qwen, and Kokoro.

## Quick Start

```bash
# Default (MiniMax Speech 2.8 Turbo)
node generate-voice.js "Hello, welcome to the demo!"

# Specific model + voice
node generate-voice.js "Breaking news today" --model elevenv3 --voice Rachel
node generate-voice.js "Bonjour le monde" --model chatmlang --audio ./french-sample.mp3

# Voice cloning
node generate-voice.js --model mmclone --audio ./voice-sample.mp3

# Qwen3 TTS with voice design
node generate-voice.js "Hello" --model qwentts --mode voice_design --voicedesc "young female, warm"
```

## CLI Options

### Common Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | Voice model to use | `mm28turbo` |
| `--voice <name>` | Voice ID or name | — |
| `--speed <n>` | Speech speed multiplier | — |
| `--seed <n>` | Random seed | — |
| `--audio <path>` | Reference audio file (clone/ref) | — |
| `--format <str>` | Output format (mp3, wav, flac, pcm) | — |

### MiniMax Options

| Option | Description |
|--------|-------------|
| `--pitch <val>` | Pitch offset in semitones |
| `--volume <n>` | Volume level 0–10 |
| `--emotion <str>` | Emotion (happy, sad, angry, fearful, disgusted, surprised, auto) |
| `--bitrate <n>` | Audio bitrate bps |
| `--channel <str>` | mono or stereo |
| `--samplerate <n>` | Sample rate Hz |
| `--language <str>` | Language code |
| `--subtitle` | Enable subtitle metadata |
| `--normalize` | Enable English normalization |

### Chatterbox Options

| Option | Description |
|--------|-------------|
| `--temperature <n>` | Generation temperature |
| `--exaggeration <n>` | Speech expressiveness |
| `--cfgweight <n>` | CFG/pace weight |
| `--topk <n>` | Top-K sampling (Turbo) |
| `--topp <n>` | Top-P sampling (Turbo) |
| `--penalty <n>` | Repetition penalty (Turbo) |
| `--customvoice <str>` | Custom voice UUID (Pro) |

### Qwen3 TTS Options

| Option | Description |
|--------|-------------|
| `--mode <str>` | TTS mode: custom_voice, voice_clone, voice_design |
| `--reftext <str>` | Reference transcript (voice_clone mode) |
| `--styleinst <str>` | Style instruction text |
| `--voicedesc <str>` | Voice description (voice_design mode) |

### ElevenLabs Options

| Option | Description |
|--------|-------------|
| `--stability <n>` | Voice stability 0–1 |
| `--similarity <n>` | Similarity boost 0–1 |
| `--elstyle <n>` | Style exaggeration 0–1 |
| `--prevtext <str>` | Previous text context |
| `--nexttext <str>` | Next text context |

### Voice Cloning Options (MiniMax)

| Option | Description |
|--------|-------------|
| `--accuracy <n>` | Clone accuracy threshold 0–1 |
| `--noisereduction` | Enable noise reduction on reference |
| `--volumenorm` | Enable volume normalization |
| `--clonemodel <str>` | Target model (speech-02-turbo or speech-02-hd) |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `mm28turbo` | `minimax/speech-2.8-turbo` | MiniMax Speech 2.8 Turbo | $0.06/1K tokens |
| `mm28hd` | `minimax/speech-2.8-hd` | MiniMax Speech 2.8 HD | $0.10/1K tokens |
| `mm02turbo` | `minimax/speech-02-turbo` | MiniMax Speech 02 Turbo | $0.06/1K tokens |
| `mm02hd` | `minimax/speech-02-hd` | MiniMax Speech 02 HD | $0.10/1K tokens |
| `mm26turbo` | `minimax/speech-2.6-turbo` | MiniMax Speech 2.6 Turbo | $0.06/1K tokens |
| `mm26hd` | `minimax/speech-2.6-hd` | MiniMax Speech 2.6 HD | $0.10/1K tokens |
| `mmclone` | `minimax/voice-cloning` | MiniMax Voice Cloning | $3/output |
| `chatterbox` | `resemble-ai/chatterbox` | Resemble Chatterbox | $0.025/1K chars |
| `chatturbo` | `resemble-ai/chatterbox-turbo` | Resemble Chatterbox Turbo | $0.025/1K chars |
| `chatpro` | `resemble-ai/chatterbox-pro` | Resemble Chatterbox Pro | $0.04/1K chars |
| `chatmlang` | `resemble-ai/chatterbox-multilingual` | Resemble Chatterbox Multilingual | variable |
| `qwentts` | `amphion/qwen3-tts` | Qwen3 TTS | $0.02/1K chars |
| `elevenv3` | `elevenlabs/el-multilingual-v3` | ElevenLabs v3 | $0.10/1K chars |
| `eleventurbo` | `elevenlabs/el-turbo-v2.5` | ElevenLabs Turbo v2.5 | $0.05/1K chars |
| `kokoro` | `jaaari/kokoro-82m` | Kokoro 82M | per-second GPU |

## Parameter Support Matrix

| Model | text | voice | speed | pitch | volume | emotion | audio ref | language | temperature | format |
|-------|:----:|:-----:|:-----:|:-----:|:------:|:-------:|:---------:|:--------:|:-----------:|:------:|
| `mm28turbo` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | ✅ |
| `mm28hd` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | ✅ |
| `mm02turbo` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | ✅ |
| `mm02hd` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | ✅ |
| `mm26turbo` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | ✅ |
| `mm26hd` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | ✅ | — | ✅ |
| `mmclone` | — | — | — | — | — | — | ✅ req | — | — | — |
| `chatterbox` | ✅ | — | — | — | — | — | ✅ | — | ✅ | — |
| `chatturbo` | ✅ | — | — | — | — | — | ✅ | — | ✅ | — |
| `chatpro` | ✅ | ✅ | — | ✅ | — | — | — | — | — | — |
| `chatmlang` | ✅ | — | — | — | — | — | ✅ | ✅ | ✅ | — |
| `qwentts` | ✅ | — | — | — | — | — | ✅ | — | ✅ | — |
| `elevenv3` | ✅ | ✅ | ✅ | — | — | — | — | ✅ | — | — |
| `eleventurbo` | ✅ | ✅ | ✅ | — | — | — | — | ✅ | — | — |
| `kokoro` | ✅ | ✅ | ✅ | — | — | — | — | — | — | — |

## Notes

- **Default model**: `mm28turbo` (MiniMax Speech 2.8 Turbo)
- **MiniMax models** share a common parameter set: voice, speed, pitch, volume, emotion, language, format
- **Voice cloning** (`mmclone`) requires `--audio` with a voice sample; outputs a voice_id
- **Qwen3 TTS** has 3 modes: custom_voice (preset), voice_clone (reference audio), voice_design (description)
- **ElevenLabs** models support fine-tuned stability/similarity/style parameters
- **Kokoro** is minimal — just text, voice, and speed
- Output saved to `./output/` as audio file + JSON report

# generate-3d.js

3D model generation from text prompts and images via Replicate. 6 models producing meshes in GLB, OBJ, PLY, and STL formats.

## Quick Start

```bash
# Default (Trellis)
node generate-3d.js "a medieval sword"

# From image
node generate-3d.js "3d model" --model trellis --image ./sword.png

# Rodin with quality setting
node generate-3d.js "a cute robot" --model rodin --quality high --material PBR

# Hunyuan3D multi-view
node generate-3d.js "a spaceship" --model hunyuan --steps 50 --guidance 7.5

# ShapeE (fast, lightweight)
node generate-3d.js "a chair" --model shape --guidance 15
```

## CLI Options

| Option | Description | Default |
|--------|-------------|---------|
| `--model <name>` | 3D model to use | `trellis` |
| `--image <path>` | Input image for image-to-3D | — |
| `--seed <n>` | Random seed | — |
| `--format <str>` | Output format (glb, obj, ply, stl) | — |
| `--faces <n>` | Target face count for mesh | — |
| `--quality <str>` | Quality level (low, medium, high, extra-high) | — |
| `--material <str>` | Material type (PBR, Shaded) | — |
| `--meshmode <str>` | Mesh extraction mode | — |
| `--tpose` | Generate in T-pose (for characters) | — |
| `--preview` | Generate preview image | — |
| `--steps <n>` | Diffusion steps | — |
| `--guidance <n>` | Guidance scale | — |
| `--texture <str>` | Texture resolution/type | — |
| `--simplify <n>` | Mesh simplification ratio | — |
| `--color <path>` | Color map input | — |
| `--normal <path>` | Normal map input | — |
| `--ply` | Output PLY format | — |
| `--nobg` | Remove background from input image | — |
| `--chunks <n>` | Processing chunks | — |
| `--octree <n>` | Octree resolution | — |
| `--speedmode <str>` | Speed/quality tradeoff | — |
| `--negative <str>` | Negative prompt | — |
| `--maxsteps <n>` | Maximum generation steps | — |
| `--mesh <str>` | Mesh type/quality | — |
| `--rendermode <str>` | Render mode for preview | — |
| `--rendersize <n>` | Render resolution | — |
| `--count <n>` | Number of outputs | — |
| `--bbox <str>` | Bounding box constraints | — |
| `--addons <str>` | Additional features | — |
| `--front <path>` | Front view image (multi-view) | — |
| `--back <path>` | Back view image (multi-view) | — |
| `--left <path>` | Left view image (multi-view) | — |
| `--right <path>` | Right view image (multi-view) | — |

## Models

| Key | Replicate ID | Name | Cost |
|-----|-------------|------|------|
| `trellis` | `microsoft/trellis` | Microsoft TRELLIS | $0.10/run |
| `rodin` | `hyperhuman/rodin` | Rodin Gen-2 | $0.50/run |
| `hunyuan` | `tencent/hunyuan3d-2` | Hunyuan3D 2.0 | $0.10/run |
| `hunyuan2mv` | `tencent/hunyuan3d-2mv` | Hunyuan3D 2.0 Multi-View | $0.10/run |
| `mvdream` | `adirik/mvdream` | MVDream | per-second GPU |
| `shape` | `cjwbw/shap-e` | Shap-E (OpenAI) | per-second GPU |

## Parameter Support Matrix

| Model | prompt | image | seed | format | faces | quality | material | steps | guidance | multi-view |
|-------|:------:|:-----:|:----:|:------:|:-----:|:-------:|:--------:|:-----:|:--------:|:----------:|
| `trellis` | ✅ | ✅ | ✅ | ✅ (glb) | — | — | — | ✅ | — | — |
| `rodin` | ✅ | ✅ | — | ✅ | ✅ | ✅ | ✅ | — | — | ✅ |
| `hunyuan` | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | — |
| `hunyuan2mv` | ✅ | ✅ | ✅ | ✅ | ✅ | — | — | ✅ | ✅ | ✅ |
| `mvdream` | ✅ | — | ✅ | — | — | — | — | ✅ | ✅ | — |
| `shape` | ✅ | — | ✅ | — | — | — | — | — | ✅ | — |

## Notes

- **Default model**: `trellis` (Microsoft TRELLIS)
- **Image-to-3D**: Most models accept `--image` for reconstructing 3D from photos
- **Multi-view**: `rodin` and `hunyuan2mv` support `--front`, `--back`, `--left`, `--right` reference images
- **Rodin**: Most feature-rich with quality levels, PBR materials, T-pose, and face count control
- **Shap-E**: Fastest/cheapest but lowest quality; good for prototyping
- **Hunyuan3D**: Good balance of quality and speed with diffusion controls
- Output saved to `./output/` as 3D model file + JSON report

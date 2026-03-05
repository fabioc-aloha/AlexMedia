# Alex Finch: Detective — Series Concept

## Logline

A thirteen-year-old with a compulsive eye for pattern-breaking details navigates the chaos of
family life, middle school, and increasingly real mysteries — armed only with a spiral notebook,
a suspicious older sister, and a brain that never stops cataloging.

---

## Series Identity

| Attribute | Value |
|-----------|-------|
| Format | Animated short-form episodes (3–8 min) |
| Target Audience | Kids 10–14 + parents who watch with them |
| Tone | Witty, warm, slightly melancholy — *Diary of a Wimpy Kid* meets *Monk* |
| Visual Style | Soft American cartoon (Studio Ghibli warmth × Cartoon Network energy) |
| Signature Device | **The Analytical Overlay** — glowing purple/amber runes that appear when Alex's brain activates |
| Music Identity | Light acoustic jazz + ticking clock undertones; detective stings on revelations |
| Narrative Mode | First-person voiceover (Alex as unreliable-but-accurate narrator) |

---

## World

**Finch Household, Maplewood Drive** — A well-worn but loved suburban home. Morning light
through curtains. Mail on the porch before 9 AM is a disturbance in the Force. The kitchen is
command central: round table, spice rack (frequency-ordered — or it *should* be), refrigerator
with a grocery list magnetized to it, and one window with a direct sightline to the garage door.

The world is normal. What's abnormal is Alex's relationship with normal.

---

## Characters

### Alex Finch (13)
- **Appearance**: Curly auburn/copper hair, bright green eyes, green shirt, slight build. Freckles.
  Perpetually mild scowl of focused attention. Carries a small black notebook.
- **Voice**: Dry, articulate, one beat behind socially — not because he's slow, because he's
  already three steps ahead. Narrates everything internally.
- **The Power**: When concentration activates, glowing analytical glyphs orbit his head —
  purple runes, amber equations, cyan question marks. Visible only to the audience.
- **Core Wound**: He notices *everything* except what people are actually feeling.

### Maya Finch (17)
- **Appearance**: Wavy auburn hair (slightly darker than Alex's), purple hoodie, phone always
  nearby. Expressive face — eye-rolls are her love language.
- **Voice**: Quick, sardonic, but when the sarcasm drops there's something quietly fierce.
- **Role**: The Reluctant Partner. Mocks Alex's detective obsession but subtly enables it.
  Her "just don't get hurt" moments reveal the big sister underneath.

### Mom (Finch) (42)
- **Appearance**: Practical nurse's bun, scrubs (blue/teal), warm brown eyes, perpetually a
  little tired but always present. Her coffee mug is a character.
- **Voice**: Wry, loving, runs on 5 hours of sleep and caffeinated willpower.
- **Role**: The Grounding Force. She taught Alex to observe ("Observation is a superpower").
  When *she* doesn't notice something, the audience knows it matters.

---

## The Analytical Overlay — Visual Language

Alex's signature power is a **HUD of consciousness** — not magic, just how his brain works
externalized for the audience:

| Trigger | Visual | Sound |
|---------|--------|-------|
| First scan of environment | Glyphs slowly orbit | Soft hum, musical tones |
| Anomaly detected | Glyph pulses bright amber + magnify | Soft *ping* |
| Timeline reconstruction | Floating clock face + colored timestamps | Ticking + rewind tone |
| Deduction complete | All glyphs collapse into single bright point | Resonant chord |
| Uncertainty | Glyphs scatter slightly, question mark pulses | Dissonant note |

The glyphs should always feel **organic, not technological** — more like living ink than a
computer interface. They're part of Alex, not something he wears.

---

## Episode 00 — "Before the Fall" (Prologue)

### Episode Summary

Alex's ordinary Tuesday morning becomes a catalog of micro-anomalies: a reordered spice rack,
a face-down phone, early mail, and an unexplained dent in the garage door. Through breakfast
banter with Maya and a rushed send-off from Mom, we establish the family and Alex's observational
superpower — and plant the first seed of genuine mystery.

**Runtime target**: 3:00 – 3:30
**Mood arc**: Playful → Warm → Quietly unsettled
**Ends on**: Alex alone at the table, the garage door visible through the window

### Episode Themes

1. **Pattern vs. coincidence** — Alex's thesis statement. The closing monologue.
2. **The cost of noticing** — noticing everything means missing what matters.
3. **Family as home base** — the warmth of the breakfast scene is the safety net for what comes.

### Visual Palette

| Time-of-Day | Palette |
|-------------|---------|
| Opening (7:00 AM) | Amber gold, warm shadows, honeyed light through curtains |
| Midscene (7:15 AM) | Slightly cooler, crisp — morning settling in |
| Closing (7:23 AM) | Muted warm, slightly lonely — after the door closes |

---

## Production Strategy

### Clip Breakdown (26 clips → ~3 min episode)

Each clip is 4–8 seconds. Assembled with FFmpeg concat demuxer exactly as the gymnastics
compilation workflow.

### Model Selection

| Scene Type | Model | Rationale |
|------------|-------|-----------|
| Establishing shots | `grok` | Fast, cinematic wide angles |
| Character close-ups with emotion | `hailuo23` | Best subtle human expression |
| Analytical Overlay activation | `grok` + post-composite | Glyphs added via image edit |
| Mom's "falter" moment | `hailuo23` | Micro-expression requires quality |
| Final lonely wide shot | `veo3fast` | Cinematic depth for closing beat |

### Generation Order

1. All `grok` establishing/wide shots first (fastest)
2. `hailuo23` close-ups (slowest — queue last)
3. Title card as static image (generate-image.js, ideoturbo)

---

## Assets Needed

- [x] Reference image: `prologue.png` (kitchen, Alex + Maya, established style)
- [ ] Character sheet: Alex expression set (neutral, squint, glyph-active, smile)
- [ ] Character sheet: Maya expression set (eye-roll, fond, warning)
- [ ] Background: Kitchen, morning (pan-able)
- [ ] Background: Garage door exterior, morning
- [ ] Title card: "Alex Finch: Detective" in the visual style

---

## Style Reference Notes (from prologue.png)

- Cartoon style is warm American animation with anime-adjacent expressiveness
- Alex's glyphs: purple/amber on a translucent field, orbit counter-clockwise
- Kitchen: round white table, pendant lamp, sink window with plants, spice rack right side
- Lighting: High amber, soft shadows, warm interior vs. bright window exterior
- Character line weight: Clean, confident, slightly thick — Cartoon Network sensibility
- Backgrounds: Slightly painterly with soft detail (Studio Ghibli influence)

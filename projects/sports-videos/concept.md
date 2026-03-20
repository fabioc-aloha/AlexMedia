# Concept: Gymnastics Competition Videos

**Project:** AI-Generated Gymnastics Competition Clips
**Design Approach:** Broadcast-quality athletic motion — leotards, arena lighting, competition atmosphere
**Target:** A collection of cinematic competition clips across artistic and rhythmic gymnastics disciplines

---

## Model Selection

| Goal | Model | Cost | Why |
|------|-------|------|-----|
| Human motion (primary) | `hailuo23` | ~$0.05/sec | Built for human body motion + VFX |
| Broadcast + crowd audio | `veo3fast` | $0.15/sec (audio) | Native arena ambience, particle detail |
| Maximum realism hero shots | `veo3` | $0.40/sec | Highest fidelity for signature moments |
| Full choreography (10s) | `kling` | $0.22/sec | 15s max, cinematic 1080p |

---

## Women's Artistic Gymnastics

### Floor Exercise

```bash
# Tumbling pass — full-twisting double tuck
node scripts/generate-video.js "A gymnast in a competition leotard sprints across the floor exercise mat, launches into a powerful round-off back handspring, soars into a full-twisting double tuck salto, lands perfectly stuck with arms raised, audience applause, Olympic floor exercise venue, broadcast angle" --model hailuo23 --duration 8

# Dance element — split leap
node scripts/generate-video.js "A gymnast in a glittering competition leotard performs a split leap across the floor exercise mat, legs at 180 degrees and fully pointed, body fully extended at the apex, artistic expression on her face, competition arena spotlights, slow-motion broadcast angle" --model hailuo23 --duration 6

# Full floor routine — opening to dismount
node scripts/generate-video.js "A gymnast in a sparkling competition leotard opens her floor exercise routine with a dramatic pose, launches into a tumbling pass, transitions through balletic choreography, then finishes with a powerful front layout full-twist to perfectly stuck landing, arms extended, Olympic arena, full competition atmosphere" --model kling --duration 10
```

### Balance Beam

```bash
# Back walkover series
node scripts/generate-video.js "A gymnast in a competition leotard performs on the balance beam, executes a series of sharp back walkovers in perfect succession, pointed toes brushing the beam on each pass, competition arena lighting, side-on broadcast close-up, slow-motion" --model hailuo23 --duration 8

# Arabesque and leap combination
node scripts/generate-video.js "Gymnast in competition leotard pauses in a perfect arabesque balance on the balance beam, one leg raised perfectly vertical, arms in elegant first position, holds the pose for two counts, then launches into a side aerial over the beam, competition arena, broadcast quality" --model veo3fast --duration 8

# Dismount — double tuck
node scripts/generate-video.js "Gymnast in competition leotard swings to the end of the balance beam, launches into a full double-tuck dismount, two tight rotations in the air above the mat, lands stuck with a controlled chest-forward stance, raises arms to the judges, arena crowd reacts, side-on slow-motion" --model hailuo23 --duration 8
```

### Uneven Bars

```bash
# Tkatchev release move
node scripts/generate-video.js "Gymnast in competition leotard swings on the uneven bars at full speed, releases the high bar at the apex, performs a layout Tkatchev — body fully extended horizontal in the air — regrasps cleanly, chalk dust bursts from her hands on regrasp, gymnastics arena spotlights, side-on slow-motion" --model veo3fast --duration 8

# Shaposhnikova transition
node scripts/generate-video.js "A gymnast in a competition leotard transitions from the low bar to the high bar in a sweeping Shaposhnikova, body arching in a smooth counterswing, regrasps the high bar at the peak of her arc, chalk mist in the arena lights, slow-motion, broadcast side camera" --model hailuo23 --duration 8

# Pak salto + pirouette
node scripts/generate-video.js "Gymnast in competition leotard executes a Pak salto from high bar to low bar, body in a tight hollow position, catches the low bar cleanly, swings through to a handstand pirouette, perfect vertical line at the top, chalk-lit arena, competition crowd visible, slow-motion" --model hailuo23 --duration 8

# Dismount — double layout
node scripts/generate-video.js "Uneven bars dismount: gymnast in competition leotard swings to release from the high bar, opens to a stretched double layout — two fully open rotations above the mat — and sticks the landing with arms outstretched, chalk cloud rising, arena crowd erupts, Olympic venue, side-on broadcast slow-motion" --model veo3 --duration 8
```

### Vault

```bash
# Yurchenko double pike
node scripts/generate-video.js "Gymnast in competition leotard runs the vault runway at full speed, round-off onto the springboard, back handspring onto the vault table, explosively blocks and launches into a high double pike rotation, perfect stuck landing, arms raised to the judges, Olympic arena crowd, broadcast side angle slow-motion" --model veo3 --duration 8

# Amanar — Yurchenko 2.5 twist
node scripts/generate-video.js "Gymnast in competition leotard executes an Amanar vault — round-off, back handspring onto the table, launches into 2.5 twisting layout, tight twist visible in slow-motion, sticks a powerful landing with bent knees absorbing impact, arena crowd noise, broadcast angle" --model hailuo23 --duration 8
```

---

## Men's Artistic Gymnastics

### Floor Exercise

```bash
# Power tumbling pass — double back layout
node scripts/generate-video.js "A male gymnast in competition singlet sprints the floor exercise diagonal, launches into a round-off double-back layout, body fully extended and parallel to the floor at the apex, sticks the landing with a single step, powerful expression, Olympic arena, broadcast slow-motion" --model hailuo23 --duration 8
```

### Rings

```bash
# Iron cross
node scripts/generate-video.js "Male gymnast in competition singlet on still rings holds a perfect iron cross — arms outstretched horizontally, body rigid and vertical, visible muscle tension in his chest and shoulders, holds for two seconds, then presses to handstand in a single powerful motion, gymnastics arena broadcast angle, chalk dust settling" --model hailuo23 --duration 8

# Maltese cross
node scripts/generate-video.js "Male gymnast on still rings in a Maltese cross — body parallel to the floor, arms extended wide, full body horizontal supported only by the rings, extreme tension across the chest and arms visible, holds the position for two counts, arena lighting from above, slow-motion broadcast" --model veo3fast --duration 8
```

### Horizontal Bar

```bash
# Kolman release and regrasp
node scripts/generate-video.js "Male gymnast on horizontal bar, giant swings building speed, releases into a soaring layout Kolman release — full pirouette above the bar — regrasps cleanly, continues to another giant, chalk explodes from hands on regrasp, Olympic gymnastics hall, side camera slow-motion" --model veo3fast --duration 8

# Triple-twisting double tuck dismount
node scripts/generate-video.js "Male gymnast on horizontal bar swings through a series of giants, releases into a massive triple-twisting double tuck dismount, three full twists completed above the mat, feet hit the ground in a clean stick, arena erupts, broadcast side-on slow-motion, chalk cloud" --model veo3 --duration 8
```

### Parallel Bars

```bash
# Diamidov pirouette
node scripts/generate-video.js "Male gymnast on parallel bars swings to one-arm handstand, executes a Diamidov — single arm pirouette at the top — lands back on both bars cleanly, continues flowing swing sequence, competition singlet, arena lighting, slow-motion side broadcast" --model hailuo23 --duration 8
```

### Pommel Horse

```bash
# Flairs and circle combination
node scripts/generate-video.js "Male gymnast in competition singlet performs flairs on the pommel horse — legs swinging wide in sweeping circles, transitions through scissor elements, maintains perfect hip height, hands moving precisely from pommel to pommel, rhythmic and controlled, slow-motion competition broadcast" --model hailuo23 --duration 8
```

---

## Rhythmic Gymnastics

```bash
# Ribbon — split leap + spiral
node scripts/generate-video.js "Rhythmic gymnast in a glittering competition leotard performs to classical music, spinning ribbon traces sweeping spirals and figure-eights through the air, gymnasts body in deep backbend and arabesque, floor exercise carpet, competition arena, elegant broadcast camera" --model kling --duration 10

# Hoop — toss and catch in split leap
node scripts/generate-video.js "Rhythmic gymnast in competition leotard tosses a hoop high above the floor, executes a split leap, catches the hoop behind her back in a seamless fluid motion, ribbon of movement captured in slow-motion, competition arena, audience visible behind" --model veo3fast --duration 8

# Ball — rolling and balancing
node scripts/generate-video.js "Rhythmic gymnast in competition leotard rolls a ball across outstretched arms and the back of her neck, transitions into a back walkover while the ball rolls the length of her spine, catches it perfectly, arena competition atmosphere, close-up broadcast angle" --model hailuo23 --duration 8

# Clubs — double throw and catch
node scripts/generate-video.js "Rhythmic gymnast in sparkling competition leotard throws both clubs simultaneously high into the arena lights, performs a leap underneath, catches both perfectly, continues into a pirouette series, clubs in continuous motion, competition floor, broadcast slow-motion" --model veo3fast --duration 8
```

---

## Competition Atmosphere Clips

```bash
# Award ceremony podium
node scripts/generate-video.js "Three gymnasts in competition leotards stand on the Olympic gymnastics podium, gold silver bronze positions, bouquets in hand, judges and arena visible behind, crowd applause, national flag rising, broadcast wide shot transitioning to close-ups of each face" --model veo3fast --duration 8

# Chalk routine
node scripts/generate-video.js "Female gymnast in competition leotard chalks her hands and grips at the chalk block beside the uneven bars, intense focus on her face, takes a breath, turns and approaches the bar, arena crowd in the background, slow-motion close-up" --model hailuo23 --duration 6

# All-around competition overview
node scripts/generate-video.js "Women's gymnastics all-around competition: gymnasts in competition leotards competing simultaneously across all four apparatus — vault, uneven bars, balance beam, and floor exercise — Olympic arena at full capacity, scoreboards visible, crowd energy, broadcast multi-angle coverage" --model veo3fast --duration 8
```

---

## Prompt Engineering Notes

| Element | What to write |
|---------|---------------|
| Costume | "competition leotard", "sparkling competition leotard", "glittering leotard", "competition singlet" (men) |
| Venue | "Olympic gymnastics arena", "World Championships venue", "competition floor", "gymnastics arena spotlights" |
| Camera | "side-on broadcast angle", "broadcast close-up", "slow-motion broadcast", "side camera slow-motion" |
| Slow-motion | "slow-motion", "ultra slow-motion", "broadcast slow-motion" |
| Atmosphere | "arena crowd reacts", "audience applause", "arena crowd erupts", "chalk dust settling" |
| Precision cues | "perfectly stuck landing", "arms raised to judges", "pointed toes", "fully extended" |

---

## Generation Order (Recommended)

1. Start with `hailuo23` — best body mechanics, cheapest iteration
2. Use `veo3fast` for clips where crowd audio or chalk particle detail matters
3. Use `veo3` only for the 2-3 hero shots (vault, dismount) — $3.20 per clip
4. Use `kling` for full 10-second choreography sequences (rhythmic routines)

```bash
# Best starting clip — floor tumbling pass
node scripts/generate-video.js "A gymnast in a competition leotard sprints across the floor exercise mat, launches into a powerful round-off back handspring, soars into a full-twisting double tuck salto, lands perfectly stuck with arms raised, Olympic floor exercise venue" --model hailuo23 --duration 8
```

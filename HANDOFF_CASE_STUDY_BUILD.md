# Handoff — Rebuilding the Lola Case Study (Portfolio UI)

**Document type:** Builder handoff — recreate `.figma-export-audit/` from scratch  
**Audience:** Designers, frontend engineers, or agents continuing the portfolio  
**Production truth:** `HANDOFF_BOOK.md` (product, flows, eng filenames) — **this doc is UI/build truth**  
**Story / narrative:** `HANDOFF_STORY_ARC.md` — **read this first for copy, arc, and what to say once**  
**Last aligned:** June 2026

---

## 1. What you are building

A **single-page portfolio case study** for **Project Lola** — a bilingual WhatsApp assistant on La Bodega’s weekly deals thread (Calhoun, GA). It is **not** the live Competitor Watch app in the repo root; it lives in:

```
competitor-watch/.figma-export-audit/
```

**Goals for reviewers (hiring manager, design lead, engineer):**

| Reader | Time | Should leave with |
|--------|------|-------------------|
| Hiring manager | ~6 min | Problem → Lola → live pilot link |
| Design lead | ~15 min | Before/after flows, staff ops, EN/ES |
| Engineer | depth | Reference appendix, file names, 427 tests |

**Voice:** Retail-plain (“vs last week”, Up/Down %) — not academic UX (“empathize”, “ideation maps”).  
**Shopper name in demos:** **María** / **María García** (`PILOT_SHOPPER`) — never generic “Danny”.

---

## 2. Bootstrap

```bash
cd .figma-export-audit
npm install
npm run dev    # http://localhost:5173
npm run build  # outputs frontend/dist
```

| Package | Purpose |
|---------|---------|
| React 18 + Vite 6 | App shell |
| Tailwind 4 (`@tailwindcss/vite`) | Utilities + design tokens via CSS vars |
| **gsap** + **ScrollTrigger** | Pinned scroll hero (`scrub: true` only — no time-based autoplay) |
| **lenis** | Smooth scroll (wired inside `LolaScrollNarrative`) |

**Entry:** `src/main.tsx` → `src/app/App.tsx`  
**Styles:** `src/styles/index.css` imports `adp-tokens.css`, `lola-scroll-narrative.css`, `tailwind.css`

---

## 3. Information architecture (three folds)

```
App.tsx
├── ChapterNav          # sticky nav: Bet | System | Proof | Reference
├── Fold I  (#overview) Fold1Bet
├── Fold II (#system)   Fold2System
├── Fold III (#proof)   Fold3Proof
└── ReferenceSection    # appendix after proof
```

### Fold I — Hook (~90s skim)

| Block | Component | Notes |
|-------|-----------|-------|
| Pinned scroll hero | `LolaScrollNarrative` | 400vh, 4 visual acts — **story arc in `HANDOFF_STORY_ARC.md`** |
| Credentials strip | `Fold1Credentials` | `FOLD1_CREDENTIALS_LEAD` + 2 chips + caveat + dual CTA |
| Role pointer | `Act1Hook` | `FOLD1_ROLE_LINE` → `#role` (no ownership table here) |
| Live anchors | `ProductionTruthStrip` | WhatsApp, wacrm, 427 tests |

**Removed from Fold I (intentionally):** `TldrStrip`, `StoryBody`, `BusinessBet`, `OwnershipBlock`, `ProjectMeta` below hero.

### Fold II — The system (~3 min)

| Section | ID | Component |
|---------|-----|-----------|
| Scope | `#role` | `OwnershipBlock` (top of fold) |
| Evidence | `#evidence` | `Act2Problem` → `ProblemTabs` (default **Inbox** tab) |
| Solution + flows | `#solution` | `Act3Flows` → `FlowExplorer`, `StaffOpsPreview` |

**Star asset:** `FlowExplorer` — Before Lola (CRM) vs After Lola (live) tabs, six flows, step-through UI, fixed **300px** WhatsApp phone (`--wa-phone-w: 300px`).

### Fold III — Proof (~2 min)

| Section | Component |
|---------|-----------|
| Design craft | `Act4Craft` → `FeaturedDecisions`, `PivotLog` |
| Pilot proof | `Act5Proof` → `ScrollTimeline`, `ImpactOutcomes`, footer |
| Reference appendix | `ReferenceSection` → full ledger, trade-offs, modes, handoff |

---

## 4. Headline spine (single source of truth)

Defined in `src/case-study/constants.ts` as `HEADLINE_SPINE`:

| Key | Copy |
|-----|------|
| **primary** | Bilingual WhatsApp assistant for the weekly shop |
| **supporting** | No new app — same thread families already use. |

**Must stay in sync across:**

- `LOLA_SCROLL_ACTS[0]` in `lolaScrollCopy.ts` (scroll hero)
- `STORY.headline` / `heroThesis`
- `FOLDS[0].title` / `lead`
- `SITE.description` (OG)

Do **not** introduce a fourth headline variant in Fold I.

---

## 5. Scroll hero spec (`LolaScrollNarrative`)

**Files:**

- `src/case-study/LolaScrollNarrative.tsx` — logic + markup
- `src/case-study/lolaScrollCopy.ts` — assets, acts, bubbles, service steps
- `src/styles/lola-scroll-narrative.css` — layout + fold1 credentials

### Mechanics

| Rule | Value |
|------|-------|
| Wrapper height | `400vh` |
| Pinned stage | `100vw × 100vh`, GSAP `pin: true`, `scrub: true` |
| Background | `#eeedec` → white in final act |
| Store image | `object-fit: cover`, `object-position: 72% 68%` |
| Reduced motion | Static act 1 only; hide particles/service |

### Four acts (scroll progress 0 → 1)

| Progress | Visual | Copy (left track, max ~40% width) |
|----------|--------|-------------------------------------|
| **0–22%** | Isometric store (`hero-isometric.png`) | **Already on WhatsApp** — context before conflict |
| **22–50%** | Store zoom ~1.1×; **left bubbles**; **inbox phone** | “Outreach worked. Replies didn’t.” |
| **50–72%** | Store fades; **framed Lola character** | “Meet Lola” + `HEADLINE_SPINE` |
| **72–100%** | Service **panels** + hotspot legend; **exit CTAs** at ~84% | “Message → answer → pickup” |

### Problem bubbles (`PROBLEM_BUBBLES`)

- **Only in act 2** (22–54% progress) — never bleed into credentials or Fold II
- Positioned on **left** with explicit `x`/`y` % for readable spread
- Examples: `¿Están abiertos?`, `chicken sale still on?`, voice note waveform

### Inbox phone (act 2)

- `PhoneFrame` with `inbox` prop + `WaBroadcastHeader` + customer-only bubbles
- Footnote: `BROADCAST_LEGACY.summary` (numbered menu, no tap buttons)
- Wrapper: `.lola-scroll-phone-wrap` — scale down on mobile

### End-of-scroll CTAs

Fade in at 84–94% progress:

- `Explore the flows ↓` → `#solution`
- `Message Lola on WhatsApp` → `WHATSAPP_LIVE.waMe`

### Scroll hero constraints (do not break)

1. **No roof animations** — only scale, opacity, crossfade between raster images  
2. **No time-based autoplay** inside pinned path — all motion maps to scroll position  
3. **Particles/bubbles isolated to act 2**  
4. **Preserve eng file names** in proof/reference: `mode-resolver.ts`, `inbound-transcribe.ts`, `conversation-list.tsx`  
5. **Hero images must be native resolution** — never ship chat-compressed 1024px exports for 3840 displays

---

## 6. Asset inventory

Place under `public/`:

| Path | Use | Target resolution |
|------|-----|-------------------|
| `/store/hero-isometric.png` | Scroll acts 1–2 store bg | **3840×2160** (`la_bodega_right_space_hero_3840x2160.png`) |
| `/store/aisle-fp.png` | (legacy aisle transition — optional) | 1920×1080+ |
| `/store/aisle.png` | Legacy hero / validation | — |
| `/store/isometric.png` | Legacy | 1024×576 high-quality fallback |
| `/hero/lola-character.png` | Meet Lola frame | **1672×941** minimum |
| `/hero/lola-service-full.png` | Service act infographic | **1672×941** minimum |
| `/hero/lola-service-panels.png` | 3-panel service art (future hotspots) | — |
| `/broadcast-header-store.png` | WhatsApp template header in flows | — |

**Pixelation rule:** If the file is 1024×576 and displayed full-bleed on a 1920px+ screen, it **will** look soft. Always verify with:

```powershell
Add-Type -AssemblyName System.Drawing
$b = [System.Drawing.Image]::FromFile("path\to\file.png")
"$($b.Width)x$($b.Height)"
```

---

## 7. Copy architecture

### Single source: `constants.ts`

| Export | Purpose |
|--------|---------|
| `HEADLINE_SPINE` | Unified headline |
| `FOLD1_CHIPS` | Below-hero credentials |
| `STORY` | Legacy skim blocks (used outside Fold I hero) |
| `HERO` | Chips, inbox pills, contrast quotes |
| `FOLDS` / `TLDR` | Three-fold skim cards |
| `BROADCAST_LEGACY` / `BROADCAST_LEGACY_VARIANTS` | Pre-Lola numbered menus |
| `BROADCAST_LOLA_INTRO` | After-state on same template image |
| `PILOT_SHOPPER` | María |
| `PRODUCTION_FACTS` | Live links strip |
| `PRODUCTION_GAPS` | Honest portfolio vs prod deltas |
| `WHATSAPP_LIVE` | `(404) 323-8325`, wa.me link |
| Flow step data | Used by `FlowExplorer` |

### Scroll-only copy: `lolaScrollCopy.ts`

- `LOLA_SCROLL_ACTS` — four act titles (see `HANDOFF_STORY_ARC.md`)
- `PROBLEM_BUBBLES` — inbox chaos labels
- `SERVICE_HOTSPOTS` — service act legend (not duplicate step pills)

**Rule:** Fold I scroll tells the story once. Fold II opens with evidence tabs — **do not** paste the same paragraph a third time.

---

## 8. Production-aligned flow rules

When editing `FlowExplorer` / `ValidationLedger`, preserve:

### Pre-Lola broadcast

- Template **image** + **numbered menu** below (not tap buttons)
- Bilingual update: reply `1` = specials wall, `2` = delivery list
- Spanish join: reply `3` = weekend offers
- Off-menu question → dead-end / manual inbox (no Lola path)

### After Lola

- Same template image; intro copy + **three quick replies** (`BROADCAST_LOLA_INTRO`)
- Greeting includes **🔁 Same as last**
- Pickup flow ends with **staff** ready message (not customer self-confirm only)
- Shopper: **María García**

### Phone UI

- Fixed width: `300px` — never squeeze the frame in responsive grids
- Classes: `cs-wa-phone-wrap`, `cs-flow-explorer`, `cs-validation-phones`

---

## 9. Key component map

```
case-study/
├── LolaScrollNarrative.tsx    # Fold I pinned hero
├── Fold1Credentials.tsx       # Post-scroll CTAs + bridge line
├── FeaturedDecisions.tsx      # 2 main-path decisions
├── PivotLog.tsx               # 4-row pivot table (main path)
├── lolaScrollCopy.ts          # Hero assets + act copy
├── constants.ts               # All product/copy truth for UI
├── whatsapp.tsx               # PhoneFrame, WaBubble, WaBroadcastHeader
├── FlowExplorer.tsx           # Interactive before/after flows
├── ValidationLedger.tsx       # Before/after phones (Reference only)
├── ProductionTruthStrip.tsx   # Live pilot facts
├── ChapterNav.tsx             # Sticky nav
├── acts/
│   ├── Fold1Bet.tsx
│   ├── Fold2System.tsx
│   ├── Fold3Proof.tsx
│   ├── Act1Hook.tsx           # LolaScrollNarrative + credentials
│   ├── Act2Problem.tsx
│   ├── Act3Flows.tsx
│   ├── Act4Craft.tsx
│   └── Act5Proof.tsx
└── ReferenceSection.tsx       # Deep appendix
```

**Legacy (do not wire back into Fold I without intent):** `StoreScrollStage.tsx`, `ScrollTimeline.tsx`, `BusinessBet` in hero.

---

## 10. Design system

- Tokens: `src/styles/adp-tokens.css` — `--cs-*` variables (ink, muted, brand, spacing)
- Section UI patterns: `cs-page`, `cs-btn-primary`, `cs-btn-secondary`, `cs-skim-card`
- Typography: Inter via `fonts.css`
- UI language: plain retail — **“vs last week”**, not “WoW”

---

## 11. Navigation model

Three overlapping systems — keep IDs aligned:

| System | IDs |
|--------|-----|
| Folds | `#overview`, `#system`, `#proof` |
| ChapterNav / ACTS | same + `#reference` |
| Subsections | `#evidence`, `#solution`, `#design` |

`CTA.exploreFlowsHref` = `#solution`

---

## 12. Environment / deploy

Optional in `.env.local`:

```
VITE_SITE_URL=https://your-deploy.vercel.app
VITE_PORTFOLIO_BACK_URL=https://dannyvr.framer.ai/
VITE_PORTFOLIO_LINKEDIN=...
VITE_PORTFOLIO_EMAIL=...
```

Copy `HANDOFF_BOOK.md` to `public/HANDOFF_BOOK.md` for static download parity.

---

## 13. Recreation checklist

Use this order when rebuilding from zero:

- [ ] Scaffold Vite + React + Tailwind in `.figma-export-audit/`
- [ ] Port `constants.ts` from `HANDOFF_BOOK.md` facts (broadcast menus, María, 427 tests, wacrm URL)
- [ ] Add `public/store/hero-isometric.png` at **3840×2160**
- [ ] Add `public/hero/lola-character.png` and `lola-service-full.png` at **≥1672×941**
- [ ] Build `whatsapp.tsx` phone frame (300px fixed)
- [ ] Build `LolaScrollNarrative` (400vh, 4 acts, Lenis + GSAP scrub)
- [ ] Add `Fold1Credentials` — bridge line + chips; **no** `TldrStrip` or `StoryBody`
- [ ] Wire `Fold2System`: `#role` → evidence (Inbox default) → `FlowExplorer` → `StaffOpsPreview`
- [ ] Wire `Fold3Proof`: `FeaturedDecisions` + `PivotLog` + proof; depth in `ReferenceSection`
- [ ] Run `npm run build`; hard-refresh to bust image cache
- [ ] Skim test: arc per `HANDOFF_STORY_ARC.md` — hero → Before/After broadcast → footer WhatsApp

---

## 14. Known gaps (document, don’t hide)

From `PRODUCTION_GAPS` in `constants.ts` — show in `ReferenceSection`:

- Reminder cron EN-only in production (`lang: 'en'` hardcoded)
- Reply 2 delivery list copy — verify against live CRM export
- Other items as added

---

## 15. Related documents

| File | Role |
|------|------|
| `HANDOFF_STORY_ARC.md` | **Narrative spine, story beats, copy-once rules** |
| `HANDOFF_BOOK.md` | Product, architecture, eng behavior — **source of truth for claims** |
| `public/HANDOFF_BOOK.md` | Same, served statically |
| `design-system/` (repo root) | Tokens if syncing with main app |
| `AGENTS.md` | Competitor Watch app (different product) |

---

## 16. Anti-patterns (lessons from this build)

1. **Shipping 1024px chat exports** as full-bleed heroes → pixelation on retina  
2. **Repeating the problem** in scroll hero + `StoryBody` + `Act2Problem` title  
3. **Split headline spine** across hero, TLDR, and constants  
4. **Particles spilling** into white metrics / typography columns  
5. **Replacing María** with author name in shopper demos  
6. **Squeezing phone mocks** below 300px in flow grids  
7. **Academic fold labels** in UI (“empathize phase”) — keep dividers plain: “The system”, “Proof & craft”

---

*For product behavior, routing modes, and eng file paths, always defer to `HANDOFF_BOOK.md`. For UI structure and scroll hero mechanics, defer to this document and `lolaScrollCopy.ts`.*

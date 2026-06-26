# Handoff — Lola Case Study Story Arc

**Document type:** Narrative & content architecture handoff  
**Audience:** Writers, designers, frontend engineers, or agents shaping the portfolio story  
**Companion docs:** `HANDOFF_CASE_STUDY_BUILD.md` (UI/mechanics) · `HANDOFF_BOOK.md` (product/eng truth)  
**Last aligned:** June 2026

---

## 1. What this document is for

This handoff defines **how to tell the Lola story once**, with a clear arc — not a feature list repeated in tables.

| Doc | Answers |
|-----|---------|
| **This doc** | *What is the story?* Where does each beat live? What do we say only once? |
| `HANDOFF_CASE_STUDY_BUILD.md` | *How is it built?* GSAP, components, assets, fold wiring |
| `HANDOFF_BOOK.md` | *What is true in production?* Routing, copy, eng filenames |

**Golden rule:** Every story beat has **one primary surface** on the main scroll path. Depth and repetition belong in **Reference**, not in Fold I–III.

---

## 2. The story in one paragraph

La Bodega’s bilingual families already plan the weekly shop on WhatsApp — the same thread they use for family chat. Weekly volante blasts **reached** regulars, but every reply landed in **one staff inbox**: hours, SNAP, voice notes, pickup asks, often answered hours later or not at all during rush. The bet was not a new app — it was **Lola**, a mascot-led assistant on the broadcast thread families already use: flyer-grounded answers, tap-first flows, and staff relay when facts aren’t in the knowledge base. Under Meta limits and neighborhood trust stakes, the pilot shipped six interactive flows, two-tier staff alerts, and 427 regression tests — with qualitative proof live today and quantitative baselines wiring next.

---

## 3. Story arc model

Use a **three-act portfolio arc** mapped to three folds. The scroll hero is the **prologue** (visual, no essay).

```
PROLOGUE (scroll, ~90s)
  Context → Problem → Protagonist → Promise

ACT I  — Hook          (#overview)   Stakes + credibility + CTA into proof
ACT II — The system    (#system)     Evidence → interactive climax → staff ops
ACT III — Proof        (#proof)      Craft decisions → pilot signals → close

EPILOGUE — Reference   (#reference)  Full pivot log, eng depth, handoff book
```

### Dramatic roles

| Role | In this story | Not |
|------|----------------|-----|
| **Protagonist** | Shopper (María) + staff on the floor | Lola as hero alone — Lola is the *tool* |
| **Antagonist** | One inbox + manual queue + trust risk of wrong prices | “AI” as villain |
| **Constraint** | No IT team · no shopper app · Meta template limits | Abstract “lack of resources” |
| **Turning point** | Same template image, numbered menu → Lola + tap buttons | “We added chatbot” |
| **Climax** | FlowExplorer: reader toggles Before/After and steps through pickup | Long problem essay |
| **Resolution** | Live pilot + honest baselines + one reflection line | Fake metrics |

---

## 4. Prologue — scroll hero (four beats)

**File:** `src/case-study/lolaScrollCopy.ts` → `LOLA_SCROLL_ACTS`  
**Component:** `LolaScrollNarrative.tsx` (400vh, scrub-only)

Each beat is **one idea**. Do not restate these beats in Fold I credentials or Fold II headers.

| # | Progress | Story function | Title (canonical) | What the reader should *feel* |
|---|----------|----------------|-------------------|-------------------------------|
| 1 | 0–22% | **World** | Already on WhatsApp | “This store is already in their pocket.” |
| 2 | 22–50% | **Conflict** | Outreach worked. Replies didn't. | “The blast worked; the thread broke down.” |
| 3 | 50–72% | **Protagonist intro** | Meet Lola | “Same thread — now structured.” |
| 4 | 72–100% | **Promise** | Message → answer → pickup | “End-to-end loop, not a FAQ bot.” |

### Visual ↔ copy contract

| Beat | Visual | Copy track (left, max ~40% width) |
|------|--------|-------------------------------------|
| 1 | Isometric store, full bleed | Context kicker + “Already on WhatsApp” |
| 2 | Store zoom; left bubbles; inbox phone (unanswered) | Problem title only — bubbles *show* the inbox |
| 3 | Framed Lola character | Meet Lola + `HEADLINE_SPINE` |
| 4 | Service panels + hotspot legend | Service title; no duplicate step pills |

**Exit (84–94% scroll):** `Explore the flows ↓` → `#solution` · `Message Lola on WhatsApp`

### Scroll constraints (narrative)

1. **Act 2 owns the problem** — Fold II opens on *evidence*, not “one inbox” essay again.  
2. **Act 3 owns the product name** — `HEADLINE_SPINE.primary` appears here, not in act 1 title.  
3. **Grounded caveat** appears once below hero (`LOLA_GROUNDED_CAVEAT`), not in scroll act 3 body.  
4. **María** appears in flows and broadcasts, never as the author name in shopper turns.

---

## 5. Act I — Hook (`#overview`)

**Goal:** Credibility + single bridge sentence into Act II. **Time:** ~90s after scroll.

| Block | Component | Story job | Canonical copy source |
|-------|-----------|-----------|------------------------|
| Scroll prologue | `LolaScrollNarrative` | Full arc setup | `lolaScrollCopy.ts` |
| Bridge line | `Fold1Credentials` | Cause → solution in one breath | `FOLD1_CREDENTIALS_LEAD` |
| Stakes chips | `Fold1Credentials` | Problem + proof at a glance | `FOLD1_CHIPS` (2 chips max) |
| Trust | `Fold1Credentials` | AI caveat at commitment | `LOLA_GROUNDED_CAVEAT` |
| Role pointer | `Act1Hook` | Scope without table | `FOLD1_ROLE_LINE` → `#role` |
| Live proof | `ProductionTruthStrip` | WhatsApp · wacrm · 427 tests | `PRODUCTION_FACTS` |

### Canonical below-hero copy

```ts
// constants.ts
FOLD1_CREDENTIALS_LEAD =
  "Outreach worked. Replies didn't. Lola answers on the same WhatsApp thread families already use."

FOLD1_CHIPS = [
  { label: "Problem", text: "One inbox after every deal blast" },
  { label: "Proof", text: "Live pilot · 427 regression tests" },
]

LOLA_GROUNDED_CAVEAT =
  "Answers pull from this week's flyer and store FAQ — not invented prices. Staff relay when it needs a human."
```

### What Act I must NOT include

- `TldrStrip` (third summary of three folds)  
- `StoryBody` / `BusinessBet` essay under hero  
- Full ownership table (lives in Act II `#role`)  
- Journey map or before/after phones (climax is FlowExplorer)

---

## 6. Act II — The system (`#system`)

**Goal:** Prove the story with evidence, then let the reader **experience** the solution. **Time:** ~3 min.

### Beat order (do not reorder)

```
1. Scope boundary     OwnershipBlock (#role)     — what Danny shipped vs eng
2. Evidence           Act2Problem (#evidence)    — real threads, default Inbox tab
3. Climax             FlowExplorer (#solution)   — Before → After on broadcast
4. B-plot ops         StaffOpsPreview            — staff alerts complete the loop
```

### 6.1 Scope boundary (`#role`)

**Story function:** Establish author credibility without ego — “I designed the conversation; eng shipped routing.”

- One table: `I_SHIPPED` vs `I_DID_NOT_SHIP`  
- One line: `OWNERSHIP_BOUNDARY`  
- **Say once.** Do not repeat in chips, TLDR, footer, and table.

### 6.2 Evidence (`#evidence`)

**Story function:** Show the problem was *researched*, not assumed.

| Tab | Default? | Story job |
|-----|----------|-----------|
| **Inbox** | **Yes** | Raw texture — voice note, birria thread, product ask |
| Journey | No | Before/after journey map — optional context |
| Methods | No | How we learned — rigor footer |

**Header copy (canonical):**

- Title: **From real threads**  
- Lead: **~6 weeks inbox review · 40+ volante replies · 2 counter shadows — patterns behind the flows below.**

**Do not:** `PROBLEM_POINTS` chips, “One inbox. Repeat questions.” H2, or duplicate scroll act 2 paragraphs.

### 6.3 Climax — FlowExplorer (`#solution`)

**Story function:** The reader *performs* the turning point — same template image, different behavior.

**Required reader path:**

1. Land on **Broadcast** flow (default).  
2. Read hint: *Same weekly template image — toggle Before vs After.*  
3. **Before Lola (CRM):** numbered menu → reply `1` → specials wall; off-menu question → dead inbox.  
4. **After Lola (live):** Lola intro + tap buttons → grounded chicken answer → Place order path.  
5. Optional: Pickup, List reminder, Staff help — one click each.

**Shopper:** María / María García (`PILOT_SHOPPER`) in all demo copy.

**This is the only place** the full before/after broadcast phone story must appear on the main path. ValidationLedger phones live in Reference only.

### 6.4 Staff ops (`#solution-staff-ops`)

**Story function:** Complete the loop — Lola is not “fully autonomous”; staff get buzz + dashboard when lists land.

- Draft list → staff WhatsApp + dashboard popup  
- Guest YES → confirm sound + order #  
- Birria-class ready checks stay human (honest scope)

---

## 7. Act III — Proof (`#proof`)

**Goal:** Show judgment under constraint, then close with honest pilot signals. **Time:** ~2 min.

### Beat order

```
1. Design craft       Act4Craft (#design)        — 2 featured decisions + 4-row pivot log
2. Pilot proof        Act5Proof (#pilot-outcomes) — timeline, signals, voices, reflection
3. Footer CTA         Act5Proof footer           — WhatsApp + portfolio links
4. Reference appendix ReferenceSection           — depth for eng / design lead
```

### 7.1 Design craft (`#design`)

**Story function:** “Here’s how I think” — not six generic cards.

**Main path (only):**

| Block | Content |
|-------|---------|
| `FeaturedDecisions` | **Buttons over commands** · **Two-tier staff alerts** |
| `PivotLog` | 4 rows from `PILOT_PIVOTS` |
| Quality line | `CONVERSATION_QA.lead` (427 tests) + link to Reference |

**Moved to Reference → Service design:**

- Full `ValidationLedger` (phones + table)  
- `TradeOffsCuts`  
- `ConversationModes`  
- `HearLola`  
- `RoadmapForward` (kiosk — future, not earned on main path)

### 7.2 Pilot proof (`#pilot-outcomes`)

**Story function:** Honest close — qualitative now, quantitative next.

| Block | Tone |
|-------|------|
| `ScrollTimeline` | 2024 discovery → 2025 design → 2026 live |
| `ImpactOutcomes` | Pilot signals table — no fake percentages |
| Testimonials | Max 2, paraphrased, with role |
| `REFLECTION[0]` | One takeaway: *Design the weekly shop, not the bot* |
| `NEXT_STEPS` | Baselines wiring — not a product roadmap essay |

**Do not:** Repeat “today qualitative / next quantitative” in three places. Say it once in fold header or impact intro.

---

## 8. Headline spine — say each line once

| Line | Primary surface | Never duplicate in |
|------|-----------------|-------------------|
| `HEADLINE_SPINE.primary` | Scroll act 3 subtitle | Fold I chips, Act II title, footer H2 |
| `HEADLINE_SPINE.supporting` | Scroll act 3 body | `FOLD1_CREDENTIALS_LEAD` (different job) |
| “Outreach worked. Replies didn't.” | Scroll act 2 title + `FOLD1_CREDENTIALS_LEAD` opener | Act II H2, `PROBLEM_POINTS` |
| “No new app” / same thread | Scroll act 3 + credentials bridge | Every fold lead, footer |
| 427 tests | `PRODUCTION_FACTS` + one craft line | Six section headers |
| Grounded caveat | `LOLA_GROUNDED_CAVEAT` below hero | Every AI section intro |

**Source of truth:** `constants.ts` → `HEADLINE_SPINE`, `FOLD1_CREDENTIALS_LEAD`, `LOLA_GROUNDED_CAVEAT`

---

## 9. Reader journeys (emotional goals)

### Hiring manager (~6 min)

| Step | Destination | Should feel |
|------|-------------|-------------|
| 1 | Scroll through hero | “Real store, real channel, clear problem.” |
| 2 | Tap Explore flows | “I can see before/after myself.” |
| 3 | Skim proof + footer | “Live pilot, honest about metrics.” |
| 4 | Optional WhatsApp | “I could message this today.” |

**Must not require:** Reference appendix, journey tab, trade-off tables.

### Design lead (~12 min)

| Step | Destination | Should feel |
|------|-------------|-------------|
| 1–3 | Same as HM | — |
| 4 | Inbox evidence tab | “Research-backed.” |
| 5 | Staff ops mock | “Ops was designed, not bolted on.” |
| 6 | Reference → Service | “Depth when I want it.” |

### Engineer (depth)

| Step | Destination |
|------|-------------|
| Reference → Request path | `ARCHITECTURE_LAYERS` |
| Reference → Safety | `PRODUCTION_GAPS`, Vitest suites |
| `HANDOFF_BOOK.md` | Full spec |

---

## 10. Copy templates by section

Use these as starting points when rewriting — keep retail-plain voice.

### Fold headers (`FOLDS` in `constants.ts`)

| Fold | Eyebrow | Title | Lead |
|------|---------|-------|------|
| Hook | ~90s scroll | `HEADLINE_SPINE.primary` | Outreach worked. Replies didn't. Live pilot in Calhoun, GA. |
| System | ~3 min | Flows on the weekly blast thread | Real inbox evidence → six interactive flows → staff alert surfaces. |
| Proof | ~2 min | Pilot signals and next baselines | Qualitative thread evidence now — inbox/POS metrics wiring next. |

### Section headers (main path only)

| Section | Title | Lead |
|---------|-------|------|
| Evidence | From real threads | ~6 weeks inbox review · 40+ volante replies · 2 counter shadows |
| Solution | Six flows on one thread | Start with Before Lola on the weekly blast — then switch to After. |
| Design | Decisions under constraint | Two calls that shaped the pilot — full pivot log in Reference. |
| Proof | Live pilot signals | Qualitative evidence from real threads today — quantitative baselines wiring next. |

---

## 11. Component → story beat map

```
App.tsx
├── ChapterNav                    [orientation — not story]
├── Fold1Bet                      ACT I
│   └── Act1Hook
│       ├── LolaScrollNarrative   PROLOGUE (4 beats)
│       ├── Fold1Credentials      bridge + chips + caveat + CTAs
│       └── FOLD1_ROLE_LINE       pointer → #role
│   └── ProductionTruthStrip      live anchors
├── Fold2System                   ACT II
│   ├── OwnershipBlock            #role — scope
│   ├── Act2Problem               evidence (Inbox default)
│   └── Act3Flows
│       ├── FlowExplorer          CLIMAX
│       └── StaffOpsPreview       ops coda
├── Fold3Proof                    ACT III
│   ├── Act4Craft                 craft + pivots
│   └── Act5Proof                 proof + footer
└── ReferenceSection              EPILOGUE
    └── ReferenceServicePanel     full depth
```

---

## 12. Repetition audit checklist

Before shipping copy changes, verify each beat appears **once** on the main path:

- [ ] Problem stated in scroll act 2 only (chips echo, not re-essay)  
- [ ] Before/after broadcast phones only in FlowExplorer (Reference has ValidationLedger copy)  
- [ ] `HEADLINE_SPINE.primary` in scroll act 3, not in fold I credentials lead  
- [ ] Ownership table only at `#role`  
- [ ] 427 tests in production strip + one craft mention  
- [ ] Grounded caveat only below Fold I CTAs  
- [ ] Two-tier alerts in FeaturedDecisions — not also in Act II header  
- [ ] Kiosk / forward roadmap only in Reference  
- [ ] María in all shopper demos  

---

## 13. Anti-patterns (story killers)

1. **Problem essay stacking** — scroll + chips + Act II H2 + journey + validation phones  
2. **Feature list as story** — six decision cards before the reader sees FlowExplorer  
3. **Headline drift** — four variants of “bilingual WhatsApp assistant”  
4. **Fake climax** — static screenshots where interaction is possible  
5. **Unearned future** — kiosk roadmap before pilot proof lands  
6. **Author as shopper** — breaks immersion and trust  
7. **Academic fold labels** — “Fold II · empathize” in UI  
8. **Metrics theater** — tables full of “baseline in progress” without qualitative proof first  

---

## 14. Agent / writer prompt (copy-paste)

Use when regenerating narrative copy:

```
You are writing the Lola case study (La Bodega WhatsApp assistant, Calhoun GA).

Story arc: Context (already on WhatsApp) → Conflict (outreach worked, replies didn't) →
Protagonist (Lola on same thread) → Promise (message → answer → pickup) →
Evidence (real inbox) → Climax (FlowExplorer before/after) → Craft (2 decisions + 4 pivots) →
Honest proof (live pilot, baselines next).

Rules:
- Retail-plain voice. No "WoW", no "empathize phase".
- Shopper is María, not the author.
- Each beat said ONCE on main path; depth in Reference.
- HEADLINE_SPINE in constants.ts is single source for product headline.
- Problem title: "Outreach worked. Replies didn't."
- Constraint: no new app, no IT team, Meta template limits.
- Trust: flyer-grounded, staff relay — one caveat below hero CTAs.

Defer product claims to HANDOFF_BOOK.md.
```

---

## 15. Related files to edit together

| When you change… | Also update… |
|------------------|--------------|
| Scroll act copy | `lolaScrollCopy.ts` only |
| Product headline | `HEADLINE_SPINE` in `constants.ts` + scroll act 3 |
| Below-hero bridge | `FOLD1_CREDENTIALS_LEAD` + `Fold1Credentials.tsx` |
| Fold skim copy | `FOLDS` in `constants.ts` |
| Flow demo copy | `FlowExplorer.tsx` + `BROADCAST_*` in `constants.ts` |
| Pivot rows (main) | `PILOT_PIVOTS` in `constants.ts` + `PivotLog.tsx` |
| Full pivot / phones | `VALIDATION_LEDGER` + Reference only |

---

## 16. Success criteria

The story arc is working when:

1. A reviewer can retell the case in **30 seconds** after one scroll + FlowExplorer toggle.  
2. No section header repeats the previous section’s paragraph.  
3. The emotional peak is **interacting** with Before/After broadcast, not reading act 2 copy.  
4. Proof section feels **honest** (qualitative + baselines next), not apologetic or inflated.  
5. Reference feels like **optional depth**, not required to understand the bet.

---

*Product behavior and eng filenames: `HANDOFF_BOOK.md`. UI build and GSAP: `HANDOFF_CASE_STUDY_BUILD.md`. Narrative spine: this document.*

# Lola @ La Bodega — UX/Product Handoff Book

**Document type:** Cross-functional handoff (PM · Conversational architecture · Service design · Engineering)  
**Product:** Lola — bilingual WhatsApp layer on the weekly deals thread  
**Store:** La Bodega Supermarket · Calhoun, GA  
**Pilot status:** Live (2024 discovery → 2025 design/build → 2026 production)  
**Team:** Product & conversational design (Danny) + engineering partner (wacrm)  
**Customer surface:** WhatsApp `(404) 323-8325`  
**Staff surface:** [wacrm-i9f2.vercel.app](https://wacrm-i9f2.vercel.app)  
**Eng repo:** [github.com/Mattjr21/wacrm](https://github.com/Mattjr21/wacrm)  
**Portfolio case study UI:** `.figma-export-audit/` — `src/case-study/constants.ts` (marketing copy only; **this book is production truth**)

---

## 1. Executive Summary & Core Product Alignment

### System Analogy

**Meta-analogy:** *One-way broadcast megaphone → stateful conversational router on the same thread.*

Pre-Lola, the weekly channel was **template image + numbered menu** (reply `1` = weekly update / specials wall, `2` = delivery list; join flows used `1/2/3`). Off-menu asks had no scripted path; staff drained a single inbox manually. No mode tracking, no pickup state machine, no deflection.

Lola adds a **deterministic routing layer**: classify turn → resolve mode → handler or tool-grounded agent → safety gate → outbound (text · buttons · async voice). Humans own hard threads; Lola pauses on inbox assignment.

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ BEFORE: chaotic paradigm                                                │
└─────────────────────────────────────────────────────────────────────────┘
Store ops ──► Meta blast (template IMAGE)
                  │
                  ▼
          Numbered menu (1/2 or 1/2/3) — no tap buttons
          Reply 1 → bilingual specials wall · Reply 2 → delivery list (etc.)
                  │
                  ▼
          Off-menu text (hours, SNAP, “sale still on?”) ──► no scripted path
                  │
                  ▼
          Single staff inbox ◄── EN / ES / voice / off-flyer / hot-counter
                  │
                  ├── manual reply (late or never in rush)
                  └── no order # · no quote · no structured pickup · drop-off

┌─────────────────────────────────────────────────────────────────────────┐
│ AFTER: structured system (live pilot)                                   │
└─────────────────────────────────────────────────────────────────────────┘
Store ops ──► Meta Utility template (flyer + 3 quick replies)
                  │         See specials · Store hours · Place order
                  ▼
          WhatsApp webhook (Vercel)
                  │
    ┌─────────────┼─────────────┬──────────────┬──────────────┐
    ▼             ▼             ▼              ▼              ▼
 Kitchen      Meta Flows    Guided coach   Reminder parsers   Shop order
 (staff)      (if any)      + buttons      + offer session    + #order
    │             │             │              │              │
    └─────────────┴─────────────┴──────────────┴──────────────┘
                  ▼
          Live context snapshot (mode + order + coach + staff-wait + lang)
                  ▼
          Lola agent + tools OR handler-only path
                  ▼
          Grounding + safety ──► outbound
                  │
    ┌─────────────┼─────────────┬──────────────┬──────────────┐
    ▼             ▼             ▼              ▼              ▼
 FAQ on-thread  Pickup draft   List reminder  Staff relay    Voice async
 EN/ES          → quote → YES  → cron nudge   (paused bot)   (select turns)
                  ▼
          Staff: WhatsApp text alert · dashboard popup · Inbox / Orders / Reminders
```

### System Attributes

| Attribute | Specification |
|-----------|---------------|
| **Operational footprint** | Single independent Hispanic grocer; no IT department; counter + floor staff operate CRM |
| **Deployment medium** | WhatsApp Business (Meta Cloud API) · Next.js on Vercel · Supabase Postgres |
| **Domain** | Weekly ad discovery → ask → plan (pickup list, list reminder, staff relay) |
| **Primary channel** | Existing weekly deals broadcast thread — **not** a new shopper app or WhatsApp Catalog |
| **Guest demographics** | Bilingual EN/ES families; mobile-first; voice notes while cooking; Calhoun, GA trade area |
| **Staff demographics** | Counter, hot food, inbox agents; shared phones; dashboard + staff WhatsApp alerts |
| **Language** | `contacts.preferred_language`; one language per outbound message; STT Whisper; TTS Jenny (EN) / Paloma (ES) |
| **Commerce** | Pickup in store · staff-quoted totals · pay at register · orders 10am–8pm ET · pickup by ~8:30pm |
| **Broadcast cadence** | Thu/Fri weekend flyer + Mon/Tue weekday template (design); batched via cron every 5 min |
| **Feature flags** | `LOLA_ENABLED`, `SHOP_ORDERS_ENABLED`, `CUSTOMER_REMINDERS_ENABLED`, `GUIDED_COACH_ENABLED`, `LOLA_SKIP_IF_ASSIGNED` |

### Product Scope Boundary (one line)

**In scope:** Guest WhatsApp automation (FAQ, pickup, reminders, staff relay) + staff alert surfaces tied to those flows.  
**Out of scope for this book:** Generic wacrm CRM (broadcast builder UI, contacts, pipelines, automations builder) except where Lola touches them.

---

## 2. Problem Statement vs. Strategic Bet

### Operational Friction (research-validated)

| ID | Friction | Observable symptom | Evidence |
|----|----------|-------------------|----------|
| **F1** | Inbox flood | Every blast reply (EN, ES, voice) hits one queue | ~6 weeks inbox review · 40+ volante reply threads |
| **F2** | Repeat FAQ loop | Hours, SNAP, buffet, weekly ad — same asks every blast | Inbox pattern analysis |
| **F3** | No pickup state machine | Hot counter handled in chat by hand; no Place order / quote / order # | Birria thread (Jun 17) · 2 counter shadow sessions |
| **F4** | Broadcast dead-end | Flyer only + `Reply 1`/`2` text — no tap path to order | Pre-Lola template behavior |
| **F5** | Off-flyer trust risk | Product asks not on weekly ad (jabón Rey, Crema Playera follow-up) | ES inbox snippets |
| **F6** | Floor blind spot | Staff learn about lists at walk-in, not when typed on WhatsApp | Staff interviews (paraphrased) |
| **F7** | Voice + multitask | Shoppers use voice while cooking; calling store is friction | Loyalty voice-note thread |

### What Was Tried First (and failed or pivoted)

| Attempt | Outcome |
|---------|---------|
| Manual inbox replies | Works at desk; fails off-shift and during rush |
| Flyer + numbered reply (`1` = update / `2` = delivery; join menus `1/2/3`) | Families read the ad; off-menu asks hit inbox; no pickup path |
| “Hi Lola” on first Meta quick-reply row | Shoppers tapped without knowing outcome → renamed to **Place order** (template v2) |

### Strategic Hypothesis (Business Bet)

> **Answer repeat questions on-thread and capture pickup intent on the weekly deals thread — without adding counter headcount or a shopper app.**

| Bet vector | Mechanism | Channel rationale |
|------------|-----------|-------------------|
| FAQ deflection | Tool-grounded Lola (`check_hours`, `search_store_faq`, `get_weekly_deals`) | Families already plan the weekly shop on this thread |
| Pickup capture | Place order → draft → quote → YES → order # → pickup window | Converts ask/plan without new acquisition |
| Staff leverage | Relay + pause rules; hard threads human-owned | No IT; ride existing wacrm inbox |
| Constraint fit | No shopper app · no catalog bot · no POS sync in pilot | Independent grocer reality |

### Success Indicators

| Type | Indicator | Target / direction | Status |
|------|-----------|-------------------|--------|
| **Qualitative** | FAQs off register | Hours/SNAP/buffet closed on-thread without staff | Pilot signal observed |
| **Qualitative** | Orders surface in rush | Lists visible on counter phones + dashboard before walk-in | Pilot signal observed |
| **Qualitative** | Reminders → pickup | Saved list + time → nudge → explicit Place order (not implicit order) | Flow observation |
| **Quantitative** | Time-to-first-reply | Lola on-thread vs manual inbox | Baseline in progress (< 2 min target) |
| **Quantitative** | FAQ deflection rate | % hours/SNAP/buffet threads closed without staff per blast | Baseline in progress |
| **Quantitative** | Reminder → order | Nudge → Place order tap or confirmed pickup list | Baseline in progress |

---

## 3. Product System Architecture & Dynamic State Specs

### 3.1 Inbound routing order (production webhook)

Each inbound message is processed in this order (`webhook/route.ts`):

```text
1. Kitchen inventory image (staff allowlist)
2. Meta Flows (if consumed — blocks Lola)
3. Guided coach (if lola_guided_sessions active)
4. Offer-reminder session (post-specials YES/NO/schedule)
5. Shopping-reminder parser
6. Place-order button / Same-as-last button
7. Shop-order parser + open-order replies
8. Lola (maybeReplyWithLola) — or guided chooser if confused
9. Keyword automations
```

Button taps expand to synthetic text via `expandLolaButtonReply()` (e.g. `lola_place_order` → `#order`).

### 3.2 Mode resolution precedence

```text
                    INBOUND TURN
                         │
                         ▼
              ┌──────────────────────┐
              │  Mode resolver       │
              │  (mode-resolver.ts)  │
              └──────────┬───────────┘
                         │
     ┌───────────────────┼───────────────────┐
     │ PRIORITY (high → low)                 │
     ▼                   ▼                   ▼
waiting_staff      ordering            reminding
(pending staff     (active order OR    (guided reminder OR
 or conv pending)   guided order        offer-reminder session)
                    session)
     │                   │                   │
     └───────────────────┼───────────────────┘
                         ▼
                      asking
                   (default FAQ)
```

Mode is injected into GPT context framing (`layers/context.ts`); it does **not** short-circuit `maybeReplyWithLola` — handlers run first per webhook order above.

### 3.3 Mode parameters

| Mode | Resolved when | Input processing | DB / session state | Outbound rules | Exit |
|------|---------------|------------------|-------------------|----------------|------|
| **asking** | Default; no higher-priority lock | Free text, voice STT, button intents (`lola_see_specials`, `lola_store_hours`) | `preferred_language`, weekly promos | Agent tool loop; facts only from tools; text first, async voice optional | Place order / #order; staff-wait; inbox assigned |
| **ordering** | `shop_orders` open OR `lola_guided_sessions` order coach | `#order`, Place order button, coach steps, YES/CANCEL, quote buttons | `shop_orders.status`, `lola_guided_sessions` | Draft ack → staff quote → confirm gate; order # on YES | Confirmed, cancelled, expired |
| **reminding** | Guided reminder OR `lola_offer_reminder_sessions` | `remind me…`, Remind me button, offer YES flow | `customer_reminders`, offer session rows | “Not an order yet” copy; cron nudge with Place order CTA | Nudge sent; converted to order |
| **waiting_staff** | Staff-help pending OR conversation `pending` | Any | Inbox assignment, staff-help request | Thanks/acks only — **no re-escalation** | Staff replies → Lola relays |
| **paused** | `LOLA_SKIP_IF_ASSIGNED` | All | Inbox agent owns thread | No auto-reply | Staff releases |

### 3.4 Shop order state machine (guest-visible)

| Status | Guest sees | Staff action |
|--------|------------|--------------|
| `list_received` | Thanks — we got your list; total coming | Review list (**staff WhatsApp alert fires here**) |
| `staff_reviewing` | Checking stock | Enter quote |
| `quote_sent` | Total — reply YES or tap Confirm | Wait |
| `customer_confirmed` | Order # + pickup time ask (**dashboard confirm sound**) | Schedule / prepare |
| `pickup_scheduled` … `picked_up` | Status updates | Fulfill |
| `cancelled` | Cancelled copy + Place order CTA | — |

**Production alert reality (important):**

| Surface | Trigger | Message / behavior |
|---------|---------|-------------------|
| Staff WhatsApp | `list_received` (draft) | “New shopping list (awaiting customer confirmation)” |
| Dashboard modal | `shop_orders` INSERT | Popup + repeating sound until dismissed |
| Dashboard sound (2nd) | Status → `customer_confirmed` | “Order confirmed” toast |

*Design intent was to reduce phantom draft alerts; production uses a **two-tier** model: draft list alerts staff to review; YES triggers confirm signal.*

### 3.5 Agent tool surface

```text
gpt-4o-mini tool loop (facts only from tool results):
  check_hours
  search_store_faq
  get_weekly_deals
  draft_pickup_order
  create_reminder
  handoff_to_staff
```

### 3.6 Architecture layers (outbound path)

| Layer | Function |
|-------|----------|
| WhatsApp inbound | Text, template quick replies, interactive buttons, voice (Whisper STT) |
| Handler routing | Buttons, hashtags, coach, staff-wait, order status, lang pick; inbox pause |
| Live context | Store open, pickup window, mode, draft order, coach stage, staff-wait, language, thread tail |
| Agent + tools | Tool loop before speak |
| Grounding | Confidence JSON; block hallucinated prices |
| Safety | Allergies/refunds/complaints → management; low confidence → staff offer |
| Progressive fallback | 1st confusion → coach menu; 2nd+ same day → call store / staff |
| Voice delivery | Text first; async TTS (skipped on pure button turns) |
| Human handoff | Staff relay in-thread; CRM inbox for hard threads |

### 3.7 Interactive button nomenclature (production)

| Moment | EN labels (stable IDs) | ES labels |
|--------|------------------------|-----------|
| Greeting | `✨ Weekly deals` · `🕐 Store hours` · `🛒 Place order` · optional `🔁 Same as last` | `✨ Ofertas semana` · `🕐 Horario` · `🛒 Hacer pedido` · `🔁 Igual que antes` |
| Broadcast template | See specials · Store hours · Place order | Ver ofertas · Horario · Hacer pedido |
| After specials | `🛒 Place order` · `🔔 Remind me` · `No thanks` | `🛒 Hacer pedido` · `🔔 Recordarme` · `No gracias` |
| Coach (stuck) | `📦 Pickup order` · `🔔 Reminder` · `Cancel` | `📦 Hacer pedido` · `🔔 Recordatorio` · `Cancelar` |
| Quote gate | `✅ Confirm` · `✏️ Change list` · (cancel) | `✅ Confirmar` · `✏️ Cambiar lista` |
| Language | `🇺🇸 English` · `🇲🇽 Español` | same |
| Order status | `📋 My order` | `📋 Mi pedido` |

Max 3 buttons per interactive message (Meta limit). Hashtag fallbacks: `#order`, `#remind`, voice lists.

### 3.8 Service blueprint (ownership)

| Stage | Owner | System behavior | Design-owned |
|-------|-------|-----------------|--------------|
| Flyer prep | Store ops | Print + Meta template approval | No |
| Meta blast | Store / CRM | Flyer + quick replies (was reply 1/2) | Yes |
| Guest thread | Shopper + Lola | Ask, tap, voice — same chat | Yes |
| Quote & confirm | Staff + Lola | Staff prices; guest YES / Confirm | Yes |
| Counter alert | Staff phones + dashboard | Draft list + confirm signals (see §3.4) | Yes |
| Pickup in store | Counter / hot food | Bag, pay, ready-check human | No |

### 3.9 Staff alert channels

| Channel | Trigger | Staff action |
|---------|---------|--------------|
| Staff WhatsApp | Shopping list lands (`list_received`) | Buzz + CRM review link |
| Staff WhatsApp | ~20 min before pickup window | Pickup prep nudge |
| Dashboard modal | New `shop_orders` row | Repeating alert — quote or open chat |
| Inbox | Customer message / escalation | Human owns; Lola paused |

### 3.10 Fulfillment chain (post-confirm)

```text
Staff quote (WhatsApp or CRM) → guest YES / Confirm
  → order # on-thread + pickup window ask
  → counter bags list → pay in store
  → ready-check (birria-class) stays HUMAN — no automated post-confirm status lane yet
```

### 3.11 Guest flows (six spec'd journeys)

| Flow | Entry | Outcome |
|------|-------|---------|
| **Broadcast** | Template tap or post-blast text | Specials / hours / Place order |
| **Greeting** | `hi` / `hola` | Weekly deals · hours · Place order (+ Same as last) |
| **Pickup** | Place order / `#order` / coach | Draft → quote → YES → order # |
| **List reminder** | `remind me…` / Remind me button | Saved list + time → cron nudge → Place order |
| **Stuck** | `?` / `1` / gibberish | Coach chooser → order or reminder |
| **Staff help** | Off-flyer / low confidence | Ping staff → relay reply |

---

## 4. Crucial Scope Boundaries & Negotiated Decisions

### 4.1 Shipped & validated vs. blocked / cut

| Category | Shipped & validated (live) | Blocked / omitted / cut |
|----------|---------------------------|-------------------------|
| **Channel** | Same weekly deals WhatsApp thread | Shopper app, delivery cart, new channel |
| **Broadcast** | Flyer + Meta quick replies (Place order, hours, specials) | Maintaining reply-1/2-only as primary UX |
| **Q&A** | Flyer deals + staff FAQ tools | Full SKU / aisle price bot |
| **Commerce** | Pickup list → staff quote → confirm | WhatsApp Catalog, fixed-price self-serve cart |
| **Buttons** | 4 moment types + quote Confirm row + lang picker + Same as last | “Hi Lola” as primary broadcast CTA (v2 pivot) |
| **Voice** | Text first; async TTS on select turns | Voice on every reply (Vercel Hobby timeout) |
| **Escalation** | Staff help relay; management for allergies/refunds | Confident bot answers on risk topics |
| **Ready-check** | Human staff (birria pattern) | Automated post-confirm status lane |
| **Staff alerts** | Draft list WhatsApp + dashboard INSERT popup + YES confirm sound | Alert-only-after-YES (design pivot not fully enforced on WhatsApp) |
| **Design deliverables** | 6 flow specs EN/ES, canonical copy, button kitchen, safety playbook, journey maps | CRM UI, webhook infra, Supabase schema (eng-owned) |
| **QA** | Vitest regression (427 tests / 58 files in repo; conversation suites in `lola/` + `shop-orders/`) | — |
| **Metrics** | Qualitative pilot signals | Hard POS/inbox baselines (wiring next) |
| **Staff-only** | Kitchen invoice upload (`kitchen` command) | Not in guest case study scope |

### 4.2 Validation ledger (pilot pivots)

| Before | Signal | After (live) | Proof |
|--------|--------|--------------|-------|
| Flyer + numbered menu (1/2/3) | No tap path; off-menu → inbox; menus varied by campaign | Flyer + Place order / hours / specials buttons | Meta template v2 |
| “Hi Lola” broadcast CTA | Confused taps | Place order primary; Lola named in body | Template + pilot observation |
| Counter buzz on draft (intent) | Phantom orders in rush | Draft alert labeled “awaiting confirmation”; confirm sound on YES | Staff interviews + code |
| Full SKU price bot | Wrong price kills trust | Flyer + staff FAQ only | Scope cut |
| Voice every turn | Vercel timeout | Text first; async voice select | Prod constraint |
| Open GPT for hours/SNAP | Hallucination risk | Tool-grounded FAQ + regression tests | Vitest |
| Saved list treated as order | Guest confusion | Reminder nudges → Place order tap | Flow observation |

### 4.3 Negotiated trade-offs

| Tension | Call | Rationale |
|---------|------|-----------|
| Commands vs buttons | Place order primary; `#order` fallback | Lower cognitive load; voice/power users keep hashtags |
| Speed vs trust | Quote before treating as confirmed order; draft alerts staff early | Staff sees lists in rush; guest still confirms before order # |
| GPT fluency vs facts | Tools + safety before send | One wrong price loses neighborhood trust |
| Auto-handoff vs teach once | 1st confusion → coach; 2nd+ → staff/call store | Rules beat endless GPT |
| Voice richness vs infra | Text first; TTS async | Hobby-tier limits |
| Catalog breadth vs ops | Flyer + FAQ only | No team to sync SKUs weekly |
| Portfolio depth vs scan | Case study = Tier 1–2; this book = Tier 3 | Separate IA layers (see §6.4) |

### 4.4 Human handoff rules (hard locks)

| Trigger | Lola | Staff |
|---------|------|-------|
| Low confidence / off-flyer | Offers staff help; stops inventing | CRM reply → Lola relays |
| Guest YES on quote | Order # + pickup window on-thread | Buzz + prepare |
| Allergies, refunds, complaints | Management route — no confident bot answer | Human owns; Lola paused |
| Inbox assigned | Paused until released | Direct reply |

### 4.5 Safety guardrails (never ship as confident bot answer)

| Risk | Action |
|------|--------|
| Invented prices, aisles, stock | Block or staff handoff |
| Allergy / dietary | Management inbox |
| Payment / complaints | Management escalation |
| Staff-wait state | Thanks/ack only — no duplicate pings |
| After hours | Honest window copy; list accepted, quote when open |

### 4.6 Design vs. production gaps (documented, not hidden)

| Topic | Case study / design doc | Production code |
|-------|------------------------|-----------------|
| Staff alert timing | Sometimes stated “after YES only” | WhatsApp + modal on **draft**; confirm sound on YES |
| Reminder cron language | Bilingual | Due cron sends `lang: 'en'` hardcoded — **gap** |
| Button labels in portfolio demo | Plain text labels | Production uses emoji prefixes |
| Test count in portfolio copy | “86 cases” (stale) | 427 Vitest tests total |
| Same as last / lang buttons | Omitted from portfolio flows | Live on greeting |

---

## 5. System Deliverables & Handoff Checklist

### 5.1 Artifact matrix (priority)

| P | Deliverable | Type | Location | Owner |
|---|-------------|------|----------|-------|
| **P0** | Canonical EN/ES turn copy | Nomenclature | `wacrm/conversation-design/` · case study `CANONICAL_MICROCOPY` | Design |
| **P0** | Button ID + label spec | Nomenclature | `wacrm/src/lib/lola/interactive-buttons.ts` | Design + Eng |
| **P0** | Meta broadcast templates | Template | `conversation-design/BROADCAST_TEMPLATES.md` | Design + Store ops |
| **P0** | Orders & reminders spec | Eng spec | `wacrm/docs/HANDOFF_ORDERS_REMINDERS_LOLA.md` | Eng |
| **P0** | WhatsApp buttons kitchen | Payload map | `wacrm/docs/HANDOFF_WHATSAPP_BUTTONS_KITCHEN.md` | Eng |
| **P0** | Webhook routing order | Architecture | `wacrm/src/app/api/whatsapp/webhook/route.ts` | Eng |
| **P1** | Service blueprint (6 stages) | Service design | Case study `SERVICE_BLUEPRINT` | Design |
| **P1** | Handoff / escalation rules | Service design | `HANDOFF_RULES` · `staff-help/` | Design + Eng |
| **P1** | Conversation modes | State spec | `conversation-mode.ts` · `mode-resolver.ts` | Eng |
| **P1** | Guided coach copy | Recovery | `guided-coach/messages.ts` · `GUIDED_COACH.md` | Design |
| **P1** | Journey maps | Service design | Case study artifact + `JOURNEYS.md` | Design |
| **P2** | Safety outbound spec | Playbook | `layers/safety.ts` · safety tests | Eng |
| **P2** | Grounding test matrix | QA | `gpt-grounding.test.ts` etc. | Eng |
| **P2** | Staff ops alert runbook | Ops | `notify-staff.ts` · `staff-alert-sounds-provider.tsx` | Eng + Ops |
| **P2** | Lola persona rules | Persona | `persona.ts` · `LOLA_PERSONA` | Design |
| **P3** | Interactive flow demos (6) | Review UI | `.figma-export-audit` `#solution/flows` | Design |
| **P3** | Voice reference samples | Asset | `/audio/lola-hours-{en,es}.mp3` | Design |

### 5.2 Database objects (maintenance)

| Table / object | Purpose |
|----------------|---------|
| `shop_orders` | Pickup lists, quote, status, order_ref, pickup_at |
| `customer_reminders` | Shopping list + remind_at + sent flag |
| `lola_guided_sessions` | Coach draft until YES/CANCEL |
| `lola_offer_reminder_sessions` | Post-specials YES/schedule |
| `contacts.preferred_language` | EN/ES persistence |
| `lola_weekly_promos` | Live ad copy (Settings → Weekly offers) |
| `messages` | Full thread history |

### 5.3 Cron jobs

| Job | Schedule | Purpose |
|-----|----------|---------|
| Broadcast batches | Every 5 min | Template send queue |
| Customer reminders | Every 15 min | Due shopping reminder nudges |
| Shop orders | Every 15 min | Pickup-soon staff nudge (~20 min) |
| Lola weekly promos | Thu 9am ET | Staff promo refresh nudge |

### 5.4 Regression coverage (design-visible behaviors)

| Behavior | Suite |
|----------|-------|
| Wrong price never ships as fact | Grounding |
| Place order button → pickup coach | Routing & buttons |
| Thanks only while waiting on staff | Staff help & voice |
| Button payload expansion | `interactive-buttons.test.ts` |
| Order YES / CANCEL gates | `customer-reply.test.ts` |

### 5.5 Engineering handoff checklist

- [ ] Meta template IDs match `BROADCAST_TEMPLATES.md` (EN + ES weekend/weekday)
- [ ] Broadcast uses flyer IMAGE + 3 quick replies (not reply-1/2-only)
- [ ] `lola_place_order` → guided coach / shop order handler
- [ ] Order # assigned on customer YES / Confirm only
- [ ] Staff WhatsApp recipients configured (`SHOP_ORDER_ALERT_PHONES`)
- [ ] `LOLA_SKIP_IF_ASSIGNED` on for production inbox
- [ ] Staff-wait: no duplicate escalation on thanks
- [ ] Reminder cron: **fix EN-only hardcode** if ES reminders required
- [ ] Vitest CI green before template copy changes
- [ ] Weekly offers updated in Settings (no redeploy for ad copy)

### 5.6 Canonical microcopy (guest-visible anchors)

| Moment | EN |
|--------|-----|
| Broadcast body | “This week's specials are in the flyer above.” (+ Lola intro in template) |
| Order draft | “Thanks — we got your list! Someone will send a total shortly.” |
| Confirm gate | “Reply YES to confirm, or CANCEL to exit.” (+ Confirm button on quote) |
| Staff wait | “I asked our store team. I'll reply here shortly.” |
| List reminder | “Not an order yet — I'll nudge you then.” |

---

## 6. Forward-Looking Product Roadmap

### 6.1 Phase A — Measurement (now)

| Initiative | System change | Dependency |
|------------|---------------|------------|
| Inbox baseline | Time-to-first-reply: Lola vs manual | CRM timestamp export |
| FAQ deflection | % hours/SNAP/buffet closed without staff per blast | Thread tagging |
| Reminder funnel | Nudge → Place order → confirmed list | `customer_reminders` ⨝ `shop_orders` |
| Language-tagged broadcast | EN/ES segment templates | Meta audience segments |

### 6.2 Phase B — Ops hardening

| Initiative | System change | Dependency |
|------------|---------------|------------|
| Post-confirm status lane | Ready-check automation (birria-class) | New mode or staff-triggered template |
| Alert policy alignment | Decide draft vs confirm-only staff WhatsApp | Product + staff feedback |
| Reminder cron i18n | Pass `preferred_language` in cron send | `customer-reminders/cron/route.ts` |
| Ops dashboard | Reply rate · deflection · reminder conversion | Supabase views |

### 6.3 Phase C — Explicitly out of pilot scope

| Vector | Blocker |
|--------|---------|
| POS catalog sync | No data owner |
| Delivery cart | New fulfillment model |
| Shopper native app | Channel strategy = WhatsApp-native |
| Auto live-agent handoff | Trust + staffing model |

### 6.4 Phase D — In-store kiosk (strategic next surface)

**Why WhatsApp pilot first:** Low capex, live on a channel families already use, and every thread trains **store-specific** knowledge — edge cases, EN/ES phrasing, off-flyer asks, voice habits — before counter hardware.

| Layer | WhatsApp pilot (now) | In-store kiosk (next) |
|-------|---------------------|------------------------|
| **Channel** | Weekly deals thread + inbound text/voice | Walk-in guest at counter / produce |
| **Cost** | Meta template + existing CRM | Hardware + placement + staff training |
| **Knowledge** | FAQ tools, staff-help relay, inbox corpus | **Reuse same brain** — hours, flyer, pickup modes |
| **Edge cases** | Captured in production threads | Informed by pilot — fewer kiosk surprises |
| **Modes** | ask · order · remind · staff-wait | Same modes; tap-first UI; optional staff handoff to floor |

```text
Pilot (WhatsApp)                    Future (kiosk)
────────────────                    ────────────────
Real threads ──► FAQ + tools ──►     Shared knowledge base
Staff-help gaps ──► relay rules       Counter UI reads same tools
Order coach proven ──►               Place order on large tap targets
Reminders on phone ──►               Optional: print list / SMS handoff
```

**Not in pilot scope:** kiosk OS, queue UX, payment integration at device, aisle navigation hardware.

**Dependencies before kiosk build:** baselines from Phase A; stable canonical copy; alert policy settled (Phase B).

### 6.5 Information architecture — three tiers (portfolio vs. handoff)

This book is **Tier 3**. The portfolio case study (`.figma-export-audit`) should not duplicate it on scroll.

| Tier | Audience | Content | Surface |
|------|----------|---------|---------|
| **T1** | Hiring manager · 60s–3min | Hook · bet · Try flows · proof headline · role boundary | Case study above fold |
| **T2** | Design lead · 5min | Evidence tabs · staff ops · validation summary · live WhatsApp | Case study acts 2–3 |
| **T3** | PM · Eng · Ops | This handoff book · Reference section · wacrm docs | `HANDOFF_BOOK.md` · `#reference` |

**IA rule:** one idea, one home — inbox pain in Evidence only; shipped proof in Solution flows; system depth in Reference / this book.

### 6.6 Open specs / design debt

1. Ready-check after confirm — human today; mode TBD  
2. Staff alert policy — document two-tier production behavior vs. single-tier narrative  
3. Portfolio demo sync — emoji buttons, Same as last, quote Confirm row  
4. Hard metrics in Proof — qualitative live; quantitative baselines wiring  
5. Figma/screenshot in journey artifact — placeholder frame  

---

## Appendix A — Quick reference

```text
Customer WhatsApp:  (404) 323-8325  →  wa.me/14043238325
Staff CRM:          https://wacrm-i9f2.vercel.app
Case study dev:     cd .figma-export-audit && npm run dev  →  http://localhost:5173/
Design owner:       Danny — flows, EN/ES copy, specs, eng handoff
Eng repo:           github.com/Mattjr21/wacrm
```

## Appendix B — Related documents

| Doc | Path |
|-----|------|
| Orders, reminders, Lola eng handoff | `wacrm/docs/HANDOFF_ORDERS_REMINDERS_LOLA.md` |
| WhatsApp buttons kitchen | `wacrm/docs/HANDOFF_WHATSAPP_BUTTONS_KITCHEN.md` |
| Broadcast template design | `wacrm/conversation-design/BROADCAST_TEMPLATES.md` |
| Customer journeys | `wacrm/conversation-design/JOURNEYS.md` |
| Portfolio constants (not production truth) | `.figma-export-audit/src/case-study/constants.ts` |

**Document version:** 2026-06-25 · production-aligned audit included

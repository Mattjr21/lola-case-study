# Lola UX Research · filled

**For:** Danny  
**Source:** Lola Connect / Supabase (self-serve pull · 2026-07-12)  
**Output:** Methods panel · Journey panel · case study copy  
**Privacy:** Aggregates only — no names, phones, or raw message rows  

This is the toolkit filled with live numbers. Copy drops into the case study **Journey** and **Methods** tabs (already wired in `lola-case-study`).

---

## 1. How to use

1. Numbers below come from `wacrm` → `npm run research:case-study`.
2. Methods / Journey copy is live on local case study:  
   - http://127.0.0.1:5174/#discover/methods  
   - http://127.0.0.1:5174/#discover/journey  
3. Re-pull before claiming newer windows; do not invent intent % from weak keyword matches.

---

## 2. Data pull checklist (filled)

### Message patterns

| Item | Status | Result |
|---|---|---|
| Total threads / messages (May 1 – Jun 15 2026) | **Confirmed** | **180 threads · 310 customer messages** |
| Message mix: language | **Confirmed** | Threads with saved pref: **98 ES · 28 EN · 54 unknown**. Spanish led. |
| Message mix: channel | **Confirmed** | Study window: ~99% text · voice rare in stored rows (1 audio). Voice UX still supported by later pilot + counter sessions — don’t overclaim voice % from this window. |
| Top intents / categories | **Qualitative** | No `intent_label` column. Keyword auto-coding on free text was unreliable. Patterns for the six flows stay **hand-coded from inbox review**: hours, SNAP, pickup lists, loyalty, hot counter — not automated %. |

### Response performance

| Item | Status | Result |
|---|---|---|
| First reply latency (Lola **bot**) | **Confirmed (published)** | **97.7% under 2 min · median ~4s · n=353** — label as **bot**, not staff |
| Bot latency recompute (study window) | **Confirmed** | 95.3% under 2 min · median ~3.1s · n=233 (aligns with published claim) |
| Staff first-response (escalations) | **Confirmed** | Staff-help answered tickets: **avg 8.2 min · median 1.2 min** (30d). Human speed ≠ bot speed. |

### Escalation & resolution

| Item | Status | Result |
|---|---|---|
| Ticket solve vs expire (30d) | **Confirmed** | **14 answered · 9 expired · ~39% expire** · avg answer **8.2 min** |
| What triggers escalation | **Open / weak** | No reason codes in DB. Keyword buckets on `customer_message` mostly landed in “other.” Keep qualitative: out-of-scope stock, price disputes, ambiguous asks. |

### Flow completion

| Item | Status | Result |
|---|---|---|
| Order funnel | **Thin sample** | 18 total orders · 16 cancelled · 2 picked up. Do **not** claim funnel conversion yet. |
| Pickup lead time (`pickup_at`) | **Still measuring** | **3 of 18** orders have `pickup_at` — below ~30 sample threshold |

### Rolling ops (context, not Methods headline)

| Item | Result |
|---|---|
| Last 30d activity | 283 active threads · 1,472 customer messages · 1,551 bot replies |
| Broadcast 30d | ~95% Spanish · ~9.1% reply rate · ~69% read rate |

---

## 3. Journey map (filled)

| Stage | Guest does | Real voice | Friction (data-backed) | Design response |
|---|---|---|---|---|
| **Broadcast** | Gets weekly flyer; doesn’t open a new app | — | Before Lola: replies piled into one inbox, unsorted by language. Broadcast language skew ~95% ES (30d). | Same thread, tap-first greeting, language on first message. |
| **Ask** | Hours, SNAP, loyalty, hot counter — text or voice | “I signed up for the loyalty program… can you add those purchases to my points?” — voice note, EN (paraphrased / published) | Inbox study: 180 threads · 310 messages. Spanish led among known prefs. | Store-tool grounded answers; voice same path as text. Bot: **97.7% &lt; 2 min**. |
| **Order** | Sends informal pickup list | — | Order sample still thin (mostly cancelled rows). | Confirm-or-edit loop, not a rigid form. |
| **Confirm & wait** | Replies YES; waits until pickup | “I didn’t want to call the store while I was cooking dinner.” — regular shopper (published) | Pickup lead-time **still measuring** (3/18 `pickup_at`). | Staff alert on confirm, not on walk-in. |
| **Staff handoff** | Question outside store-approved knowledge | — | **~39%** of 30d escalations **expire** before staff reply (14 answered · 9 expired · avg 8.2 min). | Two-tier alert; open design problem for next iteration. |
| **Pickup** | Pays and collects at register | “We used to find out about orders when someone walked in. Now the phone buzzes when the list comes in.” — counter staff (published) | Lead-time claim blocked until `pickup_at` sample grows. | Counter alert before walk-in — loop close. |

---

## 4. Methods write-up (filled)

Over six weeks (**May 1 – Jun 15 2026**), I reviewed **180 threads** across **310 customer messages** in La Bodega’s live WhatsApp inbox — not a sample, the actual traffic the weekly flyer generated. I coded messages by pattern (hours, SNAP, pickup lists, loyalty, hot counter) into the six-flow structure — what people actually asked, not what I assumed. Among threads with a saved language preference, **Spanish led (98 ES · 28 EN)**.

Testing happened in production: the live pilot was the test. Escalations are tracked as staff-help tickets. Over **30 days**, **14** tickets were answered by staff at an average of **8.2 minutes**, and **9 expired unanswered (~39%)** — a gap treated as the next design problem, not hidden from the numbers.

Lola **bot** first-reply performance (published pilot): **97.7% under 2 minutes**, median about **4 seconds** (n=353). That is **not** staff first-response time; keep the distinction explicit.

What I didn’t run: a moderated usability session or a formal SUS score independent of the live flow. That’s the next add — even a few minutes with shoppers post-pickup would turn “staff didn’t need to intervene” into “the shopper got what they wanted.”

---

## 5. Site panel copy (paste-ready)

### Methods tab

> **180** threads · **310** customer messages. Six weeks live (May 1 – Jun 15 2026), then Lola Connect’s own logs.  
>  
> I coded the inbox by pattern — hours, SNAP, pickup lists, loyalty, hot counter — into the six flows. Spanish led among threads with a saved preference (98 ES · 28 EN).  
>  
> Every escalation got a status, not just a resolution. **14** tickets answered in 30 days (avg **8.2** min) — **9** expired (~**39%**). That gap is the next flow to design.  
>  
> Bot speed vs human speed: Lola first replies hit **97.7%** under 2 min (median ~**4**s · n=**353**). Staff replies on escalations are minutes, not seconds — keep those metrics separate.

### Journey tab

> Broadcast → ask → order → wait → pickup — one loop, six friction points.  
>  
> Guests didn’t want a new app. They wanted the flyer thread to talk back — in whichever language, text or voice, without a command to memorize.  
>  
> The gap that’s still open: ~**39%** of escalated conversations expire before a staff reply. Lola closes the loop for guests who don’t need a human. The loop for guests who do isn’t closed yet.

---

## 6. Privacy notes

- Queries return aggregates and counts only.
- Published quotes stay paraphrased / anonymized (“regular shopper”, “counter staff”).
- Do not paste raw `messages` or `lola_staff_help_requests` rows into a public case study.
- Re-run: from `wacrm`, `npm run research:case-study`.

---

*Lola UX Research · filled from Supabase · working doc for Danny · not for external distribution as a raw dump*

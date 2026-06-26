/** End-to-end narrative — one beat per Double Diamond phase (retail-plain, HANDOFF-aligned) */

export const STORY_BEATS = {
  discover: {
    body: "Inbox threads and the weekly blast show what broke — compare before/after below, then step through interactive flows in Develop.",
    bullets: [
      "Flyer blast + rigid 1/2/3 menu — shoppers replied free-form",
      "EN / ES text and voice notes — no triage",
      "Mobile-first families cooking or with kids — voice beats typing a list",
    ],
  },
  define: {
    body: "The bet: no new shopper app. Build inside the thread families already use. Lola — the store mascot with a voice — routes each turn on the broadcast line: grounded FAQ from flyer + store tools, tap-first paths, and staff relay when the answer is not in the knowledge base.",
    bullets: [
      "Design: conversation rules, EN/ES copy, button flows, staff alert surfaces",
      "Build: Vercel webhook, Supabase states, grounding + safety gates",
    ],
  },
  develop: {
    body: "Every inbound message carries a mode — ask, order, remind, or waiting on staff — so replies match where the guest actually is. Two pickup paths share the same counter finish: place an order now, or save a list for a later nudge.",
    bullets: [
      "asking — hours, deals, SNAP from tools",
      "ordering — draft list → confirm → staff quote → YES → pickup",
      "reminding — save list + time → Saturday nudge → Place order",
      "waiting_staff — bot pauses; counter answers on-thread",
    ],
  },
  deliver: {
    body: "Live pilot (May–Jun 2026) forced guardrails under real rush-hour pressure — not wireframe polish.",
    bullets: [
      "Quick-reply buttons replaced numbered text menus",
      "Task labels (Place order) replaced vague “Hi Lola” taps",
      "Flyer + FAQ only for prices — humans quote open lists",
      "Voice lists repeat back for confirm before staff alert",
    ],
  },
  vision: {
    body: "WhatsApp is the training ground, not the end state. Pilot threads capture bilingual phrasing, edge cases, and store knowledge before any floor hardware.",
    bullets: [
      "Same conversational brain → future in-store kiosk",
      "Walk-in lookup, aisle help, recipe list → text to phone",
      "Not in pilot: kiosk OS, queue UX, device payments",
    ],
  },
} as const;

export const STORY_TRACKS = [
  {
    id: "order",
    title: "Order track",
    summary: "Text or voice → itemized draft → ✅ Confirm → staff quote → YES → pickup window.",
  },
  {
    id: "reminder",
    title: "Reminder track",
    summary: "“Remind me Saturday — milk, meat, eggs” → saved (not an order) → morning nudge → one tap to order.",
  },
] as const;

export type StoryBeatId = keyof typeof STORY_BEATS;

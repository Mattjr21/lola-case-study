/** End-to-end narrative — Lola (guest) + Lola Connect (staff) as one product */

export const STORY_BEATS = {
  discover: {
    body: "The weekly flyer worked. The inbox did not — every reply landed in one queue.",
    bullets: [
      "Blast to ~1,200 families → free-form EN/ES text and voice",
      "Hours, SNAP, deals, and pickup asks mixed in one thread",
      "Staff answered by hand — late or missed in rush",
    ],
  },
  define: {
    body: "Build inside the channel families already use. Two surfaces, one order.",
    bullets: [
      "Guest: Lola on WhatsApp — ask, order, remind, staff help",
      "Staff: Lola Connect — inbox, orders, alerts, shifts",
      "No shopper app · staff keep control · pickup in store",
    ],
  },
  develop: {
    body: "Guest flows on WhatsApp. Staff day in Lola Connect. Same pickup finish.",
    bullets: [
      "Six guest journeys — broadcast through staff handoff",
      "Inbox Ready bar · Orders board · Tickets · shift alerts",
      "Grounded answers, tap-first actions, bilingual + voice",
    ],
  },
  deliver: {
    body: "Live pilot under real rush — buttons, clear CTAs, and staff ops that hold up.",
    bullets: [
      "Tap buttons replaced numbered menus",
      "Place order replaced vague Hi Lola taps",
      "Staff see lists before walk-in — WhatsApp, dashboard, lock screen",
    ],
  },
  vision: {
    body: "WhatsApp trains the store brain before any floor hardware.",
    bullets: [
      "Same modes → future in-store kiosk",
      "Not in pilot: kiosk OS, queue UX, device payments",
    ],
  },
} as const;

export const STORY_TRACKS = [
  {
    id: "order",
    title: "Order now",
    summary: "Place order → draft → staff quote → YES → order # → Ready → pickup.",
  },
  {
    id: "reminder",
    title: "Remind later",
    summary: "Save list + time → nudge → Place order (not an automatic order).",
  },
] as const;

export type StoryBeatId = keyof typeof STORY_BEATS;

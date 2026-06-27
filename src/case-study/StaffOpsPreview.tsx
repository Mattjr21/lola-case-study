import React from "react";
import { PILOT_SHOPPER_FULL, STAFF_OPS_PROCESS, WHATSAPP_LIVE } from "./constants";
import { useSurfaceOpenOnMount } from "./transitions";
import { FadeIn, Panel } from "./ui";
import { PhoneFrame, WaBubble } from "./whatsapp";
import { WacrmDashboardBackdrop } from "./WacrmDashboardBackdrop";

function SoundIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function ConfirmOrderModal() {
  const surfaceClass = useSurfaceOpenOnMount();

  return (
    <div
      aria-hidden="true"
      className={`t-modal relative z-10 w-full max-w-[420px] mx-auto rounded-lg overflow-hidden shadow-[0_24px_48px_rgba(15,23,42,0.28)] border border-black/5 bg-white ${surfaceClass}`}
    >
      <div className="bg-[var(--cs-accent)] px-5 sm:px-6 py-5 text-white">
        <div className="flex items-start gap-4 pr-8">
          <span className="flex w-12 h-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-2 ring-white/25">
            <BagIcon />
          </span>
          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/90">
              Order confirmed
            </p>
            <p className="mt-1 text-[22px] font-bold leading-tight text-white">Guest replied YES</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-white px-5 sm:px-6 py-5">
        <div className="rounded-xl border-2 border-[var(--cs-accent)]/25 bg-[var(--cs-accent-soft)]/50 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-[17px] font-semibold text-[#0f172a]">{PILOT_SHOPPER_FULL}</span>
            <span className="font-mono text-[13px] font-medium text-[var(--cs-accent)]">LB-20250622-0042</span>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-[#334155]">
            2 lb chicken breast, tortillas, dozen eggs, milk
          </p>
          <p className="mt-2 text-[13px] font-medium text-[var(--cs-accent)]">Friday 5:00 PM pickup</p>
        </div>
      </div>
    </div>
  );
}

/** Staff-facing channels — two large panels, no new app */
export function StaffOpsPreview() {
  return (
    <div id="develop-staff-ops" className="scroll-mt-[var(--cs-nav-h)] cs-page cs-fold-section border-t border-[var(--cs-border-subtle)]">
      <div className="cs-phase-artifact cs-phase-artifact--pad">
        <FadeIn>
          <header className="cs-section-intro max-w-[52ch]">
            <h3 className="cs-h3 max-w-[24ch]">Staff alerts without another app</h3>
            <p className="cs-body">
              When a pickup list is ready, staff are notified in the{" "}
              <a
                href={WHATSAPP_LIVE.staffUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--cs-brand)] hover:underline underline-offset-2"
              >
                staff dashboard
              </a>{" "}
              I built for WhatsApp threads, quotes, and pickup orders.
            </p>
          </header>
          <p className="cs-staff-process-line" aria-label="Pickup alert process">
            {STAFF_OPS_PROCESS}
          </p>
        </FadeIn>

        <div className="cs-staff-ops-grid cs-staff-ops-grid--pdf cs-staff-ops-grid--spaced">
        <article aria-labelledby="staff-wa-heading" className="cs-staff-panel">
          <FadeIn>
            <h4 id="staff-wa-heading" className="cs-staff-panel-label">
              Staff WhatsApp alert
            </h4>
            <div className="cs-staff-phone-wrap">
              <PhoneFrame contact="La Bodega · Staff" device>
                <WaBubble from="lola" time="9:06">
                  🛒 <strong>New pickup list</strong>
                  <br />
                  <br />
                  <strong>{PILOT_SHOPPER_FULL}</strong>
                  <br />
                  (404) 555-0142
                  <br />
                  <br />
                  2 lb chicken, tortillas, eggs, milk
                  <br />
                  Friday 5:00 PM pickup
                  <br />
                  <br />
                  <a
                    href={WHATSAPP_LIVE.staffUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--cs-accent)] underline underline-offset-2"
                  >
                    Review in dashboard →
                  </a>
                </WaBubble>
              </PhoneFrame>
            </div>
          </FadeIn>
        </article>

        <article aria-labelledby="staff-dash-heading" className="cs-staff-panel">
          <FadeIn>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <h4 id="staff-dash-heading" className="cs-staff-panel-label">
                Dashboard alert
              </h4>
              <span className="cs-alert-sound" role="note">
                <SoundIcon />
                Alert repeats until dismissed
              </span>
            </div>
            <Panel className="p-0 overflow-hidden cs-panel--flush cs-staff-dash-panel">
              <div className="relative min-h-[480px] flex items-center justify-center p-4 sm:p-6">
                <div className="absolute inset-0 overflow-hidden" aria-hidden>
                  <WacrmDashboardBackdrop />
                </div>
                <div className="absolute inset-0 bg-[#0f172a]/40 backdrop-blur-[2px]" aria-hidden />
                <ConfirmOrderModal />
              </div>
            </Panel>
          </FadeIn>
        </article>
      </div>
      </div>
    </div>
  );
}

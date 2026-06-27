import React from "react";
import { STAFF_OPS_PROCESS, WHATSAPP_LIVE } from "./constants";
import { useSurfaceOpenOnMount } from "./transitions";
import { FadeIn, Panel } from "./ui";
import { PhoneFrame, WaBubble } from "./whatsapp";
import { WacrmDashboardBackdrop } from "./WacrmDashboardBackdrop";
import { StaffPickupAlertContent } from "./StaffPickupAlertContent";

const STAFF_PROCESS_STEPS = STAFF_OPS_PROCESS.split(" → ");

function StaffProcessFlow() {
  return (
    <div className="cs-staff-process-flow" aria-label="Pickup alert process">
      {STAFF_PROCESS_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          {i > 0 ? (
            <span className="cs-staff-process-flow__arrow" aria-hidden>
              →
            </span>
          ) : null}
          <span className="cs-staff-process-flow__step">{step}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

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
    <div aria-hidden="true" className={`cs-staff-alert-modal t-modal ${surfaceClass}`}>
      <div className="cs-staff-alert-modal__banner">
        <span className="cs-staff-alert-modal__banner-icon">
          <BagIcon />
        </span>
        <div className="cs-staff-alert-modal__banner-text">
          <p className="cs-staff-alert-modal__banner-eyebrow">Order confirmed</p>
          <p className="cs-staff-alert-modal__banner-title">Guest replied YES</p>
        </div>
      </div>
      <div className="cs-staff-alert-modal__sheet">
        <StaffPickupAlertContent channel="dashboard" />
      </div>
    </div>
  );
}

/** Staff-facing channels — two large panels, no new app */
export function StaffOpsPreview() {
  return (
    <div id="develop-staff-ops" className="scroll-mt-[var(--cs-nav-h)] cs-page cs-fold-section border-t border-[var(--cs-border-subtle)]">
      <div className="cs-phase-artifact cs-phase-artifact--pad cs-staff-ops-section">
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
          <StaffProcessFlow />
        </FadeIn>

        <div className="cs-staff-ops-grid cs-staff-ops-grid--pdf cs-staff-ops-grid--spaced">
        <article aria-labelledby="staff-wa-heading" className="cs-staff-panel">
          <FadeIn>
            <div className="cs-staff-panel-header">
              <h4 id="staff-wa-heading" className="cs-staff-panel-label">
                Staff WhatsApp alert
              </h4>
            </div>
            <div className="cs-staff-phone-wrap">
              <PhoneFrame contact="La Bodega · Staff" device>
                <WaBubble from="lola" time="9:06">
                  <StaffPickupAlertContent channel="wa" />
                </WaBubble>
              </PhoneFrame>
            </div>
          </FadeIn>
        </article>

        <article aria-labelledby="staff-dash-heading" className="cs-staff-panel">
          <FadeIn>
            <div className="cs-staff-panel-header">
              <h4 id="staff-dash-heading" className="cs-staff-panel-label">
                Dashboard alert
              </h4>
              <span className="cs-alert-sound" role="note">
                <SoundIcon />
                Alert repeats until dismissed
              </span>
            </div>
            <Panel className="p-0 cs-panel--flush cs-staff-dash-panel">
              <div className="cs-staff-dash-scene">
                <div className="cs-staff-dash-scene__backdrop" aria-hidden>
                  <WacrmDashboardBackdrop />
                </div>
                <div className="cs-staff-dash-scene__overlay" aria-hidden />
                <div className="cs-staff-dash-scene__modal">
                  <ConfirmOrderModal />
                </div>
              </div>
            </Panel>
          </FadeIn>
        </article>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { CTA, PORTFOLIO, WHATSAPP_LIVE } from "../constants";
import { ClosingBeat } from "../ClosingBeat";
import { DeliverLearnings } from "../DeliverLearnings";
import { ImpactOutcomes } from "../ImpactOutcomes";
import { PilotVoices } from "../PilotVoices";
import { ReferenceGate } from "../ReferenceGate";
import { ScopeMetrics } from "../ScopeMetrics";

export function Act5Proof() {
  return (
    <>
      <div id="pilot-outcomes" className="cs-page cs-fold-section cs-fold-section--tight scroll-mt-[var(--cs-nav-h)]">
        <div className="cs-block-stack cs-block-stack--tight">
          <div className="cs-phase-artifact cs-phase-artifact--pad">
            <p className="cs-meta-label mb-3">Pilot outcomes</p>
            <ImpactOutcomes />
            <div className="cs-deliver-metrics">
              <ScopeMetrics />
            </div>
          </div>

          <PilotVoices />
        </div>
      </div>

      <div
        id="deliver-learnings"
        className="cs-page cs-fold-section cs-fold-section--tight border-t border-[var(--cs-border-subtle)] scroll-mt-[var(--cs-nav-h)]"
      >
        <DeliverLearnings />
      </div>

      <ClosingBeat />

      <ReferenceGate />

      <div className="cs-case-cta-strip">
        <div className="cs-page cs-case-cta-strip__inner">
          <p className="cs-case-cta-strip__copy">
            Written by {PORTFOLIO.author} · La Bodega pilot · {new Date().getFullYear()}
          </p>
          <div className="cs-case-cta-strip__actions">
            {PORTFOLIO.backUrl ? (
              <a href={PORTFOLIO.backUrl} className="cs-case-cta-strip__btn">
                ← Back to work
              </a>
            ) : null}
            <a
              className="cs-case-cta-strip__btn cs-case-cta-strip__btn--solid"
              href={WHATSAPP_LIVE.waMe}
              target="_blank"
              rel="noreferrer"
            >
              {CTA.messageWhatsApp}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

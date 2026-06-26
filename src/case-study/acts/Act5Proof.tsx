import React from "react";
import { DeliverLearnings } from "../DeliverLearnings";
import { ImpactOutcomes } from "../ImpactOutcomes";
import { PilotVoices } from "../PilotVoices";
import { LolaMark } from "../ui";
import { PORTFOLIO, WHATSAPP_LIVE, CTA } from "../constants";

export function Act5Proof() {
  return (
    <>
      <div id="pilot-outcomes" className="cs-page cs-fold-section scroll-mt-[var(--cs-nav-h)]">
        <div className="cs-block-stack">
          <div className="cs-phase-artifact cs-phase-artifact--pad">
            <ImpactOutcomes />
          </div>
          <PilotVoices />
        </div>
      </div>

      <div
        id="deliver-learnings"
        className="cs-page cs-fold-section border-t border-[var(--cs-border-subtle)] scroll-mt-[var(--cs-nav-h)]"
      >
        <DeliverLearnings />
      </div>

      <footer className="cs-site-footer">
        <div className="cs-page">
          <div className="cs-site-footer__top">
            <div>
              <p className="cs-site-footer__title">
                La Bodega — <LolaMark variant="white" />
              </p>
              <p className="cs-site-footer__tagline">
                Conversational design · staff dashboard · grounded AI · EN/ES copy
              </p>
              <dl className="cs-site-footer__meta">
                <div>
                  <dt>Staff tool</dt>
                  <dd>
                    <a href={WHATSAPP_LIVE.staffUrl}>Staff dashboard</a>
                  </dd>
                </div>
                <div>
                  <dt>Store</dt>
                  <dd>
                    <a href={WHATSAPP_LIVE.waMe}>
                      {WHATSAPP_LIVE.display} · Calhoun, GA
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="cs-site-footer__name">{PORTFOLIO.author}</p>
              <p className="cs-site-footer__role">{PORTFOLIO.title}</p>
              <p className="cs-site-footer__seeking">{PORTFOLIO.seeking}</p>
              <div className="cs-site-footer__actions">
                {PORTFOLIO.backUrl ? (
                  <a href={PORTFOLIO.backUrl} className="cs-btn-footer cs-btn-footer--outline">
                    ← Back to work
                  </a>
                ) : null}
                <a
                  href={WHATSAPP_LIVE.waMe}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-btn-footer cs-btn-footer--solid"
                >
                  {CTA.messageWhatsApp}
                </a>
                {PORTFOLIO.linkedIn ? (
                  <a
                    href={PORTFOLIO.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cs-btn-footer cs-btn-footer--outline"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {PORTFOLIO.email ? (
                  <a
                    href={PORTFOLIO.email.startsWith("mailto:") ? PORTFOLIO.email : `mailto:${PORTFOLIO.email}`}
                    className="cs-btn-footer cs-btn-footer--outline"
                  >
                    Email
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <p className="cs-site-footer__legal">
            Written by {PORTFOLIO.author} · Case study · La Bodega pilot · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}

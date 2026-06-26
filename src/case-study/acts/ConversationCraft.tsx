import React from "react";
import { DEVELOP_AI_LAYER } from "../constants";
import { ConversationRules } from "../ConversationRules";import { FeaturedDecisions } from "../FeaturedDecisions";
import { HearLola } from "../HearLola";
import { FadeIn } from "../ui";

/** Craft block — conversation rules, voice lane, product decisions */
export function ConversationCraft() {
  return (
    <div
      id="develop-craft"
      className="scroll-mt-[var(--cs-nav-h)] cs-page cs-fold-section border-t border-[var(--cs-border-subtle)]"
    >
      <div className="cs-phase-artifact cs-phase-artifact--pad">
        <div className="cs-block-stack">
          <FadeIn>
            <header className="cs-section-intro max-w-[52ch]">
              <h3 className="cs-h3">Grounded, tap-first conversations</h3>
              <p className="cs-body">
                Lola&apos;s personality is friendly, but her behavior is constrained: grounded answers, language memory,
                tap-first flows, and staff handoff when facts are missing.
              </p>
              <p className="cs-body">{DEVELOP_AI_LAYER}</p>
            </header>          </FadeIn>

          <ConversationRules />
          <HearLola />
          <FeaturedDecisions />
        </div>
      </div>
    </div>
  );
}

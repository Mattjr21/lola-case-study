import React from "react";
import { Fold1Credentials } from "../Fold1Credentials";
import { LolaScrollNarrative } from "../LolaScrollNarrative";
import { PORTFOLIO } from "../constants";
import { FadeIn } from "../ui";

function BackLink() {
  if (!PORTFOLIO.backUrl) return null;
  return (
    <a
      href={PORTFOLIO.backUrl}
      className="inline-flex items-center gap-1.5 text-[13px] text-[var(--cs-muted)] hover:text-[var(--cs-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cs-brand)] rounded-[var(--cs-radius)]"
    >
      <span aria-hidden>←</span> Back to work
    </a>
  );
}

export function Act1Hook() {
  return (
    <header id="overview" className="scroll-mt-[var(--cs-nav-h)]">
      <LolaScrollNarrative />

      <div className="border-b border-[var(--cs-border)] bg-[var(--cs-surface)]">
        <div className="cs-page py-[var(--cs-space-5)] md:py-[var(--cs-space-6)]">
          <BackLink />

          <FadeIn when="mount" className="mt-4">
            <Fold1Credentials />
          </FadeIn>
        </div>
      </div>
    </header>
  );
}

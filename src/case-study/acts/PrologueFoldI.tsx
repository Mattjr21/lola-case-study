import React from "react";
import { Fold1Credentials } from "../Fold1Credentials";
import { StoreScrollStage } from "../StoreScrollStage";
import { FadeIn } from "../ui";

export function PrologueFoldI() {
  return (
    <div id="prologue" className="scroll-mt-[var(--cs-nav-h)]">
      <StoreScrollStage />

      <div className="border-b border-[var(--cs-border)] bg-[var(--cs-surface)]">
        <div className="cs-page cs-fold-section">
          <FadeIn when="mount">
            <Fold1Credentials />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

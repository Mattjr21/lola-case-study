import React from "react";
import { FlowExplorer } from "../FlowExplorer";
import { StaffOpsPreview } from "../StaffOpsPreview";
import { ConversationCraft } from "./ConversationCraft";
import { FadeIn } from "../ui";

export function Act3Flows() {
  return (
    <>
      <div id="develop-flows" className="cs-page cs-fold-section scroll-mt-[var(--cs-nav-h)]">
        <FadeIn>
          <div className="cs-phase-artifact cs-phase-artifact--pad">
            <FlowExplorer />
          </div>
        </FadeIn>
      </div>
      <StaffOpsPreview />
      <ConversationCraft />
    </>
  );
}

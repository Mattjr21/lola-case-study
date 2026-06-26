import React from "react";
import { PrologueHook } from "../case-study/acts/PrologueHook";
import { PhaseDefine } from "../case-study/acts/PhaseDefine";
import { PhaseDiscover } from "../case-study/acts/PhaseDiscover";
import { PhaseDevelop } from "../case-study/acts/PhaseDevelop";
import { PhaseDeliver } from "../case-study/acts/PhaseDeliver";
import { ChapterNav } from "../case-study/ChapterNav";

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--cs-bg)] text-[var(--cs-ink)]" style={{ fontFamily: "var(--cs-font)" }}>
      <div className="cs-skip-links">
        <a href="#develop/flows/broadcast" className="cs-skip-link">
          Skip to flows
        </a>
        <a href="#main-content" className="cs-skip-link">
          Skip to phases
        </a>
      </div>
      <ChapterNav />
      <main id="main-content">
        <PrologueHook />
        <PhaseDiscover />
        <PhaseDefine />
        <PhaseDevelop />
        <PhaseDeliver />
      </main>
    </div>
  );
}

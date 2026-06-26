import React, { useEffect, useState } from "react";
import { DEVELOP_STEPS } from "./constants";

function useActiveDevelopStep() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const sections = DEVELOP_STEPS.map((step) => document.getElementById(step.id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target?.id) return;
        const idx = DEVELOP_STEPS.findIndex((step) => step.id === visible.target.id);
        if (idx >= 0) setActiveIdx(idx);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeIdx;
}

/** In-phase progress for Develop — flows, staff, craft */
export function DevelopSectionCue() {
  const activeIdx = useActiveDevelopStep();
  const active = DEVELOP_STEPS[activeIdx];

  return (
    <nav className="cs-develop-cue" aria-label="Develop sections">
      <div className="cs-page cs-develop-cue__inner">
        <p className="cs-develop-cue__status" aria-live="polite">
          {activeIdx + 1} of {DEVELOP_STEPS.length} · {active.label}
        </p>
        <ol className="cs-develop-cue__steps">
          {DEVELOP_STEPS.map((step, i) => {
            const isActive = i === activeIdx;
            return (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className={`cs-develop-cue__step${isActive ? " is-active" : ""}${i < activeIdx ? " is-past" : ""}`}
                  aria-current={isActive ? "step" : undefined}
                >
                  {step.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

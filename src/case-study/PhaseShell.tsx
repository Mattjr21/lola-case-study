import React from "react";
import type { PhaseId } from "./constants";
import { PHASES } from "./constants";
import { FadeIn } from "./ui";

type PhaseShellProps = {
  id: PhaseId;
  children: React.ReactNode;
  tone?: "default" | "muted" | "surface";
  /** Tighter fold header — fits interactive explorer in one viewport */
  compact?: boolean;
  /** No bottom pad — last phase with footer flush */
  end?: boolean;
};

const TONE_CLASS = {
  default: "cs-fold--default",
  muted: "cs-fold--muted",
  surface: "cs-fold--surface",
} as const;

export function PhaseShell({ id, children, tone = "default", compact = false, end = false }: PhaseShellProps) {
  const phase = PHASES.find((p) => p.id === id);
  if (!phase) return <>{children}</>;

  return (
    <section
      id={id}
      className={`cs-fold scroll-mt-[var(--cs-nav-h)] ${TONE_CLASS[tone]}${compact ? " cs-fold--compact" : ""}${end ? " cs-fold--end" : ""}`}
      aria-labelledby={`phase-title-${id}`}
    >
      <div className="cs-fold-marker" aria-hidden>
        <span className="cs-fold-marker-num">{phase.num}</span>
      </div>
      <header className="cs-fold-header cs-page">
        <FadeIn when="mount">
          <p className="cs-fold-eyebrow">{phase.eyebrow}</p>
          <h2 id={`phase-title-${id}`} className="cs-fold-title">
            {phase.title}
          </h2>
          <p className="cs-fold-lead">{phase.lead}</p>
        </FadeIn>
      </header>
      <div className="cs-fold-body">{children}</div>
    </section>
  );
}

export function PhaseDivider({ label }: { label: string }) {
  return (
    <div className="cs-fold-divider" role="separator" aria-label={label}>
      <div className="cs-page">
        <span className="cs-fold-divider-label">{label}</span>
      </div>
    </div>
  );
}

/** @deprecated use PhaseShell */
export const FoldShell = PhaseShell;
/** @deprecated use PhaseDivider */
export const FoldDivider = PhaseDivider;

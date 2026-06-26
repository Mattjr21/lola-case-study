import React, { useCallback, useEffect, useRef, useState } from "react";
import { PORTFOLIO, PROGRESS_PHASES, type PhaseId } from "./constants";
import { AccordionChevron } from "./transitions";
import { LolaMark } from "./ui";

function useActivePhase() {
  const [activePhase, setActivePhase] = useState<PhaseId | "prologue">("prologue");

  useEffect(() => {
    const prologue = document.getElementById("prologue");
    const phaseEls = PROGRESS_PHASES.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const sections = prologue ? [prologue, ...phaseEls] : phaseEls;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target?.id) return;
        const id = visible.target.id;
        if (id === "prologue") {
          setActivePhase("prologue");
          return;
        }
        if (PROGRESS_PHASES.some((p) => p.id === id)) {
          setActivePhase(id as PhaseId);
        }
      },
      { rootMargin: "-14% 0px -52% 0px", threshold: [0, 0.1, 0.25, 0.4] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const activeIdx =
    activePhase === "prologue" ? -1 : PROGRESS_PHASES.findIndex((p) => p.id === activePhase);

  return { activePhase, activeIdx };
}

function PhaseStepper({
  activePhase,
  activeIdx,
}: {
  activePhase: PhaseId | "prologue";
  activeIdx: number;
}) {
  const stepCount = PROGRESS_PHASES.length;
  const onPrologue = activePhase === "prologue";
  const fillPct = onPrologue ? 0 : ((activeIdx + 1) / stepCount) * 100;
  const dotLeft = onPrologue ? 0 : ((activeIdx + 0.5) / stepCount) * 100;

  return (
    <div className="cs-phase-stepper">
      <div className="cs-phase-stepper__steps" aria-label="Process phases">
        {PROGRESS_PHASES.map((phase, i) => {
          const isActive = activePhase === phase.id;
          const isPast = !onPrologue && activeIdx > i;
          return (
            <a
              key={phase.id}
              href={`#${phase.id}`}
              title={phase.lead}
              aria-current={isActive ? "step" : undefined}
              className={`cs-phase-stepper__step${isActive ? " is-active" : ""}${isPast ? " is-past" : ""}${onPrologue ? " is-idle" : ""}`}
            >
              <span className="cs-phase-stepper__num">{phase.num}</span>
              <span className="cs-phase-stepper__label">{phase.label}</span>
            </a>
          );
        })}
      </div>
      <div className="cs-phase-stepper__progress" aria-hidden="true">
        <div className="cs-phase-stepper__track">
          <div className="cs-phase-stepper__fill" style={{ width: `${fillPct}%` }} />
          {!onPrologue ? <span className="cs-phase-stepper__dot" style={{ left: `${dotLeft}%` }} /> : null}
        </div>
      </div>
    </div>
  );
}

function MobilePhasePicker({
  activePhase,
  activeIdx,
}: {
  activePhase: PhaseId | "prologue";
  activeIdx: number;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const onPrologue = activePhase === "prologue";
  const current = onPrologue ? null : PROGRESS_PHASES[activeIdx];
  const stepCount = PROGRESS_PHASES.length;
  const fillPct = onPrologue ? 0 : ((activeIdx + 1) / stepCount) * 100;
  const dotLeft = onPrologue ? 0 : ((activeIdx + 0.5) / stepCount) * 100;

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div ref={rootRef} className="cs-phase-mobile-picker">
      <button
        ref={triggerRef}
        type="button"
        className="cs-phase-mobile-picker__trigger"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls="cs-phase-mobile-menu"
        aria-label={onPrologue ? "Intro — choose a process phase" : `Current step: ${current?.label}. Choose phase.`}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="cs-phase-mobile-picker__value">
          {onPrologue ? "Intro" : `${current?.num} / ${stepCount} · ${current?.label}`}
        </span>
        <AccordionChevron className={`cs-phase-mobile-picker__chevron${open ? " is-open" : ""}`} />
      </button>

      {open ? (
        <ul id="cs-phase-mobile-menu" className="cs-phase-mobile-picker__menu" role="listbox" aria-label="Process phases">
          {PROGRESS_PHASES.map((phase) => {
            const isActive = activePhase === phase.id;
            return (
              <li key={phase.id} role="presentation">
                <a
                  href={`#${phase.id}`}
                  role="option"
                  aria-selected={isActive}
                  aria-current={isActive ? "step" : undefined}
                  className={`cs-phase-mobile-picker__option${isActive ? " is-active" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  <span className="cs-phase-mobile-picker__option-num">{phase.num}</span>
                  <span>{phase.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="cs-phase-stepper__progress cs-phase-stepper__progress--mobile" aria-hidden="true">
        <div className="cs-phase-stepper__track">
          <div className="cs-phase-stepper__fill" style={{ width: `${fillPct}%` }} />
          {!onPrologue ? <span className="cs-phase-stepper__dot" style={{ left: `${dotLeft}%` }} /> : null}
        </div>
      </div>
    </div>
  );
}

export function ChapterNav() {
  const { activePhase, activeIdx } = useActivePhase();

  return (
    <nav className="cs-top-nav" aria-label="Case study">
      <div className="cs-page cs-top-nav__inner">
        {PORTFOLIO.backUrl ? (
          <a href={PORTFOLIO.backUrl} className="cs-top-nav__back" aria-label="Back to work">
            <span className="cs-top-nav__back-long">← Back to work</span>
            <span className="cs-top-nav__back-short">← Work</span>
          </a>
        ) : null}

        <a href="#prologue" className="cs-top-nav__project">
          <span className="cs-top-nav__project-name">La Bodega</span>
          <span className="cs-top-nav__project-sep" aria-hidden>
            ·
          </span>
          <LolaMark variant="nav" />
        </a>

        <div className="cs-top-nav__stepper cs-top-nav__stepper--desktop">
          <PhaseStepper activePhase={activePhase} activeIdx={activeIdx} />
        </div>

        <div className="cs-top-nav__stepper cs-top-nav__stepper--mobile">
          <MobilePhasePicker activePhase={activePhase} activeIdx={activeIdx} />
        </div>
      </div>
    </nav>
  );
}

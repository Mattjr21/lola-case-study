import React, { useCallback, useEffect, useRef, useState } from "react";
import { PORTFOLIO, PROGRESS_PHASES, type PhaseId } from "./constants";
import { AccordionChevron } from "./transitions";
import { LolaMark } from "./ui";
import { useScrollSpy } from "./useScrollSpy";

const CHAPTER_SECTION_IDS = ["prologue", ...PROGRESS_PHASES.map((p) => p.id)] as const;

function useActivePhase() {
  const { activeId } = useScrollSpy(CHAPTER_SECTION_IDS);

  const activePhase: PhaseId | "prologue" =
    activeId === "prologue" ? "prologue" : (activeId as PhaseId);

  const activeIdx =
    activePhase === "prologue" ? -1 : PROGRESS_PHASES.findIndex((p) => p.id === activePhase);

  return { activePhase, activeIdx };
}

function usePageScrollPct() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return pct;
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
        </div>
      </div>
    </div>
  );
}

function PhaseRail({
  activePhase,
  activeIdx,
  scrollPct,
}: {
  activePhase: PhaseId | "prologue";
  activeIdx: number;
  scrollPct: number;
}) {
  const onPrologue = activePhase === "prologue";

  return (
    <aside className="cs-phase-rail" aria-label="Case study timeline">
      <div className="cs-phase-rail__progress" aria-hidden="true">
        <div className="cs-phase-rail__track">
          <div className="cs-phase-rail__fill" style={{ height: `${scrollPct}%` }} />
        </div>
      </div>

      <ol className="cs-phase-rail__steps">
        <li>
          <a
            href="#prologue"
            className={`cs-phase-rail__step${onPrologue ? " is-active" : ""}${!onPrologue ? " is-past" : ""}`}
            aria-current={onPrologue ? "step" : undefined}
            title="Intro"
          >
            <span className="cs-phase-rail__dot" aria-hidden="true" />
            <span className="cs-phase-rail__meta">
              <span className="cs-phase-rail__num">00</span>
              <span className="cs-phase-rail__label">Intro</span>
            </span>
          </a>
        </li>
        {PROGRESS_PHASES.map((phase, i) => {
          const isActive = activePhase === phase.id;
          const isPast = !onPrologue && activeIdx > i;
          return (
            <li key={phase.id}>
              <a
                href={`#${phase.id}`}
                title={phase.lead}
                aria-current={isActive ? "step" : undefined}
                className={`cs-phase-rail__step${isActive ? " is-active" : ""}${isPast ? " is-past" : ""}${onPrologue ? " is-idle" : ""}`}
              >
                <span className="cs-phase-rail__dot" aria-hidden="true" />
                <span className="cs-phase-rail__meta">
                  <span className="cs-phase-rail__num">{phase.num}</span>
                  <span className="cs-phase-rail__label">{phase.label}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}

export function ChapterNav() {
  const { activePhase, activeIdx } = useActivePhase();
  const scrollPct = usePageScrollPct();

  return (
    <>
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

          <div className="cs-top-nav__links" aria-label="Contact">
            {PORTFOLIO.linkedIn ? (
              <a
                href={PORTFOLIO.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="cs-top-nav__link"
              >
                LinkedIn
              </a>
            ) : null}
            {PORTFOLIO.email ? (
              <a href={`mailto:${PORTFOLIO.email}`} className="cs-top-nav__link">
                Email
              </a>
            ) : null}
          </div>

          <div className="cs-top-nav__stepper cs-top-nav__stepper--mobile">
            <MobilePhasePicker activePhase={activePhase} activeIdx={activeIdx} />
          </div>
        </div>
      </nav>

      <PhaseRail activePhase={activePhase} activeIdx={activeIdx} scrollPct={scrollPct} />
    </>
  );
}

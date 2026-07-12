import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { KEY_FLOW_CLIPS } from "./motionAssets";
import { FadeIn } from "./ui";

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function useNarrow(maxWidth = 899) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [maxWidth]);
  return narrow;
}

function FlowsStaticList() {
  return (
    <ol className="cs-flows-sticky__static-list">
      {KEY_FLOW_CLIPS.map((clip, i) => (
        <li key={clip.src} className="cs-flows-sticky__static-item">
          <div className="cs-flows-sticky__copy-block">
            <p className="cs-flows-sticky__kicker">
              {String(i + 1).padStart(2, "0")} · {clip.kicker}
            </p>
            <h4 className="cs-flows-sticky__headline">{clip.headline}</h4>
            <p className="cs-flows-sticky__body">{clip.body}</p>
          </div>
          <div className="cs-flows-sticky__frame">
            <video src={clip.src} muted playsInline preload="metadata" controls aria-label={clip.title} />
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Sticky stage: left copy + device fan (clean gaps, one active clip) */
export function KeyFlowsMotion() {
  const reduce = useReducedMotion();
  const narrow = useNarrow();
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  const usePin = !reduce && !narrow;
  /** Fan opens in first ~18% of the pin, then holds while steps advance */
  const spread = clamp01(progress / 0.18);
  const stepCount = KEY_FLOW_CLIPS.length;
  const step = Math.min(stepCount - 1, Math.floor(progress * stepCount * 0.999));
  const clip = KEY_FLOW_CLIPS[active];

  useEffect(() => {
    setActive(step);
  }, [step]);

  useEffect(() => {
    if (!usePin) return;
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const range = Math.max(1, track.offsetHeight - window.innerHeight);
      setProgress(clamp01(-rect.top / range));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [usePin]);

  useEffect(() => {
    if (!usePin) return;
    videoRefs.current.forEach((el, i) => {
      if (!el) return;
      el.muted = true;
      if (i === active) {
        void el.play().catch(() => {});
      } else {
        el.pause();
        try {
          el.currentTime = Math.min(el.currentTime, 0.05);
        } catch {
          /* ignore seek errors on unloaded media */
        }
      }
    });
  }, [active, usePin]);

  return (
    <section className="cs-flows-sticky" aria-labelledby="key-flows-heading">
      <FadeIn>
        <header className="cs-section-intro cs-section-intro--tight max-w-[40ch]">
          <p className="cs-meta-label">Develop · motion</p>
          <h3 id="key-flows-heading" className="cs-h3">
            One loop. Three beats.
          </h3>
          <p className="cs-body">
            {usePin
              ? "Scroll — one device opens into guest, orders, and staff."
              : "Guest thread → orders → staff alert."}
          </p>
        </header>
      </FadeIn>

      {!usePin ? (
        <FlowsStaticList />
      ) : (
        <div ref={trackRef} className="cs-flows-sticky__track">
          <div className="cs-flows-sticky__pin">
            <div className="cs-flows-sticky__layout">
              <div className="cs-flows-sticky__rail">
                <div className="cs-flows-sticky__copy" key={clip.src}>
                  <p className="cs-flows-sticky__kicker">
                    {String(active + 1).padStart(2, "0")} · {clip.kicker}
                  </p>
                  <h4 className="cs-flows-sticky__headline">{clip.headline}</h4>
                  <p className="cs-flows-sticky__body">{clip.body}</p>
                </div>

                <ol className="cs-flows-sticky__dots" aria-label="Flow progress">
                  {KEY_FLOW_CLIPS.map((c, i) => (
                    <li key={c.src}>
                      <button
                        type="button"
                        className={`cs-flows-sticky__dot${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
                        aria-current={i === active ? "step" : undefined}
                        aria-label={`${c.kicker}: ${c.headline}`}
                        onClick={() => {
                          const track = trackRef.current;
                          if (!track) return;
                          const range = Math.max(1, track.offsetHeight - window.innerHeight);
                          const top = window.scrollY + track.getBoundingClientRect().top;
                          window.scrollTo({
                            top: top + (range * (i + 0.4)) / stepCount,
                            behavior: "smooth",
                          });
                        }}
                      >
                        <span className="cs-flows-sticky__dot-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="cs-flows-sticky__dot-label">{c.kicker}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </div>

              <div
                className="cs-flows-sticky__stage"
                style={{ ["--flows-spread" as string]: String(spread) }}
                data-active={active}
              >
                <div className="cs-flows-sticky__cluster" role="group" aria-label="Key flow devices">
                  {KEY_FLOW_CLIPS.map((c, i) => {
                    const on = i === active;
                    return (
                      <figure
                        key={c.src}
                        className={`cs-flows-sticky__phone${on ? " is-active" : ""}`}
                        data-slot={i}
                        aria-hidden={!on}
                      >
                        <div className="cs-flows-sticky__frame">
                          <video
                            ref={(el) => {
                              videoRefs.current[i] = el;
                            }}
                            src={c.src}
                            muted
                            loop
                            playsInline
                            preload={on || spread > 0.4 ? "auto" : "metadata"}
                            aria-label={c.title}
                          />
                        </div>
                        <figcaption className="cs-flows-sticky__cap">{c.kicker}</figcaption>
                      </figure>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

import React, { useEffect, useRef, useState } from "react";

type FeatureVideoProps = {
  src: string;
  title?: string;
  caption?: string;
  variant?: "hero" | "flow" | "inline";
  className?: string;
  /** Muted autoplay when scrolled into view (default). Off when withAudio. */
  autoPlayInView?: boolean;
  /** Enable soundtrack — user must press Play (browser autoplay policy). */
  withAudio?: boolean;
  /** Hide figcaption when title/caption already sit above the clip */
  hideCaption?: boolean;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Product clip — muted loop by default; withAudio requires a Play tap for sound */
export function FeatureVideo({
  src,
  title,
  caption,
  variant = "flow",
  className = "",
  autoPlayInView = true,
  withAudio = false,
  hideCaption = false,
}: FeatureVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  const canAutoplay = autoPlayInView && !withAudio;

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = !withAudio;
    if (withAudio) el.volume = 1;
  }, [withAudio, src]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canAutoplay || reduced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
          void el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: [0, 0.28, 0.55] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canAutoplay, src, reduced]);

  // Pause audio clips when they leave the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el || !withAudio) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !el.paused) {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [withAudio, src]);

  function togglePlayback() {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      if (withAudio) {
        el.muted = false;
        el.volume = 1;
      }
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  const label = title ?? caption ?? "Product demo";
  const toggleLabel = withAudio
    ? playing
      ? `Pause ${label}`
      : `Play ${label} with sound`
    : playing
      ? `Pause ${label}`
      : `Play ${label}`;

  return (
    <figure
      className={`cs-feature-video cs-feature-video--${variant}${withAudio ? " cs-feature-video--audio" : ""} ${className}`.trim()}
    >
      <div className="cs-feature-video__frame">
        <video
          ref={ref}
          className="cs-feature-video__media"
          src={src}
          muted={!withAudio}
          loop={!withAudio}
          playsInline
          preload="metadata"
          aria-label={label}
        />
        <button
          type="button"
          className={`cs-feature-video__toggle${withAudio && !playing ? " is-sound" : ""}`}
          onClick={togglePlayback}
          aria-pressed={playing}
          aria-label={toggleLabel}
        >
          {withAudio ? (playing ? "Pause" : "Play · sound on") : playing ? "Pause" : "Play"}
        </button>
      </div>
      {!hideCaption && (title || caption) ? (
        <figcaption className="cs-feature-video__cap">
          {title ? <span className="cs-feature-video__title">{title}</span> : null}
          {caption ? <span className="cs-feature-video__caption">{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

import { useEffect, useState } from "react";

/** Nav height + reading line below sticky header */
function defaultScrollOffset() {
  const folio = document.querySelector(".site-nav") || document.querySelector(".folio-nav");
  const mobileBar = document.querySelector(".cs-phase-mobile-bar");
  const navH = folio?.getBoundingClientRect().height ?? 74;
  const barH =
    mobileBar && getComputedStyle(mobileBar).display !== "none"
      ? mobileBar.getBoundingClientRect().height
      : 0;
  return navH + barH + Math.round(window.innerHeight * 0.12);
}

/**
 * Document-order scroll spy — active = last section whose top crossed the offset line.
 * Stable when scrolling through long phases (unlike ratio-only IntersectionObserver batches).
 */
export function useScrollSpy(sectionIds: readonly string[], offsetPx?: number) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const offset = offsetPx ?? defaultScrollOffset();
      let next = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) {
          next = section.id;
        } else {
          break;
        }
      }

      setActiveId((prev) => (prev === next ? prev : next));
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [sectionIds, offsetPx]);

  const activeIdx = sectionIds.indexOf(activeId);

  return { activeId, activeIdx };
}

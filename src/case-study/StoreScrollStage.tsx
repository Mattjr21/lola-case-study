import React from "react";
import { PROJECT } from "./constants";
import { HeroJourneyVisual } from "./HeroJourneyVisual";
import { HeroCtas, HeroProofPills, StoryHero, StoryHeroSubtitle } from "./StorySections";
import { FadeIn } from "./ui";

/** Fold I — split hero: headline left, connected journey illustration right */
export function StoreScrollStage() {
  return (
    <section className="cs-hero-banner cs-hero-banner--split" aria-label="Project overview">
      <div className="cs-page cs-hero-banner-split">
        <div className="cs-hero-banner-split-copy">
          <FadeIn when="mount" delay={0}>
            <p className="cs-hero-banner-tag">{PROJECT.tag}</p>
          </FadeIn>
          <FadeIn when="mount" delay={0.05}>
            <StoryHero />
          </FadeIn>
          <FadeIn when="mount" delay={0.1}>
            <StoryHeroSubtitle />
          </FadeIn>
          <FadeIn when="mount" delay={0.15}>
            <HeroProofPills />
          </FadeIn>
          <FadeIn when="mount" delay={0.2}>
            <HeroCtas />
          </FadeIn>
        </div>
        <FadeIn when="mount" delay={0.08} distance={14} className="cs-hero-journey-reveal">
          <HeroJourneyVisual />
        </FadeIn>
      </div>
    </section>
  );
}

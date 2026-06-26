import React from "react";
import { PROJECT } from "./constants";
import { HeroJourneyVisual } from "./HeroJourneyVisual";
import { HeroCtas, HeroProofPills, StoryHero, StoryHeroSubtitle } from "./StorySections";

/** Fold I — split hero: headline left, connected journey illustration right */
export function StoreScrollStage() {
  return (
    <section className="cs-hero-banner cs-hero-banner--split" aria-label="Project overview">
      <div className="cs-page cs-hero-banner-split">
        <div className="cs-hero-banner-split-copy">
          <p className="cs-hero-banner-tag">{PROJECT.tag}</p>
          <StoryHero />
          <StoryHeroSubtitle />
          <HeroProofPills />
          <HeroCtas />
        </div>
        <HeroJourneyVisual />
      </div>
    </section>
  );
}

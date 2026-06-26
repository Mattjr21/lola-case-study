import React from "react";

import { PILOT_IMPACT } from "./constants";
import { FadeIn } from "./ui";

export function ImpactOutcomes() {
  return (
    <FadeIn delay={0.04}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PILOT_IMPACT.map((row) => (
          <article key={row.signal} className="cs-signal-card">
            <p className="cs-signal-card-title">{row.signal}</p>
            <p className="cs-signal-card-detail">{row.detail}</p>
          </article>
        ))}
      </div>
    </FadeIn>
  );
}

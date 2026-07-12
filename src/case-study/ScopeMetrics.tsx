import React from "react";
import { SCOPE_METRICS } from "./constants";
import { FadeIn } from "./ui";

/** Hiring-manager metrics — pilot outcomes first, then scope, then honest gaps */
export function ScopeMetrics() {
  return (
    <FadeIn delay={0.05}>
      <div className="cs-scope-metrics">
        <div>
          <p className="cs-meta-label mb-1">{SCOPE_METRICS.outcomesLabel}</p>
          <p className="cs-scope-metrics__note">{SCOPE_METRICS.outcomesNote}</p>
          <ul className="cs-scope-metrics__grid cs-scope-metrics__grid--outcomes" aria-label="Pilot outcomes">
            {SCOPE_METRICS.outcomes.map((row) => (
              <li key={row.label} className="cs-scope-metrics__card cs-scope-metrics__card--outcome">
                <p className="cs-scope-metrics__value">{row.value}</p>
                <p className="cs-scope-metrics__label">{row.label}</p>
                <p className="cs-scope-metrics__detail">{row.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="cs-scope-metrics__lower">
          <div>
            <p className="cs-meta-label mb-3">{SCOPE_METRICS.shippedLabel}</p>
            <ul className="cs-scope-metrics__grid" aria-label="Product scope metrics">
              {SCOPE_METRICS.shipped.map((row) => (
                <li key={row.label} className="cs-scope-metrics__card">
                  <p className="cs-scope-metrics__value">{row.value}</p>
                  <p className="cs-scope-metrics__label">{row.label}</p>
                  <p className="cs-scope-metrics__detail">{row.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="cs-meta-label mb-3">{SCOPE_METRICS.measuringLabel}</p>
            <ul className="cs-scope-metrics__list" aria-label="Metrics still measuring">
              {SCOPE_METRICS.measuring.map((row) => (
                <li key={row.label}>
                  <span className="cs-scope-metrics__m-label">{row.label}</span>
                  <span className="cs-scope-metrics__m-detail">{row.detail}</span>
                  <span className="cs-scope-metrics__m-status">{row.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

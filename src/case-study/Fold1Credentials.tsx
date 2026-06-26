import React from "react";
import {
  FOLD1_META,
  FOLD1_METRIC_CHIPS,
  FOLD1_OVERVIEW,
  FOLD1_RESPONSE_BULLETS,
  FOLD1_SECTION_HEADLINE,
} from "./constants";

function FoldSubhead({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="cs-meta-label">
      {children}
    </p>
  );
}

function FoldTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="cs-fold-title cs-fold-title--fold1">
      {children}
    </h2>
  );
}

/** Below hero — metadata, overview, design hooks (evidence lives in Discover) */
export function Fold1Credentials() {
  return (
    <div className="fold1-credentials">
      <dl className="fold1-meta-grid" aria-label="Project metadata">
        <div className="fold1-meta-item">
          <dt className="cs-meta-label">Role</dt>
          <dd className="fold1-meta-value">{FOLD1_META.role}</dd>
        </div>
        <div className="fold1-meta-item">
          <dt className="cs-meta-label">Team</dt>
          <dd className="fold1-meta-value">{FOLD1_META.team}</dd>
        </div>
        <div className="fold1-meta-item">
          <dt className="cs-meta-label">Skills</dt>
          <dd className="fold1-meta-value">
            <ul className="fold1-meta-skills">
              {FOLD1_META.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>

      <section className="fold1-case-block fold1-case-block--last" aria-labelledby="fold1-overview-label">
        <FoldSubhead id="fold1-overview-label">{FOLD1_OVERVIEW.eyebrow}</FoldSubhead>
        <FoldTitle>
          {FOLD1_SECTION_HEADLINE.map((line) => (
            <span key={line} className="fold1-credentials-lead-line">
              {line}
            </span>
          ))}
        </FoldTitle>
        <p className="fold1-case-intro">{FOLD1_OVERVIEW.intro}</p>

        <div className="fold1-solution-pillars fold1-solution-pillars--compact" aria-label="Design response">
          {FOLD1_RESPONSE_BULLETS.map((item) => (
            <article key={item.hook} className="fold1-solution-pillar">
              <h3 className="fold1-solution-pillar-title">{item.hook}</h3>
              <p className="fold1-solution-pillar-body">{item.text}</p>
            </article>
          ))}
        </div>

        <ul className="fold1-metric-chips" aria-label="Pilot scope">
          {FOLD1_METRIC_CHIPS.map((label) => (
            <li key={label} className="cs-chip fold1-metric-chip">
              {label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

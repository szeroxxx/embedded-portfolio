import { experienceTimeline } from "../lib/experience.mjs";

export default function ExperienceTimeline() {
  const [current, ...previous] = experienceTimeline;
  return (
    <div className="career-history">
      <article className="career-current">
        <span className="career-period">{current.period}</span>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
        <svg className="career-traces" viewBox="0 0 280 105" fill="none" aria-hidden="true">
          <g stroke="currentColor" strokeWidth="2">
            <path d="M280 20h-72l-48 48H98m182-35h-68l-50 50H55m225-37h-62l-50 50H20" />
            <circle cx="92" cy="68" r="5" /><circle cx="49" cy="83" r="5" /><circle cx="14" cy="96" r="5" />
          </g>
        </svg>
      </article>
      <ol className="career-previous">
        {previous.map(({ id, period, title, description }) => (
          <li key={id}>
            <span className="career-period">{period}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

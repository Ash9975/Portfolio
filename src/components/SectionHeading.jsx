import React from "react";

/**
 * Reusable section heading used across About, Projects, Skills and Contact.
 *
 * Props:
 *   number  {string}  – section index label, e.g. "01."
 *   title   {string}  – section title in uppercase, e.g. "ABOUT ME"
 */
const SectionHeading = ({ number, title }) => (
  <div className="mb-8 flex items-center gap-4 md:mb-12 md:gap-8">
    {/* Number + title — allow wrapping on very small screens so the
        gradient rule is never squeezed to zero width */}
    <h2 className="flex shrink-0 items-center gap-3 font-display text-[clamp(1.75rem,5vw,3rem)] leading-none tracking-[0.08em] text-white md:gap-4">
      <span className="text-[clamp(1.25rem,4vw,2rem)] text-primary" aria-hidden="true">
        {number}
      </span>
      {title}
    </h2>

    {/* Gradient rule — flex-1 fills remaining horizontal space */}
    <div
      className="h-0.5 min-w-[24px] flex-1 bg-[linear-gradient(90deg,#E23636_0%,transparent_90%)]"
      aria-hidden="true"
    />
  </div>
);

export default SectionHeading;

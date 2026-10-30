import React from "react";

/**
 * Reusable pull-quote block with a primary→gold gradient left accent bar.
 * Used in About and Skills sections.
 *
 * Props:
 *   text       {string}  – quote text to display
 *   className  {string}  – optional extra Tailwind classes on the wrapper
 */
const HighlightQuote = ({ text, className }) => (
  <blockquote
    className={[
      "relative pl-5 md:pl-7",
      className ?? "",
    ]
      .join(" ")
      .trim()}
  >
    {/* Left accent bar */}
    <span
      className="absolute left-0 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-primary to-primary-coral"
      aria-hidden="true"
    />
    <p className="text-[1.1rem] italic leading-[1.7] text-[#A1A1AA]">{text}</p>
  </blockquote>
);

export default HighlightQuote;

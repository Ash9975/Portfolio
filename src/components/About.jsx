import React from "react";
import { aboutData } from "../data/mock";
import SectionHeading from "./SectionHeading";
import HighlightQuote from "./HighlightQuote";

/* ── Stat Card ──────────────────────────────────────────────────────────── */
const StatCard = ({ stat }) => (
  <div className="stat-card">
    {/* Large display value */}
    <div className="mb-2 font-display text-[3rem] leading-none text-primary">
      {stat.value}
    </div>
    {/* Label */}
    <div className="text-[0.9rem] uppercase tracking-[1px] text-white/70">
      {stat.label}
    </div>
  </div>
);

/* ── About Section ──────────────────────────────────────────────────────── */
const About = () => {
  return (
    <section
      id="about"
      className={[
        /* Base layout */
        "relative bg-ink-950 px-6 py-16 md:px-8 md:py-24",
        /* Subtle radial glow in the top-right corner */
        "before:pointer-events-none before:absolute before:right-0 before:top-0",
        "before:h-full before:w-2/5",
        "before:bg-[radial-gradient(circle_at_100%_50%,rgba(226,54,54,0.05)_0%,transparent_70%)]",
        "before:content-['']",
      ].join(" ")}
    >
      <div className="relative z-[1] mx-auto max-w-container">
        <SectionHeading number="01." title="ABOUT ME" />

        <div className="grid grid-cols-1 gap-10 md:gap-14">

          {/* ── Bio + Quote ── */}
          <div className="flex flex-col gap-7">
            <p className="text-base leading-[1.8] text-white/80 md:text-[1.2rem]">
              {aboutData.description}
            </p>

            <HighlightQuote
              className="mt-2"
              text="Enjoy building clean, practical solutions and continuously improving how I write and structure code."
            />
          </div>

          {/* ── Stats grid ── */}
          {/* Mobile: 2-col | md+: auto-fit ≥150px cols (4 per row) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
            {aboutData.stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;

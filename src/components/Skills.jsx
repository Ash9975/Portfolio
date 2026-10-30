import React, { useEffect, useState } from "react";
import { skillsData } from "../data/mock";
import {
  Code2,
  Code,
  FileCode2,
  Palette,
  Server,
  ServerCog,
  Boxes,
  Database,
  DatabaseZap,
  DatabaseBackup,
  ShieldCheck,
  Network,
  Workflow,
  Cloud,
  GitBranch,
  Container,
  Terminal,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import HighlightQuote from "./HighlightQuote";

/* ── Icon map ────────────────────────────────────────────────────────────── */
// Explicit map from mock.js icon string → Lucide component.
// Falls back to Code2 for any unrecognised key.
const iconMap = {
  Code2,
  Code,
  FileCode2,
  Palette,
  Server,
  ServerCog,
  Boxes,
  Database,
  DatabaseZap,
  DatabaseBackup,
  ShieldCheck,
  Network,
  Workflow,
  Cloud,
  GitBranch,
  Container,
  Terminal,
};

/* ── Skill Card ──────────────────────────────────────────────────────────── */
const SkillCard = ({ skill, index }) => {
  const Icon = iconMap[skill.icon] ?? Code2;

  /*
   * BUG FIX — skill.level CSS transition never animated in the original code.
   *
   * Root cause: the inline style `width: skill.level%` was set at the same
   * render tick as mount, so the browser painted the final width immediately
   * — there was no prior "from" value for CSS transition to animate between.
   *
   * Fix: start at width 0, then set the real level in a useEffect after mount.
   * The 100 ms setTimeout gives the browser one frame to paint the 0-width bar
   * before the transition begins, ensuring the animation always plays.
   */
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(skill.level ?? 0), 100);
    return () => clearTimeout(t);
  }, [skill.level]);

  return (
    <div
      /* .skill-card provides: relative overflow-hidden border bg p-5 text-center
         transition hover-lift hover-border hover-shadow md:p-7.
         'group' must be added here (cannot use inside @apply in Tailwind v3). */
      className={[
        "group skill-card animate-skill-fade",
        /* Shimmer sweep on hover — before: pseudo kept inline (see index.css comment) */
        "before:absolute before:-left-full before:top-0",
        "before:h-full before:w-full",
        "before:bg-[linear-gradient(90deg,transparent,rgba(226,54,54,0.08),transparent)]",
        "before:content-[''] before:transition-[left] before:duration-500",
        "hover:before:left-full",
      ].join(" ")}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* ── Icon circle ── */}
      <div
        className={[
          /* Base */
          "relative mx-auto mb-5 flex items-center justify-center rounded-full",
          "h-14 w-14 md:h-16 md:w-16",
          "bg-primary/10 text-primary",
          "transition-all duration-300",
          /* Hover states */
          "group-hover:scale-110 group-hover:rotate-[5deg]",
          "group-hover:bg-primary/20 group-hover:shadow-[0_0_28px_rgba(226,54,54,0.4)]",
          /* Ring — after: pseudo */
          "after:absolute after:-inset-[5px] after:rounded-full",
          "after:border-2 after:border-primary after:opacity-0",
          "after:transition-opacity after:duration-300",
          "group-hover:after:opacity-30 group-hover:after:animate-icon-pulse",
        ].join(" ")}
        aria-hidden="true"
      >
        <Icon size={28} />
      </div>

      {/* ── Skill name ── */}
      <h3 className="mb-4 font-display text-[1.3rem] leading-tight tracking-[1.5px] text-white md:text-[1.5rem]">
        {skill.name}
      </h3>

      {/* ── Proficiency bar ── */}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-label={`${skill.name} proficiency`}
        aria-valuenow={skill.level ?? 0}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-primary to-gold transition-[width] duration-1000 ease-out"
          style={{ width: `${barWidth}%` }}
        >
          {/* Glow dot at the leading edge */}
          <span className="absolute right-0 top-0 h-full w-[24px] animate-bar-glow bg-white/40 blur-[8px]" />
        </div>
      </div>
    </div>
  );
};

/* ── Skills Section ──────────────────────────────────────────────────────── */
const Skills = () => {
  return (
    <section
      id="skills"
      className={[
        "relative overflow-hidden bg-ink-950 px-6 py-16 md:px-8 md:py-24",
        /* Central radial glow */
        "before:pointer-events-none before:absolute before:left-1/2 before:top-1/2",
        "before:h-[600px] before:w-[600px]",
        "before:-translate-x-1/2 before:-translate-y-1/2",
        "before:bg-[radial-gradient(circle,rgba(226,54,54,0.08)_0%,transparent_70%)]",
        "before:content-['']",
      ].join(" ")}
    >
      <div className="relative z-[1] mx-auto max-w-container">
        <SectionHeading number="03." title="SKILLS & EXPERTISE" />

        <HighlightQuote
          className="mb-10 md:mb-12"
          text="\u201cI enjoy building clean, practical solutions and continuously improving how I write and structure code.\u201d"
        />

        {/*
         * Grid columns:
         *   320–639px  → 2 columns  (cards ~128–180px)
         *   640–767px  → 3 columns  (sm breakpoint)
         *   768–1023px → 3 columns  (md)
         *   1024–1279px→ 4 columns  (lg)
         *   1280px+    → 4 columns  (xl, capped by max-w-container)
         */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {skillsData.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

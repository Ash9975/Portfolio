
import React, { useEffect, useState } from "react";
import { heroData } from "../data/mock";
import { ArrowDown, Github, Linkedin } from "lucide-react";

const ROLES = [
  "FULL STACK DEVELOPER",
  "MERN STACK ENGINEER",
  "REACT SPECIALIST",
  "API ARCHITECT",
];

/* ── Role cycling typewriter ─────────────────────────── */

function useRoleCycle() {
  const [state, setState] = useState({
    roleIdx: 0,
    displayed: "",
    phase: "typing",
  });

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const { roleIdx, displayed, phase } = state;

  useEffect(() => {
    if (reducedMotion) {
      if (displayed !== ROLES[0] || roleIdx !== 0 || phase !== "pause") {
        setState({ roleIdx: 0, displayed: ROLES[0], phase: "pause" });
      }
      return;
    }

    const target = ROLES[roleIdx];
    let timeout;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => {
          setState((s) => ({
            ...s,
            displayed: target.slice(0, s.displayed.length + 1),
          }));
        }, 65);
      } else {
        timeout = setTimeout(() => {
          setState((s) => ({ ...s, phase: "pause" }));
        }, 2200);
      }
    } else if (phase === "pause") {
      timeout = setTimeout(() => {
        setState((s) => ({ ...s, phase: "erasing" }));
      }, 400);
    } else if (displayed.length > 0) {
      timeout = setTimeout(() => {
        setState((s) => ({ ...s, displayed: s.displayed.slice(0, -1) }));
      }, 30);
    } else {
      timeout = setTimeout(() => {
        setState((s) => ({
          roleIdx: (s.roleIdx + 1) % ROLES.length,
          displayed: "",
          phase: "typing",
        }));
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx, reducedMotion]);

  return displayed;
}

/* ── Hero Section ────────────────────────────────────── */

const Hero = () => {
  const role = useRoleCycle();

  const nameParts = (heroData.name || "").trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  const scrollTo = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink-950"
    >
      {/* ── Background grid ── */}
      <div
        className="hero-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* ── Radial vignette overlay ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, transparent 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.97) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-[45%] h-[480px] w-[800px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[130px]"
        aria-hidden="true"
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pb-28 pt-36 text-center sm:px-8 md:px-10">

        {/* ── Role pill ── */}
        <div
          className="mb-10 inline-flex min-h-8 items-center justify-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-sm"
          style={{ animationDelay: "0ms" }}
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span className="min-w-[220px] text-left font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[0.72rem] sm:tracking-[0.22em]">
            {role}
          </span>
          <span
            className="h-3.5 w-[1.5px] animate-[barGlow_0.8s_ease-in-out_infinite] bg-primary/80"
            aria-hidden="true"
          />
        </div>

        {/* ── Main headline ── */}
        <h1
          className="mb-0 flex w-full flex-col items-center font-sans font-black leading-[0.87] tracking-[-0.06em] text-white"
          aria-label={heroData.name}
        >
          {/* First name */}
          <span
            className="hero-name-line block"
            style={{ fontSize: "clamp(3.5rem, 13vw, 11.5rem)" }}
          >
            {firstName}
          </span>

          {/* Last name + accent dot */}
          {lastName && (
            <span
              className="hero-name-line block"
              style={{ fontSize: "clamp(3.5rem, 13vw, 11.5rem)" }}
            >
              {lastName}
              <span className="text-primary" aria-hidden="true">.</span>
            </span>
          )}
        </h1>

        {/* ── Horizontal divider ── */}
        <div
          className="hero-divider my-9 flex w-full max-w-[680px] items-center gap-4 sm:my-11"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
        </div>

        {/* ── Tagline ── */}
        <p
          className="hero-tagline mx-auto mb-12 max-w-[580px] px-2 font-sans font-normal leading-[1.72] tracking-[-0.015em] text-white/50 sm:mb-14"
          style={{ fontSize: "clamp(0.95rem, 1.9vw, 1.2rem)" }}
        >
          {heroData.tagline}
        </p>

        {/* ── CTA buttons ── */}
        <div className="hero-cta flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="group relative flex min-h-[52px] w-full items-center justify-center overflow-hidden rounded-full bg-white px-10 py-3 font-sans text-[0.85rem] font-bold tracking-wide text-black transition-all duration-300 hover:-translate-y-[3px] hover:bg-primary hover:text-white hover:shadow-[0_12px_40px_rgba(226,54,54,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950 sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => scrollTo("contact")}
            className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-10 py-3 font-sans text-[0.85rem] font-medium tracking-wide text-white/65 backdrop-blur-sm transition-all duration-300 hover:-translate-y-[3px] hover:border-white/40 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-ink-950 sm:w-auto"
          >
            Get in touch →
          </button>
        </div>

        {/* ── Social links ── */}
        <div className="hero-social mt-11 flex items-center justify-center gap-6">
          <a
            href="https://github.com/Ash9975"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Github size={16} />
          </a>

          <span className="h-px w-5 bg-white/12" aria-hidden="true" />

          <a
            href="https://www.linkedin.com/in/ashish-pimpalshende/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        type="button"
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About section"
        className="group absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/25 transition-colors duration-300 hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {/* Animated scroll track */}
        <span
          className="relative flex h-[38px] w-[1px] overflow-hidden bg-white/10"
          aria-hidden="true"
        >
          <span className="hero-scroll-line absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        </span>
        <span className="text-[0.58rem] uppercase tracking-[0.25em]">Scroll</span>
      </button>
    </section>
  );
};

export default Hero;

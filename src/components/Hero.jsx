
import React, { useEffect, useRef, useState } from "react";
import { heroData } from "../data/mock";
import { Github, Linkedin } from "lucide-react";
import ParticleConstellation from "./ParticleConstellation";

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
        const t = setTimeout(() => {
          setState({ roleIdx: 0, displayed: ROLES[0], phase: "pause" });
        }, 0);
        return () => clearTimeout(t);
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
  const role       = useRoleCycle();
  const sectionRef = useRef(null);

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
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Background grid ── */}
      <div
        className="hero-grid-bg pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* ── Atmosphere: primary dark-crimson glow — behind the name ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top:    "30%",
          left:   "50%",
          width:  "min(900px, 110vw)",
          height: "min(600px, 70vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(160,25,25,0.055) 0%, rgba(110,18,18,0.03) 40%, transparent 72%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />

      {/* ── Atmosphere: warm-orange secondary glow — lower hero area ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top:    "68%",
          left:   "52%",
          width:  "min(600px, 80vw)",
          height: "min(400px, 45vh)",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(130,30,10,0.035) 0%, rgba(90,20,8,0.018) 50%, transparent 75%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      {/* ── Radial vignette overlay — edges fade to pure black ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.97) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Particle constellation ── */}
      <ParticleConstellation sectionRef={sectionRef} />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pb-16 pt-20 text-center sm:px-8 md:px-10 lg:pb-20 lg:pt-24">

        {/* ── Role pill ── */}
       
<div
  className="mt-16 mb-12 inline-flex min-h-7 items-center justify-center gap-3 lg:mt-10 lg:mb-8"
  style={{ animationDelay: "0ms" }}
>
  <span
    className="ml-8 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
    aria-hidden="true"
  />

  <span className="min-w-[190px] text-left font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[0.62rem] sm:tracking-[0.22em] lg:text-[0.58rem]">
    {role}
  </span>
</div>


        {/* ── Main headline ── */}
        <h1
          className="mb-0  flex w-full flex-col items-center font-sans font-black leading-[1.1] tracking-[-0.06em] text-white"
          aria-label={heroData.name}
        >
          {/* First name */}
          <span
            className="hero-name-line block w-full text-center"
            style={{ fontSize: "clamp(3rem, 6vw, 6.4rem)" }}
          >
            {firstName}
          </span>

          {/* Last name + accent dot */}
          {lastName && (
            <span
              className="hero-name-line block w-full text-center"
              style={{ fontSize: "clamp(3rem, 6vw, 6.4rem)" }}
            >
              {lastName}
              
            </span>
          )}
        </h1>

        {/* ── Horizontal divider ── */}
        <div
          className="hero-divider my-5 flex w-full max-w-[540px] items-center gap-4 sm:my-6 lg:my-7"
          aria-hidden="true"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-white/15" />
          <span className="h-1 w-1 rounded-full bg-primary/60" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/15 to-white/15" />
        </div>

        {/* ── Tagline ── */}
        <p
          className="hero-tagline mx-auto mb-8 max-w-[460px] px-2 font-sans font-normal leading-[1.72] tracking-[-0.015em] text-white/50 sm:mb-9 lg:mb-10"
          style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)" }}
        >
          {heroData.tagline}
        </p>

        {/* ── CTA buttons ── */}
        <div className="hero-cta flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row lg:gap-3.5">
          <button
            type="button"
            onClick={() => scrollTo("projects")}
            className="group relative flex min-h-[52px] w-full items-center justify-center overflow-hidden rounded-full bg-white px-10 py-3 font-sans text-[0.85rem] font-bold tracking-wide text-black transition-all duration-300 hover:-translate-y-[3px] hover:bg-primary hover:text-white hover:shadow-[0_12px_40px_rgba(226,54,54,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:w-auto lg:min-h-[44px] lg:px-8 lg:py-2.5 lg:text-[0.8rem]"
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
            className="flex min-h-[52px] w-full items-center justify-center rounded-full border border-white/[0.10] bg-transparent px-10 py-3 font-sans text-[0.85rem] font-medium tracking-wide text-white/60 transition-all duration-300 hover:-translate-y-[3px] hover:border-white/30 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:w-auto lg:min-h-[44px] lg:px-8 lg:py-2.5 lg:text-[0.8rem]"
          >
            Get in touch →
          </button>
        </div>

        {/* ── Social links ── */}
        <div className="hero-social mt-7 flex items-center justify-center gap-6 lg:mt-8">
          <a
            href="https://github.com/Ash9975"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:h-9 lg:w-9"
          >
            <Github size={16} />
          </a>

          <span className="h-px w-5 bg-white/12" aria-hidden="true" />

          <a
            href="https://www.linkedin.com/in/ashish-pimpalshende/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition-all duration-300 hover:-translate-y-[2px] hover:border-white/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:h-9 lg:w-9"
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

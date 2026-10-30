import React, { useEffect, useRef, useState } from "react";
import { heroData } from "../data/mock";
import { ArrowDown, Github, Linkedin } from "lucide-react";

/* ── Role cycling typewriter ────────────────────────────── */
const ROLES = [
  "FULL STACK DEVELOPER",
  "MERN STACK ENGINEER",
  "REACT SPECIALIST",
  "API ARCHITECT",
];

function useRoleCycle() {
  // Single state object avoids multiple synchronous setState calls inside effects
  const [state, setState] = useState({
    roleIdx: 0,
    displayed: "",
    phase: "typing", // "typing" | "pause" | "erasing"
  });

  const { roleIdx, displayed, phase } = state;

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout;

    if (phase === "typing") {
      if (displayed.length < target.length) {
        timeout = setTimeout(
          () =>
            setState((s) => ({
              ...s,
              displayed: target.slice(0, s.displayed.length + 1),
            })),
          55
        );
      } else {
        timeout = setTimeout(
          () => setState((s) => ({ ...s, phase: "pause" })),
          2000
        );
      }
    } else if (phase === "pause") {
      timeout = setTimeout(
        () => setState((s) => ({ ...s, phase: "erasing" })),
        400
      );
    } else {
      // erasing
      if (displayed.length > 0) {
        timeout = setTimeout(
          () =>
            setState((s) => ({ ...s, displayed: s.displayed.slice(0, -1) })),
          30
        );
      } else {
        // Advance to next role — single setState call
        timeout = setTimeout(
          () =>
            setState((s) => ({
              roleIdx: (s.roleIdx + 1) % ROLES.length,
              displayed: "",
              phase: "typing",
            })),
          0
        );
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, roleIdx]);

  return displayed;
}

/* ── Component ──────────────────────────────────────────── */
const Hero = () => {
  const parallaxRef = useRef(null);
  const role = useRoleCycle();

  /* Parallax on the text content only — skipped when reduced motion is preferred */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.18}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-w-full items-center justify-end overflow-hidden bg-ink-950 px-6 pb-12 pt-20 md:px-8 md:pb-16 md:pt-24"
    >
      {/* Animated grid background */}
      <div className="hero-grid-bg animate-grid-move" aria-hidden="true" />

      {/* Portrait + gradient overlay */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        <img
          src={heroData.image}
          alt="Ashish Pimpalshende"
          className="absolute bottom-0 left-0 top-[6%] h-full w-full object-cover opacity-90 [transform:translateZ(0)] contrast-[1.03] grayscale-[95%] will-change-transform md:left-[5%] md:top-auto md:h-[98vh] md:w-auto"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.97)_0%,rgba(0,0,0,0.3)_20%,rgba(0,0,0,0.8)_30%,rgba(0,0,0,0.72)_65%,rgba(0,0,0,0.7)_75%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      {/* Ambient accent glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 80% 20%, rgba(255,215,0,0.04) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* ── Text content ──────────────────────────────────────── */}
      <div
        ref={parallaxRef}
        className="relative z-[2] m-4 flex max-w-[1200px] flex-col items-center justify-center text-center animate-hero-fade md:m-10 md:items-end md:text-right"
      >
        {/* Name badge */}
        <div className="mb-5 inline-block rounded-[50px] border border-primary bg-primary/10 px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[3px] text-primary opacity-80 sm:text-xs">
          {heroData.name}
        </div>

        {/* Main title */}
        <h1 className="mb-4 font-display leading-none text-[clamp(2.6rem,9vw,6.8rem)]">
          <span className="block animate-title-slide tracking-[0.04em] text-white">
            BUILDING
          </span>
          <span className="block animate-title-slide-delayed tracking-[0.04em] text-white">
            SCALABLE
          </span>
          <span
            className="block animate-[titleSlideIn_0.8s_ease-out_0.4s_backwards] tracking-[0.04em]"
            style={{
              background: "linear-gradient(135deg, #E23636 0%, #ff8c00 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            WEB APPS
          </span>
        </h1>

        {/* Typewriter role */}
        <div className="mb-6 flex items-center justify-center gap-2 md:justify-end">
          <span className="font-sans text-[clamp(0.85rem,2vw,1.1rem)] font-medium tracking-[0.22em] text-white/60 animate-subtitle-fade">
            {role}
          </span>
          <span className="inline-block h-[1.1em] w-[2px] animate-[barGlow_0.8s_ease-in-out_infinite] bg-primary" />
        </div>

        {/* Tagline */}
        <p className="mb-10 max-w-[580px] text-[clamp(0.92rem,1.8vw,1.15rem)] font-normal leading-[1.75] tracking-[0.01em] text-white/[0.72] animate-subtitle-fade md:mb-14">
          {heroData.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex animate-cta-fade flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:gap-6">
          <button
            className="w-full max-w-[280px] cursor-pointer rounded-[50px] border-2 border-primary bg-primary px-9 py-3.5 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-transparent hover:text-primary hover:shadow-[0_6px_24px_rgba(226,54,54,0.35)] sm:w-auto sm:max-w-none"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Projects
          </button>
          <button
            className="w-full max-w-[280px] cursor-pointer rounded-[50px] border-2 border-white/60 bg-transparent px-9 py-3.5 text-[0.95rem] font-semibold uppercase tracking-[0.08em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-ink-950 hover:shadow-[0_10px_30px_rgba(255,255,255,0.18)] sm:w-auto sm:max-w-none"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Contact Me
          </button>
        </div>

        {/* Quick social row (mobile: below buttons; md: inline) */}
        <div className="mt-6 flex items-center justify-center gap-4 animate-cta-fade md:justify-end">
          <span className="text-[0.72rem] uppercase tracking-[2px] text-white/30">
            Find me on
          </span>
          <a
            href="https://github.com/Ash9975"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-white/40 hover:text-white hover:-translate-y-0.5"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashish-pimpalshende/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-primary/60 hover:text-primary hover:-translate-y-0.5"
          >
            <Linkedin size={15} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1.5 border-none bg-transparent animate-scroll-bounce"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll to about"
      >
        <span className="text-[0.62rem] uppercase tracking-[2px] text-white/30 transition-colors duration-300 group-hover:text-white/60">
          scroll
        </span>
        <ArrowDown
          size={20}
          className="text-primary transition-colors duration-300 group-hover:text-gold"
        />
      </button>
    </section>
  );
};

export default Hero;

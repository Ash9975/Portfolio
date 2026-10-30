import React, { useEffect, useRef } from "react";

/*
 * FloatingWords — subtle decorative tech-label layer for the Hero section.
 *
 * Design intent:
 *   • Words are faint, muted, and understated (opacity 0.12–0.20).
 *   • Font weight 300–400, never bold.
 *   • Muted grey (#777–#888) with a few words in dark crimson tint.
 *   • They float slowly with independent CSS keyframe animations.
 *   • On desktop, the mouse repels nearby words (water-like push).
 *   • On mobile or prefers-reduced-motion: static, no RAF, no listeners.
 *   • pointer-events: none — never blocks clicks or scrolling.
 *   • z-index: 2 (above grid bg=0 but well below content z-10).
 */

/*
 * Each entry:
 *   word    – label text
 *   x / y   – % position from section top-left
 *   size    – rem size
 *   delay   – CSS animation delay (s)
 *   dur     – CSS animation duration (s)
 *   dir     – which keyframe direction to use (1–4)
 *   crimson – if true, uses dark crimson tint instead of grey
 *   opacity – base opacity
 *
 * Words are spread around the edges / corners leaving the central content
 * area (roughly 30%–70% x, 25%–75% y) largely clear.
 */
const WORDS = [
  // ── Top-left cluster
  { word: "REACT",      x:  4,  y:  8,  size: 0.60, delay: 0,    dur: 18, dir: 1, crimson: false, opacity: 0.14 },
  { word: "NODE.JS",    x: 10,  y: 18,  size: 0.55, delay: 2.5,  dur: 22, dir: 2, crimson: true,  opacity: 0.12 },
  { word: "GIT",        x:  3,  y: 34,  size: 0.50, delay: 5,    dur: 20, dir: 3, crimson: false, opacity: 0.13 },
  { word: "DOCKER",     x:  8,  y: 50,  size: 0.52, delay: 1.2,  dur: 24, dir: 1, crimson: false, opacity: 0.11 },
  { word: "AWS",        x:  2,  y: 66,  size: 0.48, delay: 3.8,  dur: 19, dir: 4, crimson: false, opacity: 0.10 },
  // ── Top-right cluster
  { word: "TYPESCRIPT", x: 78,  y:  6,  size: 0.58, delay: 1,    dur: 21, dir: 2, crimson: false, opacity: 0.13 },
  { word: "MONGODB",    x: 86,  y: 18,  size: 0.54, delay: 4.2,  dur: 23, dir: 1, crimson: true,  opacity: 0.11 },
  { word: "EXPRESS",    x: 74,  y: 30,  size: 0.50, delay: 0.8,  dur: 20, dir: 4, crimson: false, opacity: 0.12 },
  { word: "REDUX",      x: 88,  y: 44,  size: 0.52, delay: 6,    dur: 25, dir: 3, crimson: false, opacity: 0.10 },
  { word: "REST API",   x: 76,  y: 58,  size: 0.55, delay: 2,    dur: 19, dir: 2, crimson: false, opacity: 0.13 },
  // ── Bottom-left cluster
  { word: "JAVASCRIPT", x:  5,  y: 78,  size: 0.57, delay: 3.5,  dur: 22, dir: 3, crimson: true,  opacity: 0.12 },
  { word: "NEXT.JS",    x: 12,  y: 88,  size: 0.52, delay: 1.5,  dur: 20, dir: 1, crimson: false, opacity: 0.11 },
  // ── Bottom-right cluster
  { word: "AI",         x: 84,  y: 74,  size: 0.56, delay: 0.5,  dur: 17, dir: 2, crimson: true,  opacity: 0.14 },
  { word: "RAG",        x: 76,  y: 85,  size: 0.50, delay: 4,    dur: 23, dir: 4, crimson: false, opacity: 0.10 },
  // ── Mid-edge accents (avoid dead-center)
  { word: "MERN",       x: 18,  y:  4,  size: 0.50, delay: 2.2,  dur: 21, dir: 4, crimson: false, opacity: 0.11 },
  { word: "VITE",       x: 55,  y:  3,  size: 0.48, delay: 6.5,  dur: 24, dir: 1, crimson: false, opacity: 0.09 },
  { word: "REDIS",      x: 88,  y:  8,  size: 0.48, delay: 3.0,  dur: 18, dir: 3, crimson: false, opacity: 0.09 },
  { word: "JWT",        x:  6,  y: 92,  size: 0.48, delay: 7,    dur: 26, dir: 2, crimson: false, opacity: 0.10 },
  { word: "ZOD",        x: 88,  y: 92,  size: 0.46, delay: 5.5,  dur: 22, dir: 4, crimson: false, opacity: 0.09 },
];

/* Reduced-motion version: only show first 8 words, no animation, no interaction */
const WORDS_REDUCED = WORDS.slice(0, 8);

/* Mobile: first 10 words, no interaction, smaller set */
const WORDS_MOBILE = [
  WORDS[0], WORDS[5], WORDS[6], WORDS[10], WORDS[12],
  WORDS[1], WORDS[7], WORDS[13], WORDS[14], WORDS[3],
];

/*
 * Map dir → CSS animation name.
 * Four gentle float paths defined in index.css.
 */
const DIR_MAP = {
  1: "heroWordFloat1",
  2: "heroWordFloat2",
  3: "heroWordFloat3",
  4: "heroWordFloat4",
};

/* ── Repulsion constants ─────────────────────────────── */
const REPEL_RADIUS   = 130;   // px — distance within which repulsion acts
const REPEL_STRENGTH = 55;    // px — max displacement at cursor center
const SPRING         = 0.072; // spring stiffness for return (0–1, lower = slower)
const DAMPING        = 0.78;  // velocity damping (0–1, higher = less bounce)

const FloatingWords = () => {
  const containerRef = useRef(null);
  const wordRefs     = useRef([]);   // DOM refs for each word span
  const stateRef     = useRef([]);   // { ox, oy, vx, vy, cx, cy } per word
  const mouseRef     = useRef({ x: -9999, y: -9999 }); // off-screen default
  const rafRef       = useRef(null);
  const isDesktopRef = useRef(false);

  /* Detect reduced-motion once at mount */
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Choose word set */
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  let words;
  if (prefersReduced)      words = WORDS_REDUCED;
  else if (isMobile)       words = WORDS_MOBILE;
  else                     words = WORDS;

  useEffect(() => {
    /* Abort all physics on reduced-motion or mobile */
    const isDesktop = window.innerWidth >= 768 && !prefersReduced;
    isDesktopRef.current = isDesktop;

    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    /* Initialise per-word state (origin = 0 offset from CSS position) */
    stateRef.current = words.map(() => ({
      ox: 0, oy: 0,   // current visual offset (px)
      vx: 0, vy: 0,   // velocity
    }));

    /* Mouse tracking */
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    container.addEventListener("mousemove",  onMouseMove,  { passive: true });
    container.addEventListener("mouseleave", onMouseLeave, { passive: true });

    /* ── RAF physics loop ───────────────────────────────── */
    const tick = () => {
      const mouse = mouseRef.current;
      const containerRect = container.getBoundingClientRect();
      const W = containerRect.width;
      const H = containerRect.height;

      words.forEach((word, i) => {
        const el = wordRefs.current[i];
        if (!el) return;

        const s = stateRef.current[i];

        /*
         * Natural position of this word in px
         * (centre of the element based on its % placement)
         */
        const naturalX = (word.x / 100) * W + el.offsetWidth  / 2;
        const naturalY = (word.y / 100) * H + el.offsetHeight / 2;

        /* Vector from cursor to word natural position */
        const dx = naturalX - mouse.x;
        const dy = naturalY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetOx = 0;
        let targetOy = 0;

        if (dist > 0 && dist < REPEL_RADIUS) {
          /* Repulsion force — falls off with distance */
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          targetOx = (dx / dist) * force;
          targetOy = (dy / dist) * force;
        }

        /* Spring toward target offset */
        s.vx = (s.vx + (targetOx - s.ox) * SPRING) * DAMPING;
        s.vy = (s.vy + (targetOy - s.oy) * SPRING) * DAMPING;
        s.ox += s.vx;
        s.oy += s.vy;

        /* Apply via transform — does not cause layout (GPU composited) */
        el.style.transform = `translate(${s.ox.toFixed(2)}px, ${s.oy.toFixed(2)}px)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove",  onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {words.map((w, i) => {
        const color = w.crimson ? "rgba(180,40,40," : "rgba(125,125,125,";
        const animStyle =
          !prefersReduced
            ? {
                animationName:     DIR_MAP[w.dir],
                animationDuration: `${w.dur}s`,
                animationDelay:    `${w.delay}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDirection: "alternate",
                animationFillMode: "both",
              }
            : {};

        return (
          <span
            key={w.word}
            ref={(el) => { wordRefs.current[i] = el; }}
            style={{
              position:   "absolute",
              left:       `${w.x}%`,
              top:        `${w.y}%`,
              fontSize:   `${w.size}rem`,
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.18em",
              color:      `${color}${w.opacity})`,
              userSelect: "none",
              whiteSpace: "nowrap",
              willChange: "transform",
              ...animStyle,
            }}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
};

export default FloatingWords;

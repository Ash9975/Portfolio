import { useEffect, useRef } from "react";

/*
 * ParticleConstellation — unified particle system for the Hero section.
 * ─────────────────────────────────────────────────────────────────────
 *
 * Two particle populations share one canvas and one RAF loop:
 *
 *  1. BACKGROUND particles — warm bronze/gold/crimson dots arranged in loose
 *     orbital clusters on the left and right sides of the Hero. They slowly
 *     orbit their cluster anchor and respond to cursor repulsion.
 *
 *  2. TEXT particles — tiny white dots sampled from the rendered headline
 *     "ASHISH PIMPALSHENDE". They float near their home position (gentle
 *     oscillation) and scatter on cursor approach, then spring back.
 *     They are drawn BEHIND the DOM <h1>, so the text always stays readable.
 *
 * Both populations use the same spring-damper physics so the whole field
 * feels like one connected, living system.
 *
 * Constraints:
 *  • canvas z-index: 2 — below DOM content (z-10). Text always readable.
 *  • pointer-events: none — never blocks clicks, links, or scrolling.
 *  • Mouse tracked on the Hero <section> via sectionRef prop.
 *  • Mobile (< 768 px): background clusters only, no text particles, no cursor physics.
 *  • prefers-reduced-motion: one static frame, no RAF.
 */

/* ═══════════════════════════════════════════════════════════════════════════
 * COLOURS
 * ═══════════════════════════════════════════════════════════════════════════ */

/* Background cluster palette — warm, muted, never bright */
const BG_COLORS = [
  [180, 148,  80],   // gold
  [180, 148,  80],   // gold (double weight)
  [160, 110,  55],   // bronze
  [160, 110,  55],   // bronze (double weight)
  [190, 130,  50],   // amber
  [160,  32,  32],   // dark crimson
  [140,  55,  30],   // rust
];

/* Text particle colour — near-white, very low opacity */
const TEXT_R = 220, TEXT_G = 220, TEXT_B = 220;

/* ═══════════════════════════════════════════════════════════════════════════
 * BACKGROUND CLUSTER DEFINITIONS
 * Anchors are fractions of canvas W/H. Clusters on left/right only.
 * ═══════════════════════════════════════════════════════════════════════════ */
const CLUSTER_DEFS = [
  /* left */
  { cx: 0.08, cy: 0.22, radius: 48, count: 9,  label: "REACT",      labelOff: [  8, -52 ] },
  { cx: 0.13, cy: 0.50, radius: 40, count: 8,  label: "NODE.JS",    labelOff: [ 12,  44 ] },
  { cx: 0.07, cy: 0.76, radius: 36, count: 7,  label: "DOCKER",     labelOff: [  4, -40 ] },
  { cx: 0.20, cy: 0.35, radius: 30, count: 6,  label: "REDUX",      labelOff: [ -8,  34 ] },
  { cx: 0.17, cy: 0.65, radius: 32, count: 6,  label: "AWS",        labelOff: [  6, -36 ] },
  /* right */
  { cx: 0.92, cy: 0.20, radius: 46, count: 9,  label: "TYPESCRIPT", labelOff: [-70, -50 ] },
  { cx: 0.87, cy: 0.48, radius: 42, count: 8,  label: "MONGODB",    labelOff: [-68,  46 ] },
  { cx: 0.93, cy: 0.74, radius: 38, count: 7,  label: "REST API",   labelOff: [-64, -42 ] },
  { cx: 0.80, cy: 0.32, radius: 30, count: 6,  label: "AI",         labelOff: [ -8,  34 ] },
  { cx: 0.82, cy: 0.62, radius: 32, count: 6,  label: "RAG",        labelOff: [ -4, -36 ] },
];

const CLUSTER_DEFS_MOBILE = [
  { cx: 0.06, cy: 0.25, radius: 32, count: 5, label: "REACT",      labelOff: [  6, -36 ] },
  { cx: 0.08, cy: 0.70, radius: 28, count: 5, label: "NODE.JS",    labelOff: [  4,  32 ] },
  { cx: 0.94, cy: 0.25, radius: 32, count: 5, label: "TYPESCRIPT", labelOff: [-60, -36 ] },
  { cx: 0.92, cy: 0.70, radius: 28, count: 5, label: "MONGODB",    labelOff: [-56,  32 ] },
];

/* ═══════════════════════════════════════════════════════════════════════════
 * PHYSICS CONSTANTS
 * ═══════════════════════════════════════════════════════════════════════════ */
const REPEL_RADIUS    = 130;   // px — cursor influence radius
const REPEL_STRENGTH  = 65;    // px — max displacement
const SPRING_K        = 0.055; // spring stiffness
const DAMPING         = 0.80;  // velocity damping
const LINE_DIST       = 90;    // px — max line length between bg particles

/* Text particle specific physics */
const TEXT_REPEL_R    = 110;   // px
const TEXT_REPEL_S    = 50;    // px
const TEXT_SPRING_K   = 0.048;
const TEXT_DAMPING    = 0.82;

/* Max text particles to sample — keeps CPU affordable */
const MAX_TEXT_PARTICLES = 380;

/* ═══════════════════════════════════════════════════════════════════════════
 * BUILD BACKGROUND PARTICLES
 * ═══════════════════════════════════════════════════════════════════════════ */
function buildBgParticles(clusterDefs, W, H) {
  const out = [];
  clusterDefs.forEach((cluster, ci) => {
    const anchorX = cluster.cx * W;
    const anchorY = cluster.cy * H;
    for (let i = 0; i < cluster.count; i++) {
      const rings     = Math.ceil(cluster.count / 4);
      const ring      = Math.floor(i / 4);
      const ringR     = cluster.radius * (0.4 + 0.6 * ((ring + 1) / rings));
      const spread    = (Math.PI * 2) / Math.min(cluster.count, 4);
      const angleOff  = ci * 0.8 + ring * 0.5;
      const baseAngle = spread * (i % 4) + angleOff;
      const jitter    = (Math.random() - 0.5) * 0.6;
      const [r, g, b] = BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)];
      out.push({
        kind: "bg",
        ci,
        anchorX, anchorY,
        orbitR:     ringR * (0.85 + Math.random() * 0.30),
        orbitAngle: baseAngle + jitter,
        orbitSpeed: (0.0003 + Math.random() * 0.0004) * (Math.random() < 0.5 ? 1 : -1),
        orbitEcc:   0.9 + Math.random() * 0.2,
        x: anchorX + Math.cos(baseAngle) * ringR,
        y: anchorY + Math.sin(baseAngle) * ringR,
        dx: 0, dy: 0, vx: 0, vy: 0,
        r, g, b,
        radius:  1.0 + Math.random() * 1.2,
        opacity: 0.18 + Math.random() * 0.22,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.008,
      });
    }
  });
  return out;
}

/* ═══════════════════════════════════════════════════════════════════════════
 * SAMPLE TEXT PARTICLES FROM OFFSCREEN CANVAS
 *
 * Renders "ASHISH" and "PIMPALSHENDE" on a hidden canvas using the same
 * font spec as the DOM headline, then reads back lit pixels and returns
 * an array of { homeX, homeY } positions in canvas-logical coordinates.
 *
 * Caller maps these to full-canvas coordinates by passing the bounding
 * rect of the <h1> element relative to the canvas.
 * ═══════════════════════════════════════════════════════════════════════════ */
function sampleTextParticles(W, H, h1Rect) {
  if (!h1Rect || h1Rect.width <= 0 || h1Rect.height <= 0) return [];

  /* ── Build the offscreen canvas at the same logical size as the h1 ── */
  const oc  = document.createElement("canvas");
  const ocW = Math.round(h1Rect.width);
  const ocH = Math.round(h1Rect.height);
  oc.width  = ocW;
  oc.height = ocH;
  const octx = oc.getContext("2d");
  if (!octx) return [];

  /* Compute font size in px — same formula as clamp(3rem,6vw,6.4rem) */
  const viewW    = window.innerWidth;
  const remSize  = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const clampMin = 3   * remSize;                    // 3rem in px
  const clampMax = 6.4 * remSize;                    // 6.4rem in px
  const clampVw  = 0.06 * viewW;                     // 6vw in px
  const fontPx   = Math.max(clampMin, Math.min(clampVw, clampMax));

  /* Replicate: font-black (900), tracking-[-0.06em] via letterSpacing */
  const font          = `900 ${fontPx}px Inter, sans-serif`;
  const letterSpacing = -0.06 * fontPx;

  octx.clearRect(0, 0, ocW, ocH);
  octx.fillStyle = "#ffffff";
  octx.font      = font;
  octx.textAlign = "center";
  octx.textBaseline = "middle";

  /* Draw each line, spacing them to match the DOM's leading-[1.1] */
  const lineH  = fontPx * 1.1;
  const line1Y = ocH / 2 - lineH / 2;
  const line2Y = ocH / 2 + lineH / 2;

  /* Canvas 2D doesn't support letterSpacing natively on all browsers,
     so we draw char-by-char for line 1 and 2. */
  const drawSpaced = (text, cy) => {
    /* Measure total width with spacing */
    let totalW = 0;
    for (const ch of text) totalW += octx.measureText(ch).width + letterSpacing;
    totalW -= letterSpacing; // no trailing gap
    let cx = (ocW - totalW) / 2;
    octx.textAlign = "left";
    for (const ch of text) {
      octx.fillText(ch, cx, cy);
      cx += octx.measureText(ch).width + letterSpacing;
    }
  };

  drawSpaced("ASHISH",        line1Y);
  drawSpaced("PIMPALSHENDE",  line2Y);

  /* ── Sample lit pixels ── */
  let imgData;
  try { imgData = octx.getImageData(0, 0, ocW, ocH); }
  catch { return []; }
  const data = imgData.data;

  const STRIDE = 4; // sample every 4th pixel in x and y
  const candidates = [];

  for (let py = 0; py < ocH; py += STRIDE) {
    for (let px = 0; px < ocW; px += STRIDE) {
      const idx = (py * ocW + px) * 4;
      if (data[idx + 3] > 100) {          // alpha threshold
        /* Map offscreen pixel → full canvas logical coordinates */
        const canvasX = h1Rect.left + px;
        const canvasY = h1Rect.top  + py;
        candidates.push({ homeX: canvasX, homeY: canvasY });
      }
    }
  }

  /* Thin to budget */
  if (candidates.length <= MAX_TEXT_PARTICLES) return candidates;

  /* Uniform random thin-down */
  const step = candidates.length / MAX_TEXT_PARTICLES;
  const result = [];
  for (let i = 0; i < MAX_TEXT_PARTICLES; i++) {
    result.push(candidates[Math.floor(i * step)]);
  }
  return result;
}

/* ── Turn sampled positions into live particle objects ── */
function buildTextParticles(samples) {
  return samples.map(({ homeX, homeY }) => ({
    kind: "text",
    homeX, homeY,
    /* Gentle oscillation offsets */
    oscPhase:  Math.random() * Math.PI * 2,
    oscSpeed:  0.0018 + Math.random() * 0.0012,
    oscAmpX:   (Math.random() - 0.5) * 1.6,
    oscAmpY:   (Math.random() - 0.5) * 1.6,
    /* Cursor displacement */
    dx: 0, dy: 0, vx: 0, vy: 0,
    /* Drawn position */
    x: homeX, y: homeY,
    /* Visual */
    radius:  0.7 + Math.random() * 0.6,
    opacity: 0.18 + Math.random() * 0.18,
    pulsePhase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.006 + Math.random() * 0.007,
    /* Occasional edge-drift state */
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.0006 + Math.random() * 0.0006,
    driftAmp:   Math.random() < 0.08 ? 6 + Math.random() * 8 : 0, // ~8% drift
  }));
}

/* ═══════════════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════ */
const ParticleConstellation = ({ sectionRef }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef?.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile       = window.innerWidth < 768;
    const clusterDefs    = isMobile ? CLUSTER_DEFS_MOBILE : CLUSTER_DEFS;

    /* ── Canvas sizing + DPR ──────────────────────────────── */
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    let bgParticles   = [];
    let textParticles = [];

    /* Find the <h1> inside the section for text sampling */
    const getH1Rect = () => {
      const h1 = section?.querySelector("h1");
      if (!h1) return null;
      const sRect = canvas.getBoundingClientRect();
      const hRect = h1.getBoundingClientRect();
      return {
        left:   hRect.left  - sRect.left,
        top:    hRect.top   - sRect.top,
        width:  hRect.width,
        height: hRect.height,
      };
    };

    const setSize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;

      /* Rebuild background particles */
      bgParticles = buildBgParticles(clusterDefs, W, H);
      bgParticles.forEach((p) => {
        p.anchorX = clusterDefs[p.ci].cx * W;
        p.anchorY = clusterDefs[p.ci].cy * H;
        p.dx = 0; p.dy = 0; p.vx = 0; p.vy = 0;
      });

      /* Rebuild text particles (desktop only) */
      if (!isMobile && !prefersReduced) {
        const h1Rect = getH1Rect();
        const samples = sampleTextParticles(W, H, h1Rect);
        textParticles = buildTextParticles(samples);
      } else {
        textParticles = [];
      }
    };

    /* ── Mouse tracking ───────────────────────────────────── */
    const mouse = { x: -9999, y: -9999 };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const trackTarget = section || canvas.parentElement;
    if (!isMobile && !prefersReduced) {
      trackTarget.addEventListener("mousemove",  onMouseMove,  { passive: true });
      trackTarget.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    /* ── Draw ─────────────────────────────────────────────── */
    const ctx = canvas.getContext("2d");

    const drawFrame = () => {
      if (W === 0 || H === 0) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      /* ── Update + draw text particles ─────────────────── */
      textParticles.forEach((p) => {
        if (!prefersReduced) {
          p.oscPhase  += p.oscSpeed;
          p.driftPhase += p.driftSpeed;
        }

        /* Oscillation around home */
        const oscX = Math.sin(p.oscPhase)                 * p.oscAmpX;
        const oscY = Math.cos(p.oscPhase * 0.7 + 1.2)    * p.oscAmpY;
        /* Edge drift — a small fraction drifts outward then returns */
        const driftX = Math.sin(p.driftPhase) * p.driftAmp;
        const driftY = Math.cos(p.driftPhase * 0.8) * p.driftAmp * 0.6;

        /* Orbit target = home + oscillation + drift */
        const tx = p.homeX + oscX + driftX;
        const ty = p.homeY + oscY + driftY;

        if (!prefersReduced) {
          /* Cursor repulsion spring */
          const cdx  = tx - mouse.x;
          const cdy  = ty - mouse.y;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);
          let tDx = 0, tDy = 0;
          if (dist > 0 && dist < TEXT_REPEL_R) {
            const force = (1 - dist / TEXT_REPEL_R) * TEXT_REPEL_S;
            tDx = (cdx / dist) * force;
            tDy = (cdy / dist) * force;
          }
          p.vx = (p.vx + (tDx - p.dx) * TEXT_SPRING_K) * TEXT_DAMPING;
          p.vy = (p.vy + (tDy - p.dy) * TEXT_SPRING_K) * TEXT_DAMPING;
          p.dx += p.vx;
          p.dy += p.vy;
        }

        p.x = tx + p.dx;
        p.y = ty + p.dy;

        const pulse = !prefersReduced
          ? 0.80 + 0.20 * Math.sin((p.pulsePhase += p.pulseSpeed))
          : 1;
        const alpha = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEXT_R},${TEXT_G},${TEXT_B},${alpha.toFixed(3)})`;
        ctx.fill();
      });

      /* ── Update + draw background particles ───────────── */
      bgParticles.forEach((p) => {
        if (!prefersReduced) p.orbitAngle += p.orbitSpeed;

        const tx = p.anchorX + Math.cos(p.orbitAngle) * p.orbitR * p.orbitEcc;
        const ty = p.anchorY + Math.sin(p.orbitAngle) * p.orbitR;

        if (!prefersReduced && !isMobile) {
          const cdx  = tx - mouse.x;
          const cdy  = ty - mouse.y;
          const dist = Math.sqrt(cdx * cdx + cdy * cdy);
          let tDx = 0, tDy = 0;
          if (dist > 0 && dist < REPEL_RADIUS) {
            const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            tDx = (cdx / dist) * force;
            tDy = (cdy / dist) * force;
          }
          p.vx = (p.vx + (tDx - p.dx) * SPRING_K) * DAMPING;
          p.vy = (p.vy + (tDy - p.dy) * SPRING_K) * DAMPING;
          p.dx += p.vx;
          p.dy += p.vy;
        }

        p.x = tx + p.dx;
        p.y = ty + p.dy;
      });

      /* ── Draw lines between nearby bg particles in same cluster ── */
      for (let ci = 0; ci < clusterDefs.length; ci++) {
        const cluster = bgParticles.filter((p) => p.ci === ci);
        for (let a = 0; a < cluster.length; a++) {
          for (let b = a + 1; b < cluster.length; b++) {
            const pa = cluster[a], pb = cluster[b];
            const ddx = pa.x - pb.x, ddy = pa.y - pb.y;
            const d   = Math.sqrt(ddx * ddx + ddy * ddy);
            if (d < LINE_DIST) {
              ctx.beginPath();
              ctx.moveTo(pa.x, pa.y);
              ctx.lineTo(pb.x, pb.y);
              ctx.strokeStyle = `rgba(160,120,60,${((1 - d / LINE_DIST) * 0.10).toFixed(3)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      /* ── Draw bg particle dots ── */
      bgParticles.forEach((p) => {
        const pulse = !prefersReduced
          ? 0.85 + 0.15 * Math.sin((p.pulsePhase += p.pulseSpeed))
          : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${(p.opacity * pulse).toFixed(3)})`;
        ctx.fill();
      });

      /* ── Draw cluster labels ── */
      clusterDefs.forEach((cd, ci) => {
        const anchorX = cd.cx * W;
        const anchorY = cd.cy * H;
        const lx = anchorX + cd.labelOff[0];
        const ly = anchorY + cd.labelOff[1];

        const clusterPs = bgParticles.filter((p) => p.ci === ci);
        let avgDx = 0, avgDy = 0;
        if (!prefersReduced && !isMobile && clusterPs.length > 0) {
          clusterPs.forEach((p) => { avgDx += p.dx; avgDy += p.dy; });
          avgDx /= clusterPs.length;
          avgDy /= clusterPs.length;
        }

        ctx.font      = "300 9px Inter, sans-serif";
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(140,100,50,0.18)";
        const lxFinal = lx + avgDx * 0.5;
        const lyFinal = ly + avgDy * 0.5;
        let charX = lxFinal;
        for (const ch of cd.label) {
          ctx.fillText(ch, charX, lyFinal);
          charX += ctx.measureText(ch).width + 1.8;
        }
      });

      ctx.restore();
    };

    /* ── RAF loop ────────────────────────────────────────── */
    let rafId;
    const loop = () => {
      drawFrame();
      rafId = requestAnimationFrame(loop);
    };

    /* ── Kick off — delay so h1 has a layout rect ────────── */
    const initTimer = setTimeout(() => {
      setSize();
      if (prefersReduced) {
        drawFrame();
        return;
      }
      rafId = requestAnimationFrame(loop);
    }, 100);

    /* ── Resize ──────────────────────────────────────────── */
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setSize();
        if (prefersReduced) drawFrame();
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    /* ── Cleanup ─────────────────────────────────────────── */
    return () => {
      clearTimeout(initTimer);
      clearTimeout(resizeTimer);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      trackTarget.removeEventListener("mousemove",  onMouseMove);
      trackTarget.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [sectionRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        2,
        display:       "block",
      }}
    />
  );
};

export default ParticleConstellation;

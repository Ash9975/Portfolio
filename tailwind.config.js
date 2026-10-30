/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        /* ── Primary accent ──────────────────────────────────────── */
        primary: {
          DEFAULT: "#E23636",   // Crimson — primary accent
          light:   "#FF4444",   // Lighter crimson (hover states)
          coral:   "#FF684A",   // Coral — gradients / selected highlights only
        },

        /* ── Page surfaces (pure-black design system) ────────────── */
        /*
         * black   → #000000  — primary page background
         * surface-1 → #0A0A0A — slightly elevated sections
         * surface-2 → #141414 — cards, panels
         * surface-3 → #1C1C1C — deep cards, code blocks
         */
        surface: {
          1: "#0A0A0A",
          2: "#141414",
          3: "#1C1C1C",
        },

        /* ── Legacy ink tokens (kept for backward compat) ───────────
         * ink-950 is remapped to pure black so existing bg-ink-950
         * references automatically pick up the new background.
         * ink-900 maps to surface-1 for subtle elevation.
         */
        ink: {
          950: "#000000",   // was #0A0A0A — now pure black
          900: "#0A0A0A",   // was #0f0f0f — now surface-1
        },

        /* ── Typography tokens ───────────────────────────────────── */
        text: {
          primary:   "#FFFFFF",
          secondary: "#A1A1AA",
          muted:     "#666666",
        },
      },

      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        sans:    ["Inter", "sans-serif"],
      },

      maxWidth: {
        container: "1400px",
      },

      animation: {
        "grid-move":              "gridMove 40s linear infinite",
        "hero-fade":              "heroFadeIn 1s ease-out",
        "title-slide":            "titleSlideIn 0.8s ease-out",
        "title-slide-delayed":    "titleSlideIn 0.8s ease-out 0.2s backwards",
        "subtitle-fade":          "subtitleFadeIn 1s ease-out 0.4s backwards",
        "cta-fade":               "ctaFadeIn 1s ease-out 0.6s backwards",
        "scroll-bounce":          "scrollBounce 2s ease-in-out infinite",
        "scroll-line":            "scrollLineDrop 2s ease-in-out infinite",
        "project-fade":           "projectFadeIn 0.6s ease-out backwards",
        "border-pulse":           "borderPulse 1.5s ease-in-out infinite",
        "skill-fade":             "skillFadeIn 0.5s ease-out backwards",
        "icon-pulse":             "iconPulse 1.5s ease-in-out infinite",
        "bar-glow":               "barGlow 2s ease-in-out infinite",
      },

      keyframes: {
        gridMove: {
          "0%":   { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
        heroFadeIn: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        titleSlideIn: {
          from: { opacity: "0", transform: "translateX(-50px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        subtitleFadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        ctaFadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scrollBounce: {
          "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
          "50%":      { transform: "translateX(-50%) translateY(10px)" },
        },
        projectFadeIn: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        borderPulse: {
          "0%, 100%": { width: "80%", height: "80%", opacity: "0.5" },
          "50%":      { width: "90%", height: "90%", opacity: "0.2" },
        },
        skillFadeIn: {
          from: { opacity: "0", transform: "translateY(20px) scale(0.95)" },
          to:   { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        iconPulse: {
          "0%, 100%": { transform: "scale(1)",   opacity: "0.3" },
          "50%":      { transform: "scale(1.1)", opacity: "0.1" },
        },
        barGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        scrollLineDrop: {
          "0%":   { transform: "translateY(-100%)", opacity: "0" },
          "20%":  { opacity: "1" },
          "80%":  { opacity: "1" },
          "100%": { transform: "translateY(100%)",  opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

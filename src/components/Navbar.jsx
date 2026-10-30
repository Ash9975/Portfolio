import React, { useEffect, useRef, useState } from "react";
import { Menu, X, Download } from "lucide-react";

const NAV_LINKS = [
  { id: "about",    label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills",   label: "Skills" },
  { id: "contact",  label: "Contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isOpen,     setIsOpen]       = useState(false);
  const [activeId,   setActiveId]     = useState("");
  const [scrollPct,  setScrollPct]    = useState(0);
  const drawerRef = useRef(null);

  /* ── Scroll-based states ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ─────────────── */
  useEffect(() => {
    const sectionIds = ["hero", ...NAV_LINKS.map((l) => l.id)];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Close drawer on outside click or Escape ────────────── */
  useEffect(() => {
    const onClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  /* ── Lock body scroll when menu open ────────────────────── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      ref={drawerRef}
      className={`fixed left-1/2 z-[999] w-[calc(100%_-_20px)] -translate-x-1/2 transition-all duration-[350ms] ease-in-out lg:w-[min(1400px,calc(100%_-_40px))] ${
        isScrolled ? "top-3" : "top-5"
      }`}
    >
      {/* ── Main pill ──────────────────────────────────────────── */}
      <div className="nav-glass relative flex items-center justify-between overflow-hidden rounded-[18px] px-[18px] py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] sm:px-6">
        {/* Scroll-progress line */}
        <span
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-primary-light transition-[width] duration-150"
          style={{ width: `${scrollPct}%` }}
          aria-hidden="true"
        />

        {/* Logo */}
        <div
          className="cursor-pointer select-none text-[1.15rem] font-bold tracking-[0.5px] text-white transition-all duration-300 hover:opacity-80 sm:text-[1.35rem]"
          onClick={() => scrollTo("hero")}
        >
          Ashish<span className="text-primary-coral">.</span>
        </div>

        {/* Desktop links */}
        <div className="hidden items-center gap-[34px] lg:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative cursor-pointer border-none bg-transparent text-[0.95rem] transition-colors duration-300
                after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:transition-all after:duration-300
                ${activeId === id
                  ? "text-white after:w-full after:bg-primary"
                  : "text-[#a0a0a0] after:w-0 after:bg-white hover:text-white hover:after:w-full"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-[18px]">
          <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-[0.82rem] tracking-[0.5px] text-[#d8d8d8] lg:flex">
            <span className="h-2 w-2 rounded-full bg-[#34ff83] shadow-[0_0_10px_#34ff83]" />
            Available
          </div>

          <a
            href="/Ashish_Pimpalshende.pdf"
            download
            className="hidden items-center gap-2 rounded-full bg-white px-[18px] py-2.5 font-semibold text-black no-underline transition-all duration-[350ms] hover:-translate-y-[3px] hover:shadow-[0_15px_35px_rgba(255,255,255,0.15)] lg:flex"
          >
            <Download size={16} />
            Resume
          </a>

          {/* Hamburger */}
          <button
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-white transition-all duration-200 lg:hidden"
            onClick={() => setIsOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`absolute transition-all duration-200 ${isOpen ? "rotate-90 opacity-100" : "rotate-0 opacity-0"}`}
            >
              <X size={22} />
            </span>
            <span
              className={`absolute transition-all duration-200 ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            >
              <Menu size={22} />
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────── */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
          isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2.5 flex flex-col rounded-[18px] border border-white/[0.08] bg-[rgba(10,10,10,0.96)] px-5 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-[20px]">
          {/* Nav links */}
          <div className="flex flex-col">
            {NAV_LINKS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-3 border-none bg-transparent py-3.5 text-left text-[1rem] font-medium transition-all duration-200 ${
                  activeId === id
                    ? "translate-x-2 text-primary"
                    : "text-white/80 hover:translate-x-2 hover:text-primary-coral"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 ${
                    activeId === id ? "bg-primary scale-125" : "bg-white/20"
                  }`}
                />
                {label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-3 h-px bg-white/[0.06]" />

          {/* Mobile bottom row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[0.82rem] tracking-[0.5px] text-[#d8d8d8]">
              <span className="h-2 w-2 rounded-full bg-[#34ff83] shadow-[0_0_8px_#34ff83]" />
              Available for work
            </div>

            <a
              href="/Ashish_Pimpalshende.pdf"
              download
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[0.85rem] font-semibold text-black no-underline transition-all duration-300 hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] active:scale-95"
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

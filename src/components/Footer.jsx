import React from "react";
import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import { contactData } from "../data/mock";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-black px-6 pb-8 pt-12 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,rgba(226,54,54,0.5),transparent)] before:content-[''] md:px-8 md:pt-16">
      <div className="mx-auto max-w-container">

        {/* ── Three-column grid: brand / quick links / connect ── */}
        <div className="mb-8 grid grid-cols-1 gap-8 text-center md:mb-12 md:grid-cols-2 md:gap-12 md:text-left lg:grid-cols-[2fr_1fr_1fr]">

          {/* Brand column */}
          <div className="flex flex-col items-center gap-4 md:col-span-2 md:items-start lg:col-span-1">
            <h3 className="m-0 bg-[linear-gradient(135deg,#E23636_0%,#FF684A_100%)] bg-clip-text font-display text-[1.8rem] tracking-[2px] text-transparent">
              ASHISH PIMPALSHENDE
            </h3>
            <p className="max-w-[300px] text-[0.95rem] leading-[1.6] text-[#666666] md:max-w-none">
              Full-stack developer focused on building clean, user-friendly web experiences.
            </p>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 className="mb-4 text-base font-semibold uppercase tracking-[1px] text-white">
              Quick Links
            </h4>
            <nav className="flex flex-col items-center gap-3 md:items-start">
              <a href="#about"    className="footer-nav-link">About</a>
              <a href="#projects" className="footer-nav-link">Projects</a>
              <a href="#skills"   className="footer-nav-link">Skills</a>
              <a href="#contact"  className="footer-nav-link">Contact</a>
            </nav>
          </div>

          {/* Connect column */}
          <div>
            <h4 className="mb-4 text-base font-semibold uppercase tracking-[1px] text-white">
              Connect
            </h4>
            <div className="flex justify-center gap-4 md:justify-start">
              <a
                href={contactData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={contactData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={contactData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-icon"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={`mailto:${contactData.email}`}
                className="footer-social-icon"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom copyright bar ── */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="flex flex-col items-center gap-1 text-[0.9rem] text-[#666666] md:flex-row md:justify-center md:gap-2">
            © {currentYear} Ashish Pimpalshende. Built with React &amp; passion for clean UI.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

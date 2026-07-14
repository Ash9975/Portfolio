import React, { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>

      <div className="navbar-container">

        <div
          className="navbar-logo"
          onClick={() => scrollTo("hero")}
        >
          Ashish<span>.</span>
        </div>

        <div className="navbar-center">

          <button onClick={() => scrollTo("about")}>
            About
          </button>

          <button onClick={() => scrollTo("projects")}>
            Projects
          </button>

          <button onClick={() => scrollTo("skills")}>
            Skills
          </button>

          <button onClick={() => scrollTo("contact")}>
            Contact
          </button>

        </div>

        <div className="navbar-right">

          <div className="nav-status">
            <span></span>
            Available
          </div>

          <a
            href="../public/Ashish_Pimpalshende.pdf"
            download
            className="resume-btn"
          >
            <Download size={16} />
            Resume
          </a>

          <button
            className="menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      {isOpen && (

        <div className="mobile-menu">

          <button onClick={() => scrollTo("about")}>
            About
          </button>

          <button onClick={() => scrollTo("projects")}>
            Projects
          </button>

          <button onClick={() => scrollTo("skills")}>
            Skills
          </button>

          <button onClick={() => scrollTo("contact")}>
            Contact
          </button>

        </div>

      )}

    </nav>
  );
};

export default Navbar;
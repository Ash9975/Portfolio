import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavbarTypewriter } from "../hook/useNavbarTypewriter";
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //  ONLY typing logic (from custom hook)
  const typedText = useNavbarTypewriter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection('hero')}>
          <span className="typing-text">{typedText}</span>
        </div>

        <div className="navbar-links desktop-menu">
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
          <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
          <button onClick={() => scrollToSection('projects')} className="mobile-nav-link">Projects</button>
          <button onClick={() => scrollToSection('skills')} className="mobile-nav-link">Skills</button>
          <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

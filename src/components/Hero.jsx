import React, { useEffect, useRef } from 'react';
import { heroData } from '../data/mock';
import { ArrowDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectSection = document.getElementById('projects');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid"></div>
      <div className="hero-bg">
        <img
          src={heroData.image}
          alt="Ashish"
          className="hero-bg-image"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="hero-content" ref={heroRef}>
        {/* <div className="hero-profile-image"><img src={heroData.image} alt="" /></div> */}
        <div className="hero-badge">Ashish Pimpalshende</div>

        <h1 className="hero-title">
          <span className="hero-title-line">FRONTEND DEVELOPER </span>
          <span className="hero-title-line highlight">WITH A FOCUS ON UI</span>
        </h1>

        <p className="hero-subtitle">
          {heroData.tagline}
        </p>

        <div className="hero-cta">
          <button className="hero-button primary" onClick={scrollToProjects}>
            View Projects
          </button>
          <button className="hero-button secondary" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Contact me
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
        <ArrowDown className="scroll-arrow" size={32} />
      </div>

      <div className="hero-overlay"></div>
    </section>
  );
};

export default Hero;
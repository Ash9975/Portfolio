import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, Instagram } from 'lucide-react';
import { contactData } from '../data/mock';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">ASHISH PIMPALSHENDE</h3>
            <p className="footer-tagline">Full-stack developer focused on building clean, user-friendly web experiences.</p>
          </div>

          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <a href="#about" className="footer-link">About</a>
              <a href="#projects" className="footer-link">Projects</a>
              <a href="#skills" className="footer-link">Skills</a>
              <a href="#contact" className="footer-link">Contact</a>
            </nav>
          </div>

          <div className="footer-social">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              <a href={contactData.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
              <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href={contactData.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram size={20} />
              </a>
              <a href={`mailto:${contactData.email}`} className="social-link">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Ashish Pimpalshende. Built with React & passion for clean UI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
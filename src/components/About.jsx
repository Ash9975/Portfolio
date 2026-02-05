import React from "react";
import { aboutData } from "../data/mock";
import "./About.css";

const StatCard = ({ stat }) => (
  <div className="stat-card">
    <div className="stat-value">{stat.value}</div>
    <div className="stat-label">{stat.label}</div>
  </div>
);

const About = () => {
  const statsElements = [];
  for (let i = 0; i < aboutData.stats.length; i++) {
    statsElements.push(
      <StatCard key={i} stat={aboutData.stats[i]} />
    );
  }

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">01.</span>
            ABOUT ME
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-description">{aboutData.description}</p>

            <div className="about-highlight">
              <div className="highlight-bar"></div>
              <p className="highlight-text">
                “I enjoy building clean, practical solutions and continuously improving how I write and structure code.”
              </p>
            </div>
          </div>

          <div className="about-stats">{statsElements}</div>
        </div>
      </div>
    </section>
  );
};

export default About;

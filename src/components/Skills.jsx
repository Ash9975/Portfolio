import React from "react";
import { skillsData } from "../data/mock";
import * as LucideIcons from "lucide-react";
import "./Skills.css";

const SkillCard = ({ skill, index }) => {
  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon size={32} /> : <LucideIcons.Code size={32} />;
  };

  const delayStyle = { animationDelay: `${index * 0.05}s` };
  const widthStyle = { width: `${skill.level}%` };

  return (
    <div className="skill-card" style={delayStyle}>
      <div className="skill-icon">{getIcon(skill.icon)}</div>

      <h3 className="skill-name">{skill.name}</h3>

      <div className="skill-bar-container">
        <div className="skill-bar" style={widthStyle}>
          <div className="skill-bar-glow"></div>
        </div>
      </div>

    </div>
  );
};

const Skills = () => {
  const skillCards = [];
  for (let i = 0; i < skillsData.length; i++) {
    skillCards.push(
      <SkillCard key={i} skill={skillsData[i]} index={i} />
    );
  }

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">03.</span>
            SKILLS &amp; EXPERTISE
          </h2>
          <div className="title-line"></div>
        </div>
        <div className="skills-highlight">
          <div className="highlight-bar"></div>
          <p className="highlight-text">
            “I enjoy building clean, practical solutions and continuously improving how I write and structure code.”
          </p>
        </div>

        <div className="skills-grid">{skillCards}</div>
      </div>
    </section >
  );
};

export default Skills;

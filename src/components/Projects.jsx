import React from "react";
import { projectsData } from "../data/mock";
import { ExternalLink } from "lucide-react";
import "./Projects.css";

const ProjectCard = ({ project, index }) => {
  const delayStyle = { animationDelay: `${index * 0.1}s` };
  const overlayBg = { background: `${project.color}15` };
  const borderStyle = { borderColor: project.color };
  const linkColor = { color: project.color };

  const techBadges = [];
  for (let i = 0; i < project.technologies.length; i++) {
    techBadges.push(
      <span key={i} className="tech-badge">
        {project.technologies[i]}
      </span>
    );
  }

  return (
    <section id="projects">
      <div className="project-card" style={delayStyle}>
        <div className="project-image-wrapper">
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
          />
          <div className="project-overlay" style={overlayBg}>
            <div
              className="project-overlay-border"
              style={borderStyle}
            ></div>
          </div>
        </div>

        <div className="project-content">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          <div className="project-technologies">{techBadges}</div>

          <a
            href={project.link}
            className="project-link"
            style={linkColor}
            target="_blank"
            rel="noreferrer"
          >
            <span>View Project</span>
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projectCards = [];
  for (let i = 0; i < projectsData.length; i++) {
    projectCards.push(
      <ProjectCard
        key={projectsData[i].id}
        project={projectsData[i]}
        index={i}
      />
    );
  }

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="title-number">02.</span>
            PROJECTS
          </h2>
          <div className="title-line"></div>
        </div>

        <div className="projects-grid">{projectCards}</div>
      </div>
    </section>
  );
};

export default Projects;

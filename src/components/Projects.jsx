import React from "react";
import { projectsData } from "../data/mock";
import { ExternalLink, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";

const ProjectCard = ({ project, index }) => {
  const isInProgress = project.status === "In Progress";
  const hasLink = Boolean(project.link);

  return (
    <div
      className="project-card group animate-project-fade cursor-pointer"
      style={{
        "--project-color": project.color,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      {/* ── Thumbnail ─────────────────────────────────────────── */}
      <div className="relative h-[200px] w-full overflow-hidden md:h-[250px]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Colour-tinted overlay on hover */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: `${project.color}18` }}
        >
          {/* Pulsing border frame */}
          <div
            className="absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 border-2 opacity-0 animate-border-pulse group-hover:opacity-50"
            style={{ borderColor: project.color }}
          />
        </div>

        {/* Status badge — only shown for "In Progress" */}
        {isInProgress && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.6px] text-yellow-400 backdrop-blur-sm">
            <Clock size={11} />
            In Progress
          </div>
        )}
      </div>

      {/* ── Card body ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 p-6">
        <h3 className="font-display text-[1.5rem] tracking-[1px] text-white">
          {project.title}
        </h3>

        <p className="text-[0.95rem] leading-[1.6] text-white/70">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="mt-2 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="inline-flex rounded-full border px-3 py-1 text-xs font-medium tracking-[0.5px] transition-all duration-300"
              style={{
                borderColor: `${project.color}40`,
                color: `${project.color}cc`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA link */}
        {hasLink ? (
          <a
            href={project.link}
            className="mt-2 inline-flex items-center gap-2 text-[0.9rem] font-semibold tracking-[0.5px] no-underline transition-all duration-300 hover:gap-3 hover:underline"
            style={{ color: project.color }}
            target="_blank"
            rel="noreferrer"
          >
            <span>View Project</span>
            <ExternalLink size={18} />
          </a>
        ) : (
          <span
            className="mt-2 inline-flex items-center gap-2 text-[0.9rem] font-semibold tracking-[0.5px] opacity-50"
            style={{ color: project.color }}
          >
            <Clock size={16} />
            <span>Coming Soon</span>
          </span>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative bg-gradient-to-b from-ink-950 to-ink-900 px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-container">
        <SectionHeading number="02." title="PROJECTS" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[repeat(auto-fill,minmax(min(350px,100%),1fr))] md:gap-8">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

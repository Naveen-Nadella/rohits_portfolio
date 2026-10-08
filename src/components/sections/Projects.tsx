import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { RedSeal } from '../common/RedSeal';
import { projectsData } from '../../data/projects';
import type { Project } from '../../types/portfolio';
import { ProjectModal } from './ProjectModal';
import { soundEngine } from '../../utils/audio';
import { GithubIcon } from '../common/SocialIcons';
import { ExternalLink, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const openProjectModal = (proj: Project) => {
    soundEngine.playChime(660, 0.8);
    setActiveModalProject(proj);
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F1EE]/80 border-y border-zinc-300/40 backdrop-blur-xs">
      <KanjiWatermark char="03" position="top-right" opacity={0.03} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          sealCode="03"
          chapterNumber="CHAPTER 03"
          title="THE ARTIFACTS"
          subtitle="Web applications, frontend architectures, and interactive digital experiences engineered with clean code and modern tooling."
        />

        {/* Project Cards Grid in Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-zinc-200/90 hover:border-zinc-400 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group relative overflow-hidden shadow-xs"
            >
              {/* Top border thread highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-900/40 to-transparent group-hover:via-zinc-900 transition-all" />

              <div>
                {/* Header: Seal, Category, Featured Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <RedSeal char={project.sealCode} size="sm" />
                    <span className="font-mono text-[11px] text-zinc-700 tracking-widest uppercase bg-zinc-100 px-2.5 py-0.5 rounded-[1px] border border-zinc-200">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="flex items-center gap-1 font-serif text-[10px] text-white uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded-[1px] font-bold shadow-2xs">
                      <Sparkles size={10} className="text-white" />
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-black transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="font-serif text-xs sm:text-sm text-zinc-500 italic mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 font-editorial">
                  {project.description}
                </p>

                {/* Metrics Highlight Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-900 bg-zinc-50 border border-zinc-200 px-2.5 py-1 rounded-[1px] font-semibold"
                    >
                      <TrendingUp size={11} className="text-zinc-900" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-[1px] border border-zinc-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[10px] font-mono text-zinc-900 bg-zinc-200 px-1.5 py-0.5 rounded-[1px] border border-zinc-300 font-semibold">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
                <button
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center gap-2 text-xs font-serif tracking-widest uppercase font-bold text-zinc-900 hover:text-black transition-colors cursor-pointer group/btn"
                >
                  <span>INSPECT ARTIFACT</span>
                  <ArrowRight size={14} className="text-zinc-900 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all shadow-2xs"
                      title="Inspect GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon size={14} />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all shadow-2xs"
                      title="Live Demo"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Modal View */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
};

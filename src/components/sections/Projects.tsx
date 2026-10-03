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
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <KanjiWatermark char="03" position="top-right" opacity={0.02} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          sealCode="03"
          chapterNumber="CHAPTER 03"
          title="THE ARTIFACTS"
          subtitle="Web applications, frontend architectures, and interactive digital experiences engineered with clean code and modern tooling."
        />

        {/* Project Cards Grid in Black & White */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="bg-[#09090B] border border-white/15 hover:border-white/50 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/90 group relative overflow-hidden"
            >
              {/* Top border thread highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:via-white transition-all" />

              <div>
                {/* Header: Seal, Category, Featured Tag */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <RedSeal char={project.sealCode} size="sm" />
                    <span className="font-mono text-[11px] text-[#E4E4E7] tracking-widest uppercase bg-[#121214] px-2.5 py-0.5 rounded-[1px] border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="flex items-center gap-1 font-serif text-[10px] text-black uppercase tracking-widest bg-white px-2 py-0.5 rounded-[1px] font-bold">
                      <Sparkles size={10} className="text-black" />
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-white/90 transition-colors mb-1">
                  {project.title}
                </h3>
                <p className="font-serif text-xs sm:text-sm text-[#A1A1AA] italic mb-4">
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-6 font-editorial">
                  {project.description}
                </p>

                {/* Metrics Highlight Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.metrics.slice(0, 2).map((m, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] font-mono text-white bg-[#121214] border border-white/15 px-2.5 py-1 rounded-[1px]"
                    >
                      <TrendingUp size={11} className="text-white" />
                      <span>{m}</span>
                    </span>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono text-[#A1A1AA] bg-[#121214] px-2 py-0.5 rounded-[1px] border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="text-[10px] font-mono text-white bg-[#121214] px-1.5 py-0.5 rounded-[1px] border border-white/10">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center gap-2 text-xs font-serif tracking-widest uppercase font-bold text-white hover:text-white/80 transition-colors cursor-pointer group/btn"
                >
                  <span>INSPECT ARTIFACT</span>
                  <ArrowRight size={14} className="text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-sm bg-[#121214] border border-white/15 text-[#A1A1AA] hover:text-white hover:border-white transition-all"
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
                      className="p-2 rounded-sm bg-[#121214] border border-white/15 text-[#A1A1AA] hover:text-white hover:border-white transition-all"
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

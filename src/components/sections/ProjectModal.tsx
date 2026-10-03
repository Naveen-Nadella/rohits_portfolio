import React, { useEffect } from 'react';
import type { Project } from '../../types/portfolio';
import { RedSeal } from '../common/RedSeal';
import { soundEngine } from '../../utils/audio';
import { GithubIcon } from '../common/SocialIcons';
import { X, ExternalLink, Shield, Cpu, Activity, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#09090B] border border-white/30 rounded-sm p-6 sm:p-10 shadow-2xl parchment-texture text-white animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Monochrome Border Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playBrushSwipe();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-sm bg-[#121214] border border-white/20 hover:border-white text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
          aria-label="Close project chronicle"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <RedSeal char={project.sealCode} size="md" />
          <span className="font-mono text-xs text-white tracking-widest uppercase bg-[#121214] px-2.5 py-1 border border-white/20">
            {project.category}
          </span>
          <span className="font-mono text-xs text-[#A1A1AA] tracking-wider uppercase">
            ARCHIVE // CASE STUDY
          </span>
        </div>

        <h2 id="modal-title" className="font-serif text-2xl sm:text-4xl font-bold text-white mb-1">
          {project.title}
        </h2>
        <p className="font-serif text-sm sm:text-base text-[#A1A1AA] italic mb-6">
          {project.subtitle}
        </p>

        {/* Verified Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#121214] border border-white/15 rounded-sm mb-8">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="border-l-2 border-white pl-3 py-1">
              <span className="font-mono text-[10px] text-[#A1A1AA] uppercase block">Benchmark</span>
              <span className="font-serif text-sm sm:text-base font-bold text-white">{metric}</span>
            </div>
          ))}
        </div>

        {/* Overview & Problem Solved */}
        <div className="space-y-6 mb-8 text-sm sm:text-base text-white/90 font-editorial leading-relaxed">
          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Activity size={18} className="text-white" />
              EXECUTIVE OVERVIEW
            </h3>
            <p className="text-[#A1A1AA]">{project.longDescription}</p>
          </div>

          <div className="p-4 bg-[#121214] border border-white/20 rounded-sm">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2 mb-1.5">
              <Shield size={16} className="text-white" />
              THE BOTTLENECK & PROBLEM SOLVED
            </h4>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">{project.problemSolved}</p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Layers size={18} className="text-white" />
              SYSTEM ARCHITECTURE & DATA FLOW
            </h3>
            <p className="text-[#A1A1AA] text-xs sm:text-sm">{project.architecture}</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-3">
            CORE IMPLEMENTATIONS & CAPABILITIES
          </h3>
          <ul className="space-y-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA]">
                <CheckCircle size={16} className="text-white shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-[#121214] border border-white/15 rounded-sm">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-white" />
              ENGINEERING HURDLES
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1AA]">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-white font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-[#121214] border border-white/15 rounded-sm">
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-2">
              <Cpu size={14} className="text-white" />
              RESOLUTIONS APPLIED
            </h4>
            <ul className="space-y-2 text-xs text-[#A1A1AA]">
              {project.solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-white font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="mb-8">
          <span className="font-mono text-xs text-white uppercase tracking-widest block mb-2">
            TECHNOLOGY ECOSYSTEM
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono bg-[#121214] border border-white/15 text-white rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#E4E4E7] text-black text-xs font-serif tracking-widest uppercase font-bold rounded-sm transition-colors"
              >
                <GithubIcon size={14} />
                <span>INSPECT REPOSITORY</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#121214] hover:bg-[#18181B] border border-white/30 text-white text-xs font-serif tracking-widest uppercase font-semibold rounded-sm transition-colors"
              >
                <ExternalLink size={14} className="text-white" />
                <span>LIVE DEMONSTRATION</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-[#A1A1AA] hover:text-white uppercase cursor-pointer"
          >
            [CLOSE ESC]
          </button>
        </div>
      </div>
    </div>
  );
};

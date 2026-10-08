import React, { useEffect } from 'react';
import { RedSeal } from '../common/RedSeal';
import { soundEngine } from '../../utils/audio';
import { GithubIcon } from '../common/SocialIcons';
import { X, ExternalLink, Shield, Cpu, Activity, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-300 rounded-sm p-6 sm:p-10 shadow-2xl parchment-texture text-zinc-900 animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Border Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playBrushSwipe();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-sm bg-zinc-100 border border-zinc-200 hover:border-zinc-400 text-zinc-600 hover:text-black transition-colors cursor-pointer"
          aria-label="Close project chronicle"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <RedSeal char={project.sealCode} size="md" />
          <span className="font-mono text-xs text-zinc-800 tracking-widest uppercase bg-zinc-100 px-2.5 py-1 border border-zinc-300 rounded-[1px]">
            {project.category}
          </span>
          <span className="font-mono text-xs text-zinc-500 tracking-wider uppercase">
            ARCHIVE // CASE STUDY
          </span>
        </div>

        <h2 id="modal-title" className="font-serif text-2xl sm:text-4xl font-bold text-zinc-900 mb-1">
          {project.title}
        </h2>
        <p className="font-serif text-sm sm:text-base text-zinc-500 italic mb-6">
          {project.subtitle}
        </p>

        {/* Verified Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-sm mb-8">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="border-l-2 border-zinc-900 pl-3 py-1">
              <span className="font-mono text-[10px] text-zinc-500 uppercase block">Benchmark</span>
              <span className="font-serif text-sm sm:text-base font-bold text-zinc-900">{metric}</span>
            </div>
          ))}
        </div>

        {/* Overview & Problem Solved */}
        <div className="space-y-6 mb-8 text-sm sm:text-base text-zinc-700 font-editorial leading-relaxed">
          <div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 flex items-center gap-2 mb-2">
              <Activity size={18} className="text-zinc-900" />
              EXECUTIVE OVERVIEW
            </h3>
            <p className="text-zinc-600">{project.longDescription}</p>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
            <h4 className="font-serif text-sm font-bold text-zinc-900 flex items-center gap-2 mb-1.5">
              <Shield size={16} className="text-zinc-900" />
              THE BOTTLENECK & PROBLEM SOLVED
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600">{project.problemSolved}</p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-zinc-900 flex items-center gap-2 mb-2">
              <Layers size={18} className="text-zinc-900" />
              SYSTEM ARCHITECTURE & DATA FLOW
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm">{project.architecture}</p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h3 className="font-serif text-base font-bold text-zinc-900 uppercase tracking-wider mb-3">
            CORE IMPLEMENTATIONS & CAPABILITIES
          </h3>
          <ul className="space-y-2.5">
            {project.keyFeatures.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-600">
                <CheckCircle size={16} className="text-zinc-900 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
            <h4 className="font-serif text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-zinc-900" />
              ENGINEERING HURDLES
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-zinc-900 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
            <h4 className="font-serif text-xs font-bold text-zinc-900 uppercase tracking-widest flex items-center gap-2 mb-2">
              <Cpu size={14} className="text-zinc-900" />
              RESOLUTIONS APPLIED
            </h4>
            <ul className="space-y-2 text-xs text-zinc-600">
              {project.solutions.map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-zinc-900 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Badges */}
        <div className="mb-8">
          <span className="font-mono text-xs text-zinc-800 uppercase tracking-widest block mb-2 font-semibold">
            TECHNOLOGY ECOSYSTEM
          </span>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-mono bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-black text-white text-xs font-serif tracking-widest uppercase font-bold rounded-sm transition-colors shadow-xs"
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
                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-900 text-xs font-serif tracking-widest uppercase font-semibold rounded-sm transition-colors shadow-xs"
              >
                <ExternalLink size={14} className="text-zinc-900" />
                <span>LIVE DEMONSTRATION</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono text-zinc-500 hover:text-zinc-900 uppercase cursor-pointer"
          >
            [CLOSE ESC]
          </button>
        </div>
      </div>
    </div>
  );
};

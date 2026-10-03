import React from 'react';
import { RedSeal } from '../common/RedSeal';
import { personalData } from '../../data/personal';
import { soundEngine } from '../../utils/audio';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { ArrowUp, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playBrushSwipe();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#000000] border-t border-white/10 py-16 px-4 sm:px-6 lg:px-8 text-[#A1A1AA] overflow-hidden">
      {/* Background seal watermark */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-0 select-none pointer-events-none font-serif font-black text-[220px] leading-none text-white opacity-[0.01]"
      >
        SR
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <RedSeal char="SR" size="lg" />
            <div>
              <span className="font-serif text-lg font-bold text-white block tracking-wider">
                {personalData.name}
              </span>
              <span className="font-mono text-xs text-[#A1A1AA] tracking-wider block">
                {personalData.title}
              </span>
              <p className="font-editorial italic text-xs text-[#71717A] mt-1 max-w-sm">
                "Discipline in logic; curiosity in creation."
              </p>
            </div>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm bg-[#09090B] border border-white/15 text-[#A1A1AA] hover:text-white hover:border-white transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm bg-[#09090B] border border-white/15 text-[#A1A1AA] hover:text-white hover:border-white transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="p-2.5 rounded-sm bg-[#09090B] border border-white/15 text-[#A1A1AA] hover:text-white hover:border-white transition-all"
              aria-label="Email Dispatch"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Right: Return to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-[#09090B] border border-white/20 hover:border-white text-white text-xs font-serif tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer group"
          >
            <span>RETURN TO PEAK</span>
            <ArrowUp size={14} className="text-white group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717A]">
          <div>
            © {new Date().getFullYear()} {personalData.name}. All Inscriptions Recorded.
          </div>
          <div className="flex items-center gap-2">
            <span>SOFTWARE ENGINEER & WEB DEVELOPER</span>
            <span className="text-white/40">•</span>
            <span className="text-white">KL UNIVERSITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import { RedSeal } from '../common/RedSeal';
import { useTeam } from '../../context/TeamContext';
import { soundEngine } from '../../utils/audio';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { ArrowUp, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { activeMember } = useTeam();

  const scrollToTop = () => {
    soundEngine.playBrushSwipe();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#E1E1DD] border-t border-zinc-300/80 py-16 px-4 sm:px-6 lg:px-8 text-zinc-600 overflow-hidden">
      {/* Background seal watermark */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bottom-0 select-none pointer-events-none font-serif font-black text-[220px] leading-none text-zinc-900 opacity-[0.02]"
      >
        {activeMember.monogram}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-zinc-200">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <RedSeal char={activeMember.monogram} size="lg" />
            <div>
              <span className="font-serif text-lg font-bold text-zinc-900 block tracking-wider uppercase">
                {activeMember.name}
              </span>
              <span className="font-mono text-xs text-zinc-500 tracking-wider block">
                {activeMember.title}
              </span>
              <p className="font-editorial italic text-xs text-zinc-500 mt-1 max-w-sm">
                "{activeMember.tagline}"
              </p>
            </div>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={activeMember.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all shadow-xs"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={activeMember.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-sm bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all shadow-xs"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${activeMember.email}`}
              className="p-2.5 rounded-sm bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-400 transition-all shadow-xs"
              aria-label="Email Dispatch"
            >
              <Mail size={18} />
            </a>
          </div>

          {/* Right: Return to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 hover:border-zinc-400 text-zinc-900 text-xs font-serif tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer group shadow-xs"
          >
            <span>RETURN TO PEAK</span>
            <ArrowUp size={14} className="text-zinc-900 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {activeMember.name}. Project Team Portfolio.
          </div>
          <div className="flex items-center gap-2">
            <span>B.TECH CSE (2ND YEAR)</span>
            <span className="text-zinc-400">•</span>
            <span className="text-zinc-800 font-semibold">{activeMember.university}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

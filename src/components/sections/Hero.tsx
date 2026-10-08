import React from 'react';
import { RedSeal } from '../common/RedSeal';
import { useTeam } from '../../context/TeamContext';
import { TeammateSegmentedBar } from '../team/TeammateSelector';
import { soundEngine } from '../../utils/audio';
import { GithubIcon, LinkedinIcon } from '../common/SocialIcons';
import { Mail, Phone, Award, ArrowUpRight, Code2, Camera, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const { activeMember, openCustomizer } = useTeam();

  const handleScrollTo = (id: string) => {
    soundEngine.playBrushSwipe();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameParts = activeMember.name.split(' ');
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(' ');

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
    >
      {/* Background Decorative Monogram Watermark */}
      <div
        aria-hidden="true"
        className="absolute right-4 md:right-16 top-1/4 select-none pointer-events-none font-serif font-black text-[140px] md:text-[260px] leading-none text-zinc-900 opacity-[0.02]"
      >
        {activeMember.monogram}
      </div>

      {/* Top Segmented Teammate Switcher */}
      <div className="w-full relative z-20 mb-4">
        <TeammateSegmentedBar />
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Typography & Action CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Architectural monogram seal badge + banner */}
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <RedSeal char={activeMember.monogram} size="md" />
            <div className="flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200/90 rounded-sm shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
              <span className="font-mono text-xs text-zinc-800 tracking-wider uppercase font-semibold">
                {activeMember.university} • B.Tech CGPA {activeMember.scores.btech.replace('CGPA', '').trim()}
              </span>
            </div>
            <span className="hidden sm:inline-block font-mono text-xs text-zinc-500 tracking-widest uppercase">
              ARCHIVE // 2026
            </span>
          </div>

          {/* Subheading Greeting */}
          <p className="font-serif text-xs sm:text-sm tracking-[0.25em] text-zinc-500 uppercase mb-2">
            HELLO, I AM
          </p>

          {/* Candidate Name in Hero Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-4">
            <span className="block">{firstName}</span>
            <span className="silver-gradient-text block font-extrabold">
              {restName || firstName}
            </span>
          </h1>

          {/* Professional Focus Title */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm sm:text-base font-serif tracking-wide text-zinc-600 mb-6">
            <span className="text-zinc-900 font-semibold">{activeMember.title.split('&')[0].trim()}</span>
            <span className="text-zinc-400 font-bold">❖</span>
            <span className="text-zinc-900 font-semibold">
              {activeMember.title.includes('&') ? activeMember.title.split('&')[1].trim() : 'Web Developer'}
            </span>
            <span className="text-zinc-400 font-bold">❖</span>
            <span className="text-zinc-500">{activeMember.subtitle}</span>
          </div>

          {/* Academic High Points Badge Strip */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <div className="px-2.5 py-1 rounded-[1px] bg-white border border-zinc-200 text-xs font-mono shadow-2xs">
              <span className="text-zinc-400 uppercase text-[10px] block">10th Grade</span>
              <span className="font-bold text-zinc-900">{activeMember.scores.tenth}</span>
            </div>
            <div className="px-2.5 py-1 rounded-[1px] bg-white border border-zinc-200 text-xs font-mono shadow-2xs">
              <span className="text-zinc-400 uppercase text-[10px] block">Intermediate</span>
              <span className="font-bold text-zinc-900">{activeMember.scores.intermediate}</span>
            </div>
            <div className="px-2.5 py-1 rounded-[1px] bg-white border border-zinc-200 text-xs font-mono shadow-2xs">
              <span className="text-zinc-400 uppercase text-[10px] block">B.Tech CGPA</span>
              <span className="font-bold text-zinc-900">{activeMember.scores.btech}</span>
            </div>
          </div>

          {/* Quote / Tagline */}
          <blockquote className="border-l-2 border-zinc-900 pl-4 py-1 mb-8 text-zinc-600 text-base sm:text-lg font-editorial italic leading-relaxed max-w-xl">
            "{activeMember.tagline}"
          </blockquote>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <button
              onClick={() => handleScrollTo('projects')}
              className="px-6 py-3 rounded-sm bg-zinc-900 hover:bg-black text-white font-serif text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
            >
              <span>INSPECT ARTIFACTS</span>
              <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-white" />
            </button>

            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 rounded-sm bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 font-serif text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:bg-zinc-50 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>INITIATE CONTACT</span>
            </button>

            <button
              onClick={() => handleScrollTo('about')}
              className="px-5 py-3 rounded-sm border border-zinc-200 hover:border-zinc-400 text-zinc-600 hover:text-zinc-900 font-serif text-xs tracking-widest uppercase transition-all duration-300 bg-white flex items-center gap-2 group cursor-pointer shadow-xs"
            >
              <span>VIEW CHRONICLE</span>
            </button>
          </div>

          {/* Social Links & Direct Contact Channels */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-600">
            <a
              href={activeMember.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors py-1.5 px-3 rounded-sm bg-white border border-zinc-200 hover:border-zinc-400 shadow-2xs"
            >
              <GithubIcon size={14} className="text-zinc-800" />
              <span>GitHub</span>
            </a>
            <a
              href={activeMember.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors py-1.5 px-3 rounded-sm bg-white border border-zinc-200 hover:border-zinc-400 shadow-2xs"
            >
              <LinkedinIcon size={14} className="text-zinc-800" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${activeMember.email}`}
              className="flex items-center gap-1.5 hover:text-zinc-900 transition-colors py-1.5 px-3 rounded-sm bg-white border border-zinc-200 hover:border-zinc-400 shadow-2xs"
            >
              <Mail size={14} className="text-zinc-800" />
              <span className="hidden sm:inline">{activeMember.email}</span>
              <span className="sm:hidden">Email</span>
            </a>
            <a
              href={`tel:${activeMember.phone}`}
              className="hidden md:flex items-center gap-1.5 hover:text-zinc-900 transition-colors py-1.5 px-3 rounded-sm bg-white border border-zinc-200 hover:border-zinc-400 shadow-2xs"
            >
              <Phone size={14} className="text-zinc-800" />
              <span>{activeMember.phone}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Portrait Composition (ONLY OCCURRENCE OF PHOTO) */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          <div className="relative w-80 sm:w-[420px] h-[480px] sm:h-[540px] flex items-center justify-center group">
            {/* Background Circular Ensō & Geometric Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-dashed border-zinc-300 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-zinc-200 pointer-events-none" />

            {/* Subtle Silver/Ink Glow behind portrait */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-zinc-900/[0.04] blur-3xl pointer-events-none" />

            {/* Ensō Calligraphic Brush Circle */}
            <svg
              viewBox="0 0 300 300"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 text-zinc-400/50 fill-none stroke-current pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 16px rgba(0,0,0,0.03))' }}
            >
              <circle
                cx="150"
                cy="150"
                r="120"
                strokeWidth="7"
                strokeDasharray="620 90"
                strokeLinecap="round"
                transform="rotate(-40 150 150)"
              />
              <circle
                cx="150"
                cy="150"
                r="105"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                opacity="0.5"
              />
            </svg>

            {/* Portrait Plate Frame (The Single Photo Display) */}
            <div className="relative z-10 w-72 sm:w-80 h-[390px] sm:h-[440px] rounded-sm overflow-hidden border border-zinc-300 bg-white shadow-2xl flex flex-col justify-end group/img">
              {/* Archival corner brackets */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-800 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-zinc-800 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-zinc-800 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-800 z-20 pointer-events-none" />

              {activeMember.photo ? (
                <>
                  <img
                    src={activeMember.photo}
                    alt={activeMember.name}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-all duration-700 ease-out"
                    loading="eager"
                  />
                  {/* Subtle bottom gradient fade for light theme */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
                </>
              ) : (
                /* Monogram Portrait Crest Plate when photo is awaiting upload */
                <div className="w-full h-full bg-gradient-to-b from-zinc-50 via-zinc-100 to-white flex flex-col items-center justify-center p-6 text-center relative">
                  <div className="w-24 h-24 rounded-sm bg-zinc-900 border-2 border-zinc-900 shadow-xl flex items-center justify-center font-serif font-black text-4xl text-white mb-4">
                    {activeMember.monogram}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 uppercase">
                    {activeMember.name}
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                    KL UNIVERSITY • B.TECH CSE
                  </p>
                  <div className="mt-4 px-3 py-1 bg-white border border-zinc-200 rounded-sm text-xs font-mono text-zinc-700 shadow-2xs">
                    CGPA: {activeMember.scores.btech}
                  </div>
                  <button
                    onClick={() => openCustomizer(activeMember.id)}
                    className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-black text-white text-[11px] font-mono rounded-sm transition-colors cursor-pointer shadow-xs"
                  >
                    <Camera size={12} />
                    <span>Upload Photograph</span>
                  </button>
                </div>
              )}
            </div>

            {/* Floating Badge 1: Academic Standing (Top-Right) */}
            <div className="absolute top-8 -right-2 sm:-right-4 z-20 p-2.5 sm:p-3 bg-white/95 border border-zinc-200 rounded-sm shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-right-4 duration-500 max-w-[200px]">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase font-semibold">
                <Award size={12} className="text-zinc-900" />
                <span>ACADEMIC PURSUIT</span>
              </div>
              <div className="font-serif text-xs sm:text-sm font-bold text-zinc-900 mt-0.5">
                {activeMember.scores.btech} • 2nd Year
              </div>
              <div className="text-[9px] font-mono text-zinc-500 mt-0.5">
                10th: {activeMember.scores.tenth.split('/')[0].trim()} • Inter: {activeMember.scores.intermediate.split('/')[0].trim()}
              </div>
            </div>

            {/* Floating Badge 2: Software Engineering (Bottom-Left) */}
            <div className="absolute bottom-16 -left-2 sm:-left-6 z-20 p-2.5 sm:p-3 bg-white/95 border border-zinc-200 rounded-sm shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-left-4 duration-500 max-w-[220px]">
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 uppercase font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 animate-pulse" />
                <Code2 size={12} className="text-zinc-900" />
                <span>SPECIALIZATION</span>
              </div>
              <div className="font-serif text-xs sm:text-sm font-bold text-zinc-900 mt-0.5">
                Full-Stack & Web Dev
              </div>
              <div className="text-[9px] font-mono text-zinc-500 mt-0.5">
                REACT • TYPESCRIPT • JAVA
              </div>
            </div>

            {/* Bottom Inscription Seal Pill */}
            <div className="absolute -bottom-3 inset-x-auto z-20 px-4 py-1.5 bg-white border border-zinc-300 rounded-sm shadow-lg flex items-center gap-2.5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-zinc-900" />
              <span className="text-[10px] font-mono tracking-widest text-zinc-900 uppercase font-bold">
                {activeMember.name} • PORTFOLIO
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

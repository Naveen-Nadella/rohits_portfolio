import React, { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { useAuth } from '../../context/AuthContext';
import { portfolioTemplates } from '../../data/templates';
import { PortfolioSearchBar } from '../portfolio/PortfolioSearchBar';
import { RedSeal } from '../common/RedSeal';
import { soundEngine } from '../../utils/audio';
import {
  Sparkles,
  ArrowRight,
  Palette,
  Key,
  CheckCircle2,
  Code2,
  LogOut,
  ChevronRight,
  GraduationCap,
  FileText
} from 'lucide-react';

export const OnboardingPage = ({
  onStartCreation,
  onSelectTemplateFromLanding,
  onOpenPortfolio
}) => {
  const { allMembers, openResumeModal } = useTeam();
  const { currentUser, isLoggedIn, openAuthModal, logout } = useAuth();

  const handleStart = () => {
    soundEngine.playChime(660, 0.8);
    onStartCreation();
  };

  const handleTemplatePick = (templateId) => {
    soundEngine.playBrushSwipe();
    onSelectTemplateFromLanding(templateId);
  };

  const handleScrollTo = (id) => {
    soundEngine.playBrushSwipe();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#EAEAE7] text-[#0F172A] selection:bg-zinc-900 selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* TOP LANDING NAVIGATION */}
      {/* ------------------------------------------------------------- */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#EDEDE9]/92 backdrop-blur-md border-b border-zinc-300/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <RedSeal char="PF" size="sm" />
            <div>
              <span className="font-serif text-sm tracking-widest font-bold text-zinc-900 uppercase block">
                PORTFOLIO FORGE
              </span>
              <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase block">
                DEVELOPER DOSSIER ARCHITECT
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 font-serif text-xs tracking-wider uppercase">
            <button
              onClick={() => handleScrollTo('templates')}
              className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-full transition-colors cursor-pointer"
            >
              Templates
            </button>
            <button
              onClick={() => handleScrollTo('how-it-works')}
              className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-full transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleScrollTo('directory')}
              className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-full transition-colors cursor-pointer"
            >
              Directory
            </button>
          </nav>

          {/* Auth & Quick Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="px-2.5 py-1 bg-white border border-zinc-300 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-zinc-900 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                    {currentUser.name.slice(0, 2).toUpperCase()}
                  </span>
                  <span className="font-serif text-xs font-bold text-zinc-900 hidden sm:inline max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-serif font-bold uppercase tracking-wider text-zinc-700 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-sm transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="px-3 py-1.5 text-xs font-serif font-bold uppercase tracking-wider bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 rounded-sm transition-all shadow-2xs cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              onClick={handleStart}
              className="px-3.5 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-serif font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Sparkles size={12} className="text-white" />
              <span>+ CREATE PORTFOLIO</span>
            </button>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Watermark background */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-20 select-none pointer-events-none font-serif font-black text-[120px] sm:text-[220px] leading-none text-zinc-900 opacity-[0.02]"
        >
          ARCHITECT
        </div>

        {/* Platform Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white border border-zinc-300 rounded-full shadow-2xs mb-6 relative z-10">
          <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
          <span className="font-mono text-xs text-zinc-800 tracking-wider uppercase font-semibold">
            DEVELOPER PORTFOLIO GENERATOR & ID DIRECTORY
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.08] max-w-5xl mb-6 relative z-10">
          Build Your Developer Portfolio.
          <span className="silver-gradient-text block font-extrabold mt-1">
            Receive An ID. Share Anywhere.
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="font-editorial text-lg sm:text-xl text-zinc-600 max-w-3xl leading-relaxed mb-10 relative z-10">
          No manual code editing required. Choose a bespoke architectural template, input your technical projects, academic credentials, and skills to generate an interactive showcase. Receive your unique Portfolio ID so anyone can find your portfolio in seconds.
        </p>

        {/* Primary Call-to-Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 relative z-10">
          <button
            onClick={handleStart}
            className="px-7 py-3.5 bg-zinc-900 hover:bg-black text-white font-serif text-xs sm:text-sm font-bold tracking-widest uppercase rounded-sm transition-all shadow-md hover:shadow-xl flex items-center gap-2.5 cursor-pointer group"
          >
            <Sparkles size={15} className="text-white group-hover:scale-110 transition-transform" />
            <span>GET STARTED & CREATE PORTFOLIO</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => handleScrollTo('templates')}
            className="px-6 py-3.5 bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 font-serif text-xs sm:text-sm font-bold tracking-widest uppercase rounded-sm transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center gap-2"
          >
            <Palette size={14} />
            <span>EXPLORE TEMPLATES</span>
          </button>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DIRECT PORTFOLIO SEARCH BAR WIDGET */}
        {/* ------------------------------------------------------------- */}
        <div className="w-full max-w-3xl mx-auto relative z-10 mb-12">
          <div className="bg-white border border-zinc-300/90 rounded-sm p-6 sm:p-8 shadow-xl text-left relative overflow-hidden">
            {/* Top gold/ink filament */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-zinc-900 via-amber-600 to-zinc-900" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 font-bold block">
                  DIRECTORY ACCESS // DIRECT LOOKUP
                </span>
                <h3 className="font-serif text-lg font-bold text-zinc-900">
                  Already Have A Candidate's Portfolio ID?
                </h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                Instant Lookup & Render
              </span>
            </div>

            <p className="text-xs text-zinc-600 font-editorial mb-4">
              Enter any candidate's Portfolio ID below to instantly load and examine their complete portfolio showcase:
            </p>

            {/* Embedded Search Component */}
            <PortfolioSearchBar variant="hero" className="w-full" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* HOW IT WORKS SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F1EE]/80 border-y border-zinc-300/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-2">
              SEAMLESS 3-STEP PIPELINE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 uppercase">
              How The Platform Works
            </h2>
            <p className="font-editorial text-base text-zinc-600 mt-2">
              From authentication to public showcase in less than two minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white border border-zinc-200/90 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-zinc-900/40 group-hover:bg-zinc-900 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-sm bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    01
                  </span>
                  <Palette size={18} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Pick A Bespoke Template
                </h3>
                <p className="font-editorial text-sm text-zinc-600 leading-relaxed">
                  Sign up or log in, then select your preferred architectural aesthetic—Imperial Editorial, Cyberpunk Matrix, Modernist SaaS, or Obsidian Luxe.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] font-mono text-zinc-500 uppercase">
                4 DISTINCT ARCHITECTURES
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-zinc-200/90 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-zinc-900/40 group-hover:bg-zinc-900 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-sm bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    02
                  </span>
                  <Code2 size={18} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Fill In Your Credentials
                </h3>
                <p className="font-editorial text-sm text-zinc-600 leading-relaxed">
                  Provide your academic scores (B.Tech CGPA, 10th, 12th), personal bio, technical skills, projects, and optional profile photograph with instant preview.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] font-mono text-zinc-500 uppercase">
                ONE-CLICK SAMPLE PREFILL AVAILABLE
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-zinc-200/90 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 inset-x-0 h-0.5 bg-zinc-900/40 group-hover:bg-zinc-900 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-sm bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                    03
                  </span>
                  <Key size={18} className="text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </div>
                <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                  Receive Your Portfolio ID
                </h3>
                <p className="font-editorial text-sm text-zinc-600 leading-relaxed">
                  Receive your unique identifier (e.g. <code>KAVYA-2026</code>) and shareable link. Anyone who types your ID in the search bar immediately views your portfolio.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 text-[11px] font-mono text-zinc-500 uppercase">
                INSTANT SEARCHABLE ACCESS
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* TEMPLATES SHOWCASE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-2">
            BESPOKE STYLING TOKEN COLLECTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 uppercase">
            Curated Portfolio Templates
          </h2>
          <p className="font-editorial text-base text-zinc-600 mt-2">
            Each template features handcrafted typography tokens, micro-interactions, and distinct color harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {portfolioTemplates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white border border-zinc-300 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-900 to-transparent group-hover:h-1.5 transition-all" />

              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-[1px] ${tmpl.badgeColor}`}>
                    {tmpl.badge}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    ARCHITECTURAL THEME
                  </span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-1">
                  {tmpl.name}
                </h3>
                <p className="font-mono text-xs text-zinc-500 mb-4">
                  {tmpl.subtitle}
                </p>

                {/* Preview Box */}
                <div className={`p-4 rounded-sm border ${tmpl.previewBorder} ${tmpl.previewBg} mb-5 shadow-2xs`}>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className={`font-serif font-bold ${tmpl.previewText}`}>Candidate Name</span>
                    <span className="opacity-70">B.Tech CSE • CGPA 8.0</span>
                  </div>
                  <div className={`p-3 rounded-sm border ${tmpl.previewBorder} ${tmpl.previewCardBg} text-xs font-editorial mb-2 shadow-2xs`}>
                    "{tmpl.description}"
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {tmpl.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-[1px] bg-black/5 dark:bg-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {tmpl.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                      <CheckCircle2 size={13} className="text-zinc-900 shrink-0 mt-0.5" />
                      <span className="font-editorial leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono text-zinc-500">
                  Best for: {tmpl.recommendedFor.split(',')[0]}
                </span>
                <button
                  onClick={() => handleTemplatePick(tmpl.id)}
                  className="px-4 py-2 bg-zinc-900 hover:bg-black text-white font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-all cursor-pointer shadow-xs hover:shadow-md flex items-center gap-1.5"
                >
                  <span>USE TEMPLATE</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* REGISTERED PORTFOLIO DIRECTORY */}
      {/* ------------------------------------------------------------- */}
      <section id="directory" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F1F1EE]/80 border-t border-zinc-300/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                REGISTERED CANDIDATE DOSSIERS
              </span>
              <h2 className="font-serif text-3xl font-bold text-zinc-900 uppercase">
                Active Portfolios On Platform ({allMembers.length})
              </h2>
            </div>

            <button
              onClick={handleStart}
              className="inline-flex items-center gap-1.5 text-xs font-serif font-bold uppercase tracking-wider text-zinc-900 hover:underline cursor-pointer"
            >
              <Sparkles size={13} />
              <span>+ Add Your Portfolio To Directory</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-zinc-300/80 rounded-sm p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-sm bg-zinc-900 text-white font-mono text-xs font-bold flex items-center justify-center">
                        {member.monogram}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-zinc-900 group-hover:text-black transition-colors">
                          {member.name}
                        </h4>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {member.university}
                        </span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-[1px] bg-zinc-100 border border-zinc-200 text-[10px] font-mono font-bold text-zinc-800">
                      ID: {member.id}
                    </span>
                  </div>

                  <p className="text-xs font-serif text-zinc-600 mb-3 line-clamp-1">
                    {member.title}
                  </p>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-700 bg-zinc-50 p-2 rounded-sm border border-zinc-200 mb-4">
                    <GraduationCap size={13} className="text-zinc-500" />
                    <span>B.Tech: {member.scores?.btech}</span>
                    <span className="text-zinc-300">|</span>
                    <span>10th: {member.scores?.tenth?.split('/')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenPortfolio(member.id)}
                    className="flex-1 py-2 bg-zinc-100 hover:bg-zinc-900 text-zinc-800 hover:text-white font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer border border-zinc-200"
                  >
                    <span>VIEW</span>
                    <ChevronRight size={13} />
                  </button>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      openResumeModal(member);
                    }}
                    className="px-3 py-2 bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 hover:border-zinc-500 font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer flex items-center gap-1"
                    title={`Download ${member.name}'s resume as PDF`}
                  >
                    <FileText size={12} className="text-zinc-600" />
                    <span>CV</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER */}
      {/* ------------------------------------------------------------- */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-300 bg-[#E5E5E2] text-center text-xs font-mono text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <RedSeal char="PF" size="xs" />
            <span className="font-serif font-bold text-zinc-900 uppercase">
              PORTFOLIO FORGE // PLATFORM V2.0
            </span>
          </div>
          <div>
            Searchable ID Architecture • Multi-Theme Templates • KL University
          </div>
        </div>
      </footer>
    </div>
  );
};

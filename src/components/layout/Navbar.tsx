import React, { useState, useEffect } from 'react';
import { RedSeal } from '../common/RedSeal';
import { soundEngine } from '../../utils/audio';
import { Volume2, VolumeX, Menu, X, Mail } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  code: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'HOME', code: '01' },
  { id: 'about', label: 'ABOUT', code: '02' },
  { id: 'skills', label: 'SKILLS', code: '03' },
  { id: 'projects', label: 'PROJECTS', code: '04' },
  { id: 'journey', label: 'JOURNEY', code: '05' },
  { id: 'certifications', label: 'CERTIFICATIONS', code: '06' },
  { id: 'contact', label: 'CONTACT', code: '07' }
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionElements = navItems.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id)
      }));

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    soundEngine.playBrushSwipe();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newState = soundEngine.toggleSound();
    setSoundActive(newState);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2.5 bg-[#000000]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/80'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Monogram Seal */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-white"
            aria-label="Scroll to top"
          >
            <RedSeal char="SR" size="sm" rotate={false} />
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-widest font-bold text-white group-hover:text-white/80 transition-colors">
                SANNIWADA ROHIT
              </span>
              <span className="font-mono text-[9px] tracking-wider text-[#A1A1AA]">
                SOFTWARE ENGINEER • WEB DEVELOPER
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0A0A0C]/80 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1 text-xs font-serif tracking-widest uppercase transition-all duration-300 rounded-full flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold bg-[#18181B] border border-white/30 shadow-sm'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{item.code}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-white inline-block ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                soundActive
                  ? 'border-white text-white bg-[#18181B]'
                  : 'border-white/15 text-[#A1A1AA] hover:text-white hover:border-white/40'
              }`}
              title={soundActive ? 'Ambient Chime Active (Click to Mute)' : 'Enable Ambient Chime'}
              aria-label="Toggle ambient chime"
            >
              {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-white hover:bg-[#E4E4E7] text-black text-xs font-serif tracking-widest font-bold transition-all duration-300 shadow-md shadow-black/80 hover:shadow-white/20 cursor-pointer"
            >
              <Mail size={13} className="text-black" />
              <span>CONTACT</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-white/20 text-white hover:bg-white/10 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#000000]/95 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 border-b border-white/20 animate-in fade-in duration-300">
          <div className="space-y-3">
            <div className="pb-3 border-b border-white/10 text-xs font-serif tracking-widest text-[#A1A1AA]">
              DIRECTORY • NAVIGATION
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-md text-left transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#18181B] border-l-4 border-white text-white font-bold'
                    : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#A1A1AA]">{item.code}</span>
                  <span className="font-serif tracking-wider text-sm">{item.label}</span>
                </div>
                {activeSection === item.id && (
                  <span className="text-[10px] font-mono text-white">ACTIVE</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-serif text-sm tracking-wider font-bold rounded-sm"
            >
              <Mail size={16} />
              <span>DISPATCH MESSAGE</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { RedSeal } from '../common/RedSeal';
import { soundEngine } from '../../utils/audio';
import { useTeam } from '../../context/TeamContext';
import { TeammateNavbarDropdown } from '../team/TeammateSelector';
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
  const { activeMember } = useTeam();
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
            ? 'py-2.5 bg-white/90 backdrop-blur-md border-b border-zinc-200/90 shadow-sm'
            : 'py-4 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Active Member Seal */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="Scroll to top"
          >
            <RedSeal char={activeMember.monogram} size="sm" rotate={false} />
            <div className="flex flex-col">
              <span className="font-serif text-sm tracking-widest font-bold text-zinc-900 group-hover:text-zinc-600 transition-colors uppercase">
                {activeMember.name}
              </span>
              <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                KL UNIVERSITY • B.TECH CSE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/90 border border-zinc-200/90 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-1 text-xs font-serif tracking-widest uppercase transition-all duration-300 rounded-full flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-zinc-900 font-semibold bg-white border border-zinc-300/80 shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/50'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">{item.code}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-zinc-900 inline-block ml-0.5" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Teammate Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Teammate Switcher Dropdown */}
            <TeammateNavbarDropdown />

            {/* Ambient Chime Audio Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                soundActive
                  ? 'border-zinc-900 text-zinc-900 bg-zinc-100'
                  : 'border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:border-zinc-400 bg-white'
              }`}
              title={soundActive ? 'Ambient Chime Active (Click to Mute)' : 'Enable Ambient Chime'}
              aria-label="Toggle ambient chime"
            >
              {soundActive ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleNavClick('contact')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-zinc-900 hover:bg-black text-white text-xs font-serif tracking-widest font-bold transition-all duration-300 shadow-xs cursor-pointer"
            >
              <Mail size={12} className="text-white" />
              <span>CONTACT</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md border border-zinc-200 text-zinc-800 hover:bg-zinc-100 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-8 border-b border-zinc-200 animate-in fade-in duration-300">
          <div className="space-y-3">
            <div className="pb-3 border-b border-zinc-200 text-xs font-serif tracking-widest text-zinc-500">
              DIRECTORY • NAVIGATION
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-md text-left transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-zinc-100 border-l-4 border-zinc-900 text-zinc-900 font-bold'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-400">{item.code}</span>
                  <span className="font-serif tracking-wider text-sm">{item.label}</span>
                </div>
                {activeSection === item.id && (
                  <span className="text-[10px] font-mono text-zinc-900 font-semibold">ACTIVE</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-zinc-200 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 text-white font-serif text-sm tracking-wider font-bold rounded-sm cursor-pointer shadow-sm"
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

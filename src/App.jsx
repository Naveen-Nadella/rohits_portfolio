import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TeamProvider, useTeam } from './context/TeamContext';
import { OnboardingPage } from './components/onboarding/OnboardingPage';
import { AuthModal } from './components/auth/AuthModal';
import { TemplateSelectionModal } from './components/templates/TemplateSelectionModal';
import { Navbar } from './components/layout/Navbar';
import { InkCanvasBackground } from './components/background/InkCanvasBackground';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { ScrollDivider } from './components/common/ScrollDivider';
import { TeammateCustomizerModal } from './components/team/TeammateCustomizerModal';
import { PortfolioGeneratorModal } from './components/portfolio/PortfolioGeneratorModal';
import { PortfolioSuccessModal } from './components/portfolio/PortfolioSuccessModal';
import { ResumeDownloadModal } from './components/resume/ResumeDownloadModal';
import { ToastNotification } from './components/common/ToastNotification';

const AppContent = () => {
  const {
    activeMember,
    activeMemberId,
    setActiveMemberId,
    clearActivePortfolioUrl,
    openGenerator,
    isResumeModalOpen,
    closeResumeModal,
    resumeCandidate
  } = useTeam();

  const { isLoggedIn, openAuthModal } = useAuth();

  // Route view state: 'landing' (onboarding hub) vs 'portfolio' (candidate portfolio)
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      // If an explicit ?id= query param is in the URL, load portfolio directly
      return urlParams.has('id') ? 'portfolio' : 'landing';
    }
    return 'landing';
  });

  // Template selection state
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('editorial');

  // Sync view when URL changes or an ID is searched
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handlePopState = () => {
        const urlParams = new URLSearchParams(window.location.search);
        setView(urlParams.has('id') ? 'portfolio' : 'landing');
      };

      window.addEventListener('popstate', handlePopState);
      return () => window.removeEventListener('popstate', handlePopState);
    }
  }, []);

  // When active member changes and URL has id, ensure view is 'portfolio'
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('id')) {
        setView('portfolio');
      }
    }
  }, [activeMemberId]);

  // Return to Onboarding Hub
  const handleBackToLanding = useCallback(() => {
    clearActivePortfolioUrl();
    setView('landing');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [clearActivePortfolioUrl]);

  // Open candidate portfolio directly by ID
  const handleOpenPortfolio = useCallback((id) => {
    setActiveMemberId(id);
    setView('portfolio');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [setActiveMemberId]);

  // Start creation workflow: Check auth -> Show templates -> Open generator
  const handleStartCreation = useCallback(() => {
    if (!isLoggedIn) {
      // Prompt user to sign up or log in first, then proceed to template picker
      openAuthModal('signup', () => {
        setIsTemplateModalOpen(true);
      });
    } else {
      setIsTemplateModalOpen(true);
    }
  }, [isLoggedIn, openAuthModal]);

  // When template is picked from template modal
  const handleTemplateSelected = useCallback((templateId) => {
    setSelectedTemplateId(templateId);
    setIsTemplateModalOpen(false);
    openGenerator();
  }, [openGenerator]);

  // When template is picked directly from the landing page
  const handleSelectTemplateFromLanding = useCallback((templateId) => {
    setSelectedTemplateId(templateId);
    if (!isLoggedIn) {
      openAuthModal('signup', () => {
        openGenerator();
      });
    } else {
      openGenerator();
    }
  }, [isLoggedIn, openAuthModal, openGenerator]);

  // Determine active template theme styles
  const activeTemplate = activeMember?.template || 'editorial';
  const templateThemeClass = {
    editorial: 'bg-[#EAEAE7] text-[#0F172A]',
    cyberpunk: 'bg-[#090D16] text-[#E2E8F0] dark-cyberpunk-theme',
    minimalist: 'bg-[#F8FAFC] text-[#0F172A] modern-saas-theme',
    obsidian: 'bg-[#09090B] text-[#F4F4F5] obsidian-luxe-theme'
  }[activeTemplate] || 'bg-[#EAEAE7] text-[#0F172A]';

  return (
    <>
      {view === 'landing' ? (
        /* ======================================================= */
        /* ONBOARDING & PORTFOLIO DISCOVERY HUB PAGE               */
        /* ======================================================= */
        <OnboardingPage
          onStartCreation={handleStartCreation}
          onSelectTemplateFromLanding={handleSelectTemplateFromLanding}
          onOpenPortfolio={handleOpenPortfolio}
        />
      ) : (
        /* ======================================================= */
        /* INDIVIDUAL CANDIDATE PORTFOLIO SHOWCASE                 */
        /* ======================================================= */
        <div className={`relative min-h-screen ${templateThemeClass} overflow-x-hidden selection:bg-slate-900 selection:text-white transition-colors duration-500`}>
          {/* Animated Tech Constellation & Developer Blueprint Atmosphere */}
          <InkCanvasBackground />

          {/* Floating Navigation Bar with Back to Hub & ID Search Bar */}
          <Navbar
            onBackToLanding={handleBackToLanding}
            onStartCreation={handleStartCreation}
          />

          {/* Main Content Sections with Sophisticated Shaded Depth */}
          <main className="relative z-10">
            <Hero />
            <ScrollDivider symbol="01" />
            <About />
            <ScrollDivider symbol="02" />
            <Skills />
            <ScrollDivider symbol="03" />
            <Projects />
            <ScrollDivider symbol="04" />
            <Experience />
            <ScrollDivider symbol="05" />
            <Certifications />
            <ScrollDivider symbol="06" />
            <Contact />
          </main>

          {/* Shaded Footer */}
          <Footer />
        </div>
      )}

      {/* ======================================================= */}
      {/* GLOBAL MODALS & UTILITIES                               */}
      {/* ======================================================= */}
      {/* 1. User Authentication (Login & Signup) Modal */}
      <AuthModal />

      {/* 2. Architectural Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelectTemplate={handleTemplateSelected}
        initialTemplateId={selectedTemplateId}
      />

      {/* 3. Portfolio Generator Modal (Receives selected template) */}
      <PortfolioGeneratorModal
        selectedTemplateId={selectedTemplateId}
        onOpenTemplatePicker={() => setIsTemplateModalOpen(true)}
      />

      {/* 4. Portfolio Created Success & ID Reveal Modal */}
      <PortfolioSuccessModal />

      {/* 5. Existing Teammate Customizer Modal */}
      <TeammateCustomizerModal />

      {/* 6. Resume / CV PDF Downloader Modal */}
      <ResumeDownloadModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
        candidateMember={resumeCandidate || activeMember}
      />

      {/* 7. Global Feedback Toast Notification */}
      <ToastNotification />
    </>
  );
};

export function App() {
  return (
    <AuthProvider>
      <TeamProvider>
        <AppContent />
      </TeamProvider>
    </AuthProvider>
  );
}

export default App;

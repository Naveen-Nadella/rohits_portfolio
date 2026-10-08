import React from 'react';
import { TeamProvider } from './context/TeamContext';
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

export function App() {
  return (
    <TeamProvider>
      <div className="relative min-h-screen bg-[#EAEAE7] text-[#0F172A] overflow-x-hidden selection:bg-slate-900 selection:text-white">
        {/* Animated Tech Constellation & Developer Blueprint Atmosphere */}
        <InkCanvasBackground />

        {/* Floating Navigation Bar with Teammate Switcher */}
        <Navbar />

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

        {/* Modal for Customizing Teammate Details */}
        <TeammateCustomizerModal />
      </div>
    </TeamProvider>
  );
}

export default App;

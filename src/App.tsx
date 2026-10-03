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

export function App() {
  return (
    <div className="relative min-h-screen bg-[#000000] text-white overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Animated Subtle Atmosphere Canvas */}
      <InkCanvasBackground />

      {/* Floating Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

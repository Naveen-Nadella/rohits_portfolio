import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { useTeam } from '../../context/TeamContext';
import { RedSeal } from '../common/RedSeal';
import { Layout, Code, Database, GitBranch, GraduationCap, Compass, BookOpen, Award, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { activeMember } = useTeam();

  const pillars = [
    {
      icon: Layout,
      code: '01',
      title: 'Modern Web Craft',
      description: 'Engineering responsive, component-driven user interfaces using React.js, TypeScript, and modern utility-first CSS design tokens.'
    },
    {
      icon: Code,
      code: '02',
      title: 'Algorithmic Problem Solving',
      description: 'Strengthening computational foundations in Data Structures and Algorithms with clean implementations in Java, C, and Python.'
    },
    {
      icon: Database,
      code: '03',
      title: 'Relational Data Modeling',
      description: 'Designing normalized relational database schemas, mastering SQL query operations, and ensuring data consistency in MySQL.'
    },
    {
      icon: GitBranch,
      code: '04',
      title: 'Developer Tooling & Git Hygiene',
      description: 'Practicing collaborative version control with Git and GitHub, lightning-fast builds with Vite, and modular repository structure.'
    }
  ];

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <KanjiWatermark char="01" position="top-right" opacity={0.03} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          sealCode="01"
          chapterNumber="CHAPTER 01"
          title="THE CHRONICLE"
          subtitle={`The chronicle of ${activeMember.name}, crafting responsive interfaces, solid algorithmic foundations, and verified academic credentials.`}
        />

        {/* Ancient Manuscript Parchment Frame in Light Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Manuscript Text */}
          <div className="lg:col-span-7 bg-white border border-zinc-200/90 rounded-sm p-6 sm:p-10 relative shadow-lg parchment-texture">
            {/* Top decorative border accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />
            <div className="absolute -top-3 left-4 px-3 py-0.5 bg-zinc-900 text-white font-serif text-[10px] tracking-widest uppercase font-bold rounded-[1px] shadow-sm">
              MANUSCRIPT RECORD
            </div>

            <div className="space-y-5 text-base sm:text-lg text-zinc-700 font-editorial leading-relaxed pt-2">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-zinc-900 first-letter:mr-2.5 first-letter:float-left first-letter:leading-none">
                {activeMember.bio[0]}
              </p>
              <p className="text-zinc-600">
                {activeMember.bio[1]}
              </p>
              <p className="text-zinc-600">
                {activeMember.bio[2]}
              </p>
            </div>

            {/* Academic & Professional Inscription Seals */}
            <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-900 shadow-2xs">
                  <GraduationCap size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Degree CGPA</div>
                  <div className="font-serif text-sm font-bold text-zinc-900">{activeMember.scores.btech}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-900 shadow-2xs">
                  <BookOpen size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Academic Status</div>
                  <div className="font-serif text-sm font-bold text-zinc-900">B.Tech 2nd Year</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-200 rounded-sm">
                <div className="w-8 h-8 rounded-full bg-white border border-zinc-300 flex items-center justify-center text-zinc-900 shadow-2xs">
                  <Compass size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase">Primary Focus</div>
                  <div className="font-serif text-sm font-bold text-zinc-900 truncate max-w-[120px]">
                    {activeMember.title.split('&')[0].trim()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Scorecard & Inscriptions (NO DUPLICATE PHOTO) */}
          <div className="lg:col-span-5 bg-white border border-zinc-200/90 rounded-sm p-6 sm:p-7 flex flex-col justify-between relative shadow-lg">
            <div>
              {/* Scorecard Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-200">
                <div className="flex items-center gap-2.5">
                  <RedSeal char={activeMember.monogram} size="sm" />
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase block">
                      OFFICIAL DOSSIER
                    </span>
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Academic Scorecard
                    </h3>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-[1px] bg-zinc-100 border border-zinc-200 text-[10px] font-mono text-zinc-700 font-semibold">
                  VERIFIED
                </span>
              </div>

              {/* Individual Academic Metric Cards */}
              <div className="space-y-3 mb-6">
                {/* 10th Grade */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-sm bg-zinc-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      10
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-zinc-500">
                        Class X (Secondary School)
                      </div>
                      <div className="font-serif text-xs font-bold text-zinc-800">
                        Board Examinations
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-zinc-900 block">
                      {activeMember.scores.tenth}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">Score</span>
                  </div>
                </div>

                {/* Intermediate */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-sm bg-zinc-900 text-white font-mono text-[10px] flex items-center justify-center font-bold">
                      12
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-zinc-500">
                        Intermediate (Class XII)
                      </div>
                      <div className="font-serif text-xs font-bold text-zinc-800">
                        Pre-University MPC
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-zinc-900 block">
                      {activeMember.scores.intermediate}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500">Score</span>
                  </div>
                </div>

                {/* B.Tech */}
                <div className="p-3 bg-zinc-900 text-white border border-zinc-900 rounded-sm flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-sm bg-white text-zinc-900 font-mono text-[10px] flex items-center justify-center font-bold">
                      B
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-zinc-300">
                        B.Tech in CSE (Undergraduate)
                      </div>
                      <div className="font-serif text-xs font-bold text-white">
                        {activeMember.university}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm font-bold text-white block">
                      {activeMember.scores.btech}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-400">Cumulative GPA</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Pillars Header */}
            <div>
              <div className="border-t border-zinc-200 pt-4 mb-3">
                <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase block">
                  ENGINEERING FOUNDATIONS
                </span>
                <h4 className="font-serif text-sm font-bold text-zinc-900 mt-0.5">
                  Core Technical Competencies
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-600">
                <div className="flex items-center gap-1.5 p-2 bg-zinc-50 rounded-sm border border-zinc-200">
                  <CheckCircle2 size={12} className="text-zinc-900 shrink-0" />
                  <span className="truncate">React & TypeScript</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-zinc-50 rounded-sm border border-zinc-200">
                  <CheckCircle2 size={12} className="text-zinc-900 shrink-0" />
                  <span className="truncate">DSA in Java & C</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-zinc-50 rounded-sm border border-zinc-200">
                  <CheckCircle2 size={12} className="text-zinc-900 shrink-0" />
                  <span className="truncate">MySQL & Modeling</span>
                </div>
                <div className="flex items-center gap-1.5 p-2 bg-zinc-50 rounded-sm border border-zinc-200">
                  <CheckCircle2 size={12} className="text-zinc-900 shrink-0" />
                  <span className="truncate">Git Workflows</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Foundations of Craft Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const PillarIcon = pillar.icon;
            return (
              <div
                key={pillar.code}
                className="bg-white border border-zinc-200 hover:border-zinc-400 p-6 rounded-sm shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-sm bg-zinc-50 border border-zinc-200 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                    <PillarIcon size={18} />
                  </div>
                  <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    {pillar.code}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-zinc-900 mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

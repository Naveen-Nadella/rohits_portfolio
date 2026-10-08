import React, { useState } from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { skillsData } from '../../data/skills';
import { soundEngine } from '../../utils/audio';
import { Sparkles, Code2, Layout, Cpu, Terminal } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'COMPLETE ARSENAL', code: 'ALL', icon: Sparkles },
    { id: 'LANGUAGES', label: 'LANGUAGES', code: '01', icon: Code2 },
    { id: 'FRONTEND', label: 'WEB & FRONTEND', code: '02', icon: Layout },
    { id: 'CORE_CS', label: 'CORE CS', code: '03', icon: Cpu },
    { id: 'TOOLS', label: 'TOOLS & PLATFORMS', code: '04', icon: Terminal }
  ];

  const handleCategoryChange = (id: string) => {
    soundEngine.playBrushSwipe();
    setSelectedCategory(id);
  };

  const filteredCategories = selectedCategory === 'ALL'
    ? skillsData
    : skillsData.filter((cat) => {
        if (selectedCategory === 'LANGUAGES') return cat.title.includes('LANGUAGES');
        if (selectedCategory === 'FRONTEND') return cat.title.includes('FRONTEND');
        if (selectedCategory === 'CORE_CS') return cat.title.includes('COMPUTER SCIENCE');
        if (selectedCategory === 'TOOLS') return cat.title.includes('TOOLS');
        return true;
      });

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <KanjiWatermark char="02" position="top-left" opacity={0.03} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          sealCode="02"
          chapterNumber="CHAPTER 02"
          title="TOOLS OF THE CRAFT"
          subtitle="Technical capabilities and computer science foundations cultivated through B.Tech coursework and hands-on web development."
        />

        {/* Filter Navigation Tabs in Light Theme */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((tab) => {
            const isActive = selectedCategory === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => handleCategoryChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-xs font-serif tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-zinc-900 text-white font-bold border border-zinc-900 shadow-md'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900 shadow-2xs'
                }`}
              >
                <TabIcon size={14} className={isActive ? 'text-white' : 'text-zinc-500'} />
                <span className="font-mono text-[10px] opacity-70">{tab.code}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Sections */}
        <div className="space-y-12">
          {filteredCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="bg-white border border-zinc-200/90 rounded-sm p-6 sm:p-8 relative shadow-sm"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-zinc-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-sm shadow-xs">
                    {category.sealCode}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="font-mono text-[11px] text-zinc-700 tracking-wider uppercase bg-zinc-100 px-3 py-1 rounded-sm border border-zinc-200">
                  {category.skills.length} DISCIPLINARY TOOLS
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-sm bg-zinc-50/70 border border-zinc-200 hover:border-zinc-400 hover:bg-white transition-all duration-300 group relative overflow-hidden shadow-2xs hover:shadow-xs"
                  >
                    {skill.featured && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-zinc-900 to-transparent" />
                    )}

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-serif text-sm sm:text-base font-bold text-zinc-900 group-hover:text-black transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-800 px-2 py-0.5 rounded-[1px] bg-white border border-zinc-300 whitespace-nowrap shadow-2xs">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

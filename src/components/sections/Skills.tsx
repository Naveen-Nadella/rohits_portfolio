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
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <KanjiWatermark char="02" position="top-left" opacity={0.02} />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          sealCode="02"
          chapterNumber="CHAPTER 02"
          title="TOOLS OF THE CRAFT"
          subtitle="Technical capabilities and computer science foundations cultivated through B.Tech coursework and hands-on web development."
        />

        {/* Filter Navigation Tabs in Black & White */}
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
                    ? 'bg-white text-black font-bold border border-white shadow-lg'
                    : 'bg-[#09090B] text-[#A1A1AA] border border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                <TabIcon size={14} className={isActive ? 'text-black' : 'text-[#A1A1AA]'} />
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
              className="bg-[#09090B] border border-white/15 rounded-sm p-6 sm:p-8 relative shadow-xl"
            >
              {/* Category Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm bg-[#121214] border border-white/40 flex items-center justify-center font-mono font-bold text-sm text-white">
                    {category.sealCode}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                      {category.title}
                    </h3>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="font-mono text-[11px] text-[#E4E4E7] tracking-wider uppercase bg-[#121214] px-3 py-1 rounded-sm border border-white/10">
                  {category.skills.length} DISCIPLINARY TOOLS
                </div>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-sm bg-[#121214] border border-white/10 hover:border-white/40 hover:bg-[#18181B] transition-all duration-300 group relative overflow-hidden"
                  >
                    {skill.featured && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-white to-transparent" />
                    )}

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-white/90 transition-colors">
                        {skill.name}
                      </span>
                      <span className="font-mono text-[10px] tracking-wider uppercase text-white/90 px-2 py-0.5 rounded-[1px] bg-[#000000] border border-white/20 whitespace-nowrap">
                        {skill.level}
                      </span>
                    </div>

                    <p className="text-xs text-[#A1A1AA] leading-relaxed">
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

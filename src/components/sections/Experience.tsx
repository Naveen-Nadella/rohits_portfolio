import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { experienceData } from '../../data/experience';
import { Briefcase, GraduationCap, Calendar, CheckCircle } from 'lucide-react';

export const Experience: React.FC = () => {
  return (
    <section id="journey" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#000000]">
      <KanjiWatermark char="04" position="top-left" opacity={0.02} />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          sealCode="04"
          chapterNumber="CHAPTER 04"
          title="THE ODYSSEY"
          subtitle="A chronological record of scholastic distinction, software engineering milestones, and web development projects."
        />

        {/* Central Vertical Spine in Black & White */}
        <div className="relative border-l-2 border-white/20 ml-4 sm:ml-44 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((item) => {
            const isMilestone = item.type === 'experience';

            return (
              <div key={item.id} className="relative group">
                {/* Year Marker on the left with clean spacing */}
                <div className="sm:absolute sm:-left-48 sm:top-2 sm:w-36 sm:text-right hidden sm:block">
                  <span className="font-mono text-xs font-bold text-white tracking-wider block">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">
                    {item.period}
                  </span>
                </div>

                {/* Sleek Minimal Timeline Node Pip */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-3 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-black border-2 border-white flex items-center justify-center shadow-[0_0_8px_rgba(255,255,255,0.6)] group-hover:scale-125 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* Milestone Parchment Card */}
                <div className="bg-[#09090B] border border-white/15 hover:border-white/40 p-6 sm:p-7 rounded-sm shadow-xl transition-all duration-300 hover:shadow-black/90 group-hover:-translate-y-0.5">
                  {/* Mobile-only Year Badge */}
                  <div className="sm:hidden flex items-center gap-2 mb-2 font-mono text-xs text-white">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                  </div>

                  {/* Header: Title, Organization, Grade */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {isMilestone ? (
                          <Briefcase size={15} className="text-white" />
                        ) : (
                          <GraduationCap size={15} className="text-white" />
                        )}
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="font-serif text-sm text-[#A1A1AA]">
                        {item.organization}
                      </div>
                    </div>

                    {item.grade && (
                      <span className="px-3 py-1 bg-[#121214] border border-white/30 rounded-[1px] font-mono text-xs font-bold text-white">
                        {item.grade}
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed mb-4 font-editorial">
                    {item.summary}
                  </p>

                  {/* Highlights Bullet Inscriptions */}
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                        <CheckCircle size={13} className="text-white shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  {item.technologies && (
                    <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                      {item.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-white/80 bg-[#121214] px-2 py-0.5 rounded-[1px] border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { experienceData } from '../../data/experience';
import { useTeam } from '../../context/TeamContext';
import { Briefcase, GraduationCap, Calendar, CheckCircle } from 'lucide-react';

export const Experience = () => {
  const { activeMember } = useTeam();

  const getDynamicGrade = (itemId, defaultGrade) => {
    if (itemId === 'kl-university-btech') {
      return `CGPA: ${activeMember.scores.btech}`;
    }
    if (itemId === 'intermediate-xii') {
      return `Score: ${activeMember.scores.intermediate}`;
    }
    if (itemId === 'school-tenth') {
      return `Score: ${activeMember.scores.tenth}`;
    }
    return defaultGrade;
  };

  return (
    <section id="journey" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <KanjiWatermark char="04" position="top-left" opacity={0.03} />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          sealCode="04"
          chapterNumber="CHAPTER 04"
          title="THE ODYSSEY"
          subtitle="A chronological record of scholastic distinction, software engineering milestones, and web development projects."
        />

        {/* Central Vertical Spine in Light Theme */}
        <div className="relative border-l-2 border-zinc-300 ml-4 sm:ml-44 pl-6 sm:pl-10 space-y-12">
          {experienceData.map((item) => {
            const isMilestone = item.type === 'experience';
            const displayGrade = getDynamicGrade(item.id, item.grade);

            return (
              <div key={item.id} className="relative group">
                {/* Year Marker on the left with clean spacing */}
                <div className="sm:absolute sm:-left-48 sm:top-2 sm:w-36 sm:text-right hidden sm:block">
                  <span className="font-mono text-xs font-bold text-zinc-900 tracking-wider block">
                    {item.year}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {item.period}
                  </span>
                </div>

                {/* Sleek Minimal Timeline Node Pip */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-3 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-zinc-900 flex items-center justify-center shadow-xs group-hover:scale-125 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                  </div>
                </div>

                {/* Milestone Parchment Card */}
                <div className="bg-white border border-zinc-200/90 hover:border-zinc-400 p-6 sm:p-7 rounded-sm shadow-xs transition-all duration-300 hover:shadow-md group-hover:-translate-y-0.5">
                  {/* Mobile-only Year Badge */}
                  <div className="sm:hidden flex items-center gap-2 mb-2 font-mono text-xs text-zinc-800">
                    <Calendar size={12} />
                    <span>{item.period}</span>
                  </div>

                  {/* Header: Title, Organization, Grade */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {isMilestone ? (
                          <Briefcase size={15} className="text-zinc-900" />
                        ) : (
                          <GraduationCap size={15} className="text-zinc-900" />
                        )}
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-zinc-900">
                          {item.title}
                        </h3>
                      </div>
                      <div className="font-serif text-sm text-zinc-500">
                        {item.organization}
                      </div>
                    </div>

                    {displayGrade && (
                      <span className="px-3 py-1 bg-zinc-900 text-white rounded-[1px] font-mono text-xs font-bold shadow-2xs">
                        {displayGrade}
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4 font-editorial">
                    {item.summary}
                  </p>

                  {/* Highlights Bullet Inscriptions */}
                  <ul className="space-y-2 mb-4">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-zinc-600">
                        <CheckCircle size={13} className="text-zinc-900 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  {item.technologies && (
                    <div className="pt-3 border-t border-zinc-200 flex flex-wrap gap-1.5">
                      {item.technologies.map((t, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-[1px] border border-zinc-200"
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

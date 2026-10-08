import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { KanjiWatermark } from '../common/KanjiWatermark';
import { RedSeal } from '../common/RedSeal';
import { certificationsData } from '../../data/certifications';
import { ExternalLink, ShieldCheck, Award } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#FAFAFA]">
      <KanjiWatermark char="05" position="top-right" opacity={0.03} />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading
          sealCode="05"
          chapterNumber="CHAPTER 05"
          title="CERTIFICATIONS"
          subtitle="Official technical credentials affirming foundational competency in cloud computing architecture, core services, and infrastructure governance."
        />

        <div className="max-w-2xl mx-auto">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="bg-white border border-zinc-200/90 hover:border-zinc-400 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md relative overflow-hidden group"
            >
              {/* Corner flourish */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-zinc-900/5 to-transparent pointer-events-none" />

              <div>
                {/* Header: Seal, Issuer Badge, Year */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <RedSeal char={cert.sealCode} size="md" />
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 block">
                        OFFICIAL ACCREDITATION
                      </span>
                      <span className="font-serif text-sm font-bold text-zinc-900">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-xs text-zinc-800 px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-[1px] font-semibold">
                    {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 group-hover:text-black transition-colors mb-3">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 font-editorial">
                  {cert.description}
                </p>

                {/* Competencies Covered */}
                <div className="mb-6">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 flex items-center gap-1.5 font-semibold">
                    <ShieldCheck size={12} className="text-zinc-900" />
                    VERIFIED COMPETENCIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-mono text-zinc-800 bg-zinc-50 px-2.5 py-1 rounded-[1px] border border-zinc-200 shadow-2xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Verified Credential Link */}
              <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <Award size={14} className="text-zinc-900" />
                  <span>REGISTRY RECORD</span>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-serif tracking-widest uppercase font-bold text-zinc-900 hover:text-black transition-colors"
                  >
                    <span>VIEW REGISTRY</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

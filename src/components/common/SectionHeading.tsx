import React from 'react';
import { RedSeal } from './RedSeal';

interface SectionHeadingProps {
  sealCode?: string;
  chapterNumber?: string;
  title: string;
  subtitle: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  sealCode = '01',
  chapterNumber,
  title,
  subtitle,
  centered = true
}) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'}`}>
      <div className={`flex items-center gap-3 mb-3 ${centered ? 'justify-center' : 'justify-start'}`}>
        <RedSeal char={sealCode} size="sm" />
        {chapterNumber && (
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-medium border-l border-zinc-300 pl-3">
            {chapterNumber}
          </span>
        )}
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 relative inline-block">
        <span className="silver-gradient-text">{title}</span>
      </h2>

      <p className="mt-3 text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-sans leading-relaxed">
        {subtitle}
      </p>

      {/* Decorative minimalist line underline */}
      <div className={`mt-4 flex items-center gap-2 ${centered ? 'justify-center' : 'justify-start'}`}>
        <div className="w-12 h-[2px] bg-zinc-900" />
        <div className="w-24 h-[1px] bg-zinc-300" />
        <div className="w-4 h-[2px] bg-zinc-900" />
      </div>
    </div>
  );
};

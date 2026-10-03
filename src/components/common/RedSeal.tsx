import React from 'react';

interface RedSealProps {
  char?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  subtext?: string;
  rotate?: boolean;
}

export const RedSeal: React.FC<RedSealProps> = ({
  char = 'NN',
  size = 'md',
  className = '',
  subtext,
  rotate = false
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs tracking-wider',
    lg: 'w-14 h-14 text-base tracking-widest',
    xl: 'w-20 h-20 text-2xl tracking-widest'
  };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        className={`relative ${sizeClasses[size]} rounded-sm bg-[#0A0A0C] border-2 border-white shadow-lg flex items-center justify-center select-none font-serif font-black text-white transition-all duration-300 hover:scale-105 hover:border-white hover:shadow-white/20 ${
          rotate ? 'rotate-[-2deg]' : ''
        }`}
        style={{
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.9), 0 3px 12px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Subtle dashed inner frame */}
        <div className="absolute inset-[2px] border border-dashed border-white/40 pointer-events-none rounded-[1px]" />
        <span className="relative z-10 leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] uppercase">
          {char}
        </span>
      </div>
      {subtext && (
        <span className="mt-1 font-mono text-[9px] tracking-widest text-[#A1A1AA] uppercase">
          {subtext}
        </span>
      )}
    </div>
  );
};

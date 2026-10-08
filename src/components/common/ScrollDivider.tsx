import React from 'react';

interface ScrollDividerProps {
  className?: string;
  symbol?: string;
}

export const ScrollDivider: React.FC<ScrollDividerProps> = ({
  className = '',
  symbol = '◆'
}) => {
  return (
    <div className={`relative flex items-center justify-center my-12 md:my-20 ${className}`}>
      <div className="h-[1px] w-full max-w-xl bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
      <div className="absolute px-4 bg-[#FAFAFA] flex items-center gap-2 text-zinc-400 text-xs font-serif">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
        <span className="tracking-widest font-mono text-[11px] text-zinc-600">{symbol}</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-400" />
      </div>
    </div>
  );
};

import React from 'react';

export const KanjiWatermark = ({
  char,
  position = 'top-right',
  opacity = 0.035,
  className = ''
}) => {
  const positionClasses = {
    'top-left': 'top-2 left-4',
    'top-right': 'top-2 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute select-none pointer-events-none font-serif font-black text-[100px] md:text-[200px] leading-none text-zinc-900 ${positionClasses[position]} ${className}`}
      style={{ opacity }}
    >
      {char}
    </div>
  );
};

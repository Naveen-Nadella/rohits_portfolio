import React, { useState, useRef, useEffect } from 'react';
import { useTeam } from '../../context/TeamContext';
import { soundEngine } from '../../utils/audio';
import { ChevronDown, Check, Settings2, Users } from 'lucide-react';

export const TeammateNavbarDropdown: React.FC = () => {
  const { activeMember, allMembers, setActiveMemberId, openCustomizer } = useTeam();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    soundEngine.playBrushSwipe();
    setActiveMemberId(id);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          soundEngine.playChime(540, 0.4);
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-zinc-200/90 hover:border-zinc-400 shadow-xs hover:shadow-sm text-zinc-900 transition-all cursor-pointer"
        aria-label="Select teammate profile"
        title="Switch Team Member Portfolio"
      >
        <span className="w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-mono font-bold flex items-center justify-center">
          {activeMember.monogram}
        </span>
        <span className="font-serif text-xs font-bold text-zinc-900 hidden sm:inline max-w-[120px] truncate">
          {activeMember.name}
        </span>
        <span className="font-mono text-[10px] text-zinc-500 hidden md:inline">
          ({activeMember.scores.btech.replace('CGPA', '').trim()})
        </span>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-zinc-200 rounded-sm shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-zinc-100 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5 font-semibold">
              <Users size={12} />
              PROJECT TEAM (4 MEMBERS)
            </span>
            <span className="text-[10px] font-mono text-zinc-400">KL University</span>
          </div>

          <div className="py-1 space-y-1">
            {allMembers.map((member) => {
              const isActive = member.id === activeMember.id;
              return (
                <button
                  key={member.id}
                  onClick={() => handleSelect(member.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-sm text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-zinc-100 border-l-2 border-zinc-900'
                      : 'hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-sm bg-zinc-900 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                      {member.monogram}
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif text-xs font-bold text-zinc-900 truncate">
                        {member.name}
                      </div>
                      <div className="font-mono text-[10px] text-zinc-500 truncate">
                        B.Tech: {member.scores.btech} • 10th: {member.scores.tenth.split('/')[0].trim()}
                      </div>
                    </div>
                  </div>

                  {isActive && <Check size={14} className="text-zinc-900 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-100">
            <button
              onClick={() => {
                setIsOpen(false);
                openCustomizer();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-serif text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm transition-colors cursor-pointer"
            >
              <Settings2 size={13} />
              <span>Customize Teammate Details</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TeammateSegmentedBar: React.FC = () => {
  const { activeMember, allMembers, setActiveMemberId, openCustomizer } = useTeam();

  return (
    <div className="w-full max-w-4xl mx-auto my-6 p-1.5 bg-[#F4F4F1]/95 backdrop-blur-md border border-zinc-300/80 rounded-sm shadow-xs flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 px-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
        <Users size={13} className="text-zinc-800" />
        <span className="hidden sm:inline">TEAM PORTFOLIO:</span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-center sm:justify-start">
        {allMembers.map((member) => {
          const isActive = member.id === activeMember.id;
          return (
            <button
              key={member.id}
              onClick={() => {
                soundEngine.playBrushSwipe();
                setActiveMemberId(member.id);
              }}
              className={`px-3 py-1.5 rounded-sm text-xs font-serif tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-zinc-900 text-white font-bold shadow-xs'
                  : 'bg-[#EAEAE7] hover:bg-white text-zinc-700 border border-zinc-300 hover:text-zinc-900'
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">{member.monogram}</span>
              <span className="truncate max-w-[130px]">{member.name}</span>
              {member.scores.btech !== 'Pending' && (
                <span className={`text-[10px] font-mono px-1 rounded ${isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                  {member.scores.btech.replace('CGPA', '').trim()}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => openCustomizer()}
        className="px-2.5 py-1.5 text-xs font-serif text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-sm transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        title="Customize team details"
      >
        <Settings2 size={13} />
        <span className="hidden md:inline">Edit Details</span>
      </button>
    </div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import { useTeam } from '../../context/TeamContext';
import { soundEngine } from '../../utils/audio';
import { ChevronDown, Check, Settings2, Users, Sparkles, Trash2, Key } from 'lucide-react';

export const TeammateNavbarDropdown = () => {
  const {
    activeMember,
    allMembers,
    setActiveMemberId,
    openCustomizer,
    openGenerator,
    deletePortfolio
  } = useTeam();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
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
        <span className="font-mono text-[10px] text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded-[1px] font-semibold hidden md:inline">
          {activeMember.id}
        </span>
        <ChevronDown
          size={14}
          className={`text-zinc-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white border border-zinc-200 rounded-sm shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-3 py-2 border-b border-zinc-100 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 font-semibold">
              <Users size={12} />
              PORTFOLIO DIRECTORY ({allMembers.length})
            </span>
            <span className="text-[10px] font-mono text-zinc-400">Searchable by ID</span>
          </div>

          <div className="py-1 space-y-1 max-h-72 overflow-y-auto">
            {allMembers.map((member) => {
              const isActive = member.id === activeMember.id;
              return (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-2 rounded-sm transition-colors ${
                    isActive ? 'bg-zinc-100 border-l-2 border-zinc-900' : 'hover:bg-zinc-50'
                  }`}
                >
                  <button
                    onClick={() => handleSelect(member.id)}
                    className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-sm bg-zinc-900 text-white font-mono text-xs flex items-center justify-center shrink-0 font-bold">
                      {member.monogram}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-xs font-bold text-zinc-900 truncate">
                          {member.name}
                        </span>
                        {member.isCustom && (
                          <span className="text-[9px] font-mono bg-amber-100 text-amber-800 px-1 rounded-[1px]">
                            Custom
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 truncate">
                        <span className="bg-zinc-200/80 px-1 py-0.2 rounded-[1px] text-zinc-800 font-bold">
                          ID: {member.id}
                        </span>
                        <span>• CGPA: {member.scores?.btech}</span>
                      </div>
                    </div>
                  </button>

                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {isActive && <Check size={14} className="text-zinc-900" />}
                    {member.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePortfolio(member.id);
                        }}
                        className="p-1 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete custom portfolio"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-100 flex flex-col gap-1.5">
            <button
              onClick={() => {
                setIsOpen(false);
                openGenerator();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-serif font-bold text-white bg-zinc-900 hover:bg-black rounded-sm transition-colors cursor-pointer shadow-2xs"
            >
              <Sparkles size={13} />
              <span>+ Generate New Portfolio</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                openCustomizer();
              }}
              className="w-full flex items-center justify-center gap-2 py-1.5 text-xs font-serif text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-sm transition-colors cursor-pointer"
            >
              <Settings2 size={13} />
              <span>Customize Current Portfolio</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TeammateSegmentedBar = () => {
  const {
    activeMember,
    allMembers,
    setActiveMemberId,
    openCustomizer,
    openGenerator
  } = useTeam();

  return (
    <div className="w-full max-w-4xl mx-auto my-4 p-2 bg-[#F4F4F1]/95 backdrop-blur-md border border-zinc-300/80 rounded-sm shadow-xs flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 px-2 text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
        <Users size={13} className="text-zinc-800" />
        <span className="hidden sm:inline">PORTFOLIO CANDIDATES:</span>
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
              title={`Switch to ${member.name} (ID: ${member.id})`}
            >
              <span className="font-mono text-[10px] opacity-70">{member.monogram}</span>
              <span className="truncate max-w-[120px]">{member.name}</span>
              <span
                className={`text-[9px] font-mono px-1 py-0.5 rounded-[1px] font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-800'
                }`}
              >
                {member.id}
              </span>
            </button>
          );
        })}

        <button
          onClick={openGenerator}
          className="px-2.5 py-1.5 rounded-sm text-xs font-serif font-bold text-zinc-900 bg-white border border-zinc-300 hover:border-zinc-900 transition-colors flex items-center gap-1 cursor-pointer shadow-2xs"
          title="Generate your portfolio with details and get an ID"
        >
          <Sparkles size={11} className="text-zinc-900" />
          <span>+ New Portfolio</span>
        </button>
      </div>

      <button
        onClick={() => openCustomizer()}
        className="px-2 py-1 text-xs font-serif text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-sm transition-colors flex items-center gap-1 cursor-pointer shrink-0"
        title="Customize details"
      >
        <Settings2 size={13} />
        <span className="hidden md:inline">Edit</span>
      </button>
    </div>
  );
};

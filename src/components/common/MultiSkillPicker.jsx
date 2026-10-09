import React, { useState, useRef, useEffect } from 'react';
import { X, Plus, Check, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const MultiSkillPicker = ({
  selectedSkills = [],
  onChange,
  availableOptions = [],
  placeholder = 'Type to search or add custom skill...',
  popularSuggestions = []
}) => {
  // Normalize selectedSkills to array of strings
  const currentSkills = Array.isArray(selectedSkills)
    ? selectedSkills
    : typeof selectedSkills === 'string'
    ? selectedSkills.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const [inputVal, setInputVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cleanInput = inputVal.trim().toLowerCase();

  // Filter options excluding already selected ones
  const filteredOptions = availableOptions.filter((opt) => {
    const isAlreadySelected = currentSkills.some(
      (s) => s.toLowerCase() === opt.toLowerCase()
    );
    const matchesSearch = opt.toLowerCase().includes(cleanInput);
    return !isAlreadySelected && (!cleanInput || matchesSearch);
  });

  const exactMatchExists = availableOptions.some(
    (opt) => opt.toLowerCase() === cleanInput
  );

  const isAlreadySelected = currentSkills.some(
    (s) => s.toLowerCase() === cleanInput
  );

  const handleAddSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (currentSkills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setInputVal('');
      setIsOpen(false);
      return;
    }
    soundEngine.playBrushSwipe();
    const updated = [...currentSkills, trimmed];
    onChange(updated);
    setInputVal('');
    setIsOpen(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleRemoveSkill = (skillToRemove) => {
    soundEngine.playBrushSwipe();
    const updated = currentSkills.filter(
      (s) => s.toLowerCase() !== skillToRemove.toLowerCase()
    );
    onChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0 && cleanInput) {
        handleAddSkill(filteredOptions[0]);
      } else if (cleanInput) {
        handleAddSkill(inputVal);
      }
    }
  };

  // Quick suggestions that aren't already selected
  const visibleSuggestions = popularSuggestions.filter(
    (s) => !currentSkills.some((cur) => cur.toLowerCase() === s.toLowerCase())
  ).slice(0, 8);

  return (
    <div className="space-y-2" ref={containerRef}>
      {/* Selected Skills Badges Container */}
      <div className="min-h-[38px] p-2 bg-zinc-50 border border-zinc-300 rounded-sm flex flex-wrap items-center gap-1.5 focus-within:border-zinc-900 focus-within:bg-white transition-all">
        {currentSkills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[1px] bg-zinc-900 text-white text-xs font-mono font-medium shadow-2xs animate-in zoom-in-95 duration-150"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
              title={`Remove ${skill}`}
            >
              <X size={11} />
            </button>
          </span>
        ))}

        {/* Inline Input */}
        <div className="relative flex-1 min-w-[150px]">
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={currentSkills.length === 0 ? placeholder : 'Add more...'}
            className="w-full py-1 px-2 text-xs font-mono text-zinc-900 placeholder:text-zinc-400 bg-transparent focus:outline-none"
          />

          {/* Autocomplete Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 max-h-48 overflow-y-auto bg-white border border-zinc-300 rounded-sm shadow-xl p-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {/* Custom Add Option */}
              {cleanInput && !exactMatchExists && !isAlreadySelected && (
                <button
                  type="button"
                  onClick={() => handleAddSkill(inputVal)}
                  className="w-full flex items-center gap-2 p-1.5 rounded-sm text-left hover:bg-zinc-100 transition-colors cursor-pointer border-b border-zinc-100 text-xs font-mono font-bold text-zinc-900"
                >
                  <Plus size={13} className="text-emerald-600 shrink-0" />
                  <span>
                    Add custom skill: <strong className="underline">"{inputVal.trim()}"</strong>
                  </span>
                </button>
              )}

              {filteredOptions.length > 0 ? (
                filteredOptions.slice(0, 20).map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddSkill(opt)}
                    className="w-full flex items-center justify-between p-1.5 rounded-sm text-left hover:bg-zinc-50 transition-colors cursor-pointer text-xs font-mono text-zinc-800"
                  >
                    <span>{opt}</span>
                    <Plus size={11} className="text-zinc-400" />
                  </button>
                ))
              ) : !cleanInput ? (
                <div className="p-2 text-center text-[11px] font-mono text-zinc-400">
                  Type to search all available skills...
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>

      {/* Quick Click Add Popular Pills */}
      {visibleSuggestions.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] font-mono uppercase text-zinc-400 flex items-center gap-1">
            <Sparkles size={10} /> Quick Add:
          </span>
          {visibleSuggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddSkill(sug)}
              className="px-2 py-0.5 rounded-[1px] bg-zinc-200/80 hover:bg-zinc-900 hover:text-white text-zinc-700 text-[10px] font-mono transition-all cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <span>+ {sug}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

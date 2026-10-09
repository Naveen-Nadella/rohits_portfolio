import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus, X } from 'lucide-react';

export const SearchableCombobox = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Type to search or select...',
  allowCustom = true,
  className = '',
  inputClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(value);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Sync internal search query if external value changes
  useEffect(() => {
    setSearchQuery(value || '');
  }, [value]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        // If query is not in list but allowCustom is true, keep it, else sync back
        if (allowCustom) {
          onChange(searchQuery);
        } else if (!options.includes(searchQuery)) {
          setSearchQuery(value || '');
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery, value, options, allowCustom, onChange]);

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Filter options
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(cleanQuery)
  );

  const exactMatch = options.some(
    (opt) => opt.toLowerCase() === cleanQuery
  );

  const handleSelectOption = (opt) => {
    setSearchQuery(opt);
    onChange(opt);
    setIsOpen(false);
  };

  const handleCustomAdd = () => {
    if (searchQuery.trim()) {
      onChange(searchQuery.trim());
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelectOption(filteredOptions[0]);
      } else if (allowCustom && searchQuery.trim()) {
        handleCustomAdd();
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onChange('');
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
            onChange(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full pr-14 pl-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 focus:bg-white rounded-sm text-xs sm:text-sm font-serif text-zinc-900 focus:outline-none transition-all ${inputClassName}`}
        />

        <div className="absolute right-2 flex items-center gap-1">
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-zinc-400 hover:text-zinc-800 rounded-sm cursor-pointer"
              title="Clear"
            >
              <X size={13} />
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              if (!isOpen && inputRef.current) inputRef.current.focus();
            }}
            className="p-1 text-zinc-400 hover:text-zinc-800 rounded-sm cursor-pointer"
            tabIndex={-1}
          >
            <ChevronDown
              size={14}
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-zinc-300 rounded-sm shadow-xl p-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          {/* Custom option prompt if typed text is not exact match */}
          {allowCustom && searchQuery.trim() && !exactMatch && (
            <button
              type="button"
              onClick={handleCustomAdd}
              className="w-full flex items-center gap-2 p-2 rounded-sm text-left hover:bg-zinc-100 transition-colors cursor-pointer border-b border-zinc-100 font-serif text-xs font-bold text-zinc-900"
            >
              <Plus size={13} className="text-emerald-600 shrink-0" />
              <span>
                Use custom: <strong className="underline">"{searchQuery.trim()}"</strong>
              </span>
            </button>
          )}

          {filteredOptions.length > 0 ? (
            filteredOptions.slice(0, 30).map((opt, idx) => {
              const isSelected = opt.toLowerCase() === value.toLowerCase();
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full flex items-center justify-between p-2 rounded-sm text-left transition-colors cursor-pointer text-xs font-serif ${
                    isSelected
                      ? 'bg-zinc-100 font-bold text-zinc-900 border-l-2 border-zinc-900'
                      : 'hover:bg-zinc-50 text-zinc-800'
                  }`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {isSelected && <Check size={13} className="text-zinc-900 shrink-0" />}
                </button>
              );
            })
          ) : !allowCustom ? (
            <div className="p-2 text-center text-xs text-zinc-400 font-mono">
              No matching options found.
            </div>
          ) : null}

          {filteredOptions.length > 30 && (
            <div className="p-1.5 text-center text-[10px] font-mono text-zinc-400 border-t border-zinc-100">
              +{filteredOptions.length - 30} more (type to refine search)
            </div>
          )}
        </div>
      )}
    </div>
  );
};

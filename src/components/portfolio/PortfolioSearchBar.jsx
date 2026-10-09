import React, { useState, useRef, useEffect } from 'react';
import { useTeam } from '../../context/TeamContext';
import { soundEngine } from '../../utils/audio';
import { Search, X, ArrowRight, Sparkles, Check, AlertCircle } from 'lucide-react';

export const PortfolioSearchBar = ({ variant = 'navbar', className = '' }) => {
  const {
    allMembers,
    activeMemberId,
    searchPortfolio,
    openGenerator,
    setActiveMemberId
  } = useTeam();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter members based on query
  const cleanQ = query.trim().toUpperCase();
  const suggestions = allMembers.filter((m) => {
    if (!cleanQ) return true;
    const matchId = (m.id || '').toUpperCase().includes(cleanQ);
    const matchPortId = (m.portfolioId || '').toUpperCase().includes(cleanQ);
    const matchName = (m.name || '').toUpperCase().includes(cleanQ);
    const matchAliases = Array.isArray(m.aliases) && m.aliases.some((a) => a.toUpperCase().includes(cleanQ));
    return matchId || matchPortId || matchName || matchAliases;
  });

  const handleSelect = (memberId) => {
    soundEngine.playBrushSwipe();
    setActiveMemberId(memberId);
    setQuery('');
    setIsOpen(false);
    setErrorMsg('');
    const heroEl = document.getElementById('hero');
    if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) {
      setErrorMsg('Please enter a Portfolio ID');
      return;
    }

    const res = searchPortfolio(query);
    if (res.success) {
      soundEngine.playChime(660, 0.8);
      setIsOpen(false);
      setErrorMsg('');
      setQuery('');
      const heroEl = document.getElementById('hero');
      if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      soundEngine.playChime(300, 0.5);
      setErrorMsg(res.error || 'Portfolio not found');
    }
  };

  // -------------------------------------------------------------
  // NAVBAR VARIANT: Compact, elegant, fits nicely in top navigation
  // -------------------------------------------------------------
  if (variant === 'navbar') {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <form onSubmit={handleSearchSubmit} className="relative flex items-center">
          <div className="relative flex items-center">
            <Search
              size={14}
              className="absolute left-3 text-zinc-400 pointer-events-none"
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setErrorMsg('');
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search ID (e.g. ROHIT-2026)..."
              className="pl-8 pr-7 py-1.5 w-44 sm:w-56 md:w-64 bg-white/95 border border-zinc-200 focus:border-zinc-900 rounded-full text-xs font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none shadow-2xs transition-all uppercase"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setErrorMsg('');
                }}
                className="absolute right-2.5 p-0.5 text-zinc-400 hover:text-zinc-900 cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </form>

        {/* Navbar Dropdown Suggestions */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-zinc-200 rounded-sm shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-2.5 py-1.5 border-b border-zinc-100 flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500">
              <span>PORTFOLIO DIRECTORY</span>
              <span>{suggestions.length} FOUND</span>
            </div>

            {errorMsg && (
              <div className="p-2.5 my-1 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono rounded-sm flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-600" />
                <div className="flex-1">
                  <div>{errorMsg}</div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      openGenerator();
                    }}
                    className="mt-1 text-[11px] font-bold text-rose-900 underline hover:text-black cursor-pointer block"
                  >
                    + Generate portfolio for "{query.toUpperCase()}"
                  </button>
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto py-1 space-y-1">
              {suggestions.length > 0 ? (
                suggestions.map((m) => {
                  const isActive = m.id === activeMemberId;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(m.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-sm text-left transition-colors cursor-pointer ${
                        isActive ? 'bg-zinc-100 border-l-2 border-zinc-900' : 'hover:bg-zinc-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-sm bg-zinc-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                          {m.monogram}
                        </span>
                        <div className="min-w-0">
                          <div className="font-serif text-xs font-bold text-zinc-900 truncate">
                            {m.name}
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                            <span className="bg-zinc-100 px-1 rounded-[1px] text-zinc-800 font-semibold">
                              ID: {m.id}
                            </span>
                            <span>• CGPA {m.scores?.btech?.replace('CGPA', '').trim()}</span>
                          </div>
                        </div>
                      </div>
                      {isActive && <Check size={14} className="text-zinc-900 shrink-0 ml-1.5" />}
                    </button>
                  );
                })
              ) : (
                <div className="p-3 text-center text-xs text-zinc-500 font-mono">
                  No matching portfolio ID found.
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-zinc-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  openGenerator();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-zinc-900 hover:bg-black text-white text-xs font-serif font-bold rounded-sm transition-colors cursor-pointer shadow-2xs"
              >
                <Sparkles size={12} />
                <span>+ Generate New Portfolio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // HERO VARIANT: Large, prominent lookup widget in the Hero Section
  // -------------------------------------------------------------
  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`} ref={containerRef}>
      <div className="bg-white/95 backdrop-blur-md border border-zinc-300/90 rounded-sm p-4 sm:p-5 shadow-lg relative">
        {/* Top subtle highlight */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-800 font-bold">
              PORTFOLIO ID LOOKUP // SEARCH OR SWITCH
            </span>
          </div>

          <button
            onClick={openGenerator}
            className="inline-flex items-center gap-1.5 text-xs font-serif text-zinc-900 hover:text-black font-bold uppercase tracking-wider underline cursor-pointer"
          >
            <Sparkles size={12} className="text-zinc-900" />
            <span>Generate Your Portfolio</span>
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setErrorMsg('');
                if (!isOpen) setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Enter Portfolio ID (e.g. ROHIT-2026, ASHRAF-2026, JAISAI-2026)..."
              className="w-full pl-10 pr-9 py-2.5 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 focus:bg-white rounded-sm text-xs sm:text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:outline-none transition-all uppercase"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setErrorMsg('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-900 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="submit"
            className="px-4 sm:px-6 py-2.5 bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-serif font-bold uppercase tracking-wider rounded-sm transition-all shadow-xs hover:shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <span>LOAD</span>
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Error notification */}
        {errorMsg && (
          <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono rounded-sm flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
              <div>
                <span>{errorMsg}</span>
              </div>
            </div>
            <button
              onClick={openGenerator}
              className="text-xs font-serif font-bold underline text-rose-900 hover:text-black cursor-pointer shrink-0"
            >
              + Create this ID
            </button>
          </div>
        )}

        {/* Dropdown Suggestions under Hero input */}
        {isOpen && query && (
          <div className="absolute left-4 right-4 mt-2 bg-white border border-zinc-200 rounded-sm shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="px-2.5 py-1 border-b border-zinc-100 flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500">
              <span>MATCHING CANDIDATES</span>
              <span>{suggestions.length} FOUND</span>
            </div>
            <div className="max-h-48 overflow-y-auto py-1 space-y-1">
              {suggestions.length > 0 ? (
                suggestions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(m.id)}
                    className="w-full flex items-center justify-between p-2 rounded-sm text-left hover:bg-zinc-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-sm bg-zinc-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                        {m.monogram}
                      </span>
                      <div>
                        <div className="font-serif text-xs font-bold text-zinc-900">{m.name}</div>
                        <div className="font-mono text-[10px] text-zinc-500">ID: {m.id}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-[1px]">
                      View Portfolio →
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-3 text-center text-xs text-zinc-500 font-mono">
                  No portfolio matches "{query.toUpperCase()}". You can generate one below!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Click Badges / Recent Candidate IDs */}
        <div className="mt-3.5 pt-3 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-[11px] uppercase text-zinc-500">
            QUICK SAMPLE IDS:
          </span>
          {allMembers.slice(0, 5).map((m) => (
            <button
              key={m.id}
              onClick={() => handleSelect(m.id)}
              className={`px-2.5 py-1 rounded-[1px] font-mono text-xs transition-all cursor-pointer border ${
                m.id === activeMemberId
                  ? 'bg-zinc-900 text-white border-zinc-900 font-bold shadow-2xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200 hover:border-zinc-400'
              }`}
              title={`Load portfolio for ${m.name}`}
            >
              <span>{m.id}</span>
              <span className="opacity-60 text-[10px] ml-1">({m.monogram})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

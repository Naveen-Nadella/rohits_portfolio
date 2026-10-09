import React, { useState } from 'react';
import { portfolioTemplates } from '../../data/templates';
import { soundEngine } from '../../utils/audio';
import { X, Check, Sparkles, ArrowRight, Palette, Layers, Star } from 'lucide-react';

export const TemplateSelectionModal = ({
  isOpen,
  onClose,
  onSelectTemplate,
  initialTemplateId = 'editorial'
}) => {
  const [selectedId, setSelectedId] = useState(initialTemplateId);

  if (!isOpen) return null;

  const handleSelect = (id) => {
    soundEngine.playBrushSwipe();
    setSelectedId(id);
  };

  const handleContinue = () => {
    soundEngine.playChime(660, 0.8);
    onSelectTemplate(selectedId);
  };

  const currentTemplate = portfolioTemplates.find((t) => t.id === selectedId) || portfolioTemplates[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-zinc-300 w-full max-w-4xl rounded-sm shadow-2xl relative my-auto overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Strip */}
        <div className="h-1 bg-gradient-to-r from-zinc-900 via-amber-600 to-indigo-600" />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 bg-[#F8F8F6] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-zinc-900 text-white font-mono text-sm font-bold flex items-center justify-center shadow-xs">
              <Palette size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-wide uppercase">
                  SELECT PORTFOLIO TEMPLATE
                </h2>
                <span className="px-2 py-0.5 bg-zinc-900 text-white text-[9px] font-mono font-bold tracking-widest uppercase rounded-[1px]">
                  STEP 1 OF 2
                </span>
              </div>
              <p className="font-mono text-xs text-zinc-500 mt-0.5">
                Choose an architectural aesthetic for your developer showcase. You will fill your credentials next.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Templates Grid - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {portfolioTemplates.map((template) => {
              const isSelected = template.id === selectedId;

              return (
                <div
                  key={template.id}
                  onClick={() => handleSelect(template.id)}
                  className={`border-2 rounded-sm p-5 transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-zinc-900 bg-zinc-50/80 shadow-lg ring-1 ring-zinc-900'
                      : 'border-zinc-200 hover:border-zinc-400 bg-white hover:shadow-md'
                  }`}
                >
                  {/* Selected check badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-zinc-900 text-white px-2 py-0.5 rounded-[1px] text-[10px] font-mono font-bold">
                      <Check size={12} />
                      <span>SELECTED</span>
                    </div>
                  )}

                  <div>
                    {/* Header: Badge & Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider rounded-[1px] ${template.badgeColor}`}>
                        {template.badge}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                        THEME ARCHITECTURE
                      </span>
                    </div>

                    {/* Template Name & Subtitle */}
                    <h3 className="font-serif text-lg font-bold text-zinc-900 mb-0.5">
                      {template.name}
                    </h3>
                    <p className="font-mono text-[11px] text-zinc-500 mb-3">
                      {template.subtitle}
                    </p>

                    {/* Live Visual Preview Card Mockup */}
                    <div className={`p-4 rounded-sm border ${template.previewBorder} ${template.previewBg} mb-4 relative overflow-hidden transition-all shadow-2xs`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-2xs"
                            style={{ backgroundColor: template.accentColor }}
                          >
                            PF
                          </div>
                          <span className={`font-serif text-xs font-bold ${template.previewText}`}>
                            Jane Doe
                          </span>
                        </div>
                        <span className="text-[9px] font-mono opacity-70">B.Tech • 8.5 CGPA</span>
                      </div>

                      <div className={`p-2.5 rounded-sm border ${template.previewBorder} ${template.previewCardBg} mb-2 shadow-2xs`}>
                        <div className="text-[10px] font-mono font-semibold mb-1 opacity-80">
                          {template.tags.join(' • ')}
                        </div>
                        <div className="text-[10px] line-clamp-2 leading-relaxed opacity-90">
                          {template.description}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {template.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono px-1.5 py-0.5 rounded-[1px] bg-black/10 dark:bg-white/10 opacity-80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features List */}
                    <div className="space-y-1.5 mb-4">
                      {template.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-zinc-600">
                          <span className="text-zinc-900 font-bold mt-0.5">•</span>
                          <span className="font-editorial text-[13px] leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Best For Tag */}
                  <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500 text-[10px]">
                      Recommended: {template.recommendedFor.split(',')[0]}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(template.id);
                      }}
                      className={`px-2.5 py-1 rounded-[1px] font-serif text-[11px] font-bold uppercase transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                      }`}
                    >
                      {isSelected ? 'Ready ✓' : 'Select'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 bg-[#F8F8F6] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
            <span>Selected:</span>
            <strong className="text-zinc-900 font-serif font-bold uppercase">
              {currentTemplate.name}
            </strong>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 hover:border-zinc-900 text-zinc-800 font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white font-serif text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
            >
              <span>USE THIS TEMPLATE & ENTER DETAILS</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useTeam } from '../../context/TeamContext';
import { soundEngine } from '../../utils/audio';
import { RedSeal } from '../common/RedSeal';
import {
  X,
  Check,
  Copy,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Search,
  FileText
} from 'lucide-react';

export const PortfolioSuccessModal = () => {
  const {
    isSuccessModalOpen,
    closeSuccessModal,
    newlyGeneratedId,
    activeMember,
    showToast,
    openResumeModal
  } = useTeam();

  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isSuccessModalOpen || !newlyGeneratedId) return null;

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?id=${newlyGeneratedId}`
      : `?id=${newlyGeneratedId}`;

  const handleCopyId = () => {
    soundEngine.playBrushSwipe();
    navigator.clipboard?.writeText(newlyGeneratedId);
    setCopiedId(true);
    showToast(`Copied Portfolio ID: ${newlyGeneratedId}`, 'success');
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleCopyLink = () => {
    soundEngine.playBrushSwipe();
    navigator.clipboard?.writeText(currentUrl);
    setCopiedLink(true);
    showToast('Shareable portfolio link copied to clipboard!', 'success');
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleViewNow = () => {
    soundEngine.playChime(660, 0.8);
    closeSuccessModal();
    const heroEl = document.getElementById('hero');
    if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSuccessModal}
    >
      <div
        className="bg-white border border-zinc-300 w-full max-w-lg rounded-sm shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gold/ink accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-zinc-900 via-amber-600 to-zinc-900" />

        <div className="p-6 sm:p-8 text-center">
          {/* Close button */}
          <button
            onClick={closeSuccessModal}
            className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-sm cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Icon / Monogram Seal */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <RedSeal char={activeMember.monogram || 'PF'} size="lg" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Check size={14} />
              </div>
            </div>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 tracking-wide uppercase mb-1">
            PORTFOLIO GENERATED!
          </h2>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-6">
            DOSSIER REGISTERED • UNIQUE ACCESS ID ASSIGNED
          </p>

          {/* Primary ID Card */}
          <div className="bg-zinc-900 text-white rounded-sm p-5 sm:p-6 mb-6 shadow-xl relative overflow-hidden border border-zinc-800">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent pointer-events-none" />

            <div className="flex items-center justify-between text-zinc-400 text-[10px] font-mono tracking-widest uppercase mb-2">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                VERIFIED PORTFOLIO ID
              </span>
              <span>{activeMember.university}</span>
            </div>

            {/* Giant Monospace ID */}
            <div className="my-3 font-mono text-2xl sm:text-3xl font-black tracking-widest text-white selection:bg-white selection:text-black">
              {newlyGeneratedId}
            </div>

            <div className="text-zinc-400 text-xs font-serif mb-4">
              Registered for: <strong className="text-white">{activeMember.name}</strong>
            </div>

            {/* Copy ID Button */}
            <button
              onClick={handleCopyId}
              className={`w-full py-2.5 rounded-sm font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                copiedId
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              {copiedId ? (
                <>
                  <Check size={14} />
                  <span>COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>COPY PORTFOLIO ID</span>
                </>
              )}
            </button>
          </div>

          {/* Search Bar Tip */}
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-sm text-left mb-6 flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
              <Search size={14} />
            </div>
            <div className="text-xs text-zinc-700 font-editorial leading-relaxed">
              <strong className="text-zinc-900 block font-serif font-bold mb-0.5">
                How to View Your Portfolio:
              </strong>
              Anyone can enter your ID (<strong>{newlyGeneratedId}</strong>) into the search bar at the top of this site to display your portfolio anytime.
            </div>
          </div>

          {/* Direct Link Share */}
          <div className="mb-6 text-left">
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1 font-semibold">
              Shareable Direct Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 px-3 py-1.5 bg-zinc-50 border border-zinc-200 rounded-sm text-xs font-mono text-zinc-700 select-all focus:outline-none truncate"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-zinc-800 font-mono text-xs rounded-sm transition-colors cursor-pointer shrink-0"
              >
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={handleViewNow}
              className="w-full sm:flex-1 py-3 bg-zinc-900 hover:bg-black text-white font-serif text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>VIEW PORTFOLIO</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                closeSuccessModal();
                openResumeModal();
              }}
              className="w-full sm:flex-1 py-3 bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 font-serif text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
              title="Download your newly generated resume as PDF"
            >
              <FileText size={14} className="text-zinc-700" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

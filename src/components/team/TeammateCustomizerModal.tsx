import React, { useState, useEffect } from 'react';
import { useTeam } from '../../context/TeamContext';
import { X, Check, RotateCcw, UserCheck, Sparkles, GraduationCap, Phone, Mail, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { soundEngine } from '../../utils/audio';

export const TeammateCustomizerModal: React.FC = () => {
  const {
    isCustomizerOpen,
    closeCustomizer,
    customizingMemberId,
    allMembers,
    updateMember,
    setActiveMemberId,
    activeMemberId,
    resetAllMembers
  } = useTeam();

  const [selectedId, setSelectedId] = useState<string>(customizingMemberId || activeMemberId);
  const [formData, setFormData] = useState({
    name: '',
    monogram: '',
    title: '',
    email: '',
    phone: '',
    tenth: '',
    intermediate: '',
    btech: '',
    photo: '',
    github: '',
    linkedin: ''
  });
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (customizingMemberId) {
      setSelectedId(customizingMemberId);
    }
  }, [customizingMemberId]);

  const currentMember = allMembers.find((m) => m.id === selectedId) || allMembers[0];

  useEffect(() => {
    if (currentMember) {
      setFormData({
        name: currentMember.name,
        monogram: currentMember.monogram,
        title: currentMember.title,
        email: currentMember.email,
        phone: currentMember.phone,
        tenth: currentMember.scores.tenth,
        intermediate: currentMember.scores.intermediate,
        btech: currentMember.scores.btech,
        photo: currentMember.photo || '',
        github: currentMember.github || '',
        linkedin: currentMember.linkedin || ''
      });
    }
  }, [selectedId, currentMember]);

  if (!isCustomizerOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playChime(660, 0.8);
    updateMember(selectedId, {
      name: formData.name,
      monogram: formData.monogram || formData.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      title: formData.title,
      email: formData.email,
      phone: formData.phone,
      cgpa: formData.btech.includes('/') ? formData.btech : `${formData.btech} / 10.0`,
      photo: formData.photo,
      github: formData.github,
      linkedin: formData.linkedin,
      scores: {
        tenth: formData.tenth,
        intermediate: formData.intermediate,
        btech: formData.btech,
        university: 'KL University'
      }
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleSelectActive = () => {
    soundEngine.playBrushSwipe();
    setActiveMemberId(selectedId);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={closeCustomizer}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-zinc-200 rounded-sm shadow-2xl p-6 sm:p-8 text-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-zinc-900 text-white flex items-center justify-center font-mono font-bold text-xs">
              TEAM
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-zinc-900">
                Customize Teammate Details
              </h2>
              <p className="text-xs text-zinc-500 font-sans">
                Tailor credentials, contact channels, and photographs for all 3 team members
              </p>
            </div>
          </div>

          <button
            onClick={closeCustomizer}
            className="p-1.5 rounded-sm hover:bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            aria-label="Close customizer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Member Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 p-1.5 bg-zinc-100 rounded-sm border border-zinc-200">
          {allMembers.map((m) => {
            const isTabActive = m.id === selectedId;
            const isCurrentActive = m.id === activeMemberId;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  soundEngine.playBrushSwipe();
                  setSelectedId(m.id);
                }}
                className={`flex-1 min-w-[130px] px-3 py-2 text-xs font-serif rounded-sm transition-all flex items-center justify-between gap-1.5 cursor-pointer ${
                  isTabActive
                    ? 'bg-white text-zinc-900 font-bold shadow-sm border border-zinc-300'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-5 h-5 rounded-sm bg-zinc-900 text-white text-[10px] font-mono flex items-center justify-center shrink-0">
                    {m.monogram}
                  </span>
                  <span className="truncate">{m.name}</span>
                </div>
                {isCurrentActive && (
                  <span className="text-[9px] font-mono text-zinc-900 font-semibold bg-zinc-200 px-1.5 py-0.2 rounded shrink-0">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Toggle Banner */}
        <div className="flex items-center justify-between p-3 mb-6 bg-zinc-50 border border-zinc-200 rounded-sm">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-serif font-bold text-zinc-900">{currentMember.name}</span>
            <span className="text-zinc-500">•</span>
            <span className="font-mono text-zinc-600">B.Tech CGPA: {currentMember.scores.btech}</span>
          </div>
          {activeMemberId !== selectedId ? (
            <button
              type="button"
              onClick={handleSelectActive}
              className="px-3 py-1 bg-zinc-900 hover:bg-black text-white text-xs font-serif rounded-sm flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <UserCheck size={13} />
              <span>Switch to this Profile</span>
            </button>
          ) : (
            <span className="text-xs font-mono text-zinc-900 font-semibold flex items-center gap-1">
              <Check size={14} className="text-zinc-900" />
              Currently Active Profile
            </span>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-xs sm:text-sm bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
                Monogram Initials (2 chars)
              </label>
              <input
                type="text"
                name="monogram"
                maxLength={3}
                value={formData.monogram}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors uppercase font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
              Title & Specialization
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
            />
          </div>

          {/* Academic Scores Section */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-800 font-semibold mb-3">
              <GraduationCap size={15} />
              <span>Academic Scorecard Inscriptions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                  10th Grade Score
                </label>
                <input
                  type="text"
                  name="tenth"
                  placeholder="e.g. 521 / 600"
                  value={formData.tenth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                  Intermediate Score
                </label>
                <input
                  type="text"
                  name="intermediate"
                  placeholder="e.g. 788 / 1000"
                  value={formData.intermediate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-500 mb-1">
                  B.Tech CGPA
                </label>
                <input
                  type="text"
                  name="btech"
                  placeholder="e.g. 7.7"
                  value={formData.btech}
                  onChange={handleInputChange}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
                <Mail size={12} />
                <span>Electronic Mail</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
                <Phone size={12} />
                <span>Voice Contact</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white"
              />
            </div>
          </div>

          {/* Photograph Path */}
          <div>
            <label className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
              <span className="flex items-center gap-1">
                <ImageIcon size={12} />
                <span>Photograph Path or URL</span>
              </span>
              <span className="text-[10px] text-zinc-400 lowercase">
                displayed once in hero section
              </span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="/images/rohit-pass-photo.jpeg or URL"
              value={formData.photo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900 focus:bg-white"
            />
          </div>

          {/* Online Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
                <LinkIcon size={12} />
                <span>GitHub Profile URL</span>
              </label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-zinc-600 mb-1">
                <LinkIcon size={12} />
                <span>LinkedIn Profile URL</span>
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-300 rounded-sm focus:outline-none focus:border-zinc-900"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={resetAllMembers}
              className="text-xs font-mono text-zinc-500 hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw size={12} />
              <span>Reset All to Defaults</span>
            </button>

            <div className="flex items-center gap-3">
              {savedNotice && (
                <span className="text-xs font-mono text-emerald-600 flex items-center gap-1">
                  <Check size={14} />
                  Changes Saved!
                </span>
              )}
              <button
                type="button"
                onClick={closeCustomizer}
                className="px-4 py-2 border border-zinc-300 text-zinc-700 hover:bg-zinc-100 rounded-sm text-xs font-serif cursor-pointer transition-colors"
              >
                Done
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-zinc-900 hover:bg-black text-white rounded-sm text-xs font-serif font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Sparkles size={13} />
                <span>Save Inscription</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useRef } from 'react';
import { useTeam } from '../../context/TeamContext';
import { skillsData } from '../../data/skills';
import { projectsData } from '../../data/projects';
import { experienceData } from '../../data/experience';
import { certificationsData } from '../../data/certifications';
import { resumeTemplates, getResumeTemplateById } from '../../data/resumeTemplates';
import {
  ModernAtsTemplate,
  ExecutiveEditorialTemplate,
  SidebarSplitTemplate,
  TechMinimalTemplate
} from './ResumeTemplates';
import { downloadElementAsPdf, getResumeFilename } from '../../utils/pdfGenerator';
import { soundEngine } from '../../utils/audio';
import {
  X,
  Download,
  FileText,
  Sparkles,
  Check,
  Printer,
  ChevronRight,
  Loader2
} from 'lucide-react';

export const ResumeDownloadModal = ({ isOpen, onClose, candidateMember }) => {
  const { activeMember } = useTeam();
  const currentMember = candidateMember || activeMember;

  const [selectedTemplateId, setSelectedTemplateId] = useState('modern-ats');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const documentRef = useRef(null);

  if (!isOpen || !currentMember) return null;

  // Active candidate details
  const activeSkills = currentMember.skills || skillsData;
  const activeProjects = currentMember.projects || projectsData;
  const activeExperience = currentMember.experience || experienceData;
  const activeCerts = currentMember.certifications || certificationsData;

  const filename = getResumeFilename(currentMember.name);
  const selectedTemplate = getResumeTemplateById(selectedTemplateId);

  // Template component map
  const renderSelectedTemplate = () => {
    const props = {
      member: currentMember,
      skills: activeSkills,
      projects: activeProjects,
      experience: activeExperience,
      certs: activeCerts
    };

    switch (selectedTemplateId) {
      case 'modern-ats':
        return <ModernAtsTemplate {...props} />;
      case 'executive-editorial':
        return <ExecutiveEditorialTemplate {...props} />;
      case 'sidebar-split':
        return <SidebarSplitTemplate {...props} />;
      case 'tech-minimal':
        return <TechMinimalTemplate {...props} />;
      default:
        return <ModernAtsTemplate {...props} />;
    }
  };

  const handleDownload = async () => {
    if (isExporting || !documentRef.current) return;
    setIsExporting(true);
    setExportSuccess(false);
    soundEngine.playChime(660, 0.8);

    try {
      const success = await downloadElementAsPdf(documentRef.current, filename);
      if (success) {
        soundEngine.playSuccess();
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 4000);
      }
    } catch (err) {
      console.error('PDF export failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white border border-zinc-300 w-full max-w-5xl rounded-sm shadow-2xl relative my-auto overflow-hidden animate-in zoom-in-95 duration-200 max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-200 bg-[#F7F7F5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-zinc-900 text-white flex items-center justify-center shadow-xs">
              <FileText size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base sm:text-lg font-bold text-zinc-900 tracking-wide uppercase">
                  DOWNLOAD RESUME (PDF)
                </h2>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold uppercase rounded-[1px]">
                  PDF READY
                </span>
              </div>
              <p className="font-mono text-xs text-zinc-500 mt-0.5">
                Target Filename: <span className="font-bold text-zinc-900 underline">{filename}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-mono font-semibold rounded-sm border border-zinc-300 transition-colors cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded-sm transition-colors cursor-pointer"
              aria-label="Close resume exporter"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Template Selector Bar */}
        <div className="border-b border-zinc-200 bg-zinc-100/80 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="font-mono text-[11px] font-bold uppercase text-zinc-500 whitespace-nowrap mr-1">
            Template:
          </span>
          {resumeTemplates.map((template) => {
            const isSelected = selectedTemplateId === template.id;
            return (
              <button
                key={template.id}
                type="button"
                onClick={() => {
                  soundEngine.playBrushSwipe();
                  setSelectedTemplateId(template.id);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-serif font-bold uppercase whitespace-nowrap cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                    : 'bg-white border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:bg-zinc-50'
                }`}
              >
                <span>{template.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-[1px] text-[9px] font-mono font-bold ${
                    isSelected ? 'bg-white/20 text-white' : template.badgeColor
                  }`}
                >
                  {template.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Preview Paper Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-zinc-200/70 flex justify-center items-start">
          <div className="w-full max-w-[800px] shadow-2xl bg-white border border-zinc-300 rounded-xs overflow-hidden transition-all duration-200">
            {/* The element targeted by html2pdf for print and PDF export */}
            <div ref={documentRef} id="resume-print-document" className="w-full">
              {renderSelectedTemplate()}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 bg-[#F7F7F5] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
            <span className="font-semibold text-zinc-900">{selectedTemplate.name}</span>
            <span>•</span>
            <span className="hidden sm:inline text-zinc-500">{selectedTemplate.tagline}</span>
          </div>

          <div className="flex items-center gap-3">
            {exportSuccess && (
              <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-mono font-bold animate-in fade-in duration-200">
                <Check size={14} /> Downloaded {filename}!
              </span>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-zinc-300 hover:border-zinc-900 text-zinc-800 font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white font-serif text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50 group"
            >
              {isExporting ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>GENERATING PDF...</span>
                </>
              ) : (
                <>
                  <Download size={14} className="text-white group-hover:-translate-y-0.5 transition-transform" />
                  <span>DOWNLOAD PDF ({filename})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

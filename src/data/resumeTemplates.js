// Resume Templates Metadata & Configuration

export const resumeTemplates = [
  {
    id: 'modern-ats',
    name: 'Modern ATS Standard',
    tagline: 'Silicon Valley Standard • 1-Column ATS Optimized',
    description: 'Clean single-column layout with high contrast, crisp typography, and optimal scannability for Applicant Tracking Systems and tech recruiters.',
    badge: 'RECOMMENDED',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accentColor: '#18181B',
    styleClass: 'font-sans'
  },
  {
    id: 'executive-editorial',
    name: 'Executive Editorial',
    tagline: 'New York Times Inspired • Classical Elegance',
    description: 'Distinguished serif typography with refined horizontal rules, classical chapter seals, and traditional academic prestige.',
    badge: 'CLASSICAL',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    accentColor: '#451A03',
    styleClass: 'font-serif'
  },
  {
    id: 'sidebar-split',
    name: 'Dual-Column Tech',
    tagline: 'Modern 2-Column • Sidebar Skills & Contact',
    description: 'Contemporary dual-column format featuring an anchored left sidebar for contact, education scorecard, and skill pills, paired with an expansive project showcase.',
    badge: 'CREATIVE',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    accentColor: '#1E293B',
    styleClass: 'font-sans'
  },
  {
    id: 'tech-minimal',
    name: 'Obsidian Minimalist',
    tagline: 'Contemporary Software Engineer • High-Impact Badges',
    description: 'Monospace metadata tags, crisp tech pill containers, dark accent dividers, and structured engineering metric highlights.',
    badge: 'DEV FOCUS',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    accentColor: '#09090B',
    styleClass: 'font-mono'
  }
];

export const getResumeTemplateById = (id) =>
  resumeTemplates.find((t) => t.id === id) || resumeTemplates[0];

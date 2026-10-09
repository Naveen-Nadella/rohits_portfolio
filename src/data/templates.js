export const portfolioTemplates = [
  {
    id: 'editorial',
    name: 'Imperial Editorial',
    subtitle: 'Classical Archival & Red Seal Inscription',
    badge: 'CLASSICAL INK',
    badgeColor: 'bg-zinc-900 text-white',
    description: 'Inspired by ancient manuscript records and classical Japanese calligraphy. Features warm ivory parchment tones, crimson seals, and refined serif editorial typography.',
    accentColor: '#0F172A',
    secondaryColor: '#B91C1C',
    themeClass: 'theme-editorial',
    previewBg: 'bg-[#EAEAE7]',
    previewCardBg: 'bg-white',
    previewText: 'text-[#0F172A]',
    previewBorder: 'border-zinc-300',
    tags: ['Classical Ink', 'Red Seals', 'Ivory Parchment', 'Editorial Typography'],
    features: [
      'Authentic calligraphic Red Seal monogram badges',
      'Interactive HTML5 Canvas Japanese ink constellation physics',
      'Archival dossier academic scorecards & manuscript frames',
      'Subtle monochrome depth with warm parchment paper background'
    ],
    recommendedFor: 'Students & engineers seeking a timeless, intellectual, and memorable presentation.'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Matrix',
    subtitle: 'Obsidian Terminal & Neon Glow Architecture',
    badge: 'DARK CYBER',
    badgeColor: 'bg-emerald-950 text-emerald-400 border border-emerald-500/40',
    description: 'High-tech developer console with obsidian dark aesthetic, glowing matrix circuit accents, electric neon cyan and emerald indicators, and futuristic code chips.',
    accentColor: '#00F0FF',
    secondaryColor: '#10B981',
    themeClass: 'theme-cyberpunk',
    previewBg: 'bg-[#090D16]',
    previewCardBg: 'bg-[#111827]',
    previewText: 'text-slate-100',
    previewBorder: 'border-emerald-500/30',
    tags: ['Dark Mode', 'Neon Cyan', 'Matrix Emerald', 'Terminal Console'],
    features: [
      'Glow-accented tech stack chips and matrix grid backgrounds',
      'High-contrast neon cyan & emerald data metric indicators',
      'Futuristic terminal prompts and monospace telemetry cards',
      'Dark obsidian surfaces optimized for night-time recruiter browsing'
    ],
    recommendedFor: 'Full-stack developers, cybersecurity specialists, and systems programmers.'
  },
  {
    id: 'minimalist',
    name: 'Modernist SaaS Studio',
    subtitle: 'Frosted Glassmorphism & Indigo Horizon',
    badge: 'CLEAN SAAS',
    badgeColor: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    description: 'Crisp contemporary Swiss aesthetics with sleek frosted glass cards, soft indigo ambient glow, modern Inter typography, and refined clean utility tokens.',
    accentColor: '#4F46E5',
    secondaryColor: '#818CF8',
    themeClass: 'theme-minimalist',
    previewBg: 'bg-[#F8FAFC]',
    previewCardBg: 'bg-white/90 backdrop-blur-md',
    previewText: 'text-slate-900',
    previewBorder: 'border-slate-200',
    tags: ['Glassmorphism', 'Indigo Glow', 'Minimalist', 'Modern SaaS'],
    features: [
      'Sleek frosted glassmorphism cards with subtle boundary glow',
      'Modern indigo and violet gradient badges & metric counters',
      'Distraction-free minimalist layout with maximum legibility',
      'Crisp product-engineer aesthetic popular in modern Silicon Valley teams'
    ],
    recommendedFor: 'Product engineers, frontend architects, and modern web application developers.'
  },
  {
    id: 'obsidian',
    name: 'Obsidian Luxe',
    subtitle: 'Midnight Black & Champagne Gold Horizon',
    badge: 'GOLD LUXE',
    badgeColor: 'bg-amber-950/80 text-amber-300 border border-amber-500/30',
    description: 'Elite executive dark palette featuring velvet midnight black backgrounds, champagne gold accents, platinum typography, and luxury engineering dossier styling.',
    accentColor: '#F59E0B',
    secondaryColor: '#D97706',
    themeClass: 'theme-obsidian',
    previewBg: 'bg-[#09090B]',
    previewCardBg: 'bg-[#141416]',
    previewText: 'text-zinc-100',
    previewBorder: 'border-amber-600/30',
    tags: ['Midnight Obsidian', 'Champagne Gold', 'Executive', 'High Contrast'],
    features: [
      'Champagne gold embossed insignia and luxury border filaments',
      'Deep midnight black depth with warm atmospheric glow',
      'Distinguished executive typography and verified merit plaques',
      'Ultra-premium polish that exudes seniority and technical excellence'
    ],
    recommendedFor: 'Senior engineers, technical leads, and standout academic achievers.'
  }
];

export const getTemplateById = (templateId) => {
  return portfolioTemplates.find((t) => t.id === templateId) || portfolioTemplates[0];
};

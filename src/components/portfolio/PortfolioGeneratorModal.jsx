import React, { useState, useEffect } from 'react';
import { useTeam } from '../../context/TeamContext';
import { useAuth } from '../../context/AuthContext';
import { getTemplateById } from '../../data/templates';
import { soundEngine } from '../../utils/audio';
import {
  X,
  Sparkles,
  Upload,
  User,
  GraduationCap,
  Code2,
  Key,
  Check,
  AlertCircle,
  Camera
} from 'lucide-react';
import { SearchableCombobox } from '../common/SearchableCombobox';
import { MultiSkillPicker } from '../common/MultiSkillPicker';
import {
  universitiesList,
  professionalTitlesList,
  degreesList,
  academicYearsList,
  schoolBoardsList,
  skillsCatalog,
  sampleAvatars
} from '../../data/prefillData';

export const PortfolioGeneratorModal = ({
  selectedTemplateId = 'editorial',
  onOpenTemplatePicker
}) => {
  const { isGeneratorOpen, closeGenerator, createPortfolio, allMembers } = useTeam();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState('identity');
  const [errorMsg, setErrorMsg] = useState('');

  const currentTemplate = getTemplateById(selectedTemplateId);

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    monogram: currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : '',
    title: 'Software Engineer & Web Developer',
    subtitle: 'B.Tech in Computer Science & Engineering',
    academicYear: '2nd Year Undergraduate (2024 – 2028)',
    university: 'KL University',
    schoolBoard: 'Central Board of Secondary Education (CBSE)',
    location: 'India',
    tagline: 'Crafting responsive web interfaces, modern applications, and clean software solutions.',
    btech: '7.8 / 10.0',
    intermediate: '920 / 1000',
    tenth: '510 / 600',
    email: currentUser?.email || '',
    phone: '+91 98765 43210',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    bioP1: '',
    bioP2: '',
    bioP3: '',
    photo: '',
    customId: '',
    // Skills
    languages: ['Java', 'Python', 'C', 'JavaScript (ES6+)', 'SQL'],
    frontend: ['React.js', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive Web Design'],
    coreCs: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Database Management Systems (DBMS)'],
    tools: ['Git & GitHub', 'VS Code', 'Vite', 'Postman'],
    // Featured Project
    projectTitle: 'Personal Portfolio Hub',
    projectCategory: 'Web & Frontend',
    projectDescription: 'Interactive portfolio web application with dynamic ID lookup, responsive modern design, and component-driven architecture.',
    projectTech: 'React.js, Tailwind CSS, Vite, LocalStorage API',
    projectGithub: 'https://github.com'
  });

  // Update name/email if user logs in
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        monogram: prev.monogram || (currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : '')
      }));
    }
  }, [currentUser]);

  if (!isGeneratorOpen) return null;

  // Derive suggested ID
  const firstWord = (formData.name || '').trim().split(' ')[0].replace(/[^a-zA-Z]/g, '').toUpperCase() || 'PORT';
  const suggestedId = `${firstWord}-2026`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'name' && !prev.monogram) {
        next.monogram = value.split(' ').map((n) => n[0]).filter(Boolean).join('').slice(0, 2).toUpperCase();
      }
      return next;
    });
    setErrorMsg('');
  };

  // Image file upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, photo: event.target?.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick prefill demo data for 1-click testing
  const handlePrefillDemo = () => {
    soundEngine.playBrushSwipe();
    const demoNames = [
      { name: 'Kavya Sharma', title: 'Software Engineer & Full-Stack Developer', cgpa: '8.4 / 10.0', inter: '945 / 1000', tenth: '542 / 600', email: 'kavya.sharma@example.com' },
      { name: 'Vikram Aditya', title: 'Frontend Architect & UI Engineer', cgpa: '7.9 / 10.0', inter: '915 / 1000', tenth: '512 / 600', email: 'vikram.aditya@example.com' },
      { name: 'Ananya Reddy', title: 'Backend & Cloud Systems Engineer', cgpa: '8.7 / 10.0', inter: '960 / 1000', tenth: '560 / 600', email: 'ananya.reddy@example.com' }
    ];
    const pick = demoNames[Math.floor(Math.random() * demoNames.length)];
    const initials = pick.name.split(' ').map((n) => n[0]).join('').toUpperCase();
    const randId = `${pick.name.split(' ')[0].toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    setFormData((prev) => ({
      ...prev,
      name: pick.name,
      monogram: initials,
      title: pick.title,
      subtitle: 'B.Tech in Computer Science & Engineering',
      academicYear: '2nd Year Undergraduate (2024 – 2028)',
      university: 'KL University',
      schoolBoard: 'Central Board of Secondary Education (CBSE)',
      tagline: 'Passionate about engineering scalable web architectures, algorithmic efficiency, and clean code.',
      btech: pick.cgpa,
      intermediate: pick.inter,
      tenth: pick.tenth,
      email: pick.email,
      phone: '+91 94401 23456',
      github: `https://github.com/${pick.name.toLowerCase().replace(' ', '-')}`,
      linkedin: `https://linkedin.com/in/${pick.name.toLowerCase().replace(' ', '-')}`,
      customId: randId,
      languages: ['Java', 'Python', 'C', 'JavaScript (ES6+)', 'SQL'],
      frontend: ['React.js', 'HTML5 & CSS3', 'Tailwind CSS', 'Responsive Web Design'],
      coreCs: ['Data Structures & Algorithms', 'Object-Oriented Programming (OOP)', 'Database Management Systems (DBMS)'],
      tools: ['Git & GitHub', 'VS Code', 'Vite', 'Postman'],
      bioP1: `Passionate B.Tech 2nd Year Computer Science & Engineering undergraduate at KL University (CGPA: ${pick.cgpa}) with dedicated focus on modern web development and software engineering.`,
      bioP2: `Strong foundation in Object-Oriented Programming (Java, C, Python), Data Structures, and Relational Database Systems, continuously building responsive web interfaces.`,
      bioP3: `Driven to engineer high-performance digital experiences, clean component-driven systems, and scalable applications.`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Candidate Full Name is required.');
      setActiveTab('identity');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('Email address is required.');
      setActiveTab('academics');
      return;
    }

    const finalId = formData.customId.trim().toUpperCase() || suggestedId;

    // Check if ID already exists
    if (allMembers.some((m) => m.id.toUpperCase() === finalId)) {
      setErrorMsg(`Portfolio ID "${finalId}" already exists. Please choose a unique ID.`);
      setActiveTab('id');
      return;
    }

    soundEngine.playChime(660, 0.9);

    // Parse skills array safely from array or comma-separated string
    const parseSkills = (val) => {
      if (Array.isArray(val)) return val.map((s) => (typeof s === 'string' ? s.trim() : (s?.name || ''))).filter(Boolean);
      if (typeof val === 'string') return val.split(',').map((s) => s.trim()).filter(Boolean);
      return [];
    };

    // Format custom skills
    const customSkills = [
      {
        title: 'PROGRAMMING LANGUAGES',
        sealCode: '01',
        description: 'Core programming languages mastered through coursework and project building.',
        skills: parseSkills(formData.languages).map((s) => ({
          name: s,
          level: 'Proficient',
          description: `Applied ${s} in algorithmic problem solving and development.`,
          featured: true
        }))
      },
      {
        title: 'WEB & FRONTEND DEVELOPMENT',
        sealCode: '02',
        description: 'Modern frontend libraries, responsive layout design, and component architecture.',
        skills: parseSkills(formData.frontend).map((s) => ({
          name: s,
          level: 'Proficient',
          description: `Applied ${s} in modern web design and responsive UI building.`,
          featured: true
        }))
      },
      {
        title: 'CORE COMPUTER SCIENCE',
        sealCode: '03',
        description: 'Theoretical grounding and computational principles established through curriculum.',
        skills: parseSkills(formData.coreCs).map((s) => ({
          name: s,
          level: 'Core Knowledge',
          description: `Strong conceptual and practical grasp of ${s}.`,
          featured: true
        }))
      },
      {
        title: 'DEVELOPER TOOLS & PLATFORMS',
        sealCode: '04',
        description: 'Version control workflows, build tooling, and IDE environments.',
        skills: parseSkills(formData.tools).map((s) => ({
          name: s,
          level: 'Daily Tool',
          description: `Utilized ${s} for version control and development productivity.`,
          featured: true
        }))
      }
    ];

    // Format custom project
    const customProjects = [
      {
        id: `project-${Date.now()}`,
        title: formData.projectTitle || 'Web Application Project',
        subtitle: 'Responsive Web Development Showcase',
        sealCode: '01',
        category: formData.projectCategory || 'Web & Frontend',
        description: formData.projectDescription || 'A modern web application built with clean architecture and responsive UI.',
        longDescription: formData.projectDescription || 'Comprehensive web application demonstrating solid frontend principles and clean code hygiene.',
        problemSolved: 'Streamlines user workflow through responsive and intuitive interface design.',
        architecture: 'Component-driven frontend with modular architecture and clean state management.',
        technologies: formData.projectTech.split(',').map((t) => t.trim()).filter(Boolean),
        keyFeatures: [
          'Modular component architecture with responsive layout across mobile and desktop devices.',
          'Intuitive user interactions with instant feedback and clean design tokens.',
          'Optimized performance with fast load times and clean code hygiene.'
        ],
        challenges: ['Ensuring high performance and cross-viewport responsive consistency.'],
        solutions: ['Structured modular layout containers and streamlined state updates.'],
        metrics: ['100% Mobile & Desktop Responsive', 'Clean Modular Codebase', 'Fast Interactive Response'],
        githubUrl: formData.projectGithub || formData.github,
        liveUrl: '#',
        featured: true
      }
    ];

    // Format custom experience milestones
    const customExperience = [
      {
        id: 'university-milestone',
        year: '2024 – Present',
        period: formData.academicYear || '2nd Year Undergraduate (2024 – 2028)',
        sealCode: 'EDU',
        title: formData.subtitle || 'B.Tech in Computer Science & Engineering',
        organization: formData.university || 'KL University',
        type: 'education',
        grade: `CGPA: ${formData.btech}`,
        summary: `Undergraduate computer science engineering studies emphasizing core algorithmic foundations, object-oriented software engineering, relational databases, and modern web application development.`,
        highlights: [
          'Currently pursuing 2nd year of B.Tech CSE, cultivating solid foundations in problem solving and structured programming.',
          'Hands-on coursework covering Data Structures & Algorithms, Object-Oriented Programming (Java/C), and Database Management Systems.',
          'Actively developing responsive web applications and interactive projects using React.js and modern developer tools.'
        ],
        technologies: ['Java', 'Python', 'C', 'Data Structures', 'React.js', 'MySQL', 'Web Development']
      },
      {
        id: 'web-project-milestone',
        year: '2025 – 2026',
        period: 'Engineering Projects',
        sealCode: 'PRJ',
        title: formData.projectTitle || 'Software Development Projects',
        organization: 'Academic & Self-Directed',
        type: 'experience',
        summary: formData.projectDescription || 'Conceived and engineered interactive web applications.',
        highlights: [
          'Architected responsive web experiences with modern developer tooling.',
          'Engineered modular components with clean state management.',
          'Practiced version control workflows and repository hygiene using Git and GitHub.'
        ],
        technologies: formData.projectTech.split(',').map((t) => t.trim()).filter(Boolean)
      },
      {
        id: 'intermediate-milestone',
        year: '2022 – 2024',
        period: 'Class XI – XII',
        sealCode: 'XII',
        title: 'Intermediate (Class XII) – MPC',
        organization: formData.schoolBoard || 'Junior College',
        type: 'education',
        grade: `Score: ${formData.intermediate}`,
        summary: 'Rigorous preparatory education with deep foundations in Mathematics, Physics, and Chemistry.',
        highlights: [
          'Built analytical problem-solving skills through extensive mathematics and physics coursework.',
          'Developed an early passion for computer technology and software engineering.'
        ]
      },
      {
        id: 'tenth-milestone',
        year: '2021 – 2022',
        period: 'Class X',
        sealCode: 'X',
        title: 'Secondary School Certificate (Class X)',
        organization: 'High School',
        type: 'education',
        grade: `Score: ${formData.tenth}`,
        summary: 'Foundational schooling marked by curiosity for computational thinking, mathematics, and science.',
        highlights: [
          'Graduated secondary education with distinction.',
          'Participated actively in science competitions and mathematics olympiads.'
        ]
      }
    ];

    // Format custom bio
    const bioList = [
      formData.bioP1 || `Passionate B.Tech 2nd Year Computer Science & Engineering undergraduate at ${formData.university} (CGPA: ${formData.btech}) with practical focus on frontend development, modern JavaScript, and component-driven web architectures.`,
      formData.bioP2 || `Continually strengthening foundations across Object-Oriented Programming (Java, C, Python), Data Structures, and Relational Database Systems with sustained academic distinction.`,
      formData.bioP3 || `Driven by building clean, high-performance web experiences, interactive user interfaces, and modular applications with modern developer tooling.`
    ];

    createPortfolio({
      name: formData.name.trim(),
      monogram: formData.monogram.trim().toUpperCase() || formData.name.slice(0, 2).toUpperCase(),
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      university: formData.university.trim(),
      location: formData.location.trim(),
      tagline: formData.tagline.trim(),
      cgpa: formData.btech.trim(),
      tenth: formData.tenth.trim(),
      intermediate: formData.intermediate.trim(),
      btech: formData.btech.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      github: formData.github.trim(),
      linkedin: formData.linkedin.trim(),
      photo: formData.photo,
      customId: finalId,
      bio: bioList,
      skills: customSkills,
      projects: customProjects,
      experience: customExperience,
      template: selectedTemplateId || 'editorial'
    });
  };

  const tabs = [
    { id: 'identity', label: '1. Identity & Role', icon: User },
    { id: 'academics', label: '2. Scores & Contact', icon: GraduationCap },
    { id: 'biophoto', label: '3. Photo & Bio', icon: Camera },
    { id: 'skills', label: '4. Skills & Project', icon: Code2 },
    { id: 'id', label: '5. Portfolio ID', icon: Key }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
      onClick={closeGenerator}
    >
      <div
        className="bg-white border border-zinc-300 w-full max-w-3xl rounded-sm shadow-2xl relative my-auto overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 bg-[#F7F7F5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-zinc-900 text-white font-mono text-sm font-bold flex items-center justify-center shadow-xs">
              +ID
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold text-zinc-900 tracking-wide uppercase">
                  PORTFOLIO GENERATOR
                </h2>
                <span className="px-2 py-0.5 bg-zinc-900 text-white text-[9px] font-mono font-bold tracking-widest uppercase rounded-[1px]">
                  NEW CANDIDATE
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-mono text-xs text-zinc-500">Theme:</span>
                <span className={`px-2 py-0.5 rounded-[1px] text-[10px] font-mono font-bold uppercase ${currentTemplate.badgeColor}`}>
                  {currentTemplate.name}
                </span>
                {onOpenTemplatePicker && (
                  <button
                    type="button"
                    onClick={() => {
                      closeGenerator();
                      onOpenTemplatePicker();
                    }}
                    className="text-[11px] font-mono text-zinc-700 hover:text-black underline cursor-pointer"
                  >
                    Change Theme
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrefillDemo}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-serif font-bold rounded-sm border border-zinc-300 transition-colors cursor-pointer"
              title="Prefill sample candidate details for quick testing"
            >
              <Sparkles size={12} className="text-zinc-900" />
              <span>Fill Sample Data</span>
            </button>

            <button
              onClick={closeGenerator}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 rounded-sm transition-colors cursor-pointer"
              aria-label="Close generator"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-zinc-200 bg-zinc-100/70 px-4 flex items-center gap-1 overflow-x-auto shrink-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundEngine.playBrushSwipe();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-1.5 py-3 px-3 text-xs font-serif font-bold tracking-wider uppercase border-b-2 whitespace-nowrap cursor-pointer transition-all ${
                  isActive
                    ? 'border-zinc-900 text-zinc-900 bg-white shadow-2xs'
                    : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200/50'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-mono rounded-sm flex items-center gap-2">
            <AlertCircle size={15} className="text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body - Scrollable */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* TAB 1: IDENTITY & ROLE */}
          {activeTab === 'identity' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Kavya Sharma"
                    required
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-serif text-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    Monogram / Initials (2 Letters)
                  </label>
                  <input
                    type="text"
                    name="monogram"
                    maxLength={3}
                    value={formData.monogram}
                    onChange={handleChange}
                    placeholder="e.g. KS"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-mono uppercase text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                  Professional Title / Role *
                </label>
                <SearchableCombobox
                  options={professionalTitlesList}
                  value={formData.title}
                  onChange={(val) => setFormData((prev) => ({ ...prev, title: val }))}
                  placeholder="Select or type your role (e.g. Software Engineer)..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    Degree / Specialization
                  </label>
                  <SearchableCombobox
                    options={degreesList}
                    value={formData.subtitle}
                    onChange={(val) => setFormData((prev) => ({ ...prev, subtitle: val }))}
                    placeholder="Select or type degree (e.g. B.Tech in CSE)..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    College / University
                  </label>
                  <SearchableCombobox
                    options={universitiesList}
                    value={formData.university}
                    onChange={(val) => setFormData((prev) => ({ ...prev, university: val }))}
                    placeholder="Select or type university (e.g. KL University)..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                  Academic Year / Cohort
                </label>
                <SearchableCombobox
                  options={academicYearsList}
                  value={formData.academicYear || ''}
                  onChange={(val) => setFormData((prev) => ({ ...prev, academicYear: val }))}
                  placeholder="Select or type academic year..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                  Tagline / Professional Philosophy
                </label>
                <textarea
                  name="tagline"
                  rows={2}
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="Crafting responsive web interfaces, modern applications, and clean software solutions."
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs sm:text-sm font-editorial text-zinc-900 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: ACADEMIC SCORES & CONTACT */}
          {activeTab === 'academics' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm mb-4">
                <div className="text-xs font-mono font-bold text-zinc-900 uppercase mb-2">
                  🎓 Academic Scorecard Credentials
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                      B.Tech / Degree CGPA *
                    </label>
                    <input
                      type="text"
                      name="btech"
                      value={formData.btech}
                      onChange={handleChange}
                      placeholder="e.g. 7.8 / 10.0"
                      className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                      Intermediate / Class XII Score
                    </label>
                    <input
                      type="text"
                      name="intermediate"
                      value={formData.intermediate}
                      onChange={handleChange}
                      placeholder="e.g. 920 / 1000"
                      className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                      Secondary / Class X Score
                    </label>
                    <input
                      type="text"
                      name="tenth"
                      value={formData.tenth}
                      onChange={handleChange}
                      placeholder="e.g. 510 / 600"
                      className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-[11px] font-mono text-zinc-600 mb-1 font-bold">
                    Intermediate / High School Board
                  </label>
                  <SearchableCombobox
                    options={schoolBoardsList}
                    value={formData.schoolBoard || ''}
                    onChange={(val) => setFormData((prev) => ({ ...prev, schoolBoard: val }))}
                    placeholder="Select or type school board (e.g. CBSE, ICSE, State Board)..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. candidate@example.com"
                    required
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-mono text-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-sm font-mono text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/your-username"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-zinc-700 mb-1">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/your-profile"
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTO & BIO */}
          {activeTab === 'biophoto' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Photo Upload & Preview */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-sm">
                <label className="block text-xs font-mono font-bold uppercase text-zinc-800 mb-2">
                  Profile Photo (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Photo Preview Frame */}
                  <div className="w-24 h-28 rounded-sm border-2 border-zinc-300 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs relative">
                    {formData.photo ? (
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="text-center p-2">
                        <span className="font-mono text-xs font-bold text-zinc-400 block">
                          {formData.monogram || 'PHOTO'}
                        </span>
                        <span className="text-[9px] text-zinc-400">Preview</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-zinc-300 hover:border-zinc-900 text-zinc-900 text-xs font-mono rounded-sm cursor-pointer shadow-2xs transition-all">
                      <Upload size={14} />
                      <span>Upload Photo from Computer (Max 2MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 uppercase">OR URL:</span>
                      <input
                        type="url"
                        name="photo"
                        value={formData.photo.startsWith('data:') ? '' : formData.photo}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpeg"
                        className="flex-1 px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none"
                      />
                    </div>

                    {/* Quick Preset Developer Avatars */}
                    <div className="pt-2 border-t border-zinc-200">
                      <span className="block text-[10px] font-mono text-zinc-500 uppercase mb-1.5 font-bold">
                        Or Pick A Preset Developer Avatar:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {sampleAvatars.map((av) => {
                          const isSelected = formData.photo === av.url;
                          return (
                            <button
                              key={av.id}
                              type="button"
                              onClick={() => {
                                soundEngine.playClick();
                                setFormData((prev) => ({ ...prev, photo: av.url }));
                              }}
                              className={`relative group flex items-center gap-1.5 px-2 py-1 rounded-sm border cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-zinc-900 border-zinc-900 text-white shadow-xs'
                                  : 'bg-white border-zinc-300 hover:border-zinc-600 text-zinc-700'
                              }`}
                            >
                              <img
                                src={av.url}
                                alt={av.label}
                                className="w-5 h-5 rounded-full object-cover shrink-0"
                              />
                              <span className="text-[11px] font-mono whitespace-nowrap">{av.label}</span>
                              {isSelected && <Check size={11} className="text-emerald-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {formData.photo && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, photo: '' }))}
                        className="text-[11px] font-mono text-rose-600 hover:text-rose-800 underline cursor-pointer"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold uppercase text-zinc-800">
                  Chronicle Bio (3 Narrative Paragraphs)
                </label>
                <div>
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">
                    Paragraph 1: Academic introduction & core focus
                  </span>
                  <textarea
                    name="bioP1"
                    rows={2}
                    value={formData.bioP1}
                    onChange={handleChange}
                    placeholder="Passionate B.Tech 2nd Year Computer Science & Engineering undergraduate and aspiring software engineer with practical focus on frontend development..."
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-editorial text-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">
                    Paragraph 2: Academic foundations & core coursework
                  </span>
                  <textarea
                    name="bioP2"
                    rows={2}
                    value={formData.bioP2}
                    onChange={handleChange}
                    placeholder="Currently pursuing B.Tech at KL University, continually strengthening foundations across Object-Oriented Programming (Java, C, Python), Data Structures..."
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-editorial text-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <span className="text-[11px] font-mono text-zinc-500 block mb-1">
                    Paragraph 3: Engineering drive & engineering philosophy
                  </span>
                  <textarea
                    name="bioP3"
                    rows={2}
                    value={formData.bioP3}
                    onChange={handleChange}
                    placeholder="Driven by building clean, high-performance web experiences, interactive user interfaces, and modular applications with modern developer tooling."
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-editorial text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SKILLS & PROJECT */}
          {activeTab === 'skills' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-zinc-900 uppercase">
                    ⚡ Technical Skills (Search, Select, or Type Custom)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Type any custom skill & press Enter
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-700 font-bold mb-1">
                    Programming Languages
                  </label>
                  <MultiSkillPicker
                    selectedSkills={formData.languages}
                    onChange={(skills) => setFormData((prev) => ({ ...prev, languages: skills }))}
                    availableOptions={skillsCatalog.languages}
                    popularSuggestions={['Java', 'Python', 'JavaScript (ES6+)', 'C++', 'SQL', 'TypeScript']}
                    placeholder="Search or type language (e.g. Java, Python, Go)..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-700 font-bold mb-1">
                    Web & Frontend Technologies
                  </label>
                  <MultiSkillPicker
                    selectedSkills={formData.frontend}
                    onChange={(skills) => setFormData((prev) => ({ ...prev, frontend: skills }))}
                    availableOptions={skillsCatalog.frontend}
                    popularSuggestions={['React.js', 'Tailwind CSS', 'Next.js', 'TypeScript', 'HTML5 & CSS3']}
                    placeholder="Search or type frontend tech (e.g. React.js, Tailwind)..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-700 font-bold mb-1">
                    Core Computer Science Concepts
                  </label>
                  <MultiSkillPicker
                    selectedSkills={formData.coreCs}
                    onChange={(skills) => setFormData((prev) => ({ ...prev, coreCs: skills }))}
                    availableOptions={skillsCatalog.coreCs}
                    popularSuggestions={['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems']}
                    placeholder="Search or type core CS topic (e.g. DSA, DBMS)..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-700 font-bold mb-1">
                    Developer Tools & Platforms
                  </label>
                  <MultiSkillPicker
                    selectedSkills={formData.tools}
                    onChange={(skills) => setFormData((prev) => ({ ...prev, tools: skills }))}
                    availableOptions={skillsCatalog.tools}
                    popularSuggestions={['Git & GitHub', 'VS Code', 'Docker', 'Vite', 'Postman']}
                    placeholder="Search or type tool (e.g. Git, Docker, Postman)..."
                  />
                </div>
              </div>

              {/* Custom Featured Project */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm space-y-3">
                <span className="text-xs font-mono font-bold text-zinc-900 uppercase block">
                  🛠️ Featured Engineering Project
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                      Project Title
                    </label>
                    <input
                      type="text"
                      name="projectTitle"
                      value={formData.projectTitle}
                      onChange={handleChange}
                      placeholder="e.g. TaskFlow Academic Hub"
                      className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-serif text-zinc-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      name="projectCategory"
                      value={formData.projectCategory}
                      onChange={handleChange}
                      placeholder="e.g. Web Application"
                      className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-serif text-zinc-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                    Project Summary & Architecture
                  </label>
                  <textarea
                    name="projectDescription"
                    rows={2}
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Brief description of what the project does and technologies used."
                    className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-editorial text-zinc-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-600 mb-1">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    type="text"
                    name="projectTech"
                    value={formData.projectTech}
                    onChange={handleChange}
                    placeholder="React.js, Tailwind CSS, Vite, LocalStorage"
                    className="w-full px-3 py-1.5 bg-white border border-zinc-300 focus:border-zinc-900 rounded-sm text-xs font-mono text-zinc-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO ID */}
          {activeTab === 'id' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-5 bg-zinc-900 text-white rounded-sm space-y-3">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-zinc-300" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-200">
                    YOUR UNIQUE PORTFOLIO ID
                  </span>
                </div>
                <p className="font-serif text-xs text-zinc-300 leading-relaxed">
                  After generating your portfolio, you will receive this ID. Anyone can enter this ID in the top search bar anytime to load and display your corresponding portfolio.
                </p>

                <div className="pt-2">
                  <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase">
                    Assigned Portfolio ID:
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      name="customId"
                      value={formData.customId || suggestedId}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, '');
                        setFormData((prev) => ({ ...prev, customId: val }));
                      }}
                      placeholder="e.g. KAVYA-2026"
                      className="px-4 py-2 bg-black border border-zinc-600 focus:border-white rounded-sm text-base font-mono uppercase tracking-widest text-white font-bold focus:outline-none w-full max-w-sm"
                    />
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 shrink-0 font-bold">
                      <Check size={14} /> Available
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 mt-1 block">
                    You can keep the auto-generated ID or customize it to your preference.
                  </span>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-zinc-200 bg-[#F7F7F5] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrefillDemo}
              className="sm:hidden px-3 py-2 bg-zinc-200 text-zinc-800 text-xs font-serif font-bold rounded-sm cursor-pointer"
            >
              Fill Sample
            </button>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              Step {tabs.findIndex((t) => t.id === activeTab) + 1} of {tabs.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={closeGenerator}
              className="px-4 py-2 border border-zinc-300 hover:border-zinc-900 text-zinc-800 font-serif text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-zinc-900 hover:bg-black text-white font-serif text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles size={14} className="text-white group-hover:scale-110 transition-transform" />
              <span>GENERATE PORTFOLIO & GET ID</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

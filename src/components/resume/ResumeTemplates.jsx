

/**
 * Normalizes member skills into an array of categories
 */
const getNormalizedSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) {
    return skills.map((cat) => ({
      title: cat.title || 'Technical Skills',
      skills: Array.isArray(cat.skills)
        ? cat.skills.map((s) => (typeof s === 'string' ? s : s.name)).filter(Boolean)
        : []
    }));
  }
  return [];
};

/**
 * Normalizes projects
 */
const getNormalizedProjects = (projects) => {
  if (!projects || !Array.isArray(projects)) return [];
  return projects.slice(0, 3);
};

/**
 * Normalizes experience / education milestones
 */
const getNormalizedExperience = (experience) => {
  if (!experience || !Array.isArray(experience)) return [];
  return experience.slice(0, 4);
};

/* =========================================================================
   TEMPLATE 1: MODERN ATS STANDARD (1-Column Clean)
   ========================================================================= */
export const ModernAtsTemplate = ({ member, skills, projects, experience, certs }) => {
  const normSkills = getNormalizedSkills(skills);
  const normProjects = getNormalizedProjects(projects);
  const normExp = getNormalizedExperience(experience);
  const educationItems = normExp.filter((e) => e.type === 'education' || e.sealCode === 'EDU' || e.sealCode === 'XII' || e.sealCode === 'X');
  const projectOrWorkItems = normExp.filter((e) => e.type === 'experience' || e.sealCode === 'PRJ');

  return (
    <div className="bg-white text-zinc-900 p-8 sm:p-10 font-sans max-w-[800px] mx-auto text-xs leading-relaxed shadow-sm">
      {/* Header */}
      <header className="border-b-2 border-zinc-900 pb-4 mb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase mb-1">
          {member.name || 'Candidate Name'}
        </h1>
        <p className="text-sm font-semibold text-zinc-700 tracking-wide mb-2">
          {member.title || 'Software Engineer'}
        </p>

        {/* Contact details row */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-zinc-600 font-mono">
          {member.email && <span>{member.email}</span>}
          {member.phone && <span>• {member.phone}</span>}
          {member.location && <span>• {member.location}</span>}
          {member.github && (
            <span>• {member.github.replace('https://', '')}</span>
          )}
          {member.linkedin && (
            <span>• {member.linkedin.replace('https://', '')}</span>
          )}
        </div>
      </header>

      {/* Summary */}
      {member.tagline && (
        <section className="mb-4">
          <p className="text-zinc-700 text-[11.5px] italic text-center">
            "{member.tagline}"
          </p>
        </section>
      )}

      {/* Education Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Education & Academic Background
        </h2>
        <div className="space-y-2">
          {/* Primary University Degree */}
          <div className="flex justify-between items-baseline">
            <div>
              <span className="font-bold text-zinc-900 text-[12px]">
                {member.university || 'University'}
              </span>
              <span className="text-zinc-700 text-[11.5px] block">
                {member.subtitle || 'B.Tech in Computer Science & Engineering'}
              </span>
            </div>
            <div className="text-right">
              <span className="font-semibold text-zinc-900 text-[11.5px]">
                CGPA: {member.scores?.btech || member.cgpa || 'Distinction'}
              </span>
              <span className="text-zinc-500 block text-[10.5px]">
                {educationItems[0]?.period || '2024 – 2028'}
              </span>
            </div>
          </div>

          {/* Intermediate & Secondary Scores */}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-zinc-700 bg-zinc-50 p-2 rounded-xs border border-zinc-200">
            <div>
              <span className="font-semibold text-zinc-900">Class XII / Intermediate: </span>
              <span>{member.scores?.intermediate || 'Completed'}</span>
            </div>
            <div>
              <span className="font-semibold text-zinc-900">Class X / Secondary: </span>
              <span>{member.scores?.tenth || 'Completed'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Technical Skills
        </h2>
        <div className="space-y-1.5 text-[11px]">
          {normSkills.map((cat, idx) => (
            <div key={idx} className="flex">
              <span className="font-bold text-zinc-900 w-44 shrink-0">
                {cat.title.replace('DEVELOPMENT', '').trim()}:
              </span>
              <span className="text-zinc-700">
                {cat.skills.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
          Featured Engineering Projects
        </h2>
        <div className="space-y-3">
          {normProjects.map((proj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-zinc-900 text-[12px]">
                  {proj.title}
                </span>
                <span className="text-zinc-500 text-[10.5px] font-mono">
                  {proj.category || 'Web Application'}
                </span>
              </div>
              {proj.technologies && (
                <div className="text-[10.5px] text-zinc-600 font-mono">
                  <span className="font-semibold text-zinc-800">Tech Stack: </span>
                  {proj.technologies.join(' • ')}
                </div>
              )}
              <p className="text-zinc-700 text-[11px] leading-normal">
                {proj.description || proj.longDescription}
              </p>
              {proj.keyFeatures && (
                <ul className="list-disc list-inside text-[10.5px] text-zinc-600 space-y-0.5 ml-1">
                  {proj.keyFeatures.slice(0, 2).map((feat, fIdx) => (
                    <li key={fIdx}>{feat}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Practical Milestones */}
      {projectOrWorkItems.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
            Practical Experience & Milestones
          </h2>
          <div className="space-y-2">
            {projectOrWorkItems.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-900 text-[11.5px]">
                    {exp.title}
                  </span>
                  <span className="text-zinc-500 text-[10.5px] font-mono">
                    {exp.year || exp.period}
                  </span>
                </div>
                <div className="text-zinc-600 text-[11px] italic">
                  {exp.organization}
                </div>
                <p className="text-zinc-700 text-[10.5px] mt-0.5">
                  {exp.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications (if present) */}
      {certs && certs.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 border-b border-zinc-300 pb-1 mb-1.5">
            Certifications & Accreditations
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            {certs.slice(0, 3).map((cert, idx) => (
              <div key={idx} className="text-zinc-800">
                <span className="font-semibold">{cert.title}</span> — {cert.issuer} ({cert.year})
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 2: EXECUTIVE EDITORIAL (Serif Elegance)
   ========================================================================= */
export const ExecutiveEditorialTemplate = ({ member, skills, projects, experience, certs }) => {
  const normSkills = getNormalizedSkills(skills);
  const normProjects = getNormalizedProjects(projects);
  const normExp = getNormalizedExperience(experience);

  return (
    <div className="bg-[#FCFCF9] text-[#1C1917] p-8 sm:p-10 font-serif max-w-[800px] mx-auto text-xs leading-relaxed shadow-sm border border-stone-200">
      {/* Classical Editorial Top Header */}
      <header className="border-b-4 border-double border-stone-800 pb-4 mb-4 text-center">
        <div className="text-[10px] font-mono tracking-widest uppercase text-stone-500 mb-1">
          CURRICULUM VITAE • CANDIDATE DOSSIER
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-stone-900 uppercase font-serif mb-1">
          {member.name || 'Candidate Name'}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-700 mb-2 font-mono">
          {member.title || 'Software Engineer'}
        </p>

        {/* Contact strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-stone-600 font-mono">
          <span>{member.email}</span>
          <span>•</span>
          <span>{member.phone}</span>
          <span>•</span>
          <span>{member.location}</span>
          {member.github && <span>• {member.github.replace('https://', '')}</span>}
        </div>
      </header>

      {/* Narrative Bio */}
      {member.bio && (
        <section className="mb-4 bg-stone-100/60 p-3 rounded-xs border-l-2 border-stone-800 text-[11px] text-stone-700 italic">
          {Array.isArray(member.bio) ? member.bio[0] : member.bio}
        </section>
      )}

      {/* Academic Credentials */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-400 pb-1 mb-2 flex items-center justify-between">
          <span>I. ACADEMIC CREDENTIALS</span>
          <span className="font-mono text-[9px] text-stone-500">SCHOLASTIC RECORD</span>
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <div>
              <span className="font-bold text-stone-900 text-[12px]">
                {member.university}
              </span>
              <span className="text-stone-700 text-[11.5px] block italic">
                {member.subtitle}
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-stone-900 font-mono text-xs">
                CGPA: {member.scores?.btech || member.cgpa}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px] text-stone-700 border-t border-stone-200 pt-1.5 font-mono">
            <div>
              <span className="font-bold text-stone-900">Class XII / Inter: </span>
              <span>{member.scores?.intermediate}</span>
            </div>
            <div>
              <span className="font-bold text-stone-900">Class X / SSC: </span>
              <span>{member.scores?.tenth}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Competencies */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-400 pb-1 mb-2 flex items-center justify-between">
          <span>II. TECHNICAL REPERTOIRE</span>
          <span className="font-mono text-[9px] text-stone-500">ENGINEERING PROFICIENCIES</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
          {normSkills.map((cat, idx) => (
            <div key={idx} className="space-y-0.5">
              <span className="font-bold text-stone-900 uppercase text-[10px] font-mono tracking-wider block">
                {cat.title}
              </span>
              <span className="text-stone-700">
                {cat.skills.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Engineering Projects */}
      <section className="mb-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-400 pb-1 mb-2 flex items-center justify-between">
          <span>III. ENGINEERING ARTIFACTS & PROJECTS</span>
          <span className="font-mono text-[9px] text-stone-500">TECHNICAL PORTFOLIO</span>
        </h2>
        <div className="space-y-3">
          {normProjects.map((proj, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-[12px]">
                  {proj.title}
                </span>
                <span className="font-mono text-[10px] text-stone-500 uppercase">
                  {proj.category}
                </span>
              </div>
              <p className="text-stone-700 text-[11px]">
                {proj.description || proj.longDescription}
              </p>
              {proj.technologies && (
                <div className="font-mono text-[10px] text-stone-600">
                  <span className="font-bold text-stone-800">Stack: </span>
                  {proj.technologies.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      {normExp.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 border-b border-stone-400 pb-1 mb-2 flex items-center justify-between">
            <span>IV. ACADEMIC & PROFESSIONAL TIMELINE</span>
            <span className="font-mono text-[9px] text-stone-500">MILESTONES</span>
          </h2>
          <div className="space-y-2">
            {normExp.map((exp, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-[11px]">
                <div>
                  <span className="font-bold text-stone-900">{exp.title}</span> —{' '}
                  <span className="text-stone-700 italic">{exp.organization}</span>
                </div>
                <span className="font-mono text-[10px] text-stone-500">{exp.year || exp.period}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

/* =========================================================================
   TEMPLATE 3: DUAL-COLUMN TECH SIDEBAR
   ========================================================================= */
export const SidebarSplitTemplate = ({ member, skills, projects, experience, certs }) => {
  const normSkills = getNormalizedSkills(skills);
  const normProjects = getNormalizedProjects(projects);
  const normExp = getNormalizedExperience(experience);

  return (
    <div className="bg-white text-zinc-900 font-sans max-w-[800px] mx-auto text-xs leading-relaxed shadow-sm grid grid-cols-12 min-h-[900px]">
      {/* Left Sidebar (35%) */}
      <aside className="col-span-4 bg-zinc-900 text-zinc-100 p-6 space-y-5">
        {/* Monogram / Avatar */}
        <div className="text-center pb-2 border-b border-zinc-700">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-zinc-800 border-2 border-zinc-600 flex items-center justify-center font-mono text-lg font-bold text-white shadow-inner">
            {member.monogram || member.name?.slice(0, 2).toUpperCase() || 'DEV'}
          </div>
          <h1 className="text-base font-bold text-white uppercase tracking-tight">
            {member.name}
          </h1>
          <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
            {member.title}
          </p>
        </div>

        {/* Contact info */}
        <div className="space-y-2 text-[11px] font-mono text-zinc-300">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block">
            CONTACT
          </span>
          {member.email && (
            <div className="break-all">{member.email}</div>
          )}
          {member.phone && <div>{member.phone}</div>}
          {member.location && <div>{member.location}</div>}
          {member.github && (
            <div className="break-all text-zinc-400">{member.github.replace('https://', '')}</div>
          )}
          {member.linkedin && (
            <div className="break-all text-zinc-400">{member.linkedin.replace('https://', '')}</div>
          )}
        </div>

        {/* Academic Scorecard */}
        <div className="space-y-1.5 text-[11px]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-mono">
            EDUCATION
          </span>
          <div className="font-bold text-white text-xs">{member.university}</div>
          <div className="text-zinc-400 text-[10.5px] leading-tight">{member.subtitle}</div>
          <div className="pt-1 text-[11px] font-mono text-emerald-400 font-bold">
            CGPA: {member.scores?.btech || member.cgpa}
          </div>
          <div className="text-[10px] font-mono text-zinc-400">
            Inter: {member.scores?.intermediate}
          </div>
          <div className="text-[10px] font-mono text-zinc-400">
            Class X: {member.scores?.tenth}
          </div>
        </div>

        {/* Skills Pills */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block font-mono">
            TECHNICAL SKILLS
          </span>
          {normSkills.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 block font-semibold">
                {cat.title}
              </span>
              <div className="flex flex-wrap gap-1">
                {cat.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-1.5 py-0.5 bg-zinc-800 text-zinc-200 rounded-[2px] text-[9.5px] font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right Content Area (65%) */}
      <main className="col-span-8 p-7 space-y-5 bg-white">
        {/* Profile Tagline / Bio */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-mono">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-zinc-700 text-[11px] leading-relaxed">
            {member.tagline || (Array.isArray(member.bio) ? member.bio[0] : member.bio)}
          </p>
        </section>

        {/* Featured Projects */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3 font-mono">
            FEATURED ENGINEERING PROJECTS
          </h2>
          <div className="space-y-3">
            {normProjects.map((proj, idx) => (
              <div key={idx} className="p-3 bg-zinc-50 border border-zinc-200 rounded-sm space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-900 text-xs">
                    {proj.title}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {proj.category}
                  </span>
                </div>
                <p className="text-zinc-700 text-[11px]">
                  {proj.description || proj.longDescription}
                </p>
                {proj.technologies && (
                  <div className="text-[10px] font-mono text-zinc-600 pt-0.5">
                    <span className="font-bold text-zinc-800">Stack: </span>
                    {proj.technologies.join(' • ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Milestones */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-2 font-mono">
            ACADEMIC JOURNEY & MILESTONES
          </h2>
          <div className="space-y-2.5">
            {normExp.map((exp, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-zinc-900 text-[11.5px]">
                    {exp.title}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-500">
                    {exp.year || exp.period}
                  </span>
                </div>
                <div className="text-zinc-600 text-[11px]">
                  {exp.organization}
                </div>
                {exp.summary && (
                  <p className="text-zinc-600 text-[10.5px]">
                    {exp.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

/* =========================================================================
   TEMPLATE 4: OBSIDIAN MINIMALIST (Tech & Code Focus)
   ========================================================================= */
export const TechMinimalTemplate = ({ member, skills, projects, experience, certs }) => {
  const normSkills = getNormalizedSkills(skills);
  const normProjects = getNormalizedProjects(projects);
  const normExp = getNormalizedExperience(experience);

  return (
    <div className="bg-[#121214] text-zinc-200 p-8 sm:p-10 font-mono max-w-[800px] mx-auto text-xs leading-relaxed shadow-sm border border-zinc-800">
      {/* Terminal Style Header */}
      <header className="border-b border-zinc-800 pb-4 mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            $ whoami --cv
          </span>
          <span className="text-[10px] text-zinc-500">
            ID: {member.id || 'DEV-2026'}
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-wider text-white uppercase mb-1">
          {member.name}
        </h1>
        <p className="text-xs text-zinc-400 font-medium tracking-wide">
          &gt; {member.title} | {member.university}
        </p>

        {/* Contact row */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 mt-3 pt-3 border-t border-zinc-800/80">
          <span>EMAIL: {member.email}</span>
          <span>•</span>
          <span>TEL: {member.phone}</span>
          <span>•</span>
          <span>LOC: {member.location}</span>
        </div>
      </header>

      {/* Scores & GPA */}
      <section className="mb-4 bg-zinc-900/80 p-3 rounded-xs border border-zinc-800">
        <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1 tracking-wider">
          // ACADEMIC_METRICS
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-1.5 bg-black/40 border border-zinc-800 rounded-xs">
            <span className="text-[10px] text-zinc-500 block">B.TECH CGPA</span>
            <span className="text-emerald-400 font-bold text-sm">
              {member.scores?.btech || member.cgpa}
            </span>
          </div>
          <div className="p-1.5 bg-black/40 border border-zinc-800 rounded-xs">
            <span className="text-[10px] text-zinc-500 block">INTERMEDIATE</span>
            <span className="text-zinc-200 font-bold text-sm">
              {member.scores?.intermediate}
            </span>
          </div>
          <div className="p-1.5 bg-black/40 border border-zinc-800 rounded-xs">
            <span className="text-[10px] text-zinc-500 block">CLASS X</span>
            <span className="text-zinc-200 font-bold text-sm">
              {member.scores?.tenth}
            </span>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix */}
      <section className="mb-4">
        <div className="text-[10px] text-emerald-400 uppercase font-bold mb-1.5 tracking-wider">
          // TECH_STACK_MATRIX
        </div>
        <div className="space-y-1.5 text-[11px]">
          {normSkills.map((cat, idx) => (
            <div key={idx} className="flex">
              <span className="text-zinc-400 w-36 shrink-0 font-bold">
                {cat.title}:
              </span>
              <span className="text-zinc-200">
                {cat.skills.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-4">
        <div className="text-[10px] text-emerald-400 uppercase font-bold mb-2 tracking-wider">
          // FEATURED_PROJECTS
        </div>
        <div className="space-y-3">
          {normProjects.map((proj, idx) => (
            <div key={idx} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xs space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-white text-xs">
                  {proj.title}
                </span>
                <span className="text-[10px] text-zinc-500">
                  [{proj.category}]
                </span>
              </div>
              <p className="text-zinc-300 text-[11px]">
                {proj.description || proj.longDescription}
              </p>
              {proj.technologies && (
                <div className="text-[10px] text-zinc-400 pt-0.5">
                  STACK: {proj.technologies.join(' / ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Education Timeline */}
      <section>
        <div className="text-[10px] text-emerald-400 uppercase font-bold mb-1.5 tracking-wider">
          // EDUCATION_TIMELINE
        </div>
        <div className="space-y-1.5 text-[11px]">
          {normExp.map((exp, idx) => (
            <div key={idx} className="flex justify-between items-baseline border-b border-zinc-800/60 pb-1">
              <div>
                <span className="font-bold text-white">{exp.title}</span> —{' '}
                <span className="text-zinc-400">{exp.organization}</span>
              </div>
              <span className="text-zinc-500 text-[10px]">{exp.year || exp.period}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

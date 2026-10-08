export const projectsData = [
  {
    id: "chronicle-portfolio",
    title: "Chronicle Portfolio System",
    subtitle: "High-Performance Editorial Developer Portfolio & Interactive Experience",
    sealCode: "01",
    category: "Web & Frontend",
    description: "Architected a personal developer showcase featuring interactive HTML5 Canvas particle physics, bespoke monochrome aesthetics, and sub-second load times.",
    longDescription: "The Chronicle Portfolio System is a modern, editorial personal web application built from the ground up to present engineering projects and academic milestones. Engineered with React 19, JavaScript, Vite, and Tailwind CSS v4, it incorporates interactive physics canvas rendering, smooth scroll-driven sections, accessible design tokens, and modular state management.",
    problemSolved: "Standard developer portfolio templates are often bloated, visually generic, and fail to provide recruiters with an engaging, interactive presentation of technical capabilities.",
    architecture: "Modular React 19 component hierarchy bundled with Vite. Styled with Tailwind CSS v4 tokens, powered by Framer Motion micro-interactions and a custom HTML5 Canvas particle system running on requestAnimationFrame.",
    technologies: ["React 19", "JavaScript", "Tailwind CSS v4", "Vite", "Framer Motion", "HTML5 Canvas", "Responsive Design"],
    keyFeatures: [
      "Custom HTML5 Canvas particle engine rendering real-time fluid ink particles at 60 FPS.",
      "Minimalist monochrome design system inspired by classical editorial typography and clean modern lines.",
      "Deep project inspection modals detailing system architectures, challenges, solutions, and key metrics.",
      "Optimized bundle size achieving sub-second first contentful paint with zero CSS bloat.",
      "Fully responsive layout supporting fluid viewport transitions across mobile, tablet, and desktop displays."
    ],
    challenges: [
      "Maintaining high-framerate canvas animation performance alongside complex scroll animations.",
      "Ensuring clean component modularity without third-party UI library dependencies."
    ],
    solutions: [
      "Throttled canvas render passes and optimized particle memory allocation to sustain 60 FPS.",
      "Structured clean modular data models across personal, skills, and project data models."
    ],
    metrics: [
      "< 1.0s First Contentful Paint",
      "60 FPS Smooth Canvas Animation",
      "100% Mobile & Desktop Responsive",
      "Zero Bloated UI Frameworks"
    ],
    githubUrl: "https://github.com/sanniwada-rohit",
    liveUrl: "#",
    featured: true
  },
  {
    id: "taskflow-academic",
    title: "TaskFlow Academic Hub",
    subtitle: "Student Coursework & Assignment Management Web App",
    sealCode: "02",
    category: "Web Application",
    description: "Responsive productivity web application for engineering students to organize coursework, deadlines, syllabus milestones, and daily revision schedules.",
    longDescription: "TaskFlow is an intuitive student dashboard designed to alleviate the clutter of semester assignments and exam deadlines. Built with modern JavaScript, React components, and local persistence, it offers priority-based tagging, dynamic completion tracking, and semester timetable visualization.",
    problemSolved: "College students frequently juggle multiple subjects, lab deadlines, and exams without a centralized, distraction-free interface to track progress and deadlines.",
    architecture: "Single-page React application utilizing local state hooks and browser LocalStorage for instantaneous, offline-ready data persistence. Styled with utility-first CSS for crisp typography and rapid response times.",
    technologies: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "LocalStorage API", "HTML5", "Responsive UI"],
    keyFeatures: [
      "Interactive assignment tracker with categorical subject sorting and priority color indicators.",
      "Dynamic progress meters visualizing completed coursework milestones per academic semester.",
      "Offline-first persistence using browser LocalStorage ensuring uninterrupted access.",
      "Clean, distraction-free interface optimized for quick daily task entry and timetable review."
    ],
    challenges: [
      "Handling persistent state synchronization without relying on an external backend database.",
      "Designing an intuitive mobile-friendly interface for fast task capture between classes."
    ],
    solutions: [
      "Implemented structured JSON state serialization in LocalStorage with robust fallback parsing.",
      "Created a mobile-first responsive layout with touch-friendly controls and high-contrast status pills."
    ],
    metrics: [
      "100% Client-Side & Offline Ready",
      "Instant Task Lookup & Filtering",
      "Zero Server Latency",
      "Lightweight Bundle Footprint"
    ],
    githubUrl: "https://github.com/sanniwada-rohit",
    featured: true
  }
];

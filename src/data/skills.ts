import type { SkillCategory } from '../types/portfolio';

export const skillsData: SkillCategory[] = [
  {
    title: "PROGRAMMING LANGUAGES",
    sealCode: "01",
    description: "Core programming languages mastered through academic coursework and practical programming exercises.",
    skills: [
      { name: "Java", level: "Primary Weapon", description: "Object-oriented programming, class design, collections, and foundational algorithmic problem solving.", featured: true },
      { name: "Python", level: "Scripting & Logic", description: "Clean scripting, logic building, data manipulation, and introductory computational tasks.", featured: true },
      { name: "C Language", level: "Foundational", description: "Pointers, memory management, and structured procedural programming fundamentals.", featured: true },
      { name: "JavaScript (ES6+)", level: "Web Engineering", description: "Modern asynchronous JavaScript, DOM manipulation, arrow functions, and promises.", featured: true },
      { name: "SQL", level: "Relational Queries", description: "Structured query language, joins, aggregation, and relational schema management." }
    ]
  },
  {
    title: "WEB & FRONTEND DEVELOPMENT",
    sealCode: "02",
    description: "Modern frontend libraries, responsive layout techniques, and component-driven user interfaces.",
    skills: [
      { name: "React.js", level: "Core Library", description: "Component-based architecture, hooks (useState, useEffect, useMemo), and state management.", featured: true },
      { name: "HTML5 & CSS3", level: "Markup & Styling", description: "Semantic web structure, modern flexbox, CSS grid, and cross-browser styling.", featured: true },
      { name: "Tailwind CSS", level: "Utility Styling", description: "Utility-first design tokens, custom theme configurations, and responsive UI building.", featured: true },
      { name: "Responsive Web Design", level: "Layout Hygiene", description: "Mobile-first layouts, adaptive viewports, and clean responsive breakpoints." },
      { name: "REST API Integration", level: "Data Exchange", description: "Consuming HTTP REST endpoints, JSON parsing, asynchronous data fetching with fetch/axios." }
    ]
  },
  {
    title: "CORE COMPUTER SCIENCE",
    sealCode: "03",
    description: "Theoretical grounding and computational principles established through 2nd-year CSE curriculum.",
    skills: [
      { name: "Data Structures & Algorithms", level: "Problem Solving", description: "Arrays, linked lists, stacks, queues, trees, searching, and sorting algorithms.", featured: true },
      { name: "Object-Oriented Programming (OOP)", level: "Design Principles", description: "Inheritance, polymorphism, encapsulation, abstraction, and clean modular code design.", featured: true },
      { name: "DBMS Principles", level: "Database Systems", description: "Relational modeling, entity-relationship diagrams, normalization (1NF-3NF), and ACID properties.", featured: true },
      { name: "Operating Systems Basics", level: "Systems Theory", description: "Process lifecycles, CPU scheduling, thread synchronization, and virtual memory concepts." }
    ]
  },
  {
    title: "DEVELOPER TOOLS & PLATFORMS",
    sealCode: "04",
    description: "Productivity software, version control hygiene, and modern developer environments.",
    skills: [
      { name: "Git & GitHub", level: "Version Control", description: "Repository management, branching, committing, pull requests, and open collaboration.", featured: true },
      { name: "VS Code", level: "Primary IDE", description: "Integrated terminal, debugging extensions, linting, and workspace customization.", featured: true },
      { name: "Vite", level: "Build Tooling", description: "Fast local development server, Hot Module Replacement (HMR), and production bundling.", featured: true },
      { name: "MySQL / Workbench", level: "RDBMS Tooling", description: "Table design, relational querying, and database schema administration." }
    ]
  }
];

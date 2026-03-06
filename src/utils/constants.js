// constants.js
// Single source of truth for all static data: projects, skills, timeline.

// ── PROJECTS ───────────────────────────────
export const PROJECTS = [
    {
        id: 1,
        title: 'Library Management System',
        category: 'Full Stack',
        description:
            'End-to-end library platform with role-based access control, book inventory management, and member tracking built on Spring Boot and MySQL.',
        tech: ['Java', 'Spring Boot', 'MySQL', 'JWT', 'REST API'],
        color: '#6366F1',
        link: '#',
    },
    {
        id: 2,
        title: 'SaaS Auth API',
        category: 'SaaS API',
        description:
            'Production-grade authentication microservice with OAuth2, JWT refresh tokens, rate limiting, and Docker-based deployment pipeline.',
        tech: ['Spring Security', 'JWT', 'Docker', 'PostgreSQL', 'Redis'],
        color: '#22C55E',
        link: '#',
    },
    {
        id: 3,
        title: 'Student Management System',
        category: 'Full Stack',
        description:
            'Complete academic management platform with enrolment workflows, grade tracking, and a React frontend backed by Spring Data Hibernate.',
        tech: ['Spring Boot', 'Hibernate', 'React', 'Tailwind', 'MySQL'],
        color: '#F59E0B',
        link: '#',
    },
    {
        id: 4,
        title: 'Currency Converter',
        category: 'REST API',
        description:
            'Real-time multi-currency converter consuming live exchange rate APIs, with historical data charts and a lightweight JavaScript frontend.',
        tech: ['Java', 'REST APIs', 'JavaScript', 'HTML/CSS', 'ExchangeRate-API'],
        color: '#818CF8',
        link: '#',
    },
];

// ── SKILLS ─────────────────────────────────
export const SKILL_GROUPS = [
    {
        label: 'Core',
        skills: [
            { name: 'Java', icon: '☕', color: '#F59E0B' },
            { name: 'Spring Boot', icon: '🍃', color: '#22C55E' },
            { name: 'Spring Security', icon: '🔒', color: '#6366F1' },
            { name: 'JWT', icon: '🔑', color: '#818CF8' },
        ],
    },
    {
        label: 'Data',
        skills: [
            { name: 'MySQL', icon: '🐬', color: '#00ADEF' },
            { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
            { name: 'Hibernate', icon: '🗄️', color: '#BCAE79' },
            { name: 'REST APIs', icon: '🔗', color: '#22C55E' },
        ],
    },
    {
        label: 'DevOps',
        skills: [
            { name: 'Docker', icon: '🐳', color: '#2496ED' },
            { name: 'Git', icon: '🌿', color: '#F05033' },
            { name: 'GitHub', icon: '🐙', color: '#E5E7EB' },
            { name: 'Linux', icon: '🐧', color: '#FCC624' },
        ],
    },
    {
        label: 'Frontend',
        skills: [
            { name: 'React', icon: '⚛️', color: '#61DAFB' },
            { name: 'Tailwind', icon: '🎨', color: '#38BDF8' },
            { name: 'JavaScript', icon: 'JS', color: '#F0DB4F' },
        ],
    },
];

// ── TIMELINE ───────────────────────────────
export const TIMELINE_EVENTS = [
    {
        id: 1,
        year: '2023',
        title: 'B.E. Graduation',
        description:
            'Completed Bachelor of Engineering in Computer Science with a strong foundation in data structures, algorithms, and software design patterns.',
        side: 'left',
        color: '#6366F1',
    },
    {
        id: 2,
        year: '2024',
        title: 'Mainframe & Banking Systems',
        description:
            'Gained exposure to enterprise-grade mainframe environments and core banking system architectures, broadening perspective on scalable back-end design.',
        side: 'right',
        color: '#22C55E',
    },
    {
        id: 3,
        year: '2025',
        title: 'Java Backend & SaaS Focus',
        description:
            'Dove deep into Spring Boot, microservices, and SaaS API development — shipping auth systems, REST APIs, and containerised deployments with Docker.',
        side: 'left',
        color: '#818CF8',
    },
    {
        id: 4,
        year: '2026',
        title: 'Open to Roles & Freelance',
        description:
            'Actively seeking backend engineering opportunities and open to freelance projects in the Java / Spring ecosystem. Let\'s build something great.',
        side: 'right',
        color: '#22C55E',
        isCurrent: true,
    },
];

// ── NAV LINKS ──────────────────────────────
export const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
];

// ── SOCIAL LINKS ───────────────────────────
export const SOCIAL_LINKS = {
    email: 'manojpandi@example.com',
    linkedin: 'https://linkedin.com/in/manojpandi',
    github: 'https://github.com/manojpandi',
};

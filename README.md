# Manoj Pandi — Portfolio

A production-ready, fully animated portfolio for a Java Backend Engineer. Built with React 18, Vite, Framer Motion, GSAP, Lenis, Three.js, and Tailwind CSS.

## 🚀 Quick Start

```bash
cd MP_Portfolio6
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🛠 Tech Stack

| Tool | Role |
|---|---|
| React 18 + Vite | App framework & build |
| Tailwind CSS | Utility-based styling via CSS vars |
| Framer Motion | Micro-animations, spring physics, cursor |
| GSAP + ScrollTrigger | Horizontal scroll pin, SVG path draw |
| Lenis | Smooth scroll (paused during GSAP pins) |
| Three.js | Hero WebGL shader mesh (with CSS fallback) |
| Lucide React | Icons |
| Fontsource | Self-hosted DM Sans & JetBrains Mono |
| Fontshare CDN | Cabinet Grotesk display font |

## 📁 Structure

```
src/
├── components/
│   ├── layout/     Navbar, CustomCursor, Loader
│   └── sections/   Hero, About, Skills, Projects, Timeline, Contact
├── hooks/          useScrollProgress, useLenis, useReducedMotion
├── utils/          animationVariants.js, constants.js
└── styles/         globals.css (all CSS design tokens)
```

## ✏️ Customisation

- **Personal data** — Edit `src/utils/constants.js` (projects, skills, timeline, social links)
- **Design tokens** — Edit `src/styles/globals.css` `:root` block
- **Profile photo** — Replace the `MP` monogram in `About.jsx` with an `<img>` tag

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## ♿ Accessibility

All animations respect `prefers-reduced-motion`. The custom cursor is hidden on touch devices automatically.

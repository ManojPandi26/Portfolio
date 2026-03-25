import React, { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar.jsx';
import Hero from './components/sections/Hero.jsx';
import { useLenis } from './hooks/useLenis.js';

// Lazy-loaded below-the-fold sections
const About    = lazy(() => import('./components/sections/About.jsx'));
const Skills   = lazy(() => import('./components/sections/Skills.jsx'));
const Projects = lazy(() => import('./components/sections/Projects.jsx'));
const Timeline = lazy(() => import('./components/sections/Timeline.jsx'));
const Contact  = lazy(() => import('./components/sections/Contact.jsx'));

function SectionFallback() {
  return (
    <div style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '2px solid var(--color-border)',
        borderTopColor: 'var(--color-primary)',
        borderRadius: 'var(--radius-full)',
        animation: 'conic-spin 0.8s linear infinite',
      }} />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  // Page reveal: dark overlay fades out after 0.4s
  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Page reveal overlay */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'var(--color-bg-base)',
            }}
          />
        )}
      </AnimatePresence>

      <Navbar />

      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Timeline /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
      </main>
    </>
  );
}

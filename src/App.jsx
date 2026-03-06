import React, { Suspense, lazy, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/layout/Loader.jsx';
import Navbar from './components/layout/Navbar.jsx';
import CustomCursor from './components/layout/CustomCursor.jsx';
import { useLenis } from './hooks/useLenis.js';
import Hero from './components/sections/Hero.jsx';

// Lazy load sections below the fold
const About = lazy(() => import('./components/sections/About.jsx'));
const Skills = lazy(() => import('./components/sections/Skills.jsx'));
const Projects = lazy(() => import('./components/sections/Projects.jsx'));
const Timeline = lazy(() => import('./components/sections/Timeline.jsx'));
const Contact = lazy(() => import('./components/sections/Contact.jsx'));

const SectionFallback = () => (
  <div className="flex items-center justify-center py-32" style={{ color: 'var(--color-text-low)' }}>
    <div className="w-8 h-8 border-2 rounded-full animate-spin"
      style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }} />
  </div>
);

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useLenis();

  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <Loader key="loader" onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      {isLoaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Suspense fallback={<SectionFallback />}>
              <About />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Skills />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Timeline />
            </Suspense>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </main>
        </>
      )}
    </>
  );
}

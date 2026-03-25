import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from '../ui/SectionHeader.jsx';
import { TIMELINE } from '../../data/timeline.js';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════
   Timeline Card
   ═══════════════════════════════════════════ */
function TimelineCard({ event, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass"
      style={{
        padding: 'var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-lg)',
        borderLeft: `3px solid ${event.current ? 'var(--color-accent)' : 'var(--color-primary-dim)'}`,
        flex: 1,
        minWidth: 0,
      }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: event.current ? 'var(--color-accent)' : 'var(--color-primary)',
        letterSpacing: 'var(--tracking-widest)',
        marginBottom: 'var(--space-2)',
      }}>
        {event.year}
      </p>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--weight-bold)',
        color: 'var(--color-text-high)',
        letterSpacing: 'var(--tracking-tight)',
        lineHeight: 'var(--leading-snug)',
        marginBottom: 'var(--space-2)',
      }}>
        {event.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-mid)',
        lineHeight: 'var(--leading-normal)',
      }}>
        {event.body}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   TIMELINE SECTION
   Desktop: alternating left/right with center line
   Mobile: single column with left line
   ═══════════════════════════════════════════ */
export default function Timeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

    const ctx = gsap.context(() => {
      gsap.to(line, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={sectionRef}
      style={{
        padding: 'var(--section-py) var(--section-px)',
        background: 'var(--color-bg-elevated)',
        position: 'relative',
      }}
    >
      <SectionHeader eyebrow="Journey" heading="Experience" />

      <div className="tl-container" style={{
        position: 'relative',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Center SVG line — desktop: center, mobile: left edge */}
        <svg
          className="tl-line-svg"
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: 'translateX(-50%)',
            width: '2px',
            height: '100%',
            overflow: 'visible',
            zIndex: 1,
          }}
        >
          <line
            ref={lineRef}
            x1="1" y1="0" x2="1" y2="100%"
            stroke="url(#tl-grad)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="tl-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Timeline entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', position: 'relative', zIndex: 2 }}>
          {TIMELINE.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={event.year}
                className="tl-row"
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 'var(--space-5)',
                  position: 'relative',
                }}
              >
                {/* Left side: card if isLeft, empty if isRight */}
                <div className={`tl-side tl-left ${isLeft ? 'tl-has-card' : 'tl-empty'}`} style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  {isLeft && <TimelineCard event={event} index={i} />}
                </div>

                {/* Center node */}
                <div className="tl-node" style={{
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-bg-elevated)',
                  border: `2px solid ${event.current ? 'var(--color-accent)' : 'var(--color-primary-dim)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 3,
                  position: 'relative',
                  boxShadow: event.current ? 'var(--shadow-glow-accent)' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '9px',
                    color: event.current ? 'var(--color-accent)' : 'var(--color-text-low)',
                  }}>
                    {event.year.slice(-2)}
                  </span>
                  {event.current && <span className="pulse-dot" style={{
                    position: 'absolute', top: '-3px', right: '-3px',
                    width: '6px', height: '6px',
                  }} />}
                </div>

                {/* Right side: card if isRight, empty if isLeft */}
                <div className={`tl-side tl-right ${!isLeft ? 'tl-has-card' : 'tl-empty'}`} style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
                  {!isLeft && <TimelineCard event={event} index={i} />}
                </div>

                {/* Mobile-only: always render card after node (hidden on desktop) */}
                <div className="tl-mobile-card" style={{ display: 'none', flex: 1 }}>
                  <TimelineCard event={event} index={i} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE: collapse to single column with left line ── */}
      <style>{`
        @media (max-width: 767px) {
          .tl-line-svg {
            left: 16px !important;
            transform: none !important;
          }
          .tl-row {
            flex-wrap: wrap;
            gap: var(--space-3) !important;
          }
          .tl-side {
            display: none !important;
          }
          .tl-node {
            width: 28px !important;
            height: 28px !important;
            flex-shrink: 0 !important;
          }
          .tl-mobile-card {
            display: flex !important;
            flex: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

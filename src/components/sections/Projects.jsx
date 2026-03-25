import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionHeader from '../ui/SectionHeader.jsx';
import GlowBadge from '../ui/GlowBadge.jsx';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack.jsx';
import { PROJECTS } from '../../data/projects.js';

/* ═══════════════════════════════════════════
   CSS Illustrations — unique per project
   ═══════════════════════════════════════════ */
function ProjectIllustration({ type, color }) {
  const base = {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  if (type === 'books') {
    return (
      <div style={base}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${50 - i * 6}%`,
            height: '60%',
            background: `linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))`,
            border: `1px solid rgba(255,255,255,0.12)`,
            borderRadius: 'var(--radius-md)',
            transform: `translateX(${i * 14}px) rotate(${-4 + i * 2.5}deg)`,
            boxShadow: `inset 3px 0 0 rgba(255,255,255,0.2)`,
          }} />
        ))}
      </div>
    );
  }

  if (type === 'lock') {
    return (
      <div style={base}>
        <div style={{
          width: '70px',
          height: '56px',
          border: `2px solid rgba(255,255,255,0.25)`,
          borderRadius: 'var(--radius-md)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '-26px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '34px',
            height: '26px',
            borderTop: `2px solid rgba(255,255,255,0.25)`,
            borderLeft: `2px solid rgba(255,255,255,0.25)`,
            borderRight: `2px solid rgba(255,255,255,0.25)`,
            borderRadius: '17px 17px 0 0',
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: 'var(--radius-full)',
            background: '#fff',
            boxShadow: `0 0 30px rgba(255,255,255,0.6)`,
          }} />
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div style={{ ...base, flexWrap: 'wrap', gap: '6px', padding: '28px', justifyContent: 'center', alignContent: 'center' }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-sm)',
            background: i % 3 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
            border: `1px solid rgba(255,255,255,0.1)`,
          }} />
        ))}
      </div>
    );
  }

  // numbers / currency
  return (
    <div style={base}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
        fontWeight: 'var(--weight-bold)',
        color: 'rgba(255,255,255,0.15)',
        letterSpacing: '0.15em',
        userSelect: 'none',
      }}>
        $£€¥
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Project Card — full-width, coloured background.
   Designed to work inside ScrollStack.
   ═══════════════════════════════════════════ */
function ProjectCard({ project }) {
  return (
    <div style={{
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      maxWidth: '1000px',
      margin: '0 auto',
      background: project.color,
      boxShadow: `0 -8px 30px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)`,
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      {/* Two-column on desktop, stacked on mobile */}
      <div className="project-card-inner" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: 'clamp(320px, 45vw, 520px)',
      }}>
        {/* LEFT — Content */}
        <div style={{
          padding: 'clamp(24px, 4vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'var(--space-4)',
        }}>
          {/* Category badge */}
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: 'var(--tracking-widest)',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            background: 'rgba(0,0,0,0.25)',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            width: 'fit-content',
          }}>
            {project.category}
          </span>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--weight-black)',
            color: '#fff',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-snug)',
          }}>
            {project.title}
          </h3>

          {/* Description */}
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 'var(--leading-normal)',
          }}>
            {project.description}
          </p>

          {/* Tech pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((t) => (
              <span key={t} style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'rgba(255,255,255,0.85)',
                padding: '5px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.08)',
                letterSpacing: '0.04em',
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.link}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-bold)',
              color: '#fff',
              textDecoration: 'none',
              width: 'fit-content',
              padding: '10px 24px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.15)',
              marginTop: 'var(--space-2)',
              transition: 'background var(--transition-fast), gap var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
              e.currentTarget.style.gap = '14px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
              e.currentTarget.style.gap = '8px';
            }}
          >
            View Project <ArrowUpRight size={15} strokeWidth={2.5} />
          </a>
        </div>

        {/* RIGHT — Illustration */}
        <div style={{
          background: 'rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
        }}>
          <ProjectIllustration type={project.illustration} color={project.color} />
          {/* Rounded inset box in the corner — like the reference image */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(16px, 3vw, 32px)',
            right: 'clamp(16px, 3vw, 32px)',
            width: 'clamp(80px, 12vw, 140px)',
            height: 'clamp(80px, 12vw, 140px)',
            borderRadius: 'var(--radius-lg)',
            border: '2px solid rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--weight-black)',
              color: 'rgba(255,255,255,0.8)',
            }}>
              0{PROJECTS.indexOf(PROJECTS.find(p => p.color === project.color)) + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile: single column */}
      <style>{`
        @media (max-width: 767px) {
          .project-card-inner {
            grid-template-columns: 1fr !important;
          }
          .project-card-inner > div:last-child {
            min-height: 200px;
            border-left: none !important;
            border-top: 1px solid rgba(255,255,255,0.06);
          }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROJECTS SECTION — ScrollStack stacking deck
   ═══════════════════════════════════════════ */
export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: 'var(--section-py) var(--section-px)',
        paddingBottom: 'calc(var(--section-py) + 120px)', // extra room for last sticky card
        background: 'var(--color-bg-base)',
      }}
    >
      <SectionHeader eyebrow="Work" heading="Selected Projects" />

      <ScrollStack>
        {PROJECTS.map((project, i) => (
          <ScrollStackItem key={project.id} color={project.color}>
            <ProjectCard project={project} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}

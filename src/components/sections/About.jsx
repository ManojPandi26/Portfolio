import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import BlurText from '../reactbits/BlurText.jsx';
import ScrollFloat from '../reactbits/ScrollFloat.jsx';
import GradientText from '../reactbits/GradientText.jsx';

/* ═══════════════════════════════════════════
   ABOUT SECTION — clean two-column split
   Left: text content    Right: monogram + stats
   No conic rotation. No unnecessary animation.
   ═══════════════════════════════════════════ */

const STATS = [
  { label: 'Projects Shipped', end: 20, suffix: '+' },
  { label: 'Technologies', end: 15, suffix: '+' },
  { label: 'Contributions', end: 200, suffix: '+' },
];

function CountUp({ end, suffix = '', duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, end, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, end, duration]);

  return (
    <span ref={ref} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {display}{suffix}
    </span>
  );
}

function MarqueeStrip() {
  const items = [
    'JAVA', '·', 'SPRING BOOT', '·', 'MICROSERVICES', '·', 'REST API', '·',
    'DOCKER', '·', 'KUBERNETES', '·', 'AWS', '·', 'REACT', '·',
    'POSTGRESQL', '·', 'REDIS', '·', 'KAFKA', '·', 'CI/CD', '·',
  ];
  const allItems = [...items, ...items, ...items];

  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
      padding: 'var(--space-3) 0',
      marginTop: 'var(--space-6)',
    }}>
      <div style={{
        display: 'flex', gap: 'var(--space-5)', whiteSpace: 'nowrap',
        animation: 'marquee-left 30s linear infinite',
      }}>
        {allItems.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)',
            color: item === '·' ? 'var(--color-primary-dim)' : 'var(--color-text-low)',
            letterSpacing: 'var(--tracking-widest)', flexShrink: 0,
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: 'var(--section-py) 0',
        background: 'var(--color-bg-elevated)',
        overflow: 'hidden',
      }}
    >
      {/* ── Two-column split ── */}
      <div className="about-split" style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: 'var(--space-7)',
        maxWidth: '960px',
        margin: '0 auto',
        padding: '0 var(--section-px)',
        alignItems: 'start',
      }}>
        {/* LEFT — Text content */}
        <ScrollFloat direction="left" offset={40}>
          <div>
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>ABOUT ME</p>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-black)',
              color: 'var(--color-text-high)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-snug)',
              marginBottom: 'var(--space-4)',
            }}>
              I build systems <br />
              <GradientText colors={['#6366F1','#06B6D4','#10B981']} animationSpeed={4}>
                that scale.
              </GradientText>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-mid)',
              lineHeight: 'var(--leading-relaxed)',
              marginBottom: 'var(--space-4)',
            }}>
              I'm a Java Backend Engineer passionate
              about building production-grade distributed systems. I focus on
              clean architecture, performance optimization, and developer
              experience.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-mid)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              My toolkit includes Spring Boot, Docker, Kubernetes, PostgreSQL,
              and cloud-native patterns. I believe great software is invisible —
              it works so well that nobody thinks about it.
            </p>
          </div>
        </ScrollFloat>

        {/* RIGHT — Monogram + Stats */}
        <ScrollFloat direction="right" offset={40}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Monogram card */}
            <div className="glass" style={{
              aspectRatio: '1',
              maxWidth: '240px',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-border)',
              margin: '0 auto',
              width: '100%',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                fontWeight: 'var(--weight-black)',
                color: 'var(--color-text-high)',
                opacity: 0.12,
                userSelect: 'none',
              }}>
                MP
              </span>
            </div>

            {/* Stats inside glass wells */}
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-3)',
            }}>
              {STATS.map((stat) => (
                <div key={stat.label} className="glass-inset" style={{
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--weight-black)',
                    color: 'var(--color-text-high)',
                    marginBottom: '2px',
                  }}>
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: 'var(--color-text-low)',
                    letterSpacing: '0.04em',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollFloat>
      </div>

      {/* Marquee strip */}
      <MarqueeStrip />

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 767px) {
          .about-split {
            grid-template-columns: 1fr !important;
            gap: var(--space-5) !important;
          }
          .stats-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

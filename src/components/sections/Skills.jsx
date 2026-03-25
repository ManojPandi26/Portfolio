import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader.jsx';
import ScrollFloat from '../reactbits/ScrollFloat.jsx';
import GradientText from '../reactbits/GradientText.jsx';
import { SKILLS, SKILLS_ROW2 } from '../../data/skills.js';

/* ═══════════════════════════════════════════
   Marquee Row — infinite CSS scroll.
   Hover → SLOWS DOWN (5× slower), not faster.
   Edge-fade mask for polish.
   ═══════════════════════════════════════════ */
function MarqueeRow({ items, direction = 'left', baseDuration = 40 }) {
  const [hovered, setHovered] = useState(false);
  const duration = hovered ? baseDuration * 5 : baseDuration;
  const animName = direction === 'left' ? 'marquee-left' : 'marquee-right';
  const allItems = [...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: 'hidden',
        padding: 'var(--space-3) 0',
        maskImage: 'linear-gradient(90deg, transparent, black 4%, black 96%, transparent)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent, black 4%, black 96%, transparent)',
      }}
    >
      <div style={{
        display: 'flex',
        gap: 'var(--space-4)',
        whiteSpace: 'nowrap',
        animationName: animName,
        animationDuration: `${duration}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        willChange: 'transform',
      }}>
        {allItems.map((skill, i) => (
          <SkillPill key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Skill Pill — devicon + label with hover glow.
   ═══════════════════════════════════════════ */
function SkillPill({ skill }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -3 }}
      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      className="glass"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '10px 22px',
        borderRadius: 'var(--radius-full)',
        flexShrink: 0,
        border: `1px solid ${skill.color}15`,
        cursor: 'default',
        transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${skill.color}50`;
        e.currentTarget.style.boxShadow = `0 0 28px ${skill.color}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${skill.color}15`;
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      <img
        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
        alt=""
        width={22}
        height={22}
        loading="lazy"
        style={{ filter: 'brightness(0.9)', flexShrink: 0 }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--color-text-mid)',
        letterSpacing: 'var(--tracking-wide)',
      }}>
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SKILLS SECTION — clean dual marquee only.
   Featured grid removed per user request.
   ═══════════════════════════════════════════ */
export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: 'var(--section-py) 0',
        background: 'var(--color-bg-elevated)',
        overflow: 'hidden',
      }}
    >
      <div style={{ padding: '0 var(--section-px)' }}>
        <SectionHeader eyebrow="Capabilities" heading="Tech Stack" />
      </div>

      {/* Dual marquee rows — opposite directions, hover slows */}
      <div>
        <MarqueeRow items={SKILLS}      direction="left"  baseDuration={45} />
        <div style={{ height: 'var(--space-3)' }} />
        <MarqueeRow items={SKILLS_ROW2} direction="right" baseDuration={38} />
      </div>
    </section>
  );
}

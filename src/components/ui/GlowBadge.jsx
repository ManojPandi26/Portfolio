import React from 'react';

const COLOR_MAP = {
  primary: { border: 'var(--color-primary-dim)', glow: 'var(--color-primary-glow)', text: 'var(--color-primary)' },
  accent:  { border: 'var(--color-accent-dim)',  glow: 'var(--color-accent-glow)',  text: 'var(--color-accent)' },
  neutral: { border: 'var(--color-border-lit)',   glow: 'transparent',               text: 'var(--color-text-mid)' },
};

export default function GlowBadge({ children, variant = 'accent', style = {} }) {
  const c = COLOR_MAP[variant] || COLOR_MAP.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        letterSpacing: 'var(--tracking-widest)',
        color: c.text,
        textTransform: 'uppercase',
        padding: '6px 14px',
        borderRadius: 'var(--radius-full)',
        border: `1px solid ${c.border}`,
        boxShadow: `0 0 20px ${c.glow}`,
        background: 'var(--color-bg-glass)',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

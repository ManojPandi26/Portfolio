import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const FOOTER_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIALS = [
  { Icon: Github, href: 'https://github.com/ManojPandi26', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/manoj-pandi', label: 'LinkedIn' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-8) var(--section-px)',
        background: 'var(--color-bg-base)',
      }}
    >
      {/* Three columns */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-7)',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start',
        }}
      >
        {/* Branding */}
        <div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--weight-black)',
            color: 'var(--color-text-high)',
            letterSpacing: 'var(--tracking-tight)',
          }}>
            Manoj
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-low)',
            letterSpacing: 'var(--tracking-wide)',
            marginTop: 'var(--space-2)',
          }}>
            Java Backend Engineer
          </p>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-mid)',
                textDecoration: 'none',
                letterSpacing: 'var(--tracking-wide)',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-high)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-mid)'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Socials */}
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {SOCIALS.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-mid)',
                textDecoration: 'none',
                transition: 'color var(--transition-fast), box-shadow var(--transition-normal)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-glow-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-mid)';
                e.currentTarget.style.boxShadow = 'var(--shadow-card)';
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright bar */}
      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--color-text-low)',
        marginTop: 'var(--space-7)',
        letterSpacing: 'var(--tracking-wide)',
      }}>
        © 2026 Manoj. Crafted with precision.
      </p>
    </footer>
  );
}

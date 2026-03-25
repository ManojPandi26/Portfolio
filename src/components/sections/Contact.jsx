import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, ExternalLink, Copy, Check } from 'lucide-react';
import SplitText from '../ui/SplitText.jsx';
import MagneticButton from '../ui/MagneticButton.jsx';
import Footer from '../layout/Footer.jsx';

const CONTACTS = [
  {
    label: 'manojpandi680@gmail.com',
    href: 'mailto:manojpandi680@gmail.com',
    Icon: Mail,
    copyable: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/manoj-pandi',
    Icon: Linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ManojPandi26',
    Icon: Github,
    external: true,
  },
];

function ContactButton({ contact }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e) => {
    if (contact.copyable) {
      e.preventDefault();
      await navigator.clipboard.writeText(contact.label);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <MagneticButton strength={0.12}>
      <motion.a
        href={contact.href}
        target={contact.external ? '_blank' : undefined}
        rel={contact.external ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-5) var(--space-6)',
          borderRadius: 'var(--radius-lg)',
          textDecoration: 'none',
          color: 'var(--color-text-high)',
          width: '100%',
          maxWidth: '420px',
          transition: 'border-color var(--transition-normal), box-shadow var(--transition-normal)',
          overflow: 'hidden',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-primary-dim)';
          e.currentTarget.style.boxShadow = 'var(--shadow-glow-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        }}
      >
        <contact.Icon size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--weight-medium)',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {contact.label}
        </span>
        {contact.copyable ? (
          copied ? <Check size={16} style={{ color: 'var(--color-accent)' }} /> : <Copy size={16} style={{ color: 'var(--color-text-low)' }} />
        ) : (
          <ExternalLink size={16} style={{ color: 'var(--color-text-low)' }} />
        )}

        {/* Shimmer sweep on hover */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
          transform: 'translateX(-100%)',
          transition: 'none',
          pointerEvents: 'none',
        }}
          className="shimmer-layer"
        />
      </motion.a>
    </MagneticButton>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <>
      <section
        id="contact"
        ref={ref}
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--section-py) var(--section-px)',
          background: 'var(--color-bg-base)',
          position: 'relative',
          textAlign: 'center',
        }}
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="eyebrow"
          style={{ marginBottom: 'var(--space-5)' }}
        >
          GET IN TOUCH
        </motion.p>

        {/* Headline */}
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <SplitText
            text="Let's Build Something"
            mode="word"
            delay={0.1}
            stagger={0.06}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-semibold)',
              color: 'var(--color-text-high)',
              lineHeight: 'var(--leading-snug)',
              justifyContent: 'center',
            }}
          />
        </div>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <SplitText
            text="Great Together."
            mode="word"
            delay={0.4}
            stagger={0.06}
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--weight-black)',
              lineHeight: 'var(--leading-snug)',
              justifyContent: 'center',
            }}
          />
        </div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-mid)',
            lineHeight: 'var(--leading-normal)',
            maxWidth: '580px',
            marginBottom: 'var(--space-8)',
          }}
        >
          I'm currently open to backend engineering roles, SaaS collaborations, and technical freelance projects. Let's talk.
        </motion.p>

        {/* Contact buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
          width: '100%',
        }}>
          {CONTACTS.map((contact, i) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.1 }}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
            >
              <ContactButton contact={contact} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}

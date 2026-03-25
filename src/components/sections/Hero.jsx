import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Aurora from '../reactbits/Aurora.jsx';
import BlurText from '../reactbits/BlurText.jsx';
import DecryptedText from '../reactbits/DecryptedText.jsx';
import GradientText from '../reactbits/GradientText.jsx';
import MagneticButton from '../ui/MagneticButton.jsx';

export default function Hero() {
  const [nameRevealed, setNameRevealed] = useState(false);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg-base)',
      }}
    >
      {/* Aurora canvas bg */}
      <Aurora
        colorStops={['#6366F1', '#8B5CF6', '#06B6D4', '#0F172A']}
        blend={0.45}
        speed={0.7}
        blur={110}
      />

      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '0 var(--section-px)',
        maxWidth: '960px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}>
        {/* Eyebrow */}
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ marginBottom: 0 }}
        >
          HELLO, I'M
        </motion.span>

        {/* Name — forced single line */}
        <BlurText
          text="Manoj Pandi"
          animateBy="character"
          direction="bottom"
          delay={0.4}
          onAnimationComplete={() => setNameRevealed(true)}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            fontWeight: 'var(--weight-black)',
            letterSpacing: 'var(--tracking-tighter)',
            lineHeight: '1.05',
            color: 'var(--color-text-high)',
            whiteSpace: 'nowrap',
            justifyContent: 'center',
          }}
        />

        {/* Role — DecryptedText in gradient */}
        <AnimatePresence>
          {nameRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <GradientText
                colors={['#6366F1', '#8B5CF6', '#06B6D4', '#10B981']}
                animationSpeed={5}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--weight-semibold)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                <DecryptedText
                  text="Java Backend Engineer"
                  speed={40}
                  maxIterations={15}
                  sequential
                  revealDirection="start"
                  animateOn="view"
                />
              </GradientText>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={nameRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.4 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-mid)',
            lineHeight: 'var(--leading-normal)',
            maxWidth: '520px',
            marginTop: 'var(--space-2)',
          }}
        >
          Building scalable microservices, REST APIs, and cloud-native
          systems that solve real-world problems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={nameRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.4 }}
          style={{
            display: 'flex',
            gap: 'var(--space-3)',
            marginTop: 'var(--space-3)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <MagneticButton strength={0.12}>
            <a href="#projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)', color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              border: 'none', letterSpacing: '0.02em',
              transition: 'box-shadow var(--transition-fast)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'var(--shadow-glow-primary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >View Work</a>
          </MagneticButton>

          <MagneticButton strength={0.12}>
            <a href="#contact" className="glass" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '12px 28px', borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-semibold)', color: 'var(--color-text-high)',
              textDecoration: 'none', border: '1px solid var(--color-border)',
              letterSpacing: '0.02em', transition: 'border-color var(--transition-fast)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary-dim)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
            >Get In Touch</a>
          </MagneticButton>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={nameRevealed ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.3 }}
          style={{ display: 'flex', gap: 'var(--space-5)', marginTop: 'var(--space-4)' }}
        >
          {[
            { Icon: Github, href: 'https://github.com/ManojPandi26' },
            { Icon: Linkedin, href: 'https://linkedin.com/in/manoj-pandi' },
            { Icon: Mail, href: 'mailto:manojpandi680@gmail.com' },
          ].map(({ Icon, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: 'var(--color-text-low)', transition: 'color var(--transition-fast), transform var(--transition-fast)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-low)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            ><Icon size={20} /></a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: 'var(--space-6)', left: '50%',
          transform: 'translateX(-50%)', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-text-low)', letterSpacing: 'var(--tracking-widest)' }}>SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
          <ArrowDown size={14} style={{ color: 'var(--color-text-low)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

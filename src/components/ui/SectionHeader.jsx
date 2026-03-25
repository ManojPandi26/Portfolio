import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SectionHeader({ eyebrow, heading, subtext, center = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      style={{
        textAlign: center ? 'center' : 'left',
        marginBottom: 'var(--space-8)',
        maxWidth: center ? '720px' : undefined,
        margin: center ? '0 auto var(--space-8)' : undefined,
      }}
    >
      {eyebrow && (
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'var(--space-3)' }}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.08, duration: 0.6 }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--weight-black)',
          letterSpacing: 'var(--tracking-tight)',
          color: 'var(--color-text-high)',
          lineHeight: 'var(--leading-tight)',
        }}
      >
        {heading}
      </motion.h2>
      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.5 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-mid)',
            lineHeight: 'var(--leading-normal)',
            marginTop: 'var(--space-4)',
          }}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
}

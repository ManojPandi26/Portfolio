import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * SplitText — word-by-word or character-by-character reveal animation.
 * Inspired by React Bits' SplitText, built with Framer Motion.
 *
 * @param {string}  text      — the text to animate
 * @param {'word'|'char'} mode  — split mode
 * @param {number}  delay     — initial delay in seconds
 * @param {number}  stagger   — time between each unit
 * @param {object}  style     — additional inline styles
 * @param {string}  className — additional class names
 */
export default function SplitText({
  text = '',
  mode = 'word',
  delay = 0,
  stagger = 0.05,
  style = {},
  className = '',
  once = true,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  const units = mode === 'char' ? text.split('') : text.split(' ');

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            initial={{ y: '110%', rotateX: 8, opacity: 0 }}
            animate={inView ? { y: 0, rotateX: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              display: 'inline-block',
              whiteSpace: mode === 'char' ? 'pre' : undefined,
            }}
          >
            {unit}
          </motion.span>
          {mode === 'word' && i < units.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.3em' }} />
          )}
        </span>
      ))}
    </span>
  );
}

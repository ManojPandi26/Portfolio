import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * BlurText — text that blurs in from invisible to sharp, word by word.
 * Inspired by React Bits BlurText component.
 */
export default function BlurText({
  text = '',
  delay = 0,
  className = '',
  style = {},
  animateBy = 'word',      // 'word' | 'character'
  direction = 'bottom',    // 'top' | 'bottom'
  threshold = 0.1,
  rootMargin = '0px',
  onAnimationComplete,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStarted(true), delay * 1000);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  const elements = animateBy === 'word'
    ? text.split(' ').map((w, i) => ({ text: w, key: i }))
    : text.split('').map((c, i) => ({ text: c === ' ' ? '\u00A0' : c, key: i }));

  const yFrom = direction === 'bottom' ? 12 : -12;

  return (
    <span ref={ref} className={className} style={{
      display: 'inline-flex',
      flexWrap: 'wrap',
      ...style,
    }}>
      {elements.map((el, i) => (
        <motion.span
          key={el.key}
          initial={{ opacity: 0, filter: 'blur(12px)', y: yFrom }}
          animate={started ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          style={{
            display: 'inline-block',
            willChange: 'filter, opacity, transform',
          }}
        >
          {el.text}{animateBy === 'word' ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}

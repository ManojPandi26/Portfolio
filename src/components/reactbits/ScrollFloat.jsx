import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

/**
 * ScrollFloat — text that floats up and fades in as user scrolls to it.
 * Adds a gentle parallax-like float effect.
 * Inspired by React Bits ScrollFloat component.
 */
export default function ScrollFloat({
  children,
  direction = 'up',     // 'up' | 'down' | 'left' | 'right'
  offset = 60,
  stiffness = 80,
  damping = 20,
  style = {},
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const mapDir = {
    up:    { initial: { y: offset, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    down:  { initial: { y: -offset, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    left:  { initial: { x: offset, opacity: 0 }, animate: { x: 0, opacity: 1 } },
    right: { initial: { x: -offset, opacity: 0 }, animate: { x: 0, opacity: 1 } },
  };

  const { initial, animate } = mapDir[direction] || mapDir.up;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{
        type: 'spring',
        stiffness,
        damping,
        mass: 0.8,
      }}
      className={className}
      style={{ willChange: 'transform, opacity', ...style }}
    >
      {children}
    </motion.div>
  );
}

import React, { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * GradientText — text with an animated gradient that shifts continuously.
 * Inspired by React Bits GradientText component.
 */
export default function GradientText({
  children,
  colors = ['#6366F1', '#8B5CF6', '#06B6D4', '#10B981', '#6366F1'],
  animationSpeed = 4,
  className = '',
  style = {},
}) {
  const gradientColors = colors.join(', ');

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        backgroundImage: `linear-gradient(90deg, ${gradientColors})`,
        backgroundSize: '300% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: `gradient-shift ${animationSpeed}s ease-in-out infinite alternate`,
        ...style,
      }}
    >
      {children}

      <style>{`
        @keyframes gradient-shift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}

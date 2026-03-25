import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
  children,
  className = '',
  style = {},
  hover = true,
  inset = false,
  as = 'div',
  ...props
}) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      whileHover={hover ? {
        y: -4,
        boxShadow: 'var(--shadow-card-hover)',
        transition: { duration: 0.25 },
      } : undefined}
      className={inset ? `glass-inset ${className}` : `glass ${className}`}
      style={{
        borderRadius: 'var(--radius-lg)',
        ...style,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

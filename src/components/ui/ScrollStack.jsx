import React, { Children, cloneElement } from 'react';

/**
 * ScrollStack — CSS position:sticky stacking cards.
 *
 * As you scroll down, each card sticks to the top of the viewport.
 * The next card scrolls up and covers the previous one. The previous
 * card remains slightly visible at the top as a thin coloured strip,
 * creating a layered deck effect (exactly like the reference image).
 *
 * Scrolling back up reveals the previous cards naturally.
 *
 * Usage:
 *   <ScrollStack>
 *     <ScrollStackItem color="#6366F1"><Card1 /></ScrollStackItem>
 *     <ScrollStackItem color="#22C55E"><Card2 /></ScrollStackItem>
 *   </ScrollStack>
 */

const STICKY_TOP_START = 80;   // px — below navbar
const STICKY_STEP      = 28;   // px — how much of each "behind" card is visible

export function ScrollStackItem({ children, color, style = {}, className = '', index = 0 }) {
  const stickyTop = STICKY_TOP_START + index * STICKY_STEP;

  return (
    <div
      className={`scroll-stack-item ${className}`}
      style={{
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: index + 1,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function ScrollStack({ children }) {
  const items = Children.toArray(children);

  return (
    <div style={{ position: 'relative' }}>
      {items.map((child, i) =>
        cloneElement(child, {
          index: i,
          key: i,
        })
      )}
    </div>
  );
}

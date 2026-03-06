import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Custom cursor: a small glowing dot + a larger lagging ring
export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // The ring lags behind with spring physics
    const springConfig = { damping: 25, stiffness: 200 };
    const ringX = useSpring(cursorX, springConfig);
    const ringY = useSpring(cursorY, springConfig);

    const isDotVisible = useRef(true);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    // Add hover class to interactive elements
    useEffect(() => {
        const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
        const onEnter = () => document.documentElement.classList.add('cursor-hover');
        const onLeave = () => document.documentElement.classList.remove('cursor-hover');

        interactives.forEach((el) => {
            el.addEventListener('mouseenter', onEnter);
            el.addEventListener('mouseleave', onLeave);
        });
        return () => {
            interactives.forEach((el) => {
                el.removeEventListener('mouseenter', onEnter);
                el.removeEventListener('mouseleave', onLeave);
            });
        };
    }, []);

    return (
        <div className="custom-cursor" style={{ pointerEvents: 'none', position: 'fixed', zIndex: 99999, top: 0, left: 0 }}>
            {/* Lagging outer ring */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: -20,
                    left: -20,
                    x: ringX,
                    y: ringY,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '1px solid var(--color-primary)',
                    opacity: 0.6,
                    pointerEvents: 'none',
                }}
            />
            {/* Small glowing dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: -4,
                    left: -4,
                    x: cursorX,
                    y: cursorY,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    boxShadow: '0 0 12px var(--color-primary)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}

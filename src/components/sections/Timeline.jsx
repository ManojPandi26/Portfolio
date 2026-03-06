import React, { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_EVENTS } from '../../utils/constants.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

function TimelineNode({ event, index, prefersReduced }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const isLeft = event.side === 'left';

    return (
        <div
            ref={ref}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 64px 1fr',
                alignItems: 'start',
                gap: 'var(--space-5)',
                position: 'relative',
                marginBottom: 'var(--space-8)',
            }}
        >
            {/* LEFT card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 0 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ justifySelf: isLeft ? 'flex-end' : 'flex-start', maxWidth: '380px', width: '100%', gridColumn: isLeft ? 1 : 3 }}
            >
                {isLeft && (
                    <div
                        className="glass"
                        style={{
                            padding: 'var(--space-5) var(--space-6)',
                            borderRadius: 'var(--radius-lg)',
                            borderLeft: `3px solid ${event.color}`,
                        }}
                    >
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            color: event.color,
                            letterSpacing: 'var(--tracking-widest)',
                        }}>{event.year}</span>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--weight-bold)',
                            color: 'var(--color-text-high)',
                            letterSpacing: 'var(--tracking-tight)',
                            margin: 'var(--space-2) 0',
                        }}>{event.title}</h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-mid)',
                            lineHeight: 'var(--leading-normal)',
                        }}>{event.description}</p>
                    </div>
                )}
            </motion.div>

            {/* Center dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gridColumn: 2 }}>
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.2, type: 'spring', stiffness: 300 }}
                    style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: event.color,
                        boxShadow: `0 0 20px ${event.color}60`,
                        flexShrink: 0,
                        position: 'relative',
                        zIndex: 2,
                    }}
                >
                    {event.isCurrent && (
                        <motion.div
                            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            style={{
                                position: 'absolute',
                                inset: -4,
                                borderRadius: '50%',
                                border: `2px solid ${event.color}`,
                            }}
                        />
                    )}
                </motion.div>
            </div>

            {/* RIGHT card */}
            <motion.div
                initial={{ opacity: 0, x: !isLeft ? 50 : 0 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ justifySelf: !isLeft ? 'flex-start' : 'flex-end', maxWidth: '380px', width: '100%', gridColumn: isLeft ? 3 : 1 }}
            >
                {!isLeft && (
                    <div
                        className="glass"
                        style={{
                            padding: 'var(--space-5) var(--space-6)',
                            borderRadius: 'var(--radius-lg)',
                            borderLeft: `3px solid ${event.color}`,
                        }}
                    >
                        <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            color: event.color,
                            letterSpacing: 'var(--tracking-widest)',
                        }}>{event.year}</span>
                        <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-lg)',
                            fontWeight: 'var(--weight-bold)',
                            color: 'var(--color-text-high)',
                            letterSpacing: 'var(--tracking-tight)',
                            margin: 'var(--space-2) 0',
                        }}>{event.title}</h3>
                        <p style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-mid)',
                            lineHeight: 'var(--leading-normal)',
                        }}>{event.description}</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default function Timeline() {
    const prefersReduced = useReducedMotion();
    const containerRef = useRef(null);
    const svgRef = useRef(null);
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start 0.8', 'end 0.8'],
    });

    // Animate SVG line stroke-dashoffset based on scroll
    useEffect(() => {
        if (prefersReduced || !svgRef.current) return;
        const line = svgRef.current.querySelector('#timeline-path');
        if (!line) return;
        const len = line.getTotalLength();
        line.style.strokeDasharray = len;
        line.style.strokeDashoffset = len;

        const unsubscribe = scrollYProgress.on('change', (v) => {
            line.style.strokeDashoffset = len * (1 - v);
        });
        return unsubscribe;
    }, [scrollYProgress, prefersReduced]);

    return (
        <section
            id="timeline"
            style={{
                padding: 'var(--section-py) var(--section-px)',
                background: 'var(--color-bg-elevated)',
                position: 'relative',
            }}
        >
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Header */}
                <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 'var(--space-9)' }}>
                    <motion.p
                        className="eyebrow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        style={{ marginBottom: 'var(--space-3)' }}
                    >
                        Journey
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 }}
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 'var(--weight-black)',
                            letterSpacing: 'var(--tracking-tight)',
                            color: 'var(--color-text-high)',
                        }}
                    >
                        My Timeline
                    </motion.h2>
                </div>

                {/* Timeline container */}
                <div ref={containerRef} style={{ position: 'relative' }}>
                    {/* SVG vertical line */}
                    <svg
                        ref={svgRef}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: 0,
                            transform: 'translateX(-50%)',
                            height: '100%',
                            width: '2px',
                            zIndex: 0,
                            overflow: 'visible',
                        }}
                        viewBox="0 0 2 1000"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                                <stop offset="0%" stopColor="#6366F1" />
                                <stop offset="100%" stopColor="#22C55E" />
                            </linearGradient>
                        </defs>
                        <path
                            id="timeline-path"
                            d="M 1 0 L 1 1000"
                            stroke="url(#lineGrad)"
                            strokeWidth="2"
                            fill="none"
                            style={{ vectorEffect: 'non-scaling-stroke' }}
                        />
                    </svg>

                    {/* Events */}
                    {TIMELINE_EVENTS.map((event, i) => (
                        <TimelineNode
                            key={event.id}
                            event={event}
                            index={i}
                            prefersReduced={prefersReduced}
                        />
                    ))}
                </div>
            </div>

            {/* Mobile: vertical stack (override grid) */}
            <style>{`
        @media (max-width: 640px) {
          #timeline [style*="grid-template-columns: 1fr 64px 1fr"] {
            display: flex !important;
            flex-direction: column !important;
          }
        }
      `}</style>
        </section>
    );
}

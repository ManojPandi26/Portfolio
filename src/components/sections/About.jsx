import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { staggerContainer, staggerItem, springPop, slideInLeft, slideInRight, getVariant } from '../../utils/animationVariants.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

function StatCard({ value, label, delay, prefersReduced }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            variants={getVariant(springPop, prefersReduced)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay }}
            className="glass"
            style={{
                padding: 'var(--space-5) var(--space-6)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                minWidth: '130px',
                position: 'relative',
                overflow: 'hidden',
            }}
            whileHover={{ scale: 1.05, boxShadow: 'var(--shadow-glow-primary)' }}
        >
            <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--weight-black)',
                letterSpacing: 'var(--tracking-tight)',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                {value}
            </div>
            <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-mid)',
                letterSpacing: 'var(--tracking-wide)',
                marginTop: 'var(--space-1)',
                textTransform: 'uppercase',
            }}>
                {label}
            </div>
        </motion.div>
    );
}

export default function About() {
    const prefersReduced = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    const lines = [
        "I'm a Java Backend Engineer",
        "who loves turning complex problems",
        "into clean, scalable systems.",
    ];

    return (
        <section
            id="about"
            style={{
                padding: 'var(--section-py) var(--section-px)',
                maxWidth: '1280px',
                margin: '0 auto',
            }}
        >
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-9)',
                alignItems: 'center',
            }}>
                {/* Left — text reveal */}
                <motion.div
                    ref={ref}
                    variants={getVariant(staggerContainer(0.15, 0.2), prefersReduced)}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                >
                    <motion.p
                        variants={getVariant(staggerItem, prefersReduced)}
                        className="eyebrow"
                        style={{ marginBottom: 'var(--space-4)' }}
                    >
                        About Me
                    </motion.p>

                    <div style={{ marginBottom: 'var(--space-6)' }}>
                        {lines.map((line, i) => (
                            <div key={i} style={{ overflow: 'hidden' }}>
                                <motion.h2
                                    variants={getVariant(staggerItem, prefersReduced)}
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: 'var(--text-3xl)',
                                        fontWeight: 'var(--weight-black)',
                                        letterSpacing: 'var(--tracking-tight)',
                                        lineHeight: 'var(--leading-snug)',
                                        color: i === 2 ? undefined : 'var(--color-text-high)',
                                        ...(i === 2 ? {
                                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundClip: 'text',
                                        } : {}),
                                    }}
                                >
                                    {line}
                                </motion.h2>
                            </div>
                        ))}
                    </div>

                    <motion.p
                        variants={getVariant(staggerItem, prefersReduced)}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-base)',
                            color: 'var(--color-text-mid)',
                            lineHeight: 'var(--leading-loose)',
                            marginBottom: 'var(--space-6)',
                        }}
                    >
                        With 2+ years of hands-on experience building backend systems, I specialize in
                        Spring Boot microservices, RESTful APIs, and JWT-based authentication. I thrive
                        in environments where performance and reliability matter.
                    </motion.p>

                    <motion.p
                        variants={getVariant(staggerItem, prefersReduced)}
                        style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-base)',
                            color: 'var(--color-text-mid)',
                            lineHeight: 'var(--leading-loose)',
                        }}
                    >
                        When I'm not designing APIs, I'm exploring the system design space, contributing
                        to open source, or learning something new about distributed systems.
                    </motion.p>
                </motion.div>

                {/* Right — image + stat cards */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
                    {/* Profile image placeholder with glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        style={{
                            width: '220px',
                            height: '220px',
                            borderRadius: '50%',
                            border: '2px solid var(--color-primary)',
                            boxShadow: 'var(--shadow-glow-primary), 0 0 80px rgba(99,102,241,0.2)',
                            overflow: 'hidden',
                            flexShrink: 0,
                            background: 'var(--color-bg-elevated)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        {/* Avatar initials fallback */}
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 'var(--weight-black)',
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>
                            MP
                        </span>
                    </motion.div>

                    {/* Stat cards */}
                    <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <StatCard value="2+" label="Years Exp." delay={0.5} prefersReduced={prefersReduced} />
                        <StatCard value="10+" label="Projects" delay={0.65} prefersReduced={prefersReduced} />
                        <StatCard value="4" label="SaaS APIs" delay={0.8} prefersReduced={prefersReduced} />
                    </div>
                </div>
            </div>
        </section>
    );
}

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, staggerItem, getVariant } from '../../utils/animationVariants.js';
import { SKILL_GROUPS } from '../../utils/constants.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

function SkillCard({ skill, delay, prefersReduced }) {
    return (
        <motion.div
            variants={getVariant(staggerItem, prefersReduced)}
            whileHover={prefersReduced ? {} : {
                y: -4,
                scale: 1.05,
                boxShadow: 'var(--shadow-glow-primary)',
                borderColor: 'var(--color-primary)',
            }}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-5) var(--space-4)',
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'default',
                transition: 'box-shadow var(--transition-normal), border-color var(--transition-normal)',
                minWidth: '88px',
            }}
        >
            <span style={{ fontSize: '1.8rem', lineHeight: 1, userSelect: 'none' }}>{skill.icon}</span>
            <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-mid)',
                letterSpacing: 'var(--tracking-wide)',
                textAlign: 'center',
                whiteSpace: 'nowrap',
            }}>
                {skill.name}
            </span>
        </motion.div>
    );
}

export default function Skills() {
    const prefersReduced = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="skills"
            style={{
                padding: 'var(--section-py) var(--section-px)',
                background: 'var(--color-bg-elevated)',
            }}
        >
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    ref={ref}
                    style={{ textAlign: 'center', marginBottom: 'var(--space-9)' }}
                >
                    <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>Tech Stack</p>
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--weight-black)',
                        letterSpacing: 'var(--tracking-tight)',
                        color: 'var(--color-text-high)',
                    }}>
                        Tools I Work With
                    </h2>
                </motion.div>

                {/* Skill groups */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                    {SKILL_GROUPS.map((group, gi) => (
                        <div key={group.label}>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.5, delay: gi * 0.1 }}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: 'var(--text-xs)',
                                    color: 'var(--color-text-low)',
                                    letterSpacing: 'var(--tracking-widest)',
                                    textTransform: 'uppercase',
                                    marginBottom: 'var(--space-4)',
                                    borderLeft: '2px solid var(--color-primary)',
                                    paddingLeft: 'var(--space-3)',
                                }}
                            >
                                {group.label}
                            </motion.p>
                            <motion.div
                                variants={getVariant(staggerContainer(0.07, gi * 0.1), prefersReduced)}
                                initial="hidden"
                                animate={inView ? 'visible' : 'hidden'}
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 'var(--space-4)',
                                }}
                            >
                                {group.skills.map((skill) => (
                                    <SkillCard
                                        key={skill.name}
                                        skill={skill}
                                        prefersReduced={prefersReduced}
                                    />
                                ))}
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

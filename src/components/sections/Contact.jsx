import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../../utils/constants.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

function ContactLink({ icon: Icon, label, href, color }) {
    return (
        <motion.a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -4, boxShadow: `0 0 60px ${color}40` }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                padding: 'var(--space-5) var(--space-7)',
                background: 'var(--color-bg-elevated)',
                border: `1px solid ${color}40`,
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                color: 'var(--color-text-high)',
                transition: 'border-color var(--transition-normal)',
                width: '100%',
                maxWidth: '480px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${color}40`; }}
        >
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-md)',
                background: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}>
                <Icon size={22} color={color} />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-text-low)',
                    letterSpacing: 'var(--tracking-widest)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-1)',
                }}>
                    {label}
                </div>
                <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--weight-semibold)',
                    color: 'var(--color-text-high)',
                }}>
                    {href.replace('mailto:', '').replace('https://', '')}
                </div>
            </div>
            <ArrowUpRight size={18} color="var(--color-text-low)" />
        </motion.a>
    );
}

export default function Contact() {
    const prefersReduced = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="contact"
            style={{
                padding: 'var(--section-py) var(--section-px)',
                background: 'var(--color-bg-base)',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Background glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--color-primary-glow) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
            }} />

            <div
                ref={ref}
                style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}
            >
                {/* Eyebrow */}
                <motion.p
                    className="eyebrow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    style={{ marginBottom: 'var(--space-4)' }}
                >
                    Get In Touch
                </motion.p>

                {/* Large heading */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.7 }}
                    style={{ marginBottom: 'var(--space-5)' }}
                >
                    <h2 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--weight-regular)',
                        letterSpacing: 'var(--tracking-tight)',
                        color: 'var(--color-text-high)',
                        lineHeight: 'var(--leading-tight)',
                    }}>
                        Let's Build Something
                    </h2>
                    <h2
                        className="gradient-text"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-3xl)',
                            fontWeight: 'var(--weight-black)',
                            letterSpacing: 'var(--tracking-tight)',
                            lineHeight: 'var(--leading-tight)',
                        }}
                    >
                        Great Together.
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-mid)',
                        lineHeight: 'var(--leading-loose)',
                        maxWidth: '500px',
                        margin: '0 auto var(--space-9)',
                    }}
                >
                    I'm currently open to backend engineering roles and freelance contracts.
                    Reach out and let's create something meaningful.
                </motion.p>

                {/* Contact links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-4)',
                        alignItems: 'center',
                    }}
                >
                    <ContactLink
                        icon={Mail}
                        label="Email"
                        href={`mailto:${SOCIAL_LINKS.email}`}
                        color="var(--color-primary)"
                    />
                    <ContactLink
                        icon={Linkedin}
                        label="LinkedIn"
                        href={SOCIAL_LINKS.linkedin}
                        color="#0A66C2"
                    />
                    <ContactLink
                        icon={Github}
                        label="GitHub"
                        href={SOCIAL_LINKS.github}
                        color="var(--color-text-high)"
                    />
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-low)',
                        letterSpacing: 'var(--tracking-wide)',
                        marginTop: 'var(--space-11)',
                    }}
                >
                    © {new Date().getFullYear()} Manoj Pandi — Built with React & Spring of passion.
                </motion.p>
            </div>
        </section>
    );
}

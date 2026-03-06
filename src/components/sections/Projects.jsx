import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../../utils/constants.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';

gsap.registerPlugin(ScrollTrigger);

// ── Constants ──────────────────────────────────────────
const CARD_WIDTH = 480; // px — wider for better content breathing room
const CARD_HEIGHT = 520; // px — taller so content isn't cramped
const CARD_GAP = 24;  // px — gap between cards
const SIDE_PAD = 64;  // px — visible padding on left/right edges

// ── ProjectCard ────────────────────────────────────────
function ProjectCard({ project, prefersReduced, isMobile }) {
    return (
        <motion.div
            whileHover={prefersReduced ? {} : {
                scale: 1.02,
                y: -6,
                boxShadow: `0 0 80px ${project.color}25, var(--shadow-elevated)`,
            }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
                flexShrink: 0,
                width: isMobile ? '100%' : `${CARD_WIDTH}px`,
                height: isMobile ? 'auto' : `${CARD_HEIGHT}px`,
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'border-color var(--transition-normal)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.color; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
        >
            {/* Accent top bar */}
            <div style={{
                height: '3px',
                background: `linear-gradient(90deg, ${project.color}, ${project.color}20)`,
                flexShrink: 0,
            }} />

            {/* Code mockup area */}
            <div style={{
                height: isMobile ? '160px' : '220px',
                background: `radial-gradient(ellipse at 20% 50%, ${project.color}18 0%, transparent 70%), var(--color-bg-base)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 'var(--space-5) var(--space-5)',
                flexShrink: 0,
                overflow: 'hidden',
                position: 'relative',
            }}>
                {/* Category badge top-right */}
                <span style={{
                    position: 'absolute',
                    top: 'var(--space-4)',
                    right: 'var(--space-4)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    letterSpacing: 'var(--tracking-widest)',
                    color: project.color,
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: `1px solid ${project.color}50`,
                    background: `${project.color}12`,
                }}>
                    {project.category}
                </span>

                {/* Code snippet decoration */}
                <pre style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: project.color,
                    opacity: 0.55,
                    lineHeight: 1.9,
                    whiteSpace: 'pre',
                    userSelect: 'none',
                }}>
                    {`@RestController
@RequestMapping("/api/v1")
public class ${project.title.replace(/\s+/g, '')} {

  @GetMapping("/health")
  public ResponseEntity<String> health() {
    return ResponseEntity.ok("running ✓");
  }
}`}
                </pre>
            </div>

            {/* Content */}
            <div style={{
                padding: 'var(--space-5)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-3)',
                flex: 1,
            }}>
                <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--weight-bold)',
                    letterSpacing: 'var(--tracking-tight)',
                    lineHeight: 'var(--leading-snug)',
                    color: 'var(--color-text-high)',
                }}>
                    {project.title}
                </h3>

                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-text-mid)',
                    lineHeight: 'var(--leading-normal)',
                    flex: 1,
                }}>
                    {project.description}
                </p>

                {/* Tech pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '11px',
                                color: 'var(--color-text-low)',
                                padding: '3px 10px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--color-border)',
                                background: 'var(--color-bg-base)',
                                letterSpacing: '0.04em',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href={project.link}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--weight-semibold)',
                        color: project.color,
                        textDecoration: 'none',
                        marginTop: 'var(--space-1)',
                        width: 'fit-content',
                        borderBottom: `1px solid ${project.color}40`,
                        paddingBottom: '2px',
                        transition: 'gap var(--transition-fast), border-color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.gap = '10px';
                        e.currentTarget.style.borderBottomColor = project.color;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.gap = '6px';
                        e.currentTarget.style.borderBottomColor = `${project.color}40`;
                    }}
                >
                    View Project <ArrowUpRight size={14} strokeWidth={2.5} />
                </a>
            </div>
        </motion.div>
    );
}

// ── Projects Section ───────────────────────────────────
export default function Projects() {
    const prefersReduced = useReducedMotion();
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });

    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (prefersReduced || isMobile) return;

        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        // Total scrollable distance = (all cards + gaps) minus one viewport
        const totalTrackWidth = PROJECTS.length * CARD_WIDTH + (PROJECTS.length - 1) * CARD_GAP;
        const scrollDistance = Math.max(0, totalTrackWidth - window.innerWidth + SIDE_PAD * 2);

        if (scrollDistance <= 0) return;

        const ctx = gsap.context(() => {
            // Pin the section while horizontal scroll plays out
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            });

            // Drive the horizontal translate via scroll
            gsap.to(track, {
                x: () => -scrollDistance,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${scrollDistance}`,
                    scrub: 0.8,
                    invalidateOnRefresh: true,
                },
            });
        }, section);

        return () => ctx.revert();
    }, [prefersReduced, isMobile]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            style={{
                padding: `var(--section-py) 0`,
                background: 'var(--color-bg-base)',
                overflow: 'hidden',
            }}
        >
            {/* ── Section header ── */}
            <div
                ref={headerRef}
                style={{
                    padding: `0 ${SIDE_PAD}px`,
                    marginBottom: 'var(--space-7)',
                }}
            >
                <motion.p
                    className="eyebrow"
                    initial={{ opacity: 0, y: 16 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 'var(--space-3)' }}
                >
                    Selected Work
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 24 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.08, duration: 0.55 }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--weight-black)',
                        letterSpacing: 'var(--tracking-tight)',
                        color: 'var(--color-text-high)',
                    }}
                >
                    Projects I've Built
                </motion.h2>
                {!isMobile && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={headerInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            color: 'var(--color-text-low)',
                            letterSpacing: 'var(--tracking-widest)',
                            marginTop: 'var(--space-3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                        }}
                    >
                        <span style={{ opacity: 0.5 }}>↔</span> SCROLL TO EXPLORE
                    </motion.p>
                )}
            </div>

            {/* ── Desktop: horizontal GSAP scroll track ── */}
            {!isMobile && (
                <div
                    ref={trackRef}
                    style={{
                        display: 'flex',
                        gap: `${CARD_GAP}px`,
                        paddingLeft: `${SIDE_PAD}px`,
                        paddingRight: `${SIDE_PAD}px`,
                        willChange: 'transform',
                        alignItems: 'stretch',
                    }}
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            prefersReduced={prefersReduced}
                            isMobile={false}
                        />
                    ))}
                </div>
            )}

            {/* ── Mobile: responsive grid ── */}
            {isMobile && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: 'var(--space-5)',
                        padding: `0 var(--space-5) var(--space-5)`,
                    }}
                >
                    {PROJECTS.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            prefersReduced={prefersReduced}
                            isMobile={true}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

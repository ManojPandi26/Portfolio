import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress.js';
import { NAV_LINKS } from '../../utils/constants.js';
import { drawerSlideIn } from '../../utils/animationVariants.js';
import { X, Menu } from 'lucide-react';

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const handler = (e) => setIsMobile(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);
    return isMobile;
}

export default function Navbar() {
    const { isScrolled } = useScrollProgress();
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    // Close drawer on resize to desktop
    useEffect(() => {
        if (!isMobile) setMenuOpen(false);
    }, [isMobile]);

    // Lock body scroll while drawer is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const handleNav = (href) => {
        setMenuOpen(false);
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    padding: '0 clamp(16px, 4vw, 48px)',
                    height: '70px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'background var(--transition-normal), border-color var(--transition-normal)',
                    background: isScrolled ? 'rgba(8, 12, 20, 0.88)' : 'transparent',
                    backdropFilter: isScrolled ? 'blur(16px)' : 'none',
                    WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
                }}
            >
                {/* Logo */}
                <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--weight-black)',
                        color: 'var(--color-text-high)',
                        letterSpacing: 'var(--tracking-tight)',
                        textDecoration: 'none',
                        flexShrink: 0,
                    }}
                >
                    MANOJ<span style={{ color: 'var(--color-primary)' }}>.</span>
                </a>

                {/* ── Desktop nav (≥ 768px) ── */}
                {!isMobile && (
                    <ul style={{ display: 'flex', gap: 'var(--space-6)', listStyle: 'none', margin: 0, padding: 0 }}>
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <button
                                    onClick={() => handleNav(link.href)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: 'var(--text-sm)',
                                        fontWeight: 'var(--weight-medium)',
                                        color: 'var(--color-text-mid)',
                                        letterSpacing: 'var(--tracking-wide)',
                                        transition: 'color var(--transition-fast)',
                                        padding: 'var(--space-2) 0',
                                    }}
                                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-text-high)')}
                                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-mid)')}
                                >
                                    {link.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* ── Desktop CTA (≥ 768px) ── */}
                {!isMobile && (
                    <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
                        style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 'var(--text-xs)',
                            letterSpacing: 'var(--tracking-widest)',
                            color: 'var(--color-accent)',
                            border: '1px solid var(--color-accent)',
                            padding: 'var(--space-2) var(--space-4)',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            transition: 'background var(--transition-fast), color var(--transition-fast)',
                            whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-accent)';
                            e.currentTarget.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--color-accent)';
                        }}
                    >
                        Hire Me
                    </a>
                )}

                {/* ── Mobile hamburger (< 768px only) ── */}
                {isMobile && (
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--color-text-high)',
                            padding: 'var(--space-2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {menuOpen ? (
                                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                                    <X size={24} />
                                </motion.span>
                            ) : (
                                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                                    <Menu size={24} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                )}
            </motion.nav>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        variants={drawerSlideIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: 'min(300px, 80vw)',
                            background: 'var(--color-bg-elevated)',
                            borderLeft: '1px solid var(--color-border)',
                            zIndex: 1001,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            padding: 'var(--space-9) var(--space-7)',
                            gap: 'var(--space-4)',
                        }}
                    >
                        {/* Close button inside drawer */}
                        <button
                            onClick={() => setMenuOpen(false)}
                            aria-label="Close menu"
                            style={{
                                position: 'absolute',
                                top: 'var(--space-5)',
                                right: 'var(--space-5)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--color-text-mid)',
                            }}
                        >
                            <X size={20} />
                        </button>

                        {/* Logo in drawer */}
                        <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-base)',
                            fontWeight: 'var(--weight-black)',
                            color: 'var(--color-text-high)',
                            marginBottom: 'var(--space-4)',
                        }}>
                            MANOJ<span style={{ color: 'var(--color-primary)' }}>.</span>
                        </span>

                        {NAV_LINKS.map((link, i) => (
                            <motion.button
                                key={link.href}
                                initial={{ opacity: 0, x: 24 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 + 0.05 }}
                                onClick={() => handleNav(link.href)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontFamily: 'var(--font-display)',
                                    fontSize: 'var(--text-xl)',
                                    fontWeight: 'var(--weight-bold)',
                                    color: 'var(--color-text-high)',
                                    letterSpacing: 'var(--tracking-tight)',
                                    padding: 0,
                                    textAlign: 'left',
                                }}
                            >
                                {link.label}
                            </motion.button>
                        ))}

                        {/* Mobile Hire Me CTA */}
                        <motion.a
                            href="mailto:manojpandi@example.com"
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: NAV_LINKS.length * 0.06 + 0.1 }}
                            style={{
                                marginTop: 'var(--space-4)',
                                fontFamily: 'var(--font-mono)',
                                fontSize: 'var(--text-xs)',
                                letterSpacing: 'var(--tracking-widest)',
                                color: 'var(--color-accent)',
                                border: '1px solid var(--color-accent)',
                                padding: 'var(--space-3) var(--space-5)',
                                borderRadius: 'var(--radius-sm)',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                            }}
                        >
                            Hire Me
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMenuOpen(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0,0,0,0.65)',
                            zIndex: 1000,
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

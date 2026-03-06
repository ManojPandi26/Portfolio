import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Full-screen loader: counts 0→100% then performs a split-screen wipe reveal
export default function Loader({ onComplete }) {
    const [count, setCount] = useState(0);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const totalDuration = 2200; // ms
        const interval = 30;
        const steps = totalDuration / interval;
        let current = 0;

        const timer = setInterval(() => {
            current++;
            // Eased progress: fast start, slow finish
            const progress = Math.min(100, Math.round((1 - Math.pow(1 - current / steps, 3)) * 100));
            setCount(progress);

            if (progress >= 100) {
                clearInterval(timer);
                setTimeout(() => setExiting(true), 300);
                setTimeout(() => onComplete(), 1400);
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    const panelVariants = {
        initial: { y: '0%' },
        exit: (dir) => ({
            y: dir === 'top' ? '-100%' : '100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 },
        }),
    };

    const counterVariants = {
        initial: { opacity: 1 },
        exit: { opacity: 0, transition: { duration: 0.2 } },
    };

    return (
        <motion.div
            className="fixed inset-0 z-[9999] pointer-events-none"
            initial="initial"
            animate={exiting ? 'exit' : 'initial'}
        >
            {/* Top panel */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-1/2"
                style={{ background: 'var(--color-bg-base)' }}
                variants={panelVariants}
                custom="top"
            />
            {/* Bottom panel */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{ background: 'var(--color-bg-base)' }}
                variants={panelVariants}
                custom="bottom"
            />

            {/* Counter — centered across both panels */}
            <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center gap-6"
                variants={counterVariants}
            >
                {/* Logo mark */}
                <div className="flex items-center gap-3 mb-2">
                    <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--weight-black)',
                        color: 'var(--color-text-high)',
                        letterSpacing: 'var(--tracking-tight)',
                    }}>
                        MANOJ<span style={{ color: 'var(--color-primary)' }}>.</span>
                    </span>
                </div>

                {/* Percentage counter */}
                <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(4rem, 12vw, 8rem)',
                    fontWeight: 'var(--weight-black)',
                    lineHeight: 1,
                    color: 'var(--color-text-high)',
                    letterSpacing: 'var(--tracking-tight)',
                    minWidth: '3ch',
                    textAlign: 'center',
                }}>
                    {count}
                </div>

                {/* Progress bar */}
                <div
                    style={{
                        width: 'clamp(200px, 30vw, 400px)',
                        height: '2px',
                        background: 'var(--color-border)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                    }}
                >
                    <motion.div
                        style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                            borderRadius: 'var(--radius-full)',
                        }}
                        animate={{ width: `${count}%` }}
                        transition={{ duration: 0.03 }}
                    />
                </div>

                {/* Label */}
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-widest)',
                    color: 'var(--color-text-low)',
                    textTransform: 'uppercase',
                }}>
                    Loading Portfolio
                </span>
            </motion.div>
        </motion.div>
    );
}

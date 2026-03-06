// animationVariants.js
// Single source of truth for all Framer Motion reusable variants.
// Import from here — never duplicate variants across components.

// ── FADE UP ────────────────────────────────
export const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
};

// ── FADE IN ────────────────────────────────
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
};

// ── STAGGER CONTAINER ──────────────────────
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
});

// ── STAGGER ITEM (for use inside staggerContainer) ─────
export const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
};

// ── HERO LETTER ────────────────────────────
export const heroLetter = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
    },
};

// ── SPRING POP ─────────────────────────────
export const springPop = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
};

// ── SLIDE IN LEFT ──────────────────────────
export const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
};

// ── SLIDE IN RIGHT ─────────────────────────
export const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
    },
};

// ── DRAW LINE (SVG stroke-dashoffset) ──────
export const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { pathLength: { duration: 2, ease: 'easeInOut' }, opacity: { duration: 0.2 } },
    },
};

// ── CARD HOVER ─────────────────────────────
export const cardHover = {
    rest: { scale: 1, y: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
    hover: { scale: 1.02, y: -4, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

// ── TILT CARD HOVER ────────────────────────
export const tiltCard = {
    rest: { scale: 1, rotateY: 0, rotateX: 0 },
    hover: { scale: 1.02, rotateY: 3, rotateX: -2, transition: { duration: 0.3 } },
};

// ── LOADER WIPE ────────────────────────────
export const loaderTopPanel = {
    initial: { y: 0 },
    exit: { y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
};
export const loaderBottomPanel = {
    initial: { y: 0 },
    exit: { y: '100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
};

// ── NAVBAR DRAWER (mobile) ─────────────────
export const drawerSlideIn = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } },
};

// ── REDUCED MOTION FALLBACK ────────────────
// Call this helper to get a no-op variant when prefers-reduced-motion is active.
export const noAnimation = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
};

export function getVariant(variant, prefersReduced) {
    return prefersReduced ? noAnimation : variant;
}

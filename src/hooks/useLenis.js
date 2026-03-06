// useLenis.js
// Initializes Lenis smooth scroll and syncs it with GSAP's ticker
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Detect low-end devices — skip Lenis on them
        const isLowEnd = navigator.hardwareConcurrency <= 2;
        const isTouch = window.matchMedia('(pointer: coarse)').matches;

        if (isLowEnd && isTouch) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;
        // Expose globally so GSAP Sections (e.g. Projects) can pause/resume it
        window.__LENIS__ = lenis;

        // Sync Lenis with GSAP ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // Update ScrollTrigger on Lenis scroll events
        lenis.on('scroll', ScrollTrigger.update);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}

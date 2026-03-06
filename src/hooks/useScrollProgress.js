// useScrollProgress.js
// Tracks how far the user has scrolled (0→1) and whether navbar should be solid
import { useState, useEffect } from 'react';

export function useScrollProgress() {
    const [scrollY, setScrollY] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? currentY / docHeight : 0;

            setScrollY(currentY);
            setScrollProgress(progress);
            setIsScrolled(currentY > 60);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { scrollY, scrollProgress, isScrolled };
}

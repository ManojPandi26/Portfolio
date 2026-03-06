import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { staggerContainer, heroLetter, fadeUp, getVariant } from '../../utils/animationVariants.js';

// Check WebGL support
function isWebGLSupported() {
    try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
}

// Check if low-end device (mobile + low cores)
function isLowEndDevice() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const cores = navigator.hardwareConcurrency || 4;
    return isTouch && cores <= 4;
}

// Three.js animated gradient mesh background
function ThreeBackground({ canvasRef }) {
    useEffect(() => {
        let renderer, scene, camera, animId;

        const init = async () => {
            const THREE = await import('three');

            renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: false, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setSize(window.innerWidth, window.innerHeight);

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 3;

            // Plane with vertex-displaced geometry for a mesh wave look
            const geometry = new THREE.PlaneGeometry(8, 8, 32, 32);
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    uTime: { value: 0 },
                    uPrimary: { value: new THREE.Color('#6366F1') },
                    uAccent: { value: new THREE.Color('#22C55E') },
                    uBg: { value: new THREE.Color('#080C14') },
                },
                vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elev = sin(pos.x * 1.2 + uTime * 0.5) * 0.15
                       + sin(pos.y * 1.5 + uTime * 0.3) * 0.1
                       + sin((pos.x + pos.y) * 0.8 + uTime * 0.4) * 0.08;
            pos.z += elev;
            vElevation = elev;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
                fragmentShader: `
          uniform vec3 uPrimary;
          uniform vec3 uAccent;
          uniform vec3 uBg;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float t = (vElevation + 0.33) * 1.5;
            vec3 color = mix(uBg, uPrimary, smoothstep(0.0, 0.5, t));
            color = mix(color, uAccent, smoothstep(0.5, 1.0, t) * 0.4);
            float alpha = smoothstep(0.0, 0.1, t) * 0.5;
            gl_FragColor = vec4(color, alpha * 0.6);
          }
        `,
                transparent: true,
                wireframe: true,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.x = -Math.PI / 5;
            scene.add(mesh);

            const clock = new THREE.Clock();

            // Pause when tab is not visible
            const handleVisibility = () => {
                if (document.hidden) { cancelAnimationFrame(animId); }
                else { animate(); }
            };
            document.addEventListener('visibilitychange', handleVisibility);

            const handleResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener('resize', handleResize);

            const animate = () => {
                animId = requestAnimationFrame(animate);
                material.uniforms.uTime.value = clock.getElapsedTime();
                renderer.render(scene, camera);
            };
            animate();

            return () => {
                document.removeEventListener('visibilitychange', handleVisibility);
                window.removeEventListener('resize', handleResize);
                cancelAnimationFrame(animId);
                renderer.dispose();
            };
        };

        const cleanup = init();
        return () => { cleanup.then(fn => fn && fn()); };
    }, [canvasRef]);

    return null;
}

// Floating tech badge
function FloatingBadge({ label, icon, style }) {
    return (
        <div
            className="glass"
            style={{
                position: 'absolute',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-mid)',
                fontWeight: 'var(--weight-medium)',
                userSelect: 'none',
                ...style,
            }}
        >
            <span style={{ fontSize: '1.2em' }}>{icon}</span> {label}
        </div>
    );
}

export default function Hero() {
    const prefersReduced = useReducedMotion();
    const canvasRef = useRef(null);
    const [useWebGL] = useState(() => isWebGLSupported() && !isLowEndDevice());

    const name = 'Manoj Pandi';

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'var(--color-bg-base)',
            }}
        >
            {/* Background — WebGL or CSS fallback */}
            {useWebGL ? (
                <canvas
                    ref={canvasRef}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
                />
            ) : (
                <div className="hero-gradient-fallback" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
            )}
            {useWebGL && <ThreeBackground canvasRef={canvasRef} />}

            {/* Radial gradient overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, var(--color-bg-base) 100%)',
                zIndex: 1,
            }} />

            {/* Floating tech badges */}
            <FloatingBadge label="Java" icon="☕" style={{ top: '20%', left: '8%', animationName: 'float-slow', animationDuration: '7s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', zIndex: 2 }} />
            <FloatingBadge label="Spring Boot" icon="🍃" style={{ top: '30%', right: '7%', animationName: 'float-mid', animationDuration: '5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', zIndex: 2 }} />
            <FloatingBadge label="Docker" icon="🐳" style={{ bottom: '28%', left: '6%', animationName: 'float-fast', animationDuration: '3.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', zIndex: 2 }} />
            <FloatingBadge label="MySQL" icon="🐬" style={{ bottom: '22%', right: '8%', animationName: 'float-slow', animationDuration: '6s', animationDelay: '1s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', zIndex: 2 }} />

            {/* Main content */}
            <div style={{
                position: 'relative',
                zIndex: 3,
                textAlign: 'center',
                maxWidth: '900px',
                padding: '0 var(--space-6)',
                paddingTop: '70px',
            }}>
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}
                >
                    <span className="pulse-dot" />
                    <span className="eyebrow">Available for Work</span>
                </motion.div>

                {/* H1 — stagger letters */}
                <div style={{ overflow: 'hidden', marginBottom: 'var(--space-3)' }}>
                    <motion.h1
                        variants={prefersReduced ? {} : staggerContainer(0.08, 0.3)}
                        initial="hidden"
                        animate="visible"
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'var(--text-hero)',
                            fontWeight: 'var(--weight-black)',
                            letterSpacing: 'var(--tracking-tight)',
                            lineHeight: 'var(--leading-tight)',
                            color: 'var(--color-text-high)',
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {name.split('').map((letter, i) => (
                            <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                                <motion.span
                                    variants={prefersReduced ? {} : heroLetter}
                                    style={{ display: 'inline-block' }}
                                >
                                    {letter}
                                </motion.span>
                            </span>
                        ))}
                    </motion.h1>
                </div>

                {/* Sub heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="gradient-text"
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--weight-bold)',
                        marginBottom: 'var(--space-5)',
                    }}
                >
                    Java Backend Engineer
                </motion.h2>

                {/* Body */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-mid)',
                        lineHeight: 'var(--leading-loose)',
                        maxWidth: '600px',
                        margin: '0 auto var(--space-7)',
                    }}
                >
                    Building scalable APIs, microservices & SaaS platforms with Spring Boot.
                </motion.p>

                {/* CTA row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}
                >
                    <a
                        href="#projects"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            background: 'var(--color-primary)',
                            color: '#fff',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--weight-semibold)',
                            padding: 'var(--space-4) var(--space-7)',
                            borderRadius: 'var(--radius-md)',
                            textDecoration: 'none',
                            transition: 'background var(--transition-fast), transform var(--transition-spring), box-shadow var(--transition-fast)',
                            boxShadow: 'var(--shadow-glow-primary)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-primary-hover)';
                            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        View My Work
                    </a>
                    <a
                        href="/cv.pdf"
                        download
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            background: 'transparent',
                            color: 'var(--color-text-high)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--weight-medium)',
                            padding: 'var(--space-4) var(--space-7)',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--color-border-bright)',
                            textDecoration: 'none',
                            transition: 'border-color var(--transition-fast), transform var(--transition-spring)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--color-border-bright)';
                            e.currentTarget.style.transform = 'none';
                        }}
                    >
                        Download CV
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                style={{
                    position: 'absolute',
                    bottom: 'var(--space-7)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    zIndex: 3,
                }}
            >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-low)', letterSpacing: 'var(--tracking-widest)' }}>
                    SCROLL
                </span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ArrowDown size={16} color="var(--color-text-low)" />
                </motion.div>
            </motion.div>
        </section>
    );
}

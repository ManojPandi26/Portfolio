import React, { Suspense, lazy, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

// CSS fallback: animated dark gradient mesh
function GradientFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(ellipse at 25% 45%, #6366F112 0%, transparent 55%),
          radial-gradient(ellipse at 75% 25%, #22C55E0A 0%, transparent 50%),
          radial-gradient(ellipse at 55% 80%, #6366F108 0%, transparent 60%),
          var(--color-bg-base)
        `,
        animation: 'mesh-drift 16s ease-in-out infinite alternate',
        zIndex: 0,
      }}
    />
  );
}

export default function SplineScene({ sceneUrl, fallbackOnly = false }) {
  const containerRef = useRef(null);

  // Pause Spline canvas when tab is hidden
  useEffect(() => {
    if (fallbackOnly) return;
    const handler = () => {
      const canvas = containerRef.current?.querySelector('canvas');
      if (!canvas) return;
      // Spline doesn't expose pause API directly, but we can toggle visibility
      canvas.style.display = document.hidden ? 'none' : 'block';
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [fallbackOnly]);

  if (fallbackOnly || !sceneUrl) {
    return <GradientFallback />;
  }

  return (
    <div ref={containerRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <Suspense fallback={<GradientFallback />}>
        <Spline
          scene={sceneUrl}
          style={{ width: '100%', height: '100%' }}
        />
      </Suspense>
      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, var(--color-bg-base) 85%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}

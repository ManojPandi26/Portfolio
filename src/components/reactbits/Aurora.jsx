import React, { useEffect, useRef } from 'react';

/**
 * Aurora — animated gradient background with layered blobs.
 * Inspired by React Bits Aurora component.
 * Creates a dreamy, flowing gradient effect behind content.
 */
export default function Aurora({
  colorStops = ['#3A29FF', '#8B5CF6', '#06B6D4', '#3A29FF'],
  blend = 0.6,
  speed = 1,
  blur = 80,
  style = {},
  children,
}) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const blobsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = window.devicePixelRatio || 1;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    }

    resize();
    window.addEventListener('resize', resize);

    // Create blobs
    const blobCount = colorStops.length;
    blobsRef.current = colorStops.map((color, i) => ({
      x: Math.random() * canvas.width / dpr,
      y: Math.random() * canvas.height / dpr,
      vx: (Math.random() - 0.5) * 0.4 * speed,
      vy: (Math.random() - 0.5) * 0.4 * speed,
      radius: Math.max(canvas.width, canvas.height) / (dpr * 2.2),
      color,
      phase: (i / blobCount) * Math.PI * 2,
    }));

    function draw(time) {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      blobsRef.current.forEach((blob) => {
        // Move
        blob.x += blob.vx + Math.sin(time * 0.0003 + blob.phase) * 0.3 * speed;
        blob.y += blob.vy + Math.cos(time * 0.0002 + blob.phase) * 0.3 * speed;

        // Bounce off edges
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        // Draw radial gradient blob
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius);
        gradient.addColorStop(0, blob.color + 'CC');
        gradient.addColorStop(0.5, blob.color + '44');
        gradient.addColorStop(1, blob.color + '00');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [colorStops, speed, blur]);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      ...style,
    }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: blend,
          filter: `blur(${blur}px)`,
          willChange: 'transform',
        }}
      />
      {children}
    </div>
  );
}

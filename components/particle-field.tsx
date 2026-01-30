"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  color?: string;
  maxOpacity?: number;
}

export function ParticleField({
  className = "",
  particleCount = 120,
  connectionDistance = 120,
  mouseRadius = 150,
  color = "59, 130, 246",
  maxOpacity = 0.6,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];
      // Create particles in a semi-structured grid with randomness
      const cols = Math.ceil(Math.sqrt(particleCount * (width / height)));
      const rows = Math.ceil(particleCount / cols);
      const spacingX = width / (cols + 1);
      const spacingY = height / (rows + 1);

      for (let i = 0; i < particleCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        // Grid position with randomness
        const gridX = spacingX * (col + 1) + (Math.random() - 0.5) * spacingX * 0.8;
        const gridY = spacingY * (row + 1) + (Math.random() - 0.5) * spacingY * 0.8;
        // Start scattered, will animate to position
        const startX = Math.random() * width;
        const startY = Math.random() * height;

        particles.push({
          x: startX,
          y: startY,
          originX: gridX,
          originY: gridY,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * maxOpacity * 0.5 + maxOpacity * 0.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.005 + Math.random() * 0.01,
        });
      }
      return particles;
    },
    [particleCount, maxOpacity]
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const { width, height } = dimensionsRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse opacity
        p.pulsePhase += p.pulseSpeed;
        const pulseOpacity =
          p.opacity * (0.7 + 0.3 * Math.sin(p.pulsePhase));

        // Mouse repulsion
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 8;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force;
          }
        }

        // Spring back to origin
        const dx = p.originX - p.x;
        const dy = p.originY - p.y;
        p.vx += dx * 0.02;
        p.vy += dy * 0.02;

        // Damping
        p.vx *= 0.92;
        p.vy *= 0.92;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${pulseOpacity})`;
        ctx.fill();
      }

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Draw mouse glow
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius
        );
        gradient.addColorStop(0, `rgba(${color}, 0.05)`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    [color, connectionDistance, mouseRadius]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };
      particlesRef.current = initParticles(rect.width, rect.height);
    };

    updateSize();

    if (prefersReducedMotion) {
      // Draw once with particles at their origin positions
      const particles = particlesRef.current.map((p) => ({
        ...p,
        x: p.originX,
        y: p.originY,
      }));
      particlesRef.current = particles;
      draw(ctx);
      return;
    }

    // Animate particles to their positions over time
    const startTime = performance.now();
    const settleTime = 2000; // 2 seconds to settle

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const settleProgress = Math.min(1, elapsed / settleTime);

      // During settle phase, particles move toward origin with increasing force
      if (settleProgress < 1) {
        const particles = particlesRef.current;
        for (const p of particles) {
          const springStrength = settleProgress * 0.08;
          const dx = p.originX - p.x;
          const dy = p.originY - p.y;
          p.vx += dx * springStrength;
          p.vy += dy * springStrength;
          p.vx *= 0.85;
          p.vy *= 0.85;
          p.x += p.vx;
          p.y += p.vy;
        }
        // Don't run the regular draw physics during settle
        const { width, height } = dimensionsRef.current;
        ctx.clearRect(0, 0, width, height);

        // Draw settled particles
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${p.opacity * settleProgress})`;
          ctx.fill();
        }

        // Draw connections during settle
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectionDistance) {
              const opacity =
                (1 - dist / connectionDistance) * 0.15 * settleProgress;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(${color}, ${opacity})`;
              ctx.stroke();
            }
          }
        }
      } else {
        draw(ctx);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", updateSize);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateSize);
    };
  }, [initParticles, draw, color, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: "auto" }}
    />
  );
}

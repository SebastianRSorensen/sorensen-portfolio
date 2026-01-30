"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/lib/jungle-hooks";

interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  glowPhase: number;
  glowSpeed: number;
  baseOpacity: number;
  hue: number;
}

interface FirefliesProps {
  count?: number;
}

export function Fireflies({ count = 40 }: FirefliesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const animationRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });
  const prefersReduced = useReducedMotion();

  const initFireflies = useCallback(
    (width: number, height: number) => {
      const flies: Firefly[] = [];
      for (let i = 0; i < count; i++) {
        flies.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          glowPhase: Math.random() * Math.PI * 2,
          glowSpeed: 0.008 + Math.random() * 0.015,
          baseOpacity: 0.3 + Math.random() * 0.5,
          hue: 50 + Math.random() * 30, // warm yellow-green range
        });
      }
      return flies;
    },
    [count]
  );

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = dimensionsRef.current;
    const flies = firefliesRef.current;

    ctx.clearRect(0, 0, width, height);

    for (const fly of flies) {
      // Update glow
      fly.glowPhase += fly.glowSpeed;
      const glow = fly.baseOpacity * (0.3 + 0.7 * Math.max(0, Math.sin(fly.glowPhase)));

      // Wandering motion
      fly.vx += (Math.random() - 0.5) * 0.02;
      fly.vy += (Math.random() - 0.5) * 0.02;

      // Speed limit
      const speed = Math.sqrt(fly.vx * fly.vx + fly.vy * fly.vy);
      if (speed > 0.5) {
        fly.vx = (fly.vx / speed) * 0.5;
        fly.vy = (fly.vy / speed) * 0.5;
      }

      // Damping
      fly.vx *= 0.99;
      fly.vy *= 0.99;

      // Update position
      fly.x += fly.vx;
      fly.y += fly.vy;

      // Wrap around edges
      if (fly.x < -10) fly.x = width + 10;
      if (fly.x > width + 10) fly.x = -10;
      if (fly.y < -10) fly.y = height + 10;
      if (fly.y > height + 10) fly.y = -10;

      // Draw glow
      if (glow > 0.05) {
        const gradient = ctx.createRadialGradient(
          fly.x,
          fly.y,
          0,
          fly.x,
          fly.y,
          fly.size * 8
        );
        gradient.addColorStop(
          0,
          `hsla(${fly.hue}, 80%, 65%, ${glow * 0.4})`
        );
        gradient.addColorStop(
          0.4,
          `hsla(${fly.hue}, 70%, 55%, ${glow * 0.15})`
        );
        gradient.addColorStop(1, `hsla(${fly.hue}, 60%, 50%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, fly.size * 8, 0, Math.PI * 2);
        ctx.fill();

        // Core bright point
        ctx.fillStyle = `hsla(${fly.hue}, 90%, 80%, ${glow * 0.9})`;
        ctx.beginPath();
        ctx.arc(fly.x, fly.y, fly.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      dimensionsRef.current = { width: rect.width, height: rect.height };
      firefliesRef.current = initFireflies(rect.width, rect.height);
    };

    updateSize();

    if (prefersReduced) {
      // Static render - fireflies at rest with partial glow
      draw(ctx);
      return;
    }

    const animate = () => {
      draw(ctx);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", updateSize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", updateSize);
    };
  }, [initFireflies, draw, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ opacity: 0.8 }}
    />
  );
}

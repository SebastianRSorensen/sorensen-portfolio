"use client";

import { useState, useEffect, useRef } from "react";

/** Tracks scroll position and direction */
export function useScrollTracker() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const prevScrollRef = useRef(0);
  const prevTimeRef = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const now = Date.now();
      const dt = now - prevTimeRef.current;
      const dy = y - prevScrollRef.current;

      setScrollDirection(dy > 0 ? "down" : "up");
      setScrollVelocity(dt > 0 ? Math.abs(dy / dt) : 0);
      setScrollY(y);

      prevScrollRef.current = y;
      prevTimeRef.current = now;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollDirection, scrollVelocity };
}

/** Tracks mouse position globally */
export function useMouseTracker() {
  const [mouseX, setMouseX] = useState(-1000);
  const [mouseY, setMouseY] = useState(-1000);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
      setIsActive(true);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { mouseX, mouseY, isActive };
}

/** Checks if element is in viewport */
export function useInViewport(ref: React.RefObject<HTMLElement | null>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return isInView;
}

/** Returns a stable random value (seeded per session for rare animal) */
export function useRareAnimal() {
  const [showRare, setShowRare] = useState(false);

  useEffect(() => {
    setShowRare(Math.random() < 0.1);
  }, []);

  return showRare;
}

/** Debounced callback for performance */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/** Reduced motion preference check */
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

/** Window dimensions */
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

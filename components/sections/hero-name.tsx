"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

interface LineState {
  text: string;
  resolved: number;
}

export function HeroName({ onComplete }: { onComplete?: () => void }) {
  const lines = ["SEBASTIAN", "ROSNES", "SØRENSEN"];
  const [lineStates, setLineStates] = useState<LineState[]>(
    lines.map(() => ({ text: "", resolved: 0 }))
  );
  const [started, setStarted] = useState(false);
  const frameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const completedRef = useRef(false);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;

      const charDelay = 45;
      const lineDelay = 150;
      const scrambleStart = 80;

      let allDone = true;

      const newStates = lines.map((line, lineIdx) => {
        const lineStartTime = lineIdx * lineDelay;
        const lineElapsed = elapsed - lineStartTime;

        if (lineElapsed < 0) {
          allDone = false;
          return { text: "", resolved: 0 };
        }

        if (lineElapsed < scrambleStart) {
          allDone = false;
          const fillProgress = lineElapsed / scrambleStart;
          const charsToShow = Math.ceil(line.length * fillProgress);
          const scrambled = Array.from({ length: charsToShow }, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("");
          return { text: scrambled, resolved: 0 };
        }

        const resolveElapsed = lineElapsed - scrambleStart;
        const resolved = Math.min(
          line.length,
          Math.floor(resolveElapsed / charDelay)
        );

        if (resolved < line.length) allDone = false;

        const text = line
          .split("")
          .map((char, i) => {
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        return { text, resolved };
      });

      setLineStates(newStates);

      if (!allDone) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setLineStates(lines.map((l) => ({ text: l, resolved: l.length })));
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onComplete]
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setLineStates(lines.map((l) => ({ text: l, resolved: l.length })));
      setStarted(true);
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      setStarted(true);
      frameRef.current = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <h1
      className="text-display leading-[0.92] tracking-tight select-none"
      style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          <span
            className={`inline-block transition-opacity duration-300 ${
              !started ? "opacity-0" : "opacity-100"
            }`}
            style={{
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            {lineStates[lineIdx]?.text || ""}
            {started &&
              lineStates[lineIdx]?.text.length > 0 &&
              lineStates[lineIdx]?.resolved < line.length && (
                <span className="inline-block w-[3px] h-[0.75em] bg-accent ml-0.5 align-middle animate-cursor-blink" />
              )}
          </span>
        </span>
      ))}
    </h1>
  );
}

export function getTotalLetterCount() {
  return "SEBASTIANROSNESSØRENSEN".length;
}

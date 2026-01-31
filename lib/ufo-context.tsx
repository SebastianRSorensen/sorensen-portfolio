"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { motionValue, type MotionValue } from "framer-motion";

export type UFOPhase =
  | "hidden"
  | "entering"
  | "flying"
  | "settling"
  | "illuminating"
  | "idle";

interface SectionRegistration {
  sectionRef: RefObject<HTMLElement | null>;
  titleRef: RefObject<HTMLElement | null>;
}

interface UFOContextValue {
  // Section registry (ref-based, no re-renders on registration)
  sectionsRef: RefObject<Map<string, SectionRegistration>>;
  registerSection: (id: string, registration: SectionRegistration) => void;
  unregisterSection: (id: string) => void;

  // State
  activeSection: string | null;
  setActiveSection: (id: string | null) => void;
  phase: UFOPhase;
  setPhase: (phase: UFOPhase) => void;
  isEnabled: boolean;

  // Beam intensity as MotionValue (0-1) — no re-renders during animation
  beamIntensityMV: MotionValue<number>;
}

const UFOContext = createContext<UFOContextValue | null>(null);

export function UFOProvider({ children }: { children: ReactNode }) {
  const sectionsRef = useRef<Map<string, SectionRegistration>>(new Map());
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [phase, setPhase] = useState<UFOPhase>("hidden");
  const [isEnabled, setIsEnabled] = useState(false);

  // Stable MotionValue — created once, never replaced
  const beamIntensityMV = useRef(motionValue(0)).current;

  const registerSection = useCallback(
    (id: string, registration: SectionRegistration) => {
      sectionsRef.current.set(id, registration);
    },
    []
  );

  const unregisterSection = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  // Check desktop + motion preference
  useEffect(() => {
    const check = () => {
      const wide = window.innerWidth >= 768;
      const motionOk = !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setIsEnabled(wide && motionOk);
    };

    check();
    window.addEventListener("resize", check);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", check);

    return () => {
      window.removeEventListener("resize", check);
      mq.removeEventListener("change", check);
    };
  }, []);

  return (
    <UFOContext.Provider
      value={{
        sectionsRef,
        registerSection,
        unregisterSection,
        activeSection,
        setActiveSection,
        phase,
        setPhase,
        isEnabled,
        beamIntensityMV,
      }}
    >
      {children}
    </UFOContext.Provider>
  );
}

export function useUFO(): UFOContextValue {
  const ctx = useContext(UFOContext);
  if (!ctx) throw new Error("useUFO must be used within UFOProvider");
  return ctx;
}

export function useUFOOptional(): UFOContextValue | null {
  return useContext(UFOContext);
}

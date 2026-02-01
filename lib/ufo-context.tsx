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
  | "idle"
  | "warping-out"
  | "warping-in";

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
  isMobile: boolean;

  // Beam intensity as MotionValue (0-1) — no re-renders during animation
  beamIntensityMV: MotionValue<number>;

  // Warp navigation
  warpToSection: (sectionId: string) => void;
  warpTargetSection: string | null;
  warpRevealSignal: number;
  triggerWarpReveal: () => void;
  clearWarpTarget: () => void;
}

const UFOContext = createContext<UFOContextValue | null>(null);

export function UFOProvider({ children }: { children: ReactNode }) {
  const sectionsRef = useRef<Map<string, SectionRegistration>>(new Map());
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [phase, setPhase] = useState<UFOPhase>("hidden");
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Stable MotionValue — created once, never replaced
  const beamIntensityMV = useRef(motionValue(0)).current;

  // Warp state
  const [warpTargetSection, setWarpTargetSection] = useState<string | null>(
    null
  );
  const [warpRevealSignal, setWarpRevealSignal] = useState(0);

  const registerSection = useCallback(
    (id: string, registration: SectionRegistration) => {
      sectionsRef.current.set(id, registration);
    },
    []
  );

  const unregisterSection = useCallback((id: string) => {
    sectionsRef.current.delete(id);
  }, []);

  const warpToSection = useCallback((sectionId: string) => {
    setWarpTargetSection(sectionId);
  }, []);

  const triggerWarpReveal = useCallback(() => {
    setWarpRevealSignal((prev) => prev + 1);
  }, []);

  const clearWarpTarget = useCallback(() => {
    setWarpTargetSection(null);
  }, []);

  // Check motion preference (UFO enabled on all screen sizes)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      setIsEnabled(!mq.matches);
    };

    checkMotion();
    mq.addEventListener("change", checkMotion);

    return () => {
      mq.removeEventListener("change", checkMotion);
    };
  }, []);

  // Track mobile breakpoint for responsive UFO sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
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
        isMobile,
        beamIntensityMV,
        warpToSection,
        warpTargetSection,
        warpRevealSignal,
        triggerWarpReveal,
        clearWarpTarget,
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

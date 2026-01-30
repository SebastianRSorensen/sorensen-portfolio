"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

type JungleModeContextType = {
  isJungle: boolean;
  toggleJungle: () => void;
  isTransitioning: boolean;
};

const JungleModeContext = createContext<JungleModeContextType>({
  isJungle: false,
  toggleJungle: () => {},
  isTransitioning: false,
});

export function useJungleMode() {
  return useContext(JungleModeContext);
}

const STORAGE_KEY = "jungle-mode";
const TRANSITION_DURATION = 1200;

export function JungleModeProvider({ children }: { children: ReactNode }) {
  const [isJungle, setIsJungle] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "true") {
        setIsJungle(true);
        document.documentElement.classList.add("jungle");
      }
    } catch {
      // localStorage may not be available
    }
    setMounted(true);
  }, []);

  // Sync class and localStorage with state
  useEffect(() => {
    if (!mounted) return;
    if (isJungle) {
      document.documentElement.classList.add("jungle");
    } else {
      document.documentElement.classList.remove("jungle");
    }
    try {
      localStorage.setItem(STORAGE_KEY, String(isJungle));
    } catch {
      // localStorage may not be available
    }
  }, [isJungle, mounted]);

  const toggleJungle = useCallback(() => {
    setIsTransitioning(true);
    setIsJungle((prev) => !prev);
    setTimeout(() => setIsTransitioning(false), TRANSITION_DURATION);
  }, []);

  return (
    <JungleModeContext.Provider
      value={{ isJungle, toggleJungle, isTransitioning }}
    >
      {children}
    </JungleModeContext.Provider>
  );
}

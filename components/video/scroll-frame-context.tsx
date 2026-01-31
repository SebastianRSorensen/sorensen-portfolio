"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

interface ScrollFrameContextType {
  /** Current "frame" based on scroll position (0 to totalFrames) */
  frame: number;
  /** Scroll progress through the entire page (0 to 1) */
  progress: number;
  /** Total frames (matches your Remotion video) */
  totalFrames: number;
  /** FPS (for timing calculations) */
  fps: number;
}

const ScrollFrameContext = createContext<ScrollFrameContextType>({
  frame: 0,
  progress: 0,
  totalFrames: 1800,
  fps: 30,
});

// Match your Remotion video config
const VIDEO_CONFIG = {
  totalFrames: 1800, // 60 seconds at 30fps - update to match Root.tsx
  fps: 30,
};

interface ScrollFrameProviderProps {
  children: ReactNode;
  /** Total scroll height as multiplier of viewport (e.g., 5 = 500vh) */
  scrollMultiplier?: number;
}

export function ScrollFrameProvider({
  children,
  scrollMultiplier = 6,
}: ScrollFrameProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollableHeight = container.scrollHeight - windowHeight;

    // Calculate progress (0 to 1)
    const scrolled = -rect.top;
    const rawProgress = scrolled / scrollableHeight;
    const clampedProgress = Math.max(0, Math.min(1, rawProgress));

    // Convert to frame number
    const currentFrame = Math.floor(
      clampedProgress * (VIDEO_CONFIG.totalFrames - 1)
    );

    setProgress(clampedProgress);
    setFrame(currentFrame);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <ScrollFrameContext.Provider
      value={{
        frame,
        progress,
        totalFrames: VIDEO_CONFIG.totalFrames,
        fps: VIDEO_CONFIG.fps,
      }}
    >
      <div
        ref={containerRef}
        style={{ minHeight: `${scrollMultiplier * 100}vh` }}
      >
        {children}
      </div>
    </ScrollFrameContext.Provider>
  );
}

/**
 * Drop-in replacement for Remotion's useCurrentFrame()
 * Use this in your scene components
 */
export function useScrollFrame() {
  const context = useContext(ScrollFrameContext);
  return context.frame;
}

/**
 * Get scroll progress (0 to 1)
 */
export function useScrollProgress() {
  const context = useContext(ScrollFrameContext);
  return context.progress;
}

/**
 * Get the full context
 */
export function useScrollFrameContext() {
  return useContext(ScrollFrameContext);
}

/**
 * Check if a scene should be visible based on frame range
 */
export function useSceneVisibility(startFrame: number, endFrame: number) {
  const frame = useScrollFrame();
  const isVisible = frame >= startFrame && frame <= endFrame;
  const sceneProgress =
    isVisible ? (frame - startFrame) / (endFrame - startFrame) : 0;

  return { isVisible, sceneProgress, frame };
}

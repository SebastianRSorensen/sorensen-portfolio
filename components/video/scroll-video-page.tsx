"use client";

import { ReactNode, useState, useEffect, useCallback } from "react";
import {
  ScrollFrameProvider,
  useScrollFrame,
  useSceneVisibility,
} from "./scroll-frame-context";
import { SequenceOffsetContext } from "./remotion-compat";

// Scene timing configuration — matches MainVideo.tsx exactly
const SCENE_CONFIG = {
  scene1: { start: 0, duration: 240 },       // Opening Hook: 0-240 (8 sec)
  scene2: { start: 240, duration: 135 },      // Hook Statement: 240-375 (4.5 sec)
  scene3: { start: 375, duration: 525 },      // Journey Timeline: 375-900 (17.5 sec)
  scene4: { start: 900, duration: 300 },      // Tech Stack: 900-1200 (10 sec)
  scene5: { start: 1200, duration: 300 },     // What Drives Me: 1200-1500 (10 sec)
  scene6: { start: 1500, duration: 300 },     // Call to Action: 1500-1800 (10 sec)
} as const;

interface SceneWrapperProps {
  children: ReactNode;
  startFrame: number;
  durationInFrames: number;
  className?: string;
}

/**
 * Wrapper that shows content only when the scene is active
 * and provides the correct SequenceOffsetContext so useCurrentFrame()
 * returns local frames starting at 0 for each scene.
 */
function SceneWrapper({
  children,
  startFrame,
  durationInFrames,
  className = "",
}: SceneWrapperProps) {
  const endFrame = startFrame + durationInFrames;
  const { isVisible, sceneProgress } = useSceneVisibility(startFrame, endFrame);

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        // Pass scene progress as CSS variable for animations
        "--scene-progress": sceneProgress,
      } as React.CSSProperties}
      data-visible={isVisible}
      data-progress={sceneProgress.toFixed(3)}
    >
      <SequenceOffsetContext.Provider value={startFrame}>
        {children}
      </SequenceOffsetContext.Provider>
    </div>
  );
}

interface ScrollVideoPageProps {
  /** Scene 1: Opening Hook component */
  scene1: ReactNode;
  /** Scene 2: Hook Statement component */
  scene2: ReactNode;
  /** Scene 3: Journey Timeline component */
  scene3: ReactNode;
  /** Scene 4: Tech Stack component */
  scene4: ReactNode;
  /** Scene 5: What Drives Me component */
  scene5: ReactNode;
  /** Scene 6: Call to Action component */
  scene6: ReactNode;
  /** Scroll multiplier (higher = slower scroll, default 6) */
  scrollMultiplier?: number;
  /** Show debug overlay */
  debug?: boolean;
}

/**
 * Main component that orchestrates all scenes based on scroll
 */
export function ScrollVideoPage({
  scene1,
  scene2,
  scene3,
  scene4,
  scene5,
  scene6,
  scrollMultiplier = 6,
  debug = false,
}: ScrollVideoPageProps) {
  return (
    <ScrollFrameProvider scrollMultiplier={scrollMultiplier}>
      <ScrollVideoContent
        scene1={scene1}
        scene2={scene2}
        scene3={scene3}
        scene4={scene4}
        scene5={scene5}
        scene6={scene6}
        debug={debug}
      />
    </ScrollFrameProvider>
  );
}

function useViewportScale(width: number, height: number) {
  const [scale, setScale] = useState(1);

  const update = useCallback(() => {
    setScale(Math.min(window.innerWidth / width, window.innerHeight / height));
  }, [width, height]);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return scale;
}

function ScrollVideoContent({
  scene1,
  scene2,
  scene3,
  scene4,
  scene5,
  scene6,
  debug,
}: Omit<ScrollVideoPageProps, "scrollMultiplier">) {
  const scale = useViewportScale(1920, 1080);

  return (
    <>
      {/* Sticky viewport container — pins during scroll, releases after */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-background z-40">
        {/* 1920×1080 scaling wrapper — fits viewport while preserving aspect ratio */}
        <div
          style={{
            position: "absolute",
            width: 1920,
            height: 1080,
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {/* Scene 1: Opening Hook */}
          <SceneWrapper
            startFrame={SCENE_CONFIG.scene1.start}
            durationInFrames={SCENE_CONFIG.scene1.duration}
          >
            {scene1}
          </SceneWrapper>

          {/* Scene 2: Hook Statement */}
          <SceneWrapper
            startFrame={SCENE_CONFIG.scene2.start}
            durationInFrames={SCENE_CONFIG.scene2.duration}
          >
            {scene2}
          </SceneWrapper>

          {/* Scene 3: Journey Timeline */}
          <SceneWrapper
            startFrame={SCENE_CONFIG.scene3.start}
            durationInFrames={SCENE_CONFIG.scene3.duration}
          >
            {scene3}
          </SceneWrapper>

          {/* Scene 4: Tech Stack */}
          <SceneWrapper
            startFrame={SCENE_CONFIG.scene4.start}
            durationInFrames={SCENE_CONFIG.scene4.duration}
          >
            {scene4}
          </SceneWrapper>

          {/* Scene 5: What Drives Me */}
          <SceneWrapper
            startFrame={SCENE_CONFIG.scene5.start}
            durationInFrames={SCENE_CONFIG.scene5.duration}
          >
            {scene5}
          </SceneWrapper>

          {/* Scene 6: Call to Action */}
          <SceneWrapper
            startFrame={SCENE_CONFIG.scene6.start}
            durationInFrames={SCENE_CONFIG.scene6.duration}
          >
            {scene6}
          </SceneWrapper>
        </div>

        {/* Debug overlay */}
        {debug && <DebugOverlay />}
      </div>
    </>
  );
}

function DebugOverlay() {
  const frame = useScrollFrame();
  const totalFrames = 1800;
  const progress = frame / totalFrames;

  // Determine current scene
  let currentScene = "None";
  for (const [name, config] of Object.entries(SCENE_CONFIG)) {
    if (frame >= config.start && frame < config.start + config.duration) {
      currentScene = name;
      break;
    }
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/90 text-white px-4 py-3 rounded-lg font-mono text-sm backdrop-blur-sm">
      <div className="text-cyan-400 font-bold mb-1">Scroll Debug</div>
      <div>Frame: {frame} / {totalFrames}</div>
      <div>Progress: {(progress * 100).toFixed(1)}%</div>
      <div>Scene: {currentScene}</div>
      <div className="mt-2 w-48 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-cyan-400"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}

// Re-export hooks for use in scene components
export {
  useScrollFrame,
  useScrollProgress,
  useSceneVisibility,
  useScrollFrameContext,
} from "./scroll-frame-context";

// Export scene config for reference
export { SCENE_CONFIG };

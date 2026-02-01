"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useSpring,
} from "framer-motion";
import { UFO } from "@/components/icons";
import { useUFO, type UFOPhase } from "@/lib/ufo-context";
import { ufoSpring, ufoTimings } from "@/lib/animations";
import { useLenis } from "@/components/smooth-scroll";

export function UFOController() {
  const {
    sectionsRef,
    activeSection,
    setActiveSection,
    phase,
    setPhase,
    isEnabled,
    isMobile,
    beamIntensityMV,
    warpTargetSection,
    triggerWarpReveal,
    clearWarpTarget,
  } = useUFO();

  const UFO_SIZE = isMobile ? 64 : 100;
  const HOVER_OFFSET_Y = isMobile ? 64 : 100;
  const UFO_OPACITY = isMobile ? 0.7 : 0.85;
  const FLIGHT_BASE_DURATION = isMobile ? 1200 : 2000;
  const SPEED_MULTIPLIER_CAP = isMobile ? 2 : 3;
  const WANDER_Y_MAX = isMobile ? 0.2 : 0.25;

  const lenis = useLenis();

  const ufoX = useMotionValue(-200);
  const ufoY = useMotionValue(-200);
  const ufoRotate = useSpring(0, ufoSpring.banking);
  const ufoOpacity = useMotionValue(0);
  const ufoScale = useMotionValue(1);
  const [renderBeamIntensity, setRenderBeamIntensity] = useState(0);

  const phaseRef = useRef<UFOPhase>("hidden");
  const activeSectionRef = useRef<string | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const litSectionsRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number>(0);
  const idleTimeRef = useRef(0);
  const flightControlRef = useRef<ReturnType<typeof animate>[]>([]);
  const prevXRef = useRef(0);
  const beamRafRef = useRef<number>(0);
  const lastFrameTimeRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const scrollSpeedRef = useRef(0);

  // Wander state (used before first section & after all lit)
  const wanderCenterRef = useRef({ x: 0, y: 0 });
  const wanderTargetRef = useRef({ x: 0, y: 0 });
  const wanderStartRef = useRef(0);
  const wanderDurRef = useRef(4);
  const wanderReadyRef = useRef(false);

  // Warp animation refs
  const warpAnimRef = useRef<ReturnType<typeof animate>[]>([]);
  // Post-warp linger: keep beam on and hover above section before wandering
  const postWarpLingerRef = useRef(false);
  const lingerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateBeam = useCallback(
    (to: number, duration: number) => {
      cancelAnimationFrame(beamRafRef.current);
      const from = beamIntensityMV.get();
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = (now - start) / (duration * 1000);
        const t = Math.min(1, elapsed);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const val = from + (to - from) * eased;
        beamIntensityMV.set(val);
        setRenderBeamIntensity(val);
        if (t < 1) beamRafRef.current = requestAnimationFrame(tick);
      };
      beamRafRef.current = requestAnimationFrame(tick);
    },
    [beamIntensityMV]
  );

  const getTitleTarget = useCallback((titleEl: HTMLElement) => {
    const rect = titleEl.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - UFO_SIZE / 2,
      y: rect.top - HOVER_OFFSET_Y,
    };
  }, [UFO_SIZE, HOVER_OFFSET_Y]);

  const stopFlights = useCallback(() => {
    flightControlRef.current.forEach((c) => c.stop());
    flightControlRef.current = [];
  }, []);

  const stopWarpAnims = useCallback(() => {
    warpAnimRef.current.forEach((c) => c.stop());
    warpAnimRef.current = [];
  }, []);

  const flyTo = useCallback(
    (targetX: number, targetY: number, onComplete?: () => void) => {
      stopFlights();
      const controlX = animate(ufoX, targetX, {
        ...ufoSpring.flight,
        onUpdate: (latest) => {
          const dx = latest - prevXRef.current;
          prevXRef.current = latest;
          ufoRotate.set(Math.max(-15, Math.min(15, dx * 3)));
        },
      });
      const controlY = animate(ufoY, targetY, {
        ...ufoSpring.flight,
        onComplete,
      });
      flightControlRef.current = [controlX, controlY];
    },
    [ufoX, ufoY, ufoRotate, stopFlights]
  );

  // Flight state for RAF-driven section flights (tracks live target position)
  const flightRef = useRef<{
    startX: number;
    startY: number;
    progress: number; // 0 → 1
    baseDuration: number; // ms, at rest scroll speed
    sectionId: string;
    onComplete: () => void;
  } | null>(null);

  const randomWanderTarget = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return {
      x: vw * 0.15 + Math.random() * vw * 0.7 - UFO_SIZE / 2,
      y: vh * 0.05 + Math.random() * vh * WANDER_Y_MAX,
    };
  }, [UFO_SIZE, WANDER_Y_MAX]);

  const initWander = useCallback(() => {
    wanderCenterRef.current = { x: ufoX.get(), y: ufoY.get() };
    wanderTargetRef.current = randomWanderTarget();
    wanderStartRef.current = performance.now();
    wanderDurRef.current = 3.5 + Math.random() * 2.5;
    wanderReadyRef.current = true;
  }, [ufoX, ufoY, randomWanderTarget]);

  const isUfoAboveViewport = useCallback((): boolean => {
    return ufoY.get() < 0;
  }, [ufoY]);

  const releaseToWander = useCallback((sectionId: string) => {
    // Ensure section is revealed (flash beam if not already lit)
    const wasLit = litSectionsRef.current.has(sectionId);
    litSectionsRef.current.add(sectionId);
    if (!wasLit) {
      beamIntensityMV.set(1);
      setRenderBeamIntensity(1);
    }

    // Fade beam out
    animateBeam(0, 0.2);

    // Clear active section and cancel flights
    setActiveSection(null);
    stopFlights();
    flightRef.current = null;

    // Cancel any post-warp linger
    if (lingerTimerRef.current) {
      clearTimeout(lingerTimerRef.current);
      lingerTimerRef.current = null;
    }
    postWarpLingerRef.current = false;

    // Transition to idle wandering
    phaseRef.current = "idle";
    setPhase("idle");
    idleTimeRef.current = performance.now();

    // Init wander with fast initial duration
    initWander();
    wanderDurRef.current = 1.2;
  }, [beamIntensityMV, animateBeam, setActiveSection, stopFlights, initWander, setPhase]);

  // Find the first unlit section whose top has entered the viewport
  const findNextTarget = useCallback(() => {
    const sections = sectionsRef.current;
    const entries: { id: string; top: number }[] = [];

    sections.forEach((reg, id) => {
      if (litSectionsRef.current.has(id)) return;
      const el = reg.sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        entries.push({ id, top: rect.top });
      }
    });

    if (entries.length === 0) return null;
    entries.sort((a, b) => a.top - b.top);
    return entries[0].id;
  }, [sectionsRef]);

  const allLit = useCallback(() => {
    return (
      sectionsRef.current.size > 0 &&
      litSectionsRef.current.size >= sectionsRef.current.size
    );
  }, [sectionsRef]);

  // Ref for recursive/async access to transitionTo
  const transitionToRef = useRef<
    (newPhase: UFOPhase, sectionId?: string | null) => void
  >(() => {});

  // Phase state machine
  const transitionTo = useCallback(
    (newPhase: UFOPhase, sectionId?: string | null) => {
      phaseRef.current = newPhase;
      setPhase(newPhase);

      switch (newPhase) {
        case "entering": {
          const startX = window.innerWidth * 0.7 - UFO_SIZE / 2;
          ufoX.set(startX);
          ufoY.set(-UFO_SIZE * 2);
          animate(ufoOpacity, UFO_OPACITY, { duration: 0.5 });

          const hoverX = window.innerWidth * 0.75 - UFO_SIZE / 2;
          const hoverY = window.innerHeight * 0.12;
          flyTo(hoverX, hoverY, () => {
            initWander();
            transitionToRef.current("idle");
          });
          break;
        }

        case "flying": {
          animateBeam(0, 0.15);
          wanderReadyRef.current = false;
          stopFlights();

          if (sectionId) {
            flightRef.current = {
              startX: ufoX.get(),
              startY: ufoY.get(),
              progress: 0,
              baseDuration: FLIGHT_BASE_DURATION,
              sectionId,
              onComplete: () => {
                setActiveSection(sectionId);
                transitionToRef.current("settling");
              },
            };
          }
          break;
        }

        case "settling": {
          setTimeout(() => {
            if (phaseRef.current === "settling") {
              transitionToRef.current("illuminating");
            }
          }, ufoTimings.settleDelay);
          break;
        }

        case "illuminating": {
          animateBeam(1, ufoTimings.beamFadeIn);
          setTimeout(() => {
            if (phaseRef.current === "illuminating") {
              if (activeSectionRef.current) {
                litSectionsRef.current.add(activeSectionRef.current);
              }
              transitionToRef.current("idle");
            }
          }, ufoTimings.beamFadeIn * 1000 + 50);
          break;
        }

        case "warping-out": {
          if (!sectionId) break;

          // Cancel any in-progress flights or linger
          stopFlights();
          stopWarpAnims();
          if (lingerTimerRef.current) {
            clearTimeout(lingerTimerRef.current);
            lingerTimerRef.current = null;
          }
          postWarpLingerRef.current = false;
          flightRef.current = null;
          wanderReadyRef.current = false;

          // Fade beam to 0
          animateBeam(0, 0.1);

          // Animate: scale 1→0.1, opacity→0, y moves up 60px
          const duration = ufoTimings.warpOutDuration;
          const currentY = ufoY.get();
          const a1 = animate(ufoScale, 0.1, { duration, ease: "easeIn" });
          const a2 = animate(ufoOpacity, 0, { duration, ease: "easeIn" });
          const a3 = animate(ufoY, currentY - 60, {
            duration,
            ease: "easeIn",
            onComplete: () => {
              // Mark all sections as lit, then remove target from lit set
              sectionsRef.current.forEach((_reg, id) => {
                litSectionsRef.current.add(id);
              });
              // Remove the target section from lit so it can be beamed
              litSectionsRef.current.delete(sectionId);

              // Signal non-target sections to instantly reveal
              triggerWarpReveal();

              // Find the target element and scroll to it
              const targetReg = sectionsRef.current.get(sectionId);
              const targetEl = targetReg?.sectionRef.current;

              if (targetEl && lenis) {
                lenis.scrollTo(targetEl, {
                  offset: -80,
                  duration: ufoTimings.warpScrollDuration,
                  onComplete: () => {
                    transitionToRef.current("warping-in", sectionId);
                  },
                });
              } else if (targetEl) {
                // Fallback: no lenis available
                targetEl.scrollIntoView({ behavior: "smooth" });
                setTimeout(() => {
                  transitionToRef.current("warping-in", sectionId);
                }, ufoTimings.warpScrollDuration * 1000);
              }
            },
          });
          warpAnimRef.current = [a1, a2, a3];
          break;
        }

        case "warping-in": {
          if (!sectionId) break;
          stopWarpAnims();

          // Position UFO above target title
          const targetReg = sectionsRef.current.get(sectionId);
          if (targetReg?.titleRef.current) {
            const target = getTitleTarget(targetReg.titleRef.current);
            ufoX.set(target.x);
            ufoY.set(target.y - 40); // Start slightly higher
          }

          // Animate: scale 0.1→1, opacity 0→0.85, slight downward settle
          const duration = ufoTimings.warpInDuration;
          const a1 = animate(ufoScale, 1, { duration, ease: "easeOut" });
          const a2 = animate(ufoOpacity, UFO_OPACITY, { duration, ease: "easeOut" });

          // Settle down slightly
          const settleY = ufoY.get() + 40;
          const a3 = animate(ufoY, settleY, {
            duration,
            ease: "easeOut",
            onComplete: () => {
              warpAnimRef.current = [];

              // Check if target was already lit (beamed before)
              const wasAlreadyLit = litSectionsRef.current.has(sectionId);

              // Flag linger so idle keeps beam on after warp
              postWarpLingerRef.current = true;

              if (wasAlreadyLit) {
                // Already beamed — just idle (linger will keep beam on)
                setActiveSection(sectionId);
                clearWarpTarget();
                transitionToRef.current("idle");
              } else {
                // Need to beam the target
                setActiveSection(sectionId);
                clearWarpTarget();
                transitionToRef.current("settling");
              }
            },
          });
          warpAnimRef.current = [a1, a2, a3];
          break;
        }

        case "idle": {
          idleTimeRef.current = performance.now();
          if (allLit()) {
            if (postWarpLingerRef.current) {
              // Keep beam on and hover above the section for a bit
              postWarpLingerRef.current = false;
              if (lingerTimerRef.current) clearTimeout(lingerTimerRef.current);
              lingerTimerRef.current = setTimeout(() => {
                lingerTimerRef.current = null;
                if (phaseRef.current === "idle") {
                  animateBeam(0, 0.3);
                  setActiveSection(null);
                  initWander();
                }
              }, 2500);
            } else {
              animateBeam(0, 0.3);
              setActiveSection(null);
              initWander();
            }
          }
          break;
        }
      }
    },
    [
      setPhase,
      ufoX,
      ufoY,
      ufoOpacity,
      ufoScale,
      flyTo,
      stopFlights,
      stopWarpAnims,
      setActiveSection,
      animateBeam,
      initWander,
      allLit,
      getTitleTarget,
      sectionsRef,
      triggerWarpReveal,
      clearWarpTarget,
      lenis,
      UFO_SIZE,
      UFO_OPACITY,
      FLIGHT_BASE_DURATION,
    ]
  );
  useEffect(() => {
    transitionToRef.current = transitionTo;
  }, [transitionTo]);

  // Watch warpTargetSection to initiate warp
  useEffect(() => {
    if (!warpTargetSection) return;
    const current = phaseRef.current;

    // Don't warp during hidden/entering or during an active warp
    if (
      current === "hidden" ||
      current === "entering" ||
      current === "warping-out" ||
      current === "warping-in"
    ) {
      clearWarpTarget();
      return;
    }

    transitionToRef.current("warping-out", warpTargetSection);
  }, [warpTargetSection, clearWarpTarget]);

  // RAF loop
  useEffect(() => {
    if (!isEnabled) return;

    const loop = () => {
      const currentPhase = phaseRef.current;
      const now = performance.now();

      // Track scroll speed (smoothed)
      const dt = lastFrameTimeRef.current
        ? (now - lastFrameTimeRef.current) / 1000
        : 0.016;
      lastFrameTimeRef.current = now;
      const currentScrollY = window.scrollY;
      const rawSpeed = Math.abs(currentScrollY - lastScrollYRef.current) / dt;
      lastScrollYRef.current = currentScrollY;
      // Exponential moving average for smooth tracking
      scrollSpeedRef.current += (rawSpeed - scrollSpeedRef.current) * 0.3;

      // During warp phases, keep RAF alive for scroll tracking only
      if (currentPhase === "warping-out" || currentPhase === "warping-in") {
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // When idle, check if the next unlit section has entered the viewport
      if (currentPhase === "idle" && !allLit()) {
        const next = findNextTarget();
        if (next && next !== activeSectionRef.current) {
          transitionToRef.current("flying", next);
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
      }

      // Float / wander
      if (currentPhase === "idle") {
        const now = performance.now();
        const t = (now - idleTimeRef.current) / 1000;

        if (activeSectionRef.current) {
          if (isUfoAboveViewport()) {
            // Title scrolled off — clear and wander
            animateBeam(0, 0.2);
            setActiveSection(null);
            if (lingerTimerRef.current) {
              clearTimeout(lingerTimerRef.current);
              lingerTimerRef.current = null;
            }
            postWarpLingerRef.current = false;
            initWander();
            wanderDurRef.current = 1.2;
          } else {
            // Hover above the current title (also during post-warp linger)
            const reg = sectionsRef.current.get(activeSectionRef.current);
            if (reg?.titleRef.current) {
              const rect = reg.titleRef.current.getBoundingClientRect();
              const baseX = rect.left + rect.width / 2 - UFO_SIZE / 2;
              const baseY = rect.top - HOVER_OFFSET_Y;
              ufoX.set(baseX + Math.sin(t * 0.5 * Math.PI * 2) * 3);
              ufoY.set(baseY + Math.sin(t * 0.8 * Math.PI * 2) * 6);
              ufoRotate.set(Math.sin(t * 0.6 * Math.PI * 2) * 1.5);
            }
          }
        } else {
          // Wander freely
          if (!wanderReadyRef.current) initWander();

          const elapsed = (now - wanderStartRef.current) / 1000;
          const wt = Math.min(1, elapsed / wanderDurRef.current);
          const easedT =
            wt < 0.5
              ? 2 * wt * wt
              : 1 - Math.pow(-2 * wt + 2, 2) / 2;

          const cx =
            wanderCenterRef.current.x +
            (wanderTargetRef.current.x - wanderCenterRef.current.x) * easedT;
          const cy =
            wanderCenterRef.current.y +
            (wanderTargetRef.current.y - wanderCenterRef.current.y) * easedT;

          if (wt >= 1) {
            wanderCenterRef.current = { x: cx, y: cy };
            wanderTargetRef.current = randomWanderTarget();
            wanderStartRef.current = now;
            wanderDurRef.current = 3.5 + Math.random() * 2.5;
          }

          ufoX.set(cx + Math.sin(t * 0.5 * Math.PI * 2) * 2);
          ufoY.set(cy + Math.sin(t * 0.8 * Math.PI * 2) * 4);
          ufoRotate.set(Math.sin(t * 0.6 * Math.PI * 2) * 1);
        }
      }

      // During flying, interpolate toward the title's LIVE position
      // Speed scales with scroll velocity: 1x at rest, up to ~4x at fast scroll
      if (currentPhase === "flying" && flightRef.current) {
        const f = flightRef.current;
        const reg = sectionsRef.current.get(f.sectionId);

        // Check if the *target title* scrolled above viewport (not the UFO — it may
        // legitimately start a flight from above-viewport after a release)
        if (reg?.titleRef.current && reg.titleRef.current.getBoundingClientRect().bottom < -20) {
          releaseToWander(f.sectionId);
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        if (reg?.titleRef.current) {
          const target = getTitleTarget(reg.titleRef.current);

          // Advance progress based on frame time and scroll speed
          const speedMultiplier =
            1 + Math.min(scrollSpeedRef.current / 600, SPEED_MULTIPLIER_CAP);
          f.progress += (dt / (f.baseDuration / 1000)) * speedMultiplier;
          const raw = Math.min(1, f.progress);

          // Ease in-out cubic
          const t =
            raw < 0.5
              ? 4 * raw * raw * raw
              : 1 - Math.pow(-2 * raw + 2, 3) / 2;

          const x = f.startX + (target.x - f.startX) * t;
          const y = f.startY + (target.y - f.startY) * t;

          const dxFrame = x - prevXRef.current;
          prevXRef.current = x;
          ufoRotate.set(Math.max(-15, Math.min(15, dxFrame * 3)));

          ufoX.set(x);
          ufoY.set(y);

          if (raw >= 1) {
            const onComplete = f.onComplete;
            flightRef.current = null;
            onComplete();
          }
        }
      }

      // During settling/illuminating, follow the title so scroll doesn't disconnect
      if (currentPhase === "settling" || currentPhase === "illuminating") {
        if (activeSectionRef.current) {
          if (isUfoAboveViewport()) {
            releaseToWander(activeSectionRef.current);
          } else {
            const reg = sectionsRef.current.get(activeSectionRef.current);
            if (reg?.titleRef.current) {
              const rect = reg.titleRef.current.getBoundingClientRect();
              ufoX.set(rect.left + rect.width / 2 - UFO_SIZE / 2);
              ufoY.set(rect.top - HOVER_OFFSET_Y);
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [
    isEnabled,
    ufoX,
    ufoY,
    ufoRotate,
    sectionsRef,
    getTitleTarget,
    findNextTarget,
    allLit,
    initWander,
    randomWanderTarget,
    isUfoAboveViewport,
    releaseToWander,
    animateBeam,
    setActiveSection,
    UFO_SIZE,
    HOVER_OFFSET_Y,
    SPEED_MULTIPLIER_CAP,
  ]);

  // Enter immediately
  useEffect(() => {
    if (!isEnabled) return;
    const timer = setTimeout(() => {
      if (phaseRef.current === "hidden") {
        transitionTo("entering");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isEnabled, transitionTo]);

  // Reset render state when disabled (not in an effect to avoid cascading render lint)
  const beamResetNeeded = !isEnabled && renderBeamIntensity !== 0;
  if (beamResetNeeded) {
    setRenderBeamIntensity(0);
  }

  // Cleanup external systems
  useEffect(() => {
    if (!isEnabled) {
      setPhase("hidden");
      setActiveSection(null);
      beamIntensityMV.set(0);
      ufoOpacity.set(0);
      ufoScale.set(1);
      stopFlights();
      stopWarpAnims();
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(beamRafRef.current);
      litSectionsRef.current.clear();
      wanderReadyRef.current = false;
      postWarpLingerRef.current = false;
      if (lingerTimerRef.current) {
        clearTimeout(lingerTimerRef.current);
        lingerTimerRef.current = null;
      }
    }
  }, [
    isEnabled,
    setPhase,
    setActiveSection,
    beamIntensityMV,
    ufoOpacity,
    ufoScale,
    stopFlights,
    stopWarpAnims,
  ]);

  if (!isEnabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0"
      style={{
        x: ufoX,
        y: ufoY,
        rotate: ufoRotate,
        opacity: ufoOpacity,
        scale: ufoScale,
        zIndex: 40,
      }}
    >
      <UFO
        size={UFO_SIZE}
        beamIntensity={renderBeamIntensity}
        floating={false}
      />
    </motion.div>
  );
}

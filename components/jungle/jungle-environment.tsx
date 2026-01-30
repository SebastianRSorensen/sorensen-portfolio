"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJungleMode } from "@/lib/jungle-mode";
import { useReducedMotion, useRareAnimal } from "@/lib/jungle-hooks";
import { Fireflies } from "./fireflies";
import { JungleTransition } from "./jungle-transition";
import { Monkey } from "./animals/monkey";
import { Parrot } from "./animals/parrot";
import { Sloth } from "./animals/sloth";
import { Frog } from "./animals/frog";

export function JungleEnvironment() {
  const { isJungle } = useJungleMode();
  const prefersReduced = useReducedMotion();
  const showRareAnimal = useRareAnimal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* Transition overlay - always rendered for toggle animation */}
      <JungleTransition />

      <AnimatePresence>
        {isJungle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Vine/leaf texture overlays */}
            <div className="fixed inset-0 z-[1] pointer-events-none">
              {/* Top vine decoration */}
              <svg
                className="absolute top-0 left-0 w-full h-24 opacity-20"
                viewBox="0 0 1440 96"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 Q200,40 400,20 Q600,0 800,30 Q1000,60 1200,20 Q1400,0 1440,10 L1440,0 L0,0 Z"
                  fill="currentColor"
                  className="text-accent/30"
                />
                {/* Hanging vines */}
                <motion.path
                  d="M200,20 Q205,50 195,70"
                  stroke="currentColor"
                  className="text-accent/40"
                  strokeWidth="2"
                  fill="none"
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          d: [
                            "M200,20 Q205,50 195,70",
                            "M200,20 Q210,50 200,70",
                            "M200,20 Q205,50 195,70",
                          ],
                        }
                  }
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.path
                  d="M600,10 Q610,45 595,75"
                  stroke="currentColor"
                  className="text-accent/40"
                  strokeWidth="2"
                  fill="none"
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          d: [
                            "M600,10 Q610,45 595,75",
                            "M600,10 Q615,45 605,75",
                            "M600,10 Q610,45 595,75",
                          ],
                        }
                  }
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
                <motion.path
                  d="M1000,25 Q1010,55 998,80"
                  stroke="currentColor"
                  className="text-accent/40"
                  strokeWidth="2"
                  fill="none"
                  animate={
                    prefersReduced
                      ? {}
                      : {
                          d: [
                            "M1000,25 Q1010,55 998,80",
                            "M1000,25 Q1015,55 1005,80",
                            "M1000,25 Q1010,55 998,80",
                          ],
                        }
                  }
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              </svg>

              {/* Side vine - left */}
              <div className="absolute left-0 top-0 h-full w-8 hidden md:block">
                <svg
                  className="w-full h-full opacity-15"
                  viewBox="0 0 32 1000"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,0 Q20,100 5,200 Q-5,300 15,400 Q25,500 5,600 Q-5,700 20,800 Q25,900 10,1000"
                    stroke="currentColor"
                    className="text-accent"
                    strokeWidth="3"
                    fill="none"
                    animate={
                      prefersReduced
                        ? {}
                        : {
                            d: [
                              "M0,0 Q20,100 5,200 Q-5,300 15,400 Q25,500 5,600 Q-5,700 20,800 Q25,900 10,1000",
                              "M0,0 Q25,100 8,200 Q-3,300 18,400 Q28,500 8,600 Q-3,700 22,800 Q28,900 12,1000",
                              "M0,0 Q20,100 5,200 Q-5,300 15,400 Q25,500 5,600 Q-5,700 20,800 Q25,900 10,1000",
                            ],
                          }
                    }
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  {/* Small leaves on vine */}
                  {[150, 350, 550, 750, 950].map((y) => (
                    <motion.ellipse
                      key={y}
                      cx="12"
                      cy={y}
                      rx="6"
                      ry="3"
                      fill="currentColor"
                      className="text-accent/30"
                      animate={
                        prefersReduced
                          ? {}
                          : {
                              rotate: [0, 10, -5, 0],
                            }
                      }
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2,
                      }}
                      style={{ transformOrigin: `12px ${y}px` }}
                    />
                  ))}
                </svg>
              </div>

              {/* Subtle gradient overlay for jungle depth */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse at 20% 50%, rgba(34,197,94,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(245,158,11,0.05) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Fireflies */}
            <Fireflies count={isMobile ? 20 : 40} />

            {/* Animals container */}
            <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
              <Sloth />
              {!isMobile && <Parrot />}
              <Monkey />
              <Frog />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

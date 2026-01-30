"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./language-toggle";

const navLinks = [
  { key: "story", href: "#grense" },
  { key: "skills", href: "#tech-stack" },
  { key: "contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const t = useTranslations("nav");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-mono text-sm text-foreground hover:text-accent transition-colors"
        >
          SRS
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {t(link.key)}
            </button>
          ))}
          <LanguageToggle />
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <LanguageToggle />
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
        >
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                {t(link.key)}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Scroll progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-accent origin-left"
        style={{ scaleX: scrollYProgress, width: "100%" }}
      />
    </header>
  );
}

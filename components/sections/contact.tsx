"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import { easings, staggerContainer, staggerItem } from "@/lib/animations";

export function Contact() {
  const t = useTranslations("contact");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="min-h-screen py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Title */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: easings.smooth }}
          className="text-accent font-mono text-sm block mb-4"
        >
          06
        </motion.span>

        <div className="relative inline-block mb-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: easings.smooth }}
            className="text-display text-4xl md:text-6xl text-foreground"
          >
            {t("title")}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: easings.smooth }}
            className="absolute -bottom-2 left-0 h-0.5 w-full bg-accent origin-left"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: easings.smooth }}
          className="text-body text-lg text-muted-foreground mb-12 max-w-lg"
        >
          {t("description")}
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="space-y-12"
        >
          {/* Contact info */}
          <div className="space-y-4">
            <motion.a
              variants={staggerItem}
              whileHover={{ x: 5 }}
              href={`mailto:${t("email.value")}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <Mail className="w-5 h-5 text-accent" />
              <span className="text-body">{t("email.value")}</span>
            </motion.a>

            <motion.a
              variants={staggerItem}
              whileHover={{ x: 5 }}
              href={`tel:${t("phone.value").replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <Phone className="w-5 h-5 text-accent" />
              <span className="text-body">{t("phone.value")}</span>
            </motion.a>

            <motion.div
              variants={staggerItem}
              className="flex items-center gap-3 text-muted-foreground"
            >
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-body">{t("location.value")}</span>
            </motion.div>
          </div>

          {/* Social links */}
          <div className="flex gap-6">
            <motion.a
              variants={staggerItem}
              whileHover={{ y: -2 }}
              href="https://github.com/sebastianrosnes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm">{t("links.github")}</span>
            </motion.a>

            <motion.a
              variants={staggerItem}
              whileHover={{ y: -2 }}
              href="https://linkedin.com/in/sebastianrosnes"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="text-sm">{t("links.linkedin")}</span>
            </motion.a>

            <motion.a
              variants={staggerItem}
              whileHover={{ y: -2 }}
              href="https://www.rosengrip.no"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="text-sm">{t("links.rosengrip")}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { StorySection } from "./story-section";

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function Contact() {
  const t = useTranslations("contact");

  return (
    <StorySection id="contact" chapter="06" title={t("title")}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-body text-xl text-muted-foreground mb-16 max-w-lg"
      >
        {t("description")}
      </motion.p>

      {/* Contact details - large, clickable */}
      <div className="space-y-6 mb-16">
        <motion.a
          custom={0}
          variants={linkVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          href={`mailto:${t("email.value")}`}
          className="group flex items-center gap-4 text-foreground/80 hover:text-accent transition-colors duration-300"
        >
          <Mail className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
          <span className="text-lg md:text-xl font-mono">
            {t("email.value")}
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </motion.a>

        <motion.a
          custom={1}
          variants={linkVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          href={`tel:${t("phone.value").replace(/\s/g, "")}`}
          className="group flex items-center gap-4 text-foreground/80 hover:text-accent transition-colors duration-300"
        >
          <Phone className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
          <span className="text-lg md:text-xl font-mono">
            {t("phone.value")}
          </span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
        </motion.a>

        <motion.div
          custom={2}
          variants={linkVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 text-muted-foreground"
        >
          <MapPin className="w-5 h-5 text-accent/60" />
          <span className="text-lg md:text-xl font-mono">
            {t("location.value")}
          </span>
        </motion.div>
      </div>

      {/* Social links - larger, with magnetic effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="flex flex-wrap gap-4"
      >
        {[
          {
            href: "https://github.com/SebastianRSorensen",
            icon: Github,
            label: t("links.github"),
          },
          {
            href: "https://www.linkedin.com/in/sebastian-rosnes-s%C3%B8rensen-64bb5822a/",
            icon: Linkedin,
            label: t("links.linkedin"),
          },
          {
            href: "https://www.rosengrip.no",
            icon: ExternalLink,
            label: t("links.rosengrip"),
          },
        ].map((link) => (
          <Magnetic key={link.label} strength={0.15}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-5 py-3 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all duration-300"
            >
              <link.icon className="w-4 h-4" />
              <span className="text-sm font-mono">{link.label}</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </Magnetic>
        ))}
      </motion.div>
    </StorySection>
  );
}

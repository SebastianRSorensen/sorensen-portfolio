"use client";

import { useTranslations } from "next-intl";
import { StorySection } from "./story-section";

export function StoryGrense() {
  const t = useTranslations("grense");

  const highlights = [
    t("highlights.0"),
    t("highlights.1"),
    t("highlights.2"),
  ];

  return (
    <StorySection id="grense" chapter={t("chapter")} title={t("title")}>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Left: Info block */}
        <div className="space-y-6">
          <div>
            <p className="text-heading text-xl text-foreground">{t("role")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("unit")}</p>
          </div>
          <p className="text-mono text-sm text-muted-foreground">{t("period")}</p>
          <p className="text-body text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Right: Highlights */}
        <div className="space-y-4">
          <p className="text-mono text-xs text-accent uppercase tracking-wider mb-4">
            {t("subtitle")}
          </p>
          {highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-muted-foreground"
            >
              <span className="text-accent mt-1 text-sm">—</span>
              <p className="text-body">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </StorySection>
  );
}

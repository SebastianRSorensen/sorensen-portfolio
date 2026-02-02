"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-16 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground font-mono tracking-wider">
            {t("copyright")}
          </p>
          <p className="text-xs text-muted-foreground font-mono tracking-wider">
            {t("location")}
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright")}</p>
          <p className="text-sm text-muted-foreground">{t("location")}</p>
        </div>
      </div>
    </footer>
  );
}

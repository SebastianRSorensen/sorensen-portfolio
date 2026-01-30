"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "no" ? "en" : "no";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
      aria-label={`Switch to ${locale === "no" ? "English" : "Norwegian"}`}
    >
      {locale === "no" ? "EN" : "NO"}
    </button>
  );
}

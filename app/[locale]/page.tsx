import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-display text-6xl">{t("name")}</h1>
        <p className="text-muted-foreground text-lg">{t("tagline")}</p>
      </div>
    </div>
  );
}

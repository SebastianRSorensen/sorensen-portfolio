import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MotionProvider } from "@/lib/motion-config";
import { JungleModeProvider } from "@/lib/jungle-mode";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { JungleEnvironment } from "@/components/jungle/jungle-environment";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "no" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <MotionProvider>
        <JungleModeProvider>
          <SmoothScroll>
            <Navigation />
            <JungleEnvironment />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </JungleModeProvider>
      </MotionProvider>
    </NextIntlClientProvider>
  );
}

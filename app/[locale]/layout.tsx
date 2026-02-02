import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing } from "@/i18n/routing";
import { instrumentSerif, geistSans, geistMono } from "@/lib/fonts";
import { MotionProvider } from "@/lib/motion-config";
import { UFOProvider } from "@/lib/ufo-context";
import { JsonLd } from "@/components/json-ld";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { UFOController } from "@/components/ufo-controller";
import { ShootingStars } from "@/components/shooting-stars";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = "https://sebastiansorensen.no";
  const canonicalUrl = locale === "no" ? baseUrl : `${baseUrl}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "nb-NO": baseUrl,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonicalUrl,
      locale: locale === "no" ? "nb_NO" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "no" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased noise-overlay`}
      >
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <UFOProvider>
              <ShootingStars />
              <SmoothScroll>
                <UFOController />
                <Navigation />
                <main>{children}</main>
                <Footer />
              </SmoothScroll>
            </UFOProvider>
          </MotionProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

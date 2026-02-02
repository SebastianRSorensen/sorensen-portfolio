import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastiansorensen.no"),
  title: {
    default: "Sebastian Rosnes Sørensen | Systemutvikler",
    template: "%s | Sebastian Rosnes Sørensen",
  },
  description:
    "Systemutvikler med bakgrunn fra Forsvaret og fintech. Bygger moderne webløsninger med React, Next.js og TypeScript i Bergen.",
  keywords: [
    "systemutvikler",
    "system developer",
    "Sebastian Sørensen",
    "Bergen",
    "React",
    "Next.js",
    "TypeScript",
    "fullstack utvikler",
    "Stacc",
    "Rosengrip",
    "webutvikling",
  ],
  authors: [{ name: "Sebastian Rosnes Sørensen" }],
  creator: "Sebastian Rosnes Sørensen",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    siteName: "Sebastian Rosnes Sørensen",
    title: "Sebastian Rosnes Sørensen | Systemutvikler",
    description:
      "Systemutvikler med bakgrunn fra Forsvaret og fintech. Bygger moderne webløsninger med React, Next.js og TypeScript.",
    url: "https://sebastiansorensen.no",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Rosnes Sørensen | Systemutvikler",
    description:
      "Systemutvikler med bakgrunn fra fintech. Bygger moderne webløsninger med React, Next.js og TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://sebastiansorensen.no",
    languages: {
      "nb-NO": "https://sebastiansorensen.no",
      "en": "https://sebastiansorensen.no/en",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

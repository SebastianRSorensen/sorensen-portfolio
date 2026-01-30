import type { Metadata } from "next";
import { instrumentSerif, geistSans, geistMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastiansorensen.dev"),
  title: {
    default: "Sebastian Rosnes Sorensen | System Developer",
    template: "%s | Sebastian Rosnes Sorensen",
  },
  description:
    "System developer with military background and fintech experience. Building modern web solutions with React, Next.js, and TypeScript.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    siteName: "Sebastian Rosnes Sorensen",
    title: "Sebastian Rosnes Sorensen | System Developer",
    description:
      "Developer. Builder. From the Russian border to fintech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Rosnes Sorensen | System Developer",
    description:
      "Developer. Builder. From the Russian border to fintech.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}

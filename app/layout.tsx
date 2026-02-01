import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { instrumentSerif, geistSans, geistMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastiansorensen.dev"),
  title: {
    default: "Sebastian Rosnes Sørensen | System Developer",
    template: "%s | Sebastian Rosnes Sørensen",
  },
  description:
    "System developer with military background and fintech experience. Building modern web solutions with React, Next.js, and TypeScript.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    alternateLocale: "en_US",
    siteName: "Sebastian Rosnes Sørensen",
    title: "Sebastian Rosnes Sørensen | System Developer",
    description:
      "Not your typical developer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Rosnes Sørensen | System Developer",
    description:
      "Not your typical developer.",
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
        <Analytics />
      </body>
    </html>
  );
}

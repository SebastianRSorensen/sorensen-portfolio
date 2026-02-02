import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sebastian Rosnes Sørensen — Systemutvikler",
    short_name: "S. Sørensen",
    description:
      "Systemutvikler med bakgrunn fra Forsvaret og fintech. Bygger moderne webløsninger med React, Next.js og TypeScript.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f14",
    theme_color: "#0a0f14",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

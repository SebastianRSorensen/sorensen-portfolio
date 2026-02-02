import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/design-system", "/en/design-system"],
      },
    ],
    sitemap: "https://sebastiansorensen.no/sitemap.xml",
  };
}

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sebastian Rosnes Sørensen",
    url: "https://sebastiansorensen.no",
    jobTitle: "Systemutvikler",
    worksFor: [
      {
        "@type": "Organization",
        name: "Stacc AS",
        url: "https://stacc.com",
      },
      {
        "@type": "Organization",
        name: "Rosengrip",
        url: "https://www.rosengrip.no",
      },
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universitetet i Bergen",
      url: "https://www.uib.no",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bergen",
      addressCountry: "NO",
    },
    sameAs: [
      "https://github.com/SebastianRSorensen",
      "https://www.linkedin.com/in/sebastian-rosnes-s%C3%B8rensen-64bb5822a/",
      "https://www.rosengrip.no",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Tailwind CSS",
      "Azure",
    ],
    description:
      "Systemutvikler med bakgrunn fra Forsvaret og fintech. Bygger moderne webløsninger med React, Next.js og TypeScript.",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sebastian Rosnes Sørensen",
    url: "https://sebastiansorensen.no",
    inLanguage: ["nb-NO", "en"],
    description:
      "Portefølje for Sebastian Rosnes Sørensen — systemutvikler i Bergen, Norge.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

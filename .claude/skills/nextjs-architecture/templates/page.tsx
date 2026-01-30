// Server component page template — do NOT add "use client" here.

import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CTABanner } from '@/components/sections/cta-banner';
// Import client components only where interactivity is needed
// import { SomeClientComponent } from '@/components/some-client-component';

// ============================================================================
// METADATA - Update for each page
// ============================================================================

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO. Keep under 160 characters.',
};

// ============================================================================
// PAGE CONTENT - Update for each page
// ============================================================================

// Define page-specific content as constants
const pageContent = {
  icon: Zap,
  title: 'Service Title',
  description:
    'Service description explaining the value proposition. Be clear about what you offer and why customers should choose you.',
  ctaText: 'Get started',
  ctaLink: '/contact',
  image: {
    src: '/images/placeholder.jpg',
    alt: 'Service image description',
  },
};

// Benefits/features list
const benefits = [
  'Benefit or feature one',
  'Benefit or feature two',
  'Benefit or feature three',
  'Benefit or feature four',
  'Benefit or feature five',
];

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function ServicePage() {
  const IconComponent = pageContent.icon;

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <IconComponent className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {pageContent.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {pageContent.description}
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-success shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button asChild size="lg">
                <Link href={pageContent.ctaLink}>
                  {pageContent.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src={pageContent.image.src}
                alt={pageContent.image.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner />

      {/* Add more sections as needed */}
      {/* <SomeClientComponent /> */}
    </>
  );
}

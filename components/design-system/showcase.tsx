"use client";

import { ColorPalette } from "./color-palette";
import { TypographyScale } from "./typography-scale";
import { SpacingSystem } from "./spacing-system";
import { ButtonStyles } from "./button-styles";
import { BadgeStyles } from "./badge-styles";
import { CardStyles } from "./card-styles";
import { AnimationPreviews } from "./animation-previews";
import { InteractiveStates } from "./interactive-states";

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20 border-b border-border last:border-0">
      <div className="mb-10">
        <span className="text-mono text-sm text-accent">{number}</span>
        <h2 className="text-display text-4xl md:text-5xl text-foreground mt-2">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function DesignSystemShowcase() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
      {/* Header */}
      <header className="py-20 border-b border-border">
        <span className="text-mono text-sm text-accent block mb-4">Design System</span>
        <h1 className="text-display text-5xl md:text-7xl text-foreground">Nordic Night</h1>
        <p className="text-body text-lg text-muted-foreground mt-4 max-w-2xl">
          Visual language for Sebastian Rosnes Sørensen&apos;s portfolio. Dark, confident,
          cinematic. Inspired by landonorris.com.
        </p>
      </header>

      <Section number="01" title="Color Palette">
        <ColorPalette />
      </Section>

      <Section number="02" title="Typography">
        <TypographyScale />
      </Section>

      <Section number="03" title="Spacing">
        <SpacingSystem />
      </Section>

      <Section number="04" title="Buttons">
        <ButtonStyles />
      </Section>

      <Section number="05" title="Badges">
        <BadgeStyles />
      </Section>

      <Section number="06" title="Cards">
        <CardStyles />
      </Section>

      <Section number="07" title="Animations">
        <AnimationPreviews />
      </Section>

      <Section number="08" title="Interactive States">
        <InteractiveStates />
      </Section>
    </div>
  );
}

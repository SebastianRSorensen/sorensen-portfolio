// ============================================================================
// SITE CONFIGURATION
// ============================================================================
// Update these values for each project. All templates reference this file.

export const siteConfig = {
  // Basic info
  name: 'Company Name',
  description: 'Company description for SEO and meta tags. Keep under 160 characters.',
  url: 'https://example.com',

  // Localization
  locale: 'en_US', // OpenGraph locale (e.g., 'nb_NO' for Norwegian)
  lang: 'en', // HTML lang attribute (e.g., 'nb' for Norwegian)

  // SEO keywords
  keywords: [
    'keyword one',
    'keyword two',
    'keyword three',
  ],

  // Contact information
  phone: '+1 555 123 4567',
  email: 'hello@example.com',
  address: {
    street: '123 Main Street',
    city: 'City',
    state: 'State',
    postalCode: '12345',
    country: 'Country',
  },

  // Business hours (optional)
  hours: {
    weekdays: '09:00 - 17:00',
    saturday: 'Closed',
    sunday: 'Closed',
  },

  // Social links (optional)
  social: {
    twitter: 'https://twitter.com/company',
    linkedin: 'https://linkedin.com/company/company',
    facebook: 'https://facebook.com/company',
    instagram: 'https://instagram.com/company',
  },
} as const;

// ============================================================================
// NAVIGATION
// ============================================================================

export const navigation = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  footer: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

// ============================================================================
// SERVICES (if applicable)
// ============================================================================

export const services = [
  {
    slug: 'service-one',
    name: 'Service One',
    shortDescription: 'Brief description of service one.',
    icon: 'Zap', // Lucide icon name
    href: '/services/service-one',
  },
  {
    slug: 'service-two',
    name: 'Service Two',
    shortDescription: 'Brief description of service two.',
    icon: 'Shield',
    href: '/services/service-two',
  },
  {
    slug: 'service-three',
    name: 'Service Three',
    shortDescription: 'Brief description of service three.',
    icon: 'Star',
    href: '/services/service-three',
  },
] as const;

// ============================================================================
// SERVICE AREAS (if applicable)
// ============================================================================

export const serviceAreas = [
  'Area One',
  'Area Two',
  'Area Three',
] as const;

// ============================================================================
// LOCALE UTILITIES
// ============================================================================

export const localeUtils = {
  formatDate: (date: Date) => date.toLocaleDateString(siteConfig.locale.replace('_', '-')),
  formatNumber: (num: number) => num.toLocaleString(siteConfig.locale.replace('_', '-')),
  formatCurrency: (num: number, currency = 'USD') =>
    num.toLocaleString(siteConfig.locale.replace('_', '-'), {
      style: 'currency',
      currency,
    }),
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type Service = (typeof services)[number];
export type NavItem = (typeof navigation.main)[number];

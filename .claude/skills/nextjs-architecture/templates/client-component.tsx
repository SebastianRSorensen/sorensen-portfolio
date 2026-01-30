'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CheckCircle, Loader2 } from 'lucide-react';

// ============================================================================
// CONFIGURATION - Update these for your project
// ============================================================================

// Option 1: Import from constants (recommended)
// import { services, formLabels } from '@/lib/constants';

// Option 2: Define inline (for simpler projects)
const services = [
  { value: 'service-1', label: 'Service One' },
  { value: 'service-2', label: 'Service Two' },
  { value: 'service-3', label: 'Service Three' },
  { value: 'other', label: 'Other' },
];

// Localized labels - update for your language
const labels = {
  name: 'Name',
  namePlaceholder: 'Your name',
  phone: 'Phone',
  phonePlaceholder: '+1 555 123 4567',
  email: 'Email',
  emailPlaceholder: 'your@email.com',
  service: 'Service',
  servicePlaceholder: 'Select a service',
  address: 'Address (optional)',
  addressPlaceholder: 'Where should the work be done?',
  message: 'Message',
  messagePlaceholder: 'Describe what you need help with...',
  submit: 'Send request',
  submitting: 'Sending...',
  successTitle: 'Thank you for your inquiry!',
  successMessage: 'We will contact you as soon as possible.',
  errorMessage: 'Submission failed',
};

// ============================================================================
// COMPONENT
// ============================================================================

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      // Option 1: Send to API route
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Option 2: Send to external service (e.g., Formspree, Resend)
      // await fetch('https://formspree.io/f/your-form-id', {
      //   method: 'POST',
      //   body: formData,
      //   headers: { Accept: 'application/json' },
      // });

      // Simulate API call (remove in production)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      onSuccess?.();
    } catch (error) {
      console.error(labels.errorMessage, error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">{labels.successTitle}</h3>
        <p className="text-muted-foreground">{labels.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">{labels.name} *</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder={labels.namePlaceholder}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">{labels.phone} *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={labels.phonePlaceholder}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">{labels.email} *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={labels.emailPlaceholder}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">{labels.service}</Label>
          <Select name="service">
            <SelectTrigger>
              <SelectValue placeholder={labels.servicePlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">{labels.address}</Label>
        <Input
          id="address"
          name="address"
          placeholder={labels.addressPlaceholder}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{labels.message} *</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={labels.messagePlaceholder}
          rows={5}
        />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {labels.submitting}
          </>
        ) : (
          labels.submit
        )}
      </Button>
    </form>
  );
}

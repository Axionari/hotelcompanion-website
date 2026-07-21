import type { Localized } from '../useCopy'

/* Copy source: HotelCompanion__Site_Copy.md {#demo-form}. Verbatim. */

const en = {
  title: 'Schedule Your Demonstration',
  intro: 'Complete the form below and we’ll contact you to arrange a personalized executive demonstration.',
  fields: {
    name: 'Name',
    hotel: 'Hotel',
    role: 'Role',
    email: 'Business Email',
    phone: 'Phone (Optional)',
    country: 'Country',
    propertyType: 'Property Type',
    properties: 'Number of Properties',
    interest: 'What would you like to explore?',
    message: 'Tell us about your hotel and what you’re hoping to improve.',
  },
  propertyTypes: ['Boutique Hotel', 'Luxury Hotel', 'Resort', 'Business Hotel', 'Hotel Group', 'Other'],
  interests: [
    'Guest Experience',
    'Voice AI',
    'Revenue Opportunities',
    'Operations',
    'Enterprise Deployment',
    'Companion OS',
    'General Information',
  ],
  submit: 'Book My Demonstration',
  submitting: 'Sending…',
  select: 'Select…',
  errors: {
    required: 'This field is required.',
    email: 'Please enter a valid business email.',
    submit: 'Unable to submit right now. Please try again or email sales@hotelcompanion.ai.',
  },
  success: {
    title: 'Thank you.',
    body: 'We’ve received your request and will contact you shortly to arrange your personalized demonstration.',
  },
}

/* NEEDS ES: professional translation pending — ES mirrors EN (brief guardrail 8). */
const es: typeof en = en

export const demoFormCopy: Localized<typeof en> = { en, es }

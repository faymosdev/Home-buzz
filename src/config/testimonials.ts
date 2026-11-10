/**
 * Customer reviews.
 *
 * NEVER add invented reviews. Only add genuine reviews from real customers,
 * with their permission. While this list is empty, the site shows a clearly
 * labelled "reviews coming soon" section instead.
 */
export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "Homeowner, south Belfast" */
  context: string;
  /** Where the review was collected, e.g. "Google review", "Email". */
  source: string;
  service?: string;
};

export const testimonials: Testimonial[] = [];

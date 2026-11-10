/**
 * Indicative pricing (GBP). These are guide prices from the business plan,
 * NOT quotations. Final prices depend on garden size, condition, access and
 * waste volume, and are always confirmed in a free written quote.
 *
 * Amounts are in whole pounds. Homebuzz never takes payment online.
 */
export type PriceItem = {
  id: string;
  name: string;
  /** Lower bound in GBP. */
  from: number;
  /** Upper bound in GBP; null when open-ended or a single "around" price. */
  to: number | null;
  /** How to present the number. */
  display: "range" | "range-plus" | "around";
  unit?: string;
  description: string;
  audience: "residential" | "business" | "both";
  serviceId?: string;
};

export const pricing: PriceItem[] = [
  {
    id: "small-tidy",
    name: "Small garden tidy-up",
    from: 60,
    to: 120,
    display: "range",
    description: "A few hours of weeding, cutting back and clearing, with the waste taken away.",
    audience: "residential",
    serviceId: "garden-clearance",
  },
  {
    id: "full-clearance",
    name: "Full garden clearance",
    from: 150,
    to: 350,
    display: "range-plus",
    description: "Overgrown or neglected gardens cleared back to a usable space.",
    audience: "residential",
    serviceId: "overgrown-garden-clearance",
  },
  {
    id: "business-clearance",
    name: "Landlord and letting-agent clearance",
    from: 160,
    to: null,
    display: "around",
    unit: "average job",
    description: "End-of-tenancy and pre-letting clearances, fixed price after assessment.",
    audience: "business",
    serviceId: "end-of-tenancy-clearance",
  },
  {
    id: "maintenance",
    name: "Regular maintenance",
    from: 45,
    to: null,
    display: "around",
    unit: "per visit",
    description: "Grass, edges and borders kept on top of, on a schedule that suits you.",
    audience: "both",
    serviceId: "garden-maintenance",
  },
];

export const pricingNotes = [
  "Prices are a guide, not a quotation.",
  "Your final price depends on garden size, condition, access and how much waste there is.",
  "Every job gets a free written quote first. You never pay anything up front, and we never take payment online.",
];

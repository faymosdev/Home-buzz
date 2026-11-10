/**
 * Central business details. Edit this file to update contact details,
 * social links and launch messaging across the whole site.
 *
 * IMPORTANT: Anything set to `null` is shown on the site as a clearly marked
 * placeholder. Only fill in details that are real and confirmed.
 */
export const site = {
  name: "Homebuzz Gardening Services",
  shortName: "Homebuzz",
  founder: "Fortune",
  tagline: "Garden clearance and green waste removal in Belfast",
  description:
    "Affordable garden clearance, green waste removal and garden maintenance across Belfast. Free written quotes, no upfront payment, and discounts for eligible older and disabled residents.",

  /** Public site URL. Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  location: {
    city: "Belfast",
    region: "Northern Ireland",
    country: "GB",
    serviceArea: "Belfast and surrounding areas",
    /** Short, honest description of coverage. Update once confirmed. */
    serviceAreaDetail:
      "We cover Belfast (BT postcodes). If you're just outside the city, ask us — we'll tell you honestly whether we can reach you.",
  },

  contact: {
    /** e.g. "028 9000 0000" — leave null until the number is live. */
    phone: null as string | null,
    /** e.g. "hello@yourdomain.co.uk" — leave null until the inbox is live. */
    email: null as string | null,
    /** e.g. "Mon–Fri 8am–6pm, Sat 9am–1pm" */
    openingHours: null as string | null,
  },

  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    nextdoor: null as string | null,
  },

  /** Compliance details: only set these when they are confirmed. */
  compliance: {
    /** Waste carrier registration number (DAERA / NIEA). Do not claim until confirmed. */
    wasteCarrierRegistration: null as string | null,
    /** e.g. "Public liability insurance up to £X" — only once a policy is in place. */
    insurance: null as string | null,
    /** Company or sole trader registration details, if applicable. */
    companyRegistration: null as string | null,
  },

  launch: {
    /** Shown in the header ribbon and hero. Set `show` to false after launch. */
    show: true,
    message: "Launching March 2027 — quote requests open now",
  },

  /** Discount for eligible older and disabled residents. Null = "confirmed in your quote". */
  concessionDiscount: null as string | null,

  copyright: "Homebuzz Gardening Services",
} as const;

export type Site = typeof site;

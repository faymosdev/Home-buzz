/**
 * Central business details. Edit this file to update contact details,
 * social links and launch messaging across the whole site.
 *
 * IMPORTANT: Anything set to `null` is shown on the site as a clearly marked
 * placeholder. Only fill in details that are real and confirmed.
 */

/** Live production URL. Used when NEXT_PUBLIC_SITE_URL is missing or invalid. */
const PRODUCTION_URL = "https://www.homebuzzgroups.co.uk";

/** Dot-separated labels of letters, digits and inner hyphens (e.g. "www.homebuzzgroups.co.uk"). */
const HOSTNAME_PATTERN = /^(?!-)[a-z\d-]{1,63}(?<!-)(\.(?!-)[a-z\d-]{1,63}(?<!-))+$/i;

/**
 * Normalises NEXT_PUBLIC_SITE_URL to a bare origin (no path, no trailing slash).
 * Accepts only http/https URLs with a real hostname. Never throws.
 */
function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (!value) return PRODUCTION_URL;

  // Values without a scheme (e.g. "example.co.uk") are treated as https.
  const hasScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(value);
  const candidate = hasScheme ? value : `https://${value}`;

  try {
    const url = new URL(candidate);
    const validProtocol = url.protocol === "https:" || url.protocol === "http:";
    const validHost = url.hostname === "localhost" || HOSTNAME_PATTERN.test(url.hostname);
    if (validProtocol && validHost) return url.origin;
  } catch {
    // Fall through to the warning below.
  }

  console.warn(`[site] Invalid NEXT_PUBLIC_SITE_URL "${value}"; using ${PRODUCTION_URL}`);
  return PRODUCTION_URL;
}

export const site = {
  name: "Homebuzz Gardening Services",
  shortName: "Homebuzz",
  founder: "Fortune",
  tagline: "Garden clearance and green waste removal in Belfast and across Northern Ireland",
  description:
    "Affordable garden clearance, green waste removal and garden maintenance in Belfast and across Northern Ireland. Free written quotes, no upfront payment, and discounts for eligible older and disabled residents.",

  /** Public site URL. Set NEXT_PUBLIC_SITE_URL in production; falls back to PRODUCTION_URL. */
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),

  location: {
    city: "Belfast",
    region: "Northern Ireland",
    country: "GB",
    serviceArea: "Belfast and all of Northern Ireland",
    /** Short, honest description of coverage. Update once confirmed. */
    serviceAreaDetail:
      "We cover anywhere in Northern Ireland, including Belfast and every BT postcode.",
  },

  contact: {
    /** Phone calls. UK format, e.g. "028 9000 0000". Null hides it. */
    phone: "07751 573821" as string | null,
    /** WhatsApp messages. UK format; linked via wa.me. Null hides it. */
    whatsapp: "07440 063415" as string | null,
    email: "info@homebuzzgroups.co.uk" as string | null,
    /** e.g. "Mon–Fri 8am–6pm, Sat 9am–1pm" */
    openingHours: "Open 24/7" as string | null,
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
    show: false,
    message: "Launching March 2027 — quote requests open now",
  },

  /** Discount for eligible older and disabled residents. Null = "confirmed in your quote". */
  concessionDiscount: null as string | null,

  copyright: "Homebuzz Gardening Services",
} as const;

export type Site = typeof site;

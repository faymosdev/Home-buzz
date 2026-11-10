import type { Metadata } from "next";
import { pricing } from "@/config/pricing";
import { availableServices } from "@/config/services";
import { site } from "@/config/site";
import { absoluteUrl } from "./utils";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Set true for pages that shouldn't be indexed (e.g. thank-you states). */
  noIndex?: boolean;
  /** Use the title as-is, without the site-name suffix. */
  absoluteTitle?: boolean;
};

/** Unique title, description, canonical and Open Graph for every page. */
export function buildMetadata({ title, description, path, noIndex, absoluteTitle }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_GB",
      type: "website",
      images: [{ url: absoluteUrl("/og-image.jpg"), width: 1200, height: 630, alt: "A tidy, cleared garden" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl("/og-image.jpg")] },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/**
 * LocalBusiness structured data. Only verified details are included —
 * phone, email and social profiles are added automatically once they are
 * set in src/config/site.ts.
 */
export function localBusinessJsonLd() {
  const prices = pricing.map((p) => p.from);
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.description,
    url: site.url,
    image: absoluteUrl("/og-image.jpg"),
    logo: absoluteUrl("/icon.svg"),
    founder: { "@type": "Person", name: site.founder },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    areaServed: { "@type": "City", name: site.location.city },
    priceRange: `£${Math.min(...prices)}–£350+`,
    currenciesAccepted: "GBP",
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garden services",
      itemListElement: availableServices.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary, areaServed: site.location.city },
      })),
    },
  };
}

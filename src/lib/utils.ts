import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PriceItem } from "@/config/pricing";
import { site } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

/** Formats whole pounds, e.g. 60 -> "£60". */
export function formatGBP(amount: number) {
  return gbp.format(amount);
}

/** Human-readable indicative price, e.g. "£60–£120", "£150–£350+", "Around £45". */
export function formatPrice(item: PriceItem) {
  switch (item.display) {
    case "range":
      return `${formatGBP(item.from)}–${formatGBP(item.to ?? item.from)}`;
    case "range-plus":
      return `${formatGBP(item.from)}–${formatGBP(item.to ?? item.from)}+`;
    case "around":
      return `Around ${formatGBP(item.from)}`;
  }
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Turns a UK phone number into a tel: href. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

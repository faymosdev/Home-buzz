import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { site } from "@/config/site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** "07440 063415" -> "+447440063415" (UK numbers starting 0 become +44). */
export function intlPhone(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("0") ? `+44${digits.slice(1)}` : digits;
}

/** Turns a UK phone number into a tel: href that also works when dialled from abroad. */
export function telHref(phone: string) {
  return `tel:${intlPhone(phone)}`;
}

/** WhatsApp chat link for a UK number, e.g. https://wa.me/447751573821. */
export function whatsappHref(phone: string) {
  return `https://wa.me/${intlPhone(phone).replace("+", "")}`;
}

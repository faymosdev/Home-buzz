import { LetterOutlineIcon, PhoneOutlineIcon } from "@solar-icons/react";
import { Placeholder } from "@/components/ui/placeholder";
import { site } from "@/config/site";
import { telHref } from "@/lib/utils";

/** Direct contact options, shown when online submission isn't available. */
export function ContactFallback() {
  return (
    <ul className="mt-4 space-y-3">
      <li className="flex items-center gap-3">
        <PhoneOutlineIcon className="size-5 shrink-0 text-green" aria-hidden />
        {site.contact.phone ? (
          <a className="font-semibold text-navy underline underline-offset-4" href={telHref(site.contact.phone)}>
            Call {site.contact.phone}
          </a>
        ) : (
          <Placeholder>Phone number to be added</Placeholder>
        )}
      </li>
      <li className="flex items-center gap-3">
        <LetterOutlineIcon className="size-5 shrink-0 text-green" aria-hidden />
        {site.contact.email ? (
          <a className="font-semibold text-navy underline underline-offset-4" href={`mailto:${site.contact.email}`}>
            Email {site.contact.email}
          </a>
        ) : (
          <Placeholder>Email address to be added</Placeholder>
        )}
      </li>
    </ul>
  );
}

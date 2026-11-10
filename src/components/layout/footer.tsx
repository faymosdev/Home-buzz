import Link from "next/link";
import { LetterOutlineIcon, MapPointOutlineIcon, PhoneOutlineIcon } from "@solar-icons/react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
import { legalNav, mainNav, primaryCta } from "@/config/navigation";
import { availableServices } from "@/config/services";
import { site } from "@/config/site";
import { telHref } from "@/lib/utils";
import { Container } from "./container";

const socialLabels: Record<keyof typeof site.social, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  nextdoor: "Nextdoor",
};

export function Footer() {
  const socials = (Object.keys(site.social) as (keyof typeof site.social)[])
    .map((key) => ({ key, label: socialLabels[key], href: site.social[key] }))
    .filter((s): s is { key: keyof typeof site.social; label: string; href: string } => Boolean(s.href));

  return (
    <footer className="on-dark bg-navy-950 text-white/80">
      <Container className="pt-16 pb-10">

        <div className="grid gap-12 pb-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
          <div className="space-y-5">
            <Logo inverted />
            <p className="max-w-xs text-[0.9375rem]">{site.tagline}. Founded by {site.founder}.</p>
          </div>

          <FooterColumn title="Explore">
            {[{ label: "Home", href: "/" }, ...mainNav, primaryCta].map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {availableServices.map((s) => (
              <li key={s.id}>
                <FooterLink href={`/services#${s.id}`}>{s.name}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Get in touch">
            <li className="flex items-start gap-3">
              <PhoneOutlineIcon className="mt-1 size-5 shrink-0 text-green-300" aria-hidden />
              {site.contact.phone ? (
                <a className="hover:text-white" href={telHref(site.contact.phone)}>
                  {site.contact.phone}
                </a>
              ) : (
                <Placeholder>Phone number to be added</Placeholder>
              )}
            </li>
            <li className="flex items-start gap-3">
              <LetterOutlineIcon className="mt-1 size-5 shrink-0 text-green-300" aria-hidden />
              {site.contact.email ? (
                <a className="break-all hover:text-white" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              ) : (
                <Placeholder>Email address to be added</Placeholder>
              )}
            </li>
            <li className="flex items-start gap-3">
              <MapPointOutlineIcon className="mt-1 size-5 shrink-0 text-green-300" aria-hidden />
              <span>
                Serving {site.location.serviceArea}, {site.location.region}
              </span>
            </li>
            <li className="pt-2">
              {socials.length > 0 ? (
                <ul className="flex flex-wrap gap-2" aria-label="Social media">
                  {socials.map((s) => (
                    <li key={s.key}>
                      <a href={s.href} className={buttonVariants({ variant: "outline-light", size: "sm" })} rel="noopener noreferrer" target="_blank">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <Placeholder>Social media links to be added</Placeholder>
              )}
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 pt-8 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <p>© {site.copyright}. Belfast, Northern Ireland.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow mb-5 font-sans text-green-300">{title}</h2>
      <ul className="space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="underline-offset-4 transition-colors hover:text-white hover:underline">
      {children}
    </Link>
  );
}

import { Suspense } from "react";
import { ClockCircleOutlineIcon, LetterOutlineIcon, MapPointOutlineIcon, PhoneOutlineIcon, UsersGroupRoundedOutlineIcon } from "@solar-icons/react";
import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { Placeholder } from "@/components/ui/placeholder";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { telHref } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Contact Homebuzz Gardening Services, Belfast",
  description: "Get in touch with Homebuzz Gardening Services about garden clearance, green waste removal or maintenance in Belfast.",
  path: "/contact",
});

export default function ContactPage() {
  const socials = Object.entries(site.social).filter(([, href]) => href) as [string, string][];
  const rows = [
    {
      icon: PhoneOutlineIcon,
      label: "Phone",
      value: site.contact.phone ? (
        <a href={telHref(site.contact.phone)} className="font-semibold text-navy underline underline-offset-4">
          {site.contact.phone}
        </a>
      ) : (
        <Placeholder>Phone number to be added</Placeholder>
      ),
    },
    {
      icon: LetterOutlineIcon,
      label: "Email",
      value: site.contact.email ? (
        <a href={`mailto:${site.contact.email}`} className="font-semibold break-all text-navy underline underline-offset-4">
          {site.contact.email}
        </a>
      ) : (
        <Placeholder>Email address to be added</Placeholder>
      ),
    },
    { icon: MapPointOutlineIcon, label: "Service area", value: <span>{site.location.serviceAreaDetail}</span> },
    {
      icon: ClockCircleOutlineIcon,
      label: "Opening hours",
      value: site.contact.openingHours ?? <Placeholder>Opening hours to be added</Placeholder>,
    },
    {
      icon: UsersGroupRoundedOutlineIcon,
      label: "Social media",
      value: socials.length ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {socials.map(([name, href]) => (
            <li key={name}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-navy capitalize underline underline-offset-4">
                {name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <Placeholder>Social media links to be added</Placeholder>
      ),
    },
  ];

  return (
    <section aria-labelledby="page-title" className="bg-paper">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-5 text-green">Contact</p>
          <h1 id="page-title" className="text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            Talk to Homebuzz
          </h1>
          <p className="mt-5 max-w-md text-lead text-muted-strong">
            Questions about a garden, a property or a quote? Send a message and we&apos;ll get back to you.
          </p>
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-4 py-5">
                <Icon className="mt-0.5 size-6 shrink-0 text-green" aria-hidden />
                <div>
                  <dt className="text-sm font-semibold text-muted">{label}</dt>
                  <dd className="mt-1 text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
        <Suspense fallback={<div className="min-h-[36rem] rounded-[2rem] border border-line bg-white" aria-hidden />}>
          <ContactForm />
        </Suspense>
      </Container>
    </section>
  );
}

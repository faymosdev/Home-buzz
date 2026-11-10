import Image from "next/image";
import Link from "next/link";
import {
  Buildings2OutlineIcon,
  CalendarMarkOutlineIcon,
  ClipboardCheckOutlineIcon,
  HourglassOutlineIcon,
  KeyOutlineIcon,
  RestartOutlineIcon,
  TagPriceOutlineIcon,
  UsersGroupRoundedOutlineIcon,
} from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-list";
import { PageHero } from "@/components/sections/page-hero";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { buttonVariants } from "@/components/ui/button";
import { faqs } from "@/config/faqs";
import { images } from "@/config/images";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Landlord and Letting Agent Garden Clearance in Belfast",
  description:
    "End-of-tenancy garden clearances and ongoing maintenance for Belfast landlords, letting agents, property managers and housing providers. Fixed prices after assessment and fast turnaround.",
  path: "/business-services",
});

const CTA = { label: "Discuss your property requirements", href: "/get-a-quote?customer=business" };

const clients = [
  { id: "letting-agents", icon: KeyOutlineIcon, title: "Letting agents", body: "Gardens cleared between tenancies, ready for check-in photos and viewings." },
  { id: "landlords", icon: Buildings2OutlineIcon, title: "Landlords", body: "One property or a portfolio. A fixed price, and photos of the finished job on request." },
  { id: "property-managers", icon: ClipboardCheckOutlineIcon, title: "Property managers", body: "Scheduled garden care across your sites, with one point of contact." },
  { id: "housing-providers", icon: UsersGroupRoundedOutlineIcon, title: "Housing providers", body: "Safe, presentable outdoor spaces for residents, cleared and maintained." },
];

const offer = [
  { icon: TagPriceOutlineIcon, title: "Fixed price after assessment", body: "We assess from photos or a visit, then confirm one fixed price in writing." },
  { icon: HourglassOutlineIcon, title: "Fast turnaround", body: "We aim to fit around check-out dates and re-letting deadlines." },
  { icon: KeyOutlineIcon, title: "End-of-tenancy clearances", body: "Overgrowth, cuttings and green waste cleared so the property is ready to show." },
  { icon: CalendarMarkOutlineIcon, title: "Ongoing maintenance", body: "Regular visits to keep gardens under control between tenancies." },
  { icon: RestartOutlineIcon, title: "Easy repeat bookings", body: "Once we know your properties, booking the next job is a quick message." },
  { icon: ClipboardCheckOutlineIcon, title: "A dedicated contact", body: "Business enquiries go to one person who knows your properties." },
];

const businessFaqs = faqs.filter((f) => f.category === "businesses" || f.id === "areas" || f.id === "waste");

export default function BusinessServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="For landlords and property professionals"
        title="A dependable garden partner for the properties you manage"
        intro="End-of-tenancy clearances and ongoing garden maintenance across Belfast. Fixed prices after assessment, fast turnaround, and one point of contact."
        image={images.rentalHomes}
        cta={CTA}
      />

      <Section tone="white" labelledBy="clients-title">
        <Container>
          <SectionHeading id="clients-title" eyebrow="Who we work with" title="Built around the way property businesses work" />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map(({ id, icon: Icon, title, body }) => (
              <li key={id} id={id} className="scroll-mt-28 rounded-[1.75rem] border border-line bg-paper p-7">
                <Icon className="size-8 text-green" aria-hidden />
                <h3 className="mt-5 text-h3">{title}</h3>
                <p className="mt-2 text-muted-strong">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="navy" labelledBy="offer-title">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                id="offer-title"
                dark
                eyebrow="What you get"
                title="Turnaround you can plan around"
                intro="Send the address, access details and a few photos. We'll come back with a fixed price and the earliest dates we can do."
              />
              <Link href={CTA.href} className={buttonVariants({ variant: "light", size: "lg", className: "mt-9" })}>
                {CTA.label}
              </Link>
            </div>
            <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
              {offer.map(({ icon: Icon, title, body }) => (
                <li key={title} className="border-t border-white/15 pt-7">
                  <Icon className="size-8 text-green-300" aria-hidden />
                  <h3 className="mt-5 text-h3">{title}</h3>
                  <p className="mt-2 text-white/75">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="roadmap-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionHeading
                id="roadmap-title"
                eyebrow="Coming later"
                title="Business accounts are on the way"
                intro="At launch, business work is arranged directly with us: you ask for a quote, we confirm a fixed price, and we invoice once the work is done. We're planning online business accounts so you can:"
              />
              <ul className="mt-6 space-y-3 text-ink">
                {[
                  "Manage several properties in one place",
                  "Book repeat clearances and maintenance online",
                  "See job history and before-and-after photos",
                  "Get invoices and business pricing in your account",
                ].map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-green" aria-hidden />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-strong">These features aren&apos;t available yet. We&apos;ll let our business customers know when they are.</p>
            </div>
            <div className="leaf-lg relative aspect-[4/3] overflow-hidden bg-mint">
              <Image src={images.propertyManaged.src} alt={images.propertyManaged.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </Section>

      <PricingPreview audience="business" tone="white" title="Business pricing, as a guide" intro="Every property is different. After assessment you get one fixed price in writing, before any work begins." />
      <FaqSection items={businessFaqs} title="Questions from property professionals" tone="paper" />
      <CtaBand title="Got properties that need attention?" body="Tell us about the property, the deadline and the access. We'll come back with a fixed price after assessment." ctaLabel={CTA.label} ctaHref={CTA.href} />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightOutlineIcon,
  CalendarMarkOutlineIcon,
  ChatRoundDotsOutlineIcon,
  HandHeartOutlineIcon,
  HomeSmileOutlineIcon,
  RulerOutlineIcon,
  WalletOutlineIcon,
} from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-list";
import { HowItWorks } from "@/components/sections/how-it-works";
import { PageHero } from "@/components/sections/page-hero";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { buttonVariants } from "@/components/ui/button";
import { faqs } from "@/config/faqs";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Affordable Garden Help for Homes in Belfast",
  description:
    "Affordable garden clearance and maintenance for Belfast homeowners and tenants. Flexible job sizes, no upfront payment, and discounts for eligible older and disabled residents.",
  path: "/residential",
});

const points = [
  { icon: WalletOutlineIcon, title: "Affordable, and clear about it", body: "Guide prices on our website and a fixed written quote before we start." },
  { icon: RulerOutlineIcon, title: "Any size of job", body: "One overgrown corner or the whole garden. Small jobs are welcome." },
  { icon: HomeSmileOutlineIcon, title: "Nothing to pay up front", body: "No deposits and no online payments. You pay when the work is done." },
  { icon: ChatRoundDotsOutlineIcon, title: "A simple way to ask", body: "Fill in a short form, call us, or ask a family member to do it for you." },
  { icon: CalendarMarkOutlineIcon, title: "At a time that suits you", body: "One-off visits or regular maintenance, arranged around your week." },
  { icon: HandHeartOutlineIcon, title: "Friendly and respectful", body: "We take our time, explain what we're doing and treat your home with care." },
];

const residentialFaqs = faqs.filter((f) => ["cost", "upfront", "discounts", "visit", "help-asking", "need-to-be-home", "maintenance"].includes(f.id));

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="For homes"
        title="Garden help that's affordable, friendly and easy to arrange"
        intro="For homeowners, tenants, and anyone who finds the heavy garden work too much. Tell us what's needed, get a free written quote, and pay nothing until the job's done."
        image={images.homeGardenDusk}
        cta={{ label: "Get a free quote", href: "/get-a-quote?customer=residential" }}
        secondary={{ label: "About our discount", href: "#discounts" }}
      />

      <Section tone="white" labelledBy="res-points-title">
        <Container>
          <SectionHeading id="res-points-title" eyebrow="What to expect" title="No pressure, no surprises, no heavy lifting" />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-line pt-7">
                <Icon className="size-8 text-green" aria-hidden />
                <h3 className="mt-5 text-h3">{title}</h3>
                <p className="mt-2 text-muted-strong">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="discounts" tone="mint" labelledBy="discount-title" className="scroll-mt-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="leaf-lg relative aspect-[4/5] max-h-[36rem] overflow-hidden bg-white sm:aspect-[4/3] lg:aspect-[4/5]">
              <Image src={images.wateringCare.src} alt={images.wateringCare.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div>
              <SectionHeading
                id="discount-title"
                eyebrow="Older and disabled residents"
                title="A discount, and all the time you need"
                intro={
                  <>
                    <p>
                      If you&apos;re an older or disabled resident, you can get a discount on our garden services.
                      {site.concessionDiscount
                        ? ` Eligible customers receive ${site.concessionDiscount}.`
                        : " We'll confirm the discount in writing in your quote."}
                    </p>
                    <p className="mt-4">
                      We&apos;re happy to talk things through on the phone, arrange a visit instead of asking for photos, or deal
                      with a family member or carer on your behalf.
                    </p>
                  </>
                }
              />
              <Link href="/get-a-quote?customer=residential" className={buttonVariants({ size: "lg", className: "mt-9" })}>
                Ask for a quote with a discount
                <ArrowRightOutlineIcon className="size-5" aria-hidden />
              </Link>
              <p className="mt-4 text-sm text-muted-strong">Mention it in the description box and we&apos;ll do the rest.</p>
            </div>
          </div>
        </Container>
      </Section>

      <HowItWorks tone="paper" />
      <PricingPreview audience="residential" tone="white" title="What garden help usually costs" />
      <FaqSection items={residentialFaqs} title="Questions from homeowners" tone="paper" />
      <CtaBand />
    </>
  );
}

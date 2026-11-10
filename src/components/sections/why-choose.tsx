import {
  CalendarMarkOutlineIcon,
  DocumentTextOutlineIcon,
  HandHeartOutlineIcon,
  LeafOutlineIcon,
  ShieldCheckOutlineIcon,
  TagPriceOutlineIcon,
} from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";

const reasons = [
  {
    icon: TagPriceOutlineIcon,
    title: "Affordable, transparent pricing",
    body: "Guide prices published on this site, and a fixed written price before we start. No surprises on the day.",
  },
  {
    icon: DocumentTextOutlineIcon,
    title: "Free written quotes",
    body: "Send photos or ask for a visit. Your quote is free, in writing and comes with no obligation.",
  },
  {
    icon: LeafOutlineIcon,
    title: "Responsible waste disposal",
    body: "We take every bit of green waste away and send it for composting and recycling wherever possible. Never fly-tipped.",
  },
  {
    icon: CalendarMarkOutlineIcon,
    title: "Flexible appointments",
    body: "One-off jobs, small tidy-ups or regular visits, at times that work around you.",
  },
  {
    icon: HandHeartOutlineIcon,
    title: "Discounts for older and disabled residents",
    body: "Eligible customers get a discount, confirmed in writing in their quote.",
  },
  {
    icon: ShieldCheckOutlineIcon,
    title: "Reliable, straightforward service",
    body: "We turn up when we say we will, do what we quoted for and leave the garden tidy.",
  },
];

export function WhyChoose() {
  return (
    <Section tone="navy" labelledBy="why-title">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              id="why-title"
              dark
              eyebrow="Why Homebuzz"
              title={
                <>
                  <span className="block">Nothing to pay</span>
                  <span className="block text-green-300">until the work is done.</span>
                </>
              }
              intro="No deposits, no online payments, no pressure. You get a written quote, you decide, and you only pay once you're happy with the garden."
            />
          </div>
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-white/15 pt-7">
                <Icon className="size-8 text-green-300" aria-hidden />
                <h3 className="mt-5 text-h3">{title}</h3>
                <p className="mt-2.5 text-white/75">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

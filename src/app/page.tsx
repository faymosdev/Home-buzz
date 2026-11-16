import { BeforeAfter } from "@/components/sections/before-after";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-list";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Testimonials } from "@/components/sections/testimonials";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { WhoWeHelp } from "@/components/sections/who-we-help";
import { WhyChoose } from "@/components/sections/why-choose";
import { homeFaqs } from "@/config/faqs";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Garden Clearance Belfast | Homebuzz Gardening Services",
  description:
    "Affordable garden clearance and green waste removal in Belfast and across Northern Ireland. Free written quotes, no upfront payment, and discounts for eligible older and disabled residents.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <BeforeAfter />
      <WhyChoose />
      <WhoWeHelp />
      <HowItWorks />
      <Testimonials />
      <FaqSection items={homeFaqs} />
      <CtaBand />
    </>
  );
}

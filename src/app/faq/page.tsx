import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqBrowser } from "@/components/sections/faq-browser";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Garden Clearance FAQs",
  description:
    "Answers about garden clearance in Belfast: prices, free quotes, paying after the job, photo uploads, garden waste, landlord services and discounts for older and disabled residents.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="bg-paper">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-5 text-green">FAQ</p>
            <h1 id="page-title" className="text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] leading-[1.03] tracking-[-0.03em]">
              Questions and answers
            </h1>
            <p className="mt-5 text-lead text-muted-strong">
              Straight answers about prices, quotes, waste and how we work. Can&apos;t find what you need? Just ask.
            </p>
          </div>
          <div className="mt-12 max-w-4xl">
            <FaqBrowser />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

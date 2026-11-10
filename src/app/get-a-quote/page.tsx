import { Suspense } from "react";
import { CheckCircleBoldIcon } from "@solar-icons/react";
import { QuoteForm } from "@/components/forms/quote-form/quote-form";
import { Container } from "@/components/layout/container";
import { ContactFallback } from "@/components/forms/contact-fallback";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get a Free Garden Clearance Quote in Belfast",
  description:
    "Request a free written quote for garden clearance, green waste removal or maintenance in Belfast. Upload photos of your garden. No upfront payment, no obligation.",
  path: "/get-a-quote",
});

const promises = ["Free and written down", "No obligation to go ahead", "Nothing to pay up front", "No online payments, ever"];

export default function GetAQuotePage() {
  return (
    <section aria-labelledby="page-title" className="bg-paper">
      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <p className="eyebrow mb-5 text-green">Free quote</p>
          <h1 id="page-title" className="text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            Tell us about your garden
          </h1>
          <p className="mt-5 text-lead text-muted-strong">
            Four short steps. We&apos;ll review your details and send you a free written quote. This doesn&apos;t book anything.
          </p>
          <ul className="mt-8 space-y-3">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-2.5 font-semibold text-navy">
                <CheckCircleBoldIcon className="size-5 text-green" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
          <PreferToTalk className="mt-10 hidden lg:block" />
        </div>
        <div>
          <Suspense fallback={<div className="min-h-[40rem] rounded-[2rem] border border-line bg-white" aria-hidden />}>
            <QuoteForm />
          </Suspense>
          {/* On phones the form comes first; the direct-contact option follows it. */}
          <PreferToTalk className="mt-6 lg:hidden" />
        </div>
      </Container>
    </section>
  );
}

function PreferToTalk({ className }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-white p-6 ${className ?? ""}`}>
      <p className="font-semibold text-navy">Prefer to talk?</p>
      <p className="mt-1 text-sm text-muted-strong">Get in touch directly and we&apos;ll take the details for you.</p>
      <ContactFallback />
    </div>
  );
}

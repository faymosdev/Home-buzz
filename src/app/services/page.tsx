import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlineIcon, CheckCircleBoldIcon } from "@solar-icons/react";
import { Container } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { ServiceIcon } from "@/components/sections/service-icon";
import { buttonVariants } from "@/components/ui/button";
import { images } from "@/config/images";
import { availableServices, services } from "@/config/services";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Garden Clearance, Hedge and Green Waste Services in Belfast",
  description:
    "Garden clearance, overgrown garden clearance, hedge and scrub clearance, green waste removal and regular garden maintenance in Belfast, for homes, landlords and property managers.",
  path: "/services",
});

const comingSoon = services.filter((s) => s.status === "coming-soon");

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Garden services in Belfast, quoted in writing first"
        intro="From a small tidy-up to an overgrown garden that hasn't been touched in years, we clear it, take the waste away and leave the space ready to use."
        image={images.hedgeTrimming}
        cta={{ label: "Get a free quote", href: "/get-a-quote" }}
      >
        <nav aria-label="Jump to a service" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {availableServices.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="inline-flex rounded-full border border-navy/15 bg-white px-3.5 py-2 text-sm font-semibold text-navy transition-colors hover:border-green hover:text-green">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section aria-label="Service details" className="bg-white py-10 sm:py-16">
        <Container>
          <div className="divide-y divide-line">
            {availableServices.map((s, i) => (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="grid scroll-mt-32 gap-10 py-16 first:pt-6 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className={cn("relative aspect-[4/3] overflow-hidden bg-mint", i % 2 ? "lg:order-2 leaf" : "leaf")}>
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="grid size-12 place-items-center rounded-full bg-mint text-green">
                    <ServiceIcon icon={s.icon} className="size-6" />
                  </span>
                  <h2 id={`${s.id}-title`} className="mt-5 text-[clamp(1.75rem,1.4rem+1.3vw,2.5rem)] leading-tight tracking-tight">
                    {s.name}
                  </h2>
                  <p className="mt-4 text-lead text-muted-strong">{s.description}</p>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="eyebrow font-sans text-green">Suitable for</h3>
                      <ul className="mt-3 space-y-2">
                        {s.suitableFor.map((x) => (
                          <li key={x} className="text-[0.9375rem] text-ink">
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="eyebrow font-sans text-green">What you get</h3>
                      <ul className="mt-3 space-y-2">
                        {s.benefits.map((x) => (
                          <li key={x} className="flex items-start gap-2 text-[0.9375rem] text-ink">
                            <CheckCircleBoldIcon className="mt-0.5 size-4.5 shrink-0 text-green" aria-hidden />
                            {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link href={`/get-a-quote?service=${s.id}`} className={buttonVariants({ className: "mt-9" })}>
                    Get a quote<span className="sr-only"> for {s.name.toLowerCase()}</span>
                    <ArrowRightOutlineIcon className="size-5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {comingSoon.map((s) => (
            <aside key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="mt-6 mb-10 flex flex-col gap-5 rounded-[1.75rem] border-2 border-dashed border-navy/20 p-7 sm:flex-row sm:items-center">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-paper text-navy/60">
                <ServiceIcon icon={s.icon} className="size-6" />
              </span>
              <div>
                <p className="eyebrow text-muted-strong">Coming soon · Not available yet</p>
                <h2 id={`${s.id}-title`} className="mt-1 text-h3">
                  {s.name}
                </h2>
                <p className="mt-1.5 text-muted-strong">{s.description}</p>
              </div>
            </aside>
          ))}
        </Container>
      </section>

      <PricingPreview tone="mint" />
      <CtaBand />
    </>
  );
}

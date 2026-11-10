import Link from "next/link";
import { ArrowRightOutlineIcon, InfoCircleOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { primaryCta } from "@/config/navigation";
import { pricing, pricingNotes, type PriceItem } from "@/config/pricing";
import { cn, formatPrice } from "@/lib/utils";

type Props = {
  audience?: PriceItem["audience"] | "all";
  tone?: "paper" | "white" | "mint";
  title?: string;
  intro?: string;
  id?: string;
};

export function PricingPreview({
  audience = "all",
  tone = "paper",
  title = "Guide prices, in plain sight",
  intro = "Every garden is different, so these are a starting point, not a quote. Your written quote is free and fixed before any work begins.",
  id = "pricing",
}: Props) {
  const items = pricing.filter((p) => audience === "all" || p.audience === audience || p.audience === "both");

  return (
    <Section tone={tone} labelledBy={`${id}-title`} id={id}>
      <Container>
        <SectionHeading id={`${id}-title`} eyebrow="Indicative pricing" title={title} intro={intro} />

        <ul className={cn("mt-14 grid gap-5 sm:grid-cols-2", items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
          {items.map((item) => (
            <li key={item.id} className="flex flex-col rounded-[1.75rem] border border-line bg-white p-7">
              <h3 className="font-sans text-base font-bold text-navy">{item.name}</h3>
              <p className="mt-5 font-display text-[2.25rem] leading-none font-semibold tracking-tight text-navy tabular">
                {formatPrice(item)}
              </p>
              {item.unit && <p className="mt-2 text-sm font-semibold text-green">{item.unit}</p>}
              <p className="mt-4 flex-1 text-[0.9375rem] text-muted-strong">{item.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-8 rounded-[1.75rem] border border-line bg-white p-7 lg:flex-row lg:items-center lg:justify-between">
          <ul className="space-y-2 text-[0.9375rem] text-muted-strong">
            {pricingNotes.map((n) => (
              <li key={n} className="flex items-start gap-2.5">
                <InfoCircleOutlineIcon className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
                {n}
              </li>
            ))}
          </ul>
          <Link href={primaryCta.href} className={buttonVariants({ size: "lg", className: "shrink-0 self-start lg:self-auto" })}>
            Request a free quote
            <ArrowRightOutlineIcon className="size-5" aria-hidden />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

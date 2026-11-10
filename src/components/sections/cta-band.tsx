import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlineIcon } from "@solar-icons/react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { images } from "@/config/images";

type Props = {
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function CtaBand({
  title = "Ready to give your garden a fresh start?",
  body = "Tell us about your garden and send a few photos. We'll come back with a free written quote. No obligation, and nothing to pay up front.",
  ctaLabel = "Request your free quote",
  ctaHref = "/get-a-quote",
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="bg-paper py-20 sm:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-[2.5rem] bg-mint lg:grid-cols-[1.3fr_1fr]">
          <div className="p-8 sm:p-12 lg:p-16">
            <h2 id="cta-title" className="text-h2">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-lead text-muted-strong">{body}</p>
            <Link href={ctaHref} className={buttonVariants({ size: "lg", className: "mt-9" })}>
              {ctaLabel}
              <ArrowRightOutlineIcon className="size-5" aria-hidden />
            </Link>
          </div>
          <div className="relative min-h-64 lg:min-h-full">
            <Image src={images.hero.src} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover lg:rounded-tl-[5rem]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

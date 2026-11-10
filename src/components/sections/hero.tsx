import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlineIcon, CheckCircleBoldIcon } from "@solar-icons/react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { images } from "@/config/images";
import { primaryCta } from "@/config/navigation";

const trust = ["Free written quotes", "No upfront payment", "Small jobs welcome"];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-paper">
      <Container className="grid items-center gap-12 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-28">
        <div className="relative z-10">
          <p className="eyebrow mb-6 inline-flex rounded-full bg-mint px-4 py-2 text-green">
            Garden clearance in Belfast
          </p>
          <h1 id="hero-title" className="text-display">
            Your garden, cleared.
            <span className="block text-green">Your space, renewed.</span>
          </h1>
          <p className="mt-7 max-w-[34rem] text-lead text-muted-strong">
            Affordable garden clearance and green waste removal across Belfast. Send us a few photos, get a free written
            quote, and pay nothing until the work is done.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
              {primaryCta.label}
              <ArrowRightOutlineIcon className="size-5" aria-hidden />
            </Link>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Explore our services
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3" aria-label="Why customers choose Homebuzz">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[0.9375rem] font-semibold text-navy">
                <CheckCircleBoldIcon className="size-5 text-green" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="leaf-lg relative aspect-[4/5] overflow-hidden bg-mint sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={images.gardenPath.src}
              alt={images.gardenPath.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-6 left-4 max-w-[17rem] rounded-3xl border border-line bg-white p-5 sm:left-8 lg:-left-10">
            <p className="font-display text-lg leading-snug font-semibold text-navy">Waste taken away, every time.</p>
            <p className="mt-1.5 text-sm text-muted-strong">
              Green waste goes to authorised sites for composting and recycling wherever possible.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

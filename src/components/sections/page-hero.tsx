import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlineIcon } from "@solar-icons/react";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import type { SiteImage } from "@/config/images";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  image?: SiteImage;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string };
  children?: React.ReactNode;
};

export function PageHero({ eyebrow, title, intro, image, cta, secondary, children }: Props) {
  return (
    <section aria-labelledby="page-title" className="bg-paper">
      <Container className={image ? "grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16" : "py-16 sm:py-24"}>
        <div className="max-w-3xl">
          <p className="eyebrow mb-5 text-green">{eyebrow}</p>
          <h1 id="page-title" className="text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] leading-[1.03] tracking-[-0.03em]">
            {title}
          </h1>
          <div className="mt-6 max-w-[38rem] text-lead text-muted-strong">{intro}</div>
          {(cta || secondary) && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {cta && (
                <Link href={cta.href} className={buttonVariants({ size: "lg" })}>
                  {cta.label}
                  <ArrowRightOutlineIcon className="size-5" aria-hidden />
                </Link>
              )}
              {secondary && (
                <Link href={secondary.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  {secondary.label}
                </Link>
              )}
            </div>
          )}
          {children}
        </div>
        {image && (
          <div className="leaf-lg relative aspect-[4/3] overflow-hidden bg-mint">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        )}
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { featuredServices } from "@/config/services";
import { ServiceIcon } from "./service-icon";

/**
 * Homepage services: one lead service shown large with its photo, the rest
 * as an editorial list — deliberately not a 6-up icon grid.
 */
export function WhatWeDo() {
  const [lead, ...rest] = featuredServices;
  return (
    <Section tone="white" labelledBy="what-we-do-title">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="what-we-do-title"
            eyebrow="What we do"
            title="Garden help for every size of job"
            intro="Homebuzz clears, tidies and maintains gardens across Belfast. Whether it's one afternoon or a full reset, the waste leaves with us."
          />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-green underline-offset-4 hover:underline"
          >
            All services
            <ArrowRightOutlineIcon className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          <Link
            href={`/services#${lead.id}`}
            className="group relative flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-navy-950 p-7 sm:p-10"
          >
            <Image
              src={lead.image.src}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 via-45% to-transparent to-75%" aria-hidden />
            <div className="relative">
              <span className="grid size-12 place-items-center rounded-full bg-white/12 text-white">
                <ServiceIcon icon={lead.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-[clamp(1.75rem,1.3rem+1.5vw,2.5rem)] text-white">{lead.name}</h3>
              <p className="mt-3 max-w-md text-white/80">{lead.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-green-300">
                Find out more <ArrowRightOutlineIcon className="size-5" aria-hidden />
              </span>
            </div>
          </Link>

          <ul className="flex flex-col">
            {rest.map((s) => (
              <li key={s.id} className="border-b border-line first:border-t">
                <Link href={`/services#${s.id}`} className="group flex items-start gap-5 py-6 transition-colors">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mint text-green transition-colors group-hover:bg-green group-hover:text-white">
                    <ServiceIcon icon={s.icon} className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-h3 font-semibold text-navy group-hover:text-green">{s.name}</span>
                    <span className="mt-1 block text-muted-strong">{s.summary}</span>
                  </span>
                  <ArrowRightOutlineIcon
                    className="mt-3 size-5 shrink-0 text-navy/40 transition-[transform,color] group-hover:translate-x-1 group-hover:text-green"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

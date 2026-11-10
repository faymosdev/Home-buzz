"use client";

import * as React from "react";
import Image from "next/image";
import { InfoCircleOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { images, type SiteImage } from "@/config/images";
import { cn } from "@/lib/utils";

type Pair = { id: string; label: string; before: SiteImage; after: SiteImage };

/**
 * ILLUSTRATIVE ONLY. These pairs are stock photos of different gardens, used
 * to show the kind of change a clearance makes. Replace with genuine Homebuzz
 * before-and-after photos (same garden, with the customer's permission).
 */
const pairs: Pair[] = [
  { id: "beds", label: "Crowded beds to clear patio", before: images.overgrownBedBefore, after: images.patioAfter },
  { id: "overgrown", label: "Overgrown to open lawn", before: images.wildBefore, after: images.houseLawn },
];

export function BeforeAfter() {
  const [active, setActive] = React.useState(pairs[0].id);
  const pair = pairs.find((p) => p.id === active) ?? pairs[0];

  return (
    <Section tone="paper" labelledBy="transformations-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="transformations-title"
              eyebrow="Before and after"
              title="See what a clearance can do"
              intro="Drag the handle to compare. Long grass, crowded beds and piles of cuttings become usable space again, and every bit of waste leaves with us."
            />
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose an example">
              {pairs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={p.id === active}
                  onClick={() => setActive(p.id)}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors active:scale-[0.97]",
                    p.id === active ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-navy",
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-8 flex items-start gap-2.5 rounded-2xl bg-mint p-4 text-sm text-muted-strong">
              <InfoCircleOutlineIcon className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
              <span>
                <strong className="font-semibold text-navy">Illustrative photos.</strong> These are stock images of
                different gardens, not Homebuzz projects. We&apos;ll share real before-and-after photos from our own jobs,
                with customers&apos; permission, after we launch.
              </span>
            </p>
          </div>

          <CompareSlider key={pair.id} before={pair.before} after={pair.after} />
        </div>
      </Container>
    </Section>
  );
}

function CompareSlider({ before, after }: { before: SiteImage; after: SiteImage }) {
  const [pos, setPos] = React.useState(50);
  const id = React.useId();

  return (
    <div className="leaf-lg relative aspect-[4/3] overflow-hidden bg-mint select-none">
      <Image src={after.src} alt={`After: ${after.alt}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={`Before: ${before.alt}`} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
      </div>

      <span className="eyebrow absolute top-5 left-5 rounded-full bg-navy-950/80 px-3 py-1.5 text-white">Before</span>
      <span className="eyebrow absolute top-5 right-5 rounded-full bg-white/90 px-3 py-1.5 text-navy">After</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white" style={{ left: `${pos}%` }} aria-hidden>
        <span className="absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-green text-white">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      {/* A native range input gives keyboard, touch and screen-reader support for free. */}
      <label htmlFor={id} className="sr-only">
        Compare before and after. Move left to show more of the after photo.
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-valuetext={`${pos}% before photo showing`}
        className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-green ring-offset-2 peer-focus-visible:ring-4" aria-hidden />
    </div>
  );
}

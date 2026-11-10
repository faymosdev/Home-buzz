import { DangerTriangleOutlineIcon } from "@solar-icons/react";
import { Container } from "@/components/layout/container";
import { Placeholder } from "@/components/ui/placeholder";

export type LegalSection = { heading: string; body: React.ReactNode };

/**
 * Layout for legal pages. Content is a DRAFT placeholder: it has not been
 * reviewed by a solicitor and must be checked before launch.
 */
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <section aria-labelledby="page-title" className="bg-paper">
      <Container className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-5 text-green">Legal</p>
          <h1 id="page-title" className="text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 text-lead text-muted-strong">{intro}</p>

          <div role="note" className="mt-8 flex items-start gap-3 rounded-2xl border-2 border-dashed border-error/40 bg-error-bg p-5 text-ink">
            <DangerTriangleOutlineIcon className="mt-0.5 size-5 shrink-0 text-error" aria-hidden />
            <p>
              <strong className="font-bold">Draft placeholder.</strong> This page has not been reviewed by a legal professional and
              doesn&apos;t yet represent a final policy. It must be completed and checked before Homebuzz launches.
            </p>
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`legal-${i}`}>
                <h2 id={`legal-${i}`} className="text-h3">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-3 space-y-3 text-muted-strong [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">{s.body}</div>
              </section>
            ))}
          </div>

          <p className="mt-14 text-sm text-muted">
            Last updated: <Placeholder>date to be added when finalised</Placeholder>
          </p>
        </div>
      </Container>
    </section>
  );
}

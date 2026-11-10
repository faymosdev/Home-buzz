import { ChatRoundDotsOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { testimonials } from "@/config/testimonials";

/**
 * Shows genuine reviews from src/config/testimonials.ts. Until there are any,
 * it shows a clearly labelled "reviews coming soon" state — never invented reviews.
 */
export function Testimonials({ tone = "white" }: { tone?: "white" | "paper" }) {
  return (
    <Section tone={tone} labelledBy="reviews-title">
      <Container>
        {testimonials.length > 0 ? (
          <>
            <SectionHeading id="reviews-title" eyebrow="Reviews" title="What our customers say" />
            <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <li key={`${t.name}-${t.quote.slice(0, 20)}`}>
                  <figure className="flex h-full flex-col rounded-[1.75rem] border border-line bg-paper p-8">
                    <blockquote className="flex-1 font-display text-xl leading-snug text-navy">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 text-sm">
                      <span className="block font-bold text-navy">{t.name}</span>
                      <span className="text-muted">
                        {t.context} · {t.source}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <SectionHeading
              id="reviews-title"
              eyebrow="Reviews"
              title="Real reviews, from real customers"
              intro="We launch in March 2027, so we don't have customer reviews yet, and we won't make any up. Once we've cleared our first gardens, genuine reviews will appear here."
            />
            <ul className="grid gap-4 sm:grid-cols-2" aria-label="Review placeholders">
              {[0, 1].map((i) => (
                <li
                  key={i}
                  className="flex min-h-48 flex-col justify-between rounded-[1.75rem] border-2 border-dashed border-navy/20 p-7 text-muted-strong"
                >
                  <ChatRoundDotsOutlineIcon className="size-8 text-navy/35" aria-hidden />
                  <p>
                    <span className="eyebrow block text-navy/60">Placeholder</span>
                    <span className="mt-2 block">A genuine customer review will go here after launch.</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </Section>
  );
}

import { Container, Section, SectionHeading } from "@/components/layout/container";
import { testimonials } from "@/config/testimonials";

/**
 * Shows genuine reviews from src/config/testimonials.ts. While that list is
 * empty the section isn't shown at all — never invented or placeholder reviews.
 */
export function Testimonials({ tone = "white" }: { tone?: "white" | "paper" }) {
  if (testimonials.length === 0) return null;

  return (
    <Section tone={tone} labelledBy="reviews-title">
      <Container>
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
      </Container>
    </Section>
  );
}

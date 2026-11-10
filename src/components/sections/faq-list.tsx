import Link from "next/link";
import { ArrowRightOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Faq } from "@/config/faqs";

export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <Accordion type="multiple" className="border-t border-line">
      {items.map((f) => (
        <AccordionItem key={f.id} value={f.id}>
          <AccordionTrigger>{f.question}</AccordionTrigger>
          <AccordionContent>{f.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export function FaqSection({
  items,
  title = "Questions people ask us",
  tone = "paper",
  showAllLink = true,
}: {
  items: Faq[];
  title?: string;
  tone?: "paper" | "white" | "mint";
  showAllLink?: boolean;
}) {
  return (
    <Section tone={tone} labelledBy="faq-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading id="faq-title" eyebrow="FAQ" title={title} />
            {showAllLink && (
              <Link href="/faq" className="group mt-8 inline-flex items-center gap-2 font-semibold text-green underline-offset-4 hover:underline">
                See all questions
                <ArrowRightOutlineIcon className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            )}
          </div>
          <FaqAccordion items={items} />
        </div>
      </Container>
    </Section>
  );
}

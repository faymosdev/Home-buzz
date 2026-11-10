import Link from "next/link";
import { ArrowRightOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { primaryCta } from "@/config/navigation";
import { cn } from "@/lib/utils";

export const steps = [
  {
    title: "Tell us about your garden",
    body: "Fill in a short form or get in touch. Tell us roughly how big it is and what needs doing.",
  },
  {
    title: "Send photos or arrange a visit",
    body: "A few phone photos are usually enough. If not, we'll come and have a look.",
  },
  {
    title: "Get your free written quote",
    body: "A clear, fixed price in writing. No obligation, and nothing to pay up front.",
  },
  {
    title: "We clear it and take the waste",
    body: "We do the work, leave the garden tidy and dispose of the waste responsibly. You pay once you're happy.",
  },
];

export function HowItWorks({ tone = "mint", showCta = true }: { tone?: "mint" | "paper" | "white"; showCta?: boolean }) {
  return (
    <Section tone={tone} labelledBy="how-title">
      <Container>
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="Four simple steps, and you don't lift a thing"
          className="max-w-2xl"
        />
        <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "grid size-16 shrink-0 place-items-center rounded-full font-display text-2xl font-semibold tabular",
                    i === steps.length - 1 ? "bg-green text-white" : "border-2 border-navy text-navy",
                  )}
                  aria-hidden
                >
                  {i + 1}
                </span>
                {i < steps.length - 1 && <span className="hidden h-0.5 flex-1 rounded bg-navy/15 lg:block" aria-hidden />}
              </div>
              <h3 className="mt-6 text-h3">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2.5 text-muted-strong">{step.body}</p>
            </li>
          ))}
        </ol>
        {showCta && (
          <div className="mt-14">
            <Link href={primaryCta.href} className={buttonVariants({ size: "lg" })}>
              Start with step one
              <ArrowRightOutlineIcon className="size-5" aria-hidden />
            </Link>
          </div>
        )}
      </Container>
    </Section>
  );
}

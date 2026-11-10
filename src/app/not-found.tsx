import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="bg-paper">
      <Container className="py-24 sm:py-32">
        <p className="eyebrow text-green">Page not found</p>
        <h1 id="nf-title" className="mt-4 max-w-2xl text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] leading-[1.05] tracking-[-0.03em]">
          This path is a bit overgrown
        </h1>
        <p className="mt-5 max-w-xl text-lead text-muted-strong">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Try the homepage, or go straight to a free quote.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/get-a-quote" className={buttonVariants({ size: "lg" })}>
            Get a free quote
          </Link>
          <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Go to the homepage
          </Link>
        </div>
      </Container>
    </section>
  );
}

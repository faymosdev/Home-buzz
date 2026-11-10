import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlineIcon } from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { audiences } from "@/config/audiences";

export function WhoWeHelp() {
  return (
    <Section tone="white" labelledBy="who-title">
      <Container>
        <SectionHeading
          id="who-title"
          eyebrow="Who we help"
          title="For homes, for landlords, for anyone who needs a hand"
          intro="Whether it's your own garden, a parent's, or twenty rental properties, you'll get the same clear quote and the same careful work."
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((a, i) => (
            <li key={a.id}>
              <Link href={a.href} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper transition-colors hover:border-green">
                <div className={`relative aspect-[4/3] overflow-hidden ${i % 2 ? "rounded-br-[3rem]" : "rounded-bl-[3rem]"}`}>
                  <Image
                    src={a.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-h3">{a.title}</h3>
                  <p className="mt-2.5 flex-1 text-muted-strong">{a.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-semibold text-green">
                    {a.linkLabel}
                    <ArrowRightOutlineIcon className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

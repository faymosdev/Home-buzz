import Image from "next/image";
import Link from "next/link";
import {
  BuildingsOutlineIcon,
  HandHeartOutlineIcon,
  HomeSmileOutlineIcon,
  LeafOutlineIcon,
  UsersGroupRoundedOutlineIcon,
  WindOutlineIcon,
} from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { images } from "@/config/images";
import { primaryCta } from "@/config/navigation";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Homebuzz Gardening Services, Belfast",
  description:
    "Homebuzz is a Belfast garden clearance business serving all of Northern Ireland, founded by Fortune, built around fair prices, responsible waste handling and helping older and disabled residents.",
  path: "/about",
});

const values = [
  { title: "Fair", body: "A clear written quote, and nothing to pay until the work is done." },
  { title: "Reliable", body: "We turn up when we say we will and do what we quoted for." },
  { title: "Respectful", body: "Your home, your garden, your pace. We explain and we listen." },
  { title: "Responsible", body: "Waste is handled properly. No shortcuts, and no fly-tipping." },
];

/**
 * Community and sustainability, grouped under the UN Sustainable Development Goals the
 * client chose (8 and 11). Commitments only: no invented figures, awards or certifications.
 */
const sdgCommitments = [
  {
    goal: 8,
    name: "Decent work and economic growth",
    items: [
      { icon: UsersGroupRoundedOutlineIcon, title: "Local employment", body: "As Homebuzz grows, we aim to create local jobs and work with local contractors." },
      { icon: BuildingsOutlineIcon, title: "Supporting local property businesses", body: "We help landlords, letting agents and housing providers keep their properties presentable and ready to let." },
    ],
  },
  {
    goal: 11,
    name: "Sustainable cities and communities",
    items: [
      { icon: HandHeartOutlineIcon, title: "Helping older and disabled residents", body: "Discounted, patient help for people who can't manage heavy garden work themselves." },
      { icon: HomeSmileOutlineIcon, title: "Cleaner, safer neighbourhoods", body: "Overgrown gardens can hide hazards and attract fly-tipping. Clearing them helps the whole street." },
      { icon: LeafOutlineIcon, title: "Responsible waste management", body: "Green waste goes to authorised sites for composting and recycling wherever possible. We never fly-tip." },
      { icon: WindOutlineIcon, title: "Reducing our emissions", body: "We're committed to reducing the emissions from our work as we grow, and we'll share the specific steps we take here." },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Homebuzz"
        title="Making garden upkeep easier for everyone in Belfast"
        intro="Homebuzz Gardening Services is a new Belfast business offering affordable garden clearance, green waste removal and maintenance across Northern Ireland."
        image={images.gardenerAtWork}
      />

      <Section tone="white" labelledBy="mission-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <SectionHeading id="mission-title" eyebrow="Our mission" title="A dependable, affordable service that anyone can use" />
            <div className="space-y-5 text-lead text-muted-strong">
              <p>
                Lots of people in Belfast have a garden that&apos;s got away from them: busy families, tenants, landlords between
                lets, and older or disabled residents who can no longer do the heavy work themselves.
              </p>
              <p>
                Homebuzz exists to make that easy to fix, with a clear written quote, nothing to pay up front, and
                waste that&apos;s taken away and dealt with properly.
              </p>
            </div>
          </div>

          <ul className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <li key={v.title} className="rounded-[1.75rem] bg-mint p-7">
                <h3 className="text-[clamp(1.75rem,1.4rem+0.9vw,2.25rem)] leading-tight tracking-tight text-green">{v.title}</h3>
                <p className="mt-3 text-muted-strong">{v.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="founder-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <div className="leaf-lg relative aspect-[4/5] overflow-hidden bg-mint lg:sticky lg:top-36">
              <Image
                src={images.founder.src}
                alt={images.founder.alt}
                fill
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionHeading id="founder-title" eyebrow="Meet the founder" title="Why I started Homebuzz" />
              <div className="mt-6 space-y-5 text-lead text-muted-strong">
                <p>
                  Hi, I&apos;m {site.founder}, a Belfast-based Queen&apos;s University student with a background in biomedical
                  science, environmental science and microbiology, and the founder of {site.name}.
                </p>
                <p>
                  I started this business after speaking with older people across Belfast who find it hard to keep up their
                  gardens. Conditions such as arthritis and other musculoskeletal problems can make everyday gardening tasks
                  physically demanding, painful or even impossible, and it&apos;s harder still for people living alone without
                  regular support.
                </p>
                <p>
                  According to Arthritis UK Northern Ireland (2026), more than 550,000 people in Northern Ireland, about 37% of
                  the adult population, are living with arthritis or another musculoskeletal condition. The report also
                  highlights the wider impact of these conditions:
                </p>
                <ul className="space-y-2 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-3 size-2 shrink-0 rounded-full bg-green" aria-hidden />
                    67% report that arthritis has affected their ability to work.
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-3 size-2 shrink-0 rounded-full bg-green" aria-hidden />
                    76% say that waiting for treatment has negatively affected their mental health.
                  </li>
                </ul>
                <p>When a garden gets out of hand, it becomes one more worry.</p>
                <p>
                  I also believe in greener, better-kept neighbourhoods. Tidy outdoor spaces make streets safer and more
                  pleasant, and time outside is good for wellbeing. So I clear the garden, take everything away, and send green
                  waste for composting or recycling wherever possible.
                </p>
                <p>
                  You get a free written quote first, you never pay up front, and I offer reduced rates for older and disabled
                  residents. Every job is personal. I listen to what matters most to you, agree the work and price in writing,
                  and don&apos;t leave until it&apos;s done to a high standard.
                </p>
                <p>
                  <Link href={primaryCta.href} className="font-semibold text-navy underline underline-offset-4">
                    Send me a few photos of your garden
                  </Link>{" "}
                  and I&apos;ll get back to you with a free written quote.
                </p>
                <p className="font-display text-2xl font-semibold text-navy">{site.founder}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="impact-title">
        <Container>
          <SectionHeading
            id="impact-title"
            eyebrow="Community and sustainability"
            title="Good for gardens, good for neighbourhoods"
            intro="As a local business, we've chosen to support two of the UN Sustainable Development Goals through the way we work."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {sdgCommitments.map(({ goal, name, items }) => (
              <section key={goal} aria-labelledby={`sdg-${goal}-title`} className="rounded-[1.75rem] border border-line bg-paper p-7 sm:p-9">
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-navy font-display text-2xl font-semibold text-white tabular" aria-hidden>
                    {goal}
                  </span>
                  <div>
                    <p className="eyebrow text-green">UN Sustainable Development Goal {goal}</p>
                    <h3 id={`sdg-${goal}-title`} className="mt-1 text-h3">
                      <span className="sr-only">Goal {goal}: </span>
                      {name}
                    </h3>
                  </div>
                </div>
                <ul className="mt-8 space-y-7">
                  {items.map(({ icon: Icon, title, body }) => (
                    <li key={title} className="flex gap-4 border-t border-line pt-6">
                      <Icon className="size-8 shrink-0 text-green" aria-hidden />
                      <div>
                        <h4 className="font-sans text-lg font-bold text-navy">{title}</h4>
                        <p className="mt-1.5 text-muted-strong">{body}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-muted">
            These are commitments from a new local business, not certifications or awards. Homebuzz isn&apos;t affiliated with
            or endorsed by the United Nations.
          </p>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

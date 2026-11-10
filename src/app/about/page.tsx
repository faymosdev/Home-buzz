import {
  HandHeartOutlineIcon,
  HomeSmileOutlineIcon,
  LeafOutlineIcon,
  ShieldCheckOutlineIcon,
  UsersGroupRoundedOutlineIcon,
} from "@solar-icons/react";
import { Container, Section, SectionHeading } from "@/components/layout/container";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { Placeholder } from "@/components/ui/placeholder";
import { images } from "@/config/images";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Homebuzz Gardening Services, Belfast",
  description:
    "Homebuzz is a Belfast garden clearance business founded by Fortune, built around fair prices, responsible waste handling and helping older and disabled residents.",
  path: "/about",
});

const values = [
  { title: "Fair", body: "Honest guide prices, a written quote, and nothing to pay until the work is done." },
  { title: "Reliable", body: "We turn up when we say we will and do what we quoted for." },
  { title: "Respectful", body: "Your home, your garden, your pace. We explain and we listen." },
  { title: "Responsible", body: "Waste is handled properly. No shortcuts, and no fly-tipping." },
];

const impact = [
  { icon: HandHeartOutlineIcon, title: "Helping older and disabled residents", body: "Discounted, patient help for people who can't manage heavy garden work themselves." },
  { icon: HomeSmileOutlineIcon, title: "Cleaner, safer neighbourhoods", body: "Overgrown gardens can hide hazards and attract fly-tipping. Clearing them helps the whole street." },
  { icon: LeafOutlineIcon, title: "Responsible waste management", body: "Green waste goes to authorised sites for composting and recycling wherever possible." },
  { icon: UsersGroupRoundedOutlineIcon, title: "Local employment", body: "As Homebuzz grows, we aim to create local jobs and work with local contractors." },
];

export default function AboutPage() {
  const { compliance } = site;
  return (
    <>
      <PageHero
        eyebrow="About Homebuzz"
        title="Making garden upkeep easier for everyone in Belfast"
        intro="Homebuzz Gardening Services is a new Belfast business offering affordable garden clearance, green waste removal and maintenance. We launch in March 2027."
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
                Homebuzz exists to make that easy to fix, with clear prices, a written quote, nothing to pay up front, and
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
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div className="leaf-lg grid aspect-[4/5] place-items-center border-2 border-dashed border-navy/20 bg-white p-8 text-center">
              <Placeholder>Photo of {site.founder} to be added</Placeholder>
            </div>
            <div>
              <SectionHeading id="founder-title" eyebrow="Meet the founder" title={`Hello, I'm ${site.founder}`} />
              <div className="mt-6 space-y-5 text-lead text-muted-strong">
                <p>
                  I started Homebuzz to offer Belfast a garden clearance service that&apos;s affordable, reliable and kind, especially
                  to people who need a bit of extra help.
                </p>
                <Placeholder block>
                  Founder story to be added by {site.founder}: why you started Homebuzz, your connection to Belfast, and what customers can
                  expect when you arrive. Please don&apos;t add qualifications, experience or achievements unless they&apos;re accurate.
                </Placeholder>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="white" labelledBy="impact-title">
        <Container>
          <SectionHeading
            id="impact-title"
            eyebrow="Social impact"
            title="Good for gardens, good for neighbourhoods"
            intro="What we're setting out to do as a local business."
          />
          <ul className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {impact.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-5 border-t border-line pt-7">
                <Icon className="size-9 shrink-0 text-green" aria-hidden />
                <div>
                  <h3 className="text-h3">{title}</h3>
                  <p className="mt-2 text-muted-strong">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="mint" labelledBy="credentials-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <SectionHeading
              id="credentials-title"
              eyebrow="Registrations and insurance"
              title="The paperwork, stated plainly"
              intro="We only publish registrations and insurance once they're confirmed."
            />
            <dl className="divide-y divide-navy/10 rounded-[1.75rem] border border-line bg-white px-7">
              {[
                { label: "Waste carrier registration", value: compliance.wasteCarrierRegistration, missing: "Registration number to be added once confirmed" },
                { label: "Insurance", value: compliance.insurance, missing: "Insurance details to be added once a policy is in place" },
                { label: "Business registration", value: compliance.companyRegistration, missing: "Business registration details to be added" },
              ].map((row) => (
                <div key={row.label} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="flex items-center gap-2.5 font-semibold text-navy">
                    <ShieldCheckOutlineIcon className="size-5 text-green" aria-hidden />
                    {row.label}
                  </dt>
                  <dd className="text-muted-strong">{row.value ?? <Placeholder>{row.missing}</Placeholder>}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}

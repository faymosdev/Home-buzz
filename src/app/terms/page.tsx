import { LegalPage } from "@/components/sections/legal-page";
import { Placeholder } from "@/components/ui/placeholder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions",
  description: "Draft terms for quotes and garden services from Homebuzz Gardening Services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms and conditions"
      intro="The basis on which we provide quotes and garden services."
      sections={[
        {
          heading: "Quotes",
          body: (
            <>
              <p>
                Prices shown on this website are a guide only. A quote request sent through this website is not a booking and does not
                commit you to anything. We provide a written quote before any work begins.
              </p>
              <Placeholder block>How long quotes remain valid, and what happens if the job turns out different from what was described, to be added.</Placeholder>
            </>
          ),
        },
        {
          heading: "Payment",
          body: (
            <>
              <p>We don&apos;t take payment online and we don&apos;t ask for payment up front.</p>
              <Placeholder block>Accepted payment methods and payment terms (including business invoicing terms) to be added.</Placeholder>
            </>
          ),
        },
        {
          heading: "Cancellations and rescheduling",
          body: <Placeholder block>Cancellation and rescheduling terms to be added.</Placeholder>,
        },
        {
          heading: "Access and safety",
          body: <Placeholder block>Customer responsibilities for access, pets, hazards and boundaries to be added.</Placeholder>,
        },
        {
          heading: "Waste",
          body: <Placeholder block>Terms covering what waste is and isn&apos;t included to be added.</Placeholder>,
        },
        {
          heading: "Liability and complaints",
          body: <Placeholder block>Liability, insurance and complaints process to be added with legal advice.</Placeholder>,
        },
      ]}
    />
  );
}

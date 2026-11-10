import { LegalPage } from "@/components/sections/legal-page";
import { Placeholder } from "@/components/ui/placeholder";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Homebuzz Gardening Services handles the personal information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro="How we handle the personal information you share with us through this website."
      sections={[
        {
          heading: "Who we are",
          body: (
            <>
              <p>
                {site.name} is a garden clearance business based in {site.location.city}, {site.location.region}.
              </p>
              <Placeholder block>Legal business name, registered address and data protection contact details to be added.</Placeholder>
            </>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <>
              <p>When you request a quote or send a message, we collect what you enter in the form, which can include:</p>
              <ul>
                <li>your name, email address and phone number</li>
                <li>the property address and postcode</li>
                <li>details about your garden and the service you need</li>
                <li>photos you choose to upload</li>
                <li>how you&apos;d like us to contact you</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: <p>We use your details to review your enquiry, prepare a quote, contact you about it and, if you go ahead, to arrange and carry out the work.</p>,
        },
        {
          heading: "Where it's stored",
          body: (
            <>
              <p>Form submissions and photos are stored with our database and file storage provider, and enquiry notifications are sent to us by email through an email delivery provider.</p>
              <Placeholder block>Names of providers, storage locations and any international transfer safeguards to be confirmed and added.</Placeholder>
            </>
          ),
        },
        {
          heading: "Legal basis and how long we keep it",
          body: <Placeholder block>Lawful basis for processing and retention periods to be confirmed with legal advice.</Placeholder>,
        },
        {
          heading: "Your rights",
          body: <Placeholder block>Details of your data protection rights and how to exercise them, including how to contact the ICO, to be added.</Placeholder>,
        },
        {
          heading: "Cookies",
          body: <p>This website doesn&apos;t use advertising or tracking cookies. If that changes, this policy will be updated first.</p>,
        },
      ]}
    />
  );
}

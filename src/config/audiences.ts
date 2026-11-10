import { images, type SiteImage } from "./images";

export type Audience = {
  id: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  image: SiteImage;
};

export const audiences: Audience[] = [
  {
    id: "homeowners",
    title: "Homeowners and tenants",
    body: "For gardens that got away from you, and the weekends you'd rather not spend at the tip.",
    href: "/residential",
    linkLabel: "Help for homes",
    image: images.homeGardenDusk,
  },
  {
    id: "older-disabled",
    title: "Older and disabled residents",
    body: "Friendly, patient help with the heavy work, a discount for eligible customers, and no rush.",
    href: "/residential#discounts",
    linkLabel: "About our discount",
    image: images.wateringCare,
  },
  {
    id: "landlords",
    title: "Landlords and letting agents",
    body: "End-of-tenancy clearances with a fixed price after assessment, turned around quickly.",
    href: "/business-services",
    linkLabel: "Services for landlords",
    image: images.rentalHomes,
  },
  {
    id: "property-managers",
    title: "Property managers",
    body: "Repeatable garden care across the sites you look after, with one point of contact.",
    href: "/business-services#property-managers",
    linkLabel: "Services for property managers",
    image: images.propertyManaged,
  },
];

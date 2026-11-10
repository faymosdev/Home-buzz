import { images, type SiteImage } from "./images";

export type ServiceIcon = "broom" | "leaf" | "scissors" | "trash" | "calendar" | "key" | "buildings" | "sun";

export type Service = {
  id: string;
  name: string;
  /** One-line summary used on cards. */
  summary: string;
  /** Longer description used on the services page. */
  description: string;
  suitableFor: string[];
  benefits: string[];
  image: SiteImage;
  icon: ServiceIcon;
  status: "available" | "coming-soon";
  /** Shown on the homepage "What we do" section. */
  featured?: boolean;
};

export const services: Service[] = [
  {
    id: "garden-clearance",
    name: "Garden clearance",
    summary: "From a weekend's worth of mess to a full reset — we clear it and take it away.",
    description:
      "We clear unwanted growth, weeds, cuttings, old plant pots and general garden waste, then leave the space swept and usable. Big or small, you get a written quote first, so you know the price before we start.",
    suitableFor: ["Homeowners and tenants", "Moving in or moving out", "Gardens that have got away from you"],
    benefits: ["Fixed written quote before any work", "All green waste removed", "Left tidy and ready to use"],
    image: images.patioAfter,
    icon: "broom",
    status: "available",
    featured: true,
  },
  {
    id: "overgrown-garden-clearance",
    name: "Overgrown garden clearance",
    summary: "Waist-high grass, brambles and years of growth — cut back and cleared.",
    description:
      "For gardens that haven't been touched in a season or several. We cut back long grass, brambles and scrub, uncover paths and borders, and take every bit of green waste away with us.",
    suitableFor: ["Neglected or inherited gardens", "Properties being sold or re-let", "Anyone who doesn't know where to start"],
    benefits: ["No job too overgrown to quote", "Paths, borders and lawns uncovered", "Waste handled responsibly"],
    image: images.wildBefore,
    icon: "leaf",
    status: "available",
    featured: true,
  },
  {
    id: "hedge-scrub-clearance",
    name: "Hedge and scrub clearance",
    summary: "Overgrown hedges cut back and scrub cleared, with all cuttings removed.",
    description:
      "We cut back overgrown hedges and clear scrub and self-seeded growth that's crowding your garden, then remove all the cuttings. If a hedge needs specialist work, we'll tell you straight away.",
    suitableFor: ["Hedges blocking light or paths", "Boundaries that need reclaiming", "Rental properties before inspection"],
    benefits: ["Light and space back in your garden", "Cuttings removed the same day", "Honest advice on what needs doing"],
    image: images.hedgeTrimming,
    icon: "scissors",
    status: "available",
    featured: true,
  },
  {
    id: "green-waste-removal",
    name: "Green waste removal",
    summary: "Already done the work? We'll collect the bags, branches and cuttings.",
    description:
      "If you've cleared the garden yourself but the waste is piling up, we'll collect it — bags, branches, turf and cuttings — and take it to authorised sites for composting and recycling wherever possible.",
    suitableFor: ["DIY gardeners", "After a big tidy-up", "Piles that won't fit in the brown bin"],
    benefits: ["No trips to the tip", "Priced by volume, quoted up front", "Disposed of responsibly"],
    image: images.greenWaste,
    icon: "trash",
    status: "available",
    featured: true,
  },
  {
    id: "garden-maintenance",
    name: "Regular garden maintenance",
    summary: "Grass cut, edges kept and weeds under control on a schedule that suits you.",
    description:
      "Keep a cleared garden looking that way. We can visit fortnightly, monthly or seasonally to cut the grass, keep edges and borders tidy and stop growth getting out of hand again.",
    suitableFor: ["Older and disabled residents", "Busy households", "Landlords between tenancies"],
    benefits: ["Same friendly service each visit", "Flexible visit frequency", "Never pay up front"],
    image: images.lawnMowing,
    icon: "calendar",
    status: "available",
    featured: true,
  },
  {
    id: "end-of-tenancy-clearance",
    name: "Landlord and end-of-tenancy clearance",
    summary: "Get the garden ready for the next tenant, fast.",
    description:
      "We clear and tidy gardens between tenancies so properties can be inspected, photographed and re-let without delay. Send us photos and the address and we'll come back with a fixed price after assessment.",
    suitableFor: ["Private landlords", "Letting agents", "Check-out and inventory deadlines"],
    benefits: ["Fast turnaround", "Fixed price after assessment", "Before-and-after photos on request"],
    image: images.rentalHomes,
    icon: "key",
    status: "available",
    featured: true,
  },
  {
    id: "property-management-services",
    name: "Property management garden services",
    summary: "Reliable, repeatable garden care across the properties you manage.",
    description:
      "For property managers and housing providers who need communal and private gardens kept safe and presentable. We can agree a schedule across several addresses, with one point of contact.",
    suitableFor: ["Property managers", "Housing providers", "Block and estate management"],
    benefits: ["One contact for multiple sites", "Scheduled and one-off work", "Clear records of each visit"],
    image: images.propertyManaged,
    icon: "buildings",
    status: "available",
  },
  {
    id: "window-cleaning",
    name: "Window cleaning",
    summary: "A future service we're planning to add. Not available yet.",
    description:
      "We're planning to add window cleaning in the future. It isn't available yet, so we can't take bookings for it. If you'd like to hear when it launches, mention it when you get in touch.",
    suitableFor: ["Existing Homebuzz customers"],
    benefits: ["Planned for a later date"],
    image: images.houseLawn,
    icon: "sun",
    status: "coming-soon",
  },
];

export const availableServices = services.filter((s) => s.status === "available");
export const featuredServices = services.filter((s) => s.featured && s.status === "available");

export const getService = (id: string) => services.find((s) => s.id === id);

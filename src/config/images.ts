/**
 * Image registry. Every photo on the site is referenced from here so alt text
 * stays consistent and images can be swapped in one place.
 *
 * All current photos are licensed stock (Unsplash) used for illustration only —
 * see docs/IMAGE_CREDITS.md. Replace them with real Homebuzz photos after launch.
 */
export type SiteImage = { src: string; alt: string; width: number; height: number };

const img = (name: string, alt: string, width: number, height: number): SiteImage => ({
  src: `/images/${name}.webp`,
  alt,
  width,
  height,
});

export const images = {
  hero: img("hero-garden", "A neat lawn and tidy garden behind a modern home at dusk", 1800, 1200),
  lawnAfter: img("lawn-after", "Freshly cut lawn along a clean garden edge", 1800, 1013),
  wildBefore: img("wild-garden-before", "A garden left to grow wild, with long grass and spreading plants", 1800, 1350),
  overgrownBedBefore: img("overgrown-bed-before", "Raised beds overrun with leafy growth", 1800, 1200),
  patioAfter: img("patio-after", "A tidy patio garden with clear paving and trimmed borders, seen from above", 1800, 1350),
  hedgeTrimming: img("hedge-trimming", "Gloved hands trimming a conifer hedge with shears", 1800, 1200),
  lawnMowing: img("lawn-mowing", "A lawnmower cutting thick green grass", 1800, 1193),
  greenWaste: img("green-waste", "A trowel and loose soil ready for clearing", 1800, 1200),
  rentalHomes: img("rental-homes", "A row of houses with front lawns", 1800, 1200),
  propertyManaged: img("property-managed", "Modern homes with clean, low-maintenance front gardens", 1800, 1200),
  wateringCare: img("watering-care", "Hands watering young plants with a green watering can", 1800, 2700),
  gardenPath: img("garden-path", "A clear garden path between trimmed hedges and flowering shrubs", 1800, 1013),
  homeGardenDusk: img("home-garden-dusk", "A family garden with lawn and seating outside a house in the evening", 1800, 1350),
  gardenerAtWork: img("gardener-at-work", "A person working on a planted bed outdoors", 1800, 1200),
  houseLawn: img("house-lawn", "A modern house with a tidy lawn and paved path", 1800, 1509),
  handsSoil: img("hands-soil", "Hands working in dark garden soil", 1800, 1493),
} satisfies Record<string, SiteImage>;

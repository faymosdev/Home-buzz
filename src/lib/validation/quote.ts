import { z } from "zod";
import { availableServices } from "@/config/services";

/** Shared by the browser form and the server action, so rules never drift apart. */

export const UK_POSTCODE = /^([A-Z]{1,2}\d[A-Z\d]?)\s*(\d[A-Z]{2})$/i;
const UK_PHONE = /^(?:\+44\s?|0)(?:\d\s?){9,10}$/;

export const customerTypes = [
  { value: "residential", label: "Residential", hint: "My own home, or a home I'm helping with" },
  { value: "business", label: "Business", hint: "Landlord, letting agent, property manager or housing provider" },
] as const;

export const gardenSizes = [
  { value: "small", label: "Small — about the size of a parking space or two" },
  { value: "medium", label: "Medium — a typical terrace or semi-detached back garden" },
  { value: "large", label: "Large — a big back garden, or front and back" },
  { value: "very-large", label: "Very large — several areas, or multiple properties" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const gardenConditions = [
  { value: "light", label: "Needs a tidy — a bit untidy but manageable" },
  { value: "overgrown", label: "Overgrown — long grass, weeds or hedges out of control" },
  { value: "very-overgrown", label: "Very overgrown or neglected — hard to get into" },
  { value: "waste-only", label: "Already cleared — just need the waste taken away" },
  { value: "not-sure", label: "Not sure" },
] as const;

export const contactMethods = [
  { value: "phone", label: "Phone call" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text message" },
] as const;

export const serviceOptions = [
  ...availableServices.map((s) => ({ value: s.id, label: s.name })),
  { value: "not-sure", label: "Not sure — please advise" },
];

const values = <T extends readonly { value: string }[]>(list: T) =>
  list.map((o) => o.value) as unknown as [T[number]["value"], ...T[number]["value"][]];

const trimmed = (min: number, max: number, message: string) =>
  z.string().trim().min(min, message).max(max, `Please keep this under ${max} characters`);

export const customerStepSchema = z.object({
  fullName: trimmed(2, 120, "Please enter your full name"),
  email: z.string().trim().pipe(z.email("Enter an email address like name@example.com")),
  phone: z
    .string()
    .trim()
    .regex(UK_PHONE, "Enter a UK phone number, like 07700 900123 or 028 9000 0000"),
  customerType: z.enum(values(customerTypes), { error: "Choose residential or business" }),
  postcode: z
    .string()
    .trim()
    .regex(UK_POSTCODE, "Enter a full UK postcode, like BT9 6AA")
    .transform((v) => v.toUpperCase().replace(UK_POSTCODE, "$1 $2")),
  address: trimmed(5, 300, "Please enter the property address"),
});

export const serviceStepSchema = z.object({
  serviceType: z.enum(values(serviceOptions), { error: "Choose the service you need" }),
  gardenDescription: trimmed(10, 2000, "Tell us a little about the garden and what you'd like done (at least 10 characters)"),
  gardenSize: z.enum(values(gardenSizes), { error: "Choose an approximate size" }),
  gardenCondition: z.enum(values(gardenConditions), { error: "Choose the option closest to your garden" }),
  preferredDate: z
    .string()
    .trim()
    .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Choose a valid date")
    .optional()
    .default(""),
  preferredContact: z.enum(values(contactMethods), { error: "Choose how you'd like us to contact you" }),
});

export const consentSchema = z.object({
  consent: z.literal(true, { error: "Please confirm you agree so we can contact you about your quote" }),
  /** Honeypot: real people never see or fill this field. */
  website: z.string().max(0).optional().default(""),
});

export const quoteRequestSchema = customerStepSchema.extend(serviceStepSchema.shape).extend(consentSchema.shape);

export type QuoteRequestInput = z.input<typeof quoteRequestSchema>;
export type QuoteRequest = z.output<typeof quoteRequestSchema>;

/** Photo upload rules (enforced in the browser, the server action and the storage bucket). */
export const PHOTO_RULES = {
  maxFiles: 10,
  maxBytes: 10 * 1024 * 1024,
  mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"],
  extensions: ".jpg, .jpeg, .png, .webp, .heic",
} as const;

export const photoMetaSchema = z
  .array(
    z.object({
      name: z.string().max(200),
      type: z.enum(PHOTO_RULES.mimeTypes as unknown as [string, ...string[]]),
      size: z.number().int().positive().max(PHOTO_RULES.maxBytes),
    }),
  )
  .max(PHOTO_RULES.maxFiles);

export const labelFor = <T extends readonly { value: string; label: string }[]>(list: T, value: string) =>
  list.find((o) => o.value === value)?.label ?? value;

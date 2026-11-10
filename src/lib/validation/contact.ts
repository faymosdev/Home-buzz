import { z } from "zod";

export const contactTopics = [
  { value: "general", label: "General question" },
  { value: "quote", label: "Question about a quote" },
  { value: "business", label: "Business or property enquiry" },
  { value: "other", label: "Something else" },
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().pipe(z.email("Enter an email address like name@example.com")),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || /^(?:\+44\s?|0)(?:\d\s?){9,10}$/.test(v), "Enter a UK phone number, or leave this blank")
    .optional()
    .default(""),
  topic: z.enum(["general", "quote", "business", "other"], { error: "Choose a topic" }),
  message: z.string().trim().min(10, "Please write a short message (at least 10 characters)").max(3000),
  consent: z.literal(true, { error: "Please confirm you agree so we can reply to you" }),
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactMessage = z.output<typeof contactSchema>;

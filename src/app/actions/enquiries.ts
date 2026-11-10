"use server";

import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validation/contact";
import { photoMetaSchema, quoteRequestSchema } from "@/lib/validation/quote";
import { createContactMessage, createPhotoUploadTickets, createQuoteRequest } from "@/services/enquiries";
import type { ActionResult, UploadTicket } from "@/types/enquiries";

const NOT_CONFIGURED = {
  ok: false as const,
  code: "not_configured" as const,
  message: "Online requests aren't switched on yet.",
};

/** Step 1 of submitting photos: validate the file list and hand back signed upload URLs. */
export async function prepareQuotePhotoUploads(
  files: unknown,
): Promise<ActionResult<{ uploadId: string; tickets: UploadTicket[] }>> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;
  const parsed = photoMetaSchema.safeParse(files);
  if (!parsed.success) {
    return { ok: false, code: "validation", message: "One or more photos aren't allowed. Check the type and size and try again." };
  }
  try {
    const data = await createPhotoUploadTickets(parsed.data);
    return { ok: true, data };
  } catch (err) {
    console.error("[quote] upload tickets", err);
    return { ok: false, code: "error", message: "We couldn't prepare your photo upload. Please try again." };
  }
}

const photoRefSchema = z.object({
  uploadId: z.uuid().optional(),
  paths: z.array(z.string().max(300)).max(10).default([]),
});

export async function submitQuoteRequest(
  input: unknown,
  photos: unknown,
): Promise<ActionResult<{ reference: string; photoCount: number }>> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;

  const parsed = quoteRequestSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: "validation",
      message: "Some details need checking. Please review the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  // Honeypot filled in: pretend success so bots learn nothing, but store nothing.
  if (parsed.data.website) return { ok: true, data: { reference: "HB-RECEIVED", photoCount: 0 } };

  const photoRefs = photoRefSchema.safeParse(photos);
  try {
    const result = await createQuoteRequest(parsed.data, photoRefs.success ? photoRefs.data : { paths: [] });
    return { ok: true, data: { reference: result.reference, photoCount: result.photoCount } };
  } catch (err) {
    console.error("[quote] submit", err);
    return { ok: false, code: "error", message: "Something stopped your request from sending. Please try again in a moment." };
  }
}

export async function submitContactMessage(input: unknown): Promise<ActionResult<{ reference: string }>> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      code: "validation",
      message: "Some details need checking.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }
  if (parsed.data.website) return { ok: true, data: { reference: "HC-RECEIVED" } };
  try {
    const { reference } = await createContactMessage(parsed.data);
    return { ok: true, data: { reference } };
  } catch (err) {
    console.error("[contact] submit", err);
    return { ok: false, code: "error", message: "Your message didn't send. Please try again in a moment." };
  }
}

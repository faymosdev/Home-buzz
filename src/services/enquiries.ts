import "server-only";
import { randomUUID, randomInt } from "node:crypto";
import { site } from "@/config/site";
import { sendBusinessNotification } from "@/lib/email/notify";
import { getSupabaseAdmin, QUOTE_PHOTO_BUCKET } from "@/lib/supabase/server";
import { contactTopics, type ContactMessage } from "@/lib/validation/contact";
import {
  contactMethods,
  customerTypes,
  gardenConditions,
  gardenSizes,
  labelFor,
  serviceOptions,
  type QuoteRequest,
} from "@/lib/validation/quote";
import type { UploadTicket } from "@/types/enquiries";

/**
 * Backend service layer for enquiries. Server actions call these functions;
 * a future admin dashboard and API routes should reuse them rather than
 * talking to the database directly.
 */

const REF_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function makeReference(prefix = "HB") {
  let out = "";
  for (let i = 0; i < 6; i++) out += REF_ALPHABET[randomInt(REF_ALPHABET.length)];
  return `${prefix}-${out}`;
}

const safeName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(-80) || "photo";

/** Issues short-lived signed upload URLs so photos go straight from the browser to private storage. */
export async function createPhotoUploadTickets(files: { name: string }[]) {
  const supabase = getSupabaseAdmin();
  const uploadId = randomUUID();
  const tickets: UploadTicket[] = [];
  for (const [i, file] of files.entries()) {
    const path = `pending/${uploadId}/${String(i + 1).padStart(2, "0")}-${safeName(file.name)}`;
    const { data, error } = await supabase.storage.from(QUOTE_PHOTO_BUCKET).createSignedUploadUrl(path);
    if (error || !data) throw new Error(`Could not create upload URL: ${error?.message}`);
    tickets.push({ path: data.path, signedUrl: data.signedUrl, token: data.token });
  }
  return { uploadId, tickets };
}

export async function createQuoteRequest(input: QuoteRequest, photos: { uploadId?: string; paths: string[] }) {
  const supabase = getSupabaseAdmin();
  const reference = makeReference();

  // Only accept paths inside the upload folder this server issued.
  const paths = photos.uploadId ? photos.paths.filter((p) => p.startsWith(`pending/${photos.uploadId}/`)) : [];

  const { data, error } = await supabase
    .from("quote_requests")
    .insert({
      reference,
      status: "new",
      customer_type: input.customerType,
      full_name: input.fullName,
      email: input.email,
      phone: input.phone,
      postcode: input.postcode,
      address: input.address,
      service_type: input.serviceType,
      garden_description: input.gardenDescription,
      garden_size: input.gardenSize,
      garden_condition: input.gardenCondition,
      preferred_date: input.preferredDate || null,
      preferred_contact: input.preferredContact,
      consent_at: new Date().toISOString(),
      source: "website",
    })
    .select("id")
    .single();
  if (error || !data) throw new Error(`Could not save quote request: ${error?.message}`);

  let photoLinks: string[] = [];
  if (paths.length) {
    const { error: photoError } = await supabase.from("quote_request_photos").insert(
      paths.map((storage_path) => ({ quote_request_id: data.id, storage_path })),
    );
    if (photoError) console.error("[quote] Could not record photos", photoError.message);

    const { data: signed } = await supabase.storage.from(QUOTE_PHOTO_BUCKET).createSignedUrls(paths, 60 * 60 * 24 * 7);
    photoLinks = (signed ?? []).map((s) => s.signedUrl).filter(Boolean) as string[];
  }

  const notification = await sendBusinessNotification({
    subject: `New quote request ${reference} — ${labelFor(serviceOptions, input.serviceType)} (${input.postcode})`,
    replyTo: input.email,
    text: [
      `New quote request from the ${site.shortName} website.`,
      ``,
      `Reference: ${reference}`,
      `Customer type: ${labelFor(customerTypes, input.customerType)}`,
      `Name: ${input.fullName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Preferred contact: ${labelFor(contactMethods, input.preferredContact)}`,
      `Address: ${input.address}, ${input.postcode}`,
      ``,
      `Service: ${labelFor(serviceOptions, input.serviceType)}`,
      `Garden size: ${labelFor(gardenSizes, input.gardenSize)}`,
      `Condition: ${labelFor(gardenConditions, input.gardenCondition)}`,
      `Preferred date: ${input.preferredDate || "No preference"}`,
      ``,
      `Description:`,
      input.gardenDescription,
      ``,
      photoLinks.length ? `Photos (links expire in 7 days):\n${photoLinks.join("\n")}` : `No photos uploaded.`,
    ].join("\n"),
  });

  return { id: data.id as string, reference, photoCount: paths.length, notified: notification.sent };
}

export async function createContactMessage(input: ContactMessage) {
  const supabase = getSupabaseAdmin();
  const reference = makeReference("HC");
  const { error } = await supabase.from("contact_messages").insert({
    reference,
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    topic: input.topic,
    message: input.message,
    consent_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Could not save message: ${error.message}`);

  const notification = await sendBusinessNotification({
    subject: `New message ${reference} — ${labelFor(contactTopics, input.topic)}`,
    replyTo: input.email,
    text: [
      `New message from the ${site.shortName} website contact form.`,
      ``,
      `Reference: ${reference}`,
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone || "Not given"}`,
      `Topic: ${labelFor(contactTopics, input.topic)}`,
      ``,
      input.message,
    ].join("\n"),
  });
  return { reference, notified: notification.sent };
}

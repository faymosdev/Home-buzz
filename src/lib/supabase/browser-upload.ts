import { createClient } from "@supabase/supabase-js";
import type { UploadTicket } from "@/types/enquiries";

/**
 * Uploads a photo straight to private Supabase Storage using a signed upload
 * URL issued by the server. Uses only the public anon key; the signed token
 * restricts the upload to exactly one path, once.
 */
export async function uploadWithTicket(ticket: UploadTicket, file: File) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_QUOTE_PHOTOS_BUCKET ?? "quote-photos";
  if (!url || !anonKey) throw new Error("Supabase public environment variables are missing");
  const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
  const { error } = await supabase.storage.from(bucket).uploadToSignedUrl(ticket.path, ticket.token, file, {
    contentType: file.type,
  });
  if (error) throw error;
}

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * Keeps the free-tier Supabase project from being paused for inactivity.
 * Called once a day by Vercel Cron (see vercel.json). Vercel sends
 * `Authorization: Bearer <CRON_SECRET>`; anything else is rejected.
 * It only counts rows (no data is returned or changed).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }
  if (!isSupabaseConfigured()) {
    return Response.json({ ok: false, error: "supabase_not_configured" }, { status: 500 });
  }

  const { error } = await getSupabaseAdmin().from("quote_requests").select("id", { count: "exact", head: true });
  if (error) {
    console.error("[keep-alive] Supabase query failed", error.message);
    return Response.json({ ok: false, error: "query_failed" }, { status: 500 });
  }
  return Response.json({ ok: true, at: new Date().toISOString() });
}

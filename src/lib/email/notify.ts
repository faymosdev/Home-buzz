import "server-only";

/**
 * Business notification emails, sent through Resend's HTTP API (no SDK needed).
 * If RESEND_API_KEY / NOTIFY_EMAIL_TO / NOTIFY_EMAIL_FROM are not set, sending
 * is skipped and logged — the enquiry is still saved in Supabase.
 */
export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL_TO && process.env.NOTIFY_EMAIL_FROM);
}

type Email = { subject: string; text: string; replyTo?: string };

export async function sendBusinessNotification({ subject, text, replyTo }: Email): Promise<{ sent: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    console.info(`[notify] Email not configured — skipped "${subject}"`);
    return { sent: false, error: "not_configured" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_EMAIL_FROM,
        to: process.env.NOTIFY_EMAIL_TO!.split(",").map((s) => s.trim()),
        subject,
        text,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[notify] Resend responded ${res.status}: ${body.slice(0, 300)}`);
      return { sent: false, error: `http_${res.status}` };
    }
    return { sent: true };
  } catch (err) {
    console.error("[notify] Failed to send email", err);
    return { sent: false, error: "network" };
  }
}

/**
 * Lifecycle of a quote request. Phase 1 uses new → reviewing → quoted.
 * Later statuses are reserved for the booking and job phases (see docs/ARCHITECTURE.md).
 */
export const QUOTE_STATUSES = ["new", "reviewing", "quoted", "accepted", "declined", "scheduled", "completed", "cancelled"] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export type ActionResult<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | {
      ok: false;
      /** not_configured = backend credentials missing; validation = bad input; error = unexpected */
      code: "not_configured" | "validation" | "error";
      message: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

export type UploadTicket = { path: string; signedUrl: string; token: string };

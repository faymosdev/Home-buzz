"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightOutlineIcon,
  CheckCircleBoldIcon,
  DangerTriangleOutlineIcon,
  InfoCircleOutlineIcon,
} from "@solar-icons/react";
import { prepareQuotePhotoUploads, submitQuoteRequest } from "@/app/actions/enquiries";
import { ContactFallback } from "@/components/forms/contact-fallback";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldError, Input, Select, Textarea, describedBy } from "@/components/ui/field";
import { uploadWithTicket } from "@/lib/supabase/browser-upload";
import {
  contactMethods,
  customerTypes,
  gardenConditions,
  gardenSizes,
  quoteRequestSchema,
  serviceOptions,
  type QuoteRequest,
  type QuoteRequestInput,
} from "@/lib/validation/quote";
import { cn } from "@/lib/utils";
import { PhotoPicker, type PickedPhoto } from "./photo-picker";

type Status =
  | { kind: "idle" }
  | { kind: "working"; label: string }
  | { kind: "success"; reference: string; photoCount: number }
  | { kind: "not_configured" }
  | { kind: "error"; message: string };

export function QuoteForm() {
  const params = useSearchParams();
  const presetService = params.get("service");
  const presetCustomer = params.get("customer");

  const [photos, setPhotos] = React.useState<PickedPhoto[]>([]);
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  // This form only renders in the browser (useSearchParams bails out of prerendering), so reading the date here is safe.
  const [today] = React.useState(() => new Date().toISOString().slice(0, 10));
  const [submitAttempted, setSubmitAttempted] = React.useState(false);
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  // Revoke photo preview URLs when the form unmounts.
  const photosRef = React.useRef(photos);
  React.useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  React.useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.preview)), []);

  const form = useForm<QuoteRequestInput, unknown, QuoteRequest>({
    resolver: zodResolver(quoteRequestSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      customerType: presetCustomer === "business" ? "business" : presetCustomer === "residential" ? "residential" : undefined,
      postcode: "",
      address: "",
      serviceType: serviceOptions.some((o) => o.value === presetService) ? (presetService as string) : undefined,
      gardenDescription: "",
      gardenSize: undefined,
      gardenCondition: undefined,
      preferredDate: "",
      preferredContact: undefined,
      consent: undefined as unknown as true,
      website: "",
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  // Clear an error the moment the field is fixed (not on blur), so the layout
  // never shifts under the pointer mid-click.
  React.useEffect(() => {
    return form.subscribe({
      formState: { values: true },
      callback: ({ name }) => {
        if (name && form.getFieldState(name as FieldPath<QuoteRequestInput>).error) void form.trigger(name as FieldPath<QuoteRequestInput>);
      },
    });
  }, [form]);

  // After a successful send, move focus to the confirmation heading.
  React.useEffect(() => {
    if (status.kind === "success") headingRef.current?.focus();
  }, [status.kind]);

  const onSubmit = handleSubmit(async (values) => {
    setSubmitAttempted(true);
    setStatus({ kind: "working", label: "Sending your request…" });

    let photoRefs: { uploadId?: string; paths: string[] } = { paths: [] };
    if (photos.length) {
      setStatus({ kind: "working", label: `Uploading ${photos.length} photo${photos.length > 1 ? "s" : ""}…` });
      const prep = await prepareQuotePhotoUploads(photos.map((p) => ({ name: p.file.name, type: p.file.type || "image/heic", size: p.file.size })));
      if (!prep.ok) {
        setStatus(prep.code === "not_configured" ? { kind: "not_configured" } : { kind: "error", message: prep.message });
        return;
      }
      try {
        for (const [i, photo] of photos.entries()) {
          setStatus({ kind: "working", label: `Uploading photo ${i + 1} of ${photos.length}…` });
          await uploadWithTicket(prep.data.tickets[i], photo.file);
        }
      } catch {
        setStatus({
          kind: "error",
          message: "Your photos didn't upload. Check your connection and try again, or remove the photos to send without them.",
        });
        return;
      }
      photoRefs = { uploadId: prep.data.uploadId, paths: prep.data.tickets.map((t) => t.path) };
      setStatus({ kind: "working", label: "Sending your request…" });
    }

    const result = await submitQuoteRequest(values, photoRefs);
    if (result.ok) {
      setStatus({ kind: "success", reference: result.data.reference, photoCount: result.data.photoCount });
    } else if (result.code === "not_configured") {
      setStatus({ kind: "not_configured" });
    } else {
      setStatus({ kind: "error", message: result.message });
    }
  }, () => {
    // Invalid: react-hook-form focuses the first field with an error; show a summary too.
    setSubmitAttempted(true);
    setStatus({ kind: "idle" });
  });

  if (status.kind === "success") {
    return (
      <div className="rounded-[2rem] border border-line bg-white p-8 sm:p-12" role="status">
        <CheckCircleBoldIcon className="size-14 text-green" aria-hidden />
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-h2 focus:outline-none">
          Thanks, we&apos;ve got your request
        </h2>
        <p className="mt-4 text-lead text-muted-strong">
          Your reference is <strong className="font-bold text-navy tabular">{status.reference}</strong>
          {status.photoCount > 0 && ` and we received ${status.photoCount} photo${status.photoCount > 1 ? "s" : ""}`}.
        </p>
        <div className="mt-8 rounded-2xl bg-mint p-6">
          <h3 className="font-sans text-base font-bold text-navy">What happens next</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted-strong">
            <li>We&apos;ll review your garden details and photos.</li>
            <li>If we need more information or a visit, we&apos;ll get in touch the way you asked.</li>
            <li>We&apos;ll send you a free written quote.</li>
          </ol>
          <p className="mt-4 text-sm text-muted-strong">
            Nothing is booked yet and no price has been agreed. You don&apos;t need to pay anything, and there&apos;s no obligation
            to go ahead.
          </p>
        </div>
        <Link href="/" className={buttonVariants({ variant: "outline", className: "mt-8" })}>
          Back to the homepage
        </Link>
      </div>
    );
  }

  const working = status.kind === "working";
  const errorCount = Object.keys(errors).length;

  return (
    <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
      <form onSubmit={onSubmit} noValidate aria-busy={working} aria-labelledby="quote-form-title">
        <h2 id="quote-form-title" className="font-display text-h3 font-semibold text-navy sm:text-[1.75rem]">
          Your quote request
        </h2>
        <p className="mt-2 text-muted-strong">Everything is required unless it says optional.</p>

        {/* Honeypot: hidden from people and assistive tech. */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <FormSection id="details" title="Your details">
          <Field id="fullName" label="Full name" error={errors.fullName?.message} className="sm:col-span-2">
            <Input id="fullName" autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={describedBy("fullName", { error: true })} {...register("fullName")} />
          </Field>
          <Field id="email" label="Email address" error={errors.email?.message}>
            <Input id="email" type="email" inputMode="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy("email", { error: true })} {...register("email")} />
          </Field>
          <Field id="phone" label="Phone number" error={errors.phone?.message}>
            <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={describedBy("phone", { error: true })} {...register("phone")} />
          </Field>
          <fieldset className="sm:col-span-2">
            <legend className="text-[0.9375rem] font-semibold text-navy">How should we contact you?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {contactMethods.map((o) => (
                <label
                  key={o.value}
                  className="flex h-12 cursor-pointer items-center gap-2 rounded-full border border-line px-4 font-semibold text-navy transition-colors hover:border-navy has-[:checked]:border-green has-[:checked]:bg-mint has-[:checked]:text-green has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green"
                >
                  <input type="radio" value={o.value} className="size-4 accent-green" aria-describedby="preferredContact-error" {...register("preferredContact")} />
                  {o.label}
                </label>
              ))}
            </div>
            <FieldError id="preferredContact-error" message={errors.preferredContact?.message} />
          </fieldset>
        </FormSection>

        <FormSection id="property" title="The property">
          <fieldset className="sm:col-span-2">
            <legend className="text-[0.9375rem] font-semibold text-navy">Who is the quote for?</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {customerTypes.map((o) => (
                <RadioCard key={o.value} name="customerType" value={o.value} label={o.label} hint={o.hint} invalid={!!errors.customerType} register={register("customerType")} />
              ))}
            </div>
            <FieldError id="customerType-error" message={errors.customerType?.message} />
          </fieldset>
          <Field id="postcode" label="Property postcode" hint="We cover anywhere in Northern Ireland (BT postcodes)." error={errors.postcode?.message}>
            <Input id="postcode" autoComplete="postal-code" className="uppercase" aria-invalid={!!errors.postcode} aria-describedby={describedBy("postcode", { hint: true, error: true })} {...register("postcode")} />
          </Field>
          <Field id="address" label="Property address" error={errors.address?.message} className="sm:col-span-2">
            <Textarea id="address" rows={2} autoComplete="street-address" className="min-h-24" aria-invalid={!!errors.address} aria-describedby={describedBy("address", { error: true })} {...register("address")} />
          </Field>
        </FormSection>

        <FormSection id="garden" title="The garden">
          <Field id="serviceType" label="What do you need?" error={errors.serviceType?.message} className="sm:col-span-2">
            <Select id="serviceType" aria-invalid={!!errors.serviceType} aria-describedby={describedBy("serviceType", { error: true })} defaultValue="" {...register("serviceType")}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field
            id="gardenDescription"
            label="Tell us about the garden"
            hint="What's there now, what you'd like done, and anything about access (steps, narrow side passage, parking)."
            error={errors.gardenDescription?.message}
            className="sm:col-span-2"
          >
            <Textarea id="gardenDescription" aria-invalid={!!errors.gardenDescription} aria-describedby={describedBy("gardenDescription", { hint: true, error: true })} {...register("gardenDescription")} />
          </Field>
          <Field id="gardenSize" label="Approximate size" error={errors.gardenSize?.message}>
            <Select id="gardenSize" defaultValue="" aria-invalid={!!errors.gardenSize} aria-describedby={describedBy("gardenSize", { error: true })} {...register("gardenSize")}>
              <option value="" disabled>
                Choose a size
              </option>
              {gardenSizes.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="gardenCondition" label="Current condition" error={errors.gardenCondition?.message}>
            <Select id="gardenCondition" defaultValue="" aria-invalid={!!errors.gardenCondition} aria-describedby={describedBy("gardenCondition", { error: true })} {...register("gardenCondition")}>
              <option value="" disabled>
                Choose the closest
              </option>
              {gardenConditions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field id="preferredDate" label="Preferred date" optional hint="We'll confirm real availability with your quote." error={errors.preferredDate?.message}>
            <Input id="preferredDate" type="date" min={today} aria-invalid={!!errors.preferredDate} aria-describedby={describedBy("preferredDate", { hint: true, error: true })} {...register("preferredDate")} />
          </Field>
        </FormSection>

        <section aria-labelledby="photos-title" className="mt-10 border-t border-line pt-8">
          <h3 id="photos-title" className="font-sans text-lg font-bold text-navy">
            Photos <span className="font-normal text-muted">(optional)</span>
          </h3>
          <p className="mt-2 mb-6 max-w-2xl text-muted-strong">
            Photos help us give you an accurate quote without a visit. If you can&apos;t add any, we can arrange to come and take a
            look.
          </p>
          <PhotoPicker photos={photos} onChange={setPhotos} />
        </section>

        <div className="mt-10 space-y-6 border-t border-line pt-8">
          <div className="rounded-2xl bg-mint p-5 text-sm text-muted-strong">
            <p className="flex items-start gap-2.5">
              <InfoCircleOutlineIcon className="mt-0.5 size-5 shrink-0 text-green" aria-hidden />
              <span>
                Sending this asks for a quote. It isn&apos;t a booking and doesn&apos;t commit you to anything. We&apos;ll use your
                details only to prepare and discuss your quote, as described in our{" "}
                <Link href="/privacy" className="font-semibold text-navy underline underline-offset-2" target="_blank">
                  privacy policy
                </Link>
                .
              </span>
            </p>
          </div>

          <div>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-5 shrink-0 cursor-pointer accent-green"
                aria-invalid={!!errors.consent}
                aria-describedby="consent-error"
                {...register("consent")}
              />
              <span className="text-[0.9375rem] text-ink">
                I agree that Homebuzz can store these details and photos and contact me about this quote.
              </span>
            </label>
            <FieldError id="consent-error" message={errors.consent?.message} />
          </div>
        </div>

        {submitAttempted && errorCount > 0 && (
          <div role="alert" className="mt-8 flex items-start gap-3 rounded-2xl bg-error-bg p-5 text-error">
            <DangerTriangleOutlineIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p className="font-medium">
              {errorCount === 1 ? "One answer needs checking." : `${errorCount} answers need checking.`} They&apos;re highlighted above.
            </p>
          </div>
        )}

        {status.kind === "error" && (
          <div role="alert" className="mt-8 flex items-start gap-3 rounded-2xl bg-error-bg p-5 text-error">
            <DangerTriangleOutlineIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p className="font-medium">{status.message}</p>
          </div>
        )}

        {status.kind === "not_configured" && (
          <div role="alert" className="mt-8 rounded-2xl border border-line bg-paper p-6">
            <p className="font-bold text-navy">Online quote requests aren&apos;t switched on yet.</p>
            <p className="mt-2 text-muted-strong">
              Sorry, your request hasn&apos;t been sent. Your answers are still here, but for now please contact us directly and
              we&apos;ll give you a free written quote:
            </p>
            <ContactFallback />
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row-reverse sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={working} aria-live="polite" className="w-full sm:w-auto">
            {working ? (
              <>
                <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
                {status.label}
              </>
            ) : (
              <>
                Send my quote request
                <ArrowRightOutlineIcon className="size-5" aria-hidden />
              </>
            )}
          </Button>
          <span className="text-center text-sm text-muted sm:text-left">Takes about 3 minutes</span>
        </div>
      </form>
    </div>
  );
}

function FormSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`${id}-title`} className="mt-10 border-t border-line pt-8 first-of-type:border-t-0">
      <h3 id={`${id}-title`} className="font-sans text-lg font-bold text-navy">
        {title}
      </h3>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function RadioCard({
  name,
  value,
  label,
  hint,
  invalid,
  register,
}: {
  name: string;
  value: string;
  label: string;
  hint: string;
  invalid: boolean;
  register: ReturnType<ReturnType<typeof useForm<QuoteRequestInput, unknown, QuoteRequest>>["register"]>;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors hover:border-navy has-[:checked]:border-green has-[:checked]:bg-mint has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-green",
        invalid ? "border-error" : "border-line",
      )}
    >
      <input type="radio" value={value} className="mt-1 size-4 shrink-0 accent-green" aria-describedby={`${name}-error`} {...register} />
      <span>
        <span className="block font-semibold text-navy">{label}</span>
        <span className="mt-0.5 block text-sm text-muted-strong">{hint}</span>
      </span>
    </label>
  );
}

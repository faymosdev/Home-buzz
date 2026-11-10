"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightOutlineIcon, CheckCircleBoldIcon, DangerTriangleOutlineIcon } from "@solar-icons/react";
import Link from "next/link";
import { submitContactMessage } from "@/app/actions/enquiries";
import { Button } from "@/components/ui/button";
import { Field, FieldError, Input, Select, Textarea, describedBy } from "@/components/ui/field";
import { contactSchema, contactTopics, type ContactInput, type ContactMessage } from "@/lib/validation/contact";
import { ContactFallback } from "./contact-fallback";

type Status = { kind: "idle" } | { kind: "success"; reference: string } | { kind: "not_configured" } | { kind: "error"; message: string };

export function ContactForm() {
  const params = useSearchParams();
  const presetTopic = contactTopics.find((t) => t.value === params.get("topic"))?.value;
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput, unknown, ContactMessage>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", phone: "", topic: presetTopic ?? "general", message: "", website: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const result = await submitContactMessage(values);
    if (result.ok) setStatus({ kind: "success", reference: result.data.reference });
    else if (result.code === "not_configured") setStatus({ kind: "not_configured" });
    else setStatus({ kind: "error", message: result.message });
  });

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-[2rem] border border-line bg-white p-8 sm:p-10">
        <CheckCircleBoldIcon className="size-12 text-green" aria-hidden />
        <h2 className="mt-5 text-h3">Message sent. Thank you.</h2>
        <p className="mt-3 text-muted-strong">
          Your reference is <strong className="text-navy tabular">{status.reference}</strong>. We&apos;ll reply the way you asked
          as soon as we can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-line bg-white p-6 sm:p-10" aria-busy={isSubmitting}>
      <h2 className="text-h3">Send us a message</h2>
      <p className="mt-2 text-muted-strong">
        Looking for a price? The{" "}
        <Link href="/get-a-quote" className="font-semibold text-green underline underline-offset-2">
          quote form
        </Link>{" "}
        is quicker and lets you add photos.
      </p>
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="c-website">Leave this field empty</label>
        <input id="c-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="c-name" label="Your name" error={errors.name?.message}>
          <Input id="c-name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={describedBy("c-name", { error: true })} {...register("name")} />
        </Field>
        <Field id="c-email" label="Email address" error={errors.email?.message}>
          <Input id="c-email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={describedBy("c-email", { error: true })} {...register("email")} />
        </Field>
        <Field id="c-phone" label="Phone number" optional error={errors.phone?.message}>
          <Input id="c-phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={describedBy("c-phone", { error: true })} {...register("phone")} />
        </Field>
        <Field id="c-topic" label="What's it about?" error={errors.topic?.message}>
          <Select id="c-topic" aria-invalid={!!errors.topic} aria-describedby={describedBy("c-topic", { error: true })} {...register("topic")}>
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field id="c-message" label="Your message" error={errors.message?.message} className="sm:col-span-2">
          <Textarea id="c-message" aria-invalid={!!errors.message} aria-describedby={describedBy("c-message", { error: true })} {...register("message")} />
        </Field>
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" className="mt-1 size-5 shrink-0 accent-green" aria-invalid={!!errors.consent} aria-describedby="c-consent-error" {...register("consent")} />
            <span className="text-[0.9375rem]">
              I agree that Homebuzz can store these details and contact me about my message. See our{" "}
              <Link href="/privacy" className="font-semibold text-navy underline underline-offset-2">
                privacy policy
              </Link>
              .
            </span>
          </label>
          <FieldError id="c-consent-error" message={errors.consent?.message} />
        </div>
      </div>

      {status.kind === "error" && (
        <div role="alert" className="mt-6 flex items-start gap-3 rounded-2xl bg-error-bg p-5 text-error">
          <DangerTriangleOutlineIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p className="font-medium">{status.message}</p>
        </div>
      )}
      {status.kind === "not_configured" && (
        <div role="alert" className="mt-6 rounded-2xl border border-line bg-paper p-6">
          <p className="font-bold text-navy">The contact form isn&apos;t switched on yet.</p>
          <p className="mt-2 text-muted-strong">Your message hasn&apos;t been sent. Please contact us directly for now:</p>
          <ContactFallback />
        </div>
      )}

      <Button type="submit" size="lg" className="mt-8" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRightOutlineIcon className="size-5" aria-hidden />
          </>
        )}
      </Button>
    </form>
  );
}

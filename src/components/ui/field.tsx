import * as React from "react";
import { DangerTriangleOutlineIcon } from "@solar-icons/react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-2xl border bg-white px-4 text-base text-ink placeholder:text-muted transition-[border-color,box-shadow] duration-150 outline-none focus-visible:outline-none focus:border-green focus:ring-2 focus:ring-green/25 aria-[invalid=true]:border-error aria-[invalid=true]:focus:ring-error/20 disabled:bg-paper";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(controlBase, "h-13 border-line", className)} {...props} />;
  },
);

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return <textarea ref={ref} className={cn(controlBase, "min-h-36 border-line py-3 leading-relaxed", className)} {...props} />;
  },
);

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ className, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(controlBase, "h-13 appearance-none border-line pr-11", className)}
          {...props}
        >
          {children}
        </select>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-navy"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  },
);

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * Label + control + hint + error. The control must set
 * `id`, `aria-invalid` and `aria-describedby={describedBy(id, ...)}`.
 */
export function Field({ id, label, hint, error, optional, children, className }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.9375rem] font-semibold text-navy">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p id={id} aria-live="polite" className={cn("text-sm font-medium text-error", !message && "sr-only")}>
      {message && (
        <span className="inline-flex items-start gap-1.5">
          <DangerTriangleOutlineIcon className="mt-0.5 size-4" aria-hidden />
          {message}
        </span>
      )}
    </p>
  );
}

export function describedBy(id: string, { hint, error }: { hint?: boolean; error?: boolean }) {
  return [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
}

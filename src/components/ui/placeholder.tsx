import { PenOutlineIcon } from "@solar-icons/react";
import { cn } from "@/lib/utils";

/**
 * A clearly marked stand-in for business details that haven't been confirmed
 * yet (phone, email, registrations, bios…). Search the codebase for
 * `<Placeholder` or set the value in src/config/site.ts to replace it.
 */
export function Placeholder({ children, className, block = false }: { children: React.ReactNode; className?: string; block?: boolean }) {
  const Tag = block ? "div" : "span";
  return (
    <Tag
      className={cn(
        "rounded-xl border border-dashed border-current/45 text-[0.9em] italic opacity-85",
        block ? "flex items-start gap-2.5 p-4" : "inline-flex items-center gap-1.5 px-2 py-0.5",
        className,
      )}
    >
      <PenOutlineIcon aria-hidden className={cn("shrink-0", block ? "mt-1 size-4" : "size-3.5")} />
      <span>
        <span className="sr-only">Placeholder: </span>
        {children}
      </span>
    </Tag>
  );
}

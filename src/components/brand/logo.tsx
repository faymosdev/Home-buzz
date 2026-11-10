import { cn } from "@/lib/utils";

/** The Homebuzz mark: a roofline sheltering a leaf, set in a leaf-cut tile. */
export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-10", className)}>
      <path d="M0 14C0 6.27 6.27 0 14 0h22a4 4 0 0 1 4 4v22c0 7.73-6.27 14-14 14H4a4 4 0 0 1-4-4V14Z" fill={inverted ? "#FFFFFF" : "#1B3A5C"} />
      <path d="M9.5 19.5 20 11l10.5 8.5" fill="none" stroke={inverted ? "#1B3A5C" : "#FFFFFF"} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 31c-4.6 0-7.2-3-7.2-6.6 5.4 0 8.6 1.4 7.2 6.6Zm0 0c4.6 0 7.2-3 7.2-6.6-5.4 0-8.6 1.4-7.2 6.6Z" fill={inverted ? "#1F5C3A" : "#9CC3A8"} />
      <path d="M20 31v-6.5" stroke={inverted ? "#1F5C3A" : "#9CC3A8"} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark inverted={inverted} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.375rem] font-semibold tracking-tight", inverted ? "text-white" : "text-navy")}>
          Homebuzz
        </span>
        <span className={cn("mt-1 text-[0.625rem] font-bold tracking-[0.16em] uppercase", inverted ? "text-green-300" : "text-green")}>
          Gardening Services
        </span>
      </span>
    </span>
  );
}

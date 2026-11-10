import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * One button system for the whole site. Always rounded-full, never shadowed.
 * `primary` (green) is the single action colour — use it for quote CTAs.
 */
const baseButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,border-color,transform] duration-150 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-green text-white hover:bg-green-700",
        navy: "bg-navy text-white hover:bg-navy-900",
        outline: "border border-navy/25 text-navy hover:border-navy hover:bg-white",
        ghost: "text-navy hover:bg-mint",
        light: "bg-white text-navy hover:bg-mint",
        "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[0.9375rem]",
        lg: "h-14 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = VariantProps<typeof baseButtonVariants> & { className?: string };

/** cva output passed through tailwind-merge, so `className` overrides (e.g. `hidden`) always win. */
export const buttonVariants = ({ className, ...props }: ButtonVariantProps = {}) => cn(baseButtonVariants(props), className);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof baseButtonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={buttonVariants({ variant, size, className })} {...props} />;
}

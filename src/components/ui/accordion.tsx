"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("border-b border-line", className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-navy transition-colors hover:text-green",
          className,
        )}
        {...props}
      >
        {children}
        <span
          aria-hidden
          className="relative grid size-9 shrink-0 place-items-center rounded-full border border-navy/20 transition-colors group-hover:border-green group-data-[state=open]:border-green group-data-[state=open]:bg-green"
        >
          <span className="absolute h-0.5 w-3.5 rounded bg-current group-data-[state=open]:bg-white" />
          <span className="absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-200 group-data-[state=open]:scale-y-0" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-[accordion-up_180ms_ease-out] data-[state=open]:animate-[accordion-down_220ms_ease-out]"
      {...props}
    >
      <div className={cn("max-w-[68ch] pb-6 text-muted-strong", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

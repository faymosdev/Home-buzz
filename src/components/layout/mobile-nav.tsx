"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AltArrowRightOutlineIcon, CloseCircleOutlineIcon, HamburgerMenuOutlineIcon } from "@solar-icons/react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { mainNav, primaryCta } from "@/config/navigation";
import { site } from "@/config/site";
import { cn, telHref } from "@/lib/utils";
import { isActive } from "./nav-links";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={buttonVariants({ variant: "outline", size: "icon", className: "lg:hidden" })} aria-label="Open menu">
        <HamburgerMenuOutlineIcon className="size-6" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy-950/40 data-[state=open]:animate-[fade-in_180ms_ease-out]" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-paper data-[state=open]:animate-[slide-in_240ms_cubic-bezier(0.2,0.8,0.2,1)]">
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo />
            <Dialog.Close className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label="Close menu">
              <CloseCircleOutlineIcon className="size-7" aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <Dialog.Description className="sr-only">Site navigation</Dialog.Description>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <ul className="flex flex-col">
              <li>
                <MobileLink href="/" label="Home" active={pathname === "/"} onNavigate={() => setOpen(false)} />
              </li>
              {mainNav.map((item) => (
                <li key={item.href}>
                  <MobileLink {...item} active={isActive(pathname, item.href)} onNavigate={() => setOpen(false)} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-3 border-t border-line p-4 sm:p-6">
            <Link href={primaryCta.href} onClick={() => setOpen(false)} className={buttonVariants({ size: "lg", className: "w-full" })}>
              {primaryCta.label}
            </Link>
            {site.contact.phone && (
              <a href={telHref(site.contact.phone)} className={buttonVariants({ variant: "outline", size: "lg", className: "w-full" })}>
                Call {site.contact.phone}
              </a>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MobileLink({ href, label, active, onNavigate }: { href: string; label: string; active: boolean; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-semibold transition-colors",
        active ? "bg-mint text-green" : "text-navy hover:bg-mint/60",
      )}
    >
      {label}
      <AltArrowRightOutlineIcon className="size-5" aria-hidden />
    </Link>
  );
}

import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { mainNav, primaryCta } from "@/config/navigation";
import { site } from "@/config/site";
import { Container } from "./container";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md supports-[backdrop-filter]:bg-paper/80">
      {site.launch.show && (
        <div className="bg-navy text-center text-[0.8125rem] font-medium text-white">
          <Container className="py-2">
            <p>{site.launch.message}</p>
          </Container>
        </div>
      )}
      <Container className="flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="shrink-0 rounded-xl" aria-label={`${site.name} — home`}>
          <Logo />
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks items={mainNav} />
        </nav>
        <div className="flex items-center gap-2">
          <Link href={primaryCta.href} className={buttonVariants({ size: "md", className: "hidden sm:inline-flex" })}>
            {primaryCta.label}
          </Link>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

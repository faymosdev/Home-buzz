import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[84rem] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "paper" | "white" | "mint" | "navy";
  labelledBy?: string;
};

const tones = {
  paper: "bg-paper",
  white: "bg-white",
  mint: "bg-mint",
  navy: "on-dark bg-navy-950 text-white [&_h2]:text-white [&_h3]:text-white",
};

export function Section({ id, className, children, tone = "paper", labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-24 lg:py-32", tones[tone], className)}>
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
  as?: "h1" | "h2";
};

export function SectionHeading({ id, eyebrow, title, intro, className, align = "left", dark, as = "h2" }: SectionHeadingProps) {
  const Tag = as;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-4", dark ? "text-green-300" : "text-green")}>{eyebrow}</p>}
      <Tag id={id} className={cn("text-h2", as === "h1" && "text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] leading-[1.03]")}>
        {title}
      </Tag>
      {intro && <div className={cn("mt-5 text-lead", dark ? "text-white/75" : "text-muted-strong")}>{intro}</div>}
    </div>
  );
}

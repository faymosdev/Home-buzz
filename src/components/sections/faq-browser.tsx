"use client";

import * as React from "react";
import Link from "next/link";
import { MagnifierOutlineIcon } from "@solar-icons/react";
import { FaqAccordion } from "@/components/sections/faq-list";
import { faqCategories, faqs, type FaqCategory } from "@/config/faqs";
import { cn } from "@/lib/utils";

/** Searchable, categorised FAQ list. */
export function FaqBrowser() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<FaqCategory | "all">("all");

  const q = query.trim().toLowerCase();
  const results = faqs.filter(
    (f) => (category === "all" || f.category === category) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q)),
  );
  const groups = (category === "all" ? faqCategories : faqCategories.filter((c) => c.id === category))
    .map((c) => ({ ...c, items: results.filter((f) => f.category === c.id) }))
    .filter((g) => g.items.length);

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div className="relative max-w-xl">
          <label htmlFor="faq-search" className="sr-only">
            Search questions
          </label>
          <MagnifierOutlineIcon className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            id="faq-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search, e.g. “discount” or “waste”"
            className="h-14 w-full rounded-full border border-line bg-white pr-5 pl-13 text-base outline-none focus:border-green focus:ring-2 focus:ring-green/25"
            aria-describedby="faq-count"
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          {[{ id: "all" as const, label: "All topics" }, ...faqCategories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={category === c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors active:scale-[0.97]",
                category === c.id ? "border-navy bg-navy text-white" : "border-navy/20 text-navy hover:border-navy",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p id="faq-count" className="text-sm text-muted-strong" aria-live="polite">
          {results.length} {results.length === 1 ? "question" : "questions"}
          {q && ` matching “${query.trim()}”`}
        </p>
      </div>

      {groups.length ? (
        <div className="mt-10 space-y-14">
          {groups.map((g) => (
            <section key={g.id} aria-labelledby={`faq-${g.id}`}>
              <h2 id={`faq-${g.id}`} className="mb-2 text-h3">
                {g.label}
              </h2>
              <FaqAccordion items={g.items} />
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[1.75rem] border border-line bg-white p-8">
          <p className="font-semibold text-navy">No questions match that search.</p>
          <p className="mt-2 text-muted-strong">
            Try a different word, or{" "}
            <Link href="/contact" className="font-semibold text-green underline underline-offset-2">
              ask us directly
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

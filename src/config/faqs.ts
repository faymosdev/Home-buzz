export type FaqCategory = "quotes-pricing" | "the-service" | "waste" | "businesses" | "accessibility";

export const faqCategories: { id: FaqCategory; label: string }[] = [
  { id: "quotes-pricing", label: "Quotes and pricing" },
  { id: "the-service", label: "The service" },
  { id: "waste", label: "Garden waste" },
  { id: "businesses", label: "Landlords and businesses" },
  { id: "accessibility", label: "Older and disabled residents" },
];

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  /** Shown on the homepage FAQ section. */
  home?: boolean;
};

export const faqs: Faq[] = [
  {
    id: "areas",
    question: "What areas do you cover?",
    answer:
      "We cover Belfast and BT postcodes. If you're just outside the city, send us your postcode and we'll tell you honestly whether we can reach you.",
    category: "the-service",
    home: true,
  },
  {
    id: "cost",
    question: "How much does garden clearance cost?",
    answer:
      "As a guide, a small garden tidy-up is usually £60–£120 and a full garden clearance £150–£350 or more. Every garden is different, so your price depends on size, condition, access and how much waste there is. You'll always get a free written quote before any work starts.",
    category: "quotes-pricing",
    home: true,
  },
  {
    id: "free-quotes",
    question: "Do you offer free quotations?",
    answer:
      "Yes. Every quote is free and written down, so you know exactly what's included and what it costs. There's no obligation to go ahead.",
    category: "quotes-pricing",
    home: true,
  },
  {
    id: "upfront",
    question: "Do I need to pay upfront?",
    answer:
      "No. We never ask for payment up front and we never take payment online. You pay once the work is done and you're happy with it.",
    category: "quotes-pricing",
    home: true,
  },
  {
    id: "photos",
    question: "Can I send pictures of my garden?",
    answer:
      "Yes, and it's the quickest way to get a quote. You can upload photos with your quote request. If you'd rather, we can arrange a visit to take a look instead.",
    category: "quotes-pricing",
    home: true,
  },
  {
    id: "landlords",
    question: "Do you work with landlords and letting agents?",
    answer:
      "Yes. We clear gardens between tenancies and can agree regular maintenance across several properties. After assessment you get a fixed price, and we aim for fast turnaround to fit check-out and re-letting deadlines.",
    category: "businesses",
    home: true,
  },
  {
    id: "discounts",
    question: "Do you offer discounts for older and disabled residents?",
    answer:
      "Yes. Eligible older and disabled residents get a discount, and we'll confirm the amount in your written quote. Just let us know when you request a quote.",
    category: "accessibility",
    home: true,
  },
  {
    id: "waste",
    question: "What happens to the garden waste?",
    answer:
      "We take it away with us. Green waste goes to authorised sites for composting and recycling wherever possible. We never fly-tip, and you won't be left with bags to deal with.",
    category: "waste",
    home: true,
  },
  {
    id: "maintenance",
    question: "Can I arrange regular maintenance?",
    answer:
      "Yes. Once your garden is cleared, we can visit fortnightly, monthly or seasonally to keep it that way. Regular visits are usually around £45 each, confirmed in your quote.",
    category: "the-service",
    home: true,
  },
  {
    id: "need-to-be-home",
    question: "Do I need to be home while you work?",
    answer:
      "Not always. As long as we can get into the garden safely, we can work while you're out. We'll agree the details with you beforehand.",
    category: "the-service",
  },
  {
    id: "how-long",
    question: "How quickly can you get to me?",
    answer:
      "It depends on the time of year and the size of the job. When we send your quote we'll give you the earliest dates we can do. For landlords and letting agents we aim for fast turnaround.",
    category: "the-service",
  },
  {
    id: "visit",
    question: "Can someone come and look at the garden first?",
    answer:
      "Yes. If photos don't show the full picture, or you'd simply prefer it, we can arrange a visit before giving you a written quote.",
    category: "accessibility",
  },
  {
    id: "help-asking",
    question: "Can a family member or carer request a quote for me?",
    answer:
      "Of course. Anyone can request a quote on your behalf. Just tell us the best person to speak to about the visit and the price.",
    category: "accessibility",
  },
  {
    id: "brown-bin",
    question: "Can you take waste that won't fit in my brown bin?",
    answer:
      "Yes. Our green waste removal service is for exactly that: bags, branches, turf and cuttings that are too much for the council bin.",
    category: "waste",
  },
  {
    id: "non-garden-waste",
    question: "Do you take household rubbish or building waste?",
    answer:
      "We focus on garden and green waste. If there's other waste in the garden, mention it in your quote request and we'll tell you whether we can help.",
    category: "waste",
  },
  {
    id: "multiple-properties",
    question: "Can you look after several properties for us?",
    answer:
      "Yes. We can agree a schedule across multiple addresses with one point of contact. Business accounts with online repeat bookings are planned for the future.",
    category: "businesses",
  },
  {
    id: "invoicing",
    question: "Do you invoice businesses?",
    answer:
      "Yes. We invoice business customers once the work is complete. We'll agree payment terms with you when we confirm the job.",
    category: "businesses",
  },
];

export const homeFaqs = faqs.filter((f) => f.home);

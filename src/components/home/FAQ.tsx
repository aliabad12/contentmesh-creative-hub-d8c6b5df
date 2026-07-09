import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { useSanity } from "@/integrations/sanity/useSanity";
import { faqQuery } from "@/integrations/sanity/queries";
import { SectionHeader } from "./Services";

type FAQ = { _id: string; question: string; answer: string | PortableTextBlock[]; category?: string };

const FALLBACK: FAQ[] = [
  { _id: "1", question: "How long does production take?", answer: "Most projects ship in 3–7 business days. Larger productions (multi-cut ad campaigns, longform explainers) run 2–3 weeks with clear milestones." },
  { _id: "2", question: "Do you provide revisions?", answer: "Yes. Professional plans include unlimited iterative revisions within scope; Starter includes two rounds. We keep every revision on a shared board." },
  { _id: "3", question: "Can you create AI avatars?", answer: "Absolutely — from talking-head presenters to fully animated characters, in your brand voice and languages." },
  { _id: "4", question: "Can you edit existing videos?", answer: "Yes. Send raw footage and we'll handle assembly, color, sound, motion, and platform cutdowns." },
  { _id: "5", question: "What industries do you work with?", answer: "SaaS, e-commerce, fintech, hospitality, education, entertainment, and B2B services — from seed startups to enterprise." },
  { _id: "6", question: "Do you sign NDAs?", answer: "Standard. We work under NDA by default for new engagements." },
];

export function FAQ_() {
  const faqs = useSanity<FAQ[]>(["sanity", "faq"], faqQuery, FALLBACK);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 sm:py-32">
      <SectionHeader eyebrow="FAQ" title="Answers to what you're probably wondering" />
      <Accordion type="single" collapsible className="mt-14 w-full space-y-3">
        {faqs.map((f) => (
          <AccordionItem
            key={f._id}
            value={f._id}
            className="glass glass-reflect overflow-hidden rounded-2xl border-0 px-5 shadow-glass"
          >
            <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline">
              {f.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-muted-foreground">
              {typeof f.answer === "string" ? f.answer : <PortableText value={f.answer} />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

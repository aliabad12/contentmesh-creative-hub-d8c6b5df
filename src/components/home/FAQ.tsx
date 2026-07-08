import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "./Services";

const FAQ = [
  ["How long does production take?", "Most projects ship in 3–7 business days. Larger productions (multi-cut ad campaigns, longform explainers) run 2–3 weeks with clear milestones."],
  ["Do you provide revisions?", "Yes. Professional plans include unlimited iterative revisions within scope; Starter includes two rounds. We keep every revision on a shared board."],
  ["Can you create AI avatars?", "Absolutely — from talking-head presenters to fully animated characters, in your brand voice and languages."],
  ["Can you edit existing videos?", "Yes. Send raw footage and we'll handle assembly, color, sound, motion, and platform cutdowns."],
  ["What industries do you work with?", "SaaS, e-commerce, fintech, hospitality, education, entertainment, and B2B services — from seed startups to enterprise."],
  ["Do you sign NDAs?", "Standard. We work under NDA by default for new engagements."],
];

export function FAQ_() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <SectionHeader eyebrow="FAQ" title="Answers to what you're probably wondering" />
      <Accordion type="single" collapsible className="mt-12 w-full">
        {FAQ.map(([q, a], i) => (
          <AccordionItem key={q} value={`i-${i}`} className="border-b border-border">
            <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

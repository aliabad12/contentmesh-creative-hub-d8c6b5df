import { defineType, defineField } from "sanity";

export default defineType({
  name: "pricingPlan",
  title: "Pricing Plan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      description: 'e.g. "Starter", "Professional", "Enterprise"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      description: 'e.g. "$1.5k" or "Custom"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isCustomPrice",
      title: "Is Custom Price?",
      type: "boolean",
      description: 'Enable to hide "/mo" suffix (use for "Custom" pricing)',
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "One-line tagline shown below the plan name.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured (Most Popular)",
      type: "boolean",
      description: "Highlights this plan with an orange gradient and a badge.",
      initialValue: false,
    }),
    defineField({
      name: "features",
      title: "Feature List",
      type: "array",
      of: [{ type: "string" }],
      description: "Each item appears as a bullet point with a check icon.",
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "ctaLabel",
      title: "Button Label",
      type: "string",
      initialValue: "Get Quote",
      description: 'Text on the CTA button, e.g. "Get Quote" or "Contact Us"',
    }),
    defineField({
      name: "ctaUrl",
      title: "Button Link",
      type: "string",
      initialValue: "/contact",
      description: 'Internal path or external URL the button links to, e.g. "/contact"',
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (left to right).",
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "price", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle,
      };
    },
  },
});

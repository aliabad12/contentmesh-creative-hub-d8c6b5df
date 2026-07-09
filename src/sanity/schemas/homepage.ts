import { defineType, defineField } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", type: "string" }),
    defineField({ name: "heroTitle", type: "string" }),
    defineField({ name: "heroTitleAccent", type: "string", description: "The gradient-highlighted portion of the title" }),
    defineField({ name: "heroSubtitle", type: "text", rows: 3 }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string" }),
    defineField({ name: "heroPrimaryCtaHref", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", type: "string" }),
    defineField({ name: "heroSecondaryCtaHref", type: "string" }),
    defineField({
      name: "stats",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", type: "number" }),
          defineField({ name: "suffix", type: "string" }),
          defineField({ name: "label", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "whyUs",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", type: "string", description: "Lucide icon name, e.g. Zap, Award" }),
          defineField({ name: "title", type: "string" }),
          defineField({ name: "description", type: "text", rows: 2 }),
        ],
      }],
    }),
    defineField({ name: "ctaTitle", type: "string" }),
    defineField({ name: "ctaTitleAccent", type: "string" }),
    defineField({ name: "ctaSubtitle", type: "text", rows: 2 }),
  ],
  preview: { prepare: () => ({ title: "Homepage" }) },
});

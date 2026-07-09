import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "answer",
      type: "array",
      of: [{ type: "block" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "question", subtitle: "category" } },
});

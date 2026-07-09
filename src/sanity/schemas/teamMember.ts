import { defineType, defineField } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "socials",
      type: "object",
      fields: [
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "twitter", type: "url" }),
      ],
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

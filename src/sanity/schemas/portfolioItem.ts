import { defineType, defineField } from "sanity";

export default defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["AI Ads", "Product Videos", "Animations", "Corporate", "Explainers", "Reels"],
      },
    }),
    defineField({ name: "client", type: "string" }),
    defineField({ name: "completionDate", type: "date" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "thumbnail", type: "image", options: { hotspot: true } }),
    defineField({ name: "videoUrl", type: "url", description: "YouTube / Vimeo / mp4 URL" }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }],
    }),
  ],
});

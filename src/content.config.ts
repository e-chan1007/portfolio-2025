import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/data/certifications" }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string().optional()
  })
});

const works = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/works" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    icon: z.enum(["commandline", "desktop", "library", "phone", "puzzle", "script", "window"]),
    date: z.string().optional(),
    github: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    cover: image().optional(),
    link: z.array(z.object({
      label: z.string(),
      url: z.string()
    }))
  })
});

export const collections = {
  certifications,
  works
}

import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const certifications = defineCollection({
  loader: glob({ pattern: "*/certifications/*.yml", base: "./src/data/" }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string().optional()
  })
});

const works = defineCollection({
  loader: glob({ pattern: "*/works/*.md", base: "./src/data/" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.string().optional(),
    github: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    cover: image().optional(),
    link: z.object({
      label: z.string().optional(),
      url: z.string().optional()
    })
  })
});

export const collections = {
  certifications,
  works
}

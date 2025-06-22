import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const certifications = defineCollection({
  loader: glob({ pattern: "*/certifications/*.yml", base: "./src/data/" }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    date: z.string().optional()
  })
});

export const collections = {
  certifications,
}

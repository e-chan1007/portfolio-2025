import { defineCollection, z } from "astro:content";
import { feedLoader } from "@ascorbic/feed-loader";
import { glob } from "astro/loaders";

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/data/certifications" }),
  schema: z.object({
    title: z.string(),
    issuer: z.string(),
    date: z.string().optional(),
  }),
});

const works = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/works" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      icon: z.string(),
      date: z.string().optional(),
      github: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      cover: image().optional(),
      link: z.array(
        z.object({
          label: z.string(),
          url: z.string(),
        }),
      ),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/data/publications" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      publisher: z.string().optional(),
      date: z.string().optional(),
      cover: image().optional(),
      links: z.array(
        z.object({
          label: z.string(),
          url: z.string(),
        }),
      ),
    }),
});

const links = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/data/links" }),
  schema: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
      description: z.string().optional(),
      icon: z.string().optional(),
    }),
  ),
});

const history = defineCollection({
  loader: glob({ pattern: "*.yml", base: "./src/data/history" }),
  schema: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      icon: z.string(),
      link: z.string().optional(),
      description: z.string().optional(),
    }),
  ),
});

const qiitaFeed = defineCollection({
  loader: feedLoader({
    url: "https://qiita.com/e_chan1007/feed",
  }),
});

const zennFeed = defineCollection({
  loader: feedLoader({
    url: "https://zenn.dev/e_chan1007/feed",
  }),
});

export const collections = {
  certifications,
  history,
  links,
  works,
  publications,
  qiitaFeed,
  zennFeed,
};

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Treatment collection - supports dual locations
const zabiegi = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/zabiegi' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locations: z.array(z.enum(['pruszkow', 'ostroleka'])),
    duration: z.string().optional(),
    category: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    wskazania: z.array(z.string()).optional(),
    przeciwwskazania: z.array(z.string()).optional(),
    przygotowanie_do_zabiegu: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
  }),
});

// Static pages collection
const strony = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/strony' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    location: z.enum(['global', 'pruszkow', 'ostroleka']).default('global'),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
  }),
});

// Partner brands collection
const marki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/marki' }),
  schema: z.object({
    name: z.string(),
    logo: z.string(),
    url: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = {
  zabiegi,
  strony,
  marki,
};

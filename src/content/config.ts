import { defineCollection, z } from 'astro:content';

// Treatment collection - supports dual locations
const zabiegi = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    locations: z.array(z.enum(['pruszkow', 'ostroleka'])),
    price_pruszkow: z.number().optional(),
    price_ostroleka: z.number().optional(),
    duration: z.string().optional(),
    category: z.string().optional(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
  }),
});

// Static pages collection
const strony = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    location: z.enum(['global', 'pruszkow', 'ostroleka']).default('global'),
  }),
});

// Partner brands collection
const marki = defineCollection({
  type: 'content',
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

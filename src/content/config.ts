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

export const collections = {
  zabiegi,
};

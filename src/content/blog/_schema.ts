import { z } from 'astro:content';

export const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  author: z.string().default('Cleaver Barnes'),
  tags: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
  heroCaption: z.string().optional(),
  updatedDate: z.coerce.date().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

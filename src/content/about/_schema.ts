import { z } from 'astro:content';

export const aboutSchema = z.object({
  title: z.string(),
  description: z.string(),
  lastUpdated: z.date(),
  sections: z.array(z.string()),
  showInNav: z.boolean().default(true)
});

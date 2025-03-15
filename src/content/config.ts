import { defineCollection } from 'astro:content';
import { blogSchema } from './blog/_schema';
import { aboutSchema } from './about/_schema';

const blog = defineCollection({
  type: 'content',
  schema: blogSchema
});

const about = defineCollection({
  type: 'content',
  schema: aboutSchema
});

export const collections = { blog, about };

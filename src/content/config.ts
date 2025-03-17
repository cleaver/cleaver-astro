import { defineCollection } from 'astro:content';
import { blogSchema } from './blog/_schema';
import { aboutSchema } from './about/_schema';
import path from 'path';
import { glob } from 'astro/loaders';
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => {
      const fileName = path.basename(entry, path.extname(entry));
      return `blog/${fileName}`;
    }
  }),
  schema: blogSchema
});

const about = defineCollection({
  type: 'content',
  schema: aboutSchema
});

export const collections = { blog, about };

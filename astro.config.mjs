// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: ['https://cleaver.ca/about-me'],
      filter: (page) => {
        // Exclude draft posts from sitemap
        return !page.includes('/drafts/');
      }
    })
  ],
  site: 'https://cleaver.ca',

  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['anchor'] }
        }
      ]
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});

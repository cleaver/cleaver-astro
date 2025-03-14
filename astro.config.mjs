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

    integrations: [sitemap()],
    site: 'https://cleaver.ca',

    markdown: {
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, {
                behavior: 'append',
                properties: { className: ['anchor'] }
            }]
        ],
        shikiConfig: {
            theme: 'github-dark',
            wrap: true
        }
    }
});
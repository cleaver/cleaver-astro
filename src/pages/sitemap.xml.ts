import { getCollection } from 'astro:content';
import { sortPostsByDate } from '../utils/collections';
import type { APIRoute } from 'astro';

const siteURL = 'https://cleaver.ca'; // Ensure this matches your site in astro.config.mjs

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const sortedPosts = sortPostsByDate(posts);

  const postUrls = sortedPosts
    .filter((post) => !post.data.draft) // Exclude draft posts
    .map((post) => {
      const lastMod = post.data.updatedDate || post.data.pubDate;
      return `<url>
        <loc>${siteURL}${post.id}</loc>
        <lastmod>${lastMod.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`;
    })
    .join('');

  // Add custom pages here
  const customPages = [
    `<url>
      <loc>${siteURL}/about-me</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>`,
    `<url>
      <loc>${siteURL}/tags</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.5</priority>
    </url>`
  ].join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteURL}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${postUrls}
  ${customPages}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};

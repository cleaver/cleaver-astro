import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('site URL is required for RSS feed');
  }
  const blog = await getCollection('blog');

  return rss({
    // `<title>` field in output xml
    title: 'cleaver.ca',
    // `<description>` field in output xml
    description: 'A blog by Cleaver Barnes. Web technology and other topics.',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post: CollectionEntry<'blog'>) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: `/${post.id}`,
      description: post.data.description
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`
  });
}

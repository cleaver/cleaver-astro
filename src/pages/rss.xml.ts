import { sortPostsByDate, getPostExcerpt } from '@/utils/collections';
import rss from '@astrojs/rss';
import { getImage } from 'astro:assets';
import type { APIContext } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import { getLocalImageMetadata } from '@/utils/images';

function escapeHtmlAttribute(value: string): string {
  return value.replace(
    /[&<>'\"]/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      })[character] ?? character
  );
}

async function getPostContent(post: CollectionEntry<'blog'>, site: URL): Promise<string> {
  const markdown = post.body.replace('<!-- more -->', '');
  const html = await marked.parse(markdown);

  if (!post.data.heroImage) {
    return html;
  }

  const imageMetadata = await getLocalImageMetadata(post.data.heroImage);
  if (!imageMetadata) {
    throw new Error(`Image ${post.data.heroImage} not found`);
  }

  const optimizedImage = await getImage({ src: imageMetadata, quality: 'high' });
  const imageURL = new URL(optimizedImage.src, site);
  const imageSrc = escapeHtmlAttribute(imageURL.href);
  const alt = escapeHtmlAttribute(post.data.heroCaption || post.data.title);

  return `<p><img src="${imageSrc}" alt="${alt}"></p>${html}`;
}

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('site URL is required for RSS feed');
  }
  const site = context.site;
  const blog = await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => !data.draft);
  const sortedBlog = sortPostsByDate(blog);

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
    items: await Promise.all(
      sortedBlog.map(async (post: CollectionEntry<'blog'>) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        link: `/${post.id}`,
        description: getPostExcerpt(post),
        content: await getPostContent(post, site)
      }))
    ),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`
  });
}

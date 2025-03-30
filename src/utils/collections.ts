import type { CollectionEntry } from 'astro:content';

export function sortPostsByDate(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
  return posts.sort(
    (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) =>
      b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );
}

export function getPostExcerpt(post: CollectionEntry<'blog'>): string {
  return post.body.includes('<!-- more -->')
    ? post.body.split('<!-- more -->')[0].trim()
    : post.data.description;
}

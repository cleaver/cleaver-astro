import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>('/src/images/**/*.{jpeg,jpg,png,gif}');

export async function getLocalImageMetadata(src: string): Promise<ImageMetadata | undefined> {
  const imageImport = images[`/src${src}`];

  return imageImport ? (await imageImport()).default : undefined;
}

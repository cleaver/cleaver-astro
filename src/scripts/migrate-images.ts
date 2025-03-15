import { readdir, readFile, copyFile, mkdir } from 'fs/promises';
import { join, dirname, extname } from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';

const OLD_CONTENT_DIR = 'old-content/blog';
const NEW_IMAGES_DIR = 'src/images';

interface ImageInfo {
  sourcePath: string;
  targetPath: string;
  isHero: boolean;
}

async function getDirectories(path: string) {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
}

async function findImagesInPost(postDir: string): Promise<ImageInfo[]> {
  const postPath = join(OLD_CONTENT_DIR, postDir);
  const files = await readdir(postPath);
  const images: ImageInfo[] = [];

  // Read the markdown file to get the post date
  const mdContent = await readFile(join(postPath, 'index.md'), 'utf-8');
  const { data } = matter(mdContent);
  const pubDate = new Date(data.date);
  const yearMonth = format(pubDate, 'yyyy/MM');

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const isHero = data.hero_image?.includes(file);
      const targetDir = join(NEW_IMAGES_DIR, yearMonth, isHero ? 'hero-images' : 'content-images');

      images.push({
        sourcePath: join(postPath, file),
        targetPath: join(targetDir, file),
        isHero
      });
    }
  }

  return images;
}

async function migrateImages() {
  try {
    // Get all post directories
    const postDirs = await getDirectories(OLD_CONTENT_DIR);
    const allImages: ImageInfo[] = [];

    // Find all images in all posts
    for (const postDir of postDirs) {
      const images = await findImagesInPost(postDir);
      allImages.push(...images);
    }

    // Create directories and copy images
    for (const image of allImages) {
      const targetDir = dirname(image.targetPath);
      await mkdir(targetDir, { recursive: true });
      await copyFile(image.sourcePath, image.targetPath);
      console.log(`Migrated: ${image.sourcePath} -> ${image.targetPath}`);
    }

    console.log('\nMigration summary:');
    console.log(`Total images migrated: ${allImages.length}`);
    console.log(`Hero images: ${allImages.filter((img) => img.isHero).length}`);
    console.log(`Content images: ${allImages.filter((img) => !img.isHero).length}`);
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration
migrateImages();

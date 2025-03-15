import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import matter from 'gray-matter';
import { format, parse } from 'date-fns';

const OLD_CONTENT_DIR = 'old-content/blog';
const NEW_CONTENT_DIR = 'src/content/blog/posts';

interface BlogPost {
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  tags: string[];
  heroImage?: string;
  heroCaption?: string;
  draft: boolean;
}

async function getDirectories(path: string) {
  const entries = await readdir(path, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((dir) => dir.name);
}

async function processPost(postDir: string) {
  const postPath = join(OLD_CONTENT_DIR, postDir, 'index.md');
  const content = await readFile(postPath, 'utf-8');
  const { data, content: markdown } = matter(content);

  // Convert date string to Date object
  const dateStr = data.date as string;
  const pubDate = new Date(dateStr);

  // Create new post data
  const newPost: BlogPost = {
    title: data.title,
    description: data.description,
    pubDate,
    author: data.author || 'Cleaver Barnes',
    tags: data.tags || [],
    draft: false
  };

  // Handle hero image if it exists
  if (data.hero_image) {
    const imageFileName = data.hero_image.replace('./', '');
    const yearMonth = format(pubDate, 'yyyy/MM');
    const newImagePath = `/images/${yearMonth}/hero-images/${imageFileName}`;
    newPost.heroImage = newImagePath;

    if (data.hero_caption) {
      newPost.heroCaption = data.hero_caption;
    }
  }

  // Create new frontmatter
  const newFrontmatter = {
    ...newPost,
    pubDate: format(pubDate, 'yyyy-MM-dd')
  };

  // Create new markdown content
  const newContent = matter.stringify(markdown, newFrontmatter);

  // Create new file path
  const yearMonth = format(pubDate, 'yyyy/MM');
  const newDir = join(NEW_CONTENT_DIR, yearMonth);
  const newPath = join(newDir, `${postDir}.md`);

  // Ensure directory exists
  await mkdir(dirname(newPath), { recursive: true });

  // Write new file
  await writeFile(newPath, newContent);

  console.log(`Migrated: ${postDir} -> ${newPath}`);
}

async function migrateContent() {
  try {
    // Get all post directories
    const postDirs = await getDirectories(OLD_CONTENT_DIR);

    // Process each post
    for (const postDir of postDirs) {
      await processPost(postDir);
    }

    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration
migrateContent();

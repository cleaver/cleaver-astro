import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const BLOG_DIR = 'src/content/blog/posts';

// Define schema matching the blog schema
const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.string(), // We'll do manual date validation since it's stored as string in frontmatter
  author: z.string(),
  tags: z.array(z.string()).default([]),
  heroImage: z.string().optional(),
  heroCaption: z.string().optional(),
  updatedDate: z.string().optional(), // Also stored as string in frontmatter
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

interface ValidationIssue {
  file: string;
  errors: string[];
  warnings: string[];
}

async function* walkDir(dir: string): AsyncGenerator<string> {
  const files = await readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const path = join(dir, file.name);
    if (file.isDirectory()) {
      yield* walkDir(path);
    } else if (file.name.endsWith('.md')) {
      yield path;
    }
  }
}

function validateDate(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

async function validatePost(filePath: string): Promise<ValidationIssue | null> {
  const content = await readFile(filePath, 'utf-8');
  const { data } = matter(content);
  const issues: ValidationIssue = {
    file: filePath,
    errors: [],
    warnings: []
  };

  // Validate against schema
  try {
    blogSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        issues.errors.push(`Missing or invalid ${err.path.join('.')}: ${err.message}`);
      });
    }
  }

  // Additional date validations
  if (!validateDate(data.pubDate)) {
    issues.errors.push('Invalid pubDate format');
  }
  if (data.updatedDate && !validateDate(data.updatedDate)) {
    issues.errors.push('Invalid updatedDate format');
  }

  // Additional warnings
  if (!data.description || data.description.length < 50) {
    issues.warnings.push('Description is too short (should be 50+ characters)');
  }
  if (data.description && data.description.length > 160) {
    issues.warnings.push('Description is too long (should be under 160 characters for SEO)');
  }
  if (data.heroImage && !data.heroCaption) {
    issues.warnings.push('Hero image present but missing caption');
  }
  if (!data.tags || data.tags.length === 0) {
    issues.warnings.push('No tags specified');
  }

  return issues.errors.length > 0 || issues.warnings.length > 0 ? issues : null;
}

async function main() {
  let hasErrors = false;
  console.log('Validating blog posts...\n');

  for await (const filePath of walkDir(BLOG_DIR)) {
    const issues = await validatePost(filePath);
    if (issues) {
      hasErrors = hasErrors || issues.errors.length > 0;
      console.log(`\nFile: ${issues.file}`);
      if (issues.errors.length > 0) {
        console.log('Errors:');
        issues.errors.forEach((err) => console.log(`  - ${err}`));
      }
      if (issues.warnings.length > 0) {
        console.log('Warnings:');
        issues.warnings.forEach((warn) => console.log(`  - ${warn}`));
      }
    }
  }

  if (!hasErrors) {
    console.log('\n✅ All blog posts have required metadata fields');
    process.exit(0);
  } else {
    console.log('\n❌ Some blog posts have validation errors');
    process.exit(1);
  }
}

main();

# Findings

Research notes for the cleaver.ca typography and social metadata pass.

## Initial repository findings

- Astro 5 site with static content collections, Tailwind utility classes, and a global stylesheet; no UI framework beyond the existing Astro/Tailwind setup.
- `astro.config.mjs` already defines `site: 'https://cleaver.ca'`; the blog route derives canonical URLs from `Astro.site`.
- Reusable `src/components/meta/SEO.astro` already emits basic description, canonical, Open Graph, Twitter, JSON-LD, sitemap, and RSS tags, but needs alignment with the requested metadata shape and article data.
- Article markup is split between `src/pages/blog/[id].astro`, `src/components/blog/BlogPost.astro`, and `src/components/layout/Prose.astro`; homepage entries use `ArticleCard.astro` / `BlogPostTitleLink.astro`.
- Blog schema and frontmatter must be inspected before deciding whether author, modified date, tags, and image alt/metadata are available.
- Existing planning files are untracked working artifacts; no pre-existing user changes were reported by `git status`.

## Architecture and current behavior

- The CSS wordmark is `.main-heading` in `src/styles/global.css`, rendered by `Header.astro`; it must remain untouched.
- Article body content is rendered through `Prose.astro`, currently using Tailwind Typography defaults with a too-small H1 override and `max-w-4xl`.
- Article pages use `max-w-4xl` around the header, image, prose, and related content; the body can be narrowed independently without changing page structure.
- Homepage previews use `BlogPostPreview.astro` and `ArticleCard.astro`; the title is already first in markup, while image/date/excerpt/read-more hierarchy is mainly controlled by utility classes.
- Blog schema provides `title`, `description`, `pubDate`, optional `updatedDate`, `author`, `tags`, and optional `heroImage`/`heroCaption`. Hero image paths point into `/src/images` and are resolved by `ImageWithCaption.astro` through an `import.meta.glob`.
- `SEO.astro` already centralizes head output, but currently emits a nonexistent `/og-default.png` fallback, relative RSS/sitemap URLs, no image alt/dimensions, no article tags, and JSON-LD without `mainEntityOfPage`.
- The existing dark-mode script and Tailwind dark variants are part of `BaseLayout.astro`; no typography change should alter that behavior.
- Every non-draft blog post currently has a `heroImage` and `heroCaption`; the schema does not have a separate social-image field, so the caption is the available alt text source.
- There is no `public/og-default.png` or other existing social-card image. The implementation should omit `og:image` when no image exists rather than emit a broken placeholder, while keeping the component ready for a future default.
- Image metadata is available locally through Astro's `ImageMetadata`/`getImage` APIs; this can provide absolute generated URLs and reliable width/height during the static build.
- `twitter:*` tags currently use `property` instead of the conventional `name` attribute, and RSS discovery currently uses a relative `/rss.xml` URL.

## Implementation decisions

- Added `src/utils/images.ts` so the existing local-image convention is shared by visible article images and SEO metadata; `SEO.astro` uses `getImage` at build time to emit an absolute generated 1200px-wide social image and reliable dimensions.
- Kept the default social image unset because no real site-wide asset exists. A single typed path placeholder in `SEO.astro` is ready for a future public asset without emitting a broken URL today.
- Added an `article-prose` modifier and scoped typography rules in `global.css`; the existing system font stack, dark-mode variants, page structure, and `.main-heading` wordmark were left intact.
- Homepage preview markup still uses the existing title/image/date/excerpt/read-more sequence and non-card layout; only typography classes were added for hierarchy.
- Generated Shiki markup includes an inline `white-space: pre-wrap`; the prose rule explicitly overrides that with `white-space: pre` and `overflow-x: auto` so long code lines scroll inside the article instead of widening the page.
- The article-specific tag appearance override was later removed at the user's request; blog-page tags use the original filled-pill `Tag` styling again.

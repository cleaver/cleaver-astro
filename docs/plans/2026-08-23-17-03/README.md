# Plan archive: cleaver.ca typography and social metadata pass

- **Plan created:** 2026-08-23 (afternoon; earliest file mtime 16:29 -04:00)
- **Archived:** 2026-08-23 17:03 (-04:00)

## Goal

Improve article and homepage typography while preserving the site's existing visual character, CSS wordmark, structure, dark mode, accessibility, and static performance. Add complete reusable social metadata, RSS discovery, and minimal BlogPosting JSON-LD.

## What was accomplished

- Implemented scoped article/homepage typography via an `article-prose` modifier in `global.css`; system font stack, dark mode, page structure, and the `.main-heading` CSS wordmark left untouched.
- Added `src/utils/images.ts` to share local-image metadata between visible article images and SEO output.
- Extended `SEO.astro`: absolute canonical/social/RSS URLs, a build-time-resolved 1200px-wide generated social image with width/height, complete article tags/dates/image alt metadata, `twitter:*` switched to `name` attributes, RSS autodiscovery made absolute, and minimal BlogPosting JSON-LD (default social image intentionally unset until a real asset exists).
- Code blocks contained with `white-space: pre` + horizontal scroll so long lines don't widen pages.
- Reverted an article-only tag styling override on follow-up request; blog-page tags keep the original filled-pill styling.

## Verification

- Final `npm run build` passed (66 pages, 0 errors); `npm run lint`, `npm run typecheck`, targeted Prettier check, and `git diff --check` all passed. Only pre-existing hint: unused `sitemap` import in `astro.config.mjs`.

## Notes / findings

- No site-wide social-card image existed; `og:image` is omitted rather than emitting a broken placeholder. A typed placeholder in `SEO.astro` is ready for a future default.
- Repository-wide Prettier is blocked by legacy code examples in Markdown/`.cursor-requirements.md` — only changed files are checked.

## Links

- Planning files were untracked working artifacts (not committed), so no commits correspond directly to this plan; related implementation changes are in this repository's working history around 2026-08-23.

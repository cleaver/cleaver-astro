# Task Plan: Add Projects Page

## Goal

Implement a free-form Projects page on the site, place it after Blog in the top navigation, keep Blog as the home page, and follow existing conventions.

## Current Phase

Phase 5: Testing & Verification

## Phases

### Phase 1: Requirements & Discovery

- [x] Capture the user's stated requirements
- [x] Inspect repository guidance and current site structure
- [x] Identify the About page, Blog/home routing, navigation, content conventions, and tests
- **Status:** complete

### Phase 2: Planning & Documentation

- [x] Define the minimal implementation approach
- [x] Record affected files, content assumptions, and validation steps
- [x] Resolve or surface any material open questions
- **Status:** complete

### Phase 3: Plan Review & Handoff

- [x] Cross-check the plan against the repository
- [x] Ensure planning docs are self-contained and implementation-ready
- [x] Summarize the result for the user
- **Status:** complete

### Phase 4: Implementation

- [x] Create the standalone Projects Markdown page
- [x] Insert Projects into the shared navigation
- [x] Add Projects to the hand-authored sitemap and URL list
- [x] Keep Blog at `/` and RSS unchanged
- **Status:** complete

### Phase 5: Testing & Verification

- [x] Run formatting, lint, typecheck, and build checks
- [x] Inspect generated Projects, navigation, and sitemap output
- [x] Record any errors or pre-existing limitations
- **Status:** complete

## Implementation Status

- The site structure is implemented and validated.
- Publication content remains pending: `src/pages/projects.md` currently has the page heading and a non-rendered authoring note, with no guessed project links or descriptions.

## Implementation Plan

### 1. Add the free-form page

- Create `src/pages/projects.md` so Astro publishes the page at `/projects`.
- Follow `src/pages/about-me.md`: use `../layouts/ProseLayout.astro`, a `title` frontmatter value, one Markdown H1, and ordinary Markdown body content.
- Include a concise `description` frontmatter value so `ProseLayout.astro` can pass useful page metadata to `SEO.astro` (the layout types this field as required even though the older About page omits it).
- Author projects as normal Markdown links with adjacent descriptive text. Paragraphs and headings can be placed anywhere; do not impose a collection schema, card component, or fixed record shape.
- Use the final project copy supplied by the site owner. Do not invent public project claims or ship placeholder links.

### 2. Add Projects to the shared top navigation

- In `src/components/layout/Header.astro`, insert `{ text: 'Projects', href: '/projects' }` immediately after Blog and before About.
- Keep `Navigation.astro` as the shared renderer for desktop and mobile menus, normalizing one trailing slash before its exact-path active comparison.
- Do not change the site logo link or `src/pages/[...page].astro`; `/` must continue to display the Blog index.

### 3. Include the page in site discovery/checks

- Add `/projects` to the `customPages` XML in `src/pages/sitemap.xml.ts`, matching the existing About entry's standalone-page settings unless the owner requests different priority/frequency values.
- Add `/projects` to `urls.txt` so the page is covered wherever the repository's URL list is used for smoke/link checks.
- Do not add Projects to RSS; RSS is intentionally a feed of blog posts.

### 4. Validate the implementation

- Run Prettier on the six touched source/docs files, then run `npm run format:check` if the repository-wide legacy Markdown formatting issue has been resolved; otherwise record the known limitation and verify only touched files.
- Run `npm run lint`, `npm run typecheck`, and `npm run build`.
- Inspect generated output to confirm:
  - `/projects` builds successfully and has the intended title, description, canonical URL, heading, links, and prose.
  - Blog remains available at `/` and its pagination route behavior is unchanged.
  - Header order is Blog, Projects, About in both desktop and mobile markup.
  - Projects receives `aria-current="page"` on `/projects`.
  - `/sitemap.xml` contains `https://cleaver.ca/projects`.
- Manually check the page at narrow and wide viewports, in light and dark modes, focusing on long project names/URLs, link focus visibility, paragraph spacing, and mobile-menu access.

## Acceptance Criteria

- `/projects` is a statically generated, directly navigable standalone page.
- It uses the same layout and prose styling conventions as About.
- Its Markdown frontmatter supplies the page title and description to shared SEO metadata.
- Its content can freely mix project links/descriptions, headings, lists, and paragraphs without code changes or schema constraints.
- The top menu reads Blog, Projects, About on desktop and mobile; Projects is active on its page.
- `/` remains the Blog index, with no redirect or home-route change.
- Projects is present in the hand-authored sitemap and URL check list, but not in RSS.
- Final content contains no invented or placeholder project information.
- Formatting, linting, type checking, build, generated-output checks, and responsive/accessibility spot checks pass or any pre-existing limitation is explicitly recorded.

## Content Prerequisite for Publication

The route and authoring structure are implemented, but before the page can be considered publishable, supply the project names, destination URLs, descriptions, desired ordering, and any introductory/interstitial paragraphs. The current page contains only a heading and a non-rendered authoring note; no project claims or placeholder links are rendered.

## Key Questions

1. How are standalone pages, page metadata, and top-menu links represented today?
2. Is free-form page content authored directly in Astro, Markdown/MDX, or a content collection?
3. What automated checks should verify routing, navigation order, and rendering?
4. Is actual Projects copy required before implementation, or can a clearly marked starter structure be used?

Answers:

1. Standalone prose pages are Markdown files in `src/pages` using `ProseLayout.astro`; top-menu items live in `Header.astro`.
2. Direct Markdown is the established and simplest fit.
3. Use formatting, lint, typecheck, build, generated HTML/XML inspection, and responsive/accessibility spot checks.
4. Final copy is required for a publishable implementation; it can be supplied when implementation begins and does not block this plan.

## Decisions Made

| Decision                                                                           | Rationale                                                                                                                                     |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Plan first, then implement after explicit follow-up                                | The initial request asked for planning docs; the user later authorized implementation                                                         |
| Treat `/projects` as a standalone page and leave the existing home route unchanged | Matches the requested About-like page and preserves Blog as home                                                                              |
| Add Projects between Blog and About                                                | “After Blog” is unambiguous with the current two-item menu                                                                                    |
| Update the custom sitemap and `urls.txt`                                           | The repository manages standalone sitemap entries and smoke-check URLs explicitly                                                             |
| Keep Projects out of RSS                                                           | RSS currently represents blog posts, not general site pages                                                                                   |
| Read Markdown frontmatter in `ProseLayout.astro`                                   | Astro exposes page metadata under `Astro.props.frontmatter`; this ensures Projects and About SEO fields are not silently replaced by defaults |
| Normalize the current pathname in `Navigation.astro`                               | Static routes render with a trailing slash, so exact active-link matching must compare normalized paths                                       |

## Errors Encountered

| Error                                                                                              | Attempt | Resolution                                                                            |
| -------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| Targeted Prettier check reported formatting drift in all three newly created planning files        | 1       | Formatted only the planning files; the repeat check passed                            |
| Repository-wide `npm run format:check` reports 17 pre-existing legacy files                        | 1       | Kept unrelated files unchanged; targeted checks for touched files pass                |
| `npm run typecheck` and `npm run build` stop on three pre-existing diagnostics outside this change | 1       | Record baseline failures; run direct Astro build and inspect generated output         |
| Direct Astro build showed Markdown title/description defaults on Projects                          | 1       | Read `Astro.props.frontmatter` in shared prose layout; rebuild and inspect metadata   |
| Direct output did not mark Projects active because pathname ended in `/`                           | 1       | Normalize one trailing slash in shared navigation; rebuild and inspect `aria-current` |

## Notes

- Re-read this plan before major decisions.
- Preserve unrelated user changes in the worktree.

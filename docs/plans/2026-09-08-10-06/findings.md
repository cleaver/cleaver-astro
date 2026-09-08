# Findings & Decisions: Projects Page

## Requirements

- Add a Projects section as one standalone page, similar in role to About.
- Add Projects to the top menu immediately after Blog.
- Keep Blog as the home page.
- Allow a list of project links and descriptions plus optional paragraphs; content should remain free-form.
- Follow the site's established conventions.
- Produce planning documentation first; implementation may proceed after the plan is reviewed.
- Ask clarifying questions only when repository inspection leaves a material ambiguity.

## Research Findings

- `src/pages/about-me.md` is a direct Markdown page using `src/layouts/ProseLayout.astro`; it demonstrates the existing convention for standalone, free-form prose pages.
- `ProseLayout.astro` wraps Markdown content in the shared base layout and typography component, so ordinary Markdown paragraphs, lists, and links are supported without a bespoke project schema/component.
- The blog index and pagination are served by `src/pages/[...page].astro`; preserving that file and route keeps Blog as the home page.
- `src/components/ui/Navigation.astro` renders a passed array for both desktop and mobile menus; the item source still needs to be located in `Header.astro`.
- The repository has no root `AGENTS.md` and currently has no automated test files visible in the project file list.
- Available verification scripts are `npm run build`, `npm run typecheck`, `npm run lint`, and `npm run format:check`.
- `src/components/layout/Header.astro` owns the top-menu array. It currently orders items as Blog (`/`) and About (`/about-me`), so Projects belongs between them at `/projects`.
- Both desktop and mobile navigation are generated from the same array. Static routes include a trailing slash, so `Navigation.astro` now normalizes one trailing slash before comparing the current path with each href.
- `src/pages/sitemap.xml.ts` manually enumerates standalone pages. `/projects` must be added to `customPages`; it will not appear automatically.
- `urls.txt` lists representative site routes and should gain `/projects` for URL checking.
- `src/pages/rss.xml.ts` intentionally maps only blog collection entries, so the Projects page should not be added to RSS.
- `astro.config.mjs` sets the production origin to `https://cleaver.ca`; this determines the expected canonical and sitemap URL.
- Prior project notes record that repository-wide Prettier may fail on legacy Markdown examples. Implementation verification should still format/check touched files and record the limitation if it persists.
- No existing project inventory or project-specific copy was found in local history or current content, so implementation uses an empty Markdown body with a non-rendered authoring comment rather than guessing public links or descriptions.
- Direct build inspection showed that `ProseLayout.astro` destructured `title` and `description` directly from `Astro.props`, while Astro supplies Markdown frontmatter under `Astro.props.frontmatter`; this caused both About and Projects to use SEO defaults.
- The minimal fix is to let `ProseLayout.astro` prefer `frontmatter.title`/`frontmatter.description` while retaining direct prop fallbacks for compatibility.
- Generated `/projects` markup initially lacked `aria-current="page"` because Astro emitted the pathname `/projects/` while nav hrefs use `/projects`; the shared navigation now normalizes that trailing slash.

## Technical Decisions

| Decision                                                            | Rationale                                                                                                                  |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| No implementation changes during planning                           | Keeps this turn aligned with “Make a plan with docs now”                                                                   |
| Prefer a Markdown page using `ProseLayout.astro`                    | This directly matches the About page and supports the requested free-form content naturally                                |
| Do not introduce a content collection or project-specific component | The requested single page does not need structured content, and such infrastructure would work against free-form authoring |
| Create `src/pages/projects.md` for `/projects`                      | Matches Astro's file routing and the About-page convention                                                                 |
| Add a page description in frontmatter                               | `ProseLayout.astro` expects it and passes it to the shared SEO component                                                   |
| Reuse the existing header item array                                | One insertion updates desktop and mobile navigation consistently                                                           |
| Require owner-supplied content before publishing                    | Project names, claims, URLs, and descriptions should not be invented                                                       |
| Keep the initial page body content-ready but empty                  | The requested structure is implemented without publishing guessed or placeholder project information                       |
| Resolve Markdown frontmatter in the shared prose layout             | Ensures the new page's title/description are actually emitted in SEO metadata and corrects the same issue for About        |
| Normalize navigation paths before active comparison                 | Keeps active state correct for static trailing-slash routes in both desktop and mobile menus                               |

## Issues Encountered

| Issue                                                                                                     | Resolution                                                                               |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Initial targeted Prettier check found formatting drift in the three planning documents                    | Formatted only those new documents; repeat verification passed                           |
| Repository-wide format check reports 17 existing legacy files                                             | Left unrelated files unchanged; targeted checks for touched files pass                   |
| Typecheck/build checks report existing errors in `src/scripts/validate-content.ts` and `astro.config.mjs` | New page is not involved; verify with direct Astro build and generated-output inspection |

## Resources

- `task_plan.md`
- `src/pages/about-me.md`
- `src/pages/[...page].astro`
- `src/layouts/ProseLayout.astro`
- `src/components/ui/Navigation.astro`
- `src/components/ui/NavLink.astro`
- `src/components/layout/Header.astro`
- `src/pages/sitemap.xml.ts`
- `src/pages/rss.xml.ts`
- `urls.txt`
- `astro.config.mjs`
- `package.json`

## Visual/Browser Findings

- No browser or visual inspection performed.

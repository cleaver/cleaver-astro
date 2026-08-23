# cleaver.ca typography and social metadata pass

## Goal

Improve article and homepage typography while preserving the site’s existing visual character, CSS wordmark, structure, dark mode, accessibility, and static performance. Add complete reusable social metadata, RSS discovery, and minimal BlogPosting JSON-LD.

## Phases

- [completed] Inspect repository structure, styles, layouts, content schema, article components, and existing metadata/assets.
- [completed] Implement focused typography and reusable head/SEO metadata changes.
- [completed] Build the site and inspect generated HTML/CSS for a representative article and responsive/accessibility regressions.
- [completed] Review diff, document intentional non-changes, and report results.

## Errors Encountered

| Issue                                                                                                                                                                        | Phase        | Resolution / status                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------- |
| Baseline `npm run build` reports one Astro check hint: unused `sitemap` import in `astro.config.mjs`                                                                         | Inspection   | Existing unrelated warning; leave for focused pass unless verification requires cleanup.      |
| Repository-wide Prettier check parses legacy code examples in Markdown and `.cursor-requirements.md` as source and fails; it also reports formatting drift in existing files | Verification | Run Prettier on the files changed for this pass only, then record repository-wide limitation. |

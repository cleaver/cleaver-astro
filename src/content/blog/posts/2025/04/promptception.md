---
title: Promptception - Building this Site with Cursor
description: >-
  A complete rewrite of my site using Claude and Cursor.
pubDate: '2025-04-24'
author: Cleaver Barnes
tags:
  - Astro
  - Typescript
  - AI coding
  - Cursor
featured: false
draft: true
heroImage: /images/2025/04/hero-images/hanging-leaves.jpg
heroCaption: Autumn leaves hanging on a string.
---

I used Claude to create a [detailed set of requirements](https://github.com/cleaver/cleaver-astro/blob/main/.cursor-requirements.md). This is a real strong point for generative AI. The document was far more complete than I would ever write for a personal website.

I used a [fairly long prompt](https://github.com/cleaver/cleaver-astro/blob/main/.prompt-for-requirements.md) to generate the requirements. I created this long prompt with a fairly simple prompt like this:

> I want to rewrite my website, https://cleaver.ca, in Asto.js. There is basically just a blog with paginated list of articles, a page for each article, and an about page. I want to keep it as simple as possible, with no JS or cookies required. Can you give me a prompt which I could use to create a detailed requirements document.

From the requirements, I then generated set of

Tip: commit every single step.

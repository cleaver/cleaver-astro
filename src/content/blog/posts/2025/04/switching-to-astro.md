---
title: Switching to Astro (With Help From AI)
description: >-
  Moving away from GatsbyJS and redeveloping on Astro. And using AI to do it.
pubDate: '2025-04-23'
author: Cleaver Barnes
tags:
  - Astro
  - GatsbyJS
  - Next
  - Typescript
  - Javascript
  - AI coding
  - Cursor
featured: false
draft: false
heroImage: /images/2025/04/hero-images/hanging-leaves.jpg
heroCaption: Autumn leaves hanging on a string.
---

_Image credit: [Chris Lawton](https://unsplash.com/@chrislawton) on [Unsplash](https://unsplash.com/photos/assorted-color-lear-hanging-decor-5IHz5WhosQE)_

About four years ago, I moved this site from an aging Drupal installation to GatsbyJS. I was happy with the performance, but the whole thing did feel overly complex for a simple blog. Finally in 2025, I'm switching again to Astro. And I used the [Cursor IDE](https://cursor.com/) to build the site.

<!-- more -->

## Why Move Away from Gatsby?

There was a lot to like about Gatsby. The site was blazingly fast and it allowed me to use familiar React syntax. The resulting site is overly complex and I found the API rather cumbersome. The build always seemed fragile and that made me cautious about changing things--even writing new articles, because that would trigger a new build.

Finally, other static site options were getting more attention. I don't think you always need to go for the most popular option, but Gatsby seemed to be dropping fast. [Next.js](https://nextjs.org/) has become the defacto React framework. For a long time, I intended to rewrite in Next. But instead, I chose to use Astro.

## Why Move to Astro?

I've previously built a couple of sites on Astro and I've been quite happy with the developer experience. Especially at the simple end of things Astro makes it very easy to get started.

```astro
---
// /src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { Image } from 'astro:assets';
import mitzy from '../images/mitzy.jpg';
---

<BaseLayout>
  <h1>Home</h1>
  <p>Welcome to my home page.</p>
  <p>
    <Image src={mitzy} alt="A photo of my cat" width={800} />
  </p>
</BaseLayout>
```

_A very simple Astro page_

At its most basic, we already have some attractive features:

- Plain HTML.
- Components with JSX-like syntax.
- Javascript or Typescript.

Additionally:

- Plain CSS can be added to a page or component and classes are automatically prefixed.
- You can easily add Tailwind or other CSS frameworks.
- Markdown files can be served directly--just define a layout.
- The ability to handle collections of markdown files is built-in--([see my source](https://github.com/cleaver/cleaver-astro/blob/main/src/pages/%5B...page%5D.astro)).
- Integrating a headless CMS is well-supported.
- You can have zero JS on the generated page--or minimal JS as I chose for this site.

In short, it feels a lot like the simplicity of writing your first HTML page.

## Why Use AI?

I had started using Cursor and I wasn't doing much more than fancy autocomplete. There are [videos](https://www.youtube.com/watch?v=gXmakVsIbF0) of people creating complex requirements and task lists and letting Cursor grind away and build the site for them. Of course, I wanted to the full vibe coding experience. I was already planning what drink to order when I sat on the beach with AI working away in a sweaty datacentre somewhere.

## How Did It Go?

**tl;dr** Good, not great.

### Promptception

I wanted Cursor to have an ideal starting point, so I went through a long series of prompts before I even opened the editor. I'll write another article with the gory details, but eventually I ended up with a [detailed set of requirements](https://github.com/cleaver/cleaver-astro/blob/main/.cursor-requirements.md) and a [task list](https://github.com/cleaver/cleaver-astro/blob/main/.cursor-tasks.md) and set Cursor to work on things.

### What Went Well?

- **Attention to detail** - The requirements included details on testing, accessibility, and a lot of things that would be easy to overlook.
- **Features** - There were a few features like Related Posts and RSS feed that I probably wouldn't have bother with if coding by hand.
- **Speed** - Cursor was able to do large blocks of code all at once much faster than I could alone.
- **Dark mode** - Thank you AI. I wanted to add this for a long time.

### What Kinda Sucked?

- **Code Quality** - Mixed. Some code was great, some was definitely lacking. It's hard to blame AI for this--it's just a matter of the code it was trained on.
- **Using Latest Versions** - The best examples of AI building something good in one shot were using Next.js and TailwindCSS V3. I was using Astro V5 and TailwindCSS V4. Sometimes Cursor got confused and wrote code for older versions, or something entirely different. Again, it's a matter of the training data. The LLM will be predominantly trained on older versions until more new code is written.
- **Following Instructions** - I found that Cursor worked best when doing one or a few steps at a time from the task list. If I gave it larger chunks at once it would often get stuck.
- **Astro Templates** - The `.astro` template files have three-hyphen (`---`) separators above and below the Javascript code, followed by template markup. Cursor was always leaving out the separators which resulted in errors. This was my biggest frustration.

_Sample prompt trying to get Cursor to include the separators:_

> Please do task 4.2.4 from the `.cursor-tasks.md` <TASKS> document. Refer to the <PRD> for additional information. Don't forget separators on Astro templates: `---`. On completion, run `npm run build` and confirm that there are no errors.
>
> When you encounter an error on a `*.astro` file, first check that there are `---` separators before and after the typescript section before you do anything else to resolve the error.

## Conclusion

Astro is great. It replaces the use case for Next.js for simpler, less interactive sites. I plan on using it for future projects. This was the biggest success from the whole project.

AI is a useful tool. It can help you get things done faster, but it's nowhere near the "10X" that some of the cheerleaders claim. On the downside it can produce "fluffier" code, meaning that there is more code but not necessarily clear and concise code. I was doing a git commit after every prompt so this resulted in more commits. The fluffier, redundant code and increased number of commits makes the job of reviewing code more demanding.

My recommendations are to first, give Astro a try if you haven't and second, do a project beginning to end with Cursor or other AI tools. They're not a universal productivity boost, but learning to use AI is a skill that will become more and more valuable.

---
title: 'HiddenTabby'
subtitle: 'What I Learned Building a Chrome Extension'
description: >-
  I created a Chrome extension for managing tabs. A browser extension might make the best project if you've never shipped anything before.
pubDate: '2026-11-09'
author: Cleaver Barnes
tags:
  - Browsers
  - Software
  - Shipped
featured: false
draft: false
heroImage: /images/2026/11/hero-images/hidden-tabby.png
heroCaption: HiddenTabby promo image
---

A browser extension might be the best first solo project to ship from beginning to end. I wish I realized this years ago. I've never tried to develop a browser extension before because there was never anything I needed. That is until I created [HiddenTabby](https://hiddentabby.com), a browser extension to manage your tabs.

<!-- more -->

## What Does HiddenTabby Do?

It's easy to end up with dozens of open tabs. This is a problem because tabs consume system resources and too many open can make it harder to focus on what you're currently doing.

HiddenTabby lets you create groups of tabs for a given context. You could create groups for different work projects, personal interests, or topic you're researching.

Say you're working on a work project. You'd have only the relevant tabs for the project open. When work is over, you could switch to another group of tabs for recipes you were planning to try. You select the `Recipes` group--HiddenTabby closes all the work tabs and opens the tabs from the recipes group.

I had been using Firefox and the `Simple Tab Groups` extension to handle this use case. I had been considering using the Brave browser (which supports Chrome extensions), but the lack of a similar extension blocked me from switching. Finally, I decided to build the extension I wanted.

Choosing the name "HiddenTabby" took less than a minute. I thought I should have the word "tab" in the name and this is just what popped out of my brain. It didn't hurt that the name references tabby cats--that opens a lot of potential for the visual design.

## Why Are Browser Extensions Such a Good Project?

The main reason why browser extensions are so good are because they are small. You could code a simple extension in less than a day. That means you can complete all the other release tasks in a reasonable amount of time. It's so easy to ignore all the little tasks you need to do to publish and promote your project.

### A Few Extra Things You'll Need To Do:

I had a mostly-working prototype in about 30 minutes, but there was a lot more work still to do. I left out a lot of things, so this is not a complete checklist:

- Write a short product description and tagline.
- Create a logo and extension icon.
- Produce icon variants at Chrome's required sizes.
- Choose colours, typography, and visual identity.
- Design the extension's interface and onboarding experience.
- Create promotional graphics for the Chrome Web Store.
- Prepare screenshots demonstrating important features.
- Register a Chrome Web Store developer account.
- Pay the one-time developer registration fee.
- Prepare the extension package for submission.
- Select the appropriate category and language.
- Write a privacy policy.
- Explain requested permissions and why they're necessary.
- Test installation and first-run experience.
- Create an animation to show users how to pin the extension to the toolbar.
- Test different screen sizes and operating systems.
- Check behaviour in Chrome and other Chromium-based browsers.
- Prepare a release version and changelog.
- Set up a repeatable process for future releases.
- Create a product landing page or website.
- Link the extension from GitHub, your website, and social profiles.
- Set up a domain and landing page.
- Set up a dedicated email address and support channel.

## How Much AI Did I Use?

I used Codex to write the code, set up tests, CI, and release packaging. After the initial 30 minutes to build a prototype, there were still dozens of iterations to clean up the interface, add features, and fix bugs. Even though I used a lot of AI for coding and generating content, there was still a lot of manual work coordinating everything that needs to be done.

The domain and website were a last-minute decision. When filling out the forms for the Chrome Web Store, I saw a field for a website link. Thanks to Codex, I had a website link ready before I finished submitting the application. It even added a privacy policy before I realized I needed it.

## How Much Work Is There Beyond Coding?

From the perspective of a programmer, you might not realize how much work goes into creating and publishing software beyond just the code. Using a coding agent to develop a complete project ready for the public puts everything into perspective. For a simple project where the code is all written by AI, most of your time goes into all that other stuff.

I wasn't working full time on this, but even spending several hours each day it still took about a week to get ready to submit to the Chrome Web Store.

## The Future of HiddenTabby

There's not really a path to monetizing HiddenTabby. It's free and open source. It's local-only, so there's no server infrastructure to maintain. I created it to scratch my own itch. I don't see the need for any new features required beyond possibly backing up your tabs.

There's not much to do, but I plan to keep supporting HiddenTabby for the foreseeable future.

## Links

- https://github.com/cleaver/hiddentabby - source code.
- https://hiddentabby.com - a landing page (developed in Astro).
- https://github.com/cleaver/hiddentabby-landing - source for the landing page.
- [Chrome Web Store](https://chromewebstore.google.com/detail/hiddentabby/nonjheegmgeonamccahabomomcfjlafh?pli=1)

## AI-Use Declaration

I used AI to create HiddenTabby and related content. In this article, I used AI to help generate the list of tasks based on the history of the project. The rest of this post was written by me.

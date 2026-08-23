---
title: 'The Nephew Effect - Is AI the New Nephew?'
description: >-
  In the past it was, "My newphew built my website", now it's ChatGPT
pubDate: '2026-08-22'
author: Cleaver Barnes
tags:
  - AI
  - Rant
  - opinion
  - Dunning-Kruger
featured: false
draft: false
heroImage: /images/2026/08/hero-images/nephew.jpg
heroCaption: Industrial building.
---

_Photo by <a href="https://unsplash.com/@kshar2">kiryl</a>_

The website building nephew is a bit of a meme, but I've noticed that some people treat AI in almost the same way.

## My Nephew Built My Website

There is a phenomenon I first noticed years ago where _The Boss_ was interested in a website or software project, but happened to chat with his nephew[^1]. It was **always** a nephew. Not a cousin. Not a brother-in-law. Not a hairdresser's boyfriend. Not even a niece. The nephew is almost always a hobbyist, rather than a professional.

It usually went like this:

> "So I was talking to my nephew over the weekend. Smart kid and he's into computers. He says he could probably build this thing in a week using something called PHP."

I thought this was just something I noticed, but it's actually a well-known phenomenon. Just do an internet search for "nephew built my website". You'll find a few gems[^2]. Often the projects don't go so well, but there are a few smart nephews out there.

<!-- more -->

### Why Nephews?

- A nephew is close enough to have a degree of trust and you presume he's not trying to take advantage of you.
- There is a bit more distance in the relationship. Their activity is more novel. Your own children might be doing the same tinkering with computers, but they become almost invisible due to familiarity.
- The nephew is a hobbyist with shallow knowledge of the field. A bit of the [Dunning-Kruger effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect) at work. He speaks with an air of unearned authority.
- The uncle-nephew relationship is a bit more fluid. You see the guy a few times a year, so he's not as locked into a role as is a son, daughter, employee, etc.

The last one is particularly important. Your son or daughter might be a qualified professional, but you saw them every day and still think of the little kid in diapers. Same goes for an employee, who might be viewed as just a subordinate. I did this in reverse. My father was a university professor but part of me saw him as the guy who couldn't operate the [VCR](https://en.wikipedia.org/wiki/Videocassette_recorder). I had less respect for higher education as a result, possibly to my detriment.

## Nephew 2.0: ChatGPT

You've probably heard stories from people whose boss or client runs all their recommendations through ChatGPT[^3]. It could play out like this:

> The Boss: "I got your recommendations, but I thought I'd run it through ChatGPT. Why aren't we using microservices?"
> Employee: "But it's a Wordpress site..."

A lot of the same factors are there. There's enough newness and distance to the relationship to be noticed and appreciated. ChatGPT can certainly speak with a high degree of authority. It seems to be able to get the ear of The Boss better than the golf buddy, the brown-nosing consultant, or even the nephew.

It's not that AI gives bad advice. It's that The Boss gives it authority beyond the context that it has. This is like giving the nephew, smart as he is, authority beyond his knowledge.

## What Should We Do?

As a decision-maker how can you avoid being duped by your nephew or by ChatGPT? I think the answer is understanding context.

### Context

I apply a programmer's mindset to a lot of things so I think about a chatbot in terms of how it works at an API level. In other words, how would I code my own version of ChatGPT? A large language model is a black box from the developer's perspective. Send some context as input and the LLM gives a response.

> system: "You're a helpful assistant. Answer clearly and concisely."
>
> user: "What is the capital of France?"
>
> assistant: "The capital of France is Paris."
>
> user: "What is its population?"

Send this context to an LLM and you'd probably get a response like this:

> "Paris has roughly 2 million residents within the city limits."

You have to send the context with each and every request. If the chat agent just sent _"What is its population?"_ without the preceding dialogue, the LLM would not know what _its_ refers to. Ever helpful, the LLM might respond:

> "I’m not sure what 'its' refers to. Please provide the name of the city or country."

### Context of Your Organization

Anyone working with web technology has had the question: "How much would it cost to build a website?" The answer involves the context of what it needs to do. Is it to show the address and hours for your bakery? Does it need to handle payment and logistics across multiple regions for millions of users? Many zeroes separate the price of those two websites.

The same goes for your organization. Making effective software for an organization requires a lot of context, from the roles and responsibilities of the users through to regulatory and legal concerns. The context that an LLM can handle is limited. All the things you need to know about an organization are not something you can just drop into an AI chatbot.

Can AI be useful in building software? Absolutely!

What it can't do is to take into account context it doesn't have. Dropping a plan into ChatGPT can tell you about errors and inconsistencies. It might even tell you how the plan compares with common patterns and practices it learned during training. It doesn't know your organization, the staff, nor the history of what has worked and what hasn't.

We've always had to manage what we know and don't know when building software. With AI, it becomes more explicit. There's a window of a few hundred thousand tokens to work with, so we need to organize the context correctly to get AI to do its job. Building software is still hard.

## What If You're Not The Boss?

To be honest, I never quite found a way around the nephew when I was trying to influence decision-makers--I'd just move on to the next opportunity and let the nephew work his magic.

If it's _your boss_ and not just a prospect, it will be harder to just move on. It's still an unsolved problem for me and I'd love to hear your ideas. Let me know any strategies you've found.

## To the Nephews

I don't blame you. You were smart and you meant well. You just lacked context.

---

[^1]: In each case the boss was male and it was always a **nephew**. Maybe you need to listen more to your nieces?

[^2]: [Hacker News](https://news.ycombinator.com/item?id=254486)

[^3]: [Ask a Manager: I think my boss is ChatGPT](https://www.askamanager.org/2024/01/i-think-my-boss-is-chatgpt.html)

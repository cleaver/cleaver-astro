---
title: ATP - Agent Trigger Protocol
description: >-
  Thinking about how to make AI agents more useful. Or did I just reinvent webhooks?
pubDate: '2025-07-23'
author: Cleaver Barnes
tags:
  - AI
  - AI Agents
  - ATP
  - MCP
featured: false
draft: false
heroImage: /images/2025/07/hero-images/mixing-board.jpg
heroCaption: Close-up of a mixing board.
---
*Photo by [Alexey Ruban](https://unsplash.com/@intelligenciya) on [Unsplash](https://unsplash.com/photos/selective-focus-photo-of-dj-mixer-73o_FzZ5x-w)-*

*In which I think about how we use agents, or maybe just reinvent webhooks.*

I'm always looking to find ways to become more productive. It's helpful to discuss architectural concepts with a Large Language Model--great for when you don't have a coworker to toss ideas around with. A conversational approach seems best. (EG: "What if we made this service easily overridden in config?") A LLM is lacking in several ways compared to a real flesh-and-blood coworker. For one, they never initiate a conversation with you. Sure coworkers are annoying at times, but don't you want someone to let you know there's doughnuts in the kitchen?

How can we do that with LLMs? How can we have an external event trigger an agent's workflow?  I've done a bit of searching and there doesn't seem to be an accepted solution. Certainly multiple people have come up with solutions, but I haven't found a name for it. Someone has to name it, so I'll take a shot: ATP, or Agent Trigger Protocol.

<!-- more -->

ATP, or adenosine triphosphate, is a compound that is essential to muscle and nerve function. Without it we couldn't move or do anything, so it seems like an appropriate acronym to steal.

## What *is* an Agent, Anyway?

First, what *isn't* an agent. The simplest case of calling an LLM is to send a prompt and then print out the response you receive. Take the case of a single prompt asking for a story.

Adapted from the [OpenAI Docs](https://platform.openai.com/docs/quickstart?api-mode=responses):

```javascript
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-4.1",
    input: "Write a one-sentence bedtime story about the weather."
});

console.log(response.output_text);
```

The conversation could be simplified to the following:

- Me: Write a one-sentence bedtime story about the weather.
- LLM: As the gentle rain sang lullabies against the windowpane, the sleepy world beneath its silvery mist drifted into a cozy, peaceful dream.

There's no opportunity for the agent to gather any extra information, like whether the story is for a child or adult or where the user lives.

Now, what about agents? The best definition I've heard is that an agent is a *while loop with tool calls*. When your agent sends the initial prompt to the LLM, it also lets the model know that there are tools available for it to complete the response. For example, it could have a geolocation service to determine where the user lives and there could be a weather service that can provide information about the current weather at the user's location. Note that the LLM doesn't call the tools--the agent calls the tools at the request of the LLM. 

In this example, the conversation could go like this:

- Me: Write a one-sentence bedtime story about the weather.
- Agent: The user is requesting: "Write a one-sentence bedtime story about the weather." Note that you have the following tools available: user geolocation, current weather lookup by location.
- LLM: What is the user's location?
- Agent: *calls the geolocation service*
- Agent: The user in is Vancouver, BC.
- LLM: What is the current weather in Vancouver, BC.
- Agent: *calls the weather service*
- Agent: The weather in Vancouver is 20ºC and clear. It is just after dark.
- LLM: As the gentle 20ºC breeze drifted through Vancouver's twilight, the clear sky promised sweet dreams beneath a blanket of soft starlight.
- Agent: *repeats the story from the LLM back to me*

You can see that the agent calls the LLM multiple times before it responds. The exact number of times it calls the LLM is up to the LLM itself. If it asked for location but not the weather, it would have been called two times instead of three. Most importantly, the only way initiate the loop is user input. (The one-sentence story is an actual response from the OpenAI API.)

### MCP: Model Context Protocol

In 2024 Anthropic [introduced Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) to formalize how a system can call external tools. Why not formalize the other way around? i.e., How an external tool can call an agent.

## Why Do I Want to Trigger the Agent?

I was writing a little proof of concept app to try out the new [Gemini CLI](https://gemini-cli.dev/) when it was released. I wanted to write a CLI app that would track a few to-do items and then check in with me after an interval. Here is the [initial prompt](https://github.com/cleaver/miles_dev_coach/blob/main/initial-prompt.md), in case you're curious. It wasn't quite an agent, because the loop was essentially hard coded, the LLM couldn't decide whether or not to make a tool call. However, one thing it did that goes beyond a typical agent is that there is an external trigger. I can ask it to check in with me in an hour. It will then set a timer and I get a desktop notification and it triggers the loop.

### Some Other Triggers We Might Want

- An environmental sensor detects that the temperature has changed and that might prompt the agent to ask you if you want to open a window.
- Your helpdesk application logs an urgent ticket. This could trigger an agent to do a quick triage and decide who to page for support.

## What is ATP?

ATP is my name for a proposed standard way to tell an agent to do something. It could be sent over HTTP (basically a fancy webhook), or some other protocol--that's up to you.

### A Proposed Schema

Here’s the basic schema:

```json
{
  "trigger_source": "string",
  "event_type": "string",
  "timestamp": "string",
  "correlation_id": "string",
  "data": {... }
}
```

- `trigger_source`: Where did the event come from? (e.g., "jira_webhook", "scheduler").
- `event_type`: What happened? (e.g., "urgent_bug_reported", "daily_report_due").
- `timestamp`: When did it happen?.
- `correlation_id`: A unique ID to track this specific task as it moves through different systems.
- `data`: The specific details of the event itself.

Consider this to be version `0.1`. I expect things could change. Off the top of my head, there needs to be something to allow the agent to inform the LLM of the significance of the trigger. Telling it "jira" is probably not enough. For example, you'd probably want to tell the LLM that if it's a high priority ticket and it affects production then take action.

## Examples

### Example 1: Triaging an Urgent Bug Report

Let's expand a little on the Jira idea. Without something like ATP, a webhook fires and maybe it posts a generic message to Slack, leaving it up to you to figure out what to do next.

With ATP, the event looks like this:

```json
{
  "trigger_source": "jira_webhook",
  "event_type": "urgent_bug_reported",
  "timestamp": "2025-07-15T16:27:00Z",
  "correlation_id": "uuid-1234-abcd-5678",
  "data": {
    "ticket_id": "PROD-1138",
    "title": "Critical Failure: Authentication service is down",
    "url": "https://jira.example.com/PROD-1138",
    "priority": "High",
    "description": "Users are unable to log in. The main authentication service is completely unresponsive. Cats and dogs living together!"
  }
}
```

Rather than just sending a notification, your agent could take action:

1.  Analyze the `data` payload to identify the "Authentication service."
2.  Check deployment logs for recent changes to that service.
3.  Page the on-call engineer specifically responsible for authentication.
4.  Create a new, dedicated Slack channel, invite the on-call engineer and key stakeholders, and post a summary of the ticket.
5.  If configured to do so, attempt an automated rollback of the last deployment.

This is the difference between simple notification and autonomous action.

### Example 2: Coder Wellness Agent

Remember I started this with wanting to improve productivity? Let's say you have the tendency to sit at your desk too long and want to be sure to stretch your legs once in a while.

At 4:00PM, a scheduler sends the following ATP event:

```json
{
  "trigger_source": "system_scheduler",
  "event_type": "afternoon_wellness_checkin",
  "timestamp": "2025-08-07T12:00:00Z",
  "correlation_id": "uuid-2345-bcde-6789",
  "data": {
    "last_checkin": "2025-08-06T12:00:00Z",
    "notification_channel": "desktop"
  }
}
```

The agent could be configured to ask the LLM for a particular stretch or exercise and you get a desktop notification.

## Summary

There's nothing really ground-breaking to this idea and it's surely been done in many different ways by many different people. But why not do what MCP does, in the opposite direction?

If you have thoughts or you've already built something like this, please let me know on [LinkedIn](https://www.linkedin.com/in/cleaverbarnes/).

### AI Use Transparency

I wrote the article, but most of the JSON was generated based on my sessions with Gemini. The first example was generated, but with substantial edits by me. And yes, I've always used em-dashes.

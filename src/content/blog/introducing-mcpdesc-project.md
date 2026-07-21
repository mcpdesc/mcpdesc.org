---
title: 'Introducing the {mcpdesc} project'
description: 'MCP servers need a portable way to describe what they expose. The {mcpdesc} project proposes an open format that brings API-style lifecycle thinking to MCP.'
date: 2026-07-21
author: Stève Sfartz
draft: false
---

Most MCP servers start small: a local connector, a few tools, a README, and a client configuration. That is often good enough to get an assistant connected and demonstrate quick value.

Once servers become a critical integration layer between AI agents and enterprise systems, new challenges arise:

* What exactly does that MCP server expose today?
* What changed since the previous release?
* Did we add, remove, or change tools?
* Are its tools designed in a consistent way?
* How can we document this server efficiently and accurately?

These are not new questions. API teams have been solving them for years using formalized definitions, linting, documentation generation, changelog automation, and controlled lifecycle.

The {mcpdesc} project brings that same API-style lifecycle thinking to MCP servers.

## Why MCP servers need lifecycle tooling

The Model Context Protocol is built around dynamic discovery: a client connects to a server and discovers its tools, resources, prompts, and transports at runtime. That works well for agents, which need to know a server's capabilities the moment they connect.

But runtime discovery only shows what a server exposes at a specific moment. Teams operating an MCP server also need a durable artifact they can store in Git, review in pull requests, compare across releases, feed into documentation, and use in compliance workflows.

In other words, runtime discovery helps clients understand a server in the moment. Lifecycle tooling helps humans and automation understand how that server evolves over time. That is the space that we are exploring.

## The core idea: capture capabilities as a description

The MCP-lifecycle approach starts with a simple idea:

> Capture the capabilities of a specific MCP server version into a static, machine-readable description.

The approach is inspired by [OpenAPI](https://www.openapis.org/), and adapted to MCP servers. An OpenAPI document does not replace an API implementation — it describes it.

In the same way, an MCP Description document provides a stable artifact describing what a given server version offers:
- its tools, resources, prompts, input and output schemas
- the supported transports,
- security expectations,
- and documentation metadata.

## Experience the format with the Live Editor

We are hosting a Live Editor that lets you quickly preview and update existing MCP Description documents, similar in spirit to the Swagger Editor.

Give it a try — [edit and preview](/live-editor) a description directly in the Live Editor.

## Why descriptions matter

MCP server descriptions are not only useful for documentation — they also create a foundation for quality and compliance workflows. Once a server has a structured description, you can address these challenges:

* Are tool names consistent?
* Are tool descriptions clear enough for both humans and agents?
* Are input schemas precise?
* Are output schemas documented?
* Are transports and security expectations explicit?
* Are breaking changes detected before release?
* Is the documentation accurate, aligned with the actual capabilities of the latest release?

These questions matter because MCP servers are consumed by AI agents. A vague tool description doesn't just confuse a developer reading the docs; it also affects how an agent selects or uses that tool.
We believe high-quality MCP servers should be designed to go beyond runtime correctness — with clarity, consistency, and lifecycle top of mind.

## Where it fits in the ecosystem

The MCP Description format emerged from practical engineering needs — inspecting, comparing, documenting, and governing MCP servers.

The proposed format is not a change to the MCP protocol, and it does not compete with registries, Server Cards, gateways, or inspectors. It **complements** them.

Registries and Server Cards answer *which server this is, who publishes it, and where to find and run it*.

MCP Description documents cover the *full capability set* of an MCP server — tools, resources, prompts, transport, security expectations offered by a particular version of a server.

## Help us improve the format

The MCP Description specification, currently at version 0.7.0, is an open proposal.

Does the MCP ecosystem need a shared, portable way to describe servers? We think the answer is yes — and we would love to evolve it with you.

There are multiple ways to get involved:
- tell us about other benefits or use cases you'd like to see covered,
- contribute your own [tools](/tools) as reference implementations,
- or help us evolve the [specification](/format).

We are looking for feedback from MCP server builders and users, technical writing, compliance and governance teams:

**[Join the conversation](https://github.com/orgs/mcpdesc/discussions)**.

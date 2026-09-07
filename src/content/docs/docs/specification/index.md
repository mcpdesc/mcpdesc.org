---
title: Structure
description: The MCP Description (mcpdesc) specification — versions, status, and the canonical source of truth.
sidebar:
  order: 1
---

The **MCP Description** (`mcpdesc`) specification defines a portable, machine-readable
format for describing the capabilities of a Model Context Protocol (MCP) server — its
tools, resources, prompts, transports, security, and metadata — as a static document.

:::note[Canonical sources]
The stable v0.7 source remains in [`cisco-open/mcptoolkit-contract`](https://github.com/cisco-open/mcptoolkit-contract/tree/mcpdesc-v0.7.0/spec).
Development of v0.8 and later versions is hosted in
[`mcpdesc/mcpdesc-specification`](https://github.com/mcpdesc/mcpdesc-specification).
Where these pages differ from their linked canonical source, the canonical source wins.
:::

## Versions

| Version | Status | |
|---|---|---|
| [**0.8.0 RC.3**](/docs/specification/0.8.0-rc.3/) | Release candidate | **Candidate** |
| [**0.7.0**](/docs/specification/0.7.0/) | Stable | **Latest stable** |

See the [changelog](/docs/specification/changelog) for the full version history, and the
[format overview](/format) for a friendly introduction.

:::tip[Retrieving the spec programmatically]
For AI assistants and build tools, the whole specification is available as a single file and
as a machine-readable index:

- [`/specification/latest/mcpdesc.md`](/specification/latest/mcpdesc.md) — the complete latest
  specification in one Markdown document (per-version: `/specification/<version>/mcpdesc.md`).
- [`/specification/index.json`](/specification/index.json) — every version, the current
  `stable` and `candidate` channels (plus `latest` and `next` compatibility aliases), and
  each version's full-file, canonical source, and schema URLs.
:::

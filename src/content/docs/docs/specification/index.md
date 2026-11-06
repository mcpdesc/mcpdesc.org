---
title: Structure
description: The MCP Description (mcpdesc) specification — versions, status, and the canonical source of truth.
sidebar:
  order: 1
---

The **MCP Description** (`mcpdesc`) specification defines a portable, machine-readable
format for describing the capabilities of a Model Context Protocol (MCP) server — its
tools, resources, prompts, transports, security, and metadata — as a static document.

:::note[Canonical source]
The canonical repository for the MCP Description specification is
[`mcpdesc/mcpdesc-specification`](https://github.com/mcpdesc/mcpdesc-specification). The
historical v0.7.0 release source is archived in
[`cisco-open/mcptoolkit-contract`](https://github.com/cisco-open/mcptoolkit-contract/tree/mcpdesc-v0.7.0/spec).
Where the documentation pages for a specific MCP Description specification differ from its
linked versioned source, that source wins.
:::

## Versions

| Version | Status | |
|---|---|---|
| [**0.9.0-rc.2**](/docs/specification/0.9.0-rc.2/) | Release Candidate | Active candidate; not stable |
| [**0.8.0**](/docs/specification/0.8.0/) | Stable | **Latest stable** |
| [**0.7.0**](/docs/specification/0.7.0/) | Stable | Previous |

The canonical repository retains prior snapshots. See its
[version history](/docs/specification/changelog) and the [format overview](/format).
See the
[validation rules](/docs/rules/) to understand how MCP Description requirements relate to
MCP protocol versions.

:::tip[Retrieving the spec programmatically]
For AI assistants and build tools, the whole specification is available as a single file and
as a machine-readable index:

- [`/specification/latest/mcpdesc.md`](/specification/latest/mcpdesc.md) — the complete latest
  specification in one Markdown document (per-version: `/specification/<version>/mcpdesc.md`).
- [`/specification/index.json`](/specification/index.json) — the current `stable` and
  `candidate` channels (plus `latest` and `next` compatibility aliases), and their full-file,
  canonical source, and schema URLs.
:::

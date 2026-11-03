---
title: "Declare Prompts and arguments with their fields"
description: "A Prompt has a name, and each argument has a name. Both accept only the properties of their Section 11 tables, each with its defined type."
slug: docs/rules/0.9.0-rc.1/mcpdesc/prompt-members
sidebar:
  label: "mcpdesc.prompt.members"
---

A Prompt has a name, and each argument has a name. Both accept only the properties of their Section 11 tables, each with its defined type.


## Requirement

Prompt and Prompt Argument Objects have their required fields, defined property types, and no unknown properties.

## Details

**Rule ID:** `mcpdesc.prompt.members`<br>
**Owner:** mcpdesc<br>
**Surface:** Prompt, PromptArgument<br>
**Kind:** structural<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Document schema locations:** `#/$defs/prompt`, `#/$defs/promptArgument`<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 11.1 and 11.2**
  - 11. Prompts: [req-prompt-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/prompts#req-prompt-fields)
  - 11. Prompts: [req-prompt-argument-fields](https://mcpdesc.org/docs/specification/0.9.0-rc.1/prompts#req-prompt-argument-fields)
  - 13. Tags: [req-entity-tags-shape](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-entity-tags-shape)
  - 13. Tags: [req-entity-tags-unique](https://mcpdesc.org/docs/specification/0.9.0-rc.1/tags#req-entity-tags-unique)




## Examples

### Invalid example

Source: [expected-invalid/empty-ordinary-nested-collections.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/fixtures/expected-invalid/empty-ordinary-nested-collections.json) · Selected: `/prompts/0/arguments`

```json
[]
```

## Rule Source Code

[prompt.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft/validation/rules/prompt.yaml) at immutable tag [`v0.9.0-rc.1`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.1/spec/draft).

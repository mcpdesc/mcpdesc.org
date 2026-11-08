---
title: "Reference unique declared tags"
description: "When the document declares a tag catalogue, primitive tag references must name entries in it. Root tag names and repeated primitive references are checked for duplicates. Fix the n"
slug: docs/rules/0.9.0-rc.3/mcpdesc/tags-references
sidebar:
  label: "mcpdesc.tags.references"
---

When the document declares a tag catalogue, primitive tag references must name entries in it. Root tag names and repeated primitive references are checked for duplicates. Fix the name or catalogue entry instead of relying on an undeclared alias.


## Requirement

Root tag names are unique, and primitives reference only declared tags.

## Details

**Rule ID:** `mcpdesc.tags.references`<br>
**Owner:** mcpdesc<br>
**Surface:** Tag<br>
**Kind:** mcpdesc-semantic<br>
**Requirement level:** must<br>
**Protocol versions:** independent of the MCP protocol version<br>
**Status:** internal · **Enforcement:** internal


## Required by

- **MCP Description 0.9.0, Sections 13.2 and 13.3**
  - 13. Tags: [req-tags-unique](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#req-tags-unique)
  - 13. Tags: [req-tags-references](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#req-tags-references)
  - 9. Tools: [req-tool-tags-references](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tools#req-tool-tags-references)
  - 10. Resources and Resource Templates: [req-resource-tags-references](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-tags-references)
  - 10. Resources and Resource Templates: [req-resource-template-tags-references](https://mcpdesc.org/docs/specification/0.9.0-rc.3/resources#req-resource-template-tags-references)
  - 11. Prompts: [req-prompt-tags-references](https://mcpdesc.org/docs/specification/0.9.0-rc.3/prompts#req-prompt-tags-references)
  - 13. Tags: [req-tag-name-unique](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#req-tag-name-unique)
  - 13. Tags: [req-tags-undeclared-error](https://mcpdesc.org/docs/specification/0.9.0-rc.3/tags#req-tags-undeclared-error)




## Examples

### Invalid example

Source: [expected-invalid/duplicate-root-tag.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/duplicate-root-tag.json) · Selected: `/tags/1`

```json
{
  "name": "reporting"
}
```

### Invalid example

Source: [expected-invalid/duplicate-tag-reference.json](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/fixtures/expected-invalid/duplicate-tag-reference.json) · Selected: `/tools/0/tags`

```json
[
  "unknown"
]
```

## Rule Source Code

[document.yaml](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft/validation/rules/document.yaml) at immutable tag [`v0.9.0-rc.3`](https://github.com/mcpdesc/mcpdesc-specification/blob/v0.9.0-rc.3/spec/draft).

---
title: "13. Tags"
description: "MCP Description specification v0.9.0-draft.4 — 13. Tags."
slug: docs/specification/0.9.0-draft.4/tags
sidebar:
  order: 13
---

## 13. Tags

The root-level `tags` array defines a flat, document-wide tag catalogue for the MCP server. <a id="req-tags-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-non-empty"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/document-schema">mcpdesc.document.schema</a></small></span>It is OPTIONAL and MUST be non-empty when present. Tags are supplemental MCP Description metadata; they are not fields defined by the MCP protocol.

When present, `tags` declares all valid tags that MAY be referenced by tools, resources, resource templates, and prompts. <a id="req-tags-display-order"></a>The array order determines display priority — tags appearing earlier in the array SHOULD be presented first in UIs and documentation.

### 13.1 Tag Object

<a id="req-tag-fields"></a> <span class="mcpdesc-rule-links" data-anchor="req-tag-fields"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tag-members">mcpdesc.tag.members</a></small></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Tag identifier. <a id="req-tag-name-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-tag-name-unique"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tags-references">mcpdesc.tags.references</a></small></span>MUST be unique across all tags. |
| `description` | string | No | Human-readable description of the tag's purpose. |

### 13.2 Tag Uniqueness

<a id="req-tags-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-unique"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tags-references">mcpdesc.tags.references</a></small></span>Tag names MUST be unique across all tags in the array. Implementations MUST reject documents containing duplicate tag names.

### 13.3 Tag References

<a id="req-entity-tags-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-entity-tags-shape"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/prompt-members">mcpdesc.prompt.members</a>, <a href="/docs/rules/0.9.0-draft.4/mcpdesc/resource-members">mcpdesc.resource.members</a>, <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tool-members">mcpdesc.tool.members</a></small></span>Per-entity `tags` arrays (on tools, resources, resource templates, and prompts) MUST be non-empty when present and contain plain strings referencing tag names. When a root-level `tags` array is present:

- <a id="req-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-references"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tags-references">mcpdesc.tags.references</a></small></span>Every tag referenced by an entity MUST be declared in the root `tags` array.
- <a id="req-tags-undeclared-error"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-undeclared-error"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tags-references">mcpdesc.tags.references</a></small></span>Implementations MUST treat a reference to an undeclared tag as a validation error.
- <a id="req-entity-tags-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-entity-tags-unique"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/prompt-members">mcpdesc.prompt.members</a>, <a href="/docs/rules/0.9.0-draft.4/mcpdesc/resource-members">mcpdesc.resource.members</a>, <a href="/docs/rules/0.9.0-draft.4/mcpdesc/tool-members">mcpdesc.tool.members</a></small></span>Per-entity tag arrays MUST NOT contain duplicate values.

When the root-level `tags` array is absent, per-entity tags are unconstrained strings (backward-compatible behavior). An empty root tag catalogue is invalid; <a id="req-tags-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-omitted"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/document-schema">mcpdesc.document.schema</a></small></span>producers MUST omit `tags` when no catalogue entries are declared.

### 13.4 Protocol Scopes and Effective Protocol Views

The root tag catalogue is not protocol-scoped. A tag describes a categorization concept across the MCP Description document rather than protocol behavior. <a id="req-tags-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-views"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/view-projection">mcpdesc.view.projection</a></small></span>An Effective Protocol View MUST preserve the complete root tag catalogue, including entries not referenced by a primitive retained in that view.

Protocol-scoped variants of the same primitive MAY use different `tags` arrays. Every reference in every variant is still validated against the document-wide root catalogue when that catalogue is present.

<a id="req-tags-merge"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-merge"><small>Checked by: <a href="/docs/rules/0.9.0-draft.4/mcpdesc/view-merge">mcpdesc.view.merge</a></small></span>Merge inputs MUST therefore agree on the root tag catalogue under the general unscoped-metadata merge rules. Merge tooling MUST NOT infer, discard, or synthesize catalogue entries from the tags referenced in individual views.

Elicitation Declarations do not carry tags. They are named behaviors nested within an already categorizable Tool, Resource, Resource Template, or Prompt. A future extension of tags to nested behaviors requires a separate use case and compatibility decision.

### 13.5 Example

Flat tag list with entity references:

```json
{
  "tags": [
    { "name": "analysis", "description": "Game analysis tools" },
    { "name": "rating", "description": "Player and game rating tools" },
    { "name": "history", "description": "Game history and records" },
    { "name": "leaderboard", "description": "Ranking leaderboards" },
    { "name": "player", "description": "Player-specific data" }
  ],
  "tools": [
    {
      "name": "analyze_game",
      "tags": ["analysis"]
    },
    {
      "name": "get_player_rating",
      "tags": ["rating", "player"]
    }
  ],
  "resources": [
    {
      "uri": "chess://leaderboards/classical",
      "name": "classical_leaderboard",
      "tags": ["leaderboard", "rating"]
    }
  ]
}
```

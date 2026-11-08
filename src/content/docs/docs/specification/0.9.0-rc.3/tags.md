---
title: "13. Tags"
description: "MCP Description specification v0.9.0-rc.3 — 13. Tags."
slug: docs/specification/0.9.0-rc.3/tags
sidebar:
  order: 13
---

The root-level `tags` array defines a flat, document-wide tag catalogue for the MCP server. <a id="req-tags-non-empty"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-non-empty" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-tags-non-empty&gt;</code></a></small></span> It is OPTIONAL and MUST be non-empty when present. Tags are supplemental MCP Description metadata; they are not fields defined by the MCP protocol.

When present, `tags` declares all valid tags that MAY be referenced by tools, resources, resource templates, and prompts. <a id="req-tags-display-order"></a>The array order determines display priority — tags appearing earlier in the array SHOULD be presented first in UIs and documentation.

### 13.1 Tag Object

<a id="req-tag-fields"></a><span class="mcpdesc-rule-links" data-anchor="req-tag-fields"><br><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tag-members#required-by" title="This requirement is part of rule: mcpdesc.tag.members"><code>&lt;req-tag-fields&gt;</code></a></small><br></span>

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | **Yes** | Tag identifier. <a id="req-tag-name-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-tag-name-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tag-name-unique&gt;</code></a></small></span> MUST be unique across all tags. |
| `description` | string | No | Human-readable description of the tag's purpose. |

### 13.2 Tag Uniqueness

<a id="req-tags-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tags-unique&gt;</code></a></small></span> Tag names MUST be unique across all tags in the array. Implementations MUST reject documents containing duplicate tag names.

### 13.3 Tag References

<a id="req-entity-tags-shape"></a> <span class="mcpdesc-rule-links" data-anchor="req-entity-tags-shape" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-entity-tags-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-members#required-by" title="This requirement is part of rule: mcpdesc.resource.members"><code>&lt;req-entity-tags-shape&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-entity-tags-shape&gt;</code></a></small></span> Per-entity `tags` arrays (on tools, resources, resource templates, and prompts) MUST be non-empty when present and contain plain strings referencing tag names. When a root-level `tags` array is present:

- <a id="req-tags-references"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-references" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tags-references&gt;</code></a></small></span> Every tag referenced by an entity MUST be declared in the root `tags` array.
- <a id="req-tags-undeclared-error"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-undeclared-error" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/tags-references#required-by" title="This requirement is part of rule: mcpdesc.tags.references"><code>&lt;req-tags-undeclared-error&gt;</code></a></small></span> Implementations MUST treat a reference to an undeclared tag as a validation error.
- <a id="req-entity-tags-unique"></a> <span class="mcpdesc-rule-links" data-anchor="req-entity-tags-unique" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/prompt-members#required-by" title="This requirement is part of rule: mcpdesc.prompt.members"><code>&lt;req-entity-tags-unique&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/resource-members#required-by" title="This requirement is part of rule: mcpdesc.resource.members"><code>&lt;req-entity-tags-unique&gt;</code></a>, <a href="/docs/rules/0.9.0-rc.3/mcpdesc/tool-members#required-by" title="This requirement is part of rule: mcpdesc.tool.members"><code>&lt;req-entity-tags-unique&gt;</code></a></small></span> Per-entity tag arrays MUST NOT contain duplicate values.

When the root-level `tags` array is absent, per-entity tags are unconstrained strings (backward-compatible behavior). An empty root tag catalogue is invalid; <a id="req-tags-omitted"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-omitted" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/document-schema#required-by" title="This requirement is part of rule: mcpdesc.document.schema"><code>&lt;req-tags-omitted&gt;</code></a></small></span> producers MUST omit `tags` when no catalogue entries are declared.

### 13.4 Protocol Scopes and Effective Protocol Views

The root tag catalogue is not protocol-scoped. A tag describes a categorization concept across the MCP Description document rather than protocol behavior. <a id="req-tags-views"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-views" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-projection#required-by" title="This requirement is part of rule: mcpdesc.view.projection"><code>&lt;req-tags-views&gt;</code></a></small></span> An Effective Protocol View MUST preserve the complete root tag catalogue, including entries not referenced by a primitive retained in that view.

Protocol-scoped variants of the same primitive MAY use different `tags` arrays. Every reference in every variant is still validated against the document-wide root catalogue when that catalogue is present.

<a id="req-tags-merge"></a> <span class="mcpdesc-rule-links" data-anchor="req-tags-merge" data-layout="inline"><small><a href="/docs/rules/0.9.0-rc.3/mcpdesc/view-merge#required-by" title="This requirement is part of rule: mcpdesc.view.merge"><code>&lt;req-tags-merge&gt;</code></a></small></span> Merge inputs MUST therefore agree on the root tag catalogue under the general unscoped-metadata merge rules. Merge tooling MUST NOT infer, discard, or synthesize catalogue entries from the tags referenced in individual views.

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

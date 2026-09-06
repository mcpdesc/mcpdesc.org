# Format Reference

> The ecosystem evolves. **Re-resolve the current version and rules** from the canonical
> specification before relying on the values below. Do not hardcode a version from memory.

## How to resolve the current format

- Canonical schema repository: `cisco-open/mcptoolkit-contract` (`schemas/mcp-description/`).
- The current version is recorded in `schemas/latest.json` (`mcp-description`).
- The site specification lives at <https://mcpdesc.org/docs/specification>.

## Resolved facts at time of writing (verify before use)

- Format version: **0.7.0** (`mcpdesc: 0.7.0`).
- MCP protocol version used by reference examples: `2025-06-18` (`info.protocolVersion`).
- Validator: `mcpcontract validate <file> --schema mcpdesc --strict`
  (`@cisco_open/mcptoolkit-contract`).
- Mock: `mcpmock run <file> [--transport streamable-http --port <n>]`
  (`@cisco_open/mcptoolkit-mock`; Node ≥ 20).

## Top-level document shape (0.7.0)

```text
mcpdesc            # version string, e.g. "0.7.0"
info               # name*, version*, title, description, protocolVersion, id, websiteUrl, license, ...
transports         # array; stdio {type,command,args,env} or streamable-http {type,url}
security           # optional; omit for a no-auth design and document the assumption
capabilities       # tools/resources/prompts feature flags (listChanged, subscribe)
tools              # name*, title, description, inputSchema, outputSchema, annotations, tags
resources          # uri*, name*, title, description, mimeType, annotations, tags
resourceTemplates  # uriTemplate*, name*, title, description, mimeType, annotations, tags
prompts            # name*, title, description, arguments[], tags
tags               # name*, description
```

`*` = required.

## Constraints to remember

- A document root `$defs` is **not allowed**. Inline shared object shapes in each
  `inputSchema`/`outputSchema`.
- Tool annotation hints: `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`.
- There is **no native tool-error catalogue**. Keep `outputSchema` to success; document
  errors separately and surface them in the mock via `isError: true`.
- Prompt arguments support `name`, `title`, `description`, `required` only.

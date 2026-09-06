# Capability Map — MCP Issue Triage

Design-only capability inventory. Each user intention is mapped to the **least powerful**
primitive that fits, and tempting-but-wrong alternatives are recorded.

## Actors and outcome

- **Actor:** a maintainer triaging incoming issues through an AI host.
- **Outcome:** the oldest untriaged issues get a priority, an owner, and (where appropriate)
  a close decision — with the maintainer confirming every mutation.
- **Brownfield context:** the issues already live in a tracker with an HTTP API. This design
  is the *agent-shaped* interface over that domain, not a wrapper around the raw REST API.

## Intentions → primitives

| User intention | Primitive | Name | Why this primitive |
|---|---|---|---|
| See what needs triage | Resource | `triage://issues/open` | Read-only contextual data the host re-reads; not an action. |
| Look at a specific issue | Resource template | `triage://issues/{issue_id}` | Parameterized read; reading has no side effect. |
| Know valid priorities/resolutions | Resource | `triage://reference/labels` | Static reference the model should read before proposing values. |
| Set a priority | Tool | `set_priority` | Mutating; idempotent. |
| Assign an owner | Tool | `assign_issue` | Mutating; idempotent. |
| Close an issue | Tool | `close_issue` | Mutating and state-losing; destructive + idempotent. |
| Triage the next issue conversationally | Prompt | `triage_next` | Reusable, user-invoked workflow shipped by the server. |

## Rejected alternatives

- **`get_open_issues` as a tool** — rejected. Listing open issues is a read, so it is a
  resource, not a tool. A tool would imply an action and would not be surfaced as attachable
  context by the host.
- **A single `triage_issue` mega-tool** taking `{priority, assignee, close}` — rejected. It
  hides three distinct, separately-confirmable mutations behind one call and defeats
  per-action consent (annotations). Three focused tools keep each mutation reviewable.
- **A generic `call_tracker_api` passthrough tool** — rejected. It re-exposes the raw HTTP
  API (endpoints, auth, pagination, error codes) to the model — exactly what an MCP server
  should *not* do. The value is an agent-shaped interface, not a proxy.
- **`get_issue` as a tool** — rejected. Reading one issue is not a state change; it is the
  `triage://issues/{issue_id}` resource template.

## Resulting surface

**Three tools, two resources, one resource template, one prompt.**

- Tools: `set_priority`, `assign_issue`, `close_issue`
- Resources: `triage://issues/open`, `triage://reference/labels`
- Resource template: `triage://issues/{issue_id}`
- Prompt: `triage_next`

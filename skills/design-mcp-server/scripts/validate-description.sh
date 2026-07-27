#!/usr/bin/env bash
# Design-only helper: validate an MCP Description document against the canonical schema.
# It does not modify the document and does not scaffold or run a server.
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <path-to-.mcpdesc.yaml|json>" >&2
  exit 2
fi

DESC="$1"

if [[ ! -f "$DESC" ]]; then
  echo "Error: file not found: $DESC" >&2
  exit 2
fi

if ! command -v mcpcontract >/dev/null 2>&1; then
  echo "Error: 'mcpcontract' not found on PATH." >&2
  echo "Install: npm install -g @cisco_open/mcptoolkit-contract" >&2
  exit 127
fi

# Strict validation against the mcpdesc schema. The CLI resolves the document's declared
# version. See references/format-reference.md to confirm the current version.
exec mcpcontract validate "$DESC" --schema mcpdesc --strict

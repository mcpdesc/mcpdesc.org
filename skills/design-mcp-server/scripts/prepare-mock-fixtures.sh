#!/usr/bin/env bash
# Design-only helper: scaffold a deterministic mock-fixtures folder next to a description and
# print the design-time mock command. It creates data/notes only — never server code.
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

DESC_DIR="$(cd "$(dirname "$DESC")" && pwd)"
FIXTURE_DIR="$DESC_DIR/mock-data"

mkdir -p "$FIXTURE_DIR"

README="$FIXTURE_DIR/README.md"
if [[ ! -f "$README" ]]; then
  cat > "$README" <<'EOF'
# Mock fixtures (design-time only)

Deterministic override fixtures for reviewing the design with `mcpmock`. These are design
instruments, not tests of a real implementation, and must contain no secrets or answer keys.

Add one JSON file per tool/resource/prompt response you want to pin. Failures are represented
using MCP's `isError: true` result mechanism.
EOF
  echo "Created $README"
else
  echo "Exists  $README"
fi

echo
echo "Run the design-time mock (stdio, default):"
echo "  mcpmock run \"$DESC\""
echo
echo "Run over Streamable HTTP for host/inspector review:"
echo "  mcpmock run \"$DESC\" --transport streamable-http --port 3000"
echo
echo "Note: install with 'npm install -g @cisco_open/mcptoolkit-mock' (Node >= 20)."

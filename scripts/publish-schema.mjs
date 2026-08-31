// Publish a versioned MCP Description JSON Schema as a static site artifact.
//
// Usage:
//   node scripts/publish-schema.mjs <version> <source-file-or-url>
//
// Source bytes are preserved after validation, except for migrating the known legacy Cisco
// $id to the first-party URL. Released URLs are immutable, so existing files are not replaced.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const [VERSION, SOURCE] = process.argv.slice(2);

if (!VERSION || !SOURCE || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(VERSION)) {
  console.error('Usage: node scripts/publish-schema.mjs <version> <source-file-or-url>');
  process.exit(1);
}

const sourceText = /^https:\/\//.test(SOURCE)
  ? await fetch(SOURCE).then((response) => {
      if (!response.ok) throw new Error(`Could not fetch ${SOURCE}: HTTP ${response.status}`);
      return response.text();
    })
  : readFileSync(SOURCE, 'utf8');

const schema = JSON.parse(sourceText);
const canonicalId = `https://mcpdesc.org/schema/mcp-description/${VERSION}.json`;
const legacyId = `https://developer.cisco.com/mcp-description/schema/${VERSION}`;
const formatVersion = VERSION.split('-')[0];
let outputText = sourceText;

if (schema.$schema !== 'https://json-schema.org/draft/2020-12/schema' &&
    schema.$schema !== 'http://json-schema.org/draft-07/schema#') {
  throw new Error(`Unsupported JSON Schema dialect: ${schema.$schema}`);
}
if (schema.$id === legacyId) {
  outputText = outputText.replace(JSON.stringify(legacyId), JSON.stringify(canonicalId));
  schema.$id = canonicalId;
}
if (schema.$id !== canonicalId) {
  throw new Error(`Expected $id ${canonicalId}, received ${schema.$id}`);
}
if (schema.properties?.mcpdesc?.const !== formatVersion) {
  throw new Error(
    `Expected properties.mcpdesc.const ${formatVersion}, received ${schema.properties?.mcpdesc?.const}`,
  );
}

const output = join(ROOT, 'public/schema/mcp-description', `${VERSION}.json`);
if (existsSync(output)) throw new Error(`Refusing to overwrite ${output}`);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, outputText.endsWith('\n') ? outputText : `${outputText}\n`, 'utf8');
console.log(`Published ${VERSION} schema to ${output}`);
// Publish a versioned JSON Schema as a static site artifact.
//
// Usage:
//   node scripts/publish-schema.mjs <version> <source-file-or-url> [--kind <kind>]
//
// Source bytes are preserved after validation. Released URLs are immutable, so existing files
// are not replaced.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const [VERSION, SOURCE, ...flags] = process.argv.slice(2);
const KIND = flags.length === 0 ? 'mcp-description' : flags[1];
const KINDS = ['mcp-description', 'validation-rule', 'validation-result'];

if (!VERSION || !SOURCE || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(VERSION) ||
    !KINDS.includes(KIND) || (flags.length !== 0 && (flags.length !== 2 || flags[0] !== '--kind'))) {
  console.error(
    'Usage: node scripts/publish-schema.mjs <version> <source-file-or-url> ' +
    '[--kind mcp-description|validation-rule|validation-result]',
  );
  process.exit(1);
}

const sourceBytes = /^https:\/\//.test(SOURCE)
  ? await fetch(SOURCE).then(async (response) => {
      if (!response.ok) throw new Error(`Could not fetch ${SOURCE}: HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    })
  : readFileSync(SOURCE);

const schema = JSON.parse(sourceBytes.toString('utf8'));
const canonicalId = `https://mcpdesc.org/schema/${KIND}/${VERSION}.json`;
const legacyId = `https://developer.cisco.com/mcp-description/schema/${VERSION}`;
const formatVersion = VERSION.split('-')[0];

if (schema.$schema !== 'https://json-schema.org/draft/2020-12/schema' &&
    schema.$schema !== 'http://json-schema.org/draft-07/schema#') {
  throw new Error(`Unsupported JSON Schema dialect: ${schema.$schema}`);
}
if (schema.$id !== canonicalId && !(KIND === 'mcp-description' && schema.$id === legacyId)) {
  throw new Error(
    `Expected $id ${canonicalId}${KIND === 'mcp-description' ? ` or ${legacyId}` : ''}, received ${schema.$id}`,
  );
}
if (KIND === 'mcp-description' && schema.properties?.mcpdesc?.const !== formatVersion) {
  throw new Error(
    `Expected properties.mcpdesc.const ${formatVersion}, received ${schema.properties?.mcpdesc?.const}`,
  );
}

const output = join(ROOT, 'public/schema', KIND, `${VERSION}.json`);
if (existsSync(output)) throw new Error(`Refusing to overwrite ${output}`);

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, sourceBytes, { flag: 'wx' });
console.log(`Published ${KIND} ${VERSION} schema to ${output}`);
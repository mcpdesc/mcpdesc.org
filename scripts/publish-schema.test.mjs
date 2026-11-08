import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const publisher = join(dirname(fileURLToPath(import.meta.url)), 'publish-schema.mjs');

function setup(t, schema, suffix = '\n') {
  const root = mkdtempSync(join(tmpdir(), 'mcpdesc-publish-schema-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  mkdirSync(join(root, 'scripts'));
  copyFileSync(publisher, join(root, 'scripts/publish-schema.mjs'));
  const source = join(root, 'source.json');
  const bytes = Buffer.from(JSON.stringify(schema, null, 2) + suffix);
  writeFileSync(source, bytes);
  return {
    bytes,
    output: (kind, version) => join(root, 'public/schema', kind, `${version}.json`),
    run: (version, ...flags) => spawnSync(
      process.execPath, [join(root, 'scripts/publish-schema.mjs'), version, source, ...flags],
      { encoding: 'utf8' },
    ),
  };
}

function schema(kind = 'mcp-description', version = '0.9.0-rc.3') {
  return {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://mcpdesc.org/schema/${kind}/${version}.json`,
    ...(kind === 'mcp-description' ? { properties: { mcpdesc: { const: version.split('-')[0] } } } : {}),
  };
}

for (const suffix of ['', '\n', '\r\n']) {
  test(`preserves exact MCP Description source bytes with suffix ${JSON.stringify(suffix)}`, (t) => {
    const fixture = setup(t, schema(), suffix);
    assert.equal(fixture.run('0.9.0-rc.3').status, 0);
    assert.deepEqual(readFileSync(fixture.output('mcp-description', '0.9.0-rc.3')), fixture.bytes);
  });
}

for (const kind of ['validation-rule', 'validation-result']) {
  test(`publishes ${kind} using its independent format version`, (t) => {
    const fixture = setup(t, schema(kind, '1.4.0'));
    assert.equal(fixture.run('1.4.0', '--kind', kind).status, 0);
    assert.deepEqual(readFileSync(fixture.output(kind, '1.4.0')), fixture.bytes);
  });
}

test('retains legacy MCP Description schema identity support', (t) => {
  const value = schema('mcp-description', '0.7.0');
  value.$schema = 'http://json-schema.org/draft-07/schema#';
  value.$id = 'https://developer.cisco.com/mcp-description/schema/0.7.0';
  const fixture = setup(t, value);
  assert.equal(fixture.run('0.7.0').status, 0);
});

test('refuses to overwrite an existing artifact and preserves its bytes', (t) => {
  const fixture = setup(t, schema());
  assert.equal(fixture.run('0.9.0-rc.3').status, 0);
  const result = fixture.run('0.9.0-rc.3');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Refusing to overwrite/);
  assert.deepEqual(readFileSync(fixture.output('mcp-description', '0.9.0-rc.3')), fixture.bytes);
});

for (const [label, value, version, flags, error] of [
  ['wrong identity', schema('validation-result', '1.4.0'), '0.9.0-rc.3', [], /Expected \$id/],
  ['wrong conformance version', { ...schema(), properties: { mcpdesc: { const: '0.8.0' } } }, '0.9.0-rc.3', [], /Expected properties.mcpdesc.const/],
  ['unsupported dialect', { ...schema(), $schema: 'https://example.com/schema' }, '0.9.0-rc.3', [], /Unsupported JSON Schema dialect/],
  ['path traversal', schema(), '../0.9.0', [], /Usage:/],
  ['unknown kind', schema(), '0.9.0-rc.3', ['--kind', '../other'], /Usage:/],
  ['unexpected flags', schema(), '0.9.0-rc.3', ['--other', 'mcp-description'], /Usage:/],
  ['missing kind', schema(), '0.9.0-rc.3', ['--kind'], /Usage:/],
]) {
  test(`rejects ${label}`, (t) => {
    const fixture = setup(t, value);
    const result = fixture.run(version, ...flags);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, error);
  });
}

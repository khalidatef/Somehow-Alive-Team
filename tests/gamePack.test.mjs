import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { packGame, prepareGame } from '../scripts/game-pack.mjs';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'game-pack-test-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const source = join(directory, 'original.pck');
  const manifestPath = join(directory, 'parts', 'manifest.json');
  const output = join(directory, 'game.pck');
  const bytes = Buffer.from('GDPC\0the original game export, byte for byte');
  await writeFile(source, bytes);
  const manifest = await packGame({ source, manifestPath, chunkSize: 9 });
  return { directory, source, manifestPath, output, bytes, manifest };
}

test('reconstructs every byte, including the final partial chunk, and repairs stale output', async (t) => {
  const { manifestPath, output, bytes, manifest } = await fixture(t);
  assert.ok(manifest.parts.length > 1);
  await prepareGame({ manifestPath, output });
  assert.deepEqual(await readFile(output), bytes);
  await writeFile(output, Buffer.alloc(bytes.length));
  await prepareGame({ manifestPath, output });
  assert.deepEqual(await readFile(output), bytes);
});

test('rejects a corrupt part even when a valid local PCK exists', async (t) => {
  const { manifestPath, output, bytes, manifest } = await fixture(t);
  await writeFile(output, bytes);
  await writeFile(join(manifestPath, '..', manifest.parts[0].file), Buffer.alloc(manifest.parts[0].size));
  await assert.rejects(prepareGame({ manifestPath, output }), /checksum mismatch/);
  assert.deepEqual(await readFile(output), bytes);
});

test('fails clearly for a missing part without overwriting existing output', async (t) => {
  const { manifestPath, output, manifest } = await fixture(t);
  await writeFile(output, 'previous build');
  await rm(join(manifestPath, '..', manifest.parts[0].file));
  await assert.rejects(prepareGame({ manifestPath, output }), { code: 'ENOENT' });
  assert.equal(await readFile(output, 'utf8'), 'previous build');
});

test('rejects a mismatched complete-pack checksum before replacing output', async (t) => {
  const { manifestPath, output, manifest } = await fixture(t);
  await writeFile(output, 'previous build');
  manifest.sha256 = '0'.repeat(64);
  await writeFile(manifestPath, JSON.stringify(manifest));
  await assert.rejects(prepareGame({ manifestPath, output }), /does not match/);
  assert.equal(await readFile(output, 'utf8'), 'previous build');
});

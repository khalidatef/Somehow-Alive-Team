import { createHash, randomUUID } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { mkdir, open, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const defaultOutput = join(root, 'public/game/somehow-alive.pck');
const defaultManifest = join(root, 'game-build/somehow-alive.pck.json');
const sha256 = (data) => createHash('sha256').update(data).digest('hex');

async function fileHash(path) {
  const hash = createHash('sha256');
  for await (const bytes of createReadStream(path)) hash.update(bytes);
  return hash.digest('hex');
}

// Git stores small parts; Godot still receives the original, unchanged PCK.
export async function packGame({ source = defaultOutput, manifestPath = defaultManifest, chunkSize = 40 * 1024 * 1024 } = {}) {
  if (!Number.isSafeInteger(chunkSize) || chunkSize < 1 || chunkSize > 40 * 1024 * 1024) {
    throw new Error('Game part size must be between 1 byte and 40 MiB.');
  }
  const bytes = await readFile(source);
  if (!bytes.length) throw new Error('The game pack is empty.');
  const directory = dirname(manifestPath);
  await mkdir(directory, { recursive: true });
  let previous;
  try { previous = JSON.parse(await readFile(manifestPath, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const parts = [];
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    const data = bytes.subarray(offset, offset + chunkSize);
    const digest = sha256(data);
    const file = `somehow-alive.pck.${digest}.part`;
    await writeFile(join(directory, file), data);
    parts.push({ file, size: data.length, sha256: digest });
  }
  const manifest = { version: 1, size: bytes.length, sha256: sha256(bytes), parts };
  const temporary = `${manifestPath}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(manifest, null, 2)}\n`);
  await rename(temporary, manifestPath);
  for (const part of previous?.parts ?? []) {
    if (/^somehow-alive\.pck\.[a-f0-9]{64}\.part$/.test(part.file) && !parts.some((item) => item.file === part.file)) {
      await rm(join(directory, part.file), { force: true });
    }
  }
  return manifest;
}

export async function prepareGame({ output = defaultOutput, manifestPath = defaultManifest } = {}) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  const validHash = (value) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
  if (manifest.version !== 1 || !Number.isSafeInteger(manifest.size) || manifest.size < 1 ||
      !validHash(manifest.sha256) || !Array.isArray(manifest.parts) || !manifest.parts.length ||
      manifest.parts.some((part) => !/^somehow-alive\.pck\.[a-f0-9]{64}\.part$/.test(part.file) ||
        !Number.isSafeInteger(part.size) || part.size < 1 || part.size > 40 * 1024 * 1024 || !validHash(part.sha256)) ||
      manifest.parts.reduce((sum, part) => sum + part.size, 0) !== manifest.size) {
    throw new Error('Invalid game pack manifest.');
  }
  // Check parts even when the local generated PCK is already up to date.
  for (const part of manifest.parts) {
    if (await fileHash(join(dirname(manifestPath), part.file)) !== part.sha256) {
      throw new Error(`Game part checksum mismatch: ${part.file}`);
    }
  }
  try {
    if (await fileHash(output) === manifest.sha256) return manifest;
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(dirname(output), { recursive: true });
  const temporary = `${output}.${randomUUID()}.tmp`;
  const target = await open(temporary, 'wx');
  const hash = createHash('sha256');
  let size = 0;
  try {
    for (const part of manifest.parts) {
      for await (const bytes of createReadStream(join(dirname(manifestPath), part.file))) {
        hash.update(bytes);
        size += bytes.length;
        await target.writeFile(bytes);
      }
    }
    if (size !== manifest.size || hash.digest('hex') !== manifest.sha256) {
      throw new Error('Reconstructed game pack does not match the original export.');
    }
    await target.close();
    await rename(temporary, output);
  } catch (error) {
    await target.close().catch(() => {});
    await rm(temporary, { force: true });
    throw error;
  }
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const command = process.argv[2] ?? 'prepare';
    if (!['pack', 'prepare'].includes(command)) throw new Error('Use game-pack.mjs pack or prepare.');
    const manifest = await (command === 'pack' ? packGame() : prepareGame());
    console.log(`Game ${command === 'pack' ? 'stored in' : 'verified from'} ${manifest.parts.length} parts (${manifest.size} bytes, SHA-256 ${manifest.sha256}).`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

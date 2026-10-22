import fs from "node:fs";
import zlib from "node:zlib";

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const name = Buffer.from(type);
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}

function inside(px, py) {
  const radius = 0.22;
  const dx = px < radius ? radius - px : px > 1 - radius ? px - (1 - radius) : 0;
  const dy = py < radius ? radius - py : py > 1 - radius ? py - (1 - radius) : 0;
  return dx * dx + dy * dy <= radius * radius;
}

function paint(x, y, size) {
  const px = (x + 0.5) / size;
  const py = (y + 0.5) / size;
  if (!inside(px, py)) return [0, 0, 0, 0];
  const dx = px - 0.46;
  const dy = py - 0.5;
  const dist = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);
  const ring = dist < 0.3 && dist > 0.16 && !(angle > -0.85 && angle < 0.85);
  return ring ? [244, 241, 234, 255] : [12, 107, 82, 255];
}

function png(size) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = paint(x, y, size);
      const index = row + 1 + x * 4;
      raw[index] = r;
      raw[index + 1] = g;
      raw[index + 2] = b;
      raw[index + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

function ico(pngBuffer, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);
  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);
  return Buffer.concat([header, entry, pngBuffer]);
}

fs.mkdirSync("public", { recursive: true });
const icon32 = png(32);
fs.writeFileSync("public/favicon.ico", ico(icon32, 32));
fs.writeFileSync("public/apple-touch-icon.png", png(180));
fs.writeFileSync("public/icon-192.png", png(192));
fs.writeFileSync("public/icon-512.png", png(512));

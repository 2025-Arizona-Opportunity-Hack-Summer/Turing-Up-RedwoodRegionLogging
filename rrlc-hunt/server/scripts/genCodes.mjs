import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';
import { WILDLIFE_CODES } from '../constants/codes.js';

// Folder to dump PNGs (relative to repo root)
const OUT_DIR = path.resolve('../qr');
mkdirSync(OUT_DIR, { recursive: true });

for (const id of WILDLIFE_CODES) {
  // The URL the QR should open (adjust if you deploy under a real domain)
  const url = `https://rrlc-hunt.vercel.app/scan?code=${id}`;

  const buffer = await QRCode.toBuffer(url, {
    type: 'png',
    margin: 1,
    scale: 8           // nice printable resolution
  });

  writeFileSync(path.join(OUT_DIR, `${id}.png`), buffer);
  console.log('✅ generated', id);
}

console.log('\nAll done →', OUT_DIR);
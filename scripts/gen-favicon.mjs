/**
 * Gera `public/favicon.ico` a partir de `public/50.png` (barra compacta 64×32 → ícone quadrado).
 * Uso: npm run generate:favicon
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngToIco from "png-to-ico";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const input = join(root, "public/50.png");
const out = join(root, "public/favicon.ico");
/** Mesmo fundo que os PNGs gerados (`#12151c`). */
const bg = { r: 18, g: 21, b: 28, alpha: 1 };

const buf = readFileSync(input);
const pngBuffers = await Promise.all(
  [16, 32, 48].map((s) =>
    sharp(buf).resize(s, s, { fit: "contain", background: bg }).png().toBuffer(),
  ),
);
const ico = await pngToIco(pngBuffers);
writeFileSync(out, ico);
process.stdout.write(`OK: ${out} (${ico.length} bytes)\n`);

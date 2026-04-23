/** Canonical site origin (URLs shown to users and copy targets — no file extension). */
export const BASE = "https://progressbar.info" as const;

/**
 * `public/` path like `large/label/10.png` or `42.png` → public page URL without `.png`
 * (rewrites on the host serve the PNG from disk).
 */
export function publicUserUrlFromPublicFile(relativePathWithPng: string) {
  const p = relativePathWithPng.replace(/\.png$/i, "").replace(/^\//, "");
  return `${BASE}/${p}`;
}

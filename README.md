# progressbar.info

Static site for **[progressbar.info](https://progressbar.info)** — embeddable **progress bar PNGs** via clean URLs (no JavaScript). Source code: **[h3nr1ke/progressbar.info](https://github.com/h3nr1ke/progressbar.info)**.

---

## Sizes and aspect ratio

**Nothing is fixed by law.** The pixel sizes below are what the **current** default assets and marketing copy assume (hero, catalog thumbnails, “how it works” examples). Contributors are welcome to ship **different** dimensions — for example a **square** bar, a taller strip, or any layout that reads well as a progress image.

| Default style (example paths) | Dimensions used today | Example URL (no `.png`) |
|-------------------------------|-------------------------|-------------------------|
| `large/label/{n}.png` | 520 × 72 | `https://progressbar.info/large/label/50` |
| `large/{n}.png` | 520 × 72 | `https://progressbar.info/large/50` |
| `label/{n}.png` | 64 × 32 | `https://progressbar.info/label/50` |
| `{n}.png` at the root of `public/` | 64 × 32 | `https://progressbar.info/50` |

If you change dimensions for paths the site already references, update **`src/lib/bar-image-meta.ts`** (`LARGE_LABEL_IMAGE_PX`, `SMALL_IMAGE_PX`) and any UI that should match the new artwork so layouts stay honest.

---

## `public/` layout — yours to organize

Files under **`public/`** are served as static assets; URL paths mirror the folder tree.

**There is no required folder scheme.** You may add **any top-level folder name** you like and nest **as many subfolders as you need** (themes, variants, experiments, “configs”, etc.). Name them however makes sense for your contribution.

The tree below is only the **built-in example** shipped with this repo (percentages `0`–`100` as `*.png`):

```text
public/
├── favicon.ico
├── {0..100}.png
├── label/
│   └── {0..100}.png
└── large/
    ├── {0..100}.png
    └── label/
        └── {0..100}.png
```

**Practical notes for pull requests**

1. **Naming** — Prefer clear, lowercase path segments so URLs stay readable.
2. **Coverage** — For a given “family” of bars, keeping **`0.png` … `100.png`** (or documenting a different scheme in the PR) helps consumers who expect every whole percent.
3. **New trees** — If you introduce paths the homepage catalog does not list yet, describe them in the PR (and add site/catalog copy in the same change if you want them discoverable).

---

## Adding or refreshing artwork

### Option A — Hand-made or external PNGs

Drop files under `public/` following whatever structure you chose, then open a **pull request**.

### Option B — Configurable generator (recommended)

Use **[progress-bar-generator](https://github.com/h3nr1ke/progress-bar-generator)** — a Node.js CLI that renders progress bar **PNGs from JSON** (canvas size, colors, thresholds, optional labels, Sharp). You can:

- Set **any width and height** (including square or other aspect ratios)  
- Drive a **`series`** from 0–100 (or an `images` list) and point `outputDir` wherever you want under `public/`  
- Iterate on one JSON config, regenerate, then **open a PR** with the new PNGs (plus any site or metadata updates if paths or sizes change)

---

## Local development

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview:static   # serve dist/client locally
```

```bash
npm run lint
npm run generate:favicon # requires public/50.png; writes public/favicon.ico
```

---

## License

See [LICENSE](LICENSE).

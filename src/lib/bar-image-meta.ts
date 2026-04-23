/**
 * Default pixel size for `public/large/label/*.png` and `public/large/*.png` (hero + wide styles).
 * Change here if you regenerate assets with different dimensions.
 */
export const LARGE_LABEL_IMAGE_PX = { width: 520, height: 72 } as const;

/** Compact bars: `public/label/*.png` and `public/*.png` (root). */
export const SMALL_IMAGE_PX = { width: 64, height: 32 } as const;

/** Sample values shown in the on-disk example tables (0…100 is supported in real URLs). */
export const DISK_SAMPLE_PERCENTS = [0, 10, 50, 100] as const;

/**
 * One row per “link type”. Large paths use 520×72; small paths use 64×32.
 */
export const CATALOG_EXAMPLE_STYLES = [
  {
    id: "large-label",
    title: "Large width, full path",
    description: "The usual choice: the large-size bar, with “large” and the style name in the link. Best when you want the clearest, default look.",
    filePath: (n: number) => `large/label/${n}.png`,
    sizePx: LARGE_LABEL_IMAGE_PX,
  },
  {
    id: "large-only",
    title: "Large width, shorter path",
    description: "Same large-size bar, but a simpler URL that skips the style segment. Use this if you don’t need a named style in the path.",
    filePath: (n: number) => `large/${n}.png`,
    sizePx: LARGE_LABEL_IMAGE_PX,
  },
  {
    id: "label-only",
    title: "Smaller bar, with style in the path",
    description: "A compact image — the “small” look with the style still in the link, without the “large” prefix.",
    filePath: (n: number) => `label/${n}.png`,
    sizePx: SMALL_IMAGE_PX,
  },
  {
    id: "plain",
    title: "Smallest address",
    description: "Shortest possible link: just the site and the number. Handy in tight spaces; same idea as the other “small” option.",
    filePath: (n: number) => `${n}.png`,
    sizePx: SMALL_IMAGE_PX,
  },
] as const;

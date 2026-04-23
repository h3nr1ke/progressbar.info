import { useState } from "react";
import { Copy, Check, FolderOpen } from "lucide-react";

import { CATALOG_EXAMPLE_STYLES, DISK_SAMPLE_PERCENTS } from "@/lib/bar-image-meta";
import { publicUserUrlFromPublicFile } from "@/lib/public-site";

function publicUrlForPath(urlPath: string) {
  const base = import.meta.env.BASE_URL;
  const root = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${root}${urlPath}`;
}

export function PublicAssetCatalog() {
  return (
    <div className="space-y-12">
      {CATALOG_EXAMPLE_STYLES.map((style) => {
        const { width: w, height: h } = style.sizePx;
        return (
          <div key={style.id} className="space-y-4">
            <div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <div className="flex items-center gap-2 text-base font-semibold text-foreground">
                  <FolderOpen className="w-4 h-4 text-primary shrink-0" />
                  {style.title}
                </div>
                <span className="text-xs text-muted-foreground">
                  {w}×{h} px
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-3xl mt-2 leading-relaxed">{style.description}</p>
            </div>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-border bg-muted/30 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-3 py-2 w-24">Preview</th>
                    <th className="px-3 py-2">Path</th>
                    <th className="px-3 py-2 w-32">Size</th>
                    <th className="px-3 py-2 w-28" />
                  </tr>
                </thead>
                <tbody>
                  {DISK_SAMPLE_PERCENTS.map((n) => (
                    <SampleRow
                      key={n}
                      percent={n}
                      filePath={style.filePath(n)}
                      sizeLabel={`${w}×${h} px`}
                      sizePx={style.sizePx}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SampleRow({
  percent,
  filePath,
  sizeLabel,
  sizePx,
}: {
  percent: number;
  filePath: string;
  sizeLabel: string;
  sizePx: { width: number; height: number };
}) {
  const [copied, setCopied] = useState(false);
  const urlPath = `/${filePath}`.replace(/\/+/g, "/");
  const hrefForImg = publicUrlForPath(urlPath);
  const pathShown = filePath.replace(/\.png$/i, "");
  const urlToCopy = publicUserUrlFromPublicFile(filePath);
  return (
    <tr className="border-b border-border/80 last:border-0 hover:bg-muted/10">
      <td className="px-3 py-2 align-middle">
        <div className="block w-20 rounded border border-border overflow-hidden bg-[var(--code-bg)]">
          <img
            src={hrefForImg}
            alt={`${percent}%`}
            className="w-full h-auto object-contain max-h-12"
            width={sizePx.width}
            height={sizePx.height}
            loading="lazy"
            decoding="async"
          />
        </div>
      </td>
      <td className="px-3 py-2 align-middle font-mono text-xs break-all text-muted-foreground max-w-md">{pathShown}</td>
      <td className="px-3 py-2 align-middle font-mono text-xs text-foreground whitespace-nowrap">{sizeLabel}</td>
      <td className="px-3 py-2 align-middle">
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(urlToCopy).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            });
          }}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          Copy URL
        </button>
      </td>
    </tr>
  );
}

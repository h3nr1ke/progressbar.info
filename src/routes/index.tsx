import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Github, Zap, FileCode, Heart, GitPullRequest } from "lucide-react";

import { PublicAssetCatalog } from "@/components/PublicAssetCatalog";
import { LARGE_LABEL_IMAGE_PX } from "@/lib/bar-image-meta";
import { BASE } from "@/lib/public-site";

export const Route = createFileRoute("/")({
  component: Index,
});

const GITHUB_REPO = "https://github.com/h3nr1ke/progressbar.info";
const BAR_PATH = "large/label" as const;

const defaultLargeLabelDims = LARGE_LABEL_IMAGE_PX;

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/** Ficheiro servido a partir de `public/large/label/{0–100}.png` (dev: `/large/label/56.png`). */
function barPngSrc(value: number) {
  const v = clampPercent(value);
  const base = import.meta.env.BASE_URL.replace(/\/?$/, "/");
  return `${base}${BAR_PATH}/${v}.png`;
}

/** Público, sem extensão — barra larga com segmento de estilo `label/`. */
function publicUrlLargeWithLabel(n: number) {
  return `${BASE}/large/label/${clampPercent(n)}`;
}

/** Larga, sem segmento `label/` (só `large/…`). */
function publicUrlLargeNoLabel(n: number) {
  return `${BASE}/large/${clampPercent(n)}`;
}

/**
 * Versão pequena: o mesmo padrão que “large/…”, mas **sem** o prefixo `large/`.
 * Com estilo: `…/label/{0–100}`.
 */
function publicUrlSmallWithLabel(n: number) {
  return `${BASE}/label/${clampPercent(n)}`;
}

/** Pequena, mínima: só o número no path. */
function publicUrlSmallPlain(n: number) {
  return `${BASE}/${clampPercent(n)}`;
}

function BarImage({ value, loading }: { value: number; loading?: "eager" | "lazy" }) {
  const v = clampPercent(value);
  return (
    <img
      src={barPngSrc(v)}
      width={defaultLargeLabelDims.width}
      height={defaultLargeLabelDims.height}
      className="w-full h-auto block"
      alt={`${v}% complete`}
      loading={loading}
      decoding="async"
    />
  );
}

function CopyBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group">
      {label && <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-mono">{label}</div>}
      <div className="relative rounded-lg border border-border bg-[var(--code-bg)] overflow-hidden">
        <pre className="px-4 py-3 pr-14 text-sm font-mono text-foreground overflow-x-auto"><code>{code}</code></pre>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="absolute top-2 right-2 p-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Copy"
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  );
}

function Index() {
  const [value, setValue] = useState(56);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Glow background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "var(--gradient-glow)" }} />

      <div className="relative">
        {/* Nav */}
        <header className="border-b border-border">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono font-bold text-lg">
              <div className="w-6 h-6 rounded" style={{ background: "var(--gradient-hero)" }} />
              progressbar.info
            </div>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground mb-8">
            <Zap className="w-3 h-3 text-primary" /> Zero scripts. Zero setup. Just a URL.
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Progress bars as
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
              a single URL.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Drop a static progress PNG into any README, GitHub Page, or markdown file. From <code className="font-mono text-primary">0</code> to <code className="font-mono text-primary">100</code>.
          </p>

          <div className="max-w-2xl mx-auto p-6 rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-glow)" }}>
            <div className="flex items-center justify-between mb-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" /> static image
              </span>
              <span>
                {BAR_PATH}/{value}
              </span>
            </div>
            <div className="rounded-lg overflow-hidden border border-border bg-[var(--code-bg)] p-4">
              <BarImage value={value} loading="eager" />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground mr-1 font-mono">preview:</span>
              {[0, 25, 50, 75, 100].map((v) => (
                <button
                  key={v}
                  onClick={() => setValue(v)}
                  className={`px-3 py-1.5 rounded-md font-mono text-xs border transition-colors ${
                    value === v
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <div className="mt-4 font-mono text-sm text-muted-foreground break-all text-center">
              {publicUrlLargeWithLabel(value)}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground">Append a number from 0 to 100. Get a static PNG.</p>
            <p className="text-muted-foreground text-sm max-w-3xl mx-auto mt-4 text-left sm:text-center">
              The default, wide image uses a <code className="font-mono text-foreground/90">large/</code> path prefix. For
              the <span className="text-foreground font-medium">smaller (compact) bar</span>, keep the same pattern but{" "}
              <strong>remove the</strong> <code className="font-mono text-foreground/90">large</code> segment. The
              optional{" "}
              <code className="font-mono text-foreground/90">label</code> segment names a visual style; you can drop it
              in both the wide and compact cases.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-mono mb-3">URL patterns (same 56% example)</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <CopyBlock label="Large + label segment" code={publicUrlLargeWithLabel(56)} />
              <CopyBlock label="Large, no label segment" code={publicUrlLargeNoLabel(56)} />
              <CopyBlock label="Compact + label segment" code={publicUrlSmallWithLabel(56)} />
              <CopyBlock label="Compact, no label segment" code={publicUrlSmallPlain(56)} />
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground font-mono mb-6">Preview (large + label style)</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[10, 56, 92].map((v) => (
              <div key={v} className="p-5 rounded-xl border border-border bg-card">
                <BarImage value={v} loading="lazy" />
                <div className="mt-4 font-mono text-xs text-muted-foreground break-all">
                  {publicUrlLargeWithLabel(v)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use cases / code blocks */}
        <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
          <div className="text-center mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Use it anywhere</h2>
            <p className="text-muted-foreground">Markdown, HTML, GitHub READMEs — wherever images render.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> Markdown / README
              </div>
              <CopyBlock code={`![progress](${publicUrlLargeWithLabel(56)})`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> HTML
              </div>
              <CopyBlock code={`<img src="${publicUrlLargeWithLabel(56)}" alt="56% complete" />`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> GitHub Pages
              </div>
              <CopyBlock code={`<img src="${publicUrlLargeWithLabel(75)}" />`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> Reference (all shapes)
              </div>
              <CopyBlock
                code={`# large
${BASE}/large/label/{0-100}
${BASE}/large/{0-100}
# small (remove large/)
${BASE}/label/{0-100}
${BASE}/{0-100}`}
              />
            </div>
          </div>
        </section>

        {/* On-disk options from public/ */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Examples for every link type</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Each way of building a link (wide or small, with or without extra path pieces) is shown below. We use four
              sample values — 0%, 10%, 50%, and 100% — so you can see the idea without a long list. In real use you can
              pick any whole number from 0 to 100; the size column is the image size in pixels for that style.
            </p>
          </div>
          <PublicAssetCatalog />
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Zap, title: "No scripts", desc: "Pure PNG. Works where JavaScript can't." },
              { icon: FileCode, title: "Markdown ready", desc: "Embed in any .md file with standard syntax." },
              { icon: Heart, title: "Free forever", desc: "No accounts, no rate limits, no surprises." },
              { icon: GitPullRequest, title: "Open source", desc: "Add new styles via pull request." },
            ].map((f) => (
              <div key={f.title} className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors">
                <f.icon className="w-6 h-6 text-primary mb-3" />
                <div className="font-semibold mb-1">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Contribute */}
        <section className="max-w-3xl mx-auto px-6 py-20 text-center">
          <GitPullRequest className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Want a new style?</h2>
          <p className="text-muted-foreground mb-8">
            New progress bar designs are added by the community. Open a pull request with your model and image generator — that's it.
          </p>
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
            style={{ background: "var(--gradient-hero)", color: "oklch(0.18 0.02 250)" }}
          >
            <Github className="w-5 h-5" /> Contribute on GitHub
          </a>
        </section>

        <footer className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground font-mono space-y-1">
            <div>progressbar.info — free & open source</div>
            <div>Made with 💚 and ☕ in Brazil 🇧🇷</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

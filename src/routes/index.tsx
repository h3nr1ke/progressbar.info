import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Github, Zap, FileCode, Heart, GitPullRequest } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const BASE = "https://progressbar.info";

function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <svg viewBox="0 0 400 60" className="w-full h-auto" role="img" aria-label={`${v}% progress`}>
      <rect x="1" y="1" width="398" height="58" rx="8" fill="oklch(0.13 0.015 250)" stroke="oklch(0.3 0.02 250)" strokeWidth="2" />
      <rect x="6" y="6" width={(388 * v) / 100} height="48" rx="5" fill="url(#g)" />
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.18 145)" />
          <stop offset="100%" stopColor="oklch(0.75 0.16 200)" />
        </linearGradient>
      </defs>
      <text x="200" y="36" textAnchor="middle" fill="oklch(0.96 0.005 240)" fontSize="20" fontWeight="600" fontFamily="ui-monospace, monospace">{v}%</text>
    </svg>
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
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
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
                <span className="w-2 h-2 rounded-full bg-primary" /> static .png
              </span>
              <span>{value}.png</span>
            </div>
            <div className="rounded-lg overflow-hidden border border-border bg-[var(--code-bg)] p-4">
              <ProgressBar value={value} />
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
              {BASE}/<span className="text-primary">{value}</span>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">How it works</h2>
            <p className="text-muted-foreground">Append a number from 0 to 100. Get a static PNG.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[10, 56, 92].map((v) => (
              <div key={v} className="p-5 rounded-xl border border-border bg-card">
                <ProgressBar value={v} />
                <div className="mt-4 font-mono text-xs text-muted-foreground break-all">{BASE}/{v}</div>
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
              <CopyBlock code={`![progress](${BASE}/56)`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> HTML
              </div>
              <CopyBlock code={`<img src="${BASE}/56" alt="56% complete" />`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> GitHub Pages
              </div>
              <CopyBlock code={`<img src="${BASE}/75" />`} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FileCode className="w-4 h-4 text-primary" /> Reference URL
              </div>
              <CopyBlock code={`${BASE}/{0-100}`} />
            </div>
          </div>
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
            href="https://github.com"
            target="_blank" rel="noreferrer"
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

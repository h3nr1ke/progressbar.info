/**
 * Lê `amplify-redirects.json` e reescreve a secção `redirects` + fim de `amplify.yml`
 * (build, artifacts, customHeaders), para manter uma fonte de verdade em JSON.
 *
 * Uso: npm run amplify:sync-yml
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const rules = JSON.parse(readFileSync(join(root, "amplify-redirects.json"), "utf8"));

let redir = "redirects:\n";
for (const r of rules) {
  redir += `  - source: ${JSON.stringify(r.source)}\n`;
  redir += `    target: ${JSON.stringify(r.target)}\n`;
  redir += `    status: ${JSON.stringify(r.status)}\n`;
  if (r.condition != null) {
    redir += `    condition: ${JSON.stringify(r.condition)}\n`;
  }
}

const yml = `# https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html
# Regras de redirect vêm de amplify-redirects.json. Para atualizar: npm run amplify:sync-yml
#
# A consola (Hosting > Rewrites and redirects) suporta o mesmo modelo em JSON; o YAML
# abaixo acompanha o build quando a chave redirects do build spec for aplicada à app.

version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist/client
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*

${redir}customHeaders:
  - pattern: "**/*.png"
    headers:
      - key: "Cache-Control"
        value: "public, max-age=31536000, immutable"
  - pattern: "**/*"
    headers:
      - key: "X-Content-Type-Options"
        value: "nosniff"
`;

writeFileSync(join(root, "amplify.yml"), yml, "utf8");
process.stdout.write(`OK: amplify.yml (${rules.length} regras)\n`);

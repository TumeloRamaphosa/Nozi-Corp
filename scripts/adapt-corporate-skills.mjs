#!/usr/bin/env node
/**
 * One-time adapter: copy tier-1 corporate skills with Nozi FSP demo overlay.
 * Source: w95/awesome-claude-corporate-skills (MIT, Copyright Enrike 2026)
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const SOURCE_ROOT = process.env.CORPORATE_SKILLS_SRC ?? '/tmp/awesome-claude-corporate-skills';
const OUT_DIR = join(REPO_ROOT, 'skills/corporate');

/** @type {Array<{id:string, upstreamPath:string, source:string, overlay:'legal'|'finance'|'executive'}>} */
const TIER1 = [
  { id: 'compliance', upstreamPath: '06-legal-compliance/compliance', source: 'Anthropic KWP', overlay: 'legal' },
  { id: 'compliance-tracking', upstreamPath: '06-legal-compliance/compliance-tracking', source: 'Anthropic KWP', overlay: 'legal' },
  { id: 'legal-risk-assessment', upstreamPath: '06-legal-compliance/legal-risk-assessment', source: 'Anthropic KWP', overlay: 'legal' },
  { id: 'contract-review', upstreamPath: '06-legal-compliance/contract-review', source: 'Anthropic KWP', overlay: 'legal' },
  { id: 'nda-triage', upstreamPath: '06-legal-compliance/nda-triage', source: 'Anthropic KWP', overlay: 'legal' },
  { id: '3-statements', upstreamPath: '02-finance-accounting/3-statements', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'dcf-model', upstreamPath: '02-finance-accounting/dcf-model', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'comps-analysis', upstreamPath: '02-finance-accounting/comps-analysis', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'check-model', upstreamPath: '02-finance-accounting/check-model', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'unit-economics', upstreamPath: '02-finance-accounting/unit-economics', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'financial-plan', upstreamPath: '02-finance-accounting/financial-plan', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'dd-checklist', upstreamPath: '02-finance-accounting/dd-checklist', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'client-review', upstreamPath: '02-finance-accounting/client-review', source: 'Anthropic FSP', overlay: 'finance' },
  { id: 'knowledge-synthesis', upstreamPath: '01-executive-leadership/knowledge-synthesis', source: 'Anthropic KWP', overlay: 'executive' },
  { id: 'risk-assessment', upstreamPath: '01-executive-leadership/risk-assessment', source: 'Anthropic KWP', overlay: 'executive' },
];

const OVERLAYS = {
  legal: `## Nozi-Corp FSP Demo Overlay

> **Educational demo only — not legal advice.** Outputs support practitioner workflow rehearsal, not client-facing compliance determinations. A licensed South African financial services practitioner must review and approve all material.

- Apply **POPIA** (Protection of Personal Information Act) alongside GDPR/CCPA when handling personal information in SA demo scenarios
- Cite public FSCA/FAIS sources; flag items requiring qualified legal counsel
- Use demo client IDs only — no real client PII
- Pair with \`nozi-demo-disclaimer\` and \`fsp-sa-regulatory-context\` skills on all outputs

`,
  finance: `## Nozi-Corp FSP Demo Overlay

> **Educational demo only — not financial advice.** Models and analyses are illustrative workflow aids for a licensed FSP practitioner demo. No product recommendations or suitability determinations.

- Label assumptions explicitly; distinguish facts, projections, and opinions
- For SA demo context: practitioner review required before any client use; reference FAIS conduct themes where relevant
- Use demo/hypothetical client profiles only
- Pair with \`nozi-demo-disclaimer\` on all outputs

`,
  executive: `## Nozi-Corp FSP Demo Overlay

> **Educational demo only — not advice.** Synthesis and risk outputs support practitioner inbox reporting in the Studex FSP demo.

- Attribute sources; flag confidence and conflicts explicitly
- Route material decisions to the practitioner (\`me\`) via inbox or decisions.json
- Pair with \`nozi-demo-disclaimer\` on all outputs

`,
};

function buildHeader(entry) {
  return `> **Adapted from** [w95/awesome-claude-corporate-skills](https://github.com/w95/awesome-claude-corporate-skills) \`${entry.upstreamPath}/SKILL.md\` (source: ${entry.source})

`;
}

function stripBrokenRefNotes(body) {
  return body.replace(
    /See \[references\/[^\]]+\]\(references\/[^)]+\)[^\n]*/g,
    '(Upstream reference subdocs not vendored — see awesome-claude-corporate-skills repo for full references.)',
  );
}

async function adaptOne(entry) {
  const srcPath = join(SOURCE_ROOT, entry.upstreamPath, 'SKILL.md');
  let body = await readFile(srcPath, 'utf8');
  body = stripBrokenRefNotes(body);

  const header = buildHeader(entry);
  const overlay = OVERLAYS[entry.overlay];

  // Insert overlay after YAML frontmatter or after first heading block
  let adapted;
  if (body.startsWith('---\n')) {
    const end = body.indexOf('\n---\n', 4);
    if (end !== -1) {
      const fm = body.slice(0, end + 5);
      const rest = body.slice(end + 5).replace(/^\n+/, '');
      adapted = `${header}${fm}\n${overlay}${rest}`;
    } else {
      adapted = `${header}${overlay}${body}`;
    }
  } else {
    adapted = `${header}${overlay}${body}`;
  }

  const outPath = join(OUT_DIR, `${entry.id}.md`);
  await writeFile(outPath, adapted, 'utf8');
  console.log(`Wrote ${outPath} (${adapted.split('\n').length} lines)`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const entry of TIER1) {
    await adaptOne(entry);
  }
  console.log(`\nAdapted ${TIER1.length} corporate skills → skills/corporate/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

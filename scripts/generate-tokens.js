#!/usr/bin/env node
// reads: SPEC.md
// writes: tokens.css
// run: node scripts/generate-tokens.js
// trigger: any time SPEC.md changes
//
// Extraction rule: any line in SPEC.md matching `--token-name: value`
// (with or without a trailing `;`) is harvested into a minified
// :root {} block. Section headings, tables, and prose are ignored —
// only the token lines have to conform. Order of appearance is preserved.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SPEC_PATH = path.join(ROOT, 'SPEC.md');
const OUT_PATH = path.join(ROOT, 'tokens.css');

if (!fs.existsSync(SPEC_PATH)) {
  console.error('error: SPEC.md not found at', SPEC_PATH);
  process.exit(1);
}

const spec = fs.readFileSync(SPEC_PATH, 'utf8');

const TOKEN_LINE = /--([a-z0-9-]+)\s*:\s*([^;\n]+?)\s*;?\s*$/gim;
const tokens = [];
const seen = new Set();

for (const match of spec.matchAll(TOKEN_LINE)) {
  const name = match[1];
  const value = match[2].trim();
  if (seen.has(name)) {
    console.warn(`warn: duplicate token --${name} — keeping first occurrence`);
    continue;
  }
  seen.add(name);
  tokens.push(`--${name}:${value}`);
}

if (tokens.length === 0) {
  console.error('error: no tokens found in SPEC.md. Expected lines like `--color-primary-600: #0066FF`.');
  process.exit(1);
}

const css = `:root{${tokens.join(';')};}`;
fs.writeFileSync(OUT_PATH, css);

console.log(`wrote ${tokens.length} tokens → ${path.relative(ROOT, OUT_PATH)}`);

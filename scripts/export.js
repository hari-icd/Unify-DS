#!/usr/bin/env node
// reads: screens/[filename].html + tokens.css
// writes: exports/[filename].standalone.html
// run: node scripts/export.js screens/[filename].html
// use: feed output to use_figma — never the working HTML directly
//
// Pipeline:
//   1. compose() — flatten every <unify-include name="..."> into the
//      corresponding /components/[name].html, with prop substitution and
//      slot inlining. Done first so that token references inside components
//      get inlined alongside the screen's own tokens.
//   2. inline tokens.css — replace any <link rel="stylesheet" href="...tokens.css">
//      tag with a <style> block containing the full tokens.css. If no link
//      tag is found, inject before </head>, or prepend at top.
//
// The working file is never mutated — output goes to /exports.

const fs = require('fs');
const path = require('path');
const { compose } = require('./lib/compose');

const ROOT = path.resolve(__dirname, '..');
const TOKENS_PATH = path.join(ROOT, 'tokens.css');
const EXPORTS_DIR = path.join(ROOT, 'exports');

const arg = process.argv[2];
if (!arg) {
  console.error('usage: node scripts/export.js screens/[filename].html');
  process.exit(1);
}

const inputPath = path.isAbsolute(arg) ? arg : path.resolve(process.cwd(), arg);
if (!fs.existsSync(inputPath)) {
  console.error('error: input not found:', inputPath);
  process.exit(1);
}
if (!fs.existsSync(TOKENS_PATH)) {
  console.error('error: tokens.css not found. Run: node scripts/generate-tokens.js');
  process.exit(1);
}

const sourceHtml = fs.readFileSync(inputPath, 'utf8');
let composed;
try {
  composed = compose(sourceHtml);
} catch (e) {
  console.error('error:', e.message);
  process.exit(1);
}
const includesCount = (sourceHtml.match(/<unify-include\b/g) || []).length;
if (includesCount) console.log(`composed ${includesCount} <unify-include> tag${includesCount === 1 ? '' : 's'}`);

const tokens = fs.readFileSync(TOKENS_PATH, 'utf8').trim();
const styleBlock = `<style>${tokens}</style>`;

const LINK_TAG = /<link\b[^>]*href=["'][^"']*tokens\.css["'][^>]*>/i;
let out;
if (LINK_TAG.test(composed)) {
  out = composed.replace(LINK_TAG, styleBlock);
} else if (/<\/head>/i.test(composed)) {
  console.warn('warn: no tokens.css <link> tag found — injecting <style> before </head>');
  out = composed.replace(/<\/head>/i, `${styleBlock}</head>`);
} else {
  console.warn('warn: no <link> or <head> found — prepending <style> at top of document');
  out = styleBlock + composed;
}

fs.mkdirSync(EXPORTS_DIR, { recursive: true });
const base = path.basename(inputPath, path.extname(inputPath));
const outPath = path.join(EXPORTS_DIR, `${base}.standalone.html`);
fs.writeFileSync(outPath, out);

console.log(`wrote ${path.relative(ROOT, outPath)}`);

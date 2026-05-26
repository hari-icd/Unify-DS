#!/usr/bin/env node
// reads: screens/[filename].html + tokens.css
// writes: exports/[filename].standalone.html
// run: node scripts/export.js screens/[filename].html
// use: feed output to use_figma — never the working HTML directly
//
// Inlines tokens.css into a <style> block inside the HTML, replacing any
// <link rel="stylesheet" href="...tokens.css"> tag. If no link tag is
// present, the <style> block is injected just before </head> (or at the
// top of the document if no <head> exists). The working file is never
// mutated — output goes to /exports.

const fs = require('fs');
const path = require('path');

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

const html = fs.readFileSync(inputPath, 'utf8');
const tokens = fs.readFileSync(TOKENS_PATH, 'utf8').trim();
const styleBlock = `<style>${tokens}</style>`;

const LINK_TAG = /<link\b[^>]*href=["'][^"']*tokens\.css["'][^>]*>/i;
let out;
if (LINK_TAG.test(html)) {
  out = html.replace(LINK_TAG, styleBlock);
} else if (/<\/head>/i.test(html)) {
  console.warn('warn: no tokens.css <link> tag found — injecting <style> before </head>');
  out = html.replace(/<\/head>/i, `${styleBlock}</head>`);
} else {
  console.warn('warn: no <link> or <head> found — prepending <style> at top of document');
  out = styleBlock + html;
}

fs.mkdirSync(EXPORTS_DIR, { recursive: true });
const base = path.basename(inputPath, path.extname(inputPath));
const outPath = path.join(EXPORTS_DIR, `${base}.standalone.html`);
fs.writeFileSync(outPath, out);

console.log(`wrote ${path.relative(ROOT, outPath)}`);

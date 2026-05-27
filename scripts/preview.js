#!/usr/bin/env node
// Composes a screen, inlines tokens, and opens the result in the default browser.
//
// run: node scripts/preview.js [name|path]
//   - bare name:   `agent-config-instructions`   → screens/agent-config-instructions.html
//   - relative:    `screens/foo.html`            → screens/foo.html
//   - absolute:    `/full/path/to/foo.html`     → that path
//
// Falls through to scripts/export.js for the compose + token inlining,
// then opens the resulting `exports/[name].standalone.html` via the OS opener.

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
let arg = process.argv[2];

if (!arg) {
  console.error('usage: node scripts/preview.js [name|path]');
  process.exit(1);
}

// Normalise input — accept bare name OR path
if (!arg.endsWith('.html')) arg = `screens/${arg}.html`;
const inputPath = path.isAbsolute(arg) ? arg : path.resolve(ROOT, arg);

if (!fs.existsSync(inputPath)) {
  console.error('error: input not found:', inputPath);
  process.exit(1);
}

// Run export — let it print its own progress / errors
try {
  execSync(`node "${path.join(__dirname, 'export.js')}" "${inputPath}"`, { stdio: 'inherit' });
} catch (e) {
  process.exit(e.status || 1);
}

// Open the standalone export in the default browser
const base = path.basename(inputPath, path.extname(inputPath));
const outPath = path.join(ROOT, 'exports', `${base}.standalone.html`);

const opener = process.platform === 'darwin' ? 'open'
             : process.platform === 'win32' ? 'start ""'
             : 'xdg-open';

try {
  execSync(`${opener} "${outPath}"`, { stdio: 'ignore' });
  console.log(`opened ${path.relative(ROOT, outPath)}`);
} catch {
  console.log(`exported ${path.relative(ROOT, outPath)} — couldn't auto-open, please open manually`);
}

// Composition engine for /components/*.html
// Used by scripts/export.js (before tokens inlining) and any other tool
// that needs to flatten <unify-include> tags into a screen.
//
// Template syntax (intentionally tiny — no nesting, no loops):
//   {{var}}                         — attribute substitution
//   {{?key==val}}A{{:}}B{{/?}}      — ternary by equality
//   {{?key!=val}}A{{:}}B{{/?}}      — ternary by inequality
//   {{?key}}A{{:}}B{{/?}}           — ternary by truthiness (key present + non-empty)
//   {{#if key==val}}...{{/if}}      — conditional block (same forms as ternary)
//   {{slot}}                        — replaced with inner HTML of the include tag
//
// Include syntax (closing tag required to avoid HTML parser confusion):
//   <unify-include name="primary-rail" active="home"></unify-include>
//   <unify-include name="list-item-row" size="md" type="Checkbox" selected="False" state="Default">
//     ...inner content placed at {{slot}}...
//   </unify-include>

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const COMPONENTS_DIR = path.join(ROOT, 'components');

const INCLUDE_TAG = /<unify-include\s+([^>]*?)(?:\/>|>([\s\S]*?)<\/unify-include>)/g;
const ATTR = /(\w+)="([^"]*)"/g;
const TERNARY = /\{\{\?\s*(\w+)\s*(?:(==|!=)\s*([^}]+?))?\s*\}\}([\s\S]*?)\{\{:\}\}([\s\S]*?)\{\{\/\?\}\}/g;
const IFBLOCK = /\{\{#if\s+(\w+)\s*(?:(==|!=)\s*([^}]+?))?\s*\}\}([\s\S]*?)\{\{\/if\}\}/g;
const SUBST = /\{\{(\w+)\}\}/g;

function parseAttrs(s) {
  const out = {};
  ATTR.lastIndex = 0;
  let m;
  while ((m = ATTR.exec(s)) !== null) out[m[1]] = m[2];
  return out;
}

function applyProps(html, props) {
  html = html.replace(TERNARY, (_m, k, op, v, a, b) => {
    if (!op) return props[k] ? a : b;
    const match = (props[k] ?? '') === v;
    return (op === '==' ? match : !match) ? a : b;
  });
  html = html.replace(IFBLOCK, (_m, k, op, v, body) => {
    if (!op) return props[k] ? body : '';
    const match = (props[k] ?? '') === v;
    return (op === '==' ? match : !match) ? body : '';
  });
  html = html.replace(SUBST, (_m, k) => props[k] ?? '');
  return html;
}

function compose(html) {
  return html.replace(INCLUDE_TAG, (_match, attrStr, slot = '') => {
    const props = parseAttrs(attrStr);
    const name = props.name;
    if (!name) throw new Error('unify-include: missing name attribute');
    delete props.name;
    const file = path.join(COMPONENTS_DIR, `${name}.html`);
    if (!fs.existsSync(file)) {
      throw new Error(`unify-include: component not found: ${name} (looked at ${path.relative(ROOT, file)})`);
    }
    let fragment = fs.readFileSync(file, 'utf8');
    fragment = fragment.replace(/\{\{slot\}\}/g, slot.trim());
    fragment = applyProps(fragment, props);
    return fragment;
  });
}

module.exports = { compose, applyProps, parseAttrs };

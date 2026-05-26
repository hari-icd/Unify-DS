# {{DS Name}} — Prototype Generation System

## 1. What this project is

> Replace this section before starting: product name, prototype purpose, target audience.

{{DS Name}} is a self-sustaining prototype generation system for B2B SaaS screens. Claude generates principle-compliant HTML from a shared design system spec, a human reviews, and approved screens are written into Figma via MCP as real component instances. The audience for the final output is the development team building production applications — they consume specs from Figma Dev Mode. The HTML is the source of truth; Figma is the handoff surface.

## 2. Before every task

1. Read REGISTRY.md — component selection source
2. Read SPEC.md — all token decisions live here
3. Check DS-COMPONENTS.md only to verify if an unrecognised component exists in the DS
4. Never invent colors, spacing, or typography values not in SPEC.md
5. If tokens.css is missing, run `node scripts/generate-tokens.js` before generating HTML
6. Flag gaps explicitly — do not approximate silently

## 3. HTML generation rules

- Reference tokens via: `<link rel="stylesheet" href="../tokens.css">`
- Never inline tokens in HTML files
- All style values use `var(--token-name)` — no hardcoded values
- Every component attributed: `data-component="ComponentName/variant"`
- Every component attributed: `data-figma-name="Category/ComponentName"`
- New components flagged at top of file: `<!-- NEW: ComponentName -->`
- If component exists in DS but not REGISTRY: `<!-- NEW: ComponentName (exists in DS, not yet registered) -->`
- Prototypes only — optimise for visual fidelity, not code quality
- No lorem ipsum — use realistic product-appropriate content
- Viewport: 1440px fixed

## 4. Component selection rules

*Populated after Step 5 (registry bootstrap). Format:*

| Need | Use | Avoid |
|------|-----|-------|
| _(empty until REGISTRY.md is bootstrapped from real screens)_ | | |

## 5. Anti-patterns

- Do not use `alert` for success messages that can auto-dismiss
- Do not put two primary actions in the same scope
- Do not use a table for small key-value details
- Do not invent one-off patterns when a registry component exists
- Do not select from DS-COMPONENTS.md directly — it is verification only

## 6. Figma write rules

- Always run `export.js` before any Figma write — never write from the working HTML
- Use `search_design_system` to resolve component names to node IDs dynamically
- Never use static node ID mappings — always resolve at write-time
- Use `get_metadata` before `get_design_context` — drill to specific nodes only
- Place component instances, not flat frames

## 7. Maintenance rules

**tokens.css**
- Generated from SPEC.md. Never hand-edited.
- Regenerate after any SPEC.md change: `node scripts/generate-tokens.js`
- Token format in SPEC.md: lines matching `--token-name: value` are harvested. Section headings, tables, and prose around them are ignored.

**DS-COMPONENTS.md**
- Regenerate when DS components are added or renamed
- Names must stay in sync with actual Figma DS component naming
- Never add usage rules to this file — that belongs in REGISTRY.md

**Standalone export**
- Command: `node scripts/export.js screens/[filename].html`
- Output: `/exports/[filename].standalone.html`
- Use for Figma MCP write only
- Never commit `/exports`

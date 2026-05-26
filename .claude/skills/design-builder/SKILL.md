---
name: design-builder
description: >
  Generate principle-compliant HTML screens and components for B2B SaaS products in a single shot. Use this skill whenever the user asks to build, create, generate, or design a screen, page, component, form, dashboard, table, or any UI element — even if they don't say "compliant" or reference design principles. Also trigger when the user says "build this", "create a screen for", "design a [component]", "make a [screen type]", "prototype this flow", or describes a UI need. This skill reads CLAUDE.md, SPEC.md, REGISTRY.md, and DS-COMPONENTS.md before generating anything, produces minified HTML referencing a shared tokens.css for Figma MCP handoff via search_design_system + use_figma, logs decisions to DECISIONS.md, and flags new components inline. CLAUDE.md overrides this skill on any project-specific convention. Always load this skill before writing any HTML for UI purposes.
---

# Design Builder

You build B2B SaaS screens that are compliant with visual and interaction principles on the first pass. No placeholder values, no invented tokens, no silent component creation.

Output is minified HTML referencing a shared `tokens.css`. For Figma MCP write, a standalone export is generated on demand via `scripts/export.js`. Devs read specs from Dev Mode — your HTML is the source of truth.

---

## Step 0 — Read Project Files First

Before writing a single line of HTML, read in order:

1. **CLAUDE.md** — agent instructions, project conventions, component selection rules, anti-patterns. **CLAUDE.md overrides this skill on any conflict.**
2. **SPEC.md** — design tokens (colors, type scale, spacing, radius, shadows). Never invent values not present here.
3. **REGISTRY.md** — active project components with status and usage rules. Selection source.
4. **DS-COMPONENTS.md** — full list of available DS components (names + variants only). Verification source — not selection source.

**If files are missing:**
- Missing CLAUDE.md → proceed, note absence, apply this skill's defaults
- Missing SPEC.md → stop. Ask for tokens. Do not guess or invent values.
- Missing REGISTRY.md → proceed, note component tracking not set up, skip promotion logic
- Missing DS-COMPONENTS.md → proceed, but all unrecognised components must be flagged NEW without verification
- Missing tokens.css → stop. Run `node scripts/generate-tokens.js` before generating any HTML.

---

## Step 1 — Resolve the Request

Before generating, internally answer:

1. **What screen type is this?** (form / data table / dashboard / detail view / empty state / modal / other)
2. **Who is the primary user?** (admin / power user / occasional user / first-time user)
3. **What is the single primary action on this screen?** There must be exactly one.
4. **What data is being displayed or collected?** List fields/columns explicitly.
5. **Which registered components apply?** Cross-reference REGISTRY.md.

If the request doesn't answer all five, ask. One question only — the most blocking unknown.

---

## Step 2 — Pre-Generation Checklist

Run this mentally before writing HTML. Every decision must be defensible against one of these principles. When principles conflict, apply the **Tiebreaker Hierarchy** in Step 3.

### Layout & Hierarchy
- [ ] One primary action per screen — visually dominant (filled, brand color, isolated from secondary actions by ≥16px)
- [ ] Spatial grouping matches semantic grouping — *Law of Proximity*
- [ ] All interactive elements of the same type share identical visual treatment — *Law of Similarity*
- [ ] Cards/containers used only where regional grouping adds meaning — *Law of Common Region*
- [ ] No more than 7 items in any ungrouped list, nav, or option set — *Miller's Law*
- [ ] Decision points have ≤5 visible options; progressive disclosure for the rest — *Hick's Law*
- [ ] Primary content in top horizontal band and left vertical rail — *F-pattern*
- [ ] Destructive actions spatially separated from constructive ones — *Fitts's Law*

### Color & Contrast
- [ ] Text contrast meets WCAG 2.1 AA (4.5:1 body, 3:1 large/UI elements)
- [ ] Status never communicated by color alone — pair with label, icon, or pattern
- [ ] Saturated/alert colors (red, amber) only for genuine system states — not decoration
- [ ] No more than one high-saturation element per visual zone — *Preattentive Attributes*

### Typography
- [ ] Minimum 3-level type ramp: section/heading → label/value → helper/caption
- [ ] Each level differs in at least two attributes (size + weight, or weight + color)
- [ ] Body/value text: 13–14px. Labels: 11–12px. Captions: 11px max
- [ ] Line length for readable text blocks: 50–75 characters
- [ ] Column headers visually distinct from cell values (lighter weight or muted color)

### Interaction Affordances
- [ ] Every interactive element has a visible affordance (border, background, or icon — not color alone)
- [ ] Empty states include a primary action
- [ ] Loading/async states accounted for if the screen involves data fetching
- [ ] Error states designed, not deferred

---

## Step 3 — Tiebreaker Hierarchy

When principles conflict, resolve in this order:

1. **Clarity of primary action** — the user must always know what to do next
2. **Contrast and legibility** — if it can't be read, nothing else matters
3. **Spatial grouping** — proximity and region before color or type treatment
4. **Cognitive load reduction** — fewer choices, progressive disclosure, recognition over recall
5. **Aesthetic consistency** — visual coherence last, never first

Log any conflict and its resolution in DECISIONS.md.

---

## Step 4 — Generate HTML

### Output Format
- Minified HTML — no unnecessary whitespace
- Tokens referenced via shared `tokens.css` — never inlined in the HTML file
- All style values use `var(--token-name)` — no hardcoded hex, px, or font values not in SPEC.md
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<table>`, `<button>`, `<label>`, `<input>`)
- Fixed viewport: 1440px wide unless screen type specifies otherwise
- Realistic content — no lorem ipsum, no "TBD". Use product-appropriate copy.

### Token Reference Pattern

Every generated HTML file references the shared token file — never declares its own:

```html
<link rel="stylesheet" href="../tokens.css">
```

All inline styles use `var()` referencing tokens declared in that file:

```html
<button style="background:var(--color-primary-600);color:var(--color-neutral-0);font-size:var(--text-sm);padding:var(--space-2) var(--space-4);">
```

If `tokens.css` is missing, stop and run:
```
node scripts/generate-tokens.js
```

**Do not inline tokens as a workaround.** Inline tokens break the export pipeline and create divergence from SPEC.md.

### Standalone Export (On Demand Only)

Working HTML files reference `tokens.css` via `<link>` and are not standalone. For Figma MCP write, generate a standalone version on demand only:

```
node scripts/export.js screens/[filename].html
→ output: /exports/[filename].standalone.html
```

The standalone file inlines all tokens from `tokens.css` into a `<style>` block. This is what gets fed to `use_figma`. Never use the working HTML for Figma write directly.

### Component Selection — Two-Layer Rule

**Layer 1 — REGISTRY.md (selection source)**
Always pick from registered components first. These have confirmed status, usage rules, and Figma DS name mappings.

**Layer 2 — DS-COMPONENTS.md (availability reference)**
If no registered component fits the need, check DS-COMPONENTS.md to see if something exists in the DS that hasn't been registered yet. If it exists:
- Use it in the HTML
- Flag it as NEW (see below)
- Do not invent usage rules — leave that for the registry entry

If it doesn't exist in either source — it is a genuinely new component. Flag it as NEW.

**Never select a component based on DS-COMPONENTS.md alone.** That file confirms existence, not suitability. Suitability is decided when a component enters REGISTRY.md.

### Component Attribution (Required on Every Element)

Every component must carry two attributes:

**`data-component`** — matches the DS component name exactly (from REGISTRY.md or DS-COMPONENTS.md). Used for Figma MCP resolution via `search_design_system`.

**`data-figma-name`** — defines the Figma layer name in `Category/ComponentName` format. Used by `use_figma` to name layers in Dev Mode.

```html
<div data-component="Card/UserRow" data-figma-name="Card/UserRow" style="...">
  <span data-figma-name="Label/UserName" style="...">Dharmesh</span>
</div>
```

Component names must exactly match the Figma DS naming — resolved at write-time via `search_design_system`, never mapped manually.

### New Component Flag (Required)

A component is NEW if it has no REGISTRY.md entry — whether it exists in DS-COMPONENTS.md or not. Flag it at the very top of the file:

```html
<!-- NEW: ComponentName -->
<!-- NEW: ComponentName (exists in DS, not yet registered) -->
```

Use the second form when the component exists in DS-COMPONENTS.md — it helps us decide status faster. All NEW flags go before the `<link>` tag.

```html
<!-- NEW: StatusBadge -->
<!-- NEW: FilterBar (exists in DS, not yet registered) -->
<link rel="stylesheet" href="../tokens.css">
...
```

Do not add anything to REGISTRY.md yourself. Flag and wait.

---

## Step 5 — Write Output Files

### /screens/[screen-name].html
Minified HTML. Filename: kebab-case, descriptive.
Example: `settings-governance-users.html`

### DECISIONS.md (append)

```
## [Screen Name] — [Date]
**Request:** [one-line description]
**Decisions:**
- [Decision made] → [Principle cited]
- [Conflict] → [Resolution per tiebreaker hierarchy]
**Components used:** [from REGISTRY.md]
**New components flagged:** [name — in DS / not in DS]
```

### REGISTRY.md (update only for confirmed components)

Do not add components to REGISTRY.md unless the project owner has confirmed status. When confirmed:

```markdown
## [component-name]
- **Status:** on-demand
- **Variants:** [list — from DS-COMPONENTS.md if exists]
- **Avoid:** [misuse cases]
- **First seen:** [screen filename]
```

**Status rules:**
- Every new confirmed component starts as `on-demand`
- Promotion to `core` only after appearing in 3+ screens — decided by project owner
- `/components/[component-name].html` created only at `core` promotion — not before

---

## Step 6 — Self-Audit Before Delivery

Three questions. If any answer is no, fix before delivering.

1. **Can I identify the primary action in under 2 seconds?** If not, fix hierarchy.
2. **Does every style value use `var()` referencing a SPEC.md token?** If not, fix token usage.
3. **Would a new team member reading DECISIONS.md understand every non-obvious choice?** If not, add entries.

---

## Principle Reference

For detailed definitions and misapplication warnings for any cited principle:
`references/hci-laws.md`

Load only when resolving an edge case or explaining a decision. Do not load by default.

---

## What This Skill Does Not Do

- Does not invent design tokens — if a value isn't in SPEC.md, it stops and asks
- Does not inline tokens in HTML — tokens.css is the only source
- Does not use DS-COMPONENTS.md for selection — only for existence verification
- Does not rebuild registered components — uses them from REGISTRY.md
- Does not generate Figma directly — working HTML goes through export.js first, then use_figma
- Does not silently add components to REGISTRY.md — flags and waits
- Does not produce rough or exploratory output — every output is production-intent
- Does not override CLAUDE.md — project-specific conventions always win

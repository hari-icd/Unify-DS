# DECISIONS

Reasoning log. Format per entry: date, decision, reason, what was rejected and why.

---

## 2026-05-26 — SPEC.md token format
**Decision:** SPEC.md uses `--token-name: value` lines (CSS custom property syntax, with units like `px` on numeric values). Section headings, prose, and tables are ignored by the harvester.
**Reason:** Single forgiving rule for `scripts/generate-tokens.js`; readable in raw markdown; values can be pasted directly into CSS.
**Rejected:** Markdown tables (`| --name | value |`) — would need a separate regex and added little readability.

---

## 2026-05-26 — Token naming convention
**Decision:** Normalised Figma names into a flat, predictable scheme:
- Semantic colors → `--color-text-*`, `--color-bg-*`, `--color-fg-*`, `--color-border-*`
- Utility scales → `--utility-{family}-{step}` (e.g. `--utility-brand-600`)
- Palette base → `--color-white`, `--color-black`, `--color-transparent`
- Alpha scales → `--alpha-{family}-{step}` (e.g. `--alpha-brand-50`)
- Type → `--text-{step}`, `--leading-{step}`, `--weight-{name}`, `--tracking-{step}`, `--font-display`, `--font-body`
- Spacing → `--spacing-{step}` (none, xxs, xs, sm, md, lg, xl, 2xl…11xl)
- Radius → `--radius-{step}` (none, xxs, xs, sm, md, lg, xl, 2xl…4xl)
- Widths → `--width-{step}` and `--container-*`
- Shadows → `--shadow-{step}`, `--focus-ring-{kind}`, `--backdrop-blur-{step}`

**Reason:** Figma names contain spaces, parentheses, slashes, and inconsistent capitalisation — not valid CSS identifiers. Flat semantic-first naming maps cleanly to `var()` usage and the design-builder skill's selection logic.
**Rejected:** Verbatim Figma names (invalid CSS); deep nested prefixes like `--color-utility-brand-tertiary-600` (verbose, no value over `--utility-brand-tertiary-600`).

---

## 2026-05-26 — Palette raw scales not included in SPEC.md
**Decision:** Did **not** include the raw `Palette/*` scales (Palette/Gray/200 etc.). Only the `Colors/Utility/*` ramps made it in.
**Reason:** The plan says "semantic over primitives — always prefer semantic." Utility scales are already one step abstracted from raw palette and serve every component-variant case we've seen. Including the raw palette in parallel just doubles the token count and invites accidental selection from palette over utility.
**Rejected:** Including raw palette alongside utility (would create two parallel ramps with mostly identical hex values, e.g. `Palette/Gray/600` = `utility-gray-600` = `#6a6662`).
**Reversible:** If we ever need to define a new semantic token from a primitive not in the utility ramps, we add the palette entry to SPEC.md at that point.

---

## 2026-05-26 — Component-internal colors deferred
**Decision:** Did not include component-internal color tokens like `Component/Buttons/Neutral/Secondary/button-neutral-secondary-border`. SPEC.md holds foundation tokens only.
**Reason:** Component colors are derivatives of utility/semantic tokens and belong in component CSS (or `/components/*.html` once those land at core promotion). Mixing them into SPEC.md blurs the foundation/component boundary.
**Open:** When components are promoted to `core`, decide whether they reference utility tokens directly or get their own component-scoped CSS file.

---

## Open Items — Figma data quality

These are inconsistencies observed in the Figma `get_variable_defs` output. None blocking, but worth raising with whoever maintains the DS file.

### Typography font-family inconsistencies
- `Display sm/Semibold` uses **Inter** while every other Display weight uses **Spectral**. Likely a paste error in Figma.
- `Display xs/Semibold` returned **Spectral** in one call and **Inter** in another (cross-page inconsistency). Possibly two duplicate styles exist with the same name.
- `Text lg/Regular` returned **Geist @ 17px** from one page and **Inter @ 18px** from another. Same style name, different definitions.
- **SPEC.md choice:** standardised on Spectral for all Display sizes and Geist for all Text sizes. If the Figma file is the source of truth, these need reconciling there first.

### Radius scale collapses to 8 at mid-range
- `radius-md`, `radius-lg`, `radius-xl`, `radius-2xl` all resolve to `8`. Effectively the scale is `2 → 4 → 6 → 8 → 10 → 12` with four token names pointing at the same `8`.
- May be intentional (capping rounded corners), but worth confirming — if not, the names mislead.

### Shadow-lg has an unusually negative spread
- `Shadows/shadow-lg` second layer: `offset: (0, 12), radius: 12, spread: -80`. A spread of `-80` is extreme and almost certainly a Figma data error (typical Tailwind/UntitledUI shadow-lg has spread of `-4` to `-8`).
- **SPEC.md choice:** preserved as-is. The visual effect will be nearly invisible at that spread — flag and verify in Figma.

### Figma typo / naming drift in utility scales
- `utility-teal--50` and `utility-teal--100` have double dashes (the `--` collides with CSS custom-property syntax).
- `utility-mulbery-950` is misspelled (should be `mulberry`).
- `utility-warm blue-950` has a literal space.
- `Colors/Utility/Harbor Teal/utility-teal-950` uses the wrong family prefix (`utility-teal-` instead of `utility-harbor-teal-`).
- **SPEC.md choice:** normalised all of these to the expected form (`--utility-teal-50`, `--utility-mulberry-950`, `--utility-warm-blue-950`, `--utility-harbor-teal-950`).

### Two greys at the same step
- `Palette/Gray (light mode)/200` = `#edebe8`
- `Palette/Gray neutral/200` = `#e5e8eb`
- A "Gray neutral" scale exists alongside the main Gray scale, but only the `200` value showed up in our reads. Unclear if it's a full alternate ramp or a one-off. Not included in SPEC.md until clarified.

### Token gaps (not present in Figma — flag if needed later)
- **Motion / timing tokens:** no `duration-*` or `easing-*` variables found. The plan calls these out explicitly as "tokens to flag if missing." If we add transitions or micro-interactions, we'll need to pick values manually until the DS defines them.
- **Z-index scale:** no `z-*` tokens. Likely fine — Figma doesn't model layering. We'll define a small `z-1 / z-modal / z-tooltip` set in CSS if/when needed.

---

## 2026-05-26 — Core components extracted to /components/ + compose engine

**Decision:** `core` registry components now live as self-contained HTML fragments under `/components/` and are pulled into screens via `<unify-include name="..."></unify-include>`. `scripts/export.js` runs a `compose()` pass before inlining `tokens.css`.

**Reason:**
- Plan already provisioned `/components/` with the rule "promoted here at core status only" — this implements that rule.
- Single source of truth: change the primary rail in one file, every screen using it updates.
- The existing screen dropped ~30% in working-file size (28KB → 19KB) by lifting the rail to a component.
- `data-component` variant strings (`Current=True, State=Selected` vs `Current=False, State=Default`) are now computed by the component from a single prop — no per-item duplication of variant logic.

**Rejected:**
- **Native Web Components / `<template>` + customElements** — require JS at runtime; Figma MCP doesn't execute JS, so the write path would land empty placeholders.
- **Client-side `fetch` of fragments** — same JS-execution problem.
- **Server-side includes via a dev server** — adds a process to manage; the export-time compose covers both Figma write and reviewable output.
- **A full template engine (Handlebars, EJS)** — overkill for ~3 components today; the 60-line mini-engine handles `{{var}}`, `{{?cond}}A{{:}}B{{/?}}` ternary, `{{#if}}{{/if}}` blocks, and `{{slot}}` cleanly. Upgradable if it ever stops being enough.

**Component shapes — two kinds:**
- **Full components** (fixed content, parameterised): `primary-rail.html` — the 12 nav items are fixed across screens; only the `active` item varies. Drop in with `<unify-include name="primary-rail" active="home"></unify-include>`.
- **Shell components** (variable content): `secondary-nav.html`, `list-item-row.html` — outer chrome + data-component variant addressing live in the component; screens provide the inner items via the slot. Author chrome once, vary content per screen.

**Trade-off accepted:**
- Working HTML no longer renders correctly in a browser without running export first — `<unify-include>` is an unknown element that renders empty. Review now flows through `/exports/[name].standalone.html`. A live preview script is a possible follow-up but not built yet.

**Pipeline order:**
1. `node scripts/export.js screens/foo.html`
2. `compose()` flattens every `<unify-include>` against `/components/*.html` with prop + slot substitution
3. `tokens.css` is inlined into a `<style>` block, replacing the `<link>` tag
4. Output to `/exports/foo.standalone.html` — this is the only artifact `use_figma` should ever see

**Files added:**
- `scripts/lib/compose.js` — engine (~60 lines, zero deps)
- `components/primary-rail.html` — full component, `active` prop
- `components/secondary-nav.html` — shell, `type` / `layer_name` / `aria_label` props + slot
- `components/list-item-row.html` — shell, full variant prop matrix + slot

**Files updated:**
- `scripts/export.js` — now calls `compose()` before token inlining


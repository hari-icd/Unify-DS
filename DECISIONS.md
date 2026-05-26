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

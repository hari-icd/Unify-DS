# Unify DS — Prototype Generation System

## 1. What this project is

Unify DS is a self-sustaining prototype generation system for B2B SaaS screens. Claude generates principle-compliant HTML from a shared design system spec, a human reviews, and approved screens are written into Figma via MCP as real component instances. The audience for the final output is the development team building production applications — they consume specs from Figma Dev Mode. The HTML is the source of truth; Figma is the handoff surface.

### Default brief context

Unless a brief overrides these explicitly, assume:

- **Domain:** B2B SaaS enterprise. Other domains may appear — handle them on their own terms when they do, but default to enterprise patterns.
- **Primary users:** technical (admins, power users, operators, integrators). Engineered so non-technical users can still navigate without friction — clear labels, no unexplained jargon, recoverable mistakes.
- **Action hierarchy:** most screens carry multiple meaningful actions. **Do not collapse to a single CTA.** Establish deliberate weight: one dominant primary, one or two secondaries, the rest tertiary or in overflow menus. Hierarchy comes from treatment (filled vs ghost, color, position, isolation), not from removing actions.
- **Data shape:** enterprise-realistic — users, roles, permissions, orgs/tenants, contracts, billing, integrations, audit logs, workflows, tickets, API keys, SLAs, usage metrics, compliance artefacts.
- **Registry bootstrap:** REGISTRY.md stays empty until a component repeats across multiple screens. Improvise components from tokens for early screens; flag everything as `<!-- NEW: ... -->`; promote to REGISTRY only after the same pattern shows up enough to justify it.

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

### Icons

- **Source:** [Lucide](https://lucide.dev) for every icon need. Never mix icon libraries (no Heroicons, Feather, Material Symbols, custom SVG).
- **Format:** inline the SVG markup directly in the HTML. Never use the Lucide CDN script (`<script src="…lucide…">`) or icon-font approach — Figma MCP doesn't execute JS, so JS-rendered icons land in Figma as empty placeholders.
- **Attribution:** every icon `<svg>` carries `data-icon="lucide:icon-name"` (e.g. `data-icon="lucide:search"`). Used by the Figma write path to match icons and by REGISTRY.md when an icon pattern repeats.
- **Sizing:** 16px (sm — inside inputs, dense tables), 20px (md — buttons, nav items), 24px (lg — page-level affordances). Set via `width`/`height` SVG attributes, not CSS — Figma reads dimensions from the SVG.
- **Stroke:** keep Lucide default `stroke-width="1"` unless the brief calls for a lighter weight. Color via `stroke="currentColor"` so it inherits from the parent text colour token.

## 4. Component selection rules

Two `core` components exist in REGISTRY.md today. **When a screen needs either, use the exact Figma name — never improvise an alternative or rename.**

| Need | Use (data-component) | Avoid |
|------|----------------------|-------|
| Left primary icon rail (56–68 px wide) | `LC_Sidebar Navigation_Icon Only` | Custom rail; using a base unit standalone |
| Left primary sidebar, wide w/ labels (framed) | `LC_Sidebar Navigation_Framed` | Mixing with Stroke variant in same app |
| Left primary sidebar, wide w/ labels (stroke) | `LC_Sidebar Navigation_Stroke` | Mixing with Framed variant in same app |
| Top header bar | `LC_Header Navigation` | Custom header bar |
| Mobile / tablet bottom bar | `LC_Bottom Navigation` | Custom bottom bar |
| Secondary side nav (sub-config) | `Secondary navigation` | Reusing primary sidebar at sub-scope |
| Tertiary in-page nav | `Tertiary navigation` | Tabs (use Tabs for tabbed sections) |
| Full platform-level nav | `New_Platform Navigation` | Hand-rolling project/sub-menu structures |
| Tenant switcher | `Tentant Switcher` *(Figma spelling)* | Custom org switcher |
| Selectable row, bordered/elevated | `List Item Cardified` | `Table` (only for tabular data) |
| Selectable row, flat (inside a container) | `List Item` | Custom row patterns |
| Vertical selection tile | `List Item Cardified — Vertical` | Custom card grids |

**Variant syntax:** address variants exactly as Figma does — comma-separated `Key=Value` after a slash. Example: `data-component="List Item Cardified/Size=md, Type=Checkbox, Selected=False, State=Default"`. The full variant axes are in REGISTRY.md.

**Layer name vs component name:**
- `data-component` = the exact Figma component name from REGISTRY.md (used by `search_design_system` at write-time)
- `data-figma-name` = the Figma layer name in `Category/Name` format you want the placed instance to have

**Core components live in `/components/` and are referenced, not inlined.** Each `core` registry entry has a corresponding `/components/[name].html` file. Screens pull them in with:

```html
<unify-include name="primary-rail" active="home"></unify-include>
```

Shell components (variable content) accept slotted children:

```html
<unify-include name="secondary-nav" type="Settings" layer_name="ConfigSidebar" aria_label="Configuration sections">
  <a class="snav-item" aria-current="page" data-component="Settings_Nav item base/Current=True, State=Default, Type=Main" data-figma-name="Nav/ConfigItem">Instructions</a>
  ...more items...
</unify-include>
```

`scripts/export.js` runs `compose()` first (flattens includes) then inlines `tokens.css`. The working file shows blank where includes are — preview by running export and opening the standalone file in `/exports/`.

Component file conventions:
- Each component owns its own `<style>` block (do not re-declare component CSS in screens)
- All values use `var(--token-name)` — same token rules as screens
- `{{var}}`, `{{?cond==val}}A{{:}}B{{/?}}` ternary, `{{slot}}` — full syntax in `scripts/lib/compose.js`

For all other component needs (Buttons, Inputs, Tabs, Headers, Tables, Modals, etc.) — improvise inline in the screen, flag as `<!-- NEW: ... -->`, and let the registry + `/components/` grow from observed repetition.

## 5. Anti-patterns

- Do not use `alert` for success messages that can auto-dismiss
- Do not put two **equally-weighted** primary actions in the same scope — multiple actions are fine, but exactly one must dominate visually
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

## 8. Visual conventions (from the existing product)

Defaults observed in the live Unify Platform. Override only if a brief explicitly differs.

### Typography
- **Page titles and product/brand names:** Spectral, semibold (`--text-display-sm` or `--text-display-xs` depending on weight of the page). Not Geist.
- Section headings, body, labels, controls, breadcrumbs, helper text: Geist.

### Page chrome
- **Breadcrumb** on every interior page — small, `--color-text-tertiary`.
- **Page header pattern** = title row + tab subnav directly underneath.
- **Brand identity in headers** = product logo + serif name (e.g. "Nutshell" with its mark). Avoid the brand-filled-square-with-icon badge — that was a one-off, not the product convention.
- **Header right-side action order:** search (if relevant) → secondary actions → exactly one primary CTA → overflow icon.

### Layout by screen type
- **Tables / monitoring:** dense rows (32–36 px), low-chrome toolbar above the table (`Filter · Sort · Group · Date Filter · Hide Fields · Color · Summary · …` — text+icon buttons, no background). Status as small pills. Tight column hairlines.
- **Settings / detail:** two-column body — primary content left, docs/help/instructions panel right. Generous whitespace.
- **Power-user views (eval traces, logs, etc.):** three-column tolerated — list + detail + viewer.

### Forms
- Row layout, not stacked: **label (bold) + helper text (tertiary) on the LEFT, control on the right** of the same row. Hairline between rows inside a card.
- Toggles for boolean settings — brand-olive when on.

### Color discipline
- Brand olive: dominant CTA + active states + brand identity. Nowhere else.
- Status colors (`utility-success-*` / `utility-warning-*` / `utility-error-*`): pills and inline indicators only. Never page-level backgrounds.
- Default to gray-scale. The product is restrained — decoration earns its place.

### Dark mode
- The product supports dark mode. SPEC.md currently only has light tokens.
- If a brief asks for dark, stop and flag the token gap. Do not invent dark values.

## 9. Delivery convention

After generating or editing a screen, reply with a tight summary in this shape — no more, no less:

1. **File** — path to the working screen
2. **Top 3 judgment calls** — one line each, principle cited (e.g. "Publish dominates Preview — Von Restorff")
3. **NEWs flagged** — comma-separated component names; mark `(in DS)` for those already in Figma but unregistered
4. **Core components used** — names of any `<unify-include>`s pulled in

**Preview opens automatically** via a `PostToolUse` hook (`.claude/settings.json`) that watches `Write`/`Edit` on `screens/*.html` and runs `scripts/preview.js`. Do not run `preview.js` manually — the hook handles it.

Do NOT run `use_figma` in the same turn as generation. The Figma write gate is permanent — wait for explicit go.

When a brief is incomplete: ask **one** question — the most blocking unknown — never a list.

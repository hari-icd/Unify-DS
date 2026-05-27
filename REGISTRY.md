# REGISTRY

Active components, status, usage rules. **The selection source** for every generation.

- `core` — always in context. Use whenever the need fits. Never improvise an alternative.
- `on-demand` — exists, use if relevant. Not injected by default.
- `deprecated` — never generate.

**Variant addressing in HTML:** `data-component="ComponentName/Key=Value, Key=Value, ..."` mirroring Figma's variant syntax exactly. Example: `data-component="List Item Cardified/Size=md, Type=Checkbox, Selected=False, State=Default"`.

---

## List Item cards

- **Status:** `core`
- **Source:** Figma `List Item cards ✅` page — node `122:3484`
- **Promoted by:** project owner (pre-emptive, before first use)

### Component sets (pick one based on visual treatment)

| Set | Use for | Row size |
|---|---|---|
| `List Item Cardified` | Selectable rows that need a card-like border + lift | 768×64 (md), 768×52 (sm) |
| `List Item` | Same anatomy, flat (no card chrome) — for grouped lists inside an existing container | 768×68 (md), 768×52 (sm) |
| `List Item Cardified — Vertical` | Vertical selection tiles (radio-style, grid layouts) | 250×152 |

### Variant matrix — horizontal rows (`List Item Cardified` and `List Item`)

- **Size:** `md` (default) · `sm` (dense lists)
- **Type:** `Icon simple` (read-only display) · `Radio button` (single-select) · `Checkbox` (multi-select)
- **Selected:** `False` · `True`
- **State:** `Default` · `Hover` · `Focused` · `Disabled`

### Variant matrix — vertical (`List Item Cardified — Vertical`)

- **State:** `Default` · `Hover` · `Focused` · `Disabled`
- **Selected:** `False` · `True`

### Use for

- Selection grids and multi-option lists
- Settings panels where each option has a label, optional description, and selection affordance
- Browsing UIs with leading icons / trailing controls

### Avoid

- Tabular data — use `Tables` instead
- Single key-value detail rows — use a simple `<dl>` pattern
- Decorative cards that are not selectable — use a plain `Card`

### First seen

*(none yet — promoted to core ahead of use)*

---

## Navigation

- **Status:** `core`
- **Source:** Figma `Navigation ✅` page — node `82:1862`
- **Promoted by:** project owner (pre-emptive, before broader use)

Navigation is a **family**. Pick exactly one family member per scope (one primary, one secondary, etc.). Never compose a custom nav when a family member fits. Base units below are the parts those family members are built from — do not place them standalone.

### Family members — pick by scope

| Need | Use | Variants |
|---|---|---|
| Left primary rail, icon-only (56–68 px) | `LC_Sidebar Navigation_Icon Only` | `Floating: No \| Yes` · `Device: Desktop Vertical` · `Style: Framed \| Framed-lg \| Stroke` |
| Left primary sidebar, wide with labels (framed style) | `LC_Sidebar Navigation_Framed` | `Open: No \| Yes` · `Floating: No \| Yes` |
| Left primary sidebar, wide with labels (stroke style) | `LC_Sidebar Navigation_Stroke` | `Open: No \| Yes` · `Floating: No \| Yes` |
| Top header bar | `LC_Header Navigation` | `Floating: No \| Yes` · `Style: Stroke \| Solid` |
| Mobile / tablet bottom bar | `LC_Bottom Navigation` | `Floating: No \| Yes` · `Breakpoint: Mobile Bottom \| Tablet Bottom` · `Style: Framed \| Framed-lg \| Stroke` |
| Secondary side nav (sub-config like Settings, Copilot, Projects) | `Secondary navigation` | `Type: Settings \| Copilot \| Projects` |
| Tertiary in-page side nav | `Tertiary navigation` | `Property 1: Default` |
| Full platform-level nav (project / sub-menu structure) | `New_Platform Navigation` | `State: Open, Closed` · `Sub Menu: All Open \| All Collapsed \| Sub menu collapse` |
| Tenant switcher (multi-org accounts) | `Tentant Switcher` *(sic — preserve Figma spelling)* | `Type: Closed \| Open` |

### Base units — only used as parts of the family members above

- `Base_LC_Nav Unit_Icon Only` — `Type: Framed-lg \| Framed-md \| Framed-sm \| Filled \| Line` · `Current` · `Soft Fill` · `State`
- `Base_LC_Sidebar Nav Unit_Framed` — `Menu` · `State` · `Selected` · `Soft` · `Sub Menu`
- `Base_LC_Sidebar Nav Unit_Stroke` — `Menu` · `State` · `Selected` · `Sub Menu`
- `Base_LC_Header Nav Unit_Stroke` / `Base_LC_Header Nav Unit_Framed` — `Current` · `State` · `Type`
- `Settings_Nav item base` — `Current` · `State` · `Type: Main \| Nested`
- `Settings_Nav item dropdown base` — `Open` · `Current`
- `Base_Platform Nav Menu Unit` — `Menu` · `State` · `Selected`
- `Base_Platform Nav Sub-Menu Unit` — `Selected` · `State` · `Level` · `Chevron` · `Open`
- `Base_Platform Nav Project Unit` — `State`
- `Base_Platform Nav User Avatar Unit` — `State`
- `Base_LC_Sidebar Nav Sub Unit` — `State` · `Selected`
- `Nav Items` (Enterprise Search) — `Name: Search \| Chat \| Agent \| Spaces \| Apps \| History` · `State`

### Use for

- The whole nav system of the product — primary rail, secondary list, top header, bottom bar (mobile), tenant switcher
- Anywhere a screen has more than one nav surface

### Avoid

- Mixing family members of the same scope (e.g., a Framed sidebar next to a Stroke sidebar)
- Placing base units standalone — they only exist inside their family member
- Custom nav shells when a family member fits

### First seen

- `agent-config-instructions.html` — used `LC_Sidebar Navigation_Icon Only` (primary rail) + `Secondary navigation` (sub-config list)
- Existing screen used aliased `data-component` values; needs alignment to exact Figma names before Figma write — see DECISIONS.md.

---

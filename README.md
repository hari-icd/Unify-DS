# Unify DS — Prototype Generation System

A Claude-Code-driven loop for turning briefs into DS-compliant screens, with a human gate between generation and Figma write.

---

## Workflow

```
1. You brief   →   2. Claude generates   →   3. You preview   →   4. You triage NEWs   →   5. You ship
                                                  ↑                      ↓
                                                  └── iterate if needed ─┘
```

Each step is one action or one command. Iterate at step 3 if the preview is off; otherwise straight through.

### 1. You brief

Paste this template. Fill in what you know — leave the rest to CLAUDE.md defaults.

```
Screen name:   kebab-case-id
Type:          form | table | dashboard | detail | empty | modal | other
User:          (default per CLAUDE.md — override only if unusual)
Primary path:  the dominant action and how it gets done
Data:          fields / columns / KPIs the screen handles
Notes:         visual reference, variant constraints, copy, anything unusual
```

If a brief leaves a blocking unknown, Claude asks **one** question — never a list.

### 2. Claude generates

Screen lands at `screens/[name].html`. Claude replies with a tight summary:

- file path
- top 3 judgment calls (with the principle cited)
- NEW components flagged for triage
- which `core` components were pulled in via `<unify-include>`

Claude does **not** run export or write to Figma in the same turn.

### 3. Preview opens automatically

A `PostToolUse` hook in `.claude/settings.json` watches `Write`/`Edit` on `screens/*.html` and runs `scripts/preview.js` for you — composes includes, inlines tokens, opens the result in your default browser. No command to run.

If something's off, reply with what to change. Claude edits the working file; the hook re-fires; the browser tab refreshes.

(Manual fallback if the hook isn't active: `node scripts/preview.js [name]`.)

### 4. You triage NEW components

Each `<!-- NEW: ComponentName -->` at the top of the screen needs a decision:

| Decision | When | Action |
|---|---|---|
| **Skip** | One-off pattern | Leave inline, no registry entry |
| **Promote to `on-demand`** | Pattern might repeat | Add entry to REGISTRY.md |
| **Promote to `core`** | Pattern must repeat exactly | Registry entry + create `/components/[name].html` |

30-second decision per flag, most of the time.

### 5. You ship to Figma

When the HTML is approved, `use_figma` writes the standalone export. `search_design_system` resolves `data-component` names to component instances; `data-figma-name` becomes the layer name in Dev Mode.

Claude runs this when you say go.

---

## When things go off-script

- **Token missing from SPEC.md** — Claude stops and asks. Never invents values.
- **Brief conflicts with REGISTRY.md** (e.g. asks for a custom rail when one is registered) — Claude asks before generating.
- **Visual hierarchy is ambiguous** — Claude applies CLAUDE.md defaults and surfaces the call in the delivery summary + DECISIONS.md.
- **SPEC.md changed** — run `node scripts/generate-tokens.js` first; preview will error clearly if `tokens.css` is stale.

---

## What this is NOT for

- Not a production code generator — HTML is prototype-grade, optimised for visual fidelity and dev handoff
- Not a Storybook replacement — no component sandbox
- Not a token pipeline for production CSS — `tokens.css` is for the prototypes only
- Not self-running — the human gate at preview is permanent
- Not for FigJam, Slides, or Make files — design-mode only

# Unify DS — Prototype Generation System

A Claude-Code-driven loop for turning briefs into design-system-compliant screens, with a human gate between generation and Figma write.

## The loop

```
Brief → Claude generates HTML → Human gate → export.js → use_figma writes to Figma → Dev inspects in Dev Mode
```

The HTML is the source of truth. Figma is the handoff surface. Devs consume specs from Figma Dev Mode.

## Usage

1. Brief Claude with a screen description.
2. Claude reads `CLAUDE.md`, `SPEC.md`, `REGISTRY.md`, `DS-COMPONENTS.md` automatically.
3. Output lands in `/screens/[name].html` — minified, references `tokens.css` via `<link>`, every component carries `data-component` and `data-figma-name`.
4. Review the HTML in a browser. Approve or reject.
5. Run `node scripts/export.js screens/[name].html` to produce a standalone version in `/exports/`.
6. Feed the standalone file to `use_figma` — components resolve via `search_design_system` and land as real instances.

## Benefits

- **One source of truth.** SPEC.md drives `tokens.css`; tokens.css drives every screen. No drift.
- **Principle-compliant by default.** The `design-builder` skill runs a layout/contrast/typography checklist before producing HTML.
- **Real Figma components, not flat frames.** The write path resolves DS component names to live instances — Dev Mode reads correct specs out of the box.
- **NEW component flagging.** Anything outside the registry is flagged inline (`<!-- NEW: ... -->`) — no silent invention.
- **Decisions are durable.** `DECISIONS.md` captures every non-obvious call so we don't re-litigate them.
- **Reusable as a template.** The `template` branch is DS-agnostic — clone, swap one paragraph in CLAUDE.md, run Step 2 against a new Figma file, and you have a new system.

## What this is NOT for

- **Not a production code generator.** HTML here is prototype-grade. It optimises for visual fidelity and dev-handoff clarity, not bundle size, accessibility tree perfection, or runtime performance.
- **Not a Storybook replacement.** No component sandbox, no isolated state matrices.
- **Not a token pipeline for production CSS.** `tokens.css` is for the prototypes — production apps should consume tokens from their own DS package.
- **Not a self-running system.** Nothing goes to Figma without a human approving the HTML first. The gate is permanent.
- **Not a general design wiki.** REGISTRY.md tracks active components only. DS-COMPONENTS.md is a lookup table, not a usage guide.
- **Not for FigJam, Slides, or Make files.** The Figma write path is design-mode only.

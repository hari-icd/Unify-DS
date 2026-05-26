# HCI Laws & Principles — Extended Reference

Load this file when a critique requires deeper elaboration of a specific principle, or when the user asks "why does that matter?"

---

## Perceptual & Attention Laws

### Von Restorff Effect (Isolation Effect)
An item that visually differs from its peers will be remembered and noticed more.
**Correct use:** Differentiate the single most important element (primary CTA, critical alert).
**Misapplication warning:** If 4 out of 8 buttons are "highlighted," none are. Overuse collapses hierarchy entirely.

### Serial Position Effect
Users remember items at the beginning (primacy) and end (recency) of a list or sequence better than items in the middle.
**Correct use:** Put the most critical action at the beginning or end of a nav, toolbar, or list. Never bury it in the middle.
**Misapplication warning:** Designing purely for memory when the interface is used daily — habitual users scan spatially, not serially.

### Preattentive Attributes
Color, size, orientation, and motion are processed before conscious attention engages (~200ms). These are your fastest communication channels.
**Correct use:** Use color shifts for status change, size for hierarchy, motion only for genuine state change.
**Misapplication warning:** Motion used decoratively (e.g., animated backgrounds, hover shimmer) competes with functional preattentive signals and degrades comprehension.

### F-Pattern / Z-Pattern Reading
On content-heavy pages, users scan in an F-shape (two horizontal sweeps, then vertical). On sparse pages with defined visual anchors, they follow a Z.
**Correct use:** Place primary information along the top horizontal band and left vertical rail.
**Misapplication warning:** These are scan patterns for unfamiliar pages. Returning users navigate spatially. Don't over-engineer layout for first-time visitors if this is a daily-use tool.

---

## Cognitive Load Laws

### Miller's Law
Working memory holds approximately 7 (±2) chunks of information simultaneously.
**Correct use:** Group navigation items, form fields, and options into clusters of 5–7. Use progressive disclosure for anything beyond that.
**Misapplication warning:** "Chunk" means a meaningful unit, not just a visual group. Five tabs with 12 items each doesn't solve the problem — it defers it.

### Hick's Law
Decision time increases logarithmically with the number of choices.
**Correct use:** Limit options at decision points. Default selections, smart ordering, and progressive disclosure all reduce Hick cost.
**Misapplication warning:** Hick's Law applies to *choice*, not information density. Removing data from a dashboard doesn't help if the user still has to decide what to do — the decision is the bottleneck, not the display.

### Tesler's Law (Conservation of Complexity)
Every system has an irreducible amount of complexity. Simplifying the UI moves complexity to the system or to the user's mental model — it doesn't eliminate it.
**Correct use:** Accept that some tasks are complex. Design to make that complexity manageable, not invisible.
**Misapplication warning:** Hiding complexity behind a "simple" interface often creates catastrophic failure states. Users don't understand what went wrong because the system concealed how it worked.

### Fitts's Law
The time to acquire a target is a function of distance to and size of the target.
**Correct use:** Make frequently-used interactive targets large and close to where the user's pointer already is. Place destructive actions (delete, reject) far from common flows.
**Misapplication warning:** Fitts's Law is about acquisition time, not learnability. A giant button is still confusing if it's unlabeled.

### Doherty Threshold
System response under 400ms feels immediate and maintains flow. Above that, users disengage or doubt the system.
**Correct use:** Show loading states, skeleton screens, or progress indicators for anything that may exceed 400ms.
**Misapplication warning:** Fake speed (instant visual response before actual completion) works for perceived performance but creates trust erosion if the system then fails silently.

---

## Gestalt Principles

### Law of Proximity
Elements close together are perceived as a group.
**Correct use:** Use spatial grouping to associate labels with inputs, actions with their targets, metadata with its parent item.
**Misapplication warning:** If spacing is inconsistent across the layout, proximity signals break down and grouping becomes ambiguous.

### Law of Similarity
Elements sharing visual attributes (color, shape, size) are perceived as related.
**Correct use:** Use consistent visual treatment for all items of the same type (all primary CTAs look the same, all destructive actions look the same).
**Misapplication warning:** Visual similarity implies functional similarity to users. If two buttons look the same but do very different things, expect errors.

### Law of Common Region
Elements enclosed within a boundary are perceived as a group, even if not close together.
**Correct use:** Cards, panels, and containers create logical groupings. Effective for separating contexts in dense UIs.
**Misapplication warning:** Over-use of containers creates visual noise. When everything is in a card, nothing is grouped — it becomes a grid of identical boxes.

### Law of Prägnanz (Good Form)
Users perceive ambiguous visuals in the simplest possible form. Complexity must be earned.
**Correct use:** Strip anything that doesn't carry meaning. Every visual element should either communicate hierarchy, state, or relationship.
**Misapplication warning:** "Simple" isn't the same as "minimal." Removing affordances (borders, shadows, labels) in pursuit of minimalism creates confusion about what's interactive.

### Law of Uniform Connectedness
Elements connected by lines or paths are perceived as more strongly related than proximity alone creates.
**Correct use:** Use lines, arrows, or visual connectors to show dependencies, flows, or parent-child relationships explicitly.
**Misapplication warning:** Overuse creates visual noise. Reserve connectors for relationships that proximity and color can't communicate alone.

---

## Visual Design Principles

### Aesthetic-Usability Effect
Users perceive visually polished interfaces as easier to use, even when they aren't.
**Correct use:** Invest in visual polish — it builds trust and tolerance for friction.
**Misapplication warning:** It cuts both ways. A beautiful interface that fails a task creates a sharper trust collapse than an ugly one. Don't use aesthetics to hide broken flows.

### WCAG 2.1 AA Contrast Ratios
- Normal text (under 18px regular / 14px bold): 4.5:1 minimum
- Large text (18px+ regular / 14px+ bold): 3:1 minimum
- UI components and graphical elements: 3:1 minimum against adjacent color
**Misapplication warning:** WCAG compliance is a floor, not a ceiling. Hitting 4.5:1 on a small label in a dense form still produces a poor reading experience.

### Type Hierarchy as Navigation
Users scan headings and labels to navigate. They read body copy only after deciding a section is relevant.
**Correct use:** Establish distinct visual levels — at minimum: section heading, field label, body/value, helper/caption. Each level must differ in at least two attributes (size + weight, or weight + color).
**Misapplication warning:** Using size alone for hierarchy creates weak signal. A 14px medium and a 13px regular are nearly indistinguishable under pressure. Weight and color variation carry more hierarchy than size increments under 4px.

---

## Nielsen's 10 Usability Heuristics (Summary for Critique Use)

1. **Visibility of system status** — Always communicate what the system is doing
2. **Match between system and real world** — Use language and concepts familiar to the user
3. **User control and freedom** — Support undo, back, and escape
4. **Consistency and standards** — Same element, same behavior, always
5. **Error prevention** — Design to make mistakes impossible before detecting them
6. **Recognition over recall** — Show options; don't make users remember them
7. **Flexibility and efficiency** — Power-user shortcuts that don't burden novices
8. **Aesthetic and minimalist design** — Remove anything that competes with primary content
9. **Help users recognize, diagnose, recover from errors** — Error messages in plain language with a path forward
10. **Help and documentation** — Anticipate where users get lost; provide contextual help

Use these as a secondary check after the Layer 1/2/3 visual critique is complete.

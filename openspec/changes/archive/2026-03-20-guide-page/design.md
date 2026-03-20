## Context

PlanAPlant is a single-page HTML/CSS/JS site with no build system or backend. Currently `index.html` contains four logical sections: Hero, Simulation Dashboard, Materials List, and Build Guide (Recipe). The Simulation Dashboard is the flagship interactive feature; the Materials List and Build Guide are reference documentation for users who want to physically construct the IoT system.

The site uses `css/style.css` for all styles and `js/simulation.js` for the simulation logic. No JS framework or module bundler is used. A new `guide.html` page will share the same CSS and follow the same markup conventions.

## Goals / Non-Goals

**Goals:**
- `index.html` becomes simulation-focused: Hero + Simulation Dashboard only
- `guide.html` is a standalone reference page with the full Materials List, expanded step-by-step build guide, wiring details, code snippets, and system architecture diagram
- Navigation on both pages links them together clearly
- No new external dependencies introduced
- Shared `css/style.css` extended (not duplicated) for any guide-specific styles
- Guide page includes in-page anchor navigation for quick jumping between major sections (Materials, Steps 1–7, Architecture)

**Non-Goals:**
- Not adding server-side rendering, a build pipeline, or a JS framework
- Not rewriting the simulation logic or changing simulation behavior
- Not internationalizing the guide page beyond what already exists (TW purchase info stays as-is in materials)
- Not adding a CMS, search, or comments system
- Not redesigning visual identity or changing the color scheme

## Decisions

### D1: New file vs. SPA routing
**Decision**: Create `guide.html` as a new separate HTML file.

Alternatives considered:
- *Hash-based SPA routing* (`index.html#guide`) — would require JS to show/hide large DOM sections; adds complexity for zero benefit at this scale
- *iframe embed* — poor SEO, terrible print behavior, ugly

`guide.html` is a simple, printable, directly-linkable document. A plain HTML file is the right tool.

### D2: Where styles live
**Decision**: Add guide-specific classes to `css/style.css` rather than a separate `css/guide.css`.

The site is small. A second stylesheet adds a network request and a cognitive split for zero organizational benefit at current scale. If the stylesheet grows unwieldy later, splitting is easy.

### D3: Nav symmetry
**Decision**: Both pages share the same `<header>` markup with active-state differentiation via a body class or `aria-current`.

`index.html` nav: `Simulation` (anchor) | `Build Guide` (link to guide.html)
`guide.html` nav: `← Simulation` (link to index.html) | `Materials` | `Steps` | `Architecture` (anchors)

This gives each page a nav that makes sense for its content while visually sharing the site header.

### D4: Content expansion on guide page
**Decision**: Move existing content verbatim first; mark sections where expansion (wiring diagrams, troubleshooting, code fences) can be added as follow-on work.

Doing a full content expansion in the same change risks scope creep. The structural split is the core change; content depth improvements are a natural next change.

### D5: Print styles
**Decision**: Add a minimal `@media print` rule to hide the nav, hero, and simulation on the guide page so the build steps print cleanly.

Low-effort, high-value for workshop use.

## Risks / Trade-offs

- [Risk] Users bookmarked `index.html#recipe` or `index.html#materials` will hit 404-equivalent (section gone). → Mitigation: Add an HTML redirect comment or a lightweight JS redirect for those anchors in index.html pointing to guide.html, or accept the breakage since no production analytics suggest active deep-links.
- [Risk] Duplicated `<header>` and `<footer>` HTML across two files creates a maintenance burden. → Mitigation: Acceptable at current scale; document in a comment that they should stay in sync. Server-side includes or a static site generator would solve this if the site grows to 5+ pages.
- [Risk] guide.html may be slow to load if eventually expanded with many images/diagrams. → Mitigation: Out of scope for this change; image optimization handled separately when assets are added.

## Open Questions

- Should the guide page hero have its own distinct background/illustration, or reuse the same `.hero` section style as index.html? (Low stakes — defaulting to same style, can be changed cosmetically.)
- Should the 7 build steps on guide.html link to specific simulation dashboard anchors on index.html (e.g., "See the sensor in action → [Simulation]") or keep the pages fully independent? (Proposing independent for now; cross-links can be added editorially.)

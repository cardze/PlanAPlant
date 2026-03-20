## Why

The home page currently mixes the interactive IoT simulation with a lengthy build guide, creating a cluttered experience. Visitors trying to explore the simulation have to scroll past materials lists and construction steps, while builders looking for project instructions share a page designed for a different audience. Splitting these into dedicated pages gives each use case the focus and space it deserves.

## What Changes

- Create a new `guide.html` page containing the full step-by-step build guide with expanded detail per step, wiring diagrams, code blocks, and troubleshooting tips
- Move the Materials List section (Electronics, Plants/Soil, Software, Tools cards) from `index.html` to `guide.html`
- Move the Build Guide / Recipe section (7 step-cards + system architecture diagram) from `index.html` to `guide.html`
- Simplify `index.html` so it contains only the Hero and Simulation Dashboard sections, with navigation links to `guide.html`
- Update `index.html` nav and hero CTAs to link to `guide.html` instead of `#recipe` / `#materials`
- Add a richer in-page navigation on `guide.html` (anchors for Materials, Steps 1–7, Architecture) to support long-document browsing
- Apply shared `css/style.css` and `js/simulation.js` are unaffected; add any guide-specific styles in-page or in `css/style.css`

## Capabilities

### New Capabilities
- `guide-page`: A dedicated `guide.html` page that hosts the full project build guide — materials list, step-by-step construction instructions with expanded details, wiring diagram, code snippets, troubleshooting notes, and system architecture overview

### Modified Capabilities
<!-- none -->

## Impact

- `index.html` — remove Materials and Recipe sections; simplify nav to `Simulation` + `Build Guide →`; update hero CTA buttons
- `guide.html` — new file; contains all build reference content moved from index.html plus expanded per-step detail
- `css/style.css` — minor additions for guide-page-specific layout (sticky nav, guide hero, print styles)

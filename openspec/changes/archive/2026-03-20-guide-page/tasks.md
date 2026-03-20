## 1. Create guide.html scaffold

- [x] 1.1 Create `guide.html` at project root with `<!DOCTYPE html>`, `<head>` (charset, viewport, title "PlanAPlant – Build Guide", link to `css/style.css`), and `<body>` skeleton
- [x] 1.2 Add shared `<header>` with logo and guide-specific nav: `← Simulation` → `index.html`, `Materials` → `#materials`, `Steps` → `#steps`, `Architecture` → `#architecture`
- [x] 1.3 Add guide hero section with heading "Build Your Own PlanAPlant", subtitle (~2–3 hours, step-by-step), and estimated time badge
- [x] 1.4 Add `<footer>` matching index.html footer
- [x] 1.5 Add `<script src="js/simulation.js"></script>` only if TW toggle JS is needed, otherwise add an inline `<script>` for the tw-purchase toggle event delegation

## 2. Move Materials List to guide.html

- [x] 2.1 Cut the entire `<section id="materials" …>` block from `index.html` and paste it into `guide.html` as `<section id="materials" …>`
- [x] 2.2 Verify all four materials cards (Electronics, Plants/Soil, Software, Tools) are present in guide.html with their TW purchase banners and `data-tw` attributes intact
- [x] 2.3 Confirm the TW keyword toggle works on guide.html (click a table row → keyword row expands)

## 3. Move Build Guide / Recipe to guide.html

- [x] 3.1 Cut the entire `<section id="recipe" …>` block from `index.html` and paste it into `guide.html`; update the section `id` to `steps` and the `<h2>` as needed
- [x] 3.2 Verify all 7 step-cards are present with their full `<ol>` / `<ul>` content and `<pre><code>` blocks
- [x] 3.3 Confirm the System Architecture diagram section is present and renders correctly in guide.html

## 4. Clean up index.html

- [x] 4.1 Delete the (now-empty) `<section id="materials" …>` and `<section id="recipe" …>` placeholders from `index.html`
- [x] 4.2 Update `index.html` header nav: remove `#materials` and `#recipe` links; add `Build Guide` link → `guide.html`
- [x] 4.3 Update the hero "Build Guide" `<a>` button in `index.html` to link to `guide.html` (was `href="#recipe"`)
- [x] 4.4 Smoke-test `index.html` in browser: confirm only Hero + Simulation Dashboard render, no layout gaps

## 5. Styles for guide page

- [x] 5.1 Add `.guide-hero` variant styles to `css/style.css` if the guide hero needs differentiation (e.g., different subtitle style or time-estimate badge)
- [x] 5.2 Add a `@media print` section to `css/style.css` that sets `display: none` on `.site-header` and `.guide-hero` so the guide prints cleanly from step 1
- [x] 5.3 Verify guide.html renders correctly at mobile width (≤ 480 px) — materials tables scroll horizontally, step cards stack

## 6. Final verification

- [x] 6.1 Open `index.html` — simulation starts, nav "Build Guide" link opens guide.html, hero CTA "Build Guide" links to guide.html
- [x] 6.2 Open `guide.html` — in-page nav anchors (Materials, Steps, Architecture) jump to correct sections; "← Simulation" returns to index.html
- [x] 6.3 Verify TW keyword toggle works on guide.html
- [x] 6.4 Verify no broken links or missing assets on either page
- [x] 6.5 Check browser print preview of guide.html — header and hero hidden, step cards print with full content

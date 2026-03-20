## Context

PlanAPlant is a zero-dependency single-page app (`index.html` + `css/style.css` + `js/simulation.js`). The Materials section contains four `.materials-card` elements. Three of them (`Electronics`, `Garden`, `Tools`) list physical items that Taiwanese makers need to purchase locally. The `Software` card lists package manager commands that require no local store guidance.

The current markup has no purchase metadata. All display logic lives in `simulation.js`; there is no bundler or build step.

## Goals / Non-Goals

**Goals:**
- Surface per-category Taiwanese purchase channels once per card (banner level)
- Allow users to reveal Traditional Chinese search keywords per item on demand (toggle)
- Keep implementation zero-dependency, no build step required
- Leave simulation logic in `simulation.js` untouched

**Non-Goals:**
- Multi-language i18n framework
- Backend, API calls, or persistent state
- Purchase guidance for the Software card
- Affiliate links or pricing

## Decisions

### 1. `data-tw` attribute for keyword storage
Store TW keywords on each `<tr>` (tables) and `<li>` (tools list) as `data-tw="keyword1、keyword2"`.

**Rationale**: Keeps content co-located with its element; easy to maintain; no separate data file needed for a static site.

**Alternative considered**: A JS data object keyed by item name — rejected because it creates a tight coupling between JS string keys and HTML text content, making future edits error-prone.

### 2. Event delegation on container elements
Attach a single `click` listener to each `.materials-table` and `.tool-list`, not per-row.

**Rationale**: Fewer event listeners; works naturally with dynamically inserted toggle rows.

### 3. Toggle row with `colspan`
On click, insert a `<tr class="tw-row"><td colspan="3">🔍 搜尋關鍵字：…</td></tr>` immediately after the clicked row. Second click removes it.

**Rationale**: Spans the full table width cleanly. No CSS grid or flex rework needed.

### 4. Category banner as `<p class="tw-stores">` inside each card `<h3>` block
Place a `<p class="tw-stores">🛒 台灣購買通路：…</p>` directly after the `<h3>` heading in each applicable card.

**Rationale**: Simple DOM placement, easily styled, clearly associated with the card.

### 5. TW toggle code appended to `simulation.js`
Add the toggle handler as a self-contained IIFE at the end of `simulation.js`, after all existing simulation code.

**Rationale**: Avoids creating a new file for ~30 lines of code; the IIFE ensures no variable collisions with simulation globals.

**Alternative considered**: Inline `<script>` in `index.html` — rejected to keep HTML clean.

## Risks / Trade-offs

- **Risk**: Future edits to item names in HTML may orphan `data-tw` values → Mitigation: `data-tw` is on the same `<tr>` as the item, so any editor updating the row will see both.
- **Risk**: `colspan="3"` hardcodes column count; Electronics/Garden tables have 3 columns, Tools is a `<ul>` not a table → Mitigation: Tools uses a different toggle mechanism (`<span class="tw-row">` inserted after the `<li>` text), not a `<tr>`.
- **Trade-off**: Mixing TW Chinese text into an otherwise English page — accepted per user decision; keywords are clearly labelled and visually distinct.

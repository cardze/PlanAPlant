## Why

Taiwanese makers who want to build PlanAPlant need to know where to buy components locally. The current materials list has no purchase guidance, leaving users to guess search terms on local e-commerce platforms (Shopee TW, PChome,露天) or specialty stores (光華商場, garden centres). Adding Traditional Chinese search keywords and per-category store recommendations removes this friction.

## What Changes

- Add a **purchase-channel banner** at the top of each materials card (Electronics, Garden, Tools) listing the relevant Taiwanese stores/platforms
- Add a **clickable JS toggle row** per item in the materials tables: clicking an item name expands an inline row showing `🔍 搜尋關鍵字：<terms>` in Traditional Chinese, clicking again collapses it
- Add **click-to-expand toggle** for tools list items (`<li>`) in the Tools card using the same JS mechanism
- **Software card is excluded** — pip/apt commands are universal and need no TW-specific purchase guidance

## Capabilities

### New Capabilities
- `tw-purchase-info`: In-page Traditional Chinese purchase guidance for the materials list, including per-category store banners and per-item expandable search keyword rows driven by `data-tw` attributes and lightweight JS toggle logic

### Modified Capabilities
<!-- none -->

## Impact

- `index.html` — materials section markup: add `data-tw` attributes to `<tr>` rows and `<li>` items; add category banner `<p>` elements inside each materials card heading area
- `js/simulation.js` — add a small event-delegation handler for the toggle rows (no changes to simulation logic)
- `css/style.css` — add styles for the toggle row (fade-in, muted background, keyword typography)

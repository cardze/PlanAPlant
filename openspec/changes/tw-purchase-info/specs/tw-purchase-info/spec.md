## ADDED Requirements

### Requirement: Category purchase channel banner
Each applicable materials card (Electronics, Garden, Tools) SHALL display a one-line banner listing Taiwanese purchase channels (stores / platforms) immediately below the card heading. The Software card SHALL NOT display a banner.

#### Scenario: Electronics banner visible
- **WHEN** the user views the Electronics & IoT Hardware card
- **THEN** a banner reading `🛒 台灣購買通路：蝦皮 ／ 光華商場 ／ Arduino 專賣店` is visible below the card heading

#### Scenario: Garden banner visible
- **WHEN** the user views the Plants, Soil & Garden Supplies card
- **THEN** a banner reading `🛒 台灣購買通路：花市 ／ 園藝行 ／ 農會資材行 ／ 特力屋` is visible below the card heading

#### Scenario: Tools banner visible
- **WHEN** the user views the Tools You'll Need card
- **THEN** a banner reading `🛒 台灣購買通路：特力屋 ／ 五金行 ／ 家樂福` is visible below the card heading

#### Scenario: Software card has no banner
- **WHEN** the user views the Software & Tools card
- **THEN** no purchase channel banner is displayed

### Requirement: Per-item expandable TW search keywords
Each row in the Electronics and Garden materials tables, and each item in the Tools list, SHALL support a click-to-toggle interaction that reveals Traditional Chinese search keywords for that item. Clicking the item again SHALL collapse the keywords.

#### Scenario: User expands keywords for a table row item
- **WHEN** the user clicks on a materials table row that has a `data-tw` attribute
- **THEN** a keyword row appears immediately below it showing `🔍 搜尋關鍵字：<keywords>`

#### Scenario: User collapses keywords
- **WHEN** the user clicks the same table row a second time (keyword row is visible)
- **THEN** the keyword row is removed from the DOM

#### Scenario: User expands keywords for a tools list item
- **WHEN** the user clicks on a tools list item that has a `data-tw` attribute
- **THEN** an inline keyword label appears after the item text showing `🔍 搜尋關鍵字：<keywords>`

#### Scenario: Software card items are not expandable
- **WHEN** the user views or clicks items in the Software card
- **THEN** no keyword toggle interaction occurs

### Requirement: TW keyword data stored in markup
Every expandable item in the Electronics, Garden, and Tools cards SHALL carry its Traditional Chinese search keywords as a `data-tw` attribute on the corresponding `<tr>` or `<li>` element. The keywords SHALL be comma- or 、-separated and specific enough to return relevant results on Shopee TW or PChome.

#### Scenario: data-tw present on electronics rows
- **WHEN** the DOM is inspected for the Electronics table rows
- **THEN** each `<tr>` has a non-empty `data-tw` attribute containing at least one Traditional Chinese keyword

#### Scenario: data-tw present on garden rows
- **WHEN** the DOM is inspected for the Garden table rows
- **THEN** each `<tr>` has a non-empty `data-tw` attribute containing at least one Traditional Chinese keyword

#### Scenario: data-tw present on tools list items
- **WHEN** the DOM is inspected for the Tools list items
- **THEN** each `<li>` has a non-empty `data-tw` attribute containing at least one Traditional Chinese keyword

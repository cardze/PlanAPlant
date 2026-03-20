## 1. HTML — Add `data-tw` attributes to Electronics table

- [x] 1.1 Add `data-tw` to the Raspberry Pi 4 row: `樹莓派4、Arduino Mega 開發板`
- [x] 1.2 Add `data-tw` to the Capacitive Soil Moisture Sensor row: `電容式土壤濕度感測器、土壤濕度模組 防腐蝕`
- [x] 1.3 Add `data-tw` to the DHT22 row: `DHT22 溫濕度感測器、AM2302、防水溫濕度感測器`
- [x] 1.4 Add `data-tw` to the BH1750 row: `BH1750 光照度感測器、BH1750 I2C`
- [x] 1.5 Add `data-tw` to the 5V Submersible Pump row: `5V 沉水馬達、小型沉水幫浦、微型水泵`
- [x] 1.6 Add `data-tw` to the 2-Channel Relay row: `5V 二路繼電器模組、Arduino 繼電器板`
- [x] 1.7 Add `data-tw` to the MicroSD Card row: `MicroSD 記憶卡 16GB`
- [x] 1.8 Add `data-tw` to the Jumper Wires row: `杜邦線 公對公 公對母 母對母`
- [x] 1.9 Add `data-tw` to the Breadboard row: `麵包板 實驗板`
- [x] 1.10 Add `data-tw` to the USB-C Power Supply row: `5V 3A USB-C 電源供應器、樹莓派電源`
- [x] 1.11 Add `data-tw` to the Waterproof Enclosure row: `IP65 防水接線盒、戶外防水盒`

## 2. HTML — Add `data-tw` attributes to Garden table

- [x] 2.1 Add `data-tw` to the Planter Box row: `陽台長型花槽、花箱 60公分、自澆水花槽`
- [x] 2.2 Add `data-tw` to the Potting Mix row: `培養土、泥炭土替代、排水培養土`
- [x] 2.3 Add `data-tw` to the Perlite row: `珍珠石、珍珠岩`
- [x] 2.4 Add `data-tw` to the Fertiliser row: `緩釋肥 顆粒肥、奧綠肥`
- [x] 2.5 Add `data-tw` to the Seeds/Seedlings row: `番茄幼苗、九層塔種子、萵苣種子、香草植物苗`
- [x] 2.6 Add `data-tw` to the Drip Irrigation Tubes row: `4mm 滴灌管、滴灌軟管`
- [x] 2.7 Add `data-tw` to the Drip Emitters row: `滴箭、微噴頭、滴灌配件`
- [x] 2.8 Add `data-tw` to the Water Reservoir row: `10L 儲水桶、園藝蓄水桶`
- [x] 2.9 Add `data-tw` to the Cable Ties row: `束線帶、固定夾 管夾`

## 3. HTML — Add `data-tw` attributes to Tools list

- [x] 3.1 Add `data-tw` to the Screwdriver set `<li>`: `螺絲起子組 十字 一字`
- [x] 3.2 Add `data-tw` to the Wire stripper `<li>`: `剝線鉗、電線剪`
- [x] 3.3 Add `data-tw` to the Soldering iron `<li>`: `烙鐵 焊錫`
- [x] 3.4 Add `data-tw` to the Ruler `<li>`: `捲尺、直尺`
- [x] 3.5 Add `data-tw` to the Drill `<li>`: `電鑽 6mm 鑽頭`
- [x] 3.6 Add `data-tw` to the Laptop `<li>`: `筆記型電腦 SSH`
- [x] 3.7 Add `data-tw` to the Smartphone `<li>`: `手機 SSH App`

## 4. HTML — Add category purchase banners

- [x] 4.1 Add `<p class="tw-stores">🛒 台灣購買通路：蝦皮 ／ 光華商場 ／ Arduino 專賣店</p>` below the Electronics card `<h3>`
- [x] 4.2 Add `<p class="tw-stores">🛒 台灣購買通路：花市 ／ 園藝行 ／ 農會資材行 ／ 特力屋</p>` below the Garden card `<h3>`
- [x] 4.3 Add `<p class="tw-stores">🛒 台灣購買通路：特力屋 ／ 五金行 ／ 家樂福</p>` below the Tools card `<h3>`

## 5. JS — Add toggle handler in simulation.js

- [x] 5.1 Append an IIFE at the end of `simulation.js` that attaches a delegated `click` listener to each `.materials-table`
- [x] 5.2 In the handler, detect clicks on `<tr>` rows with a `data-tw` attribute; insert/remove a `<tr class="tw-row"><td colspan="3">🔍 搜尋關鍵字：…</td></tr>` immediately after the clicked row
- [x] 5.3 Attach a delegated `click` listener to `.tool-list`; detect clicks on `<li>` with `data-tw`; append/remove a `<span class="tw-keyword">🔍 搜尋關鍵字：…</span>` after the item text

## 6. CSS — Style the keyword toggle elements

- [x] 6.1 Add `.tw-stores` styles: muted text colour, small font size, margin below `<h3>`
- [x] 6.2 Add `.tw-row td` styles: muted background (`--color-surface` or equivalent), small font, padding, fade-in animation
- [x] 6.3 Add `.tw-keyword` styles: display block, muted colour, small font, top margin
- [x] 6.4 Add a `@keyframes twFadeIn` rule and apply it to `.tw-row` and `.tw-keyword`

## 7. Verification

- [x] 7.1 Open `index.html` in browser — confirm three category banners are visible in Electronics, Garden, and Tools cards; Software card has none
- [x] 7.2 Click each Electronics table row — confirm keyword row appears and disappears on second click
- [x] 7.3 Click each Garden table row — same toggle behaviour
- [x] 7.4 Click each Tools list item — confirm inline keyword span appears and disappears
- [x] 7.5 Confirm simulation still starts and runs correctly (no JS errors in console)

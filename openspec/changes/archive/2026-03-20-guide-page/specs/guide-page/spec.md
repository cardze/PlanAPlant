## ADDED Requirements

### Requirement: Guide page exists as a standalone HTML document
The system SHALL provide a `guide.html` file at the project root that is accessible directly via browser without any build step or server-side processing.

#### Scenario: Guide page loads in browser
- **WHEN** a user opens `guide.html` in a browser
- **THEN** the page renders with the site header, guide content, and footer without JavaScript errors

#### Scenario: Guide page is independent of simulation JS
- **WHEN** `js/simulation.js` is absent or fails to load
- **THEN** the guide page SHALL still render all content correctly (guide page does not depend on simulation logic)

---

### Requirement: Guide page navigation
The guide page SHALL include a header navigation with links to: the home/simulation page (`index.html`), the Materials section (`#materials`), the Build Steps section (`#steps`), and the System Architecture section (`#architecture`).

#### Scenario: Navigate back to simulation
- **WHEN** a user clicks the "Simulation" or "← Home" nav link on guide.html
- **THEN** the browser navigates to `index.html`

#### Scenario: In-page anchor navigation
- **WHEN** a user clicks a nav anchor link (Materials, Steps, Architecture)
- **THEN** the browser scrolls to the corresponding section on guide.html

---

### Requirement: Guide page contains full materials list
The guide page SHALL contain the complete Materials List with all four cards: Electronics & IoT Hardware, Plants/Soil & Garden Supplies, Software & Tools, and Tools You'll Need — including all existing TW purchase banners and data-tw toggle rows.

#### Scenario: Materials list displayed
- **WHEN** a user views the Materials section on guide.html
- **THEN** all four materials cards are visible with their items, quantities, and notes

#### Scenario: TW purchase toggle works on guide page
- **WHEN** a user clicks a materials row with a `data-tw` attribute on guide.html
- **THEN** an inline row appears showing the Traditional Chinese search keywords

---

### Requirement: Guide page contains full step-by-step build guide
The guide page SHALL contain all 7 build steps with their full content, rendered as step cards with numbered headers and ordered/unordered list details.

#### Scenario: All 7 steps present
- **WHEN** a user views the Steps section on guide.html
- **THEN** step cards numbered 1 through 7 are present, each with a heading and detailed instructions

#### Scenario: Code blocks render correctly
- **WHEN** a user views a step that contains `<code>` or `<pre><code>` blocks
- **THEN** the code is displayed in a monospace font with appropriate background styling

---

### Requirement: Guide page contains system architecture section
The guide page SHALL include the system architecture diagram section showing the data flow from Sensors → Raspberry Pi → Pump/Relay ↕ Cloud → Dashboard.

#### Scenario: Architecture diagram visible
- **WHEN** a user scrolls to the bottom of the guide page
- **THEN** the architecture diagram is rendered with all nodes and arrows

---

### Requirement: Guide page is printable
The guide page SHALL include print styles that hide the header navigation and hero section so that the materials list and build steps print cleanly.

#### Scenario: Print layout hides navigation
- **WHEN** a user prints guide.html or uses browser print preview
- **THEN** the header and hero section are not included in the printed output

---

### Requirement: Home page is simulation-focused
`index.html` SHALL only contain the Hero section and the Simulation Dashboard section. The Materials List and Build Guide sections SHALL be removed from `index.html`.

#### Scenario: Home page no longer contains materials or recipe sections
- **WHEN** a user views index.html
- **THEN** no Materials List or Build Guide content is present on the page

#### Scenario: Home page nav links to guide
- **WHEN** a user views the header nav on index.html
- **THEN** a "Build Guide" link is present and navigates to guide.html

#### Scenario: Home page hero CTA links to guide
- **WHEN** a user clicks the "Build Guide" button in the hero section on index.html
- **THEN** the browser navigates to guide.html

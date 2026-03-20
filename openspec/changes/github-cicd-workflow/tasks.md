## 1. GitHub Actions workflow scaffolding

- [x] 1.1 Create a CI workflow under `.github/workflows/` that runs on pull requests and default-branch pushes
- [x] 1.2 Create a deployment workflow under `.github/workflows/` that runs only for default-branch updates and uses GitHub Pages deployment actions with the required permissions
- [x] 1.3 Stage only the publishable site files into a temporary Pages artifact directory before upload

## 2. Static-site validation steps

- [x] 2.1 Add CI checks that fail when required site files such as `index.html`, `css/style.css`, or `js/simulation.js` are missing
- [x] 2.2 Add JavaScript syntax validation for the committed browser code in `js/simulation.js`
- [x] 2.3 Add HTML/CSS-oriented static validation steps suitable for the repository's zero-build structure
- [x] 2.4 Add workflow validation for `.github/workflows/*.yml` so malformed GitHub Actions definitions fail CI

## 3. Deployment artifact checks

- [x] 3.1 Add assertions that the staged Pages artifact contains required public files and excludes repository-only paths such as `openspec/`
- [x] 3.2 Ensure the deployment workflow fails before upload when artifact-content assertions do not pass

## 4. Documentation and verification

- [x] 4.1 Update `README.md` with CI trigger behavior, deployment behavior, workflow-testing behavior, and the required GitHub Pages repository settings
- [x] 4.2 Verify the workflow definitions are valid YAML and reference existing repository paths only
- [x] 4.3 Confirm the final pipeline design matches the spec: pull requests validate only, default-branch updates validate and deploy, workflow files are linted, and OpenSpec files are excluded from the published artifact
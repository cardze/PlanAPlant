## Why

PlanAPlant is currently a static site that must be opened manually from the repository, which makes it easy to ship broken HTML, CSS, or JavaScript changes and leaves deployment as an ad hoc manual step. Adding a GitHub-native CI/CD workflow gives the project a repeatable way to validate changes on pull requests and publish the site automatically from the default branch.

## What Changes

- Add a GitHub Actions continuous integration workflow that runs on pull requests and branch updates to validate the static site repository
- Add a GitHub Actions deployment workflow path that publishes the site automatically from the default branch to GitHub Pages
- Add lightweight repository automation checks appropriate for a zero-build HTML/CSS/JS project, including broken-file detection and basic static asset validation
- Add workflow-focused checks so changes to the GitHub Actions YAML and deployment artifact structure are validated before merge
- Document the required repository configuration and deployment expectations so contributors know how the pipeline behaves

## Capabilities

### New Capabilities
- `github-cicd-pipeline`: Repository-hosted GitHub Actions workflows that validate static site changes and deploy the published site from the default branch using GitHub-native automation

### Modified Capabilities
<!-- none -->

## Impact

- `.github/workflows/` — new GitHub Actions workflow definitions for CI validation and deployment
- Workflow validation tooling or CI steps — checks that lint workflow YAML and verify the staged deployment artifact contains only publishable site files
- `README.md` — deployment and contributor workflow documentation
- GitHub repository settings — Pages must be configured to deploy from GitHub Actions with appropriate workflow permissions
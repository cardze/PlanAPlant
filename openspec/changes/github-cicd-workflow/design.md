## Context

PlanAPlant is a zero-build static site composed of `index.html`, `css/style.css`, and `js/simulation.js`. The repository currently has no automation for validating changes, no deployment pipeline, and no separation between site assets and repository-only content such as OpenSpec artifacts.

The requested change introduces GitHub-hosted CI/CD without turning the project into a packaged application. The solution therefore needs to preserve the existing edit-and-open workflow for contributors while adding enough automation to catch broken commits and publish the site consistently.

## Goals / Non-Goals

**Goals:**
- Run automated validation for pull requests and default-branch pushes
- Publish the site automatically from the default branch using GitHub Pages
- Keep repository setup lightweight, with workflow logic living in GitHub Actions rather than a new local build system
- Ensure deployment publishes only the user-facing site files, not repository documentation or OpenSpec artifacts
- Add explicit checks for workflow correctness so CI/CD automation changes fail fast when the workflow definitions are invalid or the deployment artifact is shaped incorrectly

**Non-Goals:**
- Introduce a frontend framework, bundler, or package-managed build pipeline
- Add browser end-to-end testing or visual regression infrastructure
- Support multiple deployment targets beyond GitHub Pages
- Change the application runtime behavior in `index.html`, `css/style.css`, or `js/simulation.js`

## Decisions

### 1. Use separate CI and deployment workflows
Add one workflow for validation on `pull_request` and branch `push` events, and a second workflow for deployment on default-branch pushes.

**Rationale:** This keeps routine CI checks isolated from Pages deployment permissions, makes branch protection easier to reason about, and avoids exposing deployment credentials to pull request runs.

**Alternative considered:** A single workflow with conditional deploy jobs. Rejected because it mixes validation and privileged deployment concerns into one file and makes permissions harder to audit.

### 2. Keep validation focused on static-site integrity checks
The CI workflow will validate the repository using checks appropriate for a zero-build site: confirm required files exist, run JavaScript syntax validation, and run HTML/CSS-oriented static checks from the workflow runner.

**Rationale:** The repository has no application test suite today, so the first useful layer of CI is fast feedback on broken syntax, missing assets, and invalid entry-point markup.

**Alternative considered:** Adding a full local Node-based linting toolchain to the repository. Rejected because it introduces package management and maintenance overhead that is disproportionate to a three-file static site.

### 3. Stage a dedicated Pages artifact directory before deployment
The deployment workflow will copy the publishable web assets into a temporary site directory and upload that directory to GitHub Pages.

**Rationale:** Publishing the repository root would expose non-site files such as OpenSpec artifacts, repository metadata, and documentation. A staged artifact keeps the deployed output intentionally limited to the site.

**Alternative considered:** Deploy the repository root directly. Rejected because the repository contains content that should not appear on the public site.

### 4. Document repository configuration in README
The README will describe the workflow triggers, the expected GitHub Pages setup, and how contributors should interpret CI versus deployment runs.

**Rationale:** GitHub Actions alone is not enough; maintainers also need the repository Pages source set to GitHub Actions and must understand why pull requests validate without deploying.

### 5. Test the workflow definitions as part of CI
The CI workflow will include workflow-level validation, such as GitHub Actions linting and checks over the staged Pages artifact contents.

**Rationale:** A CI/CD change can fail even when the site code is fine. Testing the workflow files themselves reduces the risk of merging malformed YAML, invalid action structure, or a deployment artifact that accidentally includes repository-only content.

**Alternative considered:** Relying on GitHub to surface workflow errors only after merge. Rejected because it delays feedback and makes deployment failures harder to diagnose.

## Risks / Trade-offs

- Validation remains lighter than a full browser-based test suite -> Mitigation: scope CI to structural checks that are reliable today and leave room for stronger testing later if the project grows
- Deployment depends on GitHub Pages repository settings in addition to committed workflow files -> Mitigation: document the required settings in README and design the workflows to fail clearly when Pages is not configured
- Separate workflows duplicate a small amount of validation logic -> Mitigation: accept the duplication in exchange for clearer permissions and simpler workflow triggers
- Workflow linting adds a small amount of CI setup complexity -> Mitigation: use a focused, well-supported workflow linter and simple file-list assertions rather than building a custom test framework

## Migration Plan

1. Add the CI and deployment workflow files under `.github/workflows/`
2. Add workflow validation steps that lint the workflow YAML and verify the staged Pages artifact contents
3. Update the README with contributor and maintainer guidance for the pipeline
4. Enable GitHub Pages for the repository with GitHub Actions as the deployment source
5. Merge the change to the default branch and verify the first deployment completes successfully

Rollback consists of disabling GitHub Pages or reverting the workflow files if the pipeline behaves incorrectly.

## Open Questions

No open questions at this stage. The implementation can proceed assuming GitHub Pages is the intended deployment target for this static site.
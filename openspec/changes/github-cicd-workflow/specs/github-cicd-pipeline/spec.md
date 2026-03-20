## ADDED Requirements

### Requirement: Pull requests and branch updates are validated in GitHub Actions
The repository SHALL run a continuous integration workflow in GitHub Actions for pull requests and default-branch pushes. The workflow SHALL validate that the static site entry point and required asset files are present, that committed source files pass repository-defined static checks, and that the workflow definitions themselves pass repository-defined workflow validation checks.

#### Scenario: Pull request validation runs automatically
- **WHEN** a contributor opens or updates a pull request against the default branch
- **THEN** GitHub Actions starts the CI workflow for that change set

#### Scenario: Broken site files fail CI
- **WHEN** the repository is missing a required site file or a static validation check fails during the CI workflow
- **THEN** the workflow run is marked failed and does not report a successful validation status

#### Scenario: Invalid workflow definition fails CI
- **WHEN** a committed GitHub Actions workflow file fails workflow validation checks
- **THEN** the CI workflow run is marked failed before the change can be considered successfully validated

### Requirement: Deployment is limited to successful default-branch updates
The repository SHALL deploy the published site only for successful updates to the default branch. Pull request validation runs SHALL NOT publish a deployment.

#### Scenario: Default-branch update deploys the site
- **WHEN** a commit is pushed to the default branch and the deployment workflow's validation steps succeed
- **THEN** the workflow publishes a new GitHub Pages deployment for the site

#### Scenario: Pull requests do not deploy
- **WHEN** the CI workflow runs for a pull request event
- **THEN** no GitHub Pages deployment is created from that run

### Requirement: Only web assets are included in the deployment artifact
The deployment workflow SHALL publish only the files required to serve the PlanAPlant site, including the main HTML file and referenced static asset directories. Repository-only files and planning artifacts SHALL be excluded from the published Pages artifact.

#### Scenario: Site artifact contains public app files
- **WHEN** the deployment workflow prepares the Pages artifact
- **THEN** the artifact includes `index.html` and the static asset directories used by the site

#### Scenario: Repository planning files are excluded
- **WHEN** the deployment workflow prepares the Pages artifact
- **THEN** repository-only paths such as OpenSpec change files are not included in the published Pages artifact

#### Scenario: Artifact composition is checked before deploy
- **WHEN** the deployment workflow stages the Pages artifact
- **THEN** the workflow validates that required public files are present and repository-only paths are absent before uploading the artifact

### Requirement: Pipeline behavior is documented for maintainers and contributors
The repository SHALL document the CI trigger conditions, deployment trigger conditions, and required GitHub Pages repository settings in project documentation.

#### Scenario: Maintainer can configure Pages correctly
- **WHEN** a maintainer follows the project documentation after the workflow files are added
- **THEN** they can identify that GitHub Pages must use GitHub Actions as the deployment source

#### Scenario: Contributor understands validation behavior
- **WHEN** a contributor reads the project documentation before opening a pull request
- **THEN** they can determine that pull requests run validation checks but do not publish deployments
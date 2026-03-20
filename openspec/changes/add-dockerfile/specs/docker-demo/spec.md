## ADDED Requirements

### Requirement: Docker image serves the PlanAPlant web app
The project SHALL include a `Dockerfile` that builds an nginx-based container image serving the PlanAPlant static web application.

#### Scenario: Build succeeds
- **WHEN** a user runs `docker build -t planaaplant .` in the project root
- **THEN** the build completes without errors and produces a tagged image

#### Scenario: Container serves the app on mapped port
- **WHEN** a user runs `docker run -p 8080:80 planaaplant`
- **THEN** the PlanAPlant dashboard is accessible at `http://localhost:8080`

#### Scenario: Static assets load correctly
- **WHEN** the container is running and a browser navigates to the root URL
- **THEN** `index.html`, `css/style.css`, and `js/simulation.js` are all served with HTTP 200

### Requirement: Docker image excludes non-application files
The project SHALL include a `.dockerignore` file that prevents `openspec/`, markdown documentation, and version-control metadata from being copied into the image.

#### Scenario: openspec directory not present in image
- **WHEN** the Docker image is built
- **THEN** the `/usr/share/nginx/html/openspec/` path does NOT exist inside the container

#### Scenario: README excluded from image
- **WHEN** the Docker image is built
- **THEN** `README.md` and `LICENSE` are NOT present inside the container

### Requirement: README documents Docker usage
The `README.md` SHALL include a Docker section explaining how to build and run the container.

#### Scenario: User can follow Docker instructions to run demo
- **WHEN** a user reads the README and follows the Docker commands
- **THEN** they can build the image and access the demo in a browser without any additional configuration

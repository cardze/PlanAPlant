## Why

PlanAPlant is currently opened by double-clicking `index.html`, which works locally but makes it impossible to share a live demo via a URL or deploy to any container platform. A Dockerfile lets anyone spin up the simulation dashboard instantly with a single `docker run` command — no browser file-path quirks, no "open this file" instructions.

## What Changes

- Add a `Dockerfile` that packages the static site (`index.html`, `css/`, `js/`) into an nginx-based image.
- Add a `.dockerignore` to keep the image lean (exclude `openspec/`, `*.md` docs, etc.).
- Update `README.md` with Docker usage instructions (`docker build` + `docker run`).

## Capabilities

### New Capabilities
- `docker-demo`: Serve the PlanAPlant static web app from a Docker container using nginx, accessible on a configurable host port.

### Modified Capabilities
<!-- none -->

## Impact

- New files: `Dockerfile`, `.dockerignore`
- Modified files: `README.md` (add Docker section)
- No changes to application code (`index.html`, `css/`, `js/`)
- No breaking changes; existing "open index.html" workflow still works
- Requires Docker to be installed to use the new capability

## Context

PlanAPlant is a purely static web app (HTML + CSS + JS, zero backend). Currently the only way to view it is to clone the repo and open `index.html` directly in a browser. There is no existing server, build tool, or containerisation setup.

## Goals / Non-Goals

**Goals:**
- Package the static assets into a Docker image that serves them over HTTP.
- Keep the image as small and dependency-free as possible.
- Require only `docker build` + `docker run` to demo the project.

**Non-Goals:**
- HTTPS termination (handled by the host infrastructure if needed).
- Pushing the image to a registry (outside the scope of this change).
- Adding a Node/Python backend or build pipeline.

## Decisions

### Base image: `nginx:alpine`
nginx:alpine is ≈10 MB and is purpose-built for serving static files. Alternatives considered:
- `python:alpine` + `http.server` — no extra config needed, but ~50 MB and not production-ready.
- `node:alpine` + `serve` — adds Node runtime and an npm package for no benefit.
- `httpd:alpine` (Apache) — comparable size but nginx is more commonly used for static demos.

**Decision**: `nginx:alpine` — smallest, fastest, most familiar for static hosting.

### Copy strategy: COPY only the app assets
Copy `index.html`, `css/`, and `js/` into `/usr/share/nginx/html/`. Do not copy `openspec/`, `README.md`, `LICENSE`, or any tooling files.

**Decision**: Use a `.dockerignore` to exclude non-app files, then `COPY . /usr/share/nginx/html/`. This is simpler and more maintainable than listing each asset directory individually.

### Port: expose 80 (default nginx)
The container listens on 80. Users can map it to any host port via `-p <host-port>:80`.

**Decision**: Stick with nginx default (port 80) — no custom nginx config file needed.

## Risks / Trade-offs

- [Risk] Large repo assets accidentally bundled → Mitigation: `.dockerignore` explicitly excludes `openspec/`, `*.md`, `.git`, etc.
- [Risk] nginx default config caches aggressively in some browsers → Mitigation: acceptable for a demo; can add `Cache-Control` headers later if needed.
- [Risk] Future addition of a build step breaks the simple COPY approach → Mitigation: multi-stage builds can be introduced then; the current Dockerfile stays simple until needed.

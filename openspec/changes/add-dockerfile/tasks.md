## 1. Add Docker configuration files

- [ ] 1.1 Create `Dockerfile` in the project root using `nginx:alpine` base image, copying `index.html`, `css/`, and `js/` to `/usr/share/nginx/html/`
- [ ] 1.2 Create `.dockerignore` in the project root excluding `openspec/`, `*.md`, `LICENSE`, `.git`, and any other non-app files

## 2. Update documentation

- [ ] 2.1 Add a **Docker** section to `README.md` with `docker build` and `docker run` commands and a note about the default port mapping

## 3. Verify

- [ ] 3.1 Run `docker build -t planaaplant .` and confirm the build succeeds with no errors
- [ ] 3.2 Run `docker run -p 8080:80 planaaplant` and confirm the dashboard loads at `http://localhost:8080`
- [ ] 3.3 Confirm `css/style.css` and `js/simulation.js` are served correctly (check browser network tab or `curl`)
- [ ] 3.4 Confirm `openspec/` and `README.md` are not present inside the container (`docker run --rm planaaplant ls /usr/share/nginx/html/`)

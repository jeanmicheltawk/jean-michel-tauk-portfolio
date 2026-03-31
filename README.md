# Jean-Michel Tauk - Premium Portfolio

High-end one-page personal portfolio built with **vanilla JavaScript** (no Angular/React/Vue), modular architecture, and premium dark UI aesthetics.

## Tech Highlights

- Dark-only modern design system with gradient and glassmorphism styling
- Modular component rendering and interaction architecture
- Code-split effects via dynamic `import()` for non-critical modules
- Lazy-loaded visuals (particles + custom cursor) using idle callbacks
- Scroll reveal animations, parallax, sticky glass navbar, active section sync
- Scroll progress indicator, counters, timeline accordion, project modal

## Run

Because this project is dependency-free, you can run it using any static server.

Example with Python:

```bash
python -m http.server 5500
```

Open: [http://localhost:5500](http://localhost:5500)

## Structure

```text
index.html
assets/
src/
  data/content.js
  main.js
  modules/
  styles/main.css
```

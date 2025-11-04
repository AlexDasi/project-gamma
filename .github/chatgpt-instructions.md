## Project Snapshot
- PHP front-end site; entry points like `index.php`, `about.php`, `editor.php` reuse shared layout fragments from `phpelements/*`.
- Includes ship with their own `<head>/<body>` blocks; align page structure before trimming to avoid duplicate tags during refactors.
- 3D editor stack (`editor.php`, `js/editor.js`) loads `content/camisa.glb` and expects mesh child IDs `shirt` and `buttons`; keep names stable when exporting models.
- Home experience builds parallax “Steal the Look” strips via `phpelements/stl-home.php` plus Rellax (see `js/stl-home.js`).
- Journal and secondary pages mirror the home markup patterns; updates should honor the existing section class hierarchy.

## Running & Building
- Serve locally with PHP includes via `php -S 127.0.0.1:8000` from the repo root; static preview without PHP will miss nav/footer fragments.
- Static assets assume root-relative URLs; when deploying under a subpath, adjust include links or add rewrites.
- JavaScript files are loaded directly with `<script>` tags; there is no bundler or transpilation pipeline in play.
- Node dependencies exist mainly for vendored assets (e.g., `node_modules/rellax/rellax.min.js`); run `npm install` only when bumping those libraries.
- After styling changes, rebuild CSS (see below) and hard-refresh—no hot reload/watch task is configured.

## Styling Conventions
- Author styles in SCSS entrypoints (`scss/style.scss`, `scss/style-for-editor.scss`); compiled CSS under `css/` is checked in but should remain generated.
- The Prepros workflow lives in `prepros.config`; CLI alternative is `npx sass scss/style.scss css/style.css` plus `npx sass scss/style-for-editor.scss css/style-for-editor.css`.
- Utility partials in `scss/utilities/` define palette, typography, and layout mixins; prefer helpers like `@include main-text`.
- Component partials follow a BEM-ish pattern (for example, `.stl-list__block--home` in `scss/pagesStyles/_stl.scss`); extend existing blocks instead of inventing new naming schemes.

## JavaScript Patterns
- Fetch-driven widgets (`js/journal-home.js`, `js/stl-home.js`) read JSON payloads in `js/*.json` and inject markup via template literals; keep those field names stable.
- Three.js swatches come from the `colors` array in `js/editor.js`; add fabrics by appending entries that reference `content/images/patterns/*`.
- The editor tray slider relies on the `#js-tray` wrapper, `data-option` attributes, and manual drag handlers near the bottom of `js/editor.js`.
- Navbar overlays are toggled inline inside `phpelements/nav*.php` and mirrored in `js/overlay-menu.js`; update both spots together.
- Legacy prototypes (`js/index.js`, `js/horizontal-scroll.js`, `js/model.js`) are unused in production but document past experiments—confirm before deleting or rewriting them.

## Content & Data
- Images, fonts, and GLTF assets live under `content/`; keep relative paths consistent with the PHP templates and JSON feeds.
- Journal and gallery modules hydrate from `js/journal-home.json`, `js/journal.json`, and `js/camisas.json`; maintain the `image`, `footer`, `h3`, `text` schema.
- Copy is embedded directly in the PHP pages; there is no CMS layer, so keep strings localized to the file that renders them.

## Integration Notes
- Set `$navTransparent = TRUE;` before including `phpelements/nav.php` when a transparent header is required; otherwise the class stays empty.
- Footer and nav includes currently emit full HTML scaffolding; if you refactor them, verify each page still opens and closes tags correctly.
- External scripts load from CDNs (Three.js r127, GLTFLoader, OrbitControls); changes in versions can break the editor—regression-test rotations and swatches.
- Responsive behavior hinges on helpers in `scss/utilities/_mquery.scss`; validate both `.mobileHidden` and `.desktopHidden` breakpoints when adjusting layouts.

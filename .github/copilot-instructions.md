## Copilot guidance for project-gamma

This repo is a PHP-based single-site with a Swiper-driven UI and modular SCSS. It’s not a WordPress runtime locally, though some templates include legacy WP calls. The code runs with PHP’s built-in server and hand-compiled Sass.

### How to run and build
- Start server (from repo root): use PHP built-in server at http://localhost:8000.
- Build styles: compile `scss/style.scss` to `css/style.css` (source maps are supported).
- No test framework or lint config is present; changes are validated manually in browser.

Example commands (for reference):
- Start: `php -S localhost:8000`
- Build CSS: `npx sass scss/style.scss css/style.css`

### Project structure essentials
- PHP templates
  - Pages: `php-pages/` (e.g., `home.php`, `works.php`, `about.php`, `contact.php`).
  - Elements: `php-elements/` (e.g., `header.php`, `nav.php`, `footer.php`, `preloader.php`). Pages include these.
  - Entry: `index.php` selects and includes page content.
- Frontend JS
  - Swiper config: `js/swiper/swiper.js` (desktop) and `js/swiper/swiperMobile.js` (mobile).
  - Cursor/magnet effects: `js/magnet.js`, `js/cursor.js`, plus utilities in `js/`.
- Styles
  - Sass sources in `scss/` with partials in `layout/`, `utilities/`, and feature modules.
  - Compiled CSS outputs to `css/style.css`.
  - Hover effects vendor module at `scss/hover-effects/` (has its own README/Gulpfile; generally copy CSS or import SCSS effect files as needed).
- Assets: `content/` and `images/` hold pictures, vectors, and videos.

### Architecture and key behaviors
- Main navigation uses a vertical Swiper instance on `.MainSwiper` (see `js/swiper/swiper.js`).
  - Pagination bullets are custom-rendered labels: HOME, WORKS, ABOUT, CONTACT.
  - The “arrow” UI flips up on the last slide and clicking it returns to the first slide.
- Works gallery uses a horizontal Swiper on `.WorksSwiper` with freeMode enabled.
  - Loop is intentionally disabled to avoid freeMode jump-glitches.
  - Pseudo-infinite scroll is implemented by cloning the original slides to both ends of the wrapper before Swiper init, then starting at a middle offset.
  - Do not enable `loop: true` with `freeMode` here; it causes jump/reposition issues. Adjust `duplicateTimes` and `calculatedInitialSlide` together when changing slide counts.

Snippet (from `js/swiper/swiper.js`) illustrating the pattern:
```js
const worksWrapper = document.querySelector('.WorksSwiper .swiper-wrapper');
let originalSlides;
const duplicateTimes = 3;
if (worksWrapper) {
  originalSlides = Array.from(worksWrapper.querySelectorAll('.swiper-slide'));
  for (let i = 0; i < duplicateTimes; i++) originalSlides.forEach(s => worksWrapper.appendChild(s.cloneNode(true)));
  for (let i = 0; i < duplicateTimes; i++) for (let j = originalSlides.length - 1; j >= 0; j--) worksWrapper.insertBefore(originalSlides[j].cloneNode(true), worksWrapper.firstChild);
}
const totalOriginalSlides = originalSlides ? originalSlides.length : 0;
const calculatedInitialSlide = totalOriginalSlides * duplicateTimes + 3;
new Swiper('.WorksSwiper', { freeMode: { enabled: true, momentum: true }, loop: false, centeredSlides: true, slidesPerView: 'auto', speed: 100, initialSlide: calculatedInitialSlide });
```

### Project-specific conventions
- BEM-like classes for layout modules (e.g., `info-column`, `info-column--experience`).
- Mobile-first Sass with overrides via media queries in layout partials (see `scss/layout/_about.scss`).
- Keep Swiper config split by device where appropriate (`swiper.js` vs `swiperMobile.js`).
- Conventional commit style is encouraged (e.g., `fix(about): align columns on desktop`).

### Known integration points and pitfalls
- Legacy WordPress hooks in `php-elements/footer.php` (`bloginfo()`, `wp_nav_menu()`, `wp_footer()`).
  - Locally (non-WP), guard these with `function_exists()` or comment them to avoid fatals.
- jQuery is available; Swiper v8 is used. Avoid mixing undocumented globals—`swiperBottomScrollbarFull` is referenced in a resize handler but not defined in `swiper.js`; don’t rely on it unless you locate/restore its definition.
- Images/videos are served statically from `content/`; mind relative paths in PHP includes.

### Typical workflows for agents
- Styling: edit SCSS partials under `scss/`, then compile to `css/style.css`.
- Swiper tweaks: update `js/swiper/swiper.js` and verify no regressions with pseudo-infinite scroll.
- PHP content: edit page files in `php-pages/` and shared includes in `php-elements/`.
- Local serve: run PHP server and test in browser; watch console for Swiper or WP-call errors.

### Examples to follow
- About page alignment: `scss/layout/_about.scss` removes extra top margins on desktop.
- Arrow behavior + pagination sync: implemented in `js/swiper/swiper.js` via `on.slideChange` and a custom `updatePagination()` helper.

If anything above is unclear (e.g., expected Swiper behavior or how to safely gate WP calls), flag it and we’ll refine this guide.

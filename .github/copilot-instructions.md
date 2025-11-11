## Copilot guidance for project-gamma

This repo is a PHP-based single-site with a Swiper-driven UI and modular SCSS. It's not a WordPress runtime locally, though some templates include legacy WP calls. The code runs with PHP's built-in server and hand-compiled Sass.

### How to run and build
- Start server (from repo root): use PHP built-in server at http://localhost:8000.
- Build styles: compile `scss/style.scss` to `css/style.css` (source maps are supported).
- No test framework or lint config is present; changes are validated manually in browser.

Example commands (for reference):
- Start: `php -S localhost:8000`
- Build CSS: `npx sass scss/style.scss css/style.css --style=expanded --source-map`

### Recent Project Status (November 2025)
**Current State**: Complete Elsa project implementation with all assets, structure, and styling unified.
**Latest Commits**: All changes committed and deployed to GitHub main branch (commit 86f60ce).
**Active Features**: Horizontal thumbnails, unified link styling, complete project integration.
**Elsa Project Specifications**:
- Horizontal thumbnail format (1536x1024) matching Clustag dimensions
- Strategic website links to www.elsa-moreno.com throughout project page
- Properly cropped animation GIF (800x431) preserving browser context
- Unified accent-color background styling for all project links
- Complete asset collection: ELSA.jpg, iphone-elsa 1.jpg, Macbook-elsa.jpg, Macbook-elsa 2.jpg, elsa-animation.gif

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

### Complete Project Creation Workflow (ESSENTIAL)
When creating a new project (e.g., "Elsa"), follow this exact structure:

#### 1. Asset Organization
- **Images**: Place all project images in `content/pictures/projects/[project-name]/`
- **Thumbnails**: Generate thumbnails in `content/pictures/thumbnails/`
  - Desktop: `[project-name].jpg` 
  - Mobile: `[project-name]-mobile.jpg`
  - **Clustag dimensions**: 1536x1024 (3:2 ratio) - use this for horizontal thumbnails
  - **Vertical format**: 1024x1536 (2:3 ratio) - for traditional vertical layouts
- **Animations**: Place GIFs in project folder, crop appropriately with ImageMagick

#### 2. Thumbnail Creation Commands
```bash
# For horizontal thumbnails (like Clustag/Elsa):
sips -z 1024 1536 "source-image.jpg" --out "content/pictures/thumbnails/project-name.jpg"
sips -z 1024 1536 "source-image.jpg" --out "content/pictures/thumbnails/project-name-mobile.jpg"

# For vertical thumbnails (traditional):
sips -z 1536 1024 "source-image.jpg" --out "content/pictures/thumbnails/project-name.jpg"
sips -z 1536 1024 "source-image.jpg" --out "content/pictures/thumbnails/project-name-mobile.jpg"
```

#### 3. PHP Project Page Structure
Create `php-pages/projects/[project-name].php` with this exact structure:
```php
<?php include '../../php-elements/header-works.php'; ?>
<?php include '../../php-elements/nav new.php'; ?>

<div class="project-content">
    <div class="project-hero">
        <img src="../../content/pictures/projects/[project]/main-image.jpg" alt="Project Title">
    </div>
    
    <div class="project-info">
        <div class="slice-infos">
            <div class="slice-infos__text">
                <p>Project description with potential <a href="website-url">links</a>.</p>
            </div>
        </div>
        
        <div class="info-column">
            <div class="info-column--experience">
                <h3>Experience</h3>
                <p>Project type/category</p>
            </div>
            <div class="info-column--responsibilities">
                <h3>Responsibilities</h3>
                <p>Role description</p>
            </div>
            <div class="info-column__text">
                <p>Credits: <a href="website-url">Author Name</a></p>
            </div>
        </div>
    </div>

    <div class="project-content__quote">
        <p>"Quote text with <a href="website-url">website link</a>"</p>
    </div>

    <div class="project-gallery">
        <!-- Additional project images -->
        <img src="../../content/pictures/projects/[project]/image2.jpg" alt="">
        <img src="../../content/pictures/projects/[project]/animation.gif" alt="">
        <!-- More images as needed -->
    </div>
</div>

<?php include '../../php-elements/js-nofluid.php'; ?>
```

#### 4. CSS Integration Requirements
- **Swiper positioning**: Add hover rules in `scss/layout/_swiper.scss`:
```scss
.works-[project-name] {
  .works--details {
    left: [position]%; // Adjust based on thumbnail format
  }
  .works--info {
    // Specific positioning for horizontal/vertical thumbnails
  }
}
```

- **Link styling**: Ensure unified link appearance in `scss/layout/_projects.scss`:
```scss
.slice-infos__text a,
.info-column__text a,
.project-content__quote a {
    position: relative;
    background: var(--accent-color);
    text-decoration: none;
    z-index: 0;
    // Additional styling properties
}
```

#### 5. Integration into Portfolio
- **Works page**: Add project to swiper in `php-pages/works.php`
- **Position**: Insert between existing projects in appropriate order
- **Navigation**: Ensure proper swiper slide functionality

### Image Processing Tools & Commands
- **sips** (macOS native): Primary tool for image resizing and format conversion
- **ImageMagick**: For advanced operations like GIF cropping
  ```bash
  # Crop GIF (example from Elsa project):
  magick "source.gif" -crop +0+15 "cropped-output.gif"
  ```
- **Format conversion**: Always maintain aspect ratios, prefer JPG for photos

### Git Workflow Integration
- Always commit changes in logical groups
- Include CSS compilation in commits when SCSS is modified
- Use descriptive commit messages following conventional commits
- Push to main branch after testing locally

### Known integration points and pitfalls
- Legacy WordPress hooks in `php-elements/footer.php` (`bloginfo()`, `wp_nav_menu()`, `wp_footer()`).
  - Locally (non-WP), guard these with `function_exists()` or comment them to avoid fatals.
- jQuery is available; Swiper v8 is used. Avoid mixing undocumented globals—`swiperBottomScrollbarFull` is referenced in a resize handler but not defined in `swiper.js`; don't rely on it unless you locate/restore its definition.
- Images/videos are served statically from `content/`; mind relative paths in PHP includes.
- **Thumbnail dimensions are critical**: Wrong dimensions will cause layout issues in swiper carousel

### Examples to follow
- About page alignment: `scss/layout/_about.scss` removes extra top margins on desktop.
- Arrow behavior + pagination sync: implemented in `js/swiper/swiper.js` via `on.slideChange` and a custom `updatePagination()` helper.
- **Elsa Project**: Perfect example of complete project creation workflow with horizontal thumbnails, unified styling, and proper asset organization.

### Typical workflows for agents
- **New Project Creation**: Follow complete workflow above (assets → thumbnails → PHP page → CSS → integration)
- Styling: edit SCSS partials under `scss/`, then compile to `css/style.css`.
- Swiper tweaks: update `js/swiper/swiper.js` and verify no regressions with pseudo-infinite scroll.
- PHP content: edit page files in `php-pages/` and shared includes in `php-elements/`.
- Local serve: run PHP server and test in browser; watch console for Swiper or WP-call errors.
- **Git workflow**: Always compile SCSS → add changes → commit with descriptive message → push to main

If anything above is unclear (e.g., expected Swiper behavior or how to safely gate WP calls), flag it and we'll refine this guide.

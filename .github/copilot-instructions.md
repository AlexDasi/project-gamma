# Copilot Instructions for Camisola Project

## Architecture Overview
This is a PHP-based Hawaiian shirt customization website with a 3D editor and content management system. The project uses a modular PHP architecture with shared components and a custom SCSS build system.

### Key Components
- **PHP Pages**: Entry points (`index.php`, `editor.php`, `about.php`) include shared fragments from `phpelements/`
- **3D Editor**: Three.js-based shirt customizer (`editor.php` + `js/editor.js`) loading `content/camisa.glb`
- **Content System**: JSON-driven content feeds for journal and gallery sections
- **Asset Pipeline**: SCSS compilation via Prepros or manual Sass compilation

## Development Patterns

### PHP Structure
```php
<?php $navTransparent = TRUE; // Set before nav include for transparent header ?>
<?php include 'phpelements/nav.php'; ?>
```
- All pages follow this include pattern
- `phpelements/` contains reusable fragments: `nav.php`, `footer.php`, `head.php`
- Navigation transparency controlled by `$navTransparent` variable

### SCSS Organization
- Main entry: `scss/style.scss` → `css/style.css`
- Editor-specific: `scss/style-for-editor.scss` → `css/style-for-editor.css`
- Utilities in `scss/utilities/`: `_variables.scss`, `_mixins.scss`, `_typography.scss`
- Component styles in `scss/pagesStyles/` and `scss/layout/`
- Use existing BEM-ish classes like `.stl-list__block--home`

### JavaScript Architecture
- **No bundler**: Scripts loaded directly via `<script>` tags
- **JSON-driven content**: `js/journal.json`, `js/camisas.json` feed template literals
- **3D Editor**: Fabric swatches defined in `colors` array in `js/editor.js`
- **External deps**: Three.js r127, GLTFLoader r92, OrbitControls, Rellax for parallax effects
- **Version compatibility**: Three.js core (r127) with older loaders (r92) - maintain this specific combination

### Content Management
```javascript
// Journal content structure in js/journal.json
{
  "image": "content/images/journal/blog1.jpg",
  "h3": "Title",
  "text": "Description", 
  "footer": "Caption"
}

// Editor colors array supports both textures and solid colors
{
  texture: 'content/images/patterns/1.webp',
  size: [4,4,4],
  shininess: 0
},
{
  color: 'acb4b9'  // hex color without #
}
```

## Development Workflow

### Local Development
```bash
# Serve with PHP includes
php -S 127.0.0.1:8000

# Compile SCSS (alternative to Prepros)
npx sass scss/style.scss css/style.css
npx sass scss/style-for-editor.scss css/style-for-editor.css
```

### File Conventions
- **Content**: All assets in `content/` directory with consistent relative paths
- **Patterns**: Fabric textures in `content/images/patterns/` referenced by `js/editor.js`
- **3D Models**: GLB files expect mesh names `shirt` and `button` (singular) for editor targeting
- **Texture formats**: Support .webp, .jpeg, .png in patterns directory

### Responsive Design
- Use existing utility classes: `.mobileHidden`, `.desktopHidden`
- Media queries in `scss/utilities/_mquery.scss`
- Variables system in `scss/utilities/_variables.scss` for consistent spacing/colors

## Critical Integration Points
- **Editor mesh targeting**: Uses `data-option="shirt"` attributes matching GLB mesh names
- **Required DOM elements**: `#js-tray-slide`, `#js-drag-notice`, `#js-loader`, `#c` (canvas)
- **Navigation state**: Overlay menu logic split between `phpelements/nav.php` and `js/overlay-menu.js`
- **Three.js version**: Core r127 with GLTFLoader r92 - specific version combo required
- **Color system**: Supports both `texture` (with size array) and `color` (hex) properties
- **Asset URLs**: Root-relative paths throughout - adjust for subdirectory deployments

## Editor-Specific Implementation Details
- **Mesh targeting**: GLB models use `o.name.includes(type)` to match mesh names
- **Material switching**: `setMaterial()` function traverses model and updates materials by `nameID` 
- **Custom slider**: Hand-built drag slider for fabric swatches (no external library)
- **Texture loading**: TextureLoader with RepeatWrapping and size arrays `[4,4,4]`
- **Camera controls**: OrbitControls with polar angle limits and auto-rotation disabled

## Code Style Guidelines
- Follow existing BEM-like CSS naming: `.component__element--modifier`
- Maintain JSON schema consistency for content feeds
- Use SCSS variables from `_variables.scss` for colors, spacing, fonts
- Keep PHP includes at top of pages before HTML content
- Template literals for dynamic content injection in JavaScript
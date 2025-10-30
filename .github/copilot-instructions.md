# AI Agent Instructions for Project Gamma

## Project Overview
Project Gamma is a portfolio website built with PHP, SCSS, and JavaScript, featuring interactive fluid animations and dynamic content presentation.

## Architecture & Components

### Core Structure
- `index.php`: Main entry point integrating all components via PHP includes
- `php-pages/`: Contains main content sections (home, works, about, contact)
- `php-elements/`: Reusable components (header, footer, nav, building)
- `scss/`: Modular SCSS architecture with utilities, layouts, and components
- `js/`: JavaScript modules for interactions and animations

### Key Components
1. **Navigation System**
   - Vertical swiper navigation (`MainSwiper`) in `js/swiper/swiper.js`
   - Building-style floor navigation in `php-elements/building.php`

2. **Fluid Animation**
   - WebGL-based fluid simulation in `js/fluid.js`
   - Mobile-optimized version available with fallback settings

3. **Project Showcase**
   - Horizontal swiper for works display (`WorksSwiper`)
   - Custom hover effects defined in `scss/hover-effects/`

## Development Workflows

### CSS/SCSS
- Main styling in `scss/style.scss`
- Components organized in `scss/layout/`
- Utilities in `scss/utilities/` (variables, mixins, typography)
- Run SCSS compilation using Gulp (config in `scss/hover-effects/Gulpfile.js`)

### JavaScript
- Modular JS files for specific functionalities
- Swiper configurations in `js/swiper/`
- Interactive effects in separate files (cursor.js, magnet.js)

### PHP Integration
- Use PHP includes for component modularity
- Components in `php-elements/` follow consistent naming
- Project pages in `php-pages/` with corresponding JS files

## Project Conventions

### File Organization
- All PHP components use `.php` extension
- JavaScript modules are separated by functionality
- SCSS follows 7-1 pattern with clear separation of concerns

### Styling
- Use BEM-style naming for components
- Z-index levels defined in `_variables.scss`
- Media queries managed through `_mquery.scss`

### JavaScript
- Swiper instances configured with specific options per use case
- Fluid simulation settings adjusted based on device capabilities
- Event listeners follow consistent initialization pattern

## Common Tasks

### Adding New Pages
1. Create page in `php-pages/`
2. Add corresponding styles in `scss/layout/`
3. Update swiper navigation in `js/swiper/swiper.js`
4. Link in `index.php` swiper wrapper

### Modifying Navigation
1. Update `php-elements/nav.php` for menu items
2. Adjust swiper pagination in `js/swiper/swiper.js`
3. Update building navigation if needed

### Style Changes
1. Locate relevant SCSS module in `scss/layout/` or `scss/utilities/`
2. Follow existing patterns for media queries and variables
3. Maintain consistent use of mixins from `_mixins.scss`
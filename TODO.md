# TODO: Gooey Cursor-Arrow Merge Effect

**Branch:** `cursor-arrow-merge`  
**Date Created:** 30 October 2025  
**Status:** Planned for implementation

---

## Goal

Create a liquid/gooey merge effect when the custom cursor dot (`.follow`) enters the arrow circle, instead of simply hiding the dot.

---

## Current Behavior (Baseline)

- **System cursor:** Hidden globally with `cursor: none !important` on all elements
- **Custom cursor dot (`.follow`):** Small yellow ball that follows the mouse
- **Arrow interaction:** When hovering the arrow circle:
  - MagnetMouse adds `follow-mouse-active` class to `.follow`
  - The dot disappears (`display: none !important`)
  - Arrow rotates 180° when on the last slide (CONTACT)
  - Click at last slide returns to first slide (HOME)

---

## Desired Behavior

When the cursor enters the arrow circle, the yellow dot should visually **merge** into the arrow with a liquid/gooey effect:

1. **Approach:** Dot moves toward arrow center and appears to "melt" into it
2. **Exit:** Dot re-emerges and resumes following the cursor
3. **Visual:** Smooth, organic blob-like merge using SVG filters

---

## Implementation Plan

### 1. Add SVG Gooey Filter

Create an inline SVG with a gooey blur filter in `php-elements/arrow.php` or `php-elements/nav new.php`:

```html
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <filter id="gooey">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
      <feColorMatrix in="blur" mode="matrix" 
                     values="1 0 0 0 0  
                             0 1 0 0 0  
                             0 0 1 0 0  
                             0 0 0 19 -9" 
                     result="gooey" />
      <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
    </filter>
  </defs>
</svg>
```

**Location:** Near the `.follow` element or in the arrow container.

---

### 2. Apply Filter to Arrow Container

In `scss/layout/_arrow.scss` or `scss/utilities/_animations.scss`:

```scss
.arrow-container {
  filter: url(#gooey);
  // Ensure child elements are in same filter context
}
```

Or scope it to desktop only if mobile should skip the effect:

```scss
.hiddenMobile.arrow-container {
  filter: url(#gooey);
}
```

---

### 3. Reparent `.follow` on Magnet Activation

In `js/magnet.js` or a new `js/cursor-merge.js`:

```javascript
// Listen for magnet activation
const arrow = document.querySelector('.arrow');
const arrowContainer = document.querySelector('.arrow-container');
const follow = document.querySelector('.follow');

if (arrowContainer && follow) {
  // When magnet becomes active
  const observer = new MutationObserver(() => {
    if (follow.classList.contains('follow-mouse-active')) {
      // Move dot into arrow container for filter context
      arrowContainer.appendChild(follow);
      // Scale down and animate toward center
      follow.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      follow.style.transform = 'scale(1.5)';
    } else {
      // Restore to body when magnet deactivates
      document.body.appendChild(follow);
      follow.style.transform = 'scale(1)';
    }
  });
  
  observer.observe(follow, { attributes: true, attributeFilter: ['class'] });
}
```

**Alternative:** Use CSS only with `:has()` if browser support allows.

---

### 4. Adjust `.follow` Positioning

In `scss/layout/_cursor.scss`:

```scss
.follow {
  position: fixed; // or absolute, depending on parent context
  // When inside arrow-container, adjust coordinates if needed
}

.follow-mouse-active {
  // Keep visible but scale/transform
  opacity: 1 !important;
  display: block !important;
  pointer-events: none !important;
}
```

---

### 5. Fine-Tune Animation

- **Timing:** Adjust `transition` duration to match arrow magnet distance activation (40px in `magnet.js`).
- **Scale:** Experiment with `scale(1.5)` or `scale(2)` for a blobby effect.
- **Position:** Calculate center of `.arrow` and translate `.follow` toward it.

---

## Acceptance Criteria

- [ ] Cursor dot is visible when entering arrow area (not hidden).
- [ ] Dot visually merges with arrow circle using gooey filter.
- [ ] Animation is smooth and organic.
- [ ] On exit, dot re-emerges and resumes following cursor.
- [ ] Works on desktop (hiddenMobile); mobile behavior unchanged.
- [ ] No impact on existing features:
  - Arrow rotation on last slide
  - Click-to-top behavior
  - Pagination bullets sync

---

## Files to Modify

1. **php-elements/arrow.php** or **php-elements/nav new.php**  
   Add inline SVG with `#gooey` filter definition.

2. **scss/layout/_cursor.scss**  
   Update `.follow-mouse-active` to keep dot visible and adjust positioning.

3. **scss/utilities/_animations.scss** or **scss/layout/_arrow.scss**  
   Apply `filter: url(#gooey)` to `.arrow-container`.

4. **js/magnet.js** or new **js/cursor-merge.js**  
   Add logic to reparent `.follow` and animate on magnet activation.

5. **css/style.css**  
   Recompile after SCSS changes.

---

## Testing Checklist

- [ ] Hover arrow on desktop: dot merges smoothly.
- [ ] Exit arrow: dot re-emerges and follows cursor.
- [ ] Arrow rotates up on last slide.
- [ ] Click arrow at end returns to top.
- [ ] Pagination bullets stay synced.
- [ ] No console errors.
- [ ] Mobile: cursor behavior unchanged (dot hidden, arrow works).

---

## Resources

- [CSS Gooey Effect Tutorial](https://css-tricks.com/gooey-effect/)
- [MutationObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [SVG Filters Guide](https://www.smashingmagazine.com/2015/05/why-the-svg-filter-is-awesome/)

---

## Notes

- If performance is an issue (filter lag), consider simplifying the blur or using a pre-rendered sprite.
- Ensure `.follow` z-index stays high enough to remain visible during merge.
- If reparenting causes flicker, use CSS `contain` or `will-change` on `.arrow-container`.

---

**Next Steps:**  
1. Add SVG filter  
2. Update CSS to apply filter  
3. Wire up JS reparenting logic  
4. Test and refine animation timing  
5. Commit and push to `cursor-arrow-merge`  
6. Merge to `main` once approved

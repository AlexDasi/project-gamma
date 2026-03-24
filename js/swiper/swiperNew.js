/**
 * Swiper rebuild (stable version)
 * - Vertical MainSwiper: keeps existing navigation behavior
 * - Horizontal WorksSwiper: no loop, no jump glitches, newest projects first
 */

(function () {
  'use strict';

  // Must match the CSS breakpoint in _site.scss (@media max-width: 1280px)
  const MOBILE_BREAKPOINT = 1280;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function initMainSwiper() {
    // Explicitly select the correct element based on viewport:
    // On mobile (≤1280px) CSS shows .hiddenDesktop, on desktop it shows .hiddenMobile.
    const allRoots = Array.from(document.querySelectorAll('.MainSwiper'));
    const targetClass = isMobile() ? 'hiddenDesktop' : 'hiddenMobile';
    const mainRoot =
      allRoots.find((el) => el.classList.contains(targetClass)) ||
      allRoots.find((el) => el.offsetParent !== null) ||
      allRoots[0] ||
      null;
    if (!mainRoot || typeof Swiper === 'undefined') return null;

    const mainMenu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
    const mobile = isMobile();

    const mainSwiper = new Swiper(mainRoot, {
      direction: 'vertical',
      speed: mobile ? 600 : 1000,
      allowTouchMove: mobile,
      touchReleaseOnEdges: mobile,
      resistanceRatio: mobile ? 0.4 : 0,
      threshold: mobile ? 10 : 0,
      followFinger: mobile,
      longSwipes: true,
      longSwipesRatio: mobile ? 0.15 : 0.5,
      longSwipesMs: mobile ? 120 : 300,
      shortSwipes: true,
      spaceBetween: 0,
      slidesPerView: mobile ? 1 : 'auto',
      centeredSlides: !mobile,
      mousewheel: mobile ? false : {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: false,
        thresholdDelta: 5,
        thresholdTime: 300
      },
      pagination: {
        el: mainRoot.querySelector('.swiper-pagination'),
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${mainMenu[index]}</span>`;
        }
      },
      navigation: {
        nextEl: mainRoot.querySelector('.slideNext-btn'),
        prevEl: mainRoot.querySelector('.slidePrev-btn')
      },
      on: {
        slideChange() {
          const arrow = document.querySelector('.arrow');
          if (!arrow) return;
          if (this.activeIndex === 3) {
            arrow.classList.add('up');
          } else {
            arrow.classList.remove('up');
          }
        }
      }
    });

    const arrowLink = document.querySelector('.arrow-container a');
    if (arrowLink) {
      arrowLink.addEventListener(
        'click',
        function (event) {
          const arrow = document.querySelector('.arrow');
          if (arrow && arrow.classList.contains('up')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            mainSwiper.slideTo(0);
            arrow.classList.remove('up');
          }
        },
        true
      );
    }

    return mainSwiper;
  }

  function parseSlideYear(slide) {
    const yearNode = slide.querySelector('.works--details .yellow-600');
    if (!yearNode) return Number.NEGATIVE_INFINITY;
    const yearMatch = yearNode.textContent.match(/\d{4}/);
    return yearMatch ? parseInt(yearMatch[0], 10) : Number.NEGATIVE_INFINITY;
  }

  function sortWorksSlidesByNewestFirst(wrapper) {
    const slides = Array.from(wrapper.querySelectorAll(':scope > .swiper-slide'));
    if (!slides.length) return;

    // Keep the intentionally empty spacer slide at the end.
    const spacerSlides = slides.filter((slide) => !slide.querySelector('.works'));
    const contentSlides = slides.filter((slide) => slide.querySelector('.works'));

    contentSlides.sort((a, b) => {
      const yearDiff = parseSlideYear(b) - parseSlideYear(a);
      if (yearDiff !== 0) return yearDiff;
      return 0;
    });

    const orderedSlides = contentSlides.concat(spacerSlides);
    orderedSlides.forEach((slide) => wrapper.appendChild(slide));
  }

  function initWorksSwiper() {
    const worksRoots = Array.from(document.querySelectorAll('.WorksSwiper'));
    const worksRoot =
      worksRoots.find((root) => root.offsetParent !== null) || worksRoots[0] || null;
    if (!worksRoot || typeof Swiper === 'undefined') return null;

    const wrapper = worksRoot.querySelector('.swiper-wrapper');
    if (!wrapper) return null;

    sortWorksSlidesByNewestFirst(wrapper);

    const worksSwiper = new Swiper(worksRoot, {
      direction: 'horizontal',
      loop: false,
      rewind: false,
      grabCursor: false,
      allowTouchMove: isMobile(),
      simulateTouch: isMobile(),
      centeredSlides: isMobile(),
      slidesPerView: 'auto',
      spaceBetween: 0,
      speed: 420,
      watchOverflow: true,
      watchSlidesProgress: true,
      roundLengths: true,
      resistanceRatio: 0.25,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      freeMode: false,
      mousewheel: false,
      navigation: {
        nextEl: worksRoot.querySelector('.swiper-button-next'),
        prevEl: worksRoot.querySelector('.swiper-button-prev')
      },
      pagination: {
        el: worksRoot.querySelector('.swiper-pagination'),
        clickable: true,
        type: 'bullets'
      },
      breakpoints: {
        0: {
          speed: 360,
          allowTouchMove: true,
          simulateTouch: true
        },
        1025: {
          speed: 420,
          allowTouchMove: false,
          simulateTouch: false
        }
      },
      on: {
        init(swiper) {
          swiper.slideToClosest(0);
        },
        touchEnd(swiper) {
          if (!isMobile()) return;
          // Force nearest-slide snap after finger release on mobile.
          swiper.slideToClosest(280);
        }
      }
    });

    // Hard-block horizontal wheel gestures over Works to avoid browser back/forward swipe.
    worksRoot.addEventListener(
      'wheel',
      (event) => {
        if (!isMobile() && Math.abs(event.deltaX) > 0) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    return worksSwiper;
  }

  function boot() {
    window.mainSwiper = initMainSwiper();
    window.worksSwiper = initWorksSwiper();

    // Re-initialize swipers when the mobile/desktop breakpoint is crossed (e.g. DevTools resize).
    const _mq = window.matchMedia('(max-width: ' + MOBILE_BREAKPOINT + 'px)');
    _mq.addEventListener('change', function () {
      if (window.mainSwiper && typeof window.mainSwiper.destroy === 'function') {
        window.mainSwiper.destroy(true, true);
      }
      if (window.worksSwiper && typeof window.worksSwiper.destroy === 'function') {
        window.worksSwiper.destroy(true, true);
      }
      window.mainSwiper = initMainSwiper();
      window.worksSwiper = initWorksSwiper();
    });

    // Also block horizontal wheel gestures globally while WORKS section is active.
    window.addEventListener(
      'wheel',
      (event) => {
        if (!window.mainSwiper) return;
        if (window.mainSwiper.activeIndex !== 1) return;
        if (Math.abs(event.deltaX) > 0) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

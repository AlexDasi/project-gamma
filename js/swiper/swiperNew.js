/**
 * Swiper rebuild (stable version)
 * - Vertical MainSwiper: keeps existing navigation behavior
 * - Horizontal WorksSwiper: no loop, no jump glitches, newest projects first
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 1024;

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function initMainSwiper() {
    const mainRoot = document.querySelector('.MainSwiper');
    if (!mainRoot || typeof Swiper === 'undefined') return null;

    const mainMenu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];

    const mainSwiper = new Swiper('.MainSwiper', {
      direction: 'vertical',
      speed: 1000,
      allowTouchMove: false,
      spaceBetween: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: false,
        thresholdDelta: 5,
        thresholdTime: 300
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${mainMenu[index]}</span>`;
        }
      },
      navigation: {
        nextEl: '.slideNext-btn',
        prevEl: '.slidePrev-btn'
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
      centeredSlides: false,
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
        renderBullet(index, className) {
          return `<span class="${className} works-swipe-dot" aria-label="Project ${index + 1}"></span>`;
        }
      },
      breakpoints: {
        0: {
          speed: 360,
          allowTouchMove: true,
          simulateTouch: true,
          resistanceRatio: 0.85,
          edgeSwipeDetection: true,
          edgeSwipeThreshold: 20
        },
        1025: {
          speed: 420,
          allowTouchMove: false,
          simulateTouch: false,
          resistanceRatio: 0.25
        }
      },
      on: {
        init(swiper) {
          swiper.slideToClosest(0);
        },
        touchEnd(swiper) {
          if (!isMobile()) return;
          // Fuerza snap al slide más cercano después del toque (magnetismo)
          swiper.slideToClosest(100);
        },
        reachEnd(swiper) {
          // Si alcanza el final, vuelve al inicio (pseudo-loop)
          swiper.slideToClosest(0);
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

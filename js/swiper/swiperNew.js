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
      mousewheel: false,
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
    const worksRoot = document.querySelector('.WorksSwiper');
    if (!worksRoot || typeof Swiper === 'undefined') return null;

    const wrapper = worksRoot.querySelector('.swiper-wrapper');
    if (!wrapper) return null;

    sortWorksSlidesByNewestFirst(wrapper);

    const worksSwiper = new Swiper('.WorksSwiper', {
      direction: 'horizontal',
      loop: false,
      rewind: false,
      grabCursor: true,
      centeredSlides: false,
      slidesPerView: 'auto',
      spaceBetween: 0,
      speed: 420,
      watchOverflow: true,
      watchSlidesProgress: true,
      roundLengths: true,
      resistanceRatio: 0.85,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      freeMode: {
        enabled: true,
        momentum: true,
        momentumRatio: 0.55,
        momentumVelocityRatio: 0.55,
        sticky: false,
        minimumVelocity: 0.08
      },
      mousewheel: {
        enabled: true,
        forceToAxis: true,
        releaseOnEdges: true,
        sensitivity: 0.85
      },
      pagination: {
        el: '.WorksSwiper .swiper-pagination',
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className} works-swipe-dot" aria-label="Project ${index + 1}"></span>`;
        }
      },
      breakpoints: {
        0: {
          speed: 360,
          freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumVelocityRatio: 0.5,
            sticky: true,
            minimumVelocity: 0.08
          }
        },
        1025: {
          speed: 420,
          freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 0.55,
            momentumVelocityRatio: 0.55,
            sticky: false,
            minimumVelocity: 0.08
          }
        }
      },
      on: {
        touchEnd(swiper) {
          if (!isMobile()) return;
          // Force nearest-slide snap after finger release on mobile.
          swiper.slideToClosest(280);
        }
      }
    });
    return worksSwiper;
  }

  function boot() {
    window.mainSwiper = initMainSwiper();
    window.worksSwiper = initWorksSwiper();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

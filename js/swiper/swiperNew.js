/**
 * Swiper rebuild (stable version)
 * - Vertical MainSwiper: keeps existing navigation behavior
 * - Horizontal WorksSwiper: no loop, no jump glitches, newest projects first
 */

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 1280;
  const MIN_VISIBLE_PROJECT_YEAR = 2021;
  const HIDDEN_PROJECTS = ['terralava'];

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function isProjectHidden(slide) {
    const worksDiv = slide.querySelector('.works');
    const classList = worksDiv ? Array.from(worksDiv.classList) : [];
    const projectHref = slide.getAttribute('href') || '';

    return HIDDEN_PROJECTS.some(
      (projectSlug) =>
        classList.some((className) => className.includes(projectSlug)) ||
        projectHref.includes(`/projects/${projectSlug}.php`) ||
        projectHref.includes(`projects/${projectSlug}.php`)
    );
  }

  function initMainSwiper() {
    const mainRoot = document.querySelector('.MainSwiper');
    if (window.innerWidth <= 1280) return null;
    if (!mainRoot || typeof Swiper === 'undefined') return null;

    const mainMenu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];

    const mainPaginationEl = mainRoot.querySelector(':scope > .swiper-pagination');

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
        el: mainPaginationEl,
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

    const contentSlides = slides.filter((slide) => slide.querySelector('.works'));
    const visibleSlides = contentSlides.filter(
      (slide) => parseSlideYear(slide) >= MIN_VISIBLE_PROJECT_YEAR && !isProjectHidden(slide)
    );

    visibleSlides.sort((a, b) => {
      const yearDiff = parseSlideYear(b) - parseSlideYear(a);
      if (yearDiff !== 0) return yearDiff;
      return 0;
    });

    slides.forEach((slide) => slide.remove());
    visibleSlides.forEach((slide) => wrapper.appendChild(slide));
  }

  function initWorksSwiperDesktop() {
    if (isMobile()) return null;
    const worksRoot = document.querySelector('.WorksSwiperDesktop');
    if (!worksRoot || typeof Swiper === 'undefined') return null;

    const wrapper = worksRoot.querySelector('.swiper-wrapper');
    if (!wrapper) return null;

    sortWorksSlidesByNewestFirst(wrapper);

    const worksSwiper = new Swiper(worksRoot, {
      direction: 'horizontal',
      loop: true,
      loopAdditionalSlides: 6,
      rewind: false,
      grabCursor: false,
      allowTouchMove: false,
      simulateTouch: false,
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
      }
    });

    worksRoot.addEventListener(
      'wheel',
      (event) => {
        if (Math.abs(event.deltaX) > 0) {
          event.preventDefault();
        }
      },
      { passive: false }
    );

    return worksSwiper;
  }

  function initWorksSwiperMobile() {
    if (!isMobile()) return null;
    const worksRoot = document.querySelector('.WorksSwiperMobile');
    if (!worksRoot || typeof Swiper === 'undefined') return null;

    const wrapper = worksRoot.querySelector('.swiper-wrapper');
    if (!wrapper) return null;

    sortWorksSlidesByNewestFirst(wrapper);

    return new Swiper(worksRoot, {
      direction: 'horizontal',
      loop: true,
      loopAdditionalSlides: 6,
      rewind: false,
      grabCursor: false,
      allowTouchMove: true,
      simulateTouch: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 0,
      speed: 360,
      watchOverflow: true,
      watchSlidesProgress: true,
      roundLengths: true,
      resistanceRatio: 0.85,
      slideToClickedSlide: true,
      observer: true,
      observeParents: true,
      freeMode: false,
      mousewheel: false,
      pagination: {
        el: worksRoot.querySelector('.swiper-pagination'),
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className} works-swipe-dot" aria-label="Project ${index + 1}"></span>`;
        }
      },
      on: {
        init(swiper) {
          swiper.slideToClosest(0);
        },
        touchEnd(swiper) {
          swiper.slideToClosest(140);
        }
      }
    });
  }

  function destroySwiper(swiperInstance) {
    if (!swiperInstance || typeof swiperInstance.destroy !== 'function') return;
    swiperInstance.destroy(true, true);
  }

  function initAllSwipers() {
    window.mainSwiper = initMainSwiper();
    window.worksSwiperDesktop = initWorksSwiperDesktop();
    window.worksSwiperMobile = initWorksSwiperMobile();
    window.worksSwiper = isMobile() ? window.worksSwiperMobile : window.worksSwiperDesktop;
  }

  function boot() {
    let currentMode = isMobile() ? 'mobile' : 'desktop';
    initAllSwipers();

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

    let resizeTimer = null;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const nextMode = isMobile() ? 'mobile' : 'desktop';
        if (nextMode === currentMode) return;

        destroySwiper(window.mainSwiper);
        destroySwiper(window.worksSwiperDesktop);
        destroySwiper(window.worksSwiperMobile);

        window.mainSwiper = null;
        window.worksSwiperDesktop = null;
        window.worksSwiperMobile = null;
        window.worksSwiper = null;

        currentMode = nextMode;
        initAllSwipers();
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

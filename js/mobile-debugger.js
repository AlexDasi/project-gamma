(function () {
  'use strict';

  const QUERY_KEY = 'debug-mobile';
  const STORAGE_KEY = 'portfolio-mobile-debug';
  const PANEL_ID = 'mobile-debugger';
  const PLACEHOLDER_ID = 'mobile-debugger-pagination-placeholder';
  const CENTER_GUIDE_ID = 'mobile-debugger-center-guide';
  const CENTER_TOLERANCE_PX = 8;

  function readDebugPreference() {
    const params = new URLSearchParams(window.location.search);
    const queryValue = params.get(QUERY_KEY);

    try {
      if (queryValue === '1') {
        window.localStorage.setItem(STORAGE_KEY, '1');
        return true;
      }

      if (queryValue === '0') {
        window.localStorage.removeItem(STORAGE_KEY);
        return false;
      }

      return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (error) {
      return queryValue === '1';
    }
  }

  if (!readDebugPreference()) {
    return;
  }

  function safeMatchMedia(query) {
    return typeof window.matchMedia === 'function' ? window.matchMedia(query).matches : false;
  }

  function asStatus(value) {
    return value ? 'ok' : 'warn';
  }

  function formatBoolean(value) {
    return value ? 'yes' : 'no';
  }

  function clampPoint(value, max) {
    return Math.max(0, Math.min(value, Math.max(max - 1, 0)));
  }

  function describeNode(node) {
    if (!node || !node.tagName) return 'none';

    const tag = node.tagName.toLowerCase();
    const id = node.id ? `#${node.id}` : '';
    const classes = node.classList && node.classList.length
      ? `.${Array.from(node.classList).join('.')}`
      : '';

    return `${tag}${id}${classes}`;
  }

  function buildNodePath(node) {
    const parts = [];
    let currentNode = node;

    while (currentNode && currentNode.nodeType === 1 && parts.length < 5) {
      parts.push(describeNode(currentNode));
      currentNode = currentNode.parentElement;
    }

    return parts.join(' <- ');
  }

  function ensurePanel() {
    let panel = document.getElementById(PANEL_ID);
    if (panel) return panel;

    panel = document.createElement('aside');
    panel.id = PANEL_ID;
    panel.className = 'mobile-debugger';
    panel.innerHTML = [
      '<div class="mobile-debugger__header">',
      '  <strong>Diagnostico movil</strong>',
      '  <div class="mobile-debugger__actions">',
      '    <button type="button" data-debug-action="refresh">Refresh</button>',
      '    <button type="button" data-debug-action="close">Close</button>',
      '  </div>',
      '</div>',
      '<div class="mobile-debugger__body"></div>'
    ].join('');

    panel.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const action = target.getAttribute('data-debug-action');
      if (action === 'refresh') {
        renderPanel();
      }

      if (action === 'close') {
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
          // Ignore localStorage failures.
        }

        document.body.classList.remove('mobile-debug-enabled');
        removePaginationDebugArtifacts();
        panel.remove();
        window.clearInterval(window.__portfolioMobileDebugInterval);
      }
    });

    document.body.appendChild(panel);
    document.body.classList.add('mobile-debug-enabled');
    return panel;
  }

  function removePaginationDebugArtifacts() {
    const pagination = document.querySelector('.WorksSwiperMobile .swiper-pagination');
    if (pagination) {
      pagination.classList.remove('mobile-debugger__pagination-zone');
    }

    const highlightedSlides = document.querySelectorAll('.WorksSwiperMobile .mobile-debugger__active-slide, .WorksSwiperMobile .mobile-debugger__nearest-slide');
    highlightedSlides.forEach((slide) => {
      slide.classList.remove('mobile-debugger__active-slide', 'mobile-debugger__nearest-slide');
    });

    const placeholder = document.getElementById(PLACEHOLDER_ID);
    if (placeholder) {
      placeholder.remove();
    }

    const centerGuide = document.getElementById(CENTER_GUIDE_ID);
    if (centerGuide) {
      centerGuide.remove();
    }
  }

  function ensurePaginationPlaceholder(worksRoot, shouldShow) {
    let placeholder = document.getElementById(PLACEHOLDER_ID);

    if (!shouldShow || !worksRoot) {
      if (placeholder) placeholder.remove();
      return;
    }

    if (!placeholder) {
      placeholder = document.createElement('div');
      placeholder.id = PLACEHOLDER_ID;
      placeholder.className = 'mobile-debugger__pagination-placeholder';
      placeholder.textContent = 'pagination area';
      worksRoot.appendChild(placeholder);
    }
  }

  function getPaginationCoverInfo(rect, pagination) {
    if (!rect || !pagination || rect.width <= 0 || rect.height <= 0) {
      return {
        topElement: 'none',
        topPath: 'none',
        covered: false
      };
    }

    const sampleX = clampPoint(rect.left + rect.width / 2, window.innerWidth);
    const sampleY = clampPoint(rect.top + rect.height / 2, window.innerHeight);
    const topElement = document.elementFromPoint(sampleX, sampleY);

    return {
      topElement: describeNode(topElement),
      topPath: buildNodePath(topElement),
      covered: !!(topElement && !pagination.contains(topElement) && topElement !== pagination)
    };
  }

  function getVisibleSlideEntries(swiper) {
    if (!swiper || !swiper.slides) return [];

    return Array.from(swiper.slides)
      .map((slide, index) => {
        const rect = slide.getBoundingClientRect();
        return {
          index,
          slide,
          rect,
          centerX: rect.left + rect.width / 2,
          visible: rect.width > 0 && rect.right > 0 && rect.left < window.innerWidth
        };
      })
      .filter((entry) => entry.visible);
  }

  function getCenterLockInfo(swiper) {
    const viewportCenter = window.innerWidth / 2;
    const visibleSlides = getVisibleSlideEntries(swiper);
    const activeSlide = swiper && swiper.slides && typeof swiper.activeIndex === 'number'
      ? swiper.slides[swiper.activeIndex]
      : null;
    const activeRect = activeSlide ? activeSlide.getBoundingClientRect() : null;
    const activeCenterX = activeRect ? activeRect.left + activeRect.width / 2 : null;
    const activeDelta = activeCenterX === null ? null : Math.round(activeCenterX - viewportCenter);
    const nearestSlide = visibleSlides.length
      ? visibleSlides.reduce((closest, entry) => {
          if (!closest) return entry;
          return Math.abs(entry.centerX - viewportCenter) < Math.abs(closest.centerX - viewportCenter)
            ? entry
            : closest;
        }, null)
      : null;

    return {
      viewportCenter: Math.round(viewportCenter),
      activeSlide,
      activeRect,
      activeCenterX: activeCenterX === null ? 'n/a' : Math.round(activeCenterX),
      activeDelta: activeDelta === null ? 'n/a' : activeDelta,
      centered: activeDelta !== null ? Math.abs(activeDelta) <= CENTER_TOLERANCE_PX : false,
      nearestSlide,
      nearestDelta: nearestSlide ? Math.round(nearestSlide.centerX - viewportCenter) : 'n/a',
      activeMatchesNearest: !!(nearestSlide && activeSlide === nearestSlide.slide)
    };
  }

  function ensureCenterGuide(worksRoot) {
    if (!worksRoot) return;

    let centerGuide = document.getElementById(CENTER_GUIDE_ID);
    if (!centerGuide) {
      centerGuide = document.createElement('div');
      centerGuide.id = CENTER_GUIDE_ID;
      centerGuide.className = 'mobile-debugger__center-guide';
      worksRoot.appendChild(centerGuide);
    }
  }

  function collectState() {
    const worksRoot = document.querySelector('.WorksSwiperMobile');
    const wrapper = worksRoot ? worksRoot.querySelector('.swiper-wrapper') : null;
    const pagination = worksRoot ? worksRoot.querySelector('.swiper-pagination') : null;
    const bullets = pagination ? pagination.querySelectorAll('.swiper-pagination-bullet') : [];
    const swiper = window.worksSwiperMobile || null;
    const hasTouch = navigator.maxTouchPoints > 0 || safeMatchMedia('(pointer: coarse)');
    const hoverNone = safeMatchMedia('(hover: none)');
    const paginationStyle = pagination ? window.getComputedStyle(pagination) : null;
    const paginationRect = pagination ? pagination.getBoundingClientRect() : null;
    const worksRect = worksRoot ? worksRoot.getBoundingClientRect() : null;
    const paginationInViewport = !!(
      paginationRect &&
      paginationRect.width > 0 &&
      paginationRect.height > 0 &&
      paginationRect.bottom >= 0 &&
      paginationRect.top <= window.innerHeight
    );
    const coverInfo = getPaginationCoverInfo(paginationRect, pagination);
    const centerLock = getCenterLockInfo(swiper);

    return {
      viewport: `${window.innerWidth} x ${window.innerHeight}`,
      dpr: window.devicePixelRatio || 1,
      ua: navigator.userAgent,
      isMobileMode: window.innerWidth <= 1280,
      touchPoints: navigator.maxTouchPoints || 0,
      coarsePointer: safeMatchMedia('(pointer: coarse)'),
      hoverNone,
      worksRootFound: !!worksRoot,
      wrapperFound: !!wrapper,
      domSlides: wrapper ? wrapper.querySelectorAll('.swiper-slide').length : 0,
      worksRect: worksRect
        ? `${Math.round(worksRect.left)},${Math.round(worksRect.top)} ${Math.round(worksRect.width)}x${Math.round(worksRect.height)}`
        : 'none',
      worksInViewport: !!(
        worksRect && worksRect.bottom >= 0 && worksRect.top <= window.innerHeight
      ),
      swiperInitialized: !!swiper,
      swiperDestroyed: !!(swiper && swiper.destroyed),
      swiperSlides: swiper && Array.isArray(swiper.slides) ? swiper.slides.length : swiper && swiper.slides ? swiper.slides.length : 0,
      swiperActiveIndex: swiper && typeof swiper.activeIndex === 'number' ? swiper.activeIndex : 'n/a',
      swiperAnimating: !!(swiper && swiper.animating),
      swiperTranslate: swiper && typeof swiper.translate === 'number' ? Math.round(swiper.translate) : 'n/a',
      swiperCenteredSlides: !!(swiper && swiper.params && swiper.params.centeredSlides),
      swiperLoop: !!(swiper && swiper.params && swiper.params.loop),
      swiperSnapPoints: swiper && Array.isArray(swiper.snapGrid) ? swiper.snapGrid.length : 0,
      paginationFound: !!pagination,
      paginationClasses: pagination ? pagination.className : 'none',
      bulletCount: bullets.length,
      paginationDisplay: paginationStyle ? paginationStyle.display : 'none',
      paginationOpacity: paginationStyle ? paginationStyle.opacity : '0',
      paginationVisibility: paginationStyle ? paginationStyle.visibility : 'hidden',
      paginationRect: paginationRect
        ? `${Math.round(paginationRect.left)},${Math.round(paginationRect.top)} ${Math.round(paginationRect.width)}x${Math.round(paginationRect.height)}`
        : 'none',
      paginationInViewport,
      paginationCovered: coverInfo.covered,
      topElementAtPagination: coverInfo.topElement,
      topElementPath: coverInfo.topPath,
      activeCenterX: centerLock.activeCenterX,
      viewportCenter: centerLock.viewportCenter,
      activeCenterDelta: centerLock.activeDelta,
      activeIsCentered: centerLock.centered,
      nearestSlideIndex: centerLock.nearestSlide ? centerLock.nearestSlide.index : 'n/a',
      nearestSlideDelta: centerLock.nearestDelta,
      activeMatchesNearest: centerLock.activeMatchesNearest,
      activeSlideNode: centerLock.activeSlide,
      nearestSlideNode: centerLock.nearestSlide ? centerLock.nearestSlide.slide : null
    };
  }

  function renderRow(label, value, status) {
    const className = status ? `mobile-debugger__row mobile-debugger__row--${status}` : 'mobile-debugger__row';
    return `<div class="${className}"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function renderPanel() {
    const panel = ensurePanel();
    const body = panel.querySelector('.mobile-debugger__body');
    if (!body) return;

    const state = collectState();
    const pagination = document.querySelector('.WorksSwiperMobile .swiper-pagination');

    removePaginationDebugArtifacts();

    if (pagination) {
      pagination.classList.add('mobile-debugger__pagination-zone');
    } else {
      ensurePaginationPlaceholder(document.querySelector('.WorksSwiperMobile'), true);
    }

    const worksRoot = document.querySelector('.WorksSwiperMobile');
    if (worksRoot) {
      ensureCenterGuide(worksRoot);
    }

    if (state.activeSlideNode instanceof HTMLElement) {
      state.activeSlideNode.classList.add('mobile-debugger__active-slide');
    }

    if (state.nearestSlideNode instanceof HTMLElement && state.nearestSlideNode !== state.activeSlideNode) {
      state.nearestSlideNode.classList.add('mobile-debugger__nearest-slide');
    }

    body.innerHTML = [
      '<div class="mobile-debugger__section">',
      renderRow('viewport', state.viewport, asStatus(state.isMobileMode)),
      renderRow('dpr', String(state.dpr)),
      renderRow('touch points', String(state.touchPoints), asStatus(state.touchPoints > 0)),
      renderRow('coarse pointer', formatBoolean(state.coarsePointer), asStatus(state.coarsePointer)),
      renderRow('hover none', formatBoolean(state.hoverNone), asStatus(state.hoverNone)),
      '</div>',
      '<div class="mobile-debugger__section">',
      renderRow('works root', formatBoolean(state.worksRootFound), asStatus(state.worksRootFound)),
      renderRow('wrapper', formatBoolean(state.wrapperFound), state.wrapperFound ? 'ok' : 'warn'),
      renderRow('dom slides', String(state.domSlides), state.domSlides > 0 ? 'ok' : 'warn'),
      renderRow('works rect', state.worksRect, state.worksInViewport ? 'ok' : 'warn'),
      renderRow('works in viewport', formatBoolean(state.worksInViewport), state.worksInViewport ? 'ok' : 'warn'),
      renderRow('swiper mobile', formatBoolean(state.swiperInitialized), asStatus(state.swiperInitialized)),
      renderRow('swiper destroyed', formatBoolean(state.swiperDestroyed), state.swiperDestroyed ? 'warn' : 'ok'),
      renderRow('centeredSlides', formatBoolean(state.swiperCenteredSlides), state.swiperCenteredSlides ? 'ok' : 'warn'),
      renderRow('loop', formatBoolean(state.swiperLoop)),
      renderRow('slides', String(state.swiperSlides)),
      renderRow('snap points', String(state.swiperSnapPoints), state.swiperSnapPoints > 0 ? 'ok' : 'warn'),
      renderRow('active index', String(state.swiperActiveIndex)),
      renderRow('translate', String(state.swiperTranslate)),
      renderRow('animating', formatBoolean(state.swiperAnimating)),
      renderRow('active center delta', `${state.activeCenterDelta}px`, state.activeIsCentered ? 'ok' : 'warn'),
      renderRow('active is centered', formatBoolean(state.activeIsCentered), state.activeIsCentered ? 'ok' : 'warn'),
      renderRow('nearest slide index', String(state.nearestSlideIndex)),
      renderRow('nearest slide delta', `${state.nearestSlideDelta}px`),
      renderRow('active matches nearest', formatBoolean(state.activeMatchesNearest), state.activeMatchesNearest ? 'ok' : 'warn'),
      '</div>',
      '<div class="mobile-debugger__section">',
      renderRow('pagination node', formatBoolean(state.paginationFound), asStatus(state.paginationFound)),
      renderRow('bullet count', String(state.bulletCount), state.bulletCount > 0 ? 'ok' : 'warn'),
      renderRow('display', state.paginationDisplay, state.paginationDisplay !== 'none' ? 'ok' : 'warn'),
      renderRow('opacity', state.paginationOpacity, state.paginationOpacity !== '0' ? 'ok' : 'warn'),
      renderRow('visibility', state.paginationVisibility, state.paginationVisibility !== 'hidden' ? 'ok' : 'warn'),
      renderRow('rect', state.paginationRect, state.paginationInViewport ? 'ok' : 'warn'),
      renderRow('covered', formatBoolean(state.paginationCovered), state.paginationCovered ? 'warn' : 'ok'),
      renderRow('top element', state.topElementAtPagination),
      '</div>',
      `<details class="mobile-debugger__details"><summary>top element path</summary><pre>${state.topElementPath}</pre></details>`,
      `<details class="mobile-debugger__details"><summary>user agent</summary><pre>${state.ua}</pre></details>`,
      '<p class="mobile-debugger__hint">Tip: open the site with ?debug-mobile=1 to persist this overlay. Green frame = active slide. Orange frame = slide nearest the real center if it differs.</p>'
    ].join('');
  }

  function bootDebugger() {
    renderPanel();
    window.__portfolioMobileDebugInterval = window.setInterval(renderPanel, 1200);
    window.addEventListener('resize', renderPanel);
    window.addEventListener('orientationchange', renderPanel);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) renderPanel();
    });
    document.addEventListener('touchend', () => {
      window.setTimeout(renderPanel, 180);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootDebugger);
  } else {
    bootDebugger();
  }
})();
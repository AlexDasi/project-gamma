/**
 * Unified Swiper Configuration (Desktop + Mobile)
 * Modern architecture with native loop, freeMode, and responsive logic
 * No artificial pseudo-infinite scroll - relies on Swiper's native loop
 */

(function() {
  'use strict';

  // ==================== MAIN VERTICAL SWIPER ====================

  const mainMenu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
  
  // Main swiper config - handles both desktop and mobile
  const mainSwiperConfig = {
    direction: 'vertical',
    speed: 1000,
    allowTouchMove: false, // Desktop: disable touch (keyboard/wheel only)
    spaceBetween: 0,
    slidesPerView: 'auto',
    centeredSlides: true,
    mousewheel: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        return `<span class="${className}">${mainMenu[index]}</span>`;
      }
    },
    navigation: {
      nextEl: '.slideNext-btn',
      prevEl: '.slidePrev-btn'
    },
    on: {
      slideChange: handleMainSlideChange
    }
  };

  // Initialize main swiper
  const mainSwiper = new Swiper('.MainSwiper', mainSwiperConfig);

  // Main swiper slide change handler
  function handleMainSlideChange() {
    const arrow = document.querySelector('.arrow');
    if (!arrow) return;

    // Show "up" arrow on last slide (CONTACT)
    if (this.activeIndex === 3) {
      arrow.classList.add('up');
    } else {
      arrow.classList.remove('up');
    }

    // Update pagination
    updateMainPagination();
  }

  // Update main pagination bullets
  function updateMainPagination() {
    const bullets = document.querySelectorAll('.swiper-pagination-bullet');
    bullets.forEach((bullet, index) => {
      if (index === mainSwiper.activeIndex) {
        bullet.classList.add('swiper-pagination-bullet-active');
      } else {
        bullet.classList.remove('swiper-pagination-bullet-active');
      }
    });
  }

  // Arrow click handler
  const arrowLink = document.querySelector('.arrow-container a');
  if (arrowLink) {
    arrowLink.addEventListener('click', function(e) {
      const arrow = document.querySelector('.arrow');
      
      // Return to home when clicking "up" arrow on last slide
      if (arrow && arrow.classList.contains('up')) {
        e.preventDefault();
        e.stopImmediatePropagation();
        mainSwiper.slideTo(0);
        arrow.classList.remove('up');
        updateMainPagination();
      }
    }, true);
  }

  // ==================== WORKS HORIZONTAL SWIPER ====================

  // Check if we're on mobile/desktop
  const isMobile = () => window.innerWidth <= 1024;

  // Works swiper config - responsive
  const worksBaseSwiperConfig = {
    loop: true, // Native infinite loop (no manual duplication needed)
    grabCursor: true,
    direction: 'horizontal',
    preventClicks: false,
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    speed: 100,
    freeMode: {
      enabled: true,
      momentum: true,
      momentumRatio: 0.85,
      momentumVelocityRatio: 0.75,
      momentumBounce: false
    }
  };

  // Initialize works swiper
  const worksSwiper = new Swiper('.WorksSwiper', worksBaseSwiperConfig);

  // ==================== MOBILE SWIPE INDICATOR ====================

  // Show swipe hint on mobile only
  function addSwipeIndicator() {
    if (!isMobile()) return;

    const worksContainer = document.querySelector('.WorksSwiper');
    if (!worksContainer) return;

    // Check if indicator already exists
    if (document.querySelector('.swipe-hint')) return;

    const hint = document.createElement('div');
    hint.className = 'swipe-hint';
    hint.innerHTML = '← Swipe →';
    worksContainer.appendChild(hint);

    // Auto-hide after 3 seconds if user hasn't swiped
    let hideTimer = setTimeout(() => {
      hint.classList.add('swipe-hint--hidden');
    }, 3000);

    // Hide on first swipe
    worksSwiper.on('sliderMove', () => {
      clearTimeout(hideTimer);
      hint.classList.add('swipe-hint--hidden');
    });
  }

  // Add indicator when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSwipeIndicator);
  } else {
    addSwipeIndicator();
  }

  // ==================== MAGNET EFFECT (Organic Integration) ====================

  // Integrate with magnet.js if available
  if (window.MagnetMouse) {
    const magnetConfig = {
      magnet: {
        element: '.swiper-slide:not(.swiper-slide-duplicate)',
        class: 'magnet-active',
        enabled: true,
        distance: 40,
        position: 'center'
      },
      follow: {
        element: '.magnet-follow',
        class: 'follow-active'
      },
      throttle: 8,
      inCallback: null,
      outCallback: null
    };

    // Initialize magnet mouse only if not already initialized
    if (!window.magnetMouseInstance) {
      window.magnetMouseInstance = new MagnetMouse(magnetConfig);
      window.magnetMouseInstance.init();
    }
  }

  // ==================== HANDLE WINDOW RESIZE ====================

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinitialize if crossing mobile/desktop threshold
      const newIsMobile = window.innerWidth <= 1024;
      // Swiper handles this internally, but we can add custom logic here
    }, 250);
  });

  // ==================== EXPOSE TO GLOBAL ====================

  window.mainSwiper = mainSwiper;
  window.worksSwiper = worksSwiper;

})();

// Cache bust
// Last updated: 2026-03-19

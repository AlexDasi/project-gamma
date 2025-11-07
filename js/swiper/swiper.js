//MAIN SWIPER

var menu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
var MainSwiper = new Swiper(".MainSwiper", {
  direction: "vertical",
  speed: 1000,
  // loop: true,
  allowTouchMove: false,
  spaceBetween: 0,
  slidesPerView: "auto",
  centeredSlides: true,
  mousewheel: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (menu[index]) + "</span>";
    },
  },
  navigation: {
    nextEl: '.slideNext-btn',
    prevEl: '.slidePrev-btn',
  },

  on: {
    slideChange: function() {
      const arrow = document.querySelector('.arrow');
      if (!arrow) return;
      
      // Check if we're on the last slide (index 3 = CONTACT)
      if (this.activeIndex === 3) {
        arrow.classList.add('up');
      } else {
        arrow.classList.remove('up');
      }
      
      // Update pagination on every slide change
      setTimeout(() => {
        updatePagination();
      }, 50);
    }
  }

  //TO ADD FLOORS//

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },

  // navigation: {
  //   nextEl: '.swiper-button-next',
  // },
});

// Arrow click handler: when on last slide, go back to top
const arrowLink = document.querySelector('.arrow-container a');
if (arrowLink) {
  arrowLink.addEventListener('click', function(e) {
    const arrow = document.querySelector('.arrow');
    
    // Only intercept if we're on the last slide (arrow has 'up' class)
    if (arrow && arrow.classList.contains('up')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      
      // Go to first slide
      MainSwiper.slideTo(0);
      
      // Remove up class
      arrow.classList.remove('up');
      
      // Force pagination update
      requestAnimationFrame(() => {
        updatePagination();
      });
    }
  }, true); // Use capture phase to intercept before Swiper's handler
}

// Helper function to update pagination bullets
function updatePagination() {
  const bullets = document.querySelectorAll('.swiper-pagination-bullet');
  bullets.forEach((bullet, index) => {
    if (index === MainSwiper.activeIndex) {
      bullet.classList.add('swiper-pagination-bullet-active');
    } else {
      bullet.classList.remove('swiper-pagination-bullet-active');
    }
  });
}

//WORK SWIPER

// Duplicate slides for pseudo-infinite scrolling
const worksWrapper = document.querySelector('.WorksSwiper .swiper-wrapper');
let originalSlides;
if (worksWrapper) {
  originalSlides = Array.from(worksWrapper.querySelectorAll('.swiper-slide'));
  const duplicateTimes = 3; // Create 3 copies on each side
  
  // Clone and append to end (right side)
  for (let i = 0; i < duplicateTimes; i++) {
    originalSlides.forEach(slide => {
      const clone = slide.cloneNode(true);
      worksWrapper.appendChild(clone);
    });
  }
  
  // Clone and prepend to beginning (left side) - in correct order
  for (let i = 0; i < duplicateTimes; i++) {
    // Insert in reverse to maintain correct order when prepending
    for (let j = originalSlides.length - 1; j >= 0; j--) {
      const clone = originalSlides[j].cloneNode(true);
      worksWrapper.insertBefore(clone, worksWrapper.firstChild);
    }
  }
}

// Calculate initial slide to start in the middle section
const totalOriginalSlides = originalSlides ? originalSlides.length : 0;
const calculatedInitialSlide = totalOriginalSlides * duplicateTimes + 3; // Start at middle section, slide 3

var swiper = new Swiper(".WorksSwiper", {
  allowTouchMove: true,
  direction: "horizontal",
  mousewheel: {
    forceToAxis: true,
  },
  loop: false,
  initialSlide : calculatedInitialSlide,
  grabCursor: true,
  preventClicks: false,
  mousewheel: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  speed: 100,
  freeMode: {
    enabled: true,
    momentum: true,
  },

  on: {
    resize: function () {
        var windowWidth = $(window).width();
        if(windowWidth <= 767){
                swiperBottomScrollbarFull.direction('vertical');
                swiperBottomScrollbarFull.detachEvents();
        }else{
                swiperBottomScrollbarFull.direction('horizontal');
                swiperBottomScrollbarFull.attachEvents();
        }
        swiperBottomScrollbarFull.update();
    }
  }
});


// Cache bust: Wed Nov  5 10:37:14 CET 2025

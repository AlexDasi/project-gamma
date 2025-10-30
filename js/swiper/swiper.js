//MAIN SWIPER

var menu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
var mainSwiper = new Swiper(".MainSwiper", {
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
    init: function() {
      this.updatePagination = function() {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, index) => {
          bullet.classList.toggle('swiper-pagination-bullet-active', index === this.activeIndex);
        });
      };
    },
    slideChange: function () {
      this.updatePagination();

      // Update arrow direction on last slide and attach a safe "go to top" handler
      const arrow = document.querySelector('.arrow');
      const arrowContainer = document.querySelector('.arrow-container');
      if (!arrowContainer) return;
      const arrowLink = arrowContainer.querySelector('a');

      // Remove any previous top-handler to avoid duplicates
      if (arrowLink && arrowLink._topHandler) {
        arrowLink.removeEventListener('click', arrowLink._topHandler, true);
        delete arrowLink._topHandler;
      }

      if (this.isEnd) {
        arrow.classList.add('up');

        if (arrowLink) {
          const swiper = this;
          // Capture-phase handler prevents Swiper's own click handlers from running
          const topHandler = function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            swiper.slideTo(0, 300, false, () => {
              // Force pagination update after slide
              requestAnimationFrame(() => {
                swiper.updatePagination();
              });
            });
          };
          arrowLink._topHandler = topHandler;
          arrowLink.addEventListener('click', topHandler, true);
        }
      } else {
        arrow.classList.remove('up');
      }
    }
  },


  

  //TO ADD FLOORS//

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },

  // navigation: {
  //   nextEl: '.swiper-button-next',
  // },
});

//WORK SWIPER

var swiper = new Swiper(".WorksSwiper", {
  allowTouchMove: true,
  direction: "horizontal",
  mousewheel: {
    forceToAxis: true,
  },
  loop: true,
  initialSlide : 3,
  grabCursor: true,
  preventClicks: false,
  mousewheel: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  speed: 100,
  freeMode: {
    enabled: true,
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



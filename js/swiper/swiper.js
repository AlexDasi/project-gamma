var swiper = new Swiper(".WorksSwiper", {
  grabCursor: true,
  // effect: "coverflow",
  mousewheel: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: -50,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: false,
  },

  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
});

var menu = ['HOME', 'WORKS', 'WORKS-NEW', 'ABOUT', 'CONTACT'];
var swiper = new Swiper(".MainSwiper", {
  direction: "vertical",
  spaceBetween: 30,
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
});

//WORKS NEW

var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
  allowTouchMove: true,
  slidesPerView: 'auto',
  grabCursor: false,
  preventClicks: false,
  spaceBetween: 30,
  keyboardControl: true,
  speed: 1000,
  pagination: {
      el: null
  },
  scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false,
      snapOnRelease: true
  },
  mousewheel: {
      enable: true
  },
  keyboard: {
      enabled: true
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
  },
  breakpoints: {
      767: {
          scrollbar: {
              hide: true
          },
          spaceBetween: 0,
          autoHeight: true,
          centeredSlides: false,
          slidesOffsetAfter: 85
      }
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

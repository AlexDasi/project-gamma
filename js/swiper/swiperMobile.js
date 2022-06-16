//MAIN SWIPER

var menu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
var swiper = new Swiper(".MainSwiper", {
  direction: "vertical",
  speed: 1000,
  // loop: true,
  allowTouchMove: true,
  spaceBetween: 0,
  slidesPerView: 1,
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
});

//WORK SWIPER

var swiper = new Swiper(".WorksSwiper", {
  allowTouchMove: true,
  direction: "horizontal",
  loop: true,
  initialSlide : 3,
  grabCursor: true,
  mousewheel: false,
  preventClicks: false,
  // mousewheel: false,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  speed: 100,
  freeMode: {
    enabled: true,
  },

  // on: {
  //   resize: function () {
  //       var windowWidth = $(window).width();
  //       if(windowWidth <= 767){
  //               swiperBottomScrollbarFull.direction('vertical');
  //               swiperBottomScrollbarFull.detachEvents();
  //       }else{
  //               swiperBottomScrollbarFull.direction('horizontal');
  //               swiperBottomScrollbarFull.attachEvents();
  //       }
  //       swiperBottomScrollbarFull.update();
  //   }
});



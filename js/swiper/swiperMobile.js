//MAIN SWIPER

var menu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
var swiper = new Swiper(".MainSwiper", {

  speed: 1000,
  // loop: true,
  allowTouchMove: true,
  spaceBetween: 0,
  slidesPerView: "auto",
  centeredSlides: true,
  direction: "vertical",
  mousewheel: {
    forceToAxis: true,
  },
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



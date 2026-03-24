//MAIN SWIPER

var menu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
var swiper = new Swiper(".MainSwiper", {

  speed: 1000,
  // loop: true,
  allowTouchMove: true,
  spaceBetween: 0,
  slidesPerView: "1",
  centeredSlides: true,
  grabCursor: true,
  direction: "vertical",
  threshold: 10,
  followFinger: true,
  resistanceRatio: 0.85,
  longSwipes: true,
  longSwipesRatio: 0.15,
  longSwipesMs: 120,
  shortSwipes: true,
  touchReleaseOnEdges: false,
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
  initialSlide: 3,
  grabCursor: true,
  direction: "horizontal",
  preventClicks: false,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,
  speed: 400,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
});



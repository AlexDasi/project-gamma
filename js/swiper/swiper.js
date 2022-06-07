var swiper = new Swiper(".WorksSwiper", {
  allowTouchMove: true,
  grabCursor: false,
  preventClicks: false,
  // effect: "coverflow",
  mousewheel: true,
  freeMode: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 0,


  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
});

var menu = ['HOME', 'WORKS', 'ABOUT', 'CONTACT'];
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

  //TO ADD FLOORS//

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },

  // navigation: {
  //   nextEl: '.swiper-button-next',
  // },
});

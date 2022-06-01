var swiper = new Swiper(".mySwiper", {
  grabCursor: true,
  effect: "coverflow",
  mousewheel: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 50,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 80,
    modifier: 2,
    slideShadows: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  // },

  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
});

var swiper = new Swiper(".MainSwiper", {
  direction: "vertical",
  spaceBetween: 30,
  slidesPerView: "auto",
  centeredSlides: true,
  mousewheel: true,

  //TO ADD FLOORS//

  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  
  // navigation: {
  //   nextEl: '.swiper-button-next',
  // },
});

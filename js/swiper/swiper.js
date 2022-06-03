var swiper = new Swiper(".WorksSwiper", {
  grabCursor: false,
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
  allowTouchMove: false,
  direction: "vertical",
  spaceBetween: 0,
  slidesPerView: "auto",
  centeredSlides: true,
  grabCursor: false,
  mousewheel: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (menu[index]) + "</span>";
    },
  },
});

swiper.on('slideChange', function(sld) {
	document.body.setAttribute('data-sld', sld.realIndex);
})

//WORK SWIPER

var swiper = new Swiper(".WorksSwiper", {
  allowTouchMove: true,
  centeredSlides: true,
  mode:'horizontal',
  freeMode: true,
  slidesPerView: 'auto',
  grabCursor: true,
  preventClicks: true,
  spaceBetween: 30,
  keyboardControl: true,
  speed: 100,
  mousewheel: {
    enable: true
  },
  breakpoints: {
    767: {
        scrollbar: {
            hide: true
        },
        spaceBetween: 0,
        autoHeight: true,
        centeredSlides: true,
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



//MAIN SWIPER

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


//works 2

var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
  allowTouchMove: true,
  centeredSlides: true,
  mode:'horizontal',
  freeMode: true,
  slidesPerView: 'auto',
  grabCursor: true,
  preventClicks: true,
  spaceBetween: 30,
  keyboardControl: true,
  speed: 100,
  pagination: {
      el: null
  },
  scrollbar: {
      el: '.swiper-scrollbar',
      draggable: true,
      hide: false,
      snapOnRelease: false,
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
          centeredSlides: true,
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

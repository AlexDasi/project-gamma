var swiperBottomScrollbarFull = new Swiper('.swiper-bottom-scrollbar-full', {
    allowTouchMove: true,
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
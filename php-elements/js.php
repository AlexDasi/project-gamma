<canvas id="c--fluid"></canvas>
<canvas id="c1"></canvas>

<script>
	(function () {
		var fluidScript = document.createElement('script');
		fluidScript.src = window.innerWidth <= 1024 ? '/js/fluidMobile.js' : '/js/fluid.js';
		document.head.appendChild(fluidScript);
	})();
</script>
<script src="/js/background-controls.js"></script>

<script src="/js/vendor/magnet-mouse.min.js"></script>
<script src="/js/magnet.js"></script>

<script src="/js/active.js"></script>

<!--swiper-->

<script src="/js/swiper/swiper-bundle.min.js"></script>
<script src="/js/swiper/swiperNew.js"></script>





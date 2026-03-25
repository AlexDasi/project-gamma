<?php
$assetVersion = static function (string $relativePath): string {
    $fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
    return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<canvas id="c--fluid"></canvas>
<canvas id="c1"></canvas>

<script>
	(function () {
		var fluidScript = document.createElement('script');
		var fluidMobileVersion = '<?php echo $assetVersion('js/fluidMobile.js'); ?>';
		var fluidDesktopVersion = '<?php echo $assetVersion('js/fluid.js'); ?>';
		fluidScript.src = window.innerWidth <= 1024
			? '/js/fluidMobile.js?v=' + fluidMobileVersion
			: '/js/fluid.js?v=' + fluidDesktopVersion;
		document.head.appendChild(fluidScript);
	})();
</script>
<script src="/js/background-controls.js?v=<?php echo $assetVersion('js/background-controls.js'); ?>"></script>

<script src="/js/vendor/magnet-mouse.min.js?v=<?php echo $assetVersion('js/vendor/magnet-mouse.min.js'); ?>"></script>
<script src="/js/magnet.js?v=<?php echo $assetVersion('js/magnet.js'); ?>"></script>

<script src="/js/active.js?v=<?php echo $assetVersion('js/active.js'); ?>"></script>

<!--swiper-->

<script src="/js/swiper/swiper-bundle.min.js?v=<?php echo $assetVersion('js/swiper/swiper-bundle.min.js'); ?>"></script>
<script src="/js/swiper/swiperNew.js?v=<?php echo $assetVersion('js/swiper/swiperNew.js'); ?>"></script>





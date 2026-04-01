<?php
$assetVersion = static function (string $relativePath): string {
	$fullPath = dirname(__DIR__) . '/' . ltrim($relativePath, '/');
	return is_file($fullPath) ? (string) filemtime($fullPath) : '1';
};
?>

<canvas id="c--fluid"></canvas>
<canvas id="c1"></canvas>

<script src="/js/fluid.js?v=<?php echo $assetVersion('js/fluid.js'); ?>"></script>

<script src="/js/vendor/magnet-mouse.min.js?v=<?php echo $assetVersion('js/vendor/magnet-mouse.min.js'); ?>"></script>
<script src="/js/magnet.js?v=<?php echo $assetVersion('js/magnet.js'); ?>"></script>

<script src="/js/active.js?v=<?php echo $assetVersion('js/active.js'); ?>"></script>
<script src="/js/project-lightbox.js?v=<?php echo $assetVersion('js/project-lightbox.js'); ?>"></script>

<!--swiper-->

<script src="/js/swiper/swiper-bundle.min.js?v=<?php echo $assetVersion('js/swiper/swiper-bundle.min.js'); ?>"></script>
<script src="/js/swiper/swiperMobile.js?v=<?php echo $assetVersion('js/swiper/swiperMobile.js'); ?>"></script>





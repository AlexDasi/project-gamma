<?php

include 'php-elements/header.php'

?>

<body>

    <?php include 'php-elements/nav new.php'?>

    <!-- <?php include 'php-elements/preloader.php'?> -->

<!-- MAIN CONTENT -->

<!-- MAIN CONTENT SWIPER-->

<div class="swiper MainSwiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-index">
            <?php include 'php-pages/home.php'?>
        </div>
        <div class="swiper-slide slide-works">
            <?php include 'php-pages/works.php'?>   
        </div>
    </div>

    <div class="swiper-pagination"></div>
    <div class="swiper-pagination-nav"></div>
    <?php include 'php-elements/arrow.php'?>

</div>


<!-- END OF MAIN CONTENT SWIPER -->



    <?php

    include 'php-elements/js.php'

    ?>
        
    <footer>

    <?php

    include 'php-elements/footer.php'

    ?>
</footer>

</body>
</html>
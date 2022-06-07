<?php

include 'php-elements/header.php'

?>

<body class="">

    <?php include 'php-elements/nav.php'?>

    <!-- <?php include 'php-elements/preloader.php'?> -->

<!-- MAIN CONTENT -->

<!-- MAIN CONTENT SWIPER-->
<body>
    

<div class="swiper MainSwiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide slide-index">
            <?php include 'php-pages/home.php'?>
        </div>
        <div class="swiper-slide slide-works-new">
            <?php include 'php-pages/works-new/works.php'?>   
        </div>
    </div>

    <div class="swiper-pagination"></div>
    <div class="swiper-pagination-nav"></div>
</div>


<!-- END OF MAIN CONTENT SWIPER -->

    <?php include 'php-elements/arrow.php'?>

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
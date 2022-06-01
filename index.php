<?php

include 'php-elements/header.php'

?>

<body>

    <?php

    include 'php-elements/nav.php'

    ?>

    <!-- <?php include 'php-elements/preloader.php'?> -->

<!-- MAIN CONTENT -->

<!-- MAIN CONTENT SWIPER-->

<div class="MainSwiper myMainSwiper">
    <div class="MainSwiper-wrapper">
        <div class="MainSwiper-slide slide-index">
            <?php include 'php-pages/home.php'?>
        </div>
        <div class="MainSwiper-slide slide-works">
            <?php include 'php-pages/works.php'?>   
        </div>
    </div>
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
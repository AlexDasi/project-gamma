<div id="works">

    <!-- Swiper -->
    <div class="swiper WorksSwiper">
        <div class="swiper-wrapper">

        <?php

$works = new WP_Query ( array
(
    'post_type' => 'post',
    'posts_per_page' => -1
));

?>

<?php while ( $works -> have_posts() ) : $works -> the_post(); ?>

<div class="swiper-slide">


    <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail ( 'medium' ); ?></a>


</div>

<?php endwhile; ?>

            <div class="swiper-slide">
                <img src="images/pictures/camisola.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/Terralava.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/ROTCPop-up.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/SE.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/SKULL-2.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/poster conciertos.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/RoS styleguide.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/RoS enviromental.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/Pinstripe.jpg"/>
            </div>
            <div class="swiper-slide">
                <img src="images/pictures/burbuja-wood-banner.jpg"/>
            </div>
        </div>
        <div class="swiper-pagination"></div>

    </div>
</div>
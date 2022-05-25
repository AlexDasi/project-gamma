       <!-- PREFOOTER -->

       <section id="blog-prefooter" class="prefooter">

<div class="center">

    <h1>From our Blog</h1>

    <?php 
    
        $posts = new WP_Query ( array 
        
        (
                'post_type' => 'post', 
                'post_per_page' => '3',
                'orderby' => 'name',
                'order' => 'ASC'
        ) ); 
                
    ?>

    <?php while ( $posts -> have_posts() ) : $posts -> the_post(); ?>

    <article>

        <time datetime="<?php the_time ( 'Y-m-d' ); ?>"><?php the_time ( 'd.m.Y' ); ?></time>
        <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>

    </article>

<?php endwhile; wp_reset_postdata(); ?>

    loop

    <article>

        <time datetime="2018-03-20">20.03.2018</time>
        <h1><a href="blog-what-are-the-lovely-internet-cookies.html">What are the lovely Internet Cookies</a></h1>

    </article>

    /loop

    <article>

        <time datetime="2018-03-18">18.03.2018</time>
        <h1><a href="blog-what-is-the-scary-404-page-error.html">What is the scary 404 page error</a></h1>

    </article>

    <article>

        <time datetime="2018-03-16">16.03.2018</time>
        <h1><a href="blog-what-is-a-sitemap-for-the-search-engines.html">What is a Sitemap for the Search Engines</a></h1>

    </article>

    <a href="<?php bloginfo ('url'); ?>/blog" class="button noborder">View all posts</a>

</div>

</section>

<!-- FOOTER -->

<footer>

<div class="center">

    <h6 class="hidden">Page footer</h6>

    <div id="footer-menu">

        <a href="<?php bloginfo ('url'); ?>" id="copyright"><?php bloginfo ('name'); ?></a>

        <?php wp_nav_menu ( array ( 'theme_location' => 'footer' ) ); ?>

    </div>

    <div id="footer-social">

        <?php wp_nav_menu ( array ( 'theme_location' => 'social' ) ); ?>

    </div>

</div>

</footer>

<?php wp_footer(); ?>
</body>

</html>

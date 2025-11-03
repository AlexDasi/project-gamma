

<!-- FOOTER -->

<footer>

<div class="center">

<h6 class="hidden">Page footer</h6>

<div id="footer-menu">

    <!-- <a href="<?php bloginfo ('url'); ?>" id="copyright"><?php bloginfo ('name'); ?></a> -->

    <!-- <?php wp_nav_menu ( array ( 'theme_location' => 'footer' ) ); ?> -->

</div>

<div id="footer-social">

    <?php if (function_exists('wp_nav_menu')) wp_nav_menu ( array ( 'theme_location' => 'social' ) ); ?>

</div>

</div>

</footer>

<?php if (function_exists('wp_footer')) wp_footer(); ?>
</body>

</html>

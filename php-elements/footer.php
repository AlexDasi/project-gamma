

<!-- FOOTER -->

<footer>

<div class="center">

<h6 class="hidden">Page footer</h6>

<div id="footer-menu">

<!-- <a href="<?php bloginfo('url'); ?>" id="copyright"><?php bloginfo('name'); ?></a> -->
<!-- <?php wp_nav_menu(array('theme_location' => 'footer')); ?> -->
<!-- <?php wp_footer(); ?> -->


</div>

<div id="footer-social">

    <?php wp_nav_menu ( array ( 'theme_location' => 'social' ) ); ?>

</div>

</div>

</footer>

<?php wp_footer(); ?>
</body>

</html>

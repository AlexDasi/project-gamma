<?php get_header(); the_post()?>

    

        <!-- SECONDARY PAGE -->


            <section id="secondary-page" <?php post_class('center'); ?>>

                <header class="no-intro page">

                    <h1><?php the_title(); ?></h1>                

                </header>

                <div class="columns">

                    <div class="page-content cols-8">

                        <?php the_content(); ?>    

                    </div>

                    <?php get_sidebar ( 'page' ); ?>

                </div>

                <a href="emojis.html" class="button">Meet the emojis</a>

            </section>

                    <!--  CANVAS -->

        <div class="canvas-outer beneath" data-splash-bg-outer="">
            <splash-bg class="splash-bg" style="opacity: 1;"><canvas></canvas></splash-bg>
        </div>
                



<?php get_footer(); ?>
<?php get_header(); the_post(); ?>

<section>



        <!-- BLOG POST -->

        <article id="blog-post" <?php post_class('center'); ?>>

            <header class="no-intro">

                <a href="blog.html">From our blog</a>
                <h1><?php the_title(); ?></h1>                
                <time datetime="<?php the_time ( 'Y-m-d' );  ?>"><?php the_time ( 'd.m.Y' );  ?></time>  
                <?php the_category(); ?>

            </header>

            <div class="columns">

                <div class="post-content cols-8">

                <?php the_content(); ?>    

                </div>

                <?php get_sidebar(); ?>
                    <?php get_sidebar ( 'widgets' ); ?>
                    <?php get_sidebar ( 'contact' ); ?>

            </div>

            <a href="blog.html" class="button">Next article</a>

        </article>

</section>

<?php get_footer(); ?>
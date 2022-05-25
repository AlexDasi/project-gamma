<?php get_header(); ?>






        <!-- BLOG -->

        <section id="blog" class="blog-grid center">

            <header class="page-intro center">

                <h1>Blog <span>and fun stuff</span></h1>
                <p>This has been a truly fun and rewarding project for us. Know more about freak stuff by reading our articles.</p>

            </header>

            <?php while ( have_posts() ) : the_post(); ?>

            <article <?php post_class(); ?>>

                <header>

                <time datetime="<?php the_time ( 'Y-m-d' );  ?>"><?php the_time ( 'd.m.Y' );  ?></time>                   
                <div>
                        <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
                        <p class="excerpt"><?php the_excerpt(); ?></p>
                    </div>
                    <a href="<?php the_permalink(); ?>">Read more</a>
                    <?php if ( get_post_format() == 'video' ) : ?>

                    <?php endif ?>

                </header>

                <figure>

                    <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium'); ?></a>
                </figure>

            </article>

            <?php endwhile; ?>

        </section>



<?php get_footer(); ?>
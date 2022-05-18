<?php get_header(); ?>

<!-- ARCHIVE: CATEGORY -->

    <section id="blog" class="blog-grid center">

    <header class="page-intro center">

        <?php the_archive_titley(); ?>
        
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

        </header>

        <figure>

            <a href="<?php the_permalink(); ?>"><img src="images/blog-cookie.jpg" alt="What are the lovely Internet Cookies"></a>

        </figure>

    </article>

    <?php endwhile; ?>

    </section>

<?php get_footer(); ?>
<?php /* Template name: Submit */ ?>

<?php get_header(); the_post()?>

        <!-- SUBMIT -->

        <section id="submit" class="center">

            <?php get_template_part ('snippets/page-title');?>

            <!-- FORM -->

            <?php the_content ()?>

        </section>

<?php get_footer(); ?>
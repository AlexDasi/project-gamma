<?php

// HABILITA LAS IMÁGENES DESTACADAS

add_theme_support ( 'post-thumbnails' ); 

// BORRAR TAMAÑOS DE IMÁGENES SOBRANTES

remove_image_size( '1536x1536' );
remove_image_size( '2048x2048' );

// AñADIR TIPO DE ENTRADA

add_theme_support ( 'post-formats', array ( 'image', 'audio', 'video' ) );

// REGISTRO DE MENUS

register_nav_menu ( 'main', 'Menú principal' );
register_nav_menu ( 'footer', 'Menú pie de página' );
register_nav_menu ( 'social', 'Menú redes sociales' );


// REGISTRO DE SIDEBARS


register_sidebar ( array
    (
        'name' => 'Sidebar del blog',
        'id' => 'blog',
        'before_title' => '<h6>',
        'after_title' => '</h6>',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>'
    ));

    register_sidebar ( array
    (
        'name' => 'Sidebar de las páginas',
        'id' => 'page',
        'before_title' => '<h6>',
        'after_title' => '</h6>',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>'
    ));

// TEST JS

// wp_register_script( 
//     'fluid', 
//     'https://wordpress.esatid3-2021.com/alex/emojibook/wp-content/themes/emojibook/js/fluid.js', 
//     array(), 
//     '', 
//     true);



function wpb_add_googleanalytics() { ?>
        <script>
            window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
            ga('create', 'UA-105392568-1', 'auto');
            ga('send', 'pageview');
        </script>
        <script async src="https://www.google-analytics.com/analytics.js"></script>
<?php } 

add_action('wp_head', 'wpb_add_googleanalytics');



function collectiveray_load_js_script() {

if( is_page('') ) {

    wp_enqueue_script( 
        'dat', 
        'https://wordpress.esatid3-2021.com/alex/emojibook/wp-content/themes/emojibook/js/dat.gui.min.js', 
        array(), 
        '', 
        false);

    wp_enqueue_script( 
        'fluid', 
        'https://wordpress.esatid3-2021.com/alex/emojibook/wp-content/themes/emojibook/js/fluid.js', 
        array(), 
        '', 
        true);


    }
}

add_action('wp_enqueue_scripts', 'collectiveray_load_js_script');


?>
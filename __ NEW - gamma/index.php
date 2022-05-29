<?php

include 'header.php'

?>

<body>

    <?php

    include 'nav.php'

    ?>

    <!-- <?php include 'preloader.php'?> -->

<section class="categories">
    <ul>
        <li id="graphic" class="categories--items"><a class="main-text" href="">GRAPHIC</a></li>
        <li id="message-graphic" class="secondary-text message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus eveniet sequi culpa pariatur, corrupti iure vero impedit temporibus perspiciatis deserunt, placeat voluptate voluptates qui exercitationem, incidunt aliquam totam voluptas.</li>

        <li onmouseover="hideui()" class="categories--items"><a class="main-text ui" href="">USER INTERFACE</a></li>
        <li onmouseover="hideweb()" class="categories--items"><a class="main-text web" href="">WEB</a></li>
    </ul>
    <p class="main-text categories--designer">designer</p>
</section>

<section class="messages">
    <ul>
        <li id="message-graphic" class="secondary-text message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus eveniet sequi culpa pariatur, corrupti iure vero impedit temporibus perspiciatis deserunt, placeat voluptate voluptates qui exercitationem, incidunt aliquam totam voluptas.</li>
        <li id="message-ui" class="secondary-text message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus eveniet sequi culpa pariatur, corrupti iure vero impedit temporibus perspiciatis deserunt, placeat voluptate voluptates qui exercitationem, incidunt aliquam totam voluptas.</li>
        <li id="message-web" class="secondary-text message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus eveniet sequi culpa pariatur, corrupti iure vero impedit temporibus perspiciatis deserunt, placeat voluptate voluptates qui exercitationem, incidunt aliquam totam voluptas.</li>
    </ul>
</section>

<section class="floor--container">
    <ul class="floor">
        <li><div class="floor--1"></div></li>
        <li><div class="floor--2"></div></li>
        <li><div class="floor--3"></div></li>
        <li><div class="floor--4"></div></li>
    </ul>
</section>

<?php include 'arrow.php'?>

    <?php

    include 'js.php'

    ?>
    
<footer>

    <?php

    include 'footer.php'

    ?>
</footer>

</body>
</html>
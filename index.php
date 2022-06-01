<?php

include 'header.php'

?>

<body lj-type="stage">

    <?php

    include 'nav.php'

    ?>

    <!-- <?php include 'preloader.php'?> -->

    <div lj-type="layer">
        <div lj-type="frame" id="home-frame">

            <section class="categories">
                <ul>
                    <li id="graphic" class="categories--items text-hover-fill-goes-right"><a class="main-text graphic" href="">GRAPHIC</a></li>
                    <li id="message-graphic" class="secondary-text message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit repellendus eveniet sequi culpa pariatur, corrupti iure vero impedit temporibus perspiciatis deserunt, placeat voluptate voluptates qui exercitationem, incidunt aliquam totam voluptas.</li>

                    <li onmouseover="hideui()" onmouseout="hideui()" class="categories--items"><a class="main-text ui" href="">USER INTERFACE</a></li>
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

            <section class="building--container">
                <div class="building">
                    <button class="floor floor--1 active"></button>
                    <button class="floor floor--2" href="#work-frame"></button>
                    <button class="floor floor--3"></button>
                    <button class="floor floor--4"></button>
                </div>
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

        </div>

        <div lj-type="frame" id="work-frame">
        </div>
    </div>

</body>
</html>
<?php

include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>



    <!-- ---------------------------------------------
         HERO
    ---------------------------------------------- -->
    <header class="project-header">

        <div class="project-header__image">
            <img class="center" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-05.jpg" alt="Volunteers crossing a river carrying aid boxes" loading="eager" decoding="async">
        </div>

        <h1 class="padding3 project-header__title title title--project title--black">Tulong</h1>

        <!-- ---------------------------------------------
             INTRO / OVERVIEW
        ---------------------------------------------- -->
        <section class="project-description">
            <div class="project-description__main">

                <h2 class="padding3 slice-infos__title">Humanitarian Logistics, Operationally Clear</h2>

                <div class="padding3 slice-infos__text">
                    <p>Tulong is a humanitarian logistics control system for last-mile aid distribution. Built from real field deployments in Valencia (DANA) and the Philippines, it was developed in 2025–2026 and validated in operational contexts to improve planning clarity, fleet coordination, and delivery visibility.</p>
                </div>

                <ul class="padding3 slice-infos__columns">
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">project</h3>
                        <div class="info-column__text"><p>Tulong<br>2025 - 2026</p></div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">scope</h3>
                        <div class="info-column__text">
                            <p>
                                UX/UI Design<br>
                                System Design<br>
                                Operational Logic<br>
                                Data Visualization
                            </p>
                        </div>
                    </li>
                    <li class="info-column">
                        <h3 class="info-column__title title title--2">context</h3>
                        <div class="info-column__text">
                            <p>Valencia (DANA) + Philippines<br>Field-tested deployments<br>Designed for World Central Kitchen emergency operations</p>
                        </div>
                    </li>
                </ul>

            </div>
        </section>

        <!-- ---------------------------------------------
             MAIN CONTENT
        ---------------------------------------------- -->
        <section class="project-content">
            <div class="project-content__wrapper tulong-flow">

                <figure class="tulong-figure tulong-figure--full">
                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/mockups/tulong-mockup-03.jpg" alt="Tulong three-screen operational view" loading="lazy" decoding="async">
                </figure>

                <!-- PROBLEM / CONTEXT -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Emergency operations often run with fragmented data and parallel teams. Without a shared operational view, routing decisions, destination prioritization, and fleet usage become harder to align in real time.</p>
                    <figure class="tulong-figure tulong-figure--full">
                        <img class="element project-content__image" src="../../content/pictures/projects/tulong/screenshots/tulong-dashboard-screenshot-01.png" alt="Tulong dashboard showing fragmented logistics context" loading="lazy" decoding="async">
                    </figure>
                </section>

                <!-- CORE SYSTEM -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Tulong organizes response planning through three linked layers: kits, destination blocks, and fleet assignment.</p>
                    <div class="tulong-grid">
                        <figure class="tulong-figure tulong-figure--full">
                            <img class="element project-content__image tulong-mockup" src="../../content/pictures/projects/tulong/mockups/tulong-mockup-04.jpg" alt="Tulong planning calendar and logistics scheduling view" loading="lazy" decoding="async">
                        </figure>
                        <figure class="tulong-figure">
                            <img class="element project-content__image" src="../../content/pictures/projects/tulong/screenshots/tulong-dashboard-screenshot-02.png" alt="Tulong destination block planning" loading="lazy" decoding="async">
                        </figure>
                        <figure class="tulong-figure tulong-figure--full">
                            <img class="element project-content__image" src="../../content/pictures/projects/tulong/screenshots/tulong-dashboard-screenshot-03.png" alt="Tulong fleet assignment view" loading="lazy" decoding="async">
                        </figure>
                    </div>
                </section>

                <!-- MAIN OPERATIONAL VIEW -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">The distribution matrix acts as the single decision surface for coordinators during active operations, connecting route assignment, trip load, and destination timing in one glance.</p>
                    <figure class="tulong-figure tulong-figure--full">
                        <img class="element project-content__image" src="../../content/pictures/projects/tulong/screenshots/tulong-dashboard-screenshot-04.png" alt="Tulong distribution matrix with routes and dispatch status" loading="lazy" decoding="async">
                    </figure>
                    <figure class="tulong-figure tulong-figure--full">
                        <img class="element project-content__image" src="../../content/pictures/projects/tulong/mockups/tulong-mockup-06.jpg" alt="Tulong platform overview mockup" loading="lazy" decoding="async">
                    </figure>
                </section>

                <!-- PLANNING / OPTIMIZATION -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Daily planning and end-of-day optimization are designed as one continuous cycle: build feasible plans, test fleet strain, and rebalance distribution before dispatch deadlines are reached.</p>
                    <div class="tulong-grid">
                        <figure class="tulong-figure tulong-figure--full">
                            <img class="element project-content__image tulong-mockup" src="../../content/pictures/projects/tulong/mockups/tulong-mockup-05.jpg" alt="Tulong operational dashboard on laptop in low-light context" loading="lazy" decoding="async">
                        </figure>
                    </div>
                </section>

                <!-- IMPACT -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Field testing showed clearer planning cycles, faster dispatch alignment, and stronger shared awareness across operations. Coordinators also reported better handoffs between planning, loading, and route execution under real constraints.</p>
                </section>

                <!-- ROLE -->
                <p class="padding3 project-content__quote">I led the project end-to-end: system concept, UX architecture, interaction logic, and interface design. Tulong is positioned as an operational proposal for World Central Kitchen emergency response scenarios.</p>

                <!-- FIELD PHOTOS CAROUSEL -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">The following field scenes ground the proposal in real deployment conditions and last-mile distribution realities.</p>
                    <div class="tulong-carousel" data-tulong-carousel>
                        <button class="tulong-carousel__button tulong-carousel__button--prev" type="button" aria-label="Previous field photo">&#8249;</button>
                        <div class="tulong-carousel__viewport" data-tulong-viewport>
                            <div class="tulong-carousel__track">
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-01.jpg" alt="Tulong field team and partners" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-02.jpg" alt="Community-facing aid activation point" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-03.jpg" alt="Field coordination moment during aid distribution" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-04.jpg" alt="Relief team unloading organized field kits" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-05.jpg" alt="Volunteers crossing a river carrying aid boxes" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-06.jpg" alt="Tulong field photo 06" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-07.jpg" alt="Tulong field photo 07" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-08.jpg" alt="Tulong field photo 08" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-09.jpg" alt="Tulong field photo 09" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-10.jpg" alt="Tulong field photo 10" loading="lazy" decoding="async">
                                </figure>
                                <figure class="tulong-carousel__slide">
                                    <img class="element project-content__image" src="../../content/pictures/projects/tulong/real-photos/tulong-field-photo-11.jpg" alt="Tulong field photo 11" loading="lazy" decoding="async">
                                </figure>
                            </div>
                        </div>
                        <button class="tulong-carousel__button tulong-carousel__button--next" type="button" aria-label="Next field photo">&#8250;</button>
                    </div>
                </section>
            </div>
        </section>

    </header>

    <?php include '../../php-elements/js-nofluid.php'?>

    <script>
        (function () {
            var carousel = document.querySelector('[data-tulong-carousel]');
            if (!carousel) {
                return;
            }

            var viewport = carousel.querySelector('[data-tulong-viewport]');
            var nextButton = carousel.querySelector('.tulong-carousel__button--next');
            var prevButton = carousel.querySelector('.tulong-carousel__button--prev');
            if (!viewport || !nextButton || !prevButton) {
                return;
            }

            var track = viewport.querySelector('.tulong-carousel__track');
            if (!track) {
                return;
            }

            var baseSlides = Array.prototype.slice.call(track.querySelectorAll('.tulong-carousel__slide'));
            if (baseSlides.length < 2) {
                return;
            }

            var prependClones = baseSlides.map(function (slide) {
                return slide.cloneNode(true);
            });
            prependClones.reverse().forEach(function (clone) {
                track.insertBefore(clone, track.firstChild);
            });

            baseSlides.forEach(function (slide) {
                track.appendChild(slide.cloneNode(true));
            });

            var allSlides = Array.prototype.slice.call(track.querySelectorAll('.tulong-carousel__slide'));
            var setSize = baseSlides.length;
            var currentIndex = setSize;
            var scrollTimer = null;

            var getStep = function () {
                return viewport.clientWidth;
            };

            var scrollToIndex = function (index, smooth) {
                viewport.scrollTo({
                    left: getStep() * index,
                    behavior: smooth ? 'smooth' : 'auto'
                });
            };

            var normalizeIndex = function () {
                if (currentIndex >= setSize * 2) {
                    currentIndex = currentIndex - setSize;
                    scrollToIndex(currentIndex, false);
                } else if (currentIndex < setSize) {
                    currentIndex = currentIndex + setSize;
                    scrollToIndex(currentIndex, false);
                }
            };

            scrollToIndex(currentIndex, false);

            nextButton.addEventListener('click', function () {
                currentIndex += 1;
                scrollToIndex(currentIndex, true);
            });

            prevButton.addEventListener('click', function () {
                currentIndex -= 1;
                scrollToIndex(currentIndex, true);
            });

            viewport.addEventListener('scroll', function () {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function () {
                    currentIndex = Math.round(viewport.scrollLeft / getStep());
                    normalizeIndex();
                }, 120);
            });
        })();
    </script>

    <footer>

        <p class="credits credits-left creditsDesktop">PRESS SPACE :)</p>

        <p class="credits creditsMobile">Alex Dasi©2026</p>

        <?php include '../../php-elements/footer.php' ?>

    </footer>

</body>
</html>

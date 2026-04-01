<?php

include '../../php-elements/header-works.php'

?>

<body class="project-page">

    <?php include '../../php-elements/nav new.php'?>

    <style>
        .tulong-flow {
            display: flex;
            flex-direction: column;
            gap: 1.4rem;
        }

        .tulong-section {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
        }

        .slice-infos__columns {
            list-style: none;
            margin: 0;
            padding-left: 0;
        }

        .tulong-copy {
            color: var(--bkg-color);
            line-height: 1.2;
            font-size: 4.5rem;
            margin: 0;
            padding: 4vw 0;
        }

        .tulong-figure {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin: 0;
        }

        .tulong-figure--full {
            flex-basis: 100%;
            width: 100%;
        }

        .tulong-figure > img {
            display: block;
            width: 100%;
            height: auto;
            max-width: 100%;
        }

        .tulong-grid {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            width: 100%;
        }

        .tulong-grid .tulong-figure {
            flex-basis: 100%;
            width: 100%;
            min-width: 0;
        }

        .tulong-grid .project-content__image {
            object-fit: contain;
        }

        .project-header__image .tulong-figure > img {
            width: 100%;
            height: 62vh;
            object-fit: cover;
            object-position: center 72%;
        }

        .tulong-mockup {
            width: 100%;
            max-height: none;
            object-fit: contain;
        }

        .tulong-diagram {
            width: 100%;
            max-height: none;
            object-fit: contain;
        }

        .tulong-carousel {
            position: relative;
            width: 100%;
            margin-top: 0.4rem;
        }

        .tulong-carousel__viewport {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .tulong-carousel__viewport::-webkit-scrollbar {
            display: none;
        }

        .tulong-carousel__track {
            display: flex;
            gap: 1rem;
        }

        .tulong-carousel__slide {
            min-width: 100%;
            scroll-snap-align: start;
            margin: 0;
        }

        .tulong-carousel__slide img {
            width: 100%;
            height: 56vw;
            max-height: 70vh;
            display: block;
            object-fit: cover;
            object-position: center center;
        }

        @media (min-width: 768px) {
            .tulong-carousel__slide img {
                height: 28vw;
                max-height: 60vh;
            }
        }

        .tulong-carousel__button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 2;
            border: 0;
            background: rgba(0, 0, 0, 0.55);
            color: #fff;
            width: 44px;
            height: 44px;
            cursor: pointer;
            font-size: 1.5rem;
            line-height: 1;
        }

        .tulong-carousel__button--prev {
            left: 0.75rem;
        }

        .tulong-carousel__button--next {
            right: 0.75rem;
        }

        @media (max-width: 1280px) {
            .tulong-flow {
                gap: 1.1rem;
            }

            .tulong-grid {
                gap: 1rem;
            }

            .tulong-copy {
                font-size: 2.6rem;
                line-height: 1.22;
            }

            .tulong-carousel__button {
                width: 38px;
                height: 38px;
            }
        }
    </style>

    <!-- ---------------------------------------------
         HERO
    ---------------------------------------------- -->
    <header class="project-header">

        <h1 class="padding3 project-header__title title title--project title--black">Tulong</h1>

        <div class="project-header__image">
            <figure class="tulong-figure">
                <img class="center project-content__image" src="../../content/pictures/projects/tulong/mockups/tulong-mockup-06.jpg" alt="Tulong platform overview mockup" loading="eager" decoding="async">
            </figure>
        </div>

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
                            <p>Valencia (DANA) + Philippines<br>Field-tested deployments<br>World Central Kitchen collaboration in progress</p>
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
                    <p class="padding3 tulong-copy">Emergency operations often run with fragmented data and parallel teams. Without a shared operational view, routing decisions, destination prioritization, and fleet usage become harder to align in real time.</p>
                    <figure class="tulong-figure tulong-figure--full">
                        <img class="element project-content__image" src="../../content/pictures/projects/tulong/screenshots/tulong-dashboard-screenshot-01.png" alt="Tulong dashboard showing fragmented logistics context" loading="lazy" decoding="async">
                    </figure>
                </section>

                <!-- CORE SYSTEM -->
                <section class="tulong-section">
                    <p class="padding3 tulong-copy">Tulong organizes response planning through three linked layers: kits, destination blocks, and fleet assignment.</p>
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
                    <p class="padding3 tulong-copy">The distribution matrix acts as the single decision surface for coordinators during active operations, connecting route assignment, trip load, and destination timing in one glance.</p>
                    <figure class="tulong-figure tulong-figure--full">
                        <img class="element project-content__image" src="../../content/pictures/projects/tulong/screenshots/tulong-dashboard-screenshot-04.png" alt="Tulong distribution matrix with routes and dispatch status" loading="lazy" decoding="async">
                    </figure>
                </section>

                <!-- PLANNING / OPTIMIZATION -->
                <section class="tulong-section">
                    <p class="padding3 tulong-copy">Daily planning and end-of-day optimization are designed as one continuous cycle: build feasible plans, test fleet strain, and rebalance distribution before dispatch deadlines are reached.</p>
                    <div class="tulong-grid">
                        <figure class="tulong-figure tulong-figure--full">
                            <img class="element project-content__image tulong-mockup" src="../../content/pictures/projects/tulong/mockups/tulong-mockup-05.jpg" alt="Tulong operational dashboard on laptop in low-light context" loading="lazy" decoding="async">
                        </figure>
                    </div>
                </section>

                <!-- IMPACT -->
                <section class="tulong-section">
                    <p class="padding3 tulong-copy">Field tests showed clearer planning cycles, faster dispatch alignment, and stronger operational awareness across teams. Coordinators reported better handoff quality between planning, loading, and route execution under real constraints.</p>
                </section>

                <!-- ROLE -->
                <p class="padding3 project-content__quote">I led the project end-to-end: system concept, UX architecture, interaction logic, and interface design. The work is currently evolving toward implementation in collaboration with World Central Kitchen.</p>

                <!-- FIELD PHOTOS CAROUSEL -->
                <section class="tulong-section">
                    <p class="padding3 project-content__quote">Field context from active deployments and distribution routes.</p>
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

            var getStep = function () {
                return viewport.clientWidth;
            };

            nextButton.addEventListener('click', function () {
                viewport.scrollBy({ left: getStep(), behavior: 'smooth' });
            });

            prevButton.addEventListener('click', function () {
                viewport.scrollBy({ left: -getStep(), behavior: 'smooth' });
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

<?php include '../../php-elements/header-works.php'; ?>
<?php include '../../php-elements/nav new.php'; ?>

<?php 

// Define un array con los datos de las imágenes para este proyecto
$images = [
    [
        'path' => '/content/pictures/projects/elsa/ELSA.jpg',
        'alt' => 'Elsa Moreno website homepage'
    ],
    [
        'path' => '/content/pictures/projects/elsa/iphone-elsa 1.jpg',
        'alt' => 'Elsa Moreno website mobile view'
    ],
    [
        'path' => '/content/pictures/projects/elsa/Macbook-elsa.jpg',
        'alt' => 'Elsa Moreno website desktop view'
    ],
    [
        'path' => '/content/pictures/projects/elsa/Macbook-elsa 2.jpg',
        'alt' => 'Elsa Moreno website additional view'
    ]
];

?>

<div class="project-content">
    <div class="project-content__header">
        <div class="info-column">
            <div class="info-column__title">
                Elsa Moreno
            </div>
            <div class="info-column__subtitle">
                2025
            </div>
        </div>
        <div class="info-column">
            <div class="info-column__title">
                Category
            </div>
            <div class="info-column__text">
                Web Design, Development, Visual Language
            </div>
        </div>
    </div>

    <div class="project-content__quote">
        Web design and development for Elsa Moreno, a poet and multidisciplinary artist whose work blends performance, literature, and ecology. The site reflects her artistic sensibility through a minimalist layout, soft color palette, and rhythmic visual flow—creating a serene digital space that mirrors her poetic and performative universe.
    </div>

    <div class="project-content__images">
        <?php foreach ($images as $image): ?>
            <img src="<?= $image['path'] ?>" alt="<?= $image['alt'] ?>">
        <?php endforeach; ?>
    </div>

    <div class="info-column project-content__footer">
        <div class="info-column__title">
            Credits
        </div>
        <div class="info-column__text">
            Creative Direction: <a href="#" target="_blank">Elsa Moreno</a><br>
            Design & Development: Alex Dasi
        </div>
    </div>
</div>

<?php include '../../php-elements/js-nofluid.php'; ?>
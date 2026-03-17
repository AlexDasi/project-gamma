<?php
$siteName = 'Alex Dasi Portfolio';
if (!isset($pageTitle) || !is_string($pageTitle) || trim($pageTitle) === '') {
    $scriptName = basename($_SERVER['SCRIPT_NAME'] ?? '');
    if ($scriptName !== '' && $scriptName !== 'index.php') {
        $slug = pathinfo($scriptName, PATHINFO_FILENAME);
        $projectName = ucwords(str_replace('-', ' ', $slug));
        $pageTitle = $projectName . ' | ' . $siteName;
    } else {
        $pageTitle = $siteName;
    }
}
$metaDescription = isset($metaDescription) && is_string($metaDescription) && trim($metaDescription) !== ''
    ? trim($metaDescription)
    : 'Portfolio of Alex Dasi, graphic designer and web designer creating brand identities, interfaces, and digital experiences.';
?>

<!doctype html>

<html lang="en">

    <head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#f7ff99">
    <meta property="og:title" content="<?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:description" content="<?php echo htmlspecialchars($metaDescription, ENT_QUOTES, 'UTF-8'); ?>">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Alex Dasi Portfolio">
    <meta name="twitter:card" content="summary_large_image">
    <title><?php echo htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8'); ?></title>
    <link rel="icon" type="image/svg+xml" href="/images/vectors/arrow.svg">
        
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">    

    <script type="text/javascript" src="/dat.gui.min.js"></script>
    <script>
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
        ga('create', 'UA-105392568-1', 'auto');
        ga('send', 'pageview');
    </script>
    <script async src="https://www.google-analytics.com/analytics.js"></script>

    <!-- cursor -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="/js/cursor.js"></script>



    <link rel="stylesheet" href="/scss/js-style/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="/css/style.css">



    </head>
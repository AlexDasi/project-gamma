<?php 
    $navTransparent = TRUE;
?>

<!DOCTYPE html>
<html lang="en">
    <!-- The canvas element is used to draw the 3D scene -->

<head>
    <meta charset="UTF-8">
    
    <!-- Imporant meta information to make the page as rigid as possible on mobiles, to avoid unintentional zooming on the page itself  -->
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <title>Editor</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@1,300&family=Roboto:wght@300;400&family=Yeseva+One&display=swap" rel="stylesheet">    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/style-for-editor.css">
    <link rel="stylesheet" href="css/style.css">

</head>


<body>

<?php

include 'phpelements/nav.php'

?>



    <!-- These toggle the the different parts of the chair that can be edited, note data-option is the key that links to the name of the part in the 3D file -->
    <div class="buy">BUY 19.90€</div>
    <div class="options">

        <div class="option --is-active" data-option="shirt">
            <p>Fabric</p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6676 14H5.3343C5.15749 14 4.98792 13.9298 4.86289 13.8047C4.73787 13.6797 4.66763 13.5101 4.66763 13.3333V8.04667L3.80096 8.71333C3.54096 8.97333 3.12096 8.97333 2.86096 8.71333L0.974297 6.86C0.714297 6.6 0.714297 6.18 0.974297 5.92L4.8943 2H6.00096C6.00096 2.73333 6.8943 3.33333 8.00096 3.33333C9.10763 3.33333 10.001 2.73333 10.001 2H11.1076L15.0276 5.92C15.2876 6.18 15.2876 6.6 15.0276 6.86L13.141 8.74667C12.881 9 12.461 9 12.201 8.74667L11.3343 8.08V13.3333C11.3343 13.5101 11.2641 13.6797 11.139 13.8047C11.014 13.9298 10.8444 14 10.6676 14Z" fill="#01003C"/>
            </svg>
        </div>
        <div class="option" data-option="button"> 
            <p>Buttons</p>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00065 13.333C6.58616 13.333 5.22961 12.7711 4.22941 11.7709C3.22922 10.7707 2.66732 9.41416 2.66732 7.99967C2.66732 6.58519 3.22922 5.22863 4.22941 4.22844C5.22961 3.22824 6.58616 2.66634 8.00065 2.66634C9.41514 2.66634 10.7717 3.22824 11.7719 4.22844C12.7721 5.22863 13.334 6.58519 13.334 7.99967C13.334 9.41416 12.7721 10.7707 11.7719 11.7709C10.7717 12.7711 9.41514 13.333 8.00065 13.333ZM8.00065 1.33301C7.12517 1.33301 6.25827 1.50545 5.44943 1.84048C4.64059 2.17551 3.90566 2.66657 3.28661 3.28563C2.03636 4.53587 1.33398 6.23156 1.33398 7.99967C1.33398 9.76779 2.03636 11.4635 3.28661 12.7137C3.90566 13.3328 4.64059 13.8238 5.44943 14.1589C6.25827 14.4939 7.12517 14.6663 8.00065 14.6663C9.76876 14.6663 11.4645 13.964 12.7147 12.7137C13.9649 11.4635 14.6673 9.76779 14.6673 7.99967C14.6673 7.1242 14.4949 6.25729 14.1598 5.44845C13.8248 4.63961 13.3338 3.90469 12.7147 3.28563C12.0956 2.66657 11.3607 2.17551 10.5519 1.84048C9.74304 1.50545 8.87613 1.33301 8.00065 1.33301ZM8.00065 4.66634C7.1166 4.66634 6.26875 5.01753 5.64363 5.64265C5.01851 6.26777 4.66732 7.11562 4.66732 7.99967C4.66732 8.88373 5.01851 9.73158 5.64363 10.3567C6.26875 10.9818 7.1166 11.333 8.00065 11.333C8.88471 11.333 9.73255 10.9818 10.3577 10.3567C10.9828 9.73158 11.334 8.88373 11.334 7.99967C11.334 7.11562 10.9828 6.26777 10.3577 5.64265C9.73255 5.01753 8.88471 4.66634 8.00065 4.66634Z" fill="#01003C"/>
            </svg>
        </div>
    </div>

    <!-- Just a quick notice to the user that it can be interacted with -->
    <span class="drag-notice" id="js-drag-notice">Drag to rotate 360&#176;</span>

    <canvas id="c"></canvas>
    <div class="controls">

    <!-- This tray will be filled with colors via JS, and the ability to slide this panel will be added in with a lightweight slider script (no dependency used for this) -->
    <div id="js-tray" class="tray">
        <div id="js-tray-slide" class="tray__slide"></div>
    </div>
    
    <!-- The main three.js file -->
    <script src='https://unpkg.com/three@0.127.0/build/three.js'></script>

    <!-- This brings in the ability to load custom 3D objects in the .gltf file format. Blender allows the ability to export to this format out the box -->
    <script src='https://cdn.jsdelivr.net/gh/mrdoob/three.js@r92/examples/js/loaders/GLTFLoader.js'></script>

    <!-- This is a simple to use extension for three.js that activates all the rotating, dragging and zooming controls we need for both mouse and touch, there isn't a clear CDN for this that I can find -->
    <script src='https://threejs.org/examples/js/controls/OrbitControls.js'></script>
    <script src="js/editor.js"></script>
</body>
</html>
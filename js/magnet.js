if (!window.magnetMouseInstance) {
    window.magnetMouseInstance = new MagnetMouse({
        magnet: {
            element: '.magnet',
            class: 'magnet-mouse-active',
            enabled: true, /* Enables the magnet effect */
            distance: 14, /* Keep activation tight so it only triggers near the element */
            position: 'center' /* Position of mouse relative to the element when magnet effect is active */
            },
        follow: {
            element: '.follow',
            class: 'follow-mouse-active'
            }
        });
    
    window.magnetMouseInstance.init();
}

const magnetfunction = window.magnetMouseInstance;

// Reinitialize magnet for dynamically loaded elements
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        magnetfunction.init();
    }, 100);
});
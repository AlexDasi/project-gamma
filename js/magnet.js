const canUseMagnet =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (canUseMagnet && typeof window.MagnetMouse === 'function' && !window.magnetMouseInstance) {
    window.magnetMouseInstance = new MagnetMouse({
        magnet: {
            element: '.magnet',
            class: 'magnet-mouse-active',
            enabled: true, /* Enables the magnet effect */
            distance: 28, /* Stronger magnet range so desktop CTA and arrow visibly follow cursor */
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
    if (!magnetfunction || typeof magnetfunction.init !== 'function') return;

    setTimeout(() => {
        magnetfunction.init();
    }, 100);
});
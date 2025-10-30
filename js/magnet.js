let magnetfunction = new MagnetMouse({
    magnet: {
        element: '.magnet',
        class: 'magnet-mouse-active',
        enabled: true, /* Enables the magnet effect */
        distance: 40, /* Distance (in px) when the magnet effect around element activates */
        position: 'center' /* Position of mouse relative to the element when magnet effect is active */
        },
    follow: {
        element: '.follow',
        class: 'follow-mouse-active'
        }
    });
    
    magnetfunction.init();
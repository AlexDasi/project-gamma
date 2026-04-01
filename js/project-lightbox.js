(function () {
    'use strict';

    var page = document.querySelector('.project-page');
    if (!page) {
        return;
    }

    var imageNodes = Array.prototype.slice.call(
        page.querySelectorAll('.project-content img, .project-header__image img')
    ).filter(function (img) {
        return img.closest('a') === null;
    });

    if (!imageNodes.length) {
        return;
    }

    var style = document.createElement('style');
    style.textContent = [
        '.project-lightbox{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.9);padding:2rem;}',
        '.project-lightbox.is-open{display:flex;}',
        '.project-lightbox__frame{position:relative;max-width:min(96vw,1400px);max-height:94vh;display:flex;align-items:center;justify-content:center;}',
        '.project-lightbox__image{max-width:100%;max-height:94vh;object-fit:contain;display:block;box-shadow:0 20px 70px rgba(0,0,0,.45);}',
        '.project-lightbox__button{position:absolute;top:50%;transform:translateY(-50%);border:0;background:rgba(0,0,0,.5);color:#fff;width:48px;height:48px;font-size:30px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
        '.project-lightbox__button:hover{background:rgba(0,0,0,.7);}',
        '.project-lightbox__button--prev{left:-64px;}',
        '.project-lightbox__button--next{right:-64px;}',
        '.project-lightbox__close{position:fixed;top:24px;right:24px;border:0;background:rgba(0,0,0,.65);color:#fff;width:48px;height:48px;font-size:28px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;}',
        '@media (max-width: 900px){.project-lightbox{padding:1rem;}.project-lightbox__button--prev{left:8px;}.project-lightbox__button--next{right:8px;}.project-lightbox__button{top:auto;bottom:20px;transform:none;}.project-lightbox__close{top:12px;right:12px;}}'
    ].join('');
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'project-lightbox';
    overlay.setAttribute('aria-hidden', 'true');

    var frame = document.createElement('div');
    frame.className = 'project-lightbox__frame';

    var image = document.createElement('img');
    image.className = 'project-lightbox__image';
    image.alt = '';

    var prevButton = document.createElement('button');
    prevButton.type = 'button';
    prevButton.className = 'project-lightbox__button project-lightbox__button--prev';
    prevButton.setAttribute('aria-label', 'Previous image');
    prevButton.textContent = '\u2039';

    var nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'project-lightbox__button project-lightbox__button--next';
    nextButton.setAttribute('aria-label', 'Next image');
    nextButton.textContent = '\u203A';

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'project-lightbox__close';
    closeButton.setAttribute('aria-label', 'Close image viewer');
    closeButton.textContent = '\u00D7';

    frame.appendChild(prevButton);
    frame.appendChild(image);
    frame.appendChild(nextButton);
    overlay.appendChild(frame);
    overlay.appendChild(closeButton);
    document.body.appendChild(overlay);

    var currentIndex = 0;

    function render(index) {
        var selected = imageNodes[index];
        if (!selected) {
            return;
        }

        var fullSrc = selected.currentSrc || selected.getAttribute('src');
        image.src = fullSrc;
        image.alt = selected.alt || '';
        currentIndex = index;
    }

    function open(index) {
        render(index);
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function next() {
        var target = (currentIndex + 1) % imageNodes.length;
        render(target);
    }

    function prev() {
        var target = (currentIndex - 1 + imageNodes.length) % imageNodes.length;
        render(target);
    }

    imageNodes.forEach(function (img, index) {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function () {
            open(index);
        });
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            close();
        }
    });

    closeButton.addEventListener('click', close);
    nextButton.addEventListener('click', next);
    prevButton.addEventListener('click', prev);

    window.addEventListener('keydown', function (event) {
        if (!overlay.classList.contains('is-open')) {
            return;
        }

        if (event.key === 'Escape') {
            close();
        } else if (event.key === 'ArrowRight') {
            next();
        } else if (event.key === 'ArrowLeft') {
            prev();
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('ul');
    let isScrolling = false;
    let startY;
    let startScrollLeft;

    function smoothScroll(targetScrollLeft) {
        const startScrollLeft = container.scrollLeft;
        const distance = targetScrollLeft - startScrollLeft;
        const duration = 300; // milliseconds
        let start;

        function step(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            container.scrollLeft = startScrollLeft + distance * easeInOutCubic(progress);

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }

    container.addEventListener('wheel', function(e) {
        e.preventDefault();
        const scrollAmount = e.deltaY || e.deltaX;
        smoothScroll(container.scrollLeft + scrollAmount);
    }, { passive: false });

    container.addEventListener('touchstart', function(e) {
        isScrolling = true;
        startY = e.touches[0].pageY;
        startScrollLeft = container.scrollLeft;
    }, { passive: false });

    container.addEventListener('touchmove', function(e) {
        if (!isScrolling) return;
        
        e.preventDefault();
        const touchDeltaY = startY - e.touches[0].pageY;
        smoothScroll(startScrollLeft + touchDeltaY);
    }, { passive: false });

    container.addEventListener('touchend', function() {
        isScrolling = false;
    });
});
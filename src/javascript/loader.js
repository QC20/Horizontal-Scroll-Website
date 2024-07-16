// loader.js
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingText = document.querySelector('.loading-screen .loading');

    setTimeout(function() {
        // Fade out the loading text
        loadingText.style.opacity = '0';
        loadingText.style.filter = 'blur(10px)';

        // After the text fades out, fade out the entire loading screen
        setTimeout(function() {
            document.body.classList.add('loaded');
        }, 550); // This should match the transition duration in CSS
    }, 2750);
});
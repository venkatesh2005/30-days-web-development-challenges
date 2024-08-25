document.getElementById('hamburger').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
});

window.addEventListener('load', () => {
    const minLoadingTime = 10000; 
    const startTime = new Date().getTime();
    const hideLoader = () => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
    };
    const elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime < minLoadingTime) {
        setTimeout(hideLoader, minLoadingTime - elapsedTime);
    } else {
        hideLoader();
    }
});


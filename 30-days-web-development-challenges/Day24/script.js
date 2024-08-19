function showToast(type) {
    const toastContainer = document.getElementById('toastContainer');
    const soundMap = {
        success: 'sounds/success.mp3',
        error: 'sounds/error.mp3',
        tap: 'sounds/tap-notification.mp3',
        info: 'sounds/info-bleep.mp3'
    };

    const soundType = {
        success: 'success',
        error: 'error',
        warning: 'info',
        info: 'info',
        loading: 'tap',
        confirmation: 'tap',
        network: 'info'
    }[type] || 'tap';

    const soundUrl = soundMap[soundType];
    if (soundUrl) {
        const audio = new Audio(soundUrl);
        audio.play();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let message = '';
    let icon = '';
    let extraHTML = '';
    let duration = 5000; 

    switch (type) {
        case 'success':
            message = 'Action successful!';
            icon = 'fa-check-circle';
            break;
        case 'error':
            message = 'An error occurred.';
            icon = 'fa-times-circle';
            break;
        case 'warning':
            message = 'Please check your input.';
            icon = 'fa-exclamation-triangle';
            break;
        case 'info':
            message = 'New updates are available.';
            icon = 'fa-info-circle';
            break;
        case 'loading':
            message = 'Please wait, loading...';
            icon = 'fa-spinner fa-spin';
            break;
        case 'confirmation':
            message = 'Do you want to continue?';
            icon = 'fa-question-circle';
            extraHTML = '<button class="confirmation-button">Confirm</button>';
            break;
        case 'network':
            message = 'Network issue detected.';
            icon = 'fa-signal';
            break;
    }
    

    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${icon} toast-icon"></i>
            ${extraHTML}
            <p>${message}</p>
        </div>
        <span class="close-toast" onclick="this.parentElement.remove()">&times;</span>
        <div class="toast-progress">
            <div class="toast-progress-bar"></div>
        </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
        const progressBar = toast.querySelector('.toast-progress-bar');
        if (progressBar) {
            progressBar.style.width = '100%';
        }
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 500);
    }, duration);

    if (type !== 'loading') {
        const progressBar = toast.querySelector('.toast-progress-bar');
        if (progressBar) {
            let progress = 100;
            const interval = setInterval(() => {
                progress -= 1;
                progressBar.style.width = `${progress}%`;
                if (progress <= 0) {
                    clearInterval(interval);
                }
            }, duration / 100);
        }
    }
}

document.querySelectorAll('.button-container button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.className;
        showToast(type);
    });
});

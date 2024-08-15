document.addEventListener('DOMContentLoaded', () => {
    const pieces = document.querySelectorAll('.puzzle-piece');
    const slots = document.querySelectorAll('.target-slot');
    const startButton = document.getElementById('start-button');
    const resetButton = document.getElementById('reset-button');
    const timerDisplay = document.getElementById('timer');
    let startTime, timerInterval;

    pieces.forEach(piece => {
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragend', dragEnd);
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('drop', dropPiece);
    });

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);

    function startGame() {
        resetGame();
        startTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        shufflePieces();
    }

    function resetGame() {
        clearInterval(timerInterval);
        timerDisplay.textContent = 'Time: 00:00';
        pieces.forEach(piece => {
            document.querySelector('.puzzle-board').appendChild(piece);
            piece.classList.remove('hide');
        });
        slots.forEach(slot => slot.innerHTML = '');
        clearConfetti();
        clearPopup();
    }

    function shufflePieces() {
        const shuffledPieces = Array.from(pieces).sort(() => 0.5 - Math.random());
        const board = document.querySelector('.puzzle-board');
        board.innerHTML = '';
        shuffledPieces.forEach(piece => board.appendChild(piece));
    }

    function updateTimer() {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        timerDisplay.textContent = `Time: ${minutes}:${seconds}`;
    }

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        setTimeout(() => {
            event.target.classList.add('hide');
        }, 0);
    }

    function dragEnd(event) {
        event.target.classList.remove('hide');
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function dropPiece(event) {
        event.preventDefault();
        const pieceId = event.dataTransfer.getData('text/plain');
        const piece = document.getElementById(pieceId);
        if (event.target.children.length === 0 && event.target.classList.contains('target-slot')) {
            event.target.appendChild(piece);
        }
        checkCompletion();
    }

    function checkCompletion() {
        const correctOrder = ['piece1', 'piece2', 'piece3', 'piece4', 'piece5', 'piece6', 'piece7', 'piece8', 'piece9'];
        const currentOrder = Array.from(slots).map(slot => slot.firstChild?.id);

        if (JSON.stringify(correctOrder) === JSON.stringify(currentOrder)) {
            clearInterval(timerInterval);
            SuccessAnimation();
            generateConfetti();
            showPopup(); 
        }
    }

    function generateConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.classList.add('confetti-container');
        document.body.appendChild(confettiContainer);

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.backgroundColor = randomColor();
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confetti);
        }
    }

    function clearConfetti() {
        const confettiContainer = document.querySelector('.confetti-container');
        if (confettiContainer) {
            confettiContainer.remove();
        }
    }

    function randomColor() {
        const colors = ['#ff9933', '#ffffff', '#138808', '#ff0000', '#00ff00', '#0000ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function SuccessAnimation() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.classList.add('puzzle-complete');
        setTimeout(() => {
            gameContainer.classList.remove('puzzle-complete');
        }, 1000);
    }

    function showPopup() {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Congratulations!</h2>
                <p>Happy Independence Day!</p>
                <button class="close-popup">Close</button>
            </div>
        `;
        document.body.appendChild(popup);

        document.querySelector('.close-popup').addEventListener('click', clearPopup);
    }

    function clearPopup() {
        const popup = document.querySelector('.popup');
        if (popup) {
            popup.remove();
        }
    }
});

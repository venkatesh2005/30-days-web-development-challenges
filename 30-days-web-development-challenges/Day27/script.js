const boxes = document.querySelectorAll('.box');
const statusTxt = document.querySelector('#status');
const btnRestart = document.querySelector('#restart');
const moveSound = document.getElementById('moveSound');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');
const restartSound = document.getElementById('restartSound');
const modeSelect = document.getElementById('modeSelect');
const xIcon = '<i class="fas fa-times"></i>';
const oIcon = '<i class="fas fa-circle"></i>';
const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = xIcon;
let player = "X";
let gameRunning = false;
let vsComputer = false;

function init() {
    modeSelect.addEventListener('change', handleModeChange);
    boxes.forEach(box => box.addEventListener('click', boxClick));
    btnRestart.addEventListener('click', restartGame);
    setDefaultMode();
}

function setDefaultMode() {
    modeSelect.value = 'player';
    vsComputer = false;
    restartGame();
}

function handleModeChange() {
    vsComputer = modeSelect.value === 'computer';
    restartGame();
}

function boxClick() {
    const index = this.dataset.index;
    if (options[index] || !gameRunning) return;
    updateBox(this, index);
    playSound(moveSound);
    checkWinner();
    if (vsComputer && gameRunning && player === "O") setTimeout(computerMove, 500);
}

function updateBox(box, index) {
    options[index] = player;
    box.innerHTML = currentPlayer;
}

function changePlayer() {
    player = player === 'X' ? "O" : "X";
    currentPlayer = currentPlayer === xIcon ? oIcon : xIcon;
    updateStatus();
}

function checkWinner() {
    let isWon = winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
            highlightWinningBoxes([a, b, c]);
            playSound(winSound);
            statusTxt.textContent = `${player} Won!`;
            gameRunning = false;
            return true;
        }
        return false;
    });

    if (!isWon) {
        if (!options.includes("")) {
            statusTxt.textContent = "It's a Draw!";
            playSound(drawSound);
            gameRunning = false;
        } else {
            changePlayer();
            if (vsComputer && player === "O") setTimeout(computerMove, 500);
        }
    }
}

function highlightWinningBoxes(winningPattern) {
    winningPattern.forEach(index => boxes[index].classList.add('win'));
}

function restartGame() {
    options.fill("");
    currentPlayer = xIcon;
    player = "X";
    gameRunning = true;
    statusTxt.textContent = `${player} Your Turn`;
    boxes.forEach(box => {
        box.innerHTML = "";
        box.classList.remove('win');
    });
    playSound(restartSound);
    if (vsComputer && player === "O") setTimeout(computerMove, 500);
}

function computerMove() {
    if (!vsComputer || !gameRunning || player !== "O") return;

    let bestScore = -Infinity;
    let bestMove;
    let randomFactor = Math.random();

    for (let i = 0; i < options.length; i++) {
        if (!options[i]) {
            options[i] = "O";
            let score = minimax(options, 0, false);
            options[i] = "";
            if (score > bestScore || (randomFactor > 0.8 && randomFactor < 0.9)) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (randomFactor > 0.6) {
        const availableMoves = options.map((opt, idx) => opt === "" ? idx : null).filter(idx => idx !== null);
        bestMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    updateBox(boxes[bestMove], bestMove);
    playSound(moveSound);
    checkWinner();
}

const scores = { X: -1, O: 1, tie: 0 };

function minimax(options, depth, isMaximizing) {
    let result = checkWinnerForMinimax();
    if (result !== null) return scores[result];

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < options.length; i++) {
            if (!options[i]) {
                options[i] = "O";
                let score = minimax(options, depth + 1, false);
                options[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < options.length; i++) {
            if (!options[i]) {
                options[i] = "X";
                let score = minimax(options, depth + 1, true);
                options[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function checkWinnerForMinimax() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) return options[a];
    }
    return options.includes("") ? null : "tie";
}

function updateStatus() {
    statusTxt.textContent = `${player} Your Turn`;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

init();

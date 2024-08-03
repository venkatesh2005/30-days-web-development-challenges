const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreVal');
const gameOverSound = document.getElementById('gameOverSound');
const moveSound = document.getElementById('moveSound');
const foodSound = document.getElementById('foodSound');

const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height; 
const UNIT = 25;

let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = true;
let started = false;
let paused = false;

let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener('keydown', keyPress);
document.getElementById('upBtn').addEventListener('click', () => moveDirection(38));
document.getElementById('downBtn').addEventListener('click', () => moveDirection(40));
document.getElementById('leftBtn').addEventListener('click', () => moveDirection(37));
document.getElementById('rightBtn').addEventListener('click', () => moveDirection(39));
document.getElementById('pauseBtn').addEventListener('click', pauseGame);

startGame();

function fillBackground() {
    let gradient = context.createLinearGradient(0, 0, WIDTH, HEIGHT);
    gradient.addColorStop(0, 'rgb(34, 139, 34)');
    gradient.addColorStop(1, 'rgb(255, 215, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function startGame() {
    fillBackground();
    createFood();
    displayFood();
    drawSnake();
}

function clearBoard() {
    fillBackground();
}

function createFood() {
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT;
}

function displayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function drawSnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
        foodSound.play(); 
    } else {
        snake.pop();
    }
    moveSound.play(); 
}

function nextTick() {
    if (active && !paused) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 200);
    } else if (!active) {
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!", WIDTH / 2, HEIGHT / 2);
        gameOverSound.play(); 
    }
}

function keyPress(event) {
    if (!started) {
        started = true;
        nextTick();
    }
   
    if (event.keyCode === 32) {
        pauseGame();
    } else {
        moveDirection(event.keyCode);
    }
}

function pauseGame() {
    paused = !paused;
    if (!paused && active) {
        nextTick();
    }
}

function moveDirection(keyCode) {
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch (true) {
       
        case (keyCode == LEFT && xVel != UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        
        case (keyCode == RIGHT && xVel != -UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
       
        case (keyCode == UP && yVel != UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        
        case (keyCode == DOWN && yVel != -UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }
}

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= WIDTH):
        case (snake[0].y < 0):
        case (snake[0].y >= HEIGHT):
            active = false;
            break;
    }

    for (let i = 1; i < snake.length; i += 1) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            active = false;
        }
    }
}

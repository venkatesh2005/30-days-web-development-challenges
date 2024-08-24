const paragraphs = [
    "Technology has revolutionized communication. With the internet and mobile devices, people connect instantly worldwide. Social media and messaging apps make staying in touch, sharing updates, and real-time conversations easier, changing how we interact and stay informed.",
    "Artificial intelligence is a key technology advancement. AI systems analyze data, recognize patterns, and make decisions with minimal human input. Virtual assistants like Siri and Alexa, and recommendation algorithms, enhance user experiences and automate tasks, making life more efficient.",
    "Cloud computing has transformed data storage. Instead of physical devices, data is stored securely on remote servers accessed via the internet. This offers scalability, remote access, and collaboration, making cloud services essential for flexible and efficient operations."
];


const typingText = document.getElementById("paragraph");
const inputField = document.querySelector(".input-field");
const tryAgainBtn = document.getElementById("try-again-btn");
const timeLeftElement = document.getElementById("time-left");
const mistakesElement = document.getElementById("mistakes");
const wpmElement = document.getElementById("wpm");

let timer;
let timeLeft = 60;
let mistakes = 0;
let correctCharacters = 0;
let totalTypedCharacters = 0;

function startGame() {
    resetGame();
    typingText.innerHTML = "";
    const text = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    text.split("").forEach(char => {
        const span = document.createElement("span");
        span.innerText = char;
        typingText.appendChild(span);
    });
    timer = setInterval(updateTimer, 1000);
    inputField.focus();
}

function resetGame() {
    clearInterval(timer);
    timeLeft = 60;
    mistakes = 0;
    correctCharacters = 0;
    totalTypedCharacters = 0;
    inputField.value = "";
    timeLeftElement.innerText = `${timeLeft}s`;
    mistakesElement.innerText = mistakes;
    wpmElement.innerText = 0;
    inputField.disabled = false;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftElement.innerText = `${timeLeft}s`;
    } else {
        clearInterval(timer);
        inputField.disabled = true;
        calculateWPM();
    }
}

function calculateWPM() {
    const elapsedMinutes = (60 - timeLeft) / 60;
    const wpm = Math.round((totalTypedCharacters / 5) / elapsedMinutes); 
    wpmElement.innerText = wpm;
}

inputField.addEventListener("input", () => {
    const chars = typingText.querySelectorAll("span");
    const inputChars = inputField.value.split("");

    correctCharacters = 0;  
    mistakes = 0;  
    totalTypedCharacters = inputChars.length;  

    chars.forEach((char, index) => {
        if (inputChars[index] === char.innerText) {
            char.style.color = "#00FF00"; 
            correctCharacters++;
        } else {
            if (inputChars[index] != null) {
                char.style.color = "#ca4754"; 
                mistakes++;
            } else {
                char.style.color = "#a3a3a3";
            }
        }
    });
    

    mistakesElement.innerText = mistakes;

    calculateWPM();

    if (inputChars.length === chars.length) {
        clearInterval(timer);
        inputField.disabled = true;
    }
});

tryAgainBtn.addEventListener("click", startGame);

window.onload = startGame;

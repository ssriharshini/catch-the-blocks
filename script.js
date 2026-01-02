let score = 0;
let missed = 0;
let gameInterval;
let isGameActive = false;

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const scoreBoard = document.getElementById("scoreBoard");
const grid = document.getElementById("grid");
const finalScore = document.getElementById("finalScore");

const rows = 4;
const cols = 5;
let blocks = [];

function createGrid() {
    grid.innerHTML = "";
    blocks = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let block = document.createElement("div");
            block.classList.add("block");

            block.addEventListener("click", () => {
                if (block.classList.contains("active") && isGameActive) {
                    score += 10;
                    block.classList.remove("active");
                    updateScore();
                }
            });

            grid.appendChild(block);
            blocks.push(block);
        }
    }
}

function startGame() {
    score = 0;
    missed = 0;
    isGameActive = true;

    startScreen.classList.add("hidden");
    gameOverScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    createGrid();
    updateScore();

    gameInterval = setInterval(gameLoop, 1000);
}

function gameLoop() {
    blocks.forEach(block => block.classList.remove("active"));

    let randomIndex = Math.floor(Math.random() * blocks.length);
    blocks[randomIndex].classList.add("active");

    missed++;

    if (missed >= 5) {
        endGame();
    }

    updateScore();
}

function updateScore() {
    scoreBoard.textContent = `Score: ${score} | Missed: ${missed}`;
}

function endGame() {
    clearInterval(gameInterval);
    isGameActive = false;

    gameScreen.classList.add("hidden");
    gameOverScreen.classList.remove("hidden");
    finalScore.textContent = `Your Final Score: ${score}`;
}

document.getElementById("startBtn").addEventListener("click", startGame);
document.getElementById("restartBtn").addEventListener("click", startGame);

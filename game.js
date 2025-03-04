const ball = document.getElementById("ball");
const scoreDisplay = document.getElementById("score");
let score = 0;

function moveBall() {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
    
    score++;
    scoreDisplay.textContent = score;
}

ball.addEventListener("click", moveBall);
moveBall(); // Move to an initial random position

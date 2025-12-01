const ball = document.getElementById("ball");
const scoreSpan = document.getElementById("score");
const gameContainer = document.querySelector(".game-container");

let score = 0;

function moveBall() {
    const containerWidth = gameContainer.clientWidth;
    const containerHeight = gameContainer.clientHeight;
    const ballSize = ball.offsetWidth;

    const maxX = containerWidth - ballSize;
    const maxY = containerHeight - ballSize;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    ball.style.left = `${randomX}px`;
    ball.style.top = `${randomY}px`;
}

ball.addEventListener("click", () => {
    score++;
    scoreSpan.textContent = score;
    moveBall();
});

moveBall();

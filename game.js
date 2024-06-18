const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0;

function drawBall(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

function randomPosition() {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    return { x, y };
}

let ballPosition = randomPosition();
drawBall(ballPosition.x, ballPosition.y);

canvas.addEventListener('click', handleClick);

function handleClick(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const distance = Math.sqrt((mouseX - ballPosition.x) ** 2 + (mouseY - ballPosition.y) ** 2);

    if (distance < 20) {
        // Clicked on the ball
        score++;
        document.title = `Score: ${score}`;
        document.getElementById("scoreCounter").innerHTML = `Score: ${score}`;
        ballPosition = randomPosition();
        drawBall(ballPosition.x, ballPosition.y);
        const coinSound = document.getElementById('coinSound');
                coinSound.currentTime = 0;
                    coinSound.play();
    }
}

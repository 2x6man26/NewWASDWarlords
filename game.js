document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const scoreCounter = document.getElementById('scoreCounter');
    const coinSound = document.getElementById('coinSound');
    const zeldaSound = document.getElementById('zeldaSound');
    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    const aButton = document.getElementById('aButton');
    const bButton = document.getElementById('bButton');

    let score = 0;
    let ballPosition = randomPosition();
    let konamiCodeEntered = false;

    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiCodeIndex = 0;

    function drawBall(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
    }

    function randomPosition() {
        const radius = 20;
        const x = Math.random() * (canvas.width - 2 * radius) + radius;
        const y = Math.random() * (canvas.height - 2 * radius) + radius;
        return { x, y };
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        const distance = Math.sqrt((mouseX - ballPosition.x) ** 2 + (mouseY - ballPosition.y) ** 2);

        if (distance < 20) {
            score++;
            scoreCounter.textContent = `Score: ${score}`;
            
            ballPosition = randomPosition();
            drawBall(ballPosition.x, ballPosition.y);
            
            coinSound.currentTime = 0;
            coinSound.play();
        }
    }

    function moveBall(direction) {
        if (!konamiCodeEntered) return;

        const step = 10;
        if (direction === 'up') ballPosition.y -= step;
        if (direction === 'down') ballPosition.y += step;
        if (direction === 'left') ballPosition.x -= step;
        if (direction === 'right') ballPosition.x += step;

        ballPosition = keepBallWithinBounds(ballPosition.x, ballPosition.y);
        drawBall(ballPosition.x, ballPosition.y);
    }

    function keepBallWithinBounds(x, y) {
        const radius = 20;
        if (x < radius) x = radius;
        if (x > canvas.width - radius) x = canvas.width - radius;
        if (y < radius) y = radius;
        if (y > canvas.height - radius) y = canvas.height - radius;
        return { x, y };
    }

    function handleKonamiCode(event) {
        if (event.code === konamiCode[konamiCodeIndex]) {
            konamiCodeIndex++;
            if (konamiCodeIndex === konamiCode.length) {
                konamiCodeEntered = true;
                konamiCodeIndex = 0;
                zeldaSound.currentTime = 0;
                zeldaSound.play();
            }
        } else {
            konamiCodeIndex = 0;
        }
    }

    // Event listeners
    canvas.addEventListener('click', handleClick);
    upButton.addEventListener('click', () => moveBall('up'));
    downButton.addEventListener('click', () => moveBall('down'));
    leftButton.addEventListener('click', () => moveBall('left'));
    rightButton.addEventListener('click', () => moveBall('right'));
    document.addEventListener('keydown', handleKonamiCode);

    // Initialize the game
    drawBall(ballPosition.x, ballPosition.y);
});

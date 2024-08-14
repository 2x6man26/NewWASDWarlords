document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const fullscreenButton = document.getElementById('fullscreenButton');
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
    let originalWidth = canvas.width;
    let originalHeight = canvas.height;
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
        const x = Math.random() * (canvas.width - 40) + 20;
        const y = Math.random() * (canvas.height - 40) + 20;
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

    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            originalWidth = canvas.width;
            originalHeight = canvas.height;
            
            canvas.requestFullscreen().then(() => {
                resizeCanvas(true);
            });
        }
    }

    function resizeCanvas(fullscreen) {
        if (fullscreen) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = originalWidth;
            canvas.height = originalHeight;
        }
        
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

    function moveBall(direction) {
        if (!konamiCodeEntered) return;

        const step = 10;
        switch (direction) {
            case 'up':
                ballPosition.y -= step;
                break;
            case 'down':
                ballPosition.y += step;
                break;
            case 'left':
                ballPosition.x -= step;
                break;
            case 'right':
                ballPosition.x += step;
                break;
            case 'a':
                // Define action for A button here
                break;
            case 'b':
                // Define action for B button here
                break;
        }
        ballPosition = keepBallWithinBounds(ballPosition.x, ballPosition.y);
        drawBall(ballPosition.x, ballPosition.y);
    }

    function handleKonamiCode(event) {
        if (event.code === konamiCode[konamiCodeIndex]) {
            konamiCodeIndex++;
            if (konamiCodeIndex === konamiCode.length) {
                konamiCodeEntered = true;
                konamiCodeIndex = 0; // Reset for future use
                zeldaSound.currentTime = 0;
                zeldaSound.play();
            }
        } else {
            konamiCodeIndex = 0; // Reset if the sequence is broken
        }
    }

    // Event listeners
    canvas.addEventListener('click', handleClick);
    upButton.addEventListener('click', () => konamiCodeEntered ? moveBall('up') : handleKonamiCode({ code: 'ArrowUp' }));
    downButton.addEventListener('click', () => konamiCodeEntered ? moveBall('down') : handleKonamiCode({ code: 'ArrowDown' }));
    leftButton.addEventListener('click', () => konamiCodeEntered ? moveBall('left') : handleKonamiCode({ code: 'ArrowLeft' }));
    rightButton.addEventListener('click', () => konamiCodeEntered ? moveBall('right') : handleKonamiCode({ code: 'ArrowRight' }));
    aButton.addEventListener('click', () => konamiCodeEntered ? moveBall('a') : handleKonamiCode({ code: 'KeyA' }));
    bButton.addEventListener('click', () => konamiCodeEntered ? moveBall('b') : handleKonamiCode({ code: 'KeyB' }));
    document.addEventListener('keydown', handleKonamiCode);

    // Initialize the game
    drawBall(ballPosition.x, ballPosition.y);
});

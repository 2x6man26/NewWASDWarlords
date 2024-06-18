// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Initialize variables
let score = 0;
let ballPosition = randomPosition(); // Initial ball position
let originalWidth = canvas.width;
let originalHeight = canvas.height;

// Function to draw the ball at given coordinates (x, y)
function drawBall(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
}

// Function to generate a random position within the canvas boundaries
function randomPosition() {
    const x = Math.random() * (canvas.width - 40) + 20;
    const y = Math.random() * (canvas.height - 40) + 20;
    return { x, y };
}

// Initial drawing of the ball
drawBall(ballPosition.x, ballPosition.y);

// Function to handle click events on the canvas
canvas.addEventListener('click', handleClick);

function handleClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const distance = Math.sqrt((mouseX - ballPosition.x) ** 2 + (mouseY - ballPosition.y) ** 2);

    if (distance < 20) {
        // Clicked on the ball
        score++;
        document.title = `Score: ${score}`;
        document.getElementById("scoreCounter").innerHTML = `Score: ${score}`;
        
        // Update ball position and redraw
        ballPosition = randomPosition();
        drawBall(ballPosition.x, ballPosition.y);
        
        // Play sound
        const coinSound = document.getElementById('coinSound');
        coinSound.currentTime = 0;
        coinSound.play();
    }
}

// Function to handle fullscreen toggle
function toggleFullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        // Store the original dimensions before entering fullscreen
        originalWidth = canvas.width;
        originalHeight = canvas.height;
        
        canvas.requestFullscreen().then(() => {
            resizeCanvas(true); // Resize for fullscreen
        });
    }
}

// Function to resize the canvas
function resizeCanvas(fullscreen) {
    if (fullscreen) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    } else {
        canvas.width = originalWidth;
        canvas.height = originalHeight;
    }

    // Adjust ball position to be within the new canvas size
    ballPosition = keepBallWithinBounds(ballPosition.x, ballPosition.y);
    drawBall(ballPosition.x, ballPosition.y); // Redraw ball at new size
}

// Function to ensure the ball stays within canvas boundaries
function keepBallWithinBounds(x, y) {
    const radius = 20;
    if (x < radius) x = radius;
    if (x > canvas.width - radius) x = canvas.width - radius;
    if (y < radius) y = radius;
    if (y > canvas.height - radius) y = canvas.height - radius;
    return { x, y };
}

// Event listener for fullscreen change
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        resizeCanvas(false); // Restore original size
    }
});

// Initialize the game and fullscreen functionality
function initializeGame() {
    // Add event listener to toggle fullscreen on button click
    const fullscreenButton = document.getElementById('fullscreenButton');
    fullscreenButton.addEventListener('click', toggleFullscreen);
    
    // Resize the canvas when the window is resized
    window.addEventListener('resize', () => {
        if (document.fullscreenElement) {
            resizeCanvas(true);
        }
    });
}

// Run game initialization when DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeGame);

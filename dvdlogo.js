document.addEventListener('DOMContentLoaded', () => {
    const dvdLogo = document.getElementById('dvdLogo');
    const container = document.getElementById('dvdLogoContainer');
    let posX = 0;
    let posY = 0;
    let speedX = 3; // Adjust the speed as needed
    let speedY = 3;

    function moveLogo() {
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const logoWidth = dvdLogo.clientWidth;
        const logoHeight = dvdLogo.clientHeight;

        posX += speedX;
        posY += speedY;

        if (posX + logoWidth >= containerWidth || posX <= 0) {
            speedX = -speedX;
        }
        if (posY + logoHeight >= containerHeight || posY <= 0) {
            speedY = -speedY;
        }

        dvdLogo.style.left = posX + 'px';
        dvdLogo.style.top = posY + 'px';

        requestAnimationFrame(moveLogo);
    }

    moveLogo();
});

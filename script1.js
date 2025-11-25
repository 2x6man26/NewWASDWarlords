/* ===================== MOBILE NAVIGATION ===================== */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav");

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("nav-open");
        nav.classList.toggle("nav-closed");
    });
}


// Apply a random tilt and fade-in to all albums
document.querySelectorAll('.album').forEach((album, index) => {
    // Random angle between -5 and 5 degrees
    const angle = Math.random() * 10 - 5; 
    album.style.transform = `rotate(${angle}deg)`;

    // Add fade-in animation with stagger
    album.style.animationDelay = `${index * 0.1}s`;
    album.classList.add('fade-in');
});
/* ===================== DYNAMIC PHOTOS ===================== */
const photoFolder = "Assets/Photography/"; // folder with your photos
const photoCount = 30; // total number of photos in the folder
const track = document.querySelector('.carousel-track');

for (let i = 1; i <= photoCount; i++) {
    const div = document.createElement('div');
    div.classList.add('carousel-item');

    const img = document.createElement('img');
    img.src = `${photoFolder}photo${i}.jpg`; // make sure file names match
    img.alt = `Photo ${i}`;
    img.onclick = () => openLightbox(img);

    div.appendChild(img);
    track.appendChild(div);
}

/* ===================== LIGHTBOX ===================== */
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

/* ===================== CAROUSEL ===================== */
const items = Array.from(track.children);
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

let currentIndex = 0;

function updateCarousel() {
    const gap = 16; 
    const trackWidth = track.getBoundingClientRect().width;
    const itemWidth = items[0].getBoundingClientRect().width + gap;
    let maxIndex = items.length - Math.floor(trackWidth / itemWidth);
    if (maxIndex < 0) maxIndex = 0;

    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

leftBtn.addEventListener('click', () => {
    if (currentIndex > 0) currentIndex--;
    updateCarousel();
});

rightBtn.addEventListener('click', () => {
    const trackWidth = track.getBoundingClientRect().width;
    const itemWidth = items[0].getBoundingClientRect().width + 16;
    let maxIndex = items.length - Math.floor(trackWidth / itemWidth);
    if (maxIndex < 0) maxIndex = 0;

    if (currentIndex < maxIndex) currentIndex++;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);

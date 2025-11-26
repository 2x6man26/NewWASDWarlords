/* ===================== MOBILE NAVIGATION (robust DOM-ready version) ===================== */
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");
    const overlay = document.getElementById("navOverlay");

    if (navToggle && nav) {
        navToggle.addEventListener("click", () => {
            nav.classList.toggle("nav-open");
            nav.classList.toggle("nav-closed");
            navToggle.classList.toggle("nav-open-btn");
            if (overlay) overlay.classList.toggle("active");
        });
    }

    if (overlay) {
        overlay.addEventListener("click", () => {
            if (nav) {
                nav.classList.remove("nav-open");
                nav.classList.add("nav-closed");
            }
            if (navToggle) navToggle.classList.remove("nav-open-btn");
            overlay.classList.remove("active");
        });
    }

    // Optional: close drawer when clicking any nav link (mobile UX)
    document.querySelectorAll('nav ul li a').forEach(a => {
        a.addEventListener('click', () => {
            if (window.innerWidth <= 850) { // only collapse on small screens
                if (nav) {
                    nav.classList.remove('nav-open');
                    nav.classList.add('nav-closed');
                }
                if (navToggle) navToggle.classList.remove('nav-open-btn');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });

    /* ===================== RANDOM PHOTO ALBUM TILT / FADE ===================== */
    document.querySelectorAll('.album').forEach((album, index) => {
        const angle = Math.random() * 10 - 5; 
        album.style.transform = `rotate(${angle}deg)`;
        album.style.animationDelay = `${index * 0.1}s`;
        album.classList.add('fade-in');
    });

    /* ===================== DYNAMIC PHOTOS ===================== */
    const photoFolder = "Assets/Photography/";
    const photoCount = 30;
    const track = document.querySelector('.carousel-track');

    if (track) {
        // clear any existing placeholders if needed
        for (let i = 1; i <= photoCount; i++) {
            const div = document.createElement('div');
            div.classList.add('carousel-item');

            const img = document.createElement('img');
            img.src = `${photoFolder}photo${i}.jpg`;
            img.alt = `Photo ${i}`;
            img.addEventListener('click', () => openLightbox(img));

            div.appendChild(img);
            track.appendChild(div);
        }
    }

   /* ===================== LIGHTBOX ===================== */
function openLightbox(img) {
    if (window.innerWidth <= 768) return; // disable on mobile

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Optional: close lightbox when clicking outside image
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    lightbox.addEventListener('click', closeLightbox);
}

    /* ===================== CAROUSEL ===================== */
    const carouselTrack = document.querySelector('.carousel-track');
    let items = [];
    if (carouselTrack) items = Array.from(carouselTrack.children);
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    let currentIndex = 0;

    function updateCarousel() {
        if (!carouselTrack || items.length === 0) return;
        const gap = 16;
        const trackWidth = carouselTrack.getBoundingClientRect().width;
        const itemWidth = items[0].getBoundingClientRect().width + gap;
        let maxIndex = items.length - Math.floor(trackWidth / itemWidth);
        if (maxIndex < 0) maxIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    if (leftBtn) {
        leftBtn.addEventListener('click', () => {
            if (currentIndex > 0) currentIndex--;
            updateCarousel();
        });
    }
    if (rightBtn) {
        rightBtn.addEventListener('click', () => {
            if (!carouselTrack || items.length === 0) return;
            const gap = 16;
            const trackWidth = carouselTrack.getBoundingClientRect().width;
            const itemWidth = items[0].getBoundingClientRect().width + gap;
            let maxIndex = items.length - Math.floor(trackWidth / itemWidth);
            if (maxIndex < 0) maxIndex = 0;
            if (currentIndex < maxIndex) currentIndex++;
            updateCarousel();
        });
    }

    window.addEventListener('resize', updateCarousel);

    // initial layout
    updateCarousel();
});

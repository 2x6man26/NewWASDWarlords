// script.js
function playRandomAudio() {
    // Select all audio elements
    const audios = document.querySelectorAll('audio');
    
    // Stop any currently playing audio
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0; // Reset to the start
    });

    // Get a random index
    const randomIndex = Math.floor(Math.random() * audios.length);

    // Play the random audio
    audios[randomIndex].play();
}

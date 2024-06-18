function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

document.addEventListener("DOMContentLoaded", function() {
    if (isMobileDevice()) {
        alert("This site is best viewed on a desktop. Please switch to a desktop device for the best experience.");
    }
});

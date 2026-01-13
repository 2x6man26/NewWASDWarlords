// popup.js
window.addEventListener("load", () => {
  if (!localStorage.getItem("popupSeen")) {
    setTimeout(() => {
      document.getElementById("sitePopup").classList.add("show");
    }, 800);
  }
});

function closePopup() {
  document.getElementById("sitePopup").classList.remove("show");
  localStorage.setItem("popupSeen", "true");
}

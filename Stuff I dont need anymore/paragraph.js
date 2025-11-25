// Select all clickable text elements
const clickableTexts = document.querySelectorAll('.clickable-text');

// Loop through each clickable element and attach an event listener
clickableTexts.forEach(clickableText => {
  clickableText.addEventListener('click', () => {
    // Assuming the paragraph is the next sibling element
    const paragraph = clickableText.nextElementSibling;
    if (paragraph) {
      paragraph.classList.toggle('expanded');
    }
  });
});

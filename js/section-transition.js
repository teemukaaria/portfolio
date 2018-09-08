// require ./pulse.js

function applySmoothAnimation(section) {
  section.classList.add('circle-section--animating');
  setTimeout(() => {
    section.classList.remove('circle-section--animating');
  }, 1000);
}

function closeTeemu() {
  stopPulse();
  const section = document.getElementById('section-teemu');
  section.classList.add('circle-section--blurred');
  applySmoothAnimation(section);
  section.href = "#";
}
function openTeemu() {
  const section = document.getElementById('section-teemu');
  section.classList.remove('circle-section--blurred', 'circle-section--hidden');
  applySmoothAnimation(section);
  section.href = "#teemu";
  startPulse();
}

function checkState() {
  switch (window.location.hash) {
    case '#teemu':
      closeTeemu();
      break;
    default:
      openTeemu();
      break;
  }
}

window.addEventListener("hashchange", () => {
  checkState();
});
window.addEventListener("load", () => {
  openTeemu();
  checkState();
})
let teemuPulseInterval = undefined;

function startPulse() {
  if (teemuPulseInterval !== undefined) return;
  teemuPulseInterval = setInterval(() => {
      const section = document.getElementsByClassName('circle-section')[0];
      section.classList.add('circle-section--pulsing');
      setTimeout(() => {
        section.classList.remove('circle-section--pulsing');
      }, 650);
    }, 4000);
}

function stopPulse() {
  clearInterval(teemuPulseInterval);
  teemuPulseInterval = undefined;
}

window.addEventListener("load", () => {
  startPulse();
});
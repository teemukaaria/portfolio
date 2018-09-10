let teemuPulseInterval = undefined;

function startPulse() {
  if (teemuPulseInterval !== undefined) return;
  teemuPulseInterval = setInterval(() => {
      const section = document.getElementById('section-teemu').getElementsByClassName('section__primary-button')[0];
      section.classList.add('pulsing');
      setTimeout(() => {
        section.classList.remove('pulsing');
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
'use strict';

var teemuPulseInterval = undefined;

function startPulse() {
    if (teemuPulseInterval !== undefined) return;
    teemuPulseInterval = setInterval(function () {
        var section = document.getElementsByClassName('circle-section')[0];
        section.classList.add('circle-section--pulsing');
        setTimeout(function () {
            section.classList.remove('circle-section--pulsing');
        }, 650);
    }, 4000);
}

function stopPulse() {
    clearInterval(teemuPulseInterval);
    teemuPulseInterval = undefined;
}
window.addEventListener("load", function () {
    startPulse();
});

function applySmoothAnimation(section) {
    section.classList.add('circle-section--animating');
    setTimeout(function () {
        section.classList.remove('circle-section--animating');
    }, 1000);
}

function closeTeemu() {
    stopPulse();
    var section = document.getElementById('section-teemu');
    section.classList.add('circle-section--blurred');
    applySmoothAnimation(section);
    section.href = "#";
}

function openTeemu() {
    var section = document.getElementById('section-teemu');
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
window.addEventListener("hashchange", function () {
    checkState();
});
window.addEventListener("load", function () {
    openTeemu();
    checkState();
});

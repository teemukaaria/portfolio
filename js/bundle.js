let teemuPulseInterval = undefined;

function startPulse() {
    if (teemuPulseInterval !== undefined) return;
    teemuPulseInterval = setInterval(() => {
        const section = document.getElementsByClassName('circle-section')[0];
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

function applySmoothAnimation(element) {
    element.classList.add('animating');
    setTimeout(() => {
        element.classList.remove('animating');
    }, 1000);
}

function open(element) {
    element.classList.remove('hidden', 'blurred');
    applySmoothAnimation(element);
}

function hide(element) {
    element.classList.add('hidden');
    applySmoothAnimation(element);
}

function blur(element) {
    element.classList.add('blurred');
    applySmoothAnimation(element);
}

function openPrimaryButtons(section) {
    const primaryButton = section.getElementsByClassName('section__primary-button');
    for (let i = 0; i < primaryButton.length; i++) open(primaryButton[i]);
}

function hidePrimaryButtons(section) {
    const primaryButton = section.getElementsByClassName('section__primary-button');
    for (let i = 0; i < primaryButton.length; i++) hide(primaryButton[i]);
}

function blurPrimaryButtons(section) {
    const primaryButton = section.getElementsByClassName('section__primary-button');
    for (let i = 0; i < primaryButton.length; i++) blur(primaryButton[i]);
}

function openSection(section) {
    let sectionElem;
    if (typeof section === "string") sectionElem = document.getElementById(section);
    else sectionElem = section;
    open(sectionElem);
    openPrimaryButtons(sectionElem);
}

function hideSection(section) {
    let sectionElem;
    if (typeof section === "string") sectionElem = document.getElementById(section);
    else sectionElem = section;
    hide(sectionElem);
    hidePrimaryButtons(sectionElem);
}

function closeTeemu() {
    stopPulse();
    const section = document.getElementById('section-teemu');
    blur(section);
    blurPrimaryButtons(section);
    section.firstElementChild.href = "#";
}

function openTeemu() {
    const section = document.getElementById('section-teemu');
    open(section);
    openPrimaryButtons(section);
    section.firstElementChild.href = "#teemu";
    startPulse();
}

function closeSecondary() {
    hideSection('section-projects');
    hideSection('section-resume');
    hideSection('section-techs');
}

function openSecondary() {
    openSection('section-projects');
    openSection('section-resume');
    openSection('section-techs');
}

function checkState() {
    switch (window.location.hash) {
        case '#teemu':
            closeTeemu();
            openSecondary();
            break;
        default:
            openTeemu();
            closeSecondary();
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

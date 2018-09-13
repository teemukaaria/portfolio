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

function applySmoothAnimation(element) {
    element.classList.add('animating');
    setTimeout(() => {
        element.classList.remove('animating');
    }, 1000);
}

function getSectionElement(section) {
    if (typeof section === "string") return document.getElementById(section);
    return section;
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

function openSecondaryItems(section) {
    const items = section.getElementsByClassName('section__secondary-item');
    for (let i = 0; i < items.length; i++) open(items[i]);
}

function hideSecondaryItems(section) {
    const items = section.getElementsByClassName('section__secondary-item');
    for (let i = 0; i < items.length; i++) hide(items[i]);
}

function peekSection(section) {
    const sectionElem = getSectionElement(section);
    open(sectionElem);
    openPrimaryButtons(sectionElem);
    hideSecondaryItems(sectionElem);
}

function hideSection(section) {
    const sectionElem = getSectionElement(section);
    hide(sectionElem);
    hidePrimaryButtons(sectionElem);
    hideSecondaryItems(sectionElem);
}

function openSection(section) {
    const sectionElem = getSectionElement(section);
    blurPrimaryButtons(sectionElem);
    openSecondaryItems(sectionElem);
}

function hideSections() {
    hideSection('section-projects');
    hideSection('section-resume');
    hideSection('section-techs');
    hideSection('section-contacts');
}

function peekSections() {
    peekSection('section-projects');
    peekSection('section-resume');
    peekSection('section-techs');
    peekSection('section-contacts');
}

function blurHeader() {
    stopPulse();
    const section = document.getElementById('section-teemu');
    blur(section);
    blurPrimaryButtons(section);
    peekSections();
    section.firstElementChild.href = "#";
}

function openHeader() {
    const section = document.getElementById('section-teemu');
    open(section);
    openPrimaryButtons(section);
    hideSections();
    section.firstElementChild.href = "#teemu";
    startPulse();
}
const openSections = {
    teemu: false,
    techs: false,
    contacts: false,
    projects: false
}

function drawOpenSections() {
    if (!openSections.teemu) {
        openHeader();
        hideSections();
    } else {
        blurHeader();
        if (openSections.techs) openSection('section-techs');
        if (openSections.contacts) openSection('section-contacts');
        if (openSections.projects) openSection('section-projects');
    }
}

function toggleSection(name) {
    if (openSections[name] !== undefined) {
        openSections[name] = !openSections[name];
    }
    drawOpenSections();
}
window.addEventListener("load", () => {
    openHeader();
})

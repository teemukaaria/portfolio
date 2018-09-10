'use strict';

var teemuPulseInterval = undefined;

function startPulse() {
    if (teemuPulseInterval !== undefined) return;
    teemuPulseInterval = setInterval(function () {
        var section = document.getElementById('section-teemu').getElementsByClassName('section__primary-button')[0];
        section.classList.add('pulsing');
        setTimeout(function () {
            section.classList.remove('pulsing');
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

function applySmoothAnimation(element) {
    element.classList.add('animating');
    setTimeout(function () {
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
    var primaryButton = section.getElementsByClassName('section__primary-button');
    for (var i = 0; i < primaryButton.length; i++) {
        open(primaryButton[i]);
    }
}

function hidePrimaryButtons(section) {
    var primaryButton = section.getElementsByClassName('section__primary-button');
    for (var i = 0; i < primaryButton.length; i++) {
        hide(primaryButton[i]);
    }
}

function blurPrimaryButtons(section) {
    var primaryButton = section.getElementsByClassName('section__primary-button');
    for (var i = 0; i < primaryButton.length; i++) {
        blur(primaryButton[i]);
    }
}

function openSecondaryItems(section) {
    var items = section.getElementsByClassName('section__secondary-item');
    for (var i = 0; i < items.length; i++) {
        open(items[i]);
    }
}

function hideSecondaryItems(section) {
    var items = section.getElementsByClassName('section__secondary-item');
    for (var i = 0; i < items.length; i++) {
        hide(items[i]);
    }
}

function peekSection(section) {
    var sectionElem = getSectionElement(section);
    open(sectionElem);
    openPrimaryButtons(sectionElem);
    hideSecondaryItems(sectionElem);
    sectionElem.firstElementChild.href = sectionElem.getAttribute('primaryHref');
}

function hideSection(section) {
    var sectionElem = getSectionElement(section);
    hide(sectionElem);
    hidePrimaryButtons(sectionElem);
    hideSecondaryItems(sectionElem);
}

function openSection(section) {
    var sectionElem = getSectionElement(section);
    blurPrimaryButtons(sectionElem);
    openSecondaryItems(sectionElem);
    sectionElem.firstElementChild.href = sectionElem.getAttribute('secondaryHref');
}

function hideSections() {
    hideSection('section-projects');
    hideSection('section-resume');
    hideSection('section-techs');
}

function peekSections() {
    peekSection('section-projects');
    peekSection('section-resume');
    peekSection('section-techs');
}

function blurHeader() {
    stopPulse();
    var section = document.getElementById('section-teemu');
    blur(section);
    blurPrimaryButtons(section);
    peekSections();
    section.firstElementChild.href = "#";
}

function openHeader() {
    var section = document.getElementById('section-teemu');
    open(section);
    openPrimaryButtons(section);
    hideSections();
    section.firstElementChild.href = "#teemu";
    startPulse();
}

function checkState() {
    switch (window.location.hash) {
        case '#teemu':
            blurHeader();
            peekSections();
            break;
        case '#techs':
            blurHeader();
            peekSections();
            openSection('section-techs');
            break;
        default:
            openHeader();
            hideSections();
            break;
    }
}
window.addEventListener("hashchange", function () {
    checkState();
});
window.addEventListener("load", function () {
    openHeader();
    checkState();
});

"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: André Sohlberg
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Kontrollera formulärets obligatoriska fält

    // Töm gamla felmeddelanden
    errors = [];

    // Kontrollera namnfältet
    if (fullnameInput.value === "") {
        errors.push("Du måste fylla i ditt namn.");
    }

    // Kontrollera e-postfältet
    if (emailInput.value === "") {
        errors.push("Du måste fylla i din mail.");
    }

    // Kontrollera telefonfältet
    if (phoneInput.value === "") {
        errors.push("Du måste fylla i ditt telefonnummer.");
    }

    // Visa eventuella felmeddelanden
    displayErrors();
    // Returnera resultatet (true eller false) av valideringen

    if (errors.length === 0) {
        return true;
    } else {
        return false;
    }
}

/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for (let i = 0; i < errors.length; i++) {
        // Körs 1 gång för varje felmeddelanden
        let li = document.createElement("li");
        li.textContent = errors[i];
        errorList.appendChild(li);
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    let fullname = fullnameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;
    let font = fontSelect.value;

    // Uppdatera studentkortet
    previewFullname.textContent = fullname;
    previewEmail.textContent = email;
    previewPhone.textContent = phone;

    // Eget typsnitt
    previewFullname.style.fontFamily = font;
    previewEmail.style.fontFamily = font;
    previewPhone.style.fontFamily = font;

    // Lägg till studentkortet i historiken
    let card = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };
    history.unshift(card);

    // Spara och uppdatera historiken
    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    let historyText = JSON.stringify(history);
    localStorage.setItem("history", historyText);
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
let historyText = localStorage.getItem("history");

    // Uppdatera history
    if (historyText !== null) {
        history = JSON.parse(historyText);
    }
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    for (let i = 0; i < history.length; i++) {
        let card = history[i];
        let p = document.createElement("p");
        p.textContent = card.fullname + ", " + card.email + ", " + card.phone;
        p.style.fontFamily = card.font;
        historySection.appendChild(p);
    }
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    form.reset();
    previewFullname.textContent = "Namn";
    previewEmail.textContent = "E-post";
    previewPhone.textContent = "Telefon";
    previewFullname.style.fontFamily = "";
    previewEmail.style.fontFamily = "";
    previewPhone.style.fontFamily = "";

    // Rensa eventuella felmeddelanden
    errors = [];
    displayErrors();
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    localStorage.removeItem("history");

    // Uppdatera history och visningen på sidan
    history = [];
    renderHistory();
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = validateForm();
    console.log(isValid);

    // - skapa studentkort om valideringen lyckas
    if (isValid === true) {
        createStudentCard();
    }
});

// När användaren klickar på "Rensa"
clearButton.addEventListener("click", function () {
    clearForm();
});

// När användaren klickar på "Radera historik"
deleteHistoryButton.addEventListener("click", function () {
    deleteHistory();
});

// När sidan laddas:
// - läs in och visa eventuell tidigare historik
loadHistory();
renderHistory();
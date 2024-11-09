// Elements to select
const lastModifiedElement = document.querySelector("#lastModified");
const yearElement = document.querySelector("#year");

const currentYear = new Date().getFullYear();

lastModifiedElement.textContent = document.lastModified;
yearElement.textContent = currentYear;
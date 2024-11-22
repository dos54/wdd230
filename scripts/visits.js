const visitsElement = document.querySelector('#visits');

// Initialize the total visits from localStorage
let totalVisits = getVisits();

function countVisits() {
    return ++totalVisits; // Increment and return the updated total visits
}

function storeVisit() {
    localStorage.setItem('visits', totalVisits);
}

function getVisits() {
    const visits = localStorage.getItem('visits');
    return visits === null ? 0 : Number(visits); // Return 0 if no visits stored
}

function updateVisitsDisplay() {
    visitsElement.textContent = countVisits(); // Update the DOM with the new count
}

function run() {
    updateVisitsDisplay();
    storeVisit(); // Persist the updated visits count to localStorage
}

// Execute the main function
run();

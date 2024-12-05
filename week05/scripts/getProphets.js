const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);
        displayProphets(data.prophets);
    } catch (error) {
        console.error("There was an error: ", error);
    }
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        const card = document.createElement('section');
        card.classList.add('card');

        const fullName = document.createElement('h2');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        card.appendChild(fullName);

        const birthDate = document.createElement('p');
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        card.appendChild(birthDate);

        const birthPlace = document.createElement('p');
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        card.appendChild(birthPlace);

        const portrait = document.createElement('img');
        portrait.src = prophet.imageurl;
        portrait.alt = `The ${toOrdinal(prophet.order)} Prophet, ${prophet.name} ${prophet.lastname}`
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '256px');
        portrait.setAttribute('height', 'auto');
        card.appendChild(portrait);


        cards.appendChild(card);
    });
}

function toOrdinal(num) {
    if (typeof num !== "number" || !Number.isInteger(num)) {
        return num; // Return as-is if not a valid number
    }

    let suffix = "th";
    if (num % 100 < 11 || num % 100 > 13) {
        switch (num % 10) {
            case 1:
                suffix = "st";
                break;
            case 2:
                suffix = "nd";
                break;
            case 3:
                suffix = "rd";
                break;
        }
    }

    return `${num}${suffix}`;
}

getProphetData();
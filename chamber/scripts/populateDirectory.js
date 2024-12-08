const directory = document.querySelector('#directory');

async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`There was an error! ${response.statusText}`);
        }

        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.log("Error: ", error);
    }
}

function displayMembers(data) {
    data.members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add("card");
        card.innerHTML =  
        `

    <img src="" alt="Logo for ${member.name}">
    <h1>${member.name}</h1>
    <p>Address: ${member.address}</p>
    <p>Phone Number: ${member.phone_number}</p>
    <p>Website: <a href="${member.website}">${member.website}</a></p>
    <p>Membership Level: ${member.membership_level}</p>`;
        directory.appendChild(card);
    });
}

getMembers();
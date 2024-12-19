async function getMembers()
{
    try 
    {
        const response = await fetch("data/members.json");
        if (!response.ok) 
        {
            throw new error(`Fetch Failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) 
    {
        console.log('Error: ', error)
    }
}

async function getSpotlightMembers() {
    try {
        const data = await getMembers(); // Wait for getMembers to resolve
        if (!data || !data.members) {
            throw new Error("No members data found.");
        }

        const members = data.members; // Access the members array
        const filteredMembers = members.filter(member => 
            member.membership_level === "gold" || member.membership_level === "silver"
        );

        if (filteredMembers.length === 0) {
            throw new Error("No gold or silver members available.");
        }

        return getRandomElements(filteredMembers, 3); // Return 3 random spotlight members
    } catch (error) {
        console.log('Error fetching spotlight members: ', error);
        return []; // Return an empty array if there's an error
    }
}

async function createBanner() {
    const spotlightContainer = document.getElementById('spotlights');
    try {
        const members = await getSpotlightMembers();
        if (!members) return;
        members.forEach(member => {
            const spotlight = document.createElement('div');
            spotlight.classList.add('card');
            spotlight.classList.add('spotlight-item')
            
            // Create and configure the logo element
            const logo = document.createElement('img');
            logo.classList.add('spotlight-logo');
            logo.src = member.logo;
            logo.alt = member.name;
            spotlight.append(logo);

            // Create and configure the name element
            const name = document.createElement('h2');
            name.textContent = member.name;
            spotlight.append(name);
            
            // Create and configure the membership level element
            const level = document.createElement('p');
            level.textContent = `${member.name} is a ${member.membership_level} tier member`;
            spotlight.append(level);
            
            // Phone number
            const number = document.createElement('p');
            number.textContent = `Phone Number: ${member.phone_number}`;
            spotlight.append(number);
            
            // Address
            const address = document.createElement('p');
            address.textContent = `Address: ${member.address}`;
            spotlight.append(address);
            
            // Website
            const website = document.createElement('a');
            website.textContent = `${member.website}`;
            website.href = member.website;
            spotlight.append(website);

            spotlightContainer.append(spotlight);
        });
    } catch (error) {
        console.log("Error with spotlights: ", error)
    }
}


function getRandomElements(array, count) {
    if (count > array.length) {
        throw new Error("Requested more elements than are available in the array.");
    }

    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, count);
}

createBanner(getSpotlightMembers);
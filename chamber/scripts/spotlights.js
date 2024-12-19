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

function getSpotlightMembers()
{
    const members = getMembers().members;
    const filteredMembers = members.filter(member => member.membership_level === "gold" || member.membership_level === "silver");
    return getRandomElements(filteredMembers, 3);
}

function createBanner(members) {
    const spotlightContainer = document.getElementById('spotlightContainer');

    members.forEach(member => {
        // Create and configure the name element
        const name = document.createElement('h2');
        name.textContent = member.name;
        spotlightContainer.append(name);

        // Create and configure the logo element
        const logo = document.createElement('img');
        logo.src = member.logo;
        logo.alt = member.name;
        spotlightContainer.append(logo);

        // Create and configure the membership level element
        const level = document.createElement('p');
        level.textContent = member.membership_level;
        spotlightContainer.append(level);
    });
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
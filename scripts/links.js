const baseURL = "https://dos54.github.io/wdd230/";
const linksURL = "https://dos54.github.io/wdd230/data/links.json";

const linksList = document.querySelector('#links-list');

async function getLinks() {
    try {
        const response = await fetch(linksURL);

        const data = await response.json();
        displayLinks(data.weeks);
    } catch (error) {
        console.log("There was an error retrieving the data: ", error)
    }
}

function displayLinks(weeks) {
    if (Array.isArray(weeks)) {
        weeks.forEach(week => {
            const div = document.createElement('div');
            div.classList.add('week');
            linksList.appendChild(div);
            
            const title = document.createElement('span');
            const ul = document.createElement('ul');
            div.appendChild(title);
            div.appendChild(ul);
            
            title.textContent = week.week;
    
            week.links.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
    
                li.appendChild(a);
                a.href = `${baseURL}${link.url}`;
                a.textContent = link.title;
                ul.appendChild(li);
            });
    
        });
    } else {
        console.error('Error: The array provided is not an array.');
        console.log(weeks);
    }
}

getLinks();
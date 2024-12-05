const baseURL = "https://dos54.github.io/wdd230/";
const linksURL = "https://dos54.github.io/wdd230/data/links.json";

const linksList = document.querySelector('#links-list');

async function getLinks() {
    try {
        const response = await fetch(linksURL);

        const data = response.json();
        displayLinks(data);
    } catch (error) {
        console.log("There was an error retrieving the data: ", error)
    }
}

function displayLinks(weeks) {
    weeks.forEach(week => {
        const div = document.createElement('div');
        div.classList.add('week');
        linksList.appendChild(div);
        
        const title = document.createElement('span');
        const ul = document.createElement('ul');
        div.appendChild(title);
        div.appendChild(ul);
        
        title.textContent = element.week;

        element.links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');

            li.appendChild(a);
            a.href = `${baseURL}${link.url}`;
            a.textContent = link.title;
        });

    });
}
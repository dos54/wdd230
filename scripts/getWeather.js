const appid = "3221710ace948d5518e0be8675662b23";
const units = "imperial";
const lat = "55.34";
const lon = "-131.66";
const exclude = "minutely,hourly,daily,alerts";

const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');


async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok ${response.statusText}`);
        }
        const data = await response.json();
        temperature.textContent = data.main.temp;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

fetchWeather();
const appid = "902f6903967205a681145ab81afc2f6f";
const units = "imperial";
const lat = "55.34";
const lon = "-131.66";
const exclude = "minutely,hourly,daily,alerts";

const temperature = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');
const forecastContainer = document.querySelector('#forecasts');


function cacheObject(key, value, timeToLiveSeconds) {
    const expires = Date.now() + (timeToLiveSeconds * 1000);
    localStorage.setItem(key, JSON.stringify({value, expires}));
}

function getCachedObject(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const {value, expires} = JSON.parse(cached);
    if (Date.now() > expires) {
        localStorage.removeItem(key);
        return null
    }
    return value
}

async function fetchWeather() {
    let data = getCachedObject("weather");
    if (!data) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok ${response.statusText}`);
            }
            data = await response.json();
            cacheObject("weather", data, (60 * 60 * 3));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }
    const forecast = await fetchForecast();
    
    if (data) {
        displayWeather(data, forecast);
    }
}

async function fetchForecast() {
    let data = getCachedObject("forecast");
    if (!data) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok ${response.statusText}`);
            }
            data = await response.json();
            cacheObject("forecast", data, (60 * 60 * 3));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }



    return getNextThreeDaysAt9AM(data);
}

function displayWeather(data, forecast) {
    temperature.textContent = data.main.temp;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherDescription.textContent = capitalizeWords(data.weather[0].description);
    
    forecast.forEach(element => {
        const forecastWeather = document.createElement('div');
        forecastWeather.classList.add('forecast');
        const forecastTempContainer = document.createElement('div');
        forecastTempContainer.classList.add('temperature-container');
        const forecastTemp = document.createElement('span');
        forecastTemp.classList.add('temperature');

        const forecastImg = document.createElement('img');
        forecastImg.classList.add('weather-icon');
        forecastImg.src = `https://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

        forecastDescription = document.createElement('div');
        forecastDescription.classList.add('weather-description');
        forecastDescription.textContent = capitalizeWords(element.weather[0].description);

        forecastWeather.appendChild(forecastImg);
        forecastWeather.appendChild(forecastTempContainer);
        forecastTempContainer.appendChild(forecastTemp);
        forecastTemp.textContent = element.main.temp;
        forecastWeather.appendChild(forecastDescription);

        forecastContainer.appendChild(forecastWeather);
    });

}

function capitalizeWords(str) {
    return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getNextThreeDaysAt9AM(data) {
    const nineAmForecasts = data.list.filter(item => item.dt_txt.includes("09:00:00"));
    const nextThreeDaysForecast = nineAmForecasts.slice(0, 3);
    return nextThreeDaysForecast;
}


fetchWeather();
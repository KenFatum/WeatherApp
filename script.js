const apiKey = '7ff5a57667c8fc9d7b5cae512419651a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const cityNameInput = document.querySelector(".city-name-input");
const searchButton = document.querySelector(".search-btn");
const cityNameElement = document.querySelector(".city-name");
const weatherIconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const descriptionElement = document.querySelector(".description");

function getWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityNameElement.textContent = data.name;
            //weatherIconElement.textContent = data.weather[0].icon;
            let dataIcon = data.weather[0].icon;
            weatherIconElement.src = `https://openweathermap.org/img/wn/${dataIcon}.png`;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            humidityElement.textContent = `${Math.round(data.main.humidity)}%`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        })
}

searchButton.addEventListener('click', () => {
    const city = cityNameInput.value;
    if (city) {
        getWeather(city);
    }
})
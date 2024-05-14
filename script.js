const apiKey = '7ff5a57667c8fc9d7b5cae512419651a';


const cityNameInput = document.querySelector(".city-name-input");
const forecastDays = document.querySelector(".forecast-select");
const containerOption = document.querySelectorAll(".container__option");
const searchButton = document.querySelector(".search-btn");

//Current Weather
const cityNameElement = document.querySelector(".city-name");
const weatherIconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature");
const humidityElement = document.querySelector(".humidity");
const descriptionElement = document.querySelector(".description");

// Daily Forecast Weather
const dailyForecastInfosElement = document.querySelector(".daily-forecast-infos");
const dailyForecastElement = document.querySelector(".forecast-daily");
const weatherIconForecastElement = document.querySelector(".forecast-weather-icon");
const temperatureForecastElement = document.querySelector(".forecast-temperature");


function getCurrentWeather(city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            cityNameElement.textContent = data.name;
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

function getForecastWeather(city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const firstDate = data.list[0].dt_txt.split(" ")[0];
            let countDays = forecastDays.value;
            for (let i = 0; i < 40; i++) {
                
                const forecast = data.list[i];
                const [date, time] = forecast.dt_txt.split(" ");

                if (time === "12:00:00" && firstDate !== date) {
                    if (--countDays <= 0) {
                        break;
                    }
                    console.log(forecast.main.temp, forecast.dt_txt);
                    const weekDay = new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
                        weekday: 'long', 
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                    const forecastWeatherIcon = forecast.weather[0].icon;
                    const dailyForecastInfo = createDailyForecastInfo(weekDay,
                        `https://openweathermap.org/img/wn/${forecastWeatherIcon}.png`,
                        `${Math.round(forecast.main.temp)}°C`);

                    dailyForecastInfosElement.appendChild(dailyForecastInfo);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        })
}

function createDailyForecastInfo(day, iconUrl, temp) {
    // Erstelle ein neues div-Element
    let div = document.createElement('div');
    div.className = 'daily-forecast-info';

    // Erstelle ein neues h4-Element
    let h4 = document.createElement('h4');
    h4.className = 'forecast-daily';
    h4.textContent = day;
    div.appendChild(h4);

    // Erstelle ein neues img-Element
    let img = document.createElement('img');
    img.className = 'forecast-weather-icon';
    img.src = iconUrl;
    div.appendChild(img);

    // Erstelle ein neues p-Element
    let p = document.createElement('p');
    p.className = 'forecast-temperature';
    p.textContent = temp;
    div.appendChild(p);

    return div;

}

searchButton.addEventListener('click', () => {
    const city = cityNameInput.value;
    getCurrentWeather(city);
    getForecastWeather(city);
})
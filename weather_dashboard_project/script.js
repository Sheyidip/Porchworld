const API_KEY = '458153ff0e96fd558fda8e9fab1d0abd'; 

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const dateElement = document.getElementById('date');
const weatherIcon = document.getElementById('weather-icon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherInfo = document.getElementById('weather-info');
const errorElement = document.getElementById('error');

// Event Listeners
searchButton.addEventListener('click', getWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});

// Functions
async function getWeather() {
    const city = searchInput.value.trim();
    
    if (!city) return;

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
        
        // Hide error message if it was previously shown
        errorElement.style.display = 'none';
        // Show weather info
        weatherInfo.style.display = 'block';
        
    } catch (error) {
        // Show error message
        errorElement.style.display = 'block';
        // Hide weather info
        weatherInfo.style.display = 'none';
    }
}

function displayWeather(data) {
    // Update city and date
    cityElement.textContent = `${data.name}, ${data.sys.country}`;
    dateElement.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Update weather icon and temperature
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;

    // Update weather details
    feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} m/s`;
}

// Optional: Get weather for default city on page load
// window.addEventListener('load', () => {
//     searchInput.value = 'London';
//     getWeather();
// });
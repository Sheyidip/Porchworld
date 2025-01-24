import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
// Initialize Firebase Authentication

const firebaseConfig = {
    apiKey: "AIzaSyABQEO9trAspyRxUkESB3317Aj3mp85CiA",
    authDomain: "weather-dashboard-d3829.firebaseapp.com",
    projectId: "weather-dashboard-d3829",
    storageBucket: "weather-dashboard-d3829.firebasestorage.app",
    messagingSenderId: "710138944776",
    appId: "1:710138944776:web:ae88c2688b177b715960bd",
    measurementId: "G-W8QLJ30028"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Redirect unauthenticated users to signup page
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = 'dashboard.html'; // Replace with your signup page path
    }
    else {
        window.location.href = 'auth.html';
    }
});


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
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');
const visibilityElement = document.getElementById('visibility');
const pressureElement = document.getElementById('pressure');
const forecastElement = document.getElementById('forecast');


// Unit and Dark Mode Storage
let currentUnit = localStorage.getItem('unit') || 'metric'; // Default to metric (Celsius)
let darkMode = localStorage.getItem('darkMode') === 'true'; // Get dark mode preference

// Event Listeners
searchButton.addEventListener('click', getWeather);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('unit-toggle').addEventListener('click', toggleUnit);

// Toggle Dark Mode
function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
}

// Toggle Unit (Celsius/Fahrenheit)
function toggleUnit() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('unit', currentUnit);
    getWeather(); // Re-fetch weather with updated unit
}

// Get Weather Data by City
async function getWeather() {
    const city = searchInput.value.trim();
    
    if (!city) return;

    try {
        // Get weather by city (only current weather data)
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${currentUnit}`
        );
        
        if (!weatherResponse.ok) throw new Error('City not found');
        const weatherData = await weatherResponse.json();

        displayWeather(weatherData);
        displayAdditionalInfo(weatherData);

        // Hide error and show weather info
        errorElement.style.display = 'none';
        weatherInfo.style.display = 'block';
    } catch (error) {
        // Show error message
        errorElement.style.display = 'block';
        weatherInfo.style.display = 'none';
    }
}

// Display Weather Info
// Display Weather Info
function displayWeather(data) {
    cityElement.textContent = `${data.name}, ${data.sys.country}`;
    dateElement.textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°${currentUnit === 'metric' ? 'C' : 'F'}`;
    descriptionElement.textContent = data.weather[0].description;

    feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°${currentUnit === 'metric' ? 'C' : 'F'}`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windSpeedElement.textContent = `${data.wind.speed} m/s`;

    // Display Latitude and Longitude
    const latLonElement = document.createElement('p');
    latLonElement.textContent = `Latitude: ${data.coord.lat}, Longitude: ${data.coord.lon}`;
    document.querySelector('.additional-info').appendChild(latLonElement);
}


// Display Additional Info (Pressure, Visibility, Sunrise/Sunset)
function displayAdditionalInfo(data) {
    console.log(data); // Inspect API response in the console

    if (pressureElement) {
        pressureElement.textContent = `Pressure: ${data.main.pressure} hPa`;
    } else {
        console.error("Pressure element not found.");
    }

    if (visibilityElement) {
        const visibilityInKm = (data.visibility / 1000).toFixed(1);
        visibilityElement.textContent = `Visibility: ${visibilityInKm} km`;
    } else {
        console.error("Visibility element not found.");
    }

    if (sunriseElement) {
        const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        sunriseElement.textContent = `Sunrise: ${sunriseTime}`;
    } else {
        console.error("Sunrise element not found.");
    }

    if (sunsetElement) {
        const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        sunsetElement.textContent = `Sunset: ${sunsetTime}`;
    } else {
        console.error("Sunset element not found.");
    }
}



// Automatically fetch weather by geolocation
 
/*
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoords(lat, lon);
        }, () => {
            errorElement.textContent = 'Geolocation not available. You can search for a city instead.';
            errorElement.style.display = 'block';
        });
    }
});

async function getWeatherByCoords(lat, lon) {
    try {
        // Get current weather by coordinates (no forecast data)
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${currentUnit}`
        );
        
        if (!response.ok) throw new Error('Error fetching weather data');
        const data = await response.json();
        displayWeather(data);
        displayAdditionalInfo(data);
    } catch (error) {
        console.error(error); // Log the error to the console
        errorElement.style.display = 'block';
        weatherInfo.style.display = 'none';
    }
}
*/
// Set Initial State for Dark Mode and Unit Toggle
if (darkMode) document.body.classList.add('dark-mode');
if (currentUnit === 'imperial') document.getElementById('unit-toggle').textContent = '°F / °C';
else document.getElementById('unit-toggle').textContent = '°C / °F';
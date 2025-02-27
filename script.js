// script.js
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const errorMessage = document.querySelector('.error-message');
    
    const cityName = document.querySelector('.city-name');
    const temperature = document.querySelector('.temperature');
    const condition = document.querySelector('.condition');
    const humidity = document.querySelector('.humidity');
    const wind = document.querySelector('.wind');
    const feelsLike = document.querySelector('.feels-like');
    const visibility = document.querySelector('.visibility');
    const airQuality = document.querySelector('.air-quality');

    const API_KEY = '8689ae44e67d41e5af4144011252702';
    const BASE_URL = 'http://api.weatherapi.com/v1/current.json';

    async function fetchWeather(city) {
        try {
            const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            
            updateWeatherData(data);
            errorMessage.style.display = 'none';
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
        }
    }

    function updateWeatherData(data) {
        cityName.textContent = data.location.name;
        temperature.textContent = `${data.current.temp_c}°C`;
        condition.textContent = data.current.condition.text;
        humidity.textContent = `${data.current.humidity}%`;
        wind.textContent = `${data.current.wind_kph} km/h`;
        feelsLike.textContent = `${data.current.feelslike_c}°C`;
        visibility.textContent = `${data.current.vis_km} km`;
        
        const aqi = data.current.air_quality['us-epa-index'];
        airQuality.textContent = getAirQualityText(aqi);
        airQuality.style.color = getAirQualityColor(aqi);
    }

    function getAirQualityText(aqi) {
        const qualityMap = {
            1: 'Good',
            2: 'Moderate',
            3: 'Unhealthy for Sensitive Groups',
            4: 'Unhealthy',
            5: 'Very Unhealthy',
            6: 'Hazardous'
        };
        return qualityMap[aqi] || 'N/A';
    }

    function getAirQualityColor(aqi) {
        const colors = {
            1: '#2ecc71',
            2: '#f1c40f',
            3: '#e67e22',
            4: '#e74c3c',
            5: '#8e44ad',
            6: '#c0392b'
        };
        return colors[aqi] || '#cccccc';
    }

    searchBtn.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) fetchWeather(city);
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city) fetchWeather(city);
        }
    });

    // Initial load
    fetchWeather('London');
});
import React, { useState } from 'react';

const WeatherApp = () => {
    const [cityName, setCityName] = useState('');
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const apiKey = import.meta.env.VITE_API_KEY;

    const getWeatherData = async (city) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error(`Could not locate ${city}.`);
            }
            return await response.json();
        } catch (error) {
            setErrorMessage(error.message);
            console.error(error);
        }
    };

    const handleCityInput = async (event) => {
        event.preventDefault();

        if (!cityName.trim() || !isNaN(cityName)) {
            setErrorMessage('Please enter a city.');
            setWeather(null);
            return;
        }

        const data = await getWeatherData(cityName);
        if (data) {
            setWeather(data);
            setErrorMessage('');
        }
        setCityName('');
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <form className="weather-form" onSubmit={handleCityInput}>
                <input
                    type="text"
                    placeholder="Enter a city"
                    className="search-input"
                    value={cityName}
                    onChange={event => {
                        setCityName(event.target.value);
                        setErrorMessage('');
                        setWeather(null);
                    }}
                />
                <button className="search-button" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </form>

            {errorMessage && (
                <div className="card">
                    <p className="error-display">{errorMessage}</p>
                </div>
            )}

            {weather && (
                <div className="card">
                    <h2 className="city-display">
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <p className="temp-display">
                        {Math.floor(weather.main.temp - 273.15)}°C
                    </p>
                    <p className="feels-like-display">
                        Feels like: {Math.floor(weather.main.feels_like - 273.15)}°C
                    </p>
                    <p className="humidity-display">
                        Humidity: {weather.main.humidity}%
                    </p>
                    <p className="desc-display">{weather.weather[0].description}</p>
                    <img
                        className="weather-img"
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                        alt="weather icon"
                        loading="lazy"
                    />
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
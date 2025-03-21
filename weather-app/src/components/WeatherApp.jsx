import React, { useState } from 'react';

const WeatherApp = () => {
    // State variables
    const [cityName, setCityName] = useState('');
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // New state for loading
    const apiKey = import.meta.env.VITE_API_KEY;

    // Fetch weather data
    const getWeatherData = async (city) => {
        try {
            setLoading(true);  // Set loading to true before fetching data
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
            );
            if (!response.ok) {
                throw new Error(`Could not locate ${city}.`);
            }
            const data = await response.json();
            setWeather(data); // Set weather data once it's fetched
            setErrorMessage(''); // Reset error message on success
        } catch (error) {
            setErrorMessage(error.message); // Set error message if there’s an issue
            setWeather(null); // Reset weather data
        } finally {
            setLoading(false); // Set loading to false after fetching data
        }
    };

    // Handle user input and form submission
    const handleCityInput = async (event) => {
        event.preventDefault();

        // Input validation
        if (!cityName.trim() || !isNaN(cityName)) {
            setErrorMessage('Please enter a city.');
            setWeather(null);
            return;
        }

        // Fetch weather data and update state
        await getWeatherData(cityName);

        // Clear input after submission
        setCityName('');
    };

    // Handle city name change
    const handleInputChange = (event) => {
        setCityName(event.target.value);
        setErrorMessage('');
        setWeather(null);
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
                    onChange={handleInputChange}
                />
                <button className="search-button" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </form>

            {/* Display loading spinner */}
            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            )}

            {/* Display error message */}
            {errorMessage && !loading && (
                <div className="card">
                    <p className="error-display">{errorMessage}</p>
                </div>
            )}

            {/* Display weather data */}
            {weather && !loading && (
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

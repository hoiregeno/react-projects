import React, { useState } from 'react'
import './WeatherApp.css';

const WeatherApp = () => {
    // Declare state variables for location input and weather data.
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const apiKey = import.meta.env.VITE_API_KEY;

    const getWeatherData = async (city) => {
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Could not locate ${city}.`);
                }

                const data = await response.json();

                return data;
            }
            catch (error) {
                setErrorMessage(error.message);
                setWeatherData(null);
                console.error(error);
            }
        }
    }

    const handleInputChange = async (event) => {
        event.preventDefault();

        if (location.trim() !== "") {
            // Clear previous weather data at the start of a new search
            setWeatherData(null);
            setErrorMessage("");
            // Start the loading animation when the search begins
            setIsLoading(true);

            try {
                const data = await getWeatherData(location);
                if (data) {
                    setWeatherData(data);
                    setErrorMessage("");
                }
            }
            catch (error) {
                setErrorMessage(error.message);
                setWeatherData(null);
                throw error;
            }
            // Stop the loading animation after fetching is complete
            setIsLoading(false);
        }
        else {
            setErrorMessage("Please enter a city.");
            setWeatherData(null);
            return;
        }

        setLocation("");
    }

    return (
        <div className='container'>
            <h1 className="title">Weather App</h1>
            <form className="weather-form" onSubmit={handleInputChange}>
                <input
                    type="text"
                    placeholder='Enter city'
                    value={location}
                    onChange={e => {
                        setLocation(e.target.value);
                        setErrorMessage("");
                        setWeatherData(null);
                    }}
                    className='city-input'
                />
                <button type="submit" className='search-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </form>

            {/* Added spinner to show loading state */}
            {isLoading && (
                <div className="loading-animation">
                    <div className="spinner"></div>
                </div>
            )}

            {errorMessage && (
                <div className="error-card">
                    <p className="error-message">{errorMessage}</p>
                </div>
            )}

            {weatherData && (
                <div className="card">
                    <h1 className='city-display'>
                        {weatherData.name}, {weatherData.sys.country}
                    </h1>
                    <h2 className="temp-display">
                        {(weatherData.main.temp - 273.15).toFixed(1)}°C
                    </h2>
                    <p className="feels-display">
                        Feels like: {(weatherData.main.feels_like - 273.15).toFixed(1)}°C
                    </p>
                    <p className="humidity-display">
                        Humidity: {weatherData.main.humidity}%
                    </p>
                    <p className="description-display">
                        {weatherData.weather[0].description}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                        alt="weather icon"
                        className='weather-icon'
                    />
                </div>
            )}
        </div>
    )
}

export default WeatherApp
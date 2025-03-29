import React, { useState } from 'react'
import './WeatherApp.css';

const WeatherApp = () => {
    // Declare state variables for location input and weather data.
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
                    throw new Error(`Could not locate ${city}`);
                }

                return await response.json();
            }
            catch (error) {
                setErrorMessage(error.message);
                console.error(error);
            }
        }
    }

    const handleInputChange = async (event) => {
        event.preventDefault();

        try {
            const data = await getWeatherData(location);
            console.log(data);
            setWeatherData(data);
            setErrorMessage("");
        }
        catch (error) {
            throw error;
        }
    }

    return (
        <div className='container'>
            <h1 className="title">Weather App</h1>
            <form className="weather-form" onSubmit={handleInputChange}>
                <input
                    type="text"
                    placeholder='Enter city'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className='city-input'
                />
                <button type="submit" className='search-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
                    </svg>
                </button>
            </form>

            {weatherData && (
                <div className="card">
                    <h1 className='city-display'>
                        {weatherData.name}, {weatherData.sys.country}
                    </h1>
                    <h2 className="temp-display">
                        {(weatherData.main.temp - 273.15).toFixed(2)}°C
                    </h2>
                    <p className="feels-display">
                        {(weatherData.main.feels_like - 273.15).toFixed(2)}°C
                    </p>
                    <p className="humidity-display">
                        Humidity: {weatherData.main.humidity}%
                    </p>
                    <p className="description-display">
                        {weatherData.weather[0].description}
                    </p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" />
                </div>
            )}
        </div>
    )
}

export default WeatherApp
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
                />
                <button type="submit">
                    Find
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
import React, { useState, useEffect } from 'react';
import countryNames from '../utils/countryList.js';
import styles from '../styles/WeatherApp.module.css';

function WeatherApp() {
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // useEffect to debounce and fetch weather data
    useEffect(() => {
        if (!cityName) return;

        const delayDebounce = setTimeout(() => {
            fetchWeather(cityName);
        }, 800); // 800ms delay

        return () => clearTimeout(delayDebounce); // Cleanup timeout
    }, [cityName]);

    // Fetch function called by useEffect
    async function fetchWeather(city) {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        try {
            setIsLoading(true);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Could not locate ${city}.`);
            }

            const data = await response.json();
            setWeather(data);
            setErrorMessage("");
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            setWeather(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <h1>Weather App</h1>

            <form onSubmit={e => e.preventDefault()} className={styles.weatherForm}>
                <input
                    type="text"
                    placeholder="Enter a city"
                    value={cityName}
                    onChange={event => setCityName(event.target.value)}
                />
            </form>

            {isLoading && <p>Loading...</p>}

            {errorMessage && (
                <p className={styles.errorMessage}>{errorMessage}</p>
            )}

            {weather && (
                <div className={styles.card}>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                        alt={`${weather.weather[0].description} icon`}
                        className={styles.weatherIcon}
                    />
                    <h1 className={styles.cityDisplay}>
                        {weather.name}, {countryNames[weather.sys.country] || weather.sys.country}
                    </h1>
                    <h2 className={styles.tempDisplay}>
                        {((weather.main.temp) - 273.15).toFixed(2)}°C
                    </h2>
                    <p className={styles.humidityDisplay}>
                        {weather.main.humidity}%
                    </p>
                    <p className={styles.descDisplay}>
                        {weather.weather[0].description}
                    </p>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
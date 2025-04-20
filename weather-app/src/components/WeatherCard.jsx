import React, { useState } from 'react';
// import countryNames from '../utils/countryList.js';
import styles from '../styles/WeatherCard.module.css';

function WeatherCard() {
    // State variables
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Fetch weather data from OpenWeatherMap API.
    async function getWeatherData(e) {
        e.preventDefault();

        if (!cityName) return;
        setIsLoading(true);
        setErrorMessage("");

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

        try {
            const response = await fetch(url);


            if (!response.ok) {
                throw new Error(`Could not locate ${cityName}.`);
            }

            const data = await response.json();
            setWeather(data);
        }
        catch (error) {
            console.error(error);
            setWeather(null);
            setErrorMessage(error.message);
        }
        finally {
            setCityName("");
            setIsLoading(false);
        }
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Weather App</h1>
            <form
                className={styles.weatherForm}
                onSubmit={getWeatherData}
            >
                <input
                    type="text"
                    placeholder="Enter a city"
                    value={cityName}
                    onChange={e => setCityName(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {isLoading && (
                <p className={styles.loadingDisplay}>Loading...</p>
            )}

            {errorMessage && (
                <p className={styles.errorDisplay}>{errorMessage}</p>
            )}

            {weather && (
                <div className={styles.card}>
                    <h1>{weather.name}</h1>
                </div>
            )}
        </div>
    );
}

export default WeatherCard;
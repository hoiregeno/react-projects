import React, { useState } from 'react';
// import countryNames from '../utils/countryList.js';
// import styles from '../styles/WeatherCard.module.css';

function WeatherCard() {
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <></>
    );
}

export default WeatherCard;
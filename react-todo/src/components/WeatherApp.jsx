import React, { useState } from 'react'

const WeatherApp = () => {
    // Declare state variables for location input and weather data.
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className='card'>

        </div>
    )
}

export default WeatherApp
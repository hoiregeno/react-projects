import React, { useState } from 'react'

const WeatherApp = () => {
    // Declare state variables for location input and weather data.
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const getWeatherData = async (city) => {
        if (city) {
            try {
                const response = await fetch();
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    const handleInputChange = (event) => {
        event.preventDefault();
    }

    return (
        <div className='container'>
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

                </div>
            )}
        </div>
    )
}

export default WeatherApp
import React, { useState } from "react";

function WeatherCard() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <h1 className="app-title">Weather App</h1>
      <form className="search-form">
        <input
          type="text"
          placeholder="Enter city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="card">
        <h1 className="city-display">Miami</h1>
        <p className="temp-display">25.5°C</p>
        <p className="humidity-display">Humidity: 75%</p>
        <p className="desc-display">Cloudy</p>
        <img src="" alt="" />
      </div>
    </>
  );
}

export default WeatherCard;

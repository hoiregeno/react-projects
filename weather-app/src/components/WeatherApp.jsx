import React, { useState } from "react";

function WeatherApp() {
  // Create state variables
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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
        <p className="temp-display">27°C</p>
        <p className="humidity-display">Humidity: 70%</p>
        <p className="desc-display">Cloudy</p>
      </div>
    </>
  );
}

export default WeatherApp;

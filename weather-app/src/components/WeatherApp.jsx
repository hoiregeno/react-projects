import React, { useState } from "react";

function WeatherApp() {
  // Create state variables
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFetching = async (e) => {
    e.preventDefault();
    if (cityName.trim() === "") return;
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
      );

      if (!response.ok)
        throw new Error(`Could not locate "${cityName}". Please try again.`);

      const data = await response.json();
      console.log(data);
      setWeather(data);
      setErrorMsg("");
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    } finally {
      setCityName("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="app-title">Weather App</h1>
      <form className="search-form" onSubmit={handleFetching}>
        <input
          type="text"
          placeholder="Enter city"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p className="loading-display">Loading...</p>}
      {errorMsg && <p className="error-display">{errorMsg}</p>}

      {weather && (
        <div className="card">
          <h1 className="city-display">Miami</h1>
          <p className="temp-display">27°C</p>
          <p className="humidity-display">Humidity: 70%</p>
          <p className="desc-display">Cloudy</p>
        </div>
      )}
    </>
  );
}

export default WeatherApp;

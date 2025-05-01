import React, { useState } from "react";

function WeatherApp() {
  // Create state variables
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return <div>WeatherApp</div>;
}

export default WeatherApp;

import React, { useState } from "react";

function WeatherCard() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return <></>;
}

export default WeatherCard;

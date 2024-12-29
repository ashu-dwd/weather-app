import React, { useState } from "react";
import "./App.css";
import {
  FaSearch,
  FaCloudSun,
  FaTemperatureHigh,
  FaWind,
  FaTint,
} from "react-icons/fa";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ed8e68ca6dd14b0d159ab2c5b77b1a07";

  const handleCityName = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("City name cannot be empty");
      setWeather(null);
      return;
    }
    setError(null);
    fetchWeather(city);
  };

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const weatherData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await weatherData.json();
      if (data.cod === "404") {
        setError("City not found. Please try again.");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>
        <FaCloudSun /> Weather App
      </h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={city}
          onChange={handleCityName}
          placeholder="Enter your city"
          className="city-input"
        />
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {loading && <div className="loader"></div>}
      {weather && (
        <div className="weather-data">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <div className="main-info">
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="temperature">{Math.round(weather.main.temp)}°C</p>
            <p className="description">{weather.weather[0].description}</p>
          </div>
          <div className="details">
            <div className="detail-item">
              <FaTemperatureHigh />
              <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="detail-item">
              <FaWind />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
            <div className="detail-item">
              <FaTint />
              <p>Humidity: {weather.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

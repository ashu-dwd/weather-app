import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "ed8e68ca6dd14b0d159ab2c5b77b1a07";

  const handleCityName = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("City name cannot be empty");
      setWeather(null);
      return;
    }
    // Add your search logic here
    console.log(city);
    fetchWeather(city);
    setWeather(weather);
  };
  const fetchWeather = async () => {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await weatherData.json();
    console.log(data);
  };

  return (
    <>
      <div className="weather-app">
        <h1>Weather App</h1>
        <label>Enter Your City:</label>
        <input type="text" value={city} id="input" onChange={handleCityName} />
        <br />
        <button type="button" className="searchBtn" onClick={handleSearch}>
          Search
        </button>
        <div className="weather-data">
          <h2>Weather Data: {weather}</h2>
          <div className="box"></div>
        </div>
      </div>
    </>
  );
}

export default App;

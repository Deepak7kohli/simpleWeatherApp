import './App.css'
import { useState } from 'react'

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleClick = async () => {

    // 🔑 Dummy API key (replace with your real key)
    const API_KEY = "5e93ae6e980f2847e0ab85ac88748321";

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found");
        setWeather(null);
      }

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Simple Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={handleClick}>
        Get Weather
      </button>

      {weather && weather.main && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}

    </div>
  )
}

export default App
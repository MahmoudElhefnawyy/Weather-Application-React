import React, { useState, useEffect } from 'react';
import './App.css';
import rainImg from './assets/imgs/Rain_Img.png';
import flagImg from './assets/imgs/England_Flag.png';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Washington');
  const [error, setError] = useState(false);

  const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${apiKey}&q=`;

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(url + cityName);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setError(false);
      } else {
        setError(true);
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
    }
  };

  useEffect(() => {
    fetchWeather('Washington'); 
  }, []);

  return (
    <>
    <div className="container">
      <main className={error ? 'error' : ''}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder="Search For Weather"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>

        {weatherData ? (
          <section className="result">
            <figure className="name">
              <figcaption>{weatherData.name}</figcaption>
              <img src={`https://flagsapi.com/${weatherData.sys.country}/shiny/32.png`} alt="Country Flag" />
            </figure>

            <figure className="temperature">
              <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} alt="Weather Icon" />
              <figcaption>
                <span>{Math.round(weatherData.main.temp)}</span>
                <sup>°C</sup>
              </figcaption>
            </figure>

            <p className="description">{weatherData.weather[0].description}</p>
            <ul>
              <li>
                <span>clouds</span>
                <i className="fa-solid fa-cloud"></i>
                <span>{weatherData.clouds.all}</span>%
              </li>
              <li>
                <span>humidity</span>
                <i className="fa-solid fa-droplet"></i>
                <span>{weatherData.main.humidity}</span>%
              </li>
              <li>
                <span>pressure</span>
                <i className="fa-solid fa-gauge"></i>
                <span>{weatherData.main.pressure}</span>hPa
              </li>
            </ul>
          </section>
        ) : (
          error && <p className="error-message">City not found. Please try again.</p>
        )}
      </main>
    </div>
    </>
  );
};

export default App;

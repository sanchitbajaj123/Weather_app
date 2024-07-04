import React, { useState, useEffect } from 'react';
import './Weather.css';
import fetchWeatherData from './api';

function Report() {
  const [val, setVal] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setVal(event.target.value);
  };

  const handleButtonClick = () => {
    fetchWeatherData(val)
      .then(data => {
        setWeatherData(data.currentConditions);
        console.log(data.currentConditions);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please try again later.');
        setWeatherData(null); 
      });
  };

  const getBackgroundClass = (condition) => {
    if (condition.includes('rain')) return 'rain-bg';
    if (condition.includes('cloud')) return 'cloudy-bg';
    if (condition.includes('sunny') || condition.includes('clear')) return 'sunny-bg';
    return 'default-bg';
  };

  useEffect(() => {
    if (weatherData) {
      const bgClass = getBackgroundClass(weatherData.conditions.toLowerCase());
      document.body.className = bgClass;
    } else {
      document.body.className = 'default-bg';
    }
  }, [weatherData]);

  return (
    <div className="weather-app">
      <div className="weather-header">
        <h1>Tech Solutions Weather App</h1>
      </div>
      <div className="weather-search">
        <input type="text" placeholder="Enter Location" onChange={handleInputChange} />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      {error && (
        <div className="weather-report">
          <div className="report-container">
            <h2>Error Occurred</h2>
            <p>{error}</p>
          </div>
        </div>
      )}
      {weatherData && (
        <div className="weather-report">
          <div className="report-container">
            <h2>Weather Report for {val}</h2>
            <div className="weather-details">
              <div className="weather-card">
                <h3>Conditions</h3>
                <p>{weatherData.conditions}</p>
              </div>
              <div className="weather-card">
                <h3>Temperature</h3>
                <p>{weatherData.temp} °C</p>
              </div>
              <div className="weather-card">
                <h3>Humidity</h3>
                <p>{weatherData.humidity} %</p>
              </div>
              <div className="weather-card">
                <h3>Sunrise</h3>
                <p>{weatherData.sunrise}</p>
              </div>
              <div className="weather-card">
                <h3>Sunset</h3>
                <p>{weatherData.sunset}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;

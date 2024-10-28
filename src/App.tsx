import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import Temperature from "./components/Temperature";
import FiveDayForecast from "./components/FiveDayForecast";
import Main from "./components/Main";
import Map from "./components/Map";
import axios from "axios";
import { Forecast } from "./types/types";
import { formatDate } from './utils/dateUtils';
import { getWeatherType } from './utils/weatherTypeUtils';
import TemperatureChart from "./components/TemperatureChart";

import './App.css'; 

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [typeOfWeather, setTypeOfWeather] = useState<any>(null);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [weatherText, setWeatherText] = useState<any>(null);
  const [weatherIcon, setWeatherIcon] = useState<any>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [fiveDayData, setFiveDayData] = useState<Forecast[]>([]);
  const [date, setDate] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleSearch = async (city: string) => {
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=${API_KEY}`
      );

      // City not found
      if (!geoResponse.data || geoResponse.data.length === 0) {
        setErrorMessage("City not found. Please try another name.");
        setWeatherData(null); //Clear data
        return; 
      }

      const cityData = geoResponse.data[0];
      setWeatherData(cityData);
      setErrorMessage(null); 

      if (cityData && cityData.lat && cityData.lon) {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityData.lat.toFixed(2)}&lon=${cityData.lon.toFixed(2)}&appid=${API_KEY}&units=metric`
        );

        setCurrentTemp(weatherResponse.data.main.temp.toFixed(1));
        
        //get last char to know if its day or night
        var timeOfDay = weatherResponse.data.weather[0].icon;
        var lastChar = timeOfDay.charAt(timeOfDay.length-1)
        
        if(weatherResponse.data.weather[0].id > 199 && weatherResponse.data.weather[0].id < 299){
          setTypeOfWeather(0); //thunderstorm
        }else if (weatherResponse.data.weather[0].id > 299 && weatherResponse.data.weather[0].id < 322) {
          setTypeOfWeather(1);  //drizzle
        }else if (weatherResponse.data.weather[0].id > 499 && weatherResponse.data.weather[0].id < 532) {
          setTypeOfWeather(2);  //rain  
        }else if (weatherResponse.data.weather[0].id > 599 && weatherResponse.data.weather[0].id < 623) {
          setTypeOfWeather(3);  //snow
        }else if (weatherResponse.data.weather[0].id > 699 && weatherResponse.data.weather[0].id < 782) {
          setTypeOfWeather(4); //atmosphere
        }else if (weatherResponse.data.weather[0].id == 800) {
          if(lastChar == 'd'){
            setTypeOfWeather(5); //clear day
          }else{
            setTypeOfWeather(6); //clear night
          }
        }else{
          if(lastChar == 'd'){
            setTypeOfWeather(7); //cloudy day
          }else{
            setTypeOfWeather(8); //cloudy night
          }
        }

        setWeatherText(weatherResponse.data.weather[0].main)
        setWeatherIcon(weatherResponse.data.weather[0].icon)
        const dateToday = new Date(weatherResponse.data.dt * 1000)
        setDate(dateToday);
        
        const fiveDayForecast = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.lat.toFixed(2)}&lon=${cityData.lon.toFixed(2)}&cntg=5&appid=${API_KEY}&units=metric`
        );

        const formattedForecasts = fiveDayForecast.data.list
        .filter((_: any, index: number) => index % 8 === 0) 
        .map((item: any) => ({
          dt: item.dt,
          temp: item.main.temp,
          weatherText: item.weather[0].main,
          icon: item.weather[0].icon,
          date: item.dt_txt.split(" ")[0],
          weatherType: getWeatherType(item.weather[0].id, item.weather[0].icon), 
        }));

        setFiveDayData(formattedForecasts);
      }
    } catch (error) {
      console.error("Error getting the forecast", error);
      setErrorMessage("An error occurred while fetching the data. Please try again later.");
    }
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <div className="app-container">
      <Main weather={typeOfWeather || "Dusk"} />
      <div className="content-overlay">
        <div className="search-container">
          <SearchBar onSearch={handleSearch} />
          <button onClick={toggleUnit} className="toggle-button">
            {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
        
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {weatherData && (
          <div className="text-overlay">
            <h2>Forecast for {weatherData.name}, {weatherData.country}</h2>
            <h3>{formatDate(date, 1)}</h3>
            <Temperature weatherText={weatherText} currentTemp={currentTemp} icon={weatherIcon} unit={unit} />
          </div>
        )}
        <div className="forecast-wrapper">
          {weatherData && (
            <>
              <FiveDayForecast forecasts={fiveDayData} unit={unit} />
              <TemperatureChart forecasts={fiveDayData} unit={unit} />
            </>
          )}
        </div>
        {weatherData && (
          <div id="map" className="map-container">
            <Map
              lat={weatherData.lat}
              lon={weatherData.lon}
              temperature={currentTemp !== null ? currentTemp : 0}
              unit={unit}
            />
          </div>
        )}
      </div>
    </div>
  );
  
};

export default App;
